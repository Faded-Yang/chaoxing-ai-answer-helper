'use strict';
/**
 * 一条命令完成仓库「装修」里需要 API 的两件事：
 *   1. 设置 topics（GitHub 主页上的标签）
 *   2. 创建 Release，并把 userscript 作为附件上传
 *
 * 需要 token（本机 github.com 不通、只能走 api.github.com 时也用这个）：
 *   fine-grained token → 只授权本仓库 → Contents: Read and write（建 release 还需要 Contents 权限）
 *
 * 用法：
 *   $env:GITHUB_TOKEN="github_pat_xxx"
 *   node tools/publish-release.cjs --dry
 *   node tools/publish-release.cjs
 */
const fs = require('fs');
const path = require('path');
const https = require('https');

const OWNER = String(process.env.GITHUB_OWNER || 'Faded-Yang').trim();
const REPO = String(process.env.GITHUB_REPO || 'chaoxing-ai-answer-helper').trim();
const TOKEN = String(process.env.GITHUB_TOKEN || '').trim();
const DRY = process.argv.includes('--dry');
const ROOT = path.join(__dirname, '..');
const SCRIPT = path.join(ROOT, 'chaoxing-zhihuishu-ai.user.js');

const TOPICS = ['userscript', 'chaoxing', 'zhihuishu', 'deepseek', 'ai', 'tampermonkey', 'scriptcat', 'automation'];
const TAG = 'v9.9.9-ai.1';
const NAME = 'AI 答题版 9.9.9-ai.1：课程口径上下文 + 多选保守策略 + 联网搜索 + 手动开始';

const request = (opts, body) =>
  new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: opts.host || 'api.github.com',
        path: opts.path,
        method: opts.method || 'POST',
        headers: Object.assign(
          {
            'User-Agent': 'publish-release',
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: 'Bearer ' + TOKEN,
          },
          opts.headers || {},
          body ? { 'Content-Length': Buffer.byteLength(body) } : {}
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
    req.setTimeout(60000, () => req.destroy(new Error('请求超时')));
    if (body) req.write(body);
    req.end();
  });

const releaseBody = `## 这个版本改了什么

修的是「**AI 答文科题不准**」这件事。一份 28 题小测实测 73.5 分，归因后做了四处改动：

| 改动 | 说明 |
| --- | --- |
| 课程/章节上下文 | 把作业标题（如「第七讲 华夷一体与中华民族空前繁盛」）作为口径一起发给模型 |
| 多选保守策略 | 写明「漏选按比例给分、多选/错选整题 0 分」→ 只交有把握的项，不再全选 |
| 联网搜索（可选） | Tavily / Bing / SearXNG / 自定义，三档触发，搜到的资料作为参考资料附在提示词后 |
| 一键开始 | 进页面不再自动跑，面板上点「开始」才执行 |

详见 [CHANGELOG.md](https://github.com/${OWNER}/${REPO}/blob/main/CHANGELOG.md)。

## 安装

\`\`\`
https://raw.githubusercontent.com/${OWNER}/${REPO}/main/chaoxing-zhihuishu-ai.user.js
\`\`\`

脚本管理器里选「安装」，然后在「答题」页填自己的 API Key。
版本号固定为 \`9.9.9\` 且不声明 \`@updateURL\`，避免被上游覆盖 —— 请在该脚本上关闭「检查更新」。

## 已知缺项

视频弹题自动作答（上游 0.2.8 的 \`watchVideoQuiz\` 系列）尚未合并，视频卡在弹题时需手动作答。
`;

(async () => {
  console.log(`仓库：${OWNER}/${REPO}`);
  console.log('topics：' + TOPICS.join(', '));
  console.log('release：' + TAG);
  console.log('附件：' + (fs.existsSync(SCRIPT) ? path.basename(SCRIPT) + ' (' + (fs.statSync(SCRIPT).size / 1024).toFixed(1) + ' KB)' : '(脚本不存在)'));
  if (DRY) {
    console.log('\n[dry] 未发送请求');
    return;
  }
  if (!TOKEN) {
    console.error('\n缺少 GITHUB_TOKEN');
    process.exit(2);
  }

  // 1. topics
  const t = await request(
    { path: `/repos/${OWNER}/${REPO}/topics`, method: 'PUT', headers: { 'Content-Type': 'application/json', Accept: 'application/vnd.github.mercy-preview+json' } },
    JSON.stringify({ names: TOPICS })
  );
  console.log(t.status === 200 ? '  [OK] topics 已设置' : '  [FAIL] topics → HTTP ' + t.status + ' ' + String(t.raw).slice(0, 200));

  // 2. release（已存在则跳过）
  const existing = await request({ path: `/repos/${OWNER}/${REPO}/releases/tags/${TAG}`, method: 'GET' }, null);
  let release = existing.status === 200 ? existing.body : null;
  if (release) {
    console.log('  [SKIP] release 已存在：' + release.html_url);
  } else {
    const created = await request(
      { path: `/repos/${OWNER}/${REPO}/releases`, method: 'POST', headers: { 'Content-Type': 'application/json' } },
      JSON.stringify({ tag_name: TAG, name: NAME, body: releaseBody, draft: false, prerelease: false })
    );
    if (created.status === 201) {
      release = created.body;
      console.log('  [OK] release 已创建：' + release.html_url);
    } else {
      console.log('  [FAIL] release → HTTP ' + created.status + ' ' + String(created.raw).slice(0, 300));
      process.exit(1);
    }
  }

  // 3. 上传附件
  if (fs.existsSync(SCRIPT) && release) {
    const content = fs.readFileSync(SCRIPT);
    const up = await request(
      {
        host: 'uploads.github.com',
        path: `/repos/${OWNER}/${REPO}/releases/${release.id}/assets?name=${encodeURIComponent(path.basename(SCRIPT))}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/javascript' },
      },
      content
    );
    console.log(up.status === 201 ? '  [OK] 附件已上传（' + (content.length / 1024).toFixed(1) + ' KB）' : '  [FAIL] 附件 → HTTP ' + up.status + ' ' + String(up.raw).slice(0, 200));
  }
  console.log('\n完成：https://github.com/' + OWNER + '/' + REPO + '/releases');
})();
