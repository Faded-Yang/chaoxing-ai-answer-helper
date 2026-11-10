# v9.9.9-ai.1

## 这个版本改了什么

修的是「**AI 答文科题不准**」这件事。一份 28 题小测实测 73.5 分，逐题归因后做了四处改动：

| 改动 | 说明 |
| --- | --- |
| 课程/章节上下文 | 把作业标题（如「第七讲 华夷一体与中华民族空前繁盛」）作为口径一起发给模型 |
| 多选保守策略 | 写明「漏选按比例给分、多选/错选整题 0 分」→ 只交有把握的项，不再「能选就选」 |
| 联网搜索（可选） | Tavily / Bing / SearXNG / 自定义，三档触发；搜到的资料作为参考资料附在提示词后 |
| 一键开始 | 进页面不再自动跑，面板上点「开始」才执行 |

### 归因依据

| 题型 | 题数 / 分值 | 得分 | 失分原因 |
| --- | --- | --- | --- |
| 单选 | 15 / 45 | 36 | 3 题错在「通识顺口、但不是本讲口径」的干扰项 |
| 多选 | 8 / 40 | 22.5 | 2 题全选判 0、3 题漏选拿半分（丢 17.5 分） |
| 判断 | 5 / 15 | 15 | 全对 |

详见 [CHANGELOG.md](https://github.com/Faded-Yang/chaoxing-ai-answer-helper/blob/main/CHANGELOG.md)。

## 安装

```text
https://raw.githubusercontent.com/Faded-Yang/chaoxing-ai-answer-helper/main/chaoxing-zhihuishu-ai.user.js
```

或在下面 Assets 里下载 `.user.js` 手动导入。

版本号固定 `9.9.9` 且不声明 `@updateURL`，避免被上游覆盖 —— **请在脚本管理器里关闭该脚本的「检查更新」**。

## 已知缺项

视频弹题自动作答（上游 0.2.8 的 `watchVideoQuiz` 系列）尚未合并，视频卡在弹题时需手动作答。
其余上游能力（字体解密、题型推断、考试下一步、智慧树取题等）均已具备。

## 自测

```bash
node tools/verify-ai-patch.cjs    # 30 项断言
node tools/analyze-work-result.cjs tools/fixtures/sample-work-result.html
```
