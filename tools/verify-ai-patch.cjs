'use strict';
/* 离线验证 AI 补丁：从 .user.js 里抽出真实源码片段，用 stub 跑一遍，确认行为对。
   不是为了替代浏览器测试，而是防止「改了但没生效」和「再改一次又回退」。 */
const fs = require('fs');
const path = require('path');
const SRC = path.join(__dirname, '..', 'chaoxing-zhihuishu-ai.user.js');
const code = fs.readFileSync(SRC, 'utf8');

let pass = 0;
let fail = 0;
const check = (name, ok, detail) => {
  if (ok) {
    pass++;
    console.log('  [PASS] ' + name);
  } else {
    fail++;
    console.log('  [FAIL] ' + name + (detail ? '  →  ' + String(detail).slice(0, 300) : ''));
  }
};

// ---- 1. 从真实源码里切出两块受测代码 ----
const sliceBetween = (startMarker, endMarker) => {
  const a = code.indexOf(startMarker);
  const b = code.indexOf(endMarker, a + 1);
  if (a < 0 || b < 0) throw new Error('切片段失败: ' + startMarker + ' / ' + endMarker);
  return code.slice(a, b);
};
const ctxBlock = sliceBetween('const COURSE_CTX_CACHE', 'const buildAiQuestionText = (question, imageCount) => {');
const searchBlock = sliceBetween('const AI_SEARCH_PROVIDERS', 'const requestAiAnswer = (url2, apiKey, payload) => new Promise((resolve) => {');

