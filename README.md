# 超星学习通 · 知到智慧树 网课小助手（DeepSeek AI 答题版）

<!-- badges -->
[![Release](https://img.shields.io/github/v/release/Faded-Yang/chaoxing-ai-answer-helper?label=release&color=blue)](https://github.com/Faded-Yang/chaoxing-ai-answer-helper/releases)
[![License](https://img.shields.io/github/license/Faded-Yang/chaoxing-ai-answer-helper?color=green)](LICENSE)
[![verify](https://github.com/Faded-Yang/chaoxing-ai-answer-helper/actions/workflows/verify.yml/badge.svg)](https://github.com/Faded-Yang/chaoxing-ai-answer-helper/actions/workflows/verify.yml)
[![Userscript](https://img.shields.io/badge/userscript-Tampermonkey%20%7C%20ScriptCat-ff6d00)](https://raw.githubusercontent.com/Faded-Yang/chaoxing-ai-answer-helper/main/chaoxing-zhihuishu-ai.user.js)
[![Upstream](https://img.shields.io/badge/upstream-isMobile%20(MIT)-8a2be2)](https://scriptcat.org/zh-CN/script-show-page/711)

> **这是 Fork，不是原创。** 上游是 [isMobile](https://scriptcat.org/zh-CN/script-show-page/711) 的
> 「超星学习通｜知到智慧树--网课小助手」（MIT）。视频播放、任务点跳转、各平台适配都来自上游；
> 本仓库做的是「**用大模型替代付费题库**」和「**让模型按这门课的口径答题**」。

```text
一键安装（改完别忘在脚本管理器里关闭该脚本的「检查更新」）
https://raw.githubusercontent.com/Faded-Yang/chaoxing-ai-answer-helper/main/chaoxing-zhihuishu-ai.user.js
```

---

## 目录

- [它能做什么](#它能做什么)
- [安装](#安装)
- [配置](#配置)
- [联网搜索怎么配](#联网搜索怎么配)
- [为什么这么改：一次实测的归因](#为什么这么改一次实测的归因)
- [使用流程](#使用流程)
- [隐私](#隐私)
- [已知限制与待办](#已知限制与待办)
- [自测](#自测)
- [仓库结构](#仓库结构)
- [免责](#免责)

---

## 它能做什么

| 能力 | 来自 | 说明 |
| --- | --- | --- |
| 视频自动播放 / 任务点跳转 / 自动下一章 | 上游 | 原版功能 |
| 章节测试、作业、考试自动作答 | 上游 | 原版骨架（取题、填答案、提交） |
| **DeepSeek AI 答题** | 本 fork | 填自己的 API Key；题库变可选兜底，不再必须买卡密 |
| **模型列表按接口拉取** | 本 fork | 不写死模型名（DeepSeek 已下线 `deepseek-chat`/`deepseek-reasoner`） |
| **课程/章节上下文** | 本 fork | 把「第 N 讲 + 主题」一起发给模型，按本讲口径选 |
| **多选保守策略** | 本 fork | 漏选给部分分、错选整题 0 分 → 只交有把握的项 |
| **可选联网搜索** | 本 fork | Tavily / Bing / SearXNG / 自定义，三档触发 |
| **一键开始** | 本 fork | 进页面不自动跑，点「开始」才执行 |
| 思考链控制 / 答案缓存 / 用量统计 / 图片题 | 本 fork | 见[配置](#配置) |

## 安装

1. 装一个用户脚本管理器：[ScriptCat（脚本猫）](https://scriptcat.org/) 或 [Tampermonkey](https://www.tampermonkey.net/)
2. 点上面的**一键安装**链接，或到 [Releases](https://github.com/Faded-Yang/chaoxing-ai-answer-helper/releases) 下载 `.user.js` 附件手动导入
3. **在该脚本的设置里关闭「检查更新」**
   （本版版本号固定 `9.9.9` 且不声明 `@updateURL`，但关掉更保险，避免被上游覆盖）
4. 打开「答题」标签页 → 填 API Key → 点「拉取模型」选一个

## 配置

| 配置项 | 默认 | 说明 |
| --- | --- | --- |
| API Key | 空 | DeepSeek 或任意 OpenAI 兼容接口的 Key |
| 接口地址 | `https://api.deepseek.com` | 用中转就填中转地址 |
| 模型 | `deepseek-flash` | 点「拉取模型」从你的接口取真实列表 |
| 思考链 | 关闭 | 文科细节题建议开「低」；思维链按输出 token 计费 |
| 联网搜索 | 关闭 | 见下节 |
| 搜索时机 | 选择/判断先搜 | 也可改成「AI 没答出来才搜」（省）或「所有题都先搜」（准） |
| 综合大题拆分 | 开 | 一个 60 分大题按小问分别问，准确率更高 |
| 图片题发给 AI | 关 | 只有 `deepseek-flash` 支持图片 |
| 题库兜底 | 开 | 题库 Key 留空时自动跳过 |
| 一键开始 | 关 | 设 `autoStart: true` 可恢复「进页面自动跑」 |

## 联网搜索怎么配

| 服务 | 需要填 | 说明 |
| --- | --- | --- |
| **Tavily**（推荐） | Key（`tvly-` 开头） | AI 专用搜索，结果最干净，官网有免费额度 |
| **Bing** | Azure Bing Search v7 订阅密钥 | 质量稳定 |
| **SearXNG** | 实例根地址（如 `https://searx.be`） | 免费/可自建，**该实例须允许 JSON 输出** |
| **自定义** | 完整 URL 模板，`{q}` 表示关键词 | 返回带 `results`/`items`/`data` 的 JSON 即可 |

搜索词 = 本讲口径关键词 + 题干（不含选项）；结果以「参考资料」附在提示词后，
并声明**与课程口径冲突时以课程为准**。没 key / 不通 / 无结果一律静默跳过，不会卡住答题。

## 为什么这么改：一次实测的归因

一份文科小测（28 题 / 满分 100）实得 **73.5**。逐题抽取后：

| 题型 | 题数 / 分值 | 得分 | 失分原因 |
| --- | --- | --- | --- |
| 单选 | 15 / 45 | 36 | 3 题错在「通识上更顺口、但不是本讲口径」的干扰项 |
| 多选 | 8 / 40 | 22.5 | 2 题全选判 0 分、3 题漏选只拿半分（**丢 17.5 分，最大失分源**） |
| 判断 | 5 / 15 | 15 | 全对（通道正常） |

三条结论直接变成改动：

1. **多选题不是「会不会」，是策略错。** 漏选按比例给分、错选整题 0 分，而原提示词写的是
   「请给出全部正确选项」—— 正好把人往最亏的方向推。
2. **文科干扰项来自讲义口径。** 题干和选项基本照抄课件，模型得先知道「这一讲讲什么」。
3. **判断/填空通道没问题**，不用动。

> 仓库不含任何真实题目、答案或课程内容；`tools/analyze-work-result.cjs` 是为此写的归因工具，
> 只读你本地的保存副本，`tools/fixtures/` 里是虚构夹具。

## 使用流程

```text
进入章节 / 作业 / 考试页
  → 面板出现，顶部显示「开始」按钮（默认不自动执行）
  → 点「开始」
  → 「答题」标签页实时显示每题：题目 / 状态 / 答案
  → 作业按正确率阈值决定提交还是暂存；考试按设置自动切换下一题
```

## 隐私

- **API Key 只存本机**（脚本管理器存储），只由脚本自己发往你填的接口地址。
- 发出去的：题干、选项、题型、本页的作业/章节标题（作为口径上下文）；
  开启联网搜索时再加搜索到的公开资料摘要。
- 不上传到第三方服务器，不做代理中转，没有统计上报。
- 联网搜索用到 `@connect *`（上游 header 已有），自定义端点依赖它；不放心可只用官方域名。

## 已知限制与待办

- **AI 会答错**，尤其细节题与「哪个表述最贴合本讲」；上下文能改善但治不了根。
- **尚未同步上游 0.2.8 的 4 项**（本 fork 基线为 0.2.3，逐项比对得出）：

  | 上游函数 | 作用 | 影响 |
  | --- | --- | --- |
  | `watchVideoQuiz` / `parseVideoQuiz` / `matchVideoQuizAnswers` / `applyVideoQuizAnswers` + `VIDEO_QUIZ_SETTING` | 视频播放中弹题自动作答并续播 | **缺这个时视频会卡在弹题上**（最该优先补） |
  | `extractJudgementToken` | 判断题选项写法归一（对/错/√/×/true/false） | 判断题匹配鲁棒性 |
  | `stripOptionLabel` / `stripQuestionTypeLabel` | 去掉「A.」「【单选题】」前缀 | 选项文本匹配精度 |

  其余上游能力（`decrypt` 字体解密、`inferQuestionTypeByStructure`、`clickNextStepButton`、
  `hookWebpack`、`XMLHttpRequestInterceptor`、`processPpt`/`processBook`、配置迁移）本 fork 均已具备。
- 智慧树只支持答题（与上游一致）。
- 题目被页面锁定后需点「修改/重做」才能重写。

## 自测

```bash
node --check chaoxing-zhihuishu-ai.user.js        # 语法
node tools/verify-ai-patch.cjs                     # 30 项断言：从真实源码切片验证 AI 补丁
node tools/analyze-work-result.cjs tools/fixtures/sample-work-result.html   # 归因工具（夹具应为 6 题/30 分/得 16）
node tools/publish-scan.cjs                        # 发布前敏感信息扫描
```

CI（GitHub Actions）在每次 push / PR 跑同样四步，见 [`.github/workflows/verify.yml`](.github/workflows/verify.yml)。

## 仓库结构

```text
chaoxing-zhihuishu-ai.user.js   改好的脚本本体（唯一需要装的文件）
reference/
  upstream-0.2.3.user.js        上游基线快照（MIT，用于对照 diff）
tools/
  verify-ai-patch.cjs           AI 补丁回归断言（切真实源码片段跑）
  analyze-work-result.cjs       作业结果归因（题型得分 / 失分明细 / 结论建议）
  publish-scan.cjs              发布前敏感信息扫描
  push-via-api.cjs              github.com 不通时用 api.github.com 上传
  publish-release.cjs           设 topics + 建 Release + 传附件
  fixtures/                     合成夹具（虚构题目，供 CI 用）
.github/
  workflows/verify.yml          CI
  ISSUE_TEMPLATE/               反馈模板
```

## 免责

- 本仓库**不是原创**，是上游 MIT 项目的 Fork；版权归各自作者，见 [LICENSE](LICENSE)。
- 仅供**学习与研究**，请在 24 小时内删除；使用导致的后果由使用者自负。
- 自动答题可能违反学校学术规范与平台条款。**如果你是本课程的教师、助教或考评人员，请不要使用。**
- 公开本仓库会让你的 GitHub 账号与「作业/考试辅助工具」产生公开关联，**下发给本校域名时风险更高**，请自行判断。

## 致谢

- 上游作者 **isMobile**：整套脚手架、字体加密解密、题型推断、平台适配。
- [DeepSeek 开放平台](https://api-docs.deepseek.com/)：模型与价格、JSON 输出、思考模式文档。
- 回归脚本与归因工具为本仓库自写，思路是「把真实源码切片拿出来跑断言」，避免改了没生效或改回去。
