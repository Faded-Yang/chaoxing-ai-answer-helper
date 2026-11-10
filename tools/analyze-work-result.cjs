'use strict';
/**
 * 作业/考试结果归因工具：读一份「作业详情」页的保存副本，按题型统计得分，
 * 并把非满分题逐条列出（题干 / 选项 / 我的答案 / 正确答案 / 得分）。
 *
 *   node tools/analyze-work-result.cjs 作业详情.html
 *   node tools/analyze-work-result.cjs 作业详情.html --json out.json
 *
 * 用途：判断「AI 答题效果差」到底差在哪一类题上 —— 是选择/判断通道坏了，
 * 还是多选题策略错、还是文科口径没喂对。报告里的结论就是这么来的。
 *
 * 说明：本工具只读你本地的文件，不上传任何内容；输出仅供自己分析。
 */
const fs = require('fs');

const args = process.argv.slice(2).filter((a) => a !== '--json');
const jsonFlag = process.argv.includes('--json');
const file = args[0];
if (!file) {
  console.error('用法：node tools/analyze-work-result.cjs <作业详情.html> [--json out.json]');
  process.exit(2);
}
const jsonOut = jsonFlag ? args[1] : '';
if (!fs.existsSync(file)) {
  console.error('文件不存在：' + file);
  process.exit(2);
}

const html = fs.readFileSync(file, 'utf8');
const strip = (s) =>
  String(s == null ? '' : s)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

