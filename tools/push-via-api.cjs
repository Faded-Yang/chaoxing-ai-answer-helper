'use strict';
/**
 * 在「github.com 访问不了、只有 api.github.com 通」的网络环境下上传文件。
 *
 * 背景：部分网络（如国内直连）会重置 github.com:443，导致 `git push` 必然失败，
 * 但 api.github.com 正常。此时用 REST API 逐文件提交即可。
 *
 * 用法：
 *   $env:GITHUB_TOKEN="github_pat_xxx"    # fine-grained，仅该仓库 Contents: Read and write
 *   $env:GITHUB_OWNER="your-name"
 *   $env:GITHUB_REPO="your-repo"
 *   node tools/push-via-api.cjs --dry     # 只看计划
 *   node tools/push-via-api.cjs           # 真正上传（从当前仓库根目录取文件）
 *
 * 注意：token 只在本机读取，不要写进任何文件。
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OWNER = String(process.env.GITHUB_OWNER || 'Faded-Yang').trim();
const REPO = String(process.env.GITHUB_REPO || 'chaoxing-ai-answer-helper').trim();
const BRANCH = String(process.env.GITHUB_BRANCH || 'main').trim();
const ROOT = path.join(__dirname, '..');
const DRY = process.argv.includes('--dry');
const TOKEN = String(process.env.GITHUB_TOKEN || '').trim();
const SKIP = new Set(['.git', 'node_modules']);

const walk = (dir, base, out) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    const rel = base ? base + '/' + entry.name : entry.name;
    if (entry.isDirectory()) walk(full, rel, out);
    else out.push({ rel, full });
  }
  return out;
};

const api = (method, urlPath, body) =>
  new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        host: 'api.github.com',
        path: urlPath,
        method,
        headers: Object.assign(
          {
            'User-Agent': 'push-via-api',
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
          TOKEN ? { Authorization: 'Bearer ' + TOKEN } : {},
          data ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) } : {}
        ),
      },
      (res) => {
        let raw = '';
        res.on('data', (c) => (raw += c));
        res.on('end', () => {
          let parsed = null;
          try {
            parsed = JSON.parse(raw);
          } catch (e) {
            parsed = null;
          }
          resolve({ status: res.statusCode, body: parsed, raw });
        });
      }
    );
    req.on('error', reject);
    req.setTimeout(30000, () => req.destroy(new Error('请求超时')));
    if (data) req.write(data);
    req.end();
  });

(async () => {
  const files = walk(ROOT, '', []);
  console.log(`准备上传 ${files.length} 个文件 → ${OWNER}/${REPO}@${BRANCH}`);
  files.forEach((f) => console.log('  · ' + f.rel + '  (' + (fs.statSync(f.full).size / 1024).toFixed(1) + ' KB)'));
  if (DRY) {
    console.log('\n[dry] 未发送任何请求；去掉 --dry 才真正上传');
    return;
  }
  if (!TOKEN) {
    console.error('\n缺少 GITHUB_TOKEN');
    process.exit(2);
  }
  const who = await api('GET', '/user');
  if (who.status !== 200) {
    console.error('\nToken 无效：HTTP ' + who.status);
    process.exit(3);
  }
  console.log('\n已认证为：' + (who.body && who.body.login));

  let ok = 0;
  for (const f of files) {
    const p = f.rel.split('/').map(encodeURIComponent).join('/');
    const cur = await api('GET', `/repos/${OWNER}/${REPO}/contents/${p}?ref=${BRANCH}`);
    const sha = cur.status === 200 && cur.body && cur.body.sha ? cur.body.sha : undefined;
    const res = await api('PUT', `/repos/${OWNER}/${REPO}/contents/${p}`, {
      message: (sha ? 'update: ' : 'add: ') + f.rel,
      content: fs.readFileSync(f.full).toString('base64'),
      branch: BRANCH,
      ...(sha ? { sha } : {}),
    });
    if (res.status === 200 || res.status === 201) {
      ok += 1;
      console.log('  [OK] ' + f.rel);
    } else {
      console.log('  [FAIL] ' + f.rel + ' → HTTP ' + res.status + ' ' + String(res.raw).slice(0, 240));
    }
  }
  console.log(`\n完成：${ok}/${files.length}`);
  process.exit(ok === files.length ? 0 : 1);
})();
