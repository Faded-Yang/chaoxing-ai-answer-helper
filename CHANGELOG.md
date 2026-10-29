# 变更记录

## 2026-10-29 · AI 答题效果专项（基于上游 0.2.3 + 本次 4 项改造）

### 新增：模型知道「这一讲讲什么」

- 新增 `collectCourseContext()`：从作业/考试页的 `.mark_title`、章节页目录、父窗口标题里尽量取
  「课程 / 章节 / 作业」标题，拼成一行上下文。
- 新增 `withCourseContext()`：把它顶到 user 消息最前面；**取不到就不加，绝不编造**。
- 注入点选在 `buildAiMessages()`，所以作业、考试、章节测试、智慧树答题全覆盖。
- 结果按文档缓存，同一页只算一次；并纳入答案缓存 key（换页面不会误命中）。

### 新增：多选题保守策略

- `AI_KIND_RULES.multi.extra` 从「请给出全部正确选项」改为：
  逐项判断 + **漏选按比例给分、多选/错选整题 0 分** + 只交有把握的项 + 禁止全选。
- system 提示补充：多选题评分规则、人文社科「讲义口径优先」、禁止按选项长短/字母顺序猜。

### 新增：可选联网搜索

- 支持 4 种搜索源：Tavily、Bing（v7）、SearXNG（需允许 JSON）、自定义 URL 模板（`{q}`）。
- 触发时机三档：`choice`（选择/判断先搜，默认）、`miss`（AI 答不出才搜）、`always`（所有题先搜）。
- 搜索词 = 本讲口径关键词 + 题干（不含选项，太长反而不准）。
- 参考文献以「参考资料（来自网络，与课程口径冲突时以课程为准）」形式追加到**最后一条 user 消息**。
- 任何失败（无 key / 网络错误 / 无结果）都静默跳过，不影响答题。

### 新增：一键开始

- 移除「进页面即执行」：`executeLogicByUrl()` → `prepareLogic()` + 「开始」按钮。
- 面板顶部新增 `.start-bar` 提示条；点「开始」才真正执行。
- 想保持旧行为可在配置里把 `aiConfig.autoStart` 设为 `true`。

### 其他

- 配置新增字段（旧配置会自动补齐）：`searchProvider` / `searchTrigger` / `searchKey` /
  `searchEndpoint` / `searchMaxResults` / `autoStart`。
- 启动日志增加「联网」状态显示。
- 新增 `tools/verify-ai-patch.cjs` 回归脚本（30 项断言，直接切真实源码片段跑）。

### 已知未同步（上游 0.2.8）

`watchVideoQuiz` / `parseVideoQuiz` / `matchVideoQuizAnswers` / `applyVideoQuizAnswers` /
`VIDEO_QUIZ_SETTING`（视频弹题自动作答）、`extractJudgementToken`、`stripOptionLabel`、
`stripQuestionTypeLabel`。详见 README 1.2。