// 题型分组标题（一. 单选题（共15题，45分）…）
const groups = [...html.matchAll(/<h2 class="type_tit"[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => ({ at: m.index, title: strip(m[1]) }));
// 所有题目起始位置
const starts = [...html.matchAll(/<div class="marBom60 questionLi[^"]*"[^>]*id="question(\d+)"/g)].map((m) => ({ at: m.index, id: m[1] }));
if (!starts.length) {
  console.error('没解析到题目（确认这是「作业详情」页的保存副本，不是作答页）');
  process.exit(3);
}

const head = html.slice(0, starts[0].at);
const title = strip((head.match(/<h2 class="mark_title"[^>]*>([\s\S]*?)<\/h2>/) || [])[1] || '');
const qCount = strip((head.match(/题量[:：]\s*<[^>]*>?\s*(\d+)/) || [])[1] || '');
const fullScore = strip((head.match(/满分[:：]\s*<[^>]*>?\s*(\d+)/) || [])[1] || '');
const totalScore = strip((head.match(/<span class="resultNum"[^>]*>[\s\S]*?<i[^>]*>([\s\S]*?)<\/i>/) || [])[1] || '');

const rows = [];
for (let i = 0; i < starts.length; i += 1) {
  const s = starts[i];
  const body = html.slice(s.at, i + 1 < starts.length ? starts[i + 1].at : html.length);
  const g = groups.filter((x) => x.at < s.at).pop();
  const nameRaw = (body.match(/<h3 class="mark_name[^"]*"[^>]*>([\s\S]*?)<\/h3>/) || [])[1] || '';
  const noM = nameRaw.match(/^\s*(\d+)\./);
  const typeM = nameRaw.match(/\(([^,)]+?)\s*,\s*(\d+)\s*分\)/) || nameRaw.match(/\(([^,)]+?)\)/);
  const stemHtml = (nameRaw.match(/<span class="qtContent[^"]*">([\s\S]*?)<\/span>\s*$/) || [])[1] || nameRaw;
  const opts = [];
  const optBlock = (body.match(/<ul class="mark_letter[^"]*"[^>]*>([\s\S]*?)<\/ul>/) || [])[1] || '';
  for (const li of optBlock.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)) opts.push(strip(li[1]));
  const hidden = [...body.matchAll(/<span class="element-invisible-hidden[^"]*"[^>]*>([\s\S]*?)<\/span>/g)].map((m) => strip(m[1]));
  rows.push({
    no: noM ? Number(noM[1]) : i + 1,
    group: g ? g.title : '',
    type: typeM ? typeM[1] : '',
    full: typeM ? Number(typeM[2]) : null,
    score: Number(strip((body.match(/<div class="totalScore[^"]*">[\s\S]*?<i[^>]*>([\s\S]*?)<\/i>/) || [])[1] || '0')) || 0,
    mark: /marking_dui/.test(body) ? 'right' : /marking_ban/.test(body) ? 'half' : /marking_cuo/.test(body) ? 'wrong' : '?',
    stem: strip(stemHtml),
    opts,
    mine: strip((body.match(/<span class="stuAnswerContent[^"]*">([\s\S]*?)<\/span>/) || [])[1] || ''),
    right: strip((body.match(/<span class="rightAnswerContent[^"]*">([\s\S]*?)<\/span>/) || [])[1] || ''),
    mineText: hidden[0] || '',
    rightText: hidden[1] || '',
  });
}

const sumGot = rows.reduce((a, r) => a + r.score, 0);
const sumFull = rows.reduce((a, r) => a + (r.full || 0), 0);

console.log('试卷：' + (title || '(未取到标题)'));
console.log(`解析：${rows.length} 题，满分 ${sumFull}，累计得分 ${sumGot}` + (totalScore ? `（页面显示 ${totalScore}）` : '') + (qCount ? `，页面题量 ${qCount}` : ''));
if (totalScore && Math.abs(Number(totalScore) - sumGot) > 0.01) {
  console.log('⚠ 累计得分与页面显示不一致：可能有题目没被解析到（换题型结构的话需要补选择器）');
}

const byGroup = new Map();
for (const r of rows) {
  const k = r.group || r.type || '(未分组)';
  const b = byGroup.get(k) || { n: 0, right: 0, half: 0, wrong: 0, got: 0, full: 0 };
  b.n += 1;
  b[r.mark === 'right' ? 'right' : r.mark === 'half' ? 'half' : 'wrong'] += 1;
  b.got += r.score;
  b.full += r.full || 0;
  byGroup.set(k, b);
}

console.log('\n题型            题数  全对  半分  全错   得分');
for (const [k, v] of byGroup) {
  console.log(`${k.padEnd(14).slice(0, 14)}  ${String(v.n).padStart(4)}  ${String(v.right).padStart(4)}  ${String(v.half).padStart(4)}  ${String(v.wrong).padStart(4)}   ${v.got}/${v.full}`);
}

const lost = rows.filter((r) => r.mark !== 'right');
console.log('\n失分题明细（' + lost.length + ' 题，共丢 ' + (sumFull - sumGot) + ' 分）：');
for (const r of lost) {
  console.log(`\n[${r.no}] ${r.type} ${r.full}分 → 得 ${r.score}（${r.mark === 'half' ? '半分' : '全错'}）`);
  console.log('  题干：' + r.stem.slice(0, 90));
  r.opts.forEach((o) => console.log('    · ' + o.slice(0, 42)));
  console.log('  我的：' + JSON.stringify(r.mine) + ' ' + r.mineText.slice(0, 70));
  console.log('  正确：' + JSON.stringify(r.right) + ' ' + r.rightText.slice(0, 70));
}

const diagnose = [];
for (const [k, v] of byGroup) {
  if (/多选/.test(k) && (v.half || v.wrong)) diagnose.push(`多选题失分 ${(v.full - v.got)} 分：多选/错选整题 0 分、漏选按比例给分 → 策略应「宁可少选」`);
  if (/单选/.test(k) && v.wrong) diagnose.push(`单选题错 ${v.wrong} 题：多为「通识上更顺口、但不是本讲口径」的干扰项 → 把课程/章节标题喂给模型`);
  if (/判断/.test(k) && v.wrong) diagnose.push(`判断题错 ${v.wrong} 题：先查题型识别与「对/错」映射（extractJudgementToken 一类）`);
}
if (diagnose.length) {
  console.log('\n结论建议：');
  diagnose.forEach((d) => console.log('  · ' + d));
}

if (jsonOut) {
  fs.writeFileSync(jsonOut, JSON.stringify(rows, null, 1), 'utf8');
  console.log('\n已写出 ' + jsonOut);
}