// ---- 2. stub 环境 ----
const stripTagsForAi = (t) => String(t == null ? '' : t).replace(/<img[^>]*>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const xhrLog = [];
const _GM_xmlhttpRequest = (opt) => {
  xhrLog.push(opt.url);
  let body = '';
  if (opt.url.includes('api.tavily.com')) body = JSON.stringify({ results: [{ title: '华夷一体与隋唐大一统', content: '唐朝重建大一统政治秩序，强调天下共主与华夷一体。', url: 'https://a' }, { title: '羁縻府州制', content: '唐朝对边疆实行羁縻府州制，兼顾族群差异。', url: 'https://b' }, { title: '第三条', content: '需要被 limit 截掉。', url: 'https://c' }] });
  else if (opt.url.includes('searx')) body = JSON.stringify({ results: [{ title: 'S1', content: '搜到的第一条', url: 'https://s1' }] });
  else body = JSON.stringify({ webPages: { value: [{ name: 'B1', snippet: 'bing 结果', url: 'https://b1' }] } });
  setTimeout(() => opt.onload({ status: 200, responseText: body }), 0);
};
const sandboxWindow = { top: null };
const factory = new Function('stripTagsForAi', '_GM_xmlhttpRequest', 'window', `"use strict";\n${ctxBlock}\n${searchBlock}\nreturn { collectCourseContext, withCourseContext, webSearch, buildSearchQuery, formatSearchReferences, collectSearchHint };`);
const api = factory(stripTagsForAi, _GM_xmlhttpRequest, sandboxWindow);

// ---- 3. 假 DOM：作业页有 h2.mark_title ----
const MARK_TITLE = '26秋：第七讲小测 华夷一体与中华民族空前繁盛(隋唐五代时期)';
const fakeDoc = {
  title: '作业详情',
  querySelectorAll(sel) {
    if (sel === '.mark_title') return [{ textContent: MARK_TITLE }];
    return [];
  }
};
const question = {
  element: { ownerDocument: fakeDoc },
  type: '多选题',
  title: '为何唐朝能够成为中国历史上的文化繁荣期，形成覆盖东亚的中华文明圈?( )',
  optionsText: ['因为唐朝人才辈出', '因为唐朝胡汉融合，多元文化深度交融', '因为唐朝开展了广泛的中外文化交流，兼收并蓄', '因为唐朝经济实力雄厚']
};

console.log('\n=== A. 提示词改动 ===');
check('多选题要求「宁可少选」而不是「给出全部正确选项」', code.includes('宁可少选') && !code.includes('请给出全部正确选项'), 'multi.extra');
check('多选题写明错选一个就 0 分', code.includes('多选或错选一个就整题 0 分'));
check('system 提示加了人文社科口径规则', code.includes('人文社科/思政/历史/文学类题') && code.includes('讲义口径'));
check('system 提示加了多选题评分规则', code.includes('多选题评分规则：漏选只按比例扣分'));
check('单选题加了「按本讲上下文选」的平局规则', code.includes('表述最一致的那一个'));

console.log('\n=== B. 课程/章节上下文 ===');
const ctx = api.collectCourseContext(question);
check('从 .mark_title 取到作业/测验标题', ctx.includes('作业/测验=' + MARK_TITLE), ctx);
check('上下文带了口径使用说明', ctx.includes('按这一讲/这一章讲过的口径作答'));
check('同文档第二次调用走缓存（结果一致）', api.collectCourseContext(question) === ctx);
const wrapped = api.withCourseContext('题型：多选题\n题目：xxx', question);
check('withCourseContext 把上下文顶到最前面', wrapped.startsWith('课程/章节上下文：') && wrapped.includes('题型：多选题'));
check('withCourseContext 幂等（不会叠加两层）', api.withCourseContext(wrapped, question) === wrapped);
const emptyDoc = { title: '学习通', querySelectorAll: () => [] };
const noCtx = api.collectCourseContext({ element: { ownerDocument: emptyDoc }, title: 'x' });
check('取不到上下文时返回空串（不乱塞垃圾）', noCtx === '' || noCtx.includes('页面标题'), JSON.stringify(noCtx));

console.log('\n=== C. 联网搜索 ===');
(async () => {
  const tavily = await api.webSearch('华夷一体 唐朝', { searchProvider: 'tavily', searchKey: 'tvly-test', searchEndpoint: '', searchMaxResults: 2 });
  check('tavily 解析出结果并遵守 maxResults', tavily.length === 2 && tavily[0].title.includes('华夷一体'), JSON.stringify(tavily));
  check('tavily 摘要被截断到 220 字以内', tavily.every((i) => i.snippet.length <= 220));
  const bing = await api.webSearch('x', { searchProvider: 'bing', searchKey: 'k', searchEndpoint: '', searchMaxResults: 3 });
  check('bing 结果能解析（webPages.value）', bing.length === 1 && bing[0].title === 'B1', JSON.stringify(bing));
  const searx = await api.webSearch('x', { searchProvider: 'searxng', searchKey: '', searchEndpoint: 'https://searx.be/', searchMaxResults: 3 });
  check('searxng 结果能解析', searx.length === 1 && searx[0].title === 'S1', JSON.stringify(searx));
  const off = await api.webSearch('x', { searchProvider: 'off', searchKey: 'k', searchEndpoint: '', searchMaxResults: 3 });
  check('provider=off 时完全不发请求', off.length === 0);
  const noKey = await api.webSearch('x', { searchProvider: 'tavily', searchKey: '', searchEndpoint: '', searchMaxResults: 3 });
  check('没填 Key 时静默返回空（不报错、不卡住）', noKey.length === 0);

  const refs = api.formatSearchReferences(tavily);
  check('参考资料提示词格式正确', refs.includes('参考资料') && refs.includes('[1]') && refs.includes('以课程口径为准'), refs.slice(0, 120));

  const q = api.buildSearchQuery(question);
  check('搜索词包含课程主题（本讲口径）', q.includes('华夷一体'), q);
  check('搜索词包含题干但不含选项', q.includes('为何唐朝') && !q.includes('因为唐朝人才辈出'), q);

  const hint = await api.collectSearchHint(question, { searchProvider: 'tavily', searchKey: 'tvly-test', searchEndpoint: '', searchMaxResults: 2 });
  check('collectSearchHint 能端到端产出参考资料块', hint.includes('参考资料') && hint.includes('[1]'), hint.slice(0, 100));
  const hintOff = await api.collectSearchHint(question, { searchProvider: 'off', searchKey: '', searchEndpoint: '', searchMaxResults: 2 });
  check('联网关闭时 hint 为空（prompt 不变，不浪费 token）', hintOff === '');

  console.log('\n=== D. 手动开始 / 配置默认值 ===');
  check('默认 autoStart=false（不再一进页面就自动跑）', /autoStart: false/.test(code));
  check('自动启动入口已改为 prepareLogic + 开始按钮', code.includes('const prepareLogic') && code.includes('const startNow') && !code.includes('executeLogicByUrl(url2);'));
  check('面板里有「开始」按钮与提示文案', code.includes('点「开始」才执行') && code.includes('class: "start-bar"'));
  check('默认关闭联网（searchProvider: "off"）', /searchProvider: "off"/.test(code));
  check('默认触发时机为「选择/判断先搜」', /searchTrigger: "choice"/.test(code));
  check('旧配置会被补齐 search 字段', code.includes('aiConfig.searchProvider = "off"'));
  check('getAnswer 里接了 preSearch / miss 两段逻辑', code.includes('const preSearch = searchTrigger === "always"') && code.includes('{ withSearch: true }'));
  check('搜索提示只追加到最后一条 user 消息', code.includes('appendHintToMessages(payload.messages, searchHint)'));

  console.log('\n==================================================');
  console.log(`结果：${pass}/${pass + fail} 通过` + (fail ? `，${fail} 项失败` : '，全部通过'));
  process.exit(fail ? 1 : 0);
})();
