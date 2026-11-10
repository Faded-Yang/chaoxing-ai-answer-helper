'use strict';
/**
 * 发布前敏感信息扫描：确认脚本/工具里没有密钥、学号、手机号、个人邮箱等不该公开的东西。
 *
 *   node tools/publish-scan.cjs                 # 扫仓库默认文件
 *   node tools/publish-scan.cjs a.js b.cjs      # 扫指定文件
 *   node tools/publish-scan.cjs --all           # 扫仓库里所有文本文件
 *
 * 退出码：0=干净，2=有命中（发布前逐条人工确认）
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DEFAULTS = ['chaoxing-zhihuishu-ai.user.js', 'tools/verify-ai-patch.cjs', 'tools/analyze-work-result.cjs', 'tools/publish-scan.cjs', 'tools/push-via-api.cjs', 'README.md', 'CHANGELOG.md'];
const TEXT_EXT = /\.(js|cjs|mjs|md|txt|json|yml|yaml|user\.js)$/i;

const RULES = [
  ['DeepSeek/OpenAI Key', /\bsk-[A-Za-z0-9]{16,}/g],
  ['Tavily Key', /\btvly-[A-Za-z0-9]{10,}/g],
  ['AWS Key', /\bAKIA[0-9A-Z]{12,}/g],
  ['GitHub Token', /\bgh[pousr]_[A-Za-z0-9]{20,}/g],
  ['Google API Key', /\bAIza[0-9A-Za-z_-]{30,}/g],
  ['私钥块', /-----BEGIN [A-Z ]*PRIVATE KEY-----/g],
  ['疑似密钥赋值', /(token|apiKey|api_key|secret|password)\s*[:=]\s*["'][A-Za-z0-9_\-]{24,}["']/gi],
  ['手机号', /\b1[3-9]\d{9}\b/g],
  ['长数字串(学号/卡号)', /\b\d{10,}\b/g],
  ['邮箱', /[\w.+-]+@[\w-]+\.[\w.]{2,}/g],
  ['身份证', /\b\d{17}[\dXx]\b/g],
];
const EMAIL_ALLOW = /@(example\.(com|org)|test\.com|localhost|users\.noreply\.github\.com)$/i;
// 已知安全值：字体/二进制解析里的常量，长得像学号但不是
const SAFE_VALUES = new Set([
  '4294967295', // 2^32-1，Typr 字体解析里的无符号上限
  '18446744073709551615', // 2^64-1
  '2147483647', // 2^31-1
]);

const walk = (dir, out) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'node_modules' || e.name.endsWith('.html') || e.name.endsWith('_files')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(path.relative(ROOT, full).split(path.sep).join('/'));
  }
  return out;
};

const args = process.argv.slice(2);
let targets;
if (args.includes('--all')) targets = walk(ROOT, []).filter((f) => TEXT_EXT.test(f));
else if (args.length) targets = args;
else targets = DEFAULTS;

let hits = 0;
for (const rel of targets) {
  const file = path.isAbsolute(rel) ? rel : path.join(ROOT, rel);
  if (!fs.existsSync(file)) {
    console.log('skip(不存在): ' + rel);
    continue;
  }
  const text = fs.readFileSync(file, 'utf8');
  const found = [];
  for (const [name, re] of RULES) {
    re.lastIndex = 0;
    let m;
    const list = [];
    while ((m = re.exec(text))) {
      const v = m[0];
      if (name === '邮箱' && EMAIL_ALLOW.test(v)) continue;
      if (SAFE_VALUES.has(v)) continue;
      list.push(v);
      if (list.length > 8) break;
    }
    if (list.length) found.push([name, [...new Set(list)]]);
  }
  console.log('\n=== ' + rel + '  (' + (text.length / 1024).toFixed(1) + ' KB) ===');
  if (!found.length) {
    console.log('  [OK] 无敏感模式命中');
    continue;
  }
  for (const [name, list] of found) {
    hits += list.length;
    console.log('  [!] ' + name + ' x' + list.length + ': ' + list.map((v) => (v.length > 60 ? v.slice(0, 60) + '…' : v)).join(' | '));
  }
}
console.log('\n====================');
console.log(hits ? `命中 ${hits} 处，逐条确认后再发布` : '全部干净');
process.exit(hits ? 2 : 0);
