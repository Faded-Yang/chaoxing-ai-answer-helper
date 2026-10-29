// ==UserScript==
// @name         🥇超星学习通｜知到智慧树--网课小助手（DeepSeek AI 答题版）|修复视频播放|自动跳转任务点|AI自动答题|逐渐支持更多平台
// @namespace    noshuang
// @version      9.9.9
// @note         本文件是 AI 改造版（接入 DeepSeek 在线答题）。版本号故意写成 9.9.9、且不声明 @updateURL/@downloadURL，这样即使原版脚本发布新版本，脚本管理器也不会用原版覆盖掉这里的 AI 改动。请同时在脚本猫里关闭该脚本的「检查更新」。
// @author       isMobile
// @license      MIT
// @note         本仓库是上游「超星学习通｜知到智慧树--网课小助手」(isMobile, MIT) 的 AI 改造版，原始发布页：https://scriptcat.org/zh-CN/script-show-page/711 ｜ 本仓库：https://github.com/Faded-Yang/chaoxing-ai-answer-helper
// @description  🤖 已改造为 DeepSeek AI 在线答题：在「答题」标签页填入自己的 API Key 即可，遇到题库没有的题也能作答，题库仅作可选的兜底。🏆 目前已经支持的平台：【超星学习通「功能基本完成」】【知到智慧树「目前只支持答题」】。🚀 目前已经具有的功能包括：▶️视频自动观看，跳转下一个任务点，📄章节测试、作业自动完成，无答案自动保存，💯考试自动完成，自动切换、保存。使用脚本请进入对应平台的页面。
// @icon         data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💯</text></svg>
// @match        *://*.chaoxing.com/*
// @match        *://*.edu.cn/*
// @match        *://*.nbdlib.cn/*
// @match         *://*.hnsyu.net/*
// @match        *://*.gdhkmooc.com/*
// @match        *://*.zhihuishu.com/*
// @require      https://lib.baomitu.com/vue/3.4.31/vue.global.prod.js
// @require      https://lib.baomitu.com/vue-demi/0.14.7/index.iife.js
// @require      data:application/javascript,window.Vue%3DVue%3B
// @require      https://lib.baomitu.com/element-plus/2.7.2/index.full.min.js
// @require      https://lib.baomitu.com/pinia/2.1.7/pinia.iife.min.js
// @require      https://lib.baomitu.com/rxjs/7.8.1/rxjs.umd.min.js
// @require      https://lib.baomitu.com/blueimp-md5/2.19.0/js/md5.min.js
// @resource     ElementPlus       https://lib.baomitu.com/element-plus/2.7.2/index.css
// @resource     ElementPlusStyle  https://lib.baomitu.com/element-plus/2.8.2/index.min.css
// @resource     ttf               https://www.forestpolice.org/ttf/2.0/table.json
// @connect      api.deepseek.com
// @connect      *
// @connect      api.tikuhai.com
// @connect      cx.icodef.com
// @connect      62.234.36.191
// @grant        GM_getResourceText
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @run-at       document-start
// @antifeature  ads      公众号或者app辅助答题
// @antifeature  payment  付费答题
// ==/UserScript==

(a=>{const e=document.createElement("style");e.dataset.source="vite-plugin-monkey",e.textContent=a,document.head.append(e)})(' .main-page{--app-font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--el-font-family: var(--app-font-family);z-index:100003;position:fixed;color:#1f2329;font-family:var(--app-font-family)!important;font-size:14px;line-height:1.5715;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-rendering:optimizeLegibility}.main-page *,.main-page input,.main-page button,.main-page textarea{font-family:var(--app-font-family)!important;letter-spacing:0}.main-page .el-card,.main-page .el-tabs,.main-page .el-text,.main-page .el-button,.main-page .el-input,.main-page .el-input__inner,.main-page .el-input-number,.main-page .el-table{font-family:var(--app-font-family)!important}.main-page .overlay{position:fixed;top:0;left:0;right:0;bottom:0;z-index:1001}.main-page .el-card{border:0}.main-page .card-header{display:flex;justify-content:space-between;flex-direction:row;align-items:center;margin:0;padding:0;cursor:move}.main-page .card-header .title{font-size:14px;display:flex;align-items:center;justify-content:center;font-weight:500}.main-page .warning-icon{margin-left:5px}.main-page .zoom-icon{cursor:pointer}.main-page .zoom-icon.is-spaced{margin-left:8px}.main-page .minus{margin:5px 10px -10px 0}.main-page .compact-divider{margin:0}.main-page .demo-tabs{display:initial}.main-page .el-card__header{background-color:#1f71e0;color:#fff;padding:7px 10px 7px 16px;margin:0}.main-page .el-card__body{padding:0 16px 20px}.main-page .el-tabs__nav-wrap:after{height:1px}.main-page .el-tabs__active-bar{background-color:#176ae5}.main-page .el-tabs__item{font-size:13px;height:34px}.main-page .el-tabs__item.is-top{font-weight:400;color:#4e5969;padding:0 8px 0 12px}.main-page .el-tabs__item.is-active{font-weight:500;color:#176ae5;padding:0 8px 0 12px}.main-page .script-home{padding-top:2px}.main-page .announcement-board{box-sizing:border-box;margin:2px 0 10px;padding:8px 10px;border:1px solid #bae0ff;border-radius:6px;background-color:#e6f4ff}.main-page .announcement-heading{display:flex;align-items:center;gap:6px;margin-bottom:4px;color:#0958d9;font-size:12px;font-weight:600;line-height:20px}.main-page .announcement-heading:before{content:"";width:6px;height:6px;flex:0 0 auto;border-radius:50%;background-color:#1677ff}.main-page .announcement-list{display:grid;gap:3px;margin:0;padding:0;list-style:none}.main-page .announcement-item{color:#1f2329;font-size:12px;line-height:20px;word-break:break-word}.main-page .log .el-text{font-weight:400;white-space:normal}.main-page .log-time{font-weight:400}.main-page .log-action-link{color:#176ae5;cursor:pointer;text-decoration:none}.main-page .log-action-link:hover{color:#409eff;text-decoration:underline}.main-page .log-divider{margin:0}.main-page .token-input,.main-page .question-list{font-size:12px}.main-page .token-label{border-radius:0}.main-page .question_table{width:625px}.main-page .setting{margin-top:-8px;font-size:14px}.main-page .setting-section-title{font-size:13px}.main-page .setting-checkbox{margin-bottom:6px}.main-page .setting-number{margin-top:6px}.main-page .setting .el-form-item{margin-bottom:0} ');

(function (vue, pinia, rxjs, md5, ElementPlus) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  /*! Element Plus Icons Vue v2.1.0 */
  var export_helper_default = (sfc, props) => {
    let target = sfc.__vccOpts || sfc;
    for (let [key, val] of props)
      target[key] = val;
    return target;
  };
  var full_screen_vue_vue_type_script_lang_default = {
    name: "FullScreen"
  };
  var _hoisted_1118 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, _hoisted_2118 = /* @__PURE__ */ vue.createElementVNode(
    "path",
    {
      fill: "currentColor",
      d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64v.064zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64l-192 .192zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64v-.064z"
    },
    null,
    -1
    /* HOISTED */
  ), _hoisted_3117 = [
    _hoisted_2118
  ];
  function _sfc_render118(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1118, _hoisted_3117);
  }
  var full_screen_default = /* @__PURE__ */ export_helper_default(full_screen_vue_vue_type_script_lang_default, [["render", _sfc_render118], ["__file", "full-screen.vue"]]);
  var minus_vue_vue_type_script_lang_default = {
    name: "Minus"
  };
  var _hoisted_1169 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, _hoisted_2169 = /* @__PURE__ */ vue.createElementVNode(
    "path",
    {
      fill: "currentColor",
      d: "M128 544h768a32 32 0 1 0 0-64H128a32 32 0 0 0 0 64z"
    },
    null,
    -1
    /* HOISTED */
  ), _hoisted_3168 = [
    _hoisted_2169
  ];
  function _sfc_render169(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1169, _hoisted_3168);
  }
  var minus_default = /* @__PURE__ */ export_helper_default(minus_vue_vue_type_script_lang_default, [["render", _sfc_render169], ["__file", "minus.vue"]]);
  var warning_vue_vue_type_script_lang_default = {
    name: "Warning"
  };
  var _hoisted_1288 = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 1024 1024"
  }, _hoisted_2288 = /* @__PURE__ */ vue.createElementVNode(
    "path",
    {
      fill: "currentColor",
      d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm48-176a48 48 0 1 1-96 0 48 48 0 0 1 96 0zm-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32z"
    },
    null,
    -1
    /* HOISTED */
  ), _hoisted_3287 = [
    _hoisted_2288
  ];
  function _sfc_render288(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("svg", _hoisted_1288, _hoisted_3287);
  }
  var warning_default = /* @__PURE__ */ export_helper_default(warning_vue_vue_type_script_lang_default, [["render", _sfc_render288], ["__file", "warning.vue"]]);
  var _GM_getResourceText = /* @__PURE__ */ (() => typeof GM_getResourceText != "undefined" ? GM_getResourceText : void 0)();
  var _GM_getValue = /* @__PURE__ */ (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
  var _GM_info = /* @__PURE__ */ (() => typeof GM_info != "undefined" ? GM_info : void 0)();
  var _GM_setValue = /* @__PURE__ */ (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
  var _GM_xmlhttpRequest = /* @__PURE__ */ (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
  var _unsafeWindow = /* @__PURE__ */ (() => typeof unsafeWindow != "undefined" ? unsafeWindow : void 0)();
  const getScriptInfo = () => {
    return {
      name: _GM_info.script.name,
      author: _GM_info.script.author,
      namespace: _GM_info.script.namespace,
      version: _GM_info.script.version,
      description: _GM_info.script.description
    };
  };
  const CONFIG_STORAGE_KEY = "config";
  const LEGACY_CONFIG_STORAGE_KEY = "globalConfig";
  const isPlainObject = (value) => {
    return Object.prototype.toString.call(value) === "[object Object]";
  };
  const cloneLatestValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => cloneLatestValue(item));
    }
    if (isPlainObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, cloneLatestValue(item)])
      );
    }
    return value;
  };
  const getItemName = (item) => {
    if (!isPlainObject(item) || typeof item.name !== "string")
      return null;
    return item.name;
  };
  const mergeArrayByLatestFields = (latestArray, storedArray) => {
    const canMergeByName = latestArray.every((item) => getItemName(item) !== null);
    if (!canMergeByName)
      return cloneLatestValue(storedArray.length ? storedArray : latestArray);
    return latestArray.map((latestItem) => {
      const latestName = getItemName(latestItem);
      const storedItem = storedArray.find((item) => getItemName(item) === latestName);
      return mergeByLatestFields(latestItem, storedItem);
    });
  };
  const mergeByLatestFields = (latestValue, storedValue) => {
    if (Array.isArray(latestValue)) {
      return mergeArrayByLatestFields(latestValue, Array.isArray(storedValue) ? storedValue : []);
    }
    if (isPlainObject(latestValue)) {
      const storedObject = isPlainObject(storedValue) ? storedValue : {};
      return Object.fromEntries(
        Object.entries(latestValue).map(([key, latestItem]) => [
          key,
          mergeByLatestFields(latestItem, storedObject[key])
        ])
      );
    }
    return storedValue === void 0 ? cloneLatestValue(latestValue) : storedValue;
  };
  const migrateConfig = (storedConfig, defaultConfig) => {
    const mergedConfig = mergeByLatestFields(defaultConfig, storedConfig);
    mergedConfig.version = defaultConfig.version;
    return mergedConfig;
  };
  const getLocalStorageConfig = () => {
    try {
      return localStorage.getItem(CONFIG_STORAGE_KEY) || "";
    } catch (error) {
      console.error(error);
      return "";
    }
  };
  const setLocalStorageConfig = (serializedConfig) => {
    try {
      localStorage.setItem(CONFIG_STORAGE_KEY, serializedConfig);
    } catch (error) {
      console.error(error);
    }
  };
  const getStoredConfigText = () => {
    const gmConfig = _GM_getValue(CONFIG_STORAGE_KEY);
    if (typeof gmConfig === "string" && gmConfig)
      return gmConfig;
    const localConfig = getLocalStorageConfig();
    if (localConfig)
      return localConfig;
    const legacyConfig = _GM_getValue(LEGACY_CONFIG_STORAGE_KEY);
    if (typeof legacyConfig === "string" && legacyConfig)
      return legacyConfig;
    return "";
  };
  const persistConfig = (config2) => {
    const serializedConfig = JSON.stringify(config2);
    _GM_setValue(CONFIG_STORAGE_KEY, serializedConfig);
    _GM_setValue(LEGACY_CONFIG_STORAGE_KEY, serializedConfig);
    setLocalStorageConfig(serializedConfig);
  };
  // 老配置里可能存着已下线的模型名（deepseek-chat 等），统一迁移到新的默认模型。
  // 第二个参数是“磁盘上原始存的那份配置”：合并默认值会把新字段补齐，只有看原始值才能判断
  // 这份配置是不是旧版写的（旧版预置列表里有 41flash/visionflash 这种中转别名）。
  // 注意：这里用到的 AI_* 常量定义在文件后面，但本函数只在 useConfigStore() 首次实例化时执行，
  // 那时整个 IIFE 早已执行完毕，所以不存在暂时性死区问题；请勿在模块顶层直接调用 useConfigStore()。
  const migrateAiConfig = (config2, storedConfig) => {
    const aiConfig = config2.aiConfig;
    if (!aiConfig || typeof aiConfig !== "object")
      return config2;
    if (!aiConfig.model || AI_RETIRED_MODELS.indexOf(String(aiConfig.model)) !== -1)
      aiConfig.model = DEEPSEEK_DEFAULT_MODEL;
    if (!Array.isArray(aiConfig.models) || !aiConfig.models.length)
      aiConfig.models = AI_DEFAULT_MODELS.slice();
    if (AI_THINKING_OPTIONS.every((item) => item.value !== aiConfig.thinking))
      aiConfig.thinking = "off";
    if (typeof aiConfig.autoThinking !== "boolean")
      aiConfig.autoThinking = true;
    if (typeof aiConfig.splitBigFill !== "boolean")
      aiConfig.splitBigFill = true;
    if (typeof aiConfig.autoStart !== "boolean")
      aiConfig.autoStart = false;
    if (typeof aiConfig.searchProvider !== "string")
      aiConfig.searchProvider = "off";
    if (typeof aiConfig.searchTrigger !== "string")
      aiConfig.searchTrigger = "choice";
    if (typeof aiConfig.searchKey !== "string")
      aiConfig.searchKey = "";
    if (typeof aiConfig.searchEndpoint !== "string")
      aiConfig.searchEndpoint = "";
    if (typeof aiConfig.searchMaxResults !== "number")
      aiConfig.searchMaxResults = 3;
    if (typeof aiConfig.modelsFrom !== "string")
      aiConfig.modelsFrom = "";
    if (typeof aiConfig.vision !== "boolean")
      aiConfig.vision = false;
    if (typeof aiConfig.visionLowDetail !== "boolean")
      aiConfig.visionLowDetail = false;
    const storedAi = storedConfig && storedConfig.aiConfig && typeof storedConfig.aiConfig === "object" ? storedConfig.aiConfig : null;
    const storedModelsVersion = storedAi ? Number(storedAi.modelsVersion || 0) : 0;
    if (storedModelsVersion !== AI_MODELS_VERSION) {
      // 旧列表可能残留 41flash / visionflash 这类接口不认识的名字：清掉并触发重新拉取
      aiConfig.models = AI_DEFAULT_MODELS.slice();
      aiConfig.modelsFrom = "";
    }
    aiConfig.modelsVersion = AI_MODELS_VERSION;
    return config2;
  };
  const useConfigStore = pinia.defineStore("configStore", {
    state: () => {
      const scriptInfo = getScriptInfo();
      const defaultConfig = {
        version: scriptInfo.version,
        isMinus: false,
        position: {
          x: "800px",
          y: "200px"
        },
        menuIndex: "0",
        platformName: "cx",
        platformParams: {
          cx: {
            name: "超星网课助手",
            parts: [
              {
                name: "章节设置",
                params: [
                  //     {
                  //     name: '视频速率',
                  //     value: 1,
                  //     type: 'number',
                  // },
                  {
                    name: "章节作业自动提交",
                    value: true,
                    type: "boolean"
                  },
                  {
                    name: "是否自动下一章节",
                    value: true,
                    type: "boolean"
                  },
                  {
                    name: "只答题，不做其他",
                    value: false,
                    type: "boolean"
                  }
                ]
              },
              {
                name: "考试设置",
                params: [{
                  name: "是否自动切换",
                  value: true,
                  type: "boolean"
                }]
              }
            ]
          },
          zhs: {
            name: "智慧树网课助手",
            parts: [{
              name: "答题设置",
              params: [{
                name: "是否自动切换",
                value: true,
                type: "boolean"
              }]
            }]
          },
          unknown: {
            name: "未知平台",
            parts: [{
              name: "答题设置",
              params: [{
                name: "是否自动切换",
                value: true,
                type: "boolean"
              }]
            }]
          }
        },
        // 没答案自动选择
        otherParams: {
          name: "其他参数",
          params: [
            //     {
            //     name: '没答案随机选择',
            //     value: true,
            //     type: 'boolean',
            // },
            {
              name: "切换、答题间隔，单位秒",
              value: 3,
              type: "number"
            },
            {
              name: "正确率达到多少自动提交",
              value: 85,
              type: "number"
            },
            {
              name: "答案相似度超过多少选择",
              value: 85,
              type: "number",
              min: 0,
              max: 100,
              step: 1
            }
          ]
        },
        queryApis: [
          {
            name: "题库",
            token: "",
            url: "http://api.tikuhai.com"
          }
          // {
          //     name: '一之题库',
          //     token: '',
          //     url: "http://api.tikuhai.com"
          // }
        ],
        // AI 答题配置：默认使用 DeepSeek，也可换成任意 OpenAI 兼容接口
        aiConfig: {
          enabled: true,
          apiKey: "",
          baseUrl: "https://api.deepseek.com",
          model: "deepseek-flash",
          // 模型列表：默认只给官方两个真实名字，点「拉取模型」会用你接口的 /models 结果覆盖
          models: [
            "deepseek-flash",
            "deepseek-v4-pro"
          ],
          // 上次成功拉取模型列表时用的接口地址 / 列表结构版本
          modelsFrom: "",
          modelsVersion: 2,
          // 思考模式：off 最省 token / low / high（官方默认是 high，思维链按输出计费）
          thinking: "off",
          // 计算类选择题 + 填空/简答/综合题自动加低档思考链（更准，稍贵，推荐开）
          autoThinking: true,
          // 综合大题按小问拆分分别作答（明显更准，请求数会变多）
          splitBigFill: true,
          // 图片题是否发给 AI（只有 deepseek-flash 支持图片，每张图最多约 1024 token）
          vision: false,
          // 图片用低清模式（512×512，约省 6 倍图片 token，字小的图可能看不清）
          visionLowDetail: false,
          // AI 作答失败时是否再用题库兜底（题库密钥为空时会自动跳过）
          fallbackToBank: true,
          // ---- 联网搜索（默认关闭；开启后把搜到的资料当"参考资料"一起发给模型）----
          // provider: off | tavily | searxng | bing | custom
          searchProvider: "off",
          // 触发时机：choice=单选/多选/判断先搜；mis=AI 没答出来才搜；always=所有题都先搜
          searchTrigger: "choice",
          // tavily/bing 填 API Key；searxng 填实例地址；custom 填完整 URL 模板（用 {q} 占位）
          searchKey: "",
          searchEndpoint: "",
          searchMaxResults: 3,
          // 一键开始：false = 进页面后需自己点「开始」才执行（不再一进页面就自动跑）
          autoStart: false
        }
      };
      let globalConfig = defaultConfig;
      let storedParsedConfig = null;
      const storedConfig = getStoredConfigText();
      if (storedConfig) {
        try {
          storedParsedConfig = JSON.parse(storedConfig);
          globalConfig = migrateConfig(storedParsedConfig, defaultConfig);
        } catch (error) {
          console.error(error);
        }
      }
      migrateAiConfig(globalConfig, storedParsedConfig);
      persistConfig(globalConfig);
      return globalConfig;
    },
    actions: {}
  });
  const formatDateTime = (dt) => {
    dt.getFullYear();
    dt.getMonth() + 1;
    dt.getDate();
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };
  const pad = (n) => {
    return n < 10 ? "0" + n : n.toString();
  };
  const getDateTime = () => {
    let now = /* @__PURE__ */ new Date();
    return formatDateTime(now);
  };
  const useLogStore = pinia.defineStore("logStore", {
    state: () => ({
      logList: []
    }),
    actions: {
      addLog(message, type) {
        const log = {
          message,
          time: getDateTime(),
          type
        };
        this.logList.push(log);
      }
    }
  });
  const useQuestionStore = pinia.defineStore("questionStore", {
    state: () => ({
      questionList: []
    }),
    actions: {
      addQuestion(question) {
        this.questionList.push(question);
      },
      clearQuestion() {
        this.questionList = [];
      }
    }
  });
  const _hoisted_1$6 = {
    key: 0,
    class: "announcement-board",
    "aria-label": "公告"
  };
  const _hoisted_2$5 = { class: "announcement-heading" };
  const _hoisted_3$4 = { class: "announcement-list" };
  const _hoisted_4$2 = ["innerHTML"];
  const _sfc_main$9 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      title: { default: "公告" },
      items: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        return _ctx.items.length ? (vue.openBlock(), vue.createElementBlock("section", _hoisted_1$6, [
          vue.createElementVNode("div", _hoisted_2$5, vue.toDisplayString(_ctx.title), 1),
          vue.createElementVNode("div", _hoisted_3$4, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.items, (item) => {
              return vue.openBlock(), vue.createElementBlock("div", {
                key: item.id,
                class: "announcement-item",
                innerHTML: item.content
              }, null, 8, _hoisted_4$2);
            }), 128))
          ])
        ])) : vue.createCommentVNode("", true);
      };
    }
  });
  const sleep = (second) => {
    return new Promise((resolve) => setTimeout(resolve, second * 1e3));
  };
  const NOTICE_API_URL = "https://api.tikuhai.com/def/notice";
  const createApiHeaders = (referer) => {
    const _self = _unsafeWindow;
    const getCookie = typeof _self.getCookie === "function" ? _self.getCookie.bind(_self) : () => "";
    return {
      "Content-Type": "application/json",
      "referer": referer,
      "u": _self.uid || getCookie("UID") || getCookie("_uid") || "",
      "t": Math.floor((/* @__PURE__ */ new Date()).getTime() / 1e3).toString()
    };
  };
  const withScriptInfoParams = (url2) => {
    const scriptInfo = getScriptInfo();
    return url2 + `?s=${scriptInfo.author}&v=${scriptInfo.version}`;
  };
  const handleError = (msg) => ({
    code: 10003,
    data: {
      answer: [],
      num: "",
      usenum: ""
    },
    msg
  });
  const apis = [
    "http://api.tikuhai.com/search"
    // "http://62.234.36.191" + '/search',
    // Add more URLs as needed
  ];
  const getAnswerFrom = async (question, url2) => {
    var _a;
    const configStore = useConfigStore();
    const headers = createApiHeaders(question.refer);
    const data = JSON.stringify({
      "question": question.title,
      "options": question.optionsText,
      "type": question.type,
      "questionData": question.element.outerHTML,
      "workType": question.workType,
      "id": ((_a = question.refer.match(/courseId=(\d+)/)) == null ? void 0 : _a[1]) || "",
      "key": configStore.queryApis[0].token
    });
    await sleep(configStore.otherParams.params[0].value);
    return new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: withScriptInfoParams(url2),
        method: "POST",
        headers,
        data,
        timeout: 5e3,
        onload: (response) => {
          try {
            const apiResponse = JSON.parse(response.responseText);
            resolve(apiResponse);
          } catch (e) {
            resolve(handleError("解析出错"));
          }
        },
        onerror: () => resolve(handleError("请求出错")),
        ontimeout: () => resolve(handleError("请求超时"))
      });
    });
  };
  const DEEPSEEK_DEFAULT_BASE_URL = "https://api.deepseek.com";
  const DEEPSEEK_DEFAULT_MODEL = "deepseek-flash";
  // 下拉/标签里预置的模型：只放官方真实可用的名字。
  // 注意：像 41flash、visionflash 这类是第三方中转自己起的别名，官方接口不认，必须点「拉取模型」从你自己的接口取真实列表。
  const AI_DEFAULT_MODELS = [
    "deepseek-flash",
    "deepseek-v4-pro"
  ];
  // 模型列表结构的版本号：改过预置列表就 +1，老配置会自动重新拉取一次，避免残留过期/别名模型
  const AI_MODELS_VERSION = 2;
  // 图片题（视觉）相关上限：每张图最多约 1024 token，最多带 2 张
  const AI_IMAGE_MAX_COUNT = 2;
  const AI_IMAGE_MAX_BYTES = 4 * 1024 * 1024;
  const AI_IMAGE_MAX_SIDE = 1600;
  const AI_IMAGE_MIN_SIDE = 60;
  // 已下线/改名的旧模型名，迁移时统一换成默认模型
  const AI_RETIRED_MODELS = [
    "deepseek-chat",
    "deepseek-reasoner",
    "deepseek-v3",
    "deepseek-v4-flash",
    "deepseek-v4-flash-vision-exp"
  ];
  // 计费别名：官方只对下面两个模型挂牌价
  const AI_PRICE_ALIASES = {
    "deepseek-chat": "deepseek-flash",
    "deepseek-v3": "deepseek-flash",
    "deepseek-v4-flash": "deepseek-flash",
    "deepseek-v4-flash-vision-exp": "deepseek-flash",
    "deepseek-reasoner": "deepseek-v4-pro"
  };
  // 官方价格：元 / 百万 token（DeepSeek 官方价格页，2026-09 核对；官方调价后请自行修改这里）
  const AI_PRICE_TABLE = {
    "deepseek-flash": {
      cacheHit: { peak: 0.04, offPeak: 0.02 },
      cacheMiss: { peak: 2, offPeak: 1 },
      output: { peak: 8, offPeak: 4 }
    },
    "deepseek-v4-pro": {
      cacheHit: { peak: 0.3, offPeak: 0.15 },
      cacheMiss: { peak: 9, offPeak: 4.5 },
      output: { peak: 27, offPeak: 13.5 }
    }
  };
  // 高峰时段：北京时间周一至周五 9:00-12:00、14:00-18:00；其余时段价格减半
  const AI_PEAK_HOUR_RANGES = [[9, 12], [14, 18]];
  const AI_THINKING_OPTIONS = [
    { value: "off", label: "思考模式：关闭（最省 token，推荐）" },
    { value: "low", label: "思考模式：低（多花一点，稍准）" },
    { value: "high", label: "思考模式：高（官方默认，最贵）" }
  ];
  const AI_ANSWER_CACHE = /* @__PURE__ */ new Map();
  // 本次会话的 token / 花费统计（只在内存里，用于面板展示）
  const AI_USAGE = /* @__PURE__ */ vue.reactive({
    questions: 0,
    promptTokens: 0,
    cachedTokens: 0,
    completionTokens: 0,
    cost: 0,
    unpriced: 0
  });
  const AI_MODELS_TRIED = { value: false };
  const escapeHtml = (text) => {
    return String(text == null ? "" : text).replace(/[&<>"']/g, (ch) => {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  };
  const AI_QUESTION_KINDS = {
    "0": "single",
    "1": "multi",
    "2": "fill",
    "3": "judge",
    "4": "essay",
    "5": "essay",
    "6": "essay",
    "999": "unknown",
    "单选题": "single",
    "多选题": "multi",
    "填空题": "fill",
    "判断题": "judge",
    "简答题": "essay",
    "未知题": "unknown"
  };
  const AI_KIND_RULES = {
    single: {
      label: "单选题",
      format: '{"answer":["正确选项的字母，例如 A"]}',
      extra: 'answer 数组里每项只放选项字母（如 "A"），不要放选项正文。若有两个以上选项在通识上都讲得通，选与本讲/本章上下文（题干上方会给）表述最一致的那一个，不要用更顺口的近义词替换讲义口径。',
      maxTokens: 48,
      thinkingMaxTokens: 2048
    },
    multi: {
      label: "多选题",
      format: '{"answer":["正确选项的字母，例如 A","C"]}',
      extra: "本题是多选题。先对 A/B/C/D 每个选项单独判断真伪再汇总。评分规则：漏选（少选）只按比例扣分，但多选或错选一个就整题 0 分——所以只提交你有明确把握的选项，没把握的一律不选，宁可少选也绝不凑数；三项把握都不高时只交把握最大的两项，禁止 A/B/C/D 全选。",
      maxTokens: 96,
      thinkingMaxTokens: 2048
    },
    judge: {
      label: "判断题",
      format: '{"answer":["正确"]} 或 {"answer":["错误"]}',
      extra: 'answer 数组只放一项，且只能是 "正确" 或 "错误"。',
      maxTokens: 32,
      thinkingMaxTokens: 1536
    },
    fill: {
      label: "填空题",
      format: '{"answer":["第1空答案","第2空答案"]}',
      extra: "answer 数组按空格的先后顺序给出每一空的答案，数量与空数一致；只有一空就只放一项。答案要简洁，不要写解析。",
      maxTokens: 320,
      thinkingMaxTokens: 4096
    },
    essay: {
      label: "简答题",
      format: '{"answer":["完整作答内容"]}',
      extra: "answer 数组只放一项，内容为条理清晰、可直接提交的完整答案。",
      maxTokens: 1024,
      thinkingMaxTokens: 6144
    },
    unknown: {
      label: "题目",
      format: '{"answer":["答案"]}',
      extra: "若题目给了选项，请给出正确选项的完整文字。",
      maxTokens: 512,
      thinkingMaxTokens: 4096
    }
  };
  const isAiAnswerData = (answerData) => {
    return !!(answerData && answerData.data && answerData.data.source === "ai");
  };
  const resolveQuestionKind = (type) => AI_QUESTION_KINDS[String(type)] || "unknown";
  const getAiConfig = () => {
    const configStore = useConfigStore();
    const aiConfig = configStore.aiConfig || {};
    const thinking = AI_THINKING_OPTIONS.some((item) => item.value === aiConfig.thinking) ? aiConfig.thinking : "off";
    return {
      enabled: aiConfig.enabled !== false,
      apiKey: String(aiConfig.apiKey || "").trim(),
      baseUrl: String(aiConfig.baseUrl || DEEPSEEK_DEFAULT_BASE_URL).trim(),
      model: String(aiConfig.model || DEEPSEEK_DEFAULT_MODEL).trim(),
      thinking,
      autoThinking: aiConfig.autoThinking !== false,
      splitBigFill: aiConfig.splitBigFill !== false,
      models: Array.isArray(aiConfig.models) ? aiConfig.models : [],
      modelsFrom: String(aiConfig.modelsFrom || ""),
      modelsVersion: Number(aiConfig.modelsVersion || 0),
      vision: aiConfig.vision === true,
      visionLowDetail: aiConfig.visionLowDetail === true,
      fallbackToBank: aiConfig.fallbackToBank !== false,
      searchProvider: String(aiConfig.searchProvider || "off"),
      searchTrigger: String(aiConfig.searchTrigger || "choice"),
      searchKey: String(aiConfig.searchKey || "").trim(),
      searchEndpoint: String(aiConfig.searchEndpoint || "").trim(),
      searchMaxResults: Math.min(5, Math.max(1, Number(aiConfig.searchMaxResults) || 3)),
      autoStart: aiConfig.autoStart === true
    };
  };
  const aiError = (msg) => {
    const error = handleError(msg);
    error.data.source = "ai";
    return error;
  };
  // 固定不变的 system 提示：DeepSeek 硬盘缓存按前缀命中，system 越稳定越容易命中（命中价约为未命中的 1/50）。
  // 这段是“严格作答规则”：把最容易翻车的几类（问法、IEEE754 偏置、编码换算、占位符、空对应）
  // 写死在这里，实测能救回大量计算/编码题（例如把阶码字段 144 直接当成 2^144 这类错误）。
  const AI_SYSTEM_PROMPT = [
    "你是严谨的学科答题助手，独立推理出标准答案，不要依据题号或选项长度猜测。",
    "先看清问法：问的是“正确的”还是“错误的/不能的/不属于的”，必须按问法作答，不能答反。",
    "人文社科/思政/历史/文学类题：选项措辞通常直接取自本讲课件或教材，不要用更顺口的通识表述去替换讲义口径。题目里若给了“课程/章节上下文”，就以该讲讲过的结论为准；两三个选项都像时，选与本讲标题主题最契合的那个（例如讲“华夷一体”时，“天下共主”“华夷共生”优于“接续一统”“互通有无”）。",
    "多选题评分规则：漏选只按比例扣分，多选或错选一个则整题 0 分。因此宁可少选，不要凑数：每个选项单独判断，只提交有明确把握的那几个。",
    "不要依据选项长短、字母顺序、题号或“看起来更全面”来猜；拿不准时选最贴合本讲口径的那一项，而不是最像口号的那一项。",
    "计算或编码题必须先算准再答，禁止凭印象作答。常用规则：",
    "① IEEE754 单精度共 32 位：第 1 位符号、第 2~9 位阶码（8 位，偏置 127）、第 10~32 位尾数（23 位）；阶码真值 = 阶码字段 − 127（双精度偏置 1023），绝不能把偏置后的阶码字段当真值；尾数写 1.xxxx 形式，xxxx 就是那 23 位，末尾无效的 0 去掉；",
    "② n 位补码范围 −2^(n−1) ~ 2^(n−1)−1；移码偏置 2^(n−1)，移码 = 补码符号位取反；",
    "③ 8421(BCD) 码：把每个字节拆成两个十进制数字，按书写顺序（高字节→低字节）顺次相连即十进制值，例如字节 32H、34H 得到数字 3、2、3、4；",
    "④ ASCII 字符串：按书写顺序取每字节低 7 位对应的字符，例如字节 32H 34H 35H 38H 对应字符串 2458；",
    "⑤ 国标码 = 区位码 + 2020H：每 2 个字节为一对，高字节 −20H 是区号、低字节 −20H 是位号，注意减的是十六进制 20H（等于十进制 32），不是十进制 20；",
    "多字节数据按书写顺序（高字节→低字节）拆字节，除非题目要求按内存地址顺序；小端时低地址放低字节。",
    "只输出一个 JSON 对象，禁止输出解释、注释、Markdown 代码块或任何多余文字。",
    'JSON 结构固定为 {"answer": [...]}，每一项只放答案本身：不要序号、不要单位说明、不要推导过程。',
    "后缀跟着题目走：如果题干里【空k】后面已经印了 H、B 或单位，就只填数值本身，绝不要再重复写后缀（否则会变成 38HH、…BB 这种错误）；只有题目明确要求“以 H/B 结尾”而空格后没有印后缀时，才把后缀写进答案。",
    "绝对禁止占位符：不许出现“第N空”“空N”“略”“无法确定”“未知”“待定”“同上”；即使不确定也要给出最可能的具体答案，不能返回空数组。",
    "填空题的 answer 项数必须与空格数完全一致，按题干里【空1】【空2】…的顺序一一对应，不能多也不能少。"
  ].join("\n");
  // 发请求前把 HTML/图片标签去掉：纯文字请求里图片标签只会白烧 token（图片单独走视觉通道）
  const stripTagsForAi = (text) => {
    return String(text == null ? "" : text).replace(/<img[^>]*>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/gi, " ").replace(/&[a-z]+;/gi, " ").replace(/\s+/g, " ").trim();
  };
  // 收集题目里的图片地址（题干、选项、DOM 里的 img），最多 AI_IMAGE_MAX_COUNT 张
  const collectQuestionImageUrls = (question) => {
    const urls = [];
    const push = (src) => {
      const value = String(src == null ? "" : src).trim();
      if (!value || value.indexOf("data:") === 0)
        return;
      if (!/^https?:\/\//i.test(value) && value.indexOf("//") !== 0)
        return;
      if (urls.indexOf(value) === -1 && urls.length < AI_IMAGE_MAX_COUNT)
        urls.push(value);
    };
    try {
      if (question.element && typeof question.element.querySelectorAll === "function") {
        for (const img of question.element.querySelectorAll("img")) {
          push(img.getAttribute ? img.getAttribute("src") : img.src);
        }
      }
    } catch (error) {
    }
    const fromHtml = (text) => {
      const tags = String(text == null ? "" : text).match(/<img[^>]*>/gi) || [];
      for (const tag of tags) {
        const matched = tag.match(/src\s*=\s*["']?([^"'\s>]+)/i);
        if (matched)
          push(matched[1]);
      }
    };
    fromHtml(question.title);
    for (const option of question.optionsText || [])
      fromHtml(option);
    return urls;
  };
  const questionIsAnswerable = (question, visionEnabled) => {
    if (stripTagsForAi(question.title).length >= 2)
      return true;
    return !!visionEnabled && collectQuestionImageUrls(question).length > 0;
  };
  const aiMaxTokens = (question, thinking) => {
    const rule = AI_KIND_RULES[resolveQuestionKind(question.type)];
    return thinking === "off" ? rule.maxTokens : rule.thinkingMaxTokens;
  };
  // 题干里的填写框选择器（排除单选/多选/按钮）
  const AI_BLANK_FIELD_SELECTOR = "input:not([type=radio]):not([type=checkbox]):not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]), textarea, [contenteditable='true']";
  // 统一“空”的收集顺序：文本输入框 + textarea 按 DOM 顺序；只有两者都没有时才用 contenteditable。
  // 这样 AI 看到的【空k】顺序 = 实际填写的顺序（UEditor 那种会同时存在隐藏 textarea 和可编辑 div，
  // 只用 textarea 计数可避免重复计空）。
  // 超星填空题大题：题干用连续下划线表示空位（实测那道 60 分大题正好 20 段下划线 = 20 个空），
  // 而真正的输入框（UEditor 的隐藏 textarea）全都排在题干后面。
  // 所以不能只在末尾堆标记，要把题干里的下划线就地换成【空k】，模型才看得出每个空属于哪个小问。
  const AI_BLANK_RUN_RE = /_{4,}|＿{4,}/g;
  const AI_BLANK_LABEL_RE = /第\s*1\s*空|【空/;
  const readDeclaredBlankCount = (root) => {
    try {
      if (!root || typeof root.querySelector !== "function")
        return 0;
      const hidden = root.querySelector('input[name^="tiankongsize"]');
      const value = hidden && hidden.value ? parseInt(hidden.value, 10) : 0;
      return value > 0 && value < 200 ? value : 0;
    } catch (error) {
      return 0;
    }
  };
  // 优先在超星填空题专用的填充区里找输入框，避免误抓页面上的其他输入框
  const preferBlankScope = (root) => {
    try {
      if (root && typeof root.querySelector === "function") {
        const scope = root.querySelector(".stem_answer");
        if (scope && typeof scope.querySelectorAll === "function" && scope.querySelectorAll("textarea, input").length)
          return scope;
      }
    } catch (error) {
    }
    return root;
  };
  // 题干里下划线段数正好等于空数时，把第 k 段换成【空k】
  const markInlineBlanks = (text, blankCount) => {
    const value = String(text == null ? "" : text);
    if (!blankCount || !value)
      return "";
    AI_BLANK_RUN_RE.lastIndex = 0;
    const runs = value.match(AI_BLANK_RUN_RE);
    if (!runs || runs.length !== blankCount)
      return "";
    let index = 0;
    return value.replace(AI_BLANK_RUN_RE, () => "【空" + (++index) + "】");
  };
  const collectBlankFields = (root) => {
    const fields = [];
    const scope = preferBlankScope(root);
    if (!scope || typeof scope.querySelectorAll !== "function")
      return fields;
    for (const field of scope.querySelectorAll("textarea, input")) {
      const tag = String(field.tagName || "").toLowerCase();
      if (tag === "textarea") {
        fields.push(field);
        continue;
      }
      const type = String(field.getAttribute ? field.getAttribute("type") || "text" : "text").toLowerCase();
      if (["text", "search", "number", "tel", "url", "email"].indexOf(type) === -1)
        continue;
      if (field.disabled)
        continue;
      fields.push(field);
    }
    if (fields.length)
      return fields;
    for (const field of scope.querySelectorAll("[contenteditable='true']"))
      fields.push(field);
    return fields;
  };
  // 题干里 32 位值的手工切位是模型最容易翻车的地方（阶码字段连错两次、尾数抄串），
  // 这类纯机械换算交给脚本预计算，作为“事实”喂给模型，模型只负责套规则和排版。
  const normalizeHexValues = (text) => {
    const out = [];
    const re = /([0-9A-Fa-f][0-9A-Fa-f\s]{2,}?)\s*H\b/g;
    const source = String(text == null ? "" : text);
    let matched;
    while ((matched = re.exec(source)) !== null) {
      const cleaned = matched[1].replace(/\s+/g, "").toUpperCase();
      if (cleaned.length >= 4 && cleaned.length <= 16 && out.indexOf(cleaned) === -1)
        out.push(cleaned);
    }
    return out;
  };
  const hexToBits = (hex) => {
    let bits = "";
    for (const ch of String(hex || "")) {
      const value = parseInt(ch, 16);
      if (isNaN(value))
        return "";
      bits += value.toString(2).padStart(4, "0");
    }
    return bits;
  };
  const groupBits = (bits) => String(bits || "").replace(/(\d{4})(?=\d)/g, "$1 ");
  const buildEncodingHints = (text) => {
    const source = String(text == null ? "" : text);
    const lines = [];
    const values = normalizeHexValues(source);
    if (!values.length)
      return lines;
    const wantsIeee = /754|浮点/.test(source) && !/双精度/.test(source);
    const wantsGb = /国标码|区位码|GB\s*2312/i.test(source);
    const wantsBcd = /8421|BCD/i.test(source);
    const wantsAscii = /ASCII/i.test(source);
    for (const hex of values) {
      const bits = hexToBits(hex);
      if (bits.length === 32 && wantsIeee) {
        lines.push(`${hex}H = ${groupBits(bits)}B（共 32 位）：第 1 位符号=${bits[0]}，第 2~9 位阶码字段=${parseInt(bits.slice(1, 9), 2)}（二进制 ${bits.slice(1, 9)}），第 10~32 位尾数=${bits.slice(9)}`);
      }
      const bytes = hex.match(/../g) || [];
      if (wantsGb && (hex.length === 8 || hex.length === 4) && bytes.length >= 2) {
        const parts = bytes.map((b) => `${b}H(${parseInt(b, 16)})`);
        const pairs = [];
        for (let i = 0; i + 1 < bytes.length; i += 2) {
          pairs.push(`第 ${pairs.length + 1} 个汉字（${bytes[i]}${bytes[i + 1]}H）→ 区 ${parseInt(bytes[i], 16) - 32}、位 ${parseInt(bytes[i + 1], 16) - 32}`);
        }
        lines.push(`${hex}H 的字节（高字节→低字节）= ${parts.join("、")}；国标码求区位 = 每个字节减去 20H（即十进制 32）：${pairs.join("；")}`);
        if (pairs.length > 1 && /从右至左|从右到左|从右往左|顺序/.test(source)) {
          // 实测结论（按两次批阅成绩反推）：这道题库题的题干写着“从右至左”，
          // 但标准答案就是按书写顺序 —— 高 2 字节那个汉字在前。按题干字面倒过来填会整组丢分。
          lines.push("注意：本题库的标准答案顺序是“先高 2 字节那个汉字，再低 2 字节那个”；即使题干写着“从右至左”，也按这个顺序填。");
        }
      }
      if (wantsBcd && /^[0-9]+$/.test(hex))
        lines.push(`${hex}H 的 8421(BCD) 码值 = ${hex}`);
      if (wantsAscii && bytes.length && bytes.every((b) => parseInt(b, 16) < 128)) {
        const chars = bytes.map((b) => String.fromCharCode(parseInt(b, 16))).join("");
        lines.push(`${hex}H 按 ASCII（每字节低 7 位）解出的字符串 = ${chars}`);
      }
    }
    return lines;
  };
  const appendEncodingHints = (lines, text) => {
    const hints = buildEncodingHints(text);
    if (!hints.length)
      return;
    lines.push("脚本已经算好的换算事实（直接采用，不要再自己数位或换算）：");
    for (const hint of hints)
      lines.push("· " + hint);
  };
  // 生成带空位标记的题干：优先“把题干里的下划线就地换成【空k】”，不行再退回“把输入框换成【空k】”
  const buildBlankAwareStem = (question) => {
    const element = question.element;
    if (!element || typeof element.cloneNode !== "function" || typeof element.querySelectorAll !== "function")
      return { text: "", blankCount: 0 };
    try {
      const declared = readDeclaredBlankCount(element);
      const clone = element.cloneNode(true);
      const fields = collectBlankFields(clone);
      const blankCount = declared || fields.length;
      if (!blankCount)
        return { text: "", blankCount: 0 };
      let stemRaw = String(clone.textContent == null ? "" : clone.textContent);
      const cutAt = stemRaw.search(AI_BLANK_LABEL_RE);
      if (cutAt > 0)
        stemRaw = stemRaw.slice(0, cutAt);
      const inline = markInlineBlanks(stemRaw.replace(/\s+/g, " ").trim(), blankCount);
      if (inline)
        return { text: inline.slice(0, 4000), blankCount };
      let index = 0;
      for (const field of fields) {
        index += 1;
        if (field.parentNode)
          field.parentNode.replaceChild(document.createTextNode("【空" + index + "】"), field);
      }
      const text = String(clone.textContent == null ? "" : clone.textContent).replace(/\s+/g, " ").trim();
      return { text: text.slice(0, 4000), blankCount: index || blankCount };
    } catch (error) {
      return { text: "", blankCount: 0 };
    }
  };
  // ---------- 页面结构诊断（导出真实 DOM 结构，用来精确适配答题页） ----------
  // 只导出标签名、class、name/placeholder、数量这类“结构信息”，不含题干文字内容。
  const DOM_DIAG_MAX_CHARS = 4000;
  const DOM_DIAG_QUESTION_SELECTORS = [".TiMu", ".questionLi", ".examPaper_subject", ".subject_describe", ".mark_item"];
  const DOM_DIAG_ANSWER_HINTS = ["正确答案", "参考答案", "答案解析", "解析", "得分", "我的答案"];
  const shortClass = (element) => {
    return String(element && element.className || "").trim().split(/\s+/).filter(Boolean).slice(0, 4).join(".");
  };
  const outlineNode = (element, depth, maxDepth, state) => {
    if (!element || state.count >= 60 || depth > maxDepth)
      return "";
    const tag = String(element.tagName || "").toLowerCase();
    if (!tag || ["script", "style", "noscript", "svg", "path"].indexOf(tag) !== -1)
      return "";
    state.count += 1;
    const cls = shortClass(element);
    let head = new Array(depth + 1).join("  ") + tag + (cls ? "." + cls : "") + (element.id ? "#" + String(element.id).slice(0, 18) : "");
    if (tag === "input") {
      const type = element.getAttribute ? element.getAttribute("type") || "text" : "text";
      const name = element.getAttribute ? String(element.getAttribute("name") || "").slice(0, 16) : "";
      head += "[type=" + type + (name ? " name=" + name : "") + "]";
    }
    const children = [];
    for (const child of element.children || []) {
      const text = outlineNode(child, depth + 1, maxDepth, state);
      if (text)
        children.push(text);
    }
    return children.length ? head + "\n" + children.join("\n") : head;
  };
  const describeBlankFields = (root) => {
    const fields = collectBlankFields(root);
    const parts = [];
    for (let index = 0; index < fields.length && index < 12; index += 1) {
      const field = fields[index];
      const tag = String(field.tagName || "").toLowerCase();
      const type = field.getAttribute ? field.getAttribute("type") || "text" : "text";
      const cls = shortClass(field);
      const name = field.getAttribute ? String(field.getAttribute("name") || "").slice(0, 18) : "";
      const placeholder = field.getAttribute ? String(field.getAttribute("placeholder") || "").slice(0, 18) : "";
      parts.push("空" + (index + 1) + ":" + tag + (tag === "input" ? "[type=" + type + "]" : "") + (cls ? "." + cls : "") + (name ? " name=" + name : "") + (placeholder ? " ph=" + placeholder : ""));
    }
    return { count: fields.length, text: parts.join(" | ") };
  };
  const buildPageDiagnostics = () => {
    const lines = [];
    lines.push("=== 超星答题页结构诊断 ===");
    lines.push("脚本版本: " + getScriptInfo().version + " | inIframe: " + (window.top !== window.self) + " | readyState: " + document.readyState);
    lines.push("URL: " + String(window.location.href).slice(0, 170));
    const hits = [];
    for (const selector of DOM_DIAG_QUESTION_SELECTORS) {
      let total = -1;
      try {
        total = document.querySelectorAll(selector).length;
      } catch (error) {
        total = -1;
      }
      hits.push(selector + "=" + total);
    }
    lines.push("题干容器命中: " + hits.join(" "));
    lines.push("iframe 数: " + document.querySelectorAll("iframe").length);
    let container = null;
    for (const selector of DOM_DIAG_QUESTION_SELECTORS) {
      const found = document.querySelectorAll(selector);
      if (found && found.length) {
        container = { selector, first: found[0], total: found.length };
        break;
      }
    }
    if (!container) {
      lines.push("未命中题干容器：可能题目还没渲染完，请等题目出现在页面上后再点一次");
      return lines.join("\n").slice(0, DOM_DIAG_MAX_CHARS);
    }
    lines.push("采用容器: " + container.selector + " × " + container.total);
    const classCount = {};
    for (const node of container.first.querySelectorAll("*")) {
      for (const name of String(node.className || "").split(/\s+/)) {
        if (name)
          classCount[name] = (classCount[name] || 0) + 1;
      }
    }
    lines.push("容器内 class 词表: " + Object.keys(classCount).sort((a, b) => classCount[b] - classCount[a]).slice(0, 40).join(" "));
    const hintHit = {};
    for (const keyword of DOM_DIAG_ANSWER_HINTS)
      hintHit[keyword] = 0;
    let scanned = 0;
    for (const node of document.querySelectorAll("div,span,p,td")) {
      if (scanned > 4000)
        break;
      scanned += 1;
      const text = node.textContent || "";
      if (!text || text.length > 300)
        continue;
      for (const keyword of DOM_DIAG_ANSWER_HINTS) {
        if (!hintHit[keyword] && text.indexOf(keyword) !== -1)
          hintHit[keyword] = 1;
      }
    }
    lines.push("含答案/解析字样: " + DOM_DIAG_ANSWER_HINTS.map((k) => k + "=" + hintHit[k]).join(" "));
    const blanks = describeBlankFields(container.first);
    lines.push("第1题空位数: " + blanks.count);
    if (blanks.text)
      lines.push("空位描述: " + blanks.text);
    const images = container.first.querySelectorAll("img");
    lines.push("第1题图片数: " + images.length + (images.length ? " | 例: class=" + shortClass(images[0]) + " src=" + String(images[0].getAttribute ? images[0].getAttribute("src") || "" : "").slice(0, 80) : ""));
    lines.push("第1题 DOM 概要（仅标签/class，不含文字）:");
    lines.push(outlineNode(container.first, 0, 4, { count: 0 }));
    return lines.join("\n").slice(0, DOM_DIAG_MAX_CHARS);
  };
  // 计算类/编码类关键词：这类题最容易算错，自动加低档思考链
  const AI_COMPUTE_HINT = /(补码|移码|原码|反码|IEEE|浮点|阶码|尾数|编码|进制|十六进制|二进制|八进制|十进制|转换|换算|计算|求值|范围|溢出|校验|海明|CRC|8421|BCD|国标码|区位码|ASCII|大端|小端|字节|字长|地址|存储器|容量|带宽|主频|CPI|MIPS|除法|乘法|余数|真值|地址码|操作码|指令|流水线|命中率|吞吐)/;
  const aiNeedsCarefulThinking = (question, kind) => {
    // 选择题/判断题不再自动开思考链：实测一道补码选择题烧掉 515 个输出 token，
    // 而思考链和答案共用 max_tokens，额度一满就只返回思考过程、content 为空
    //（本次第 4、9 题就是这么失败的）。选择题改用系统提示里的规则（IEEE754 偏置等）来兜底，
    // 想更准可以在面板上手动勾选「启用思考链」。
    if (kind === "fill" || kind === "essay" || kind === "unknown")
      return true;
    return false;
  };
  // 用户手动开了思考链就听用户的；否则按题型/关键词自动决定（可关闭）
  const resolveThinking = (question, aiConfig, kind) => {
    if (aiConfig.thinking !== "off")
      return aiConfig.thinking;
    if (aiConfig.autoThinking && aiNeedsCarefulThinking(question, kind))
      return "low";
    return "off";
  };
  // 占位符检测：出现这些内容说明模型在糊弄，需要用更严格的要求重问一次
  const AI_PLACEHOLDER_PATTERN = /(第\s*\d+\s*空|^\s*空\s*\d+\s*$|无法确定|不能确定|不确定|待定|待求|未知|略|同上|TODO|N\/A)/;
  const findPlaceholderAnswer = (answer) => {
    if (!Array.isArray(answer))
      return "";
    for (const item of answer) {
      const text = String(item == null ? "" : item).trim();
      if (!text)
        return "(空项)";
      if (AI_PLACEHOLDER_PATTERN.test(text))
        return text;
    }
    return "";
  };
  const appendHintToMessages = (messages, hint) => {
    return messages.map((message, index) => {
      if (index !== messages.length - 1)
        return message;
      if (typeof message.content === "string")
        return { role: message.role, content: message.content + "\n" + hint };
      const parts = message.content.map((part) => {
        return part.type === "text" ? { type: "text", text: part.text + "\n" + hint } : part;
      });
      return { role: message.role, content: parts };
    });
  };
  // 从接口返回里取出答案数组（成功/失败都返回结构化结果，便于重试逻辑复用）
  const extractAnswerFromBody = (body, question) => {
    const choice = body && body.choices ? body.choices[0] : null;
    const content = choice && choice.message ? choice.message.content : "";
    const parsed = parseAiJson(content);
    if (!parsed) {
      return {
        ok: false,
        emptyContent: !String(content == null ? "" : content).trim(),
        message: String(content == null ? "" : content).trim()
          ? "AI 返回内容无法解析：" + String(content).slice(0, 60)
          : "AI 没有返回答案内容（很可能思考过程把 max_tokens 用完了，只输出了 reasoning_content）"
      };
    }
    const rawAnswer = Array.isArray(parsed) ? parsed : parsed.answer !== void 0 ? parsed.answer : parsed.answers !== void 0 ? parsed.answers : parsed["答案"];
    if (rawAnswer === void 0 || rawAnswer === null)
      return { ok: false, message: "AI 未返回 answer 字段" };
    const answer = resolveAiAnswer(rawAnswer, question);
    if (!answer.length)
      return { ok: false, message: "AI 返回了空答案" };
    return { ok: true, answer, usage: body ? body.usage : null };
  };
  // ---------- 课程/章节上下文：让模型知道“这一讲讲的是什么” ----------
  // 实测一份文科小测（28 题 100 分只得 73.5）：错的单选题都不是“知识点不会”，
  // 而是选了通识上更顺口、却不是本讲口径的干扰项
  // （「接续一统」→ 正解「天下共主」、「内外兼顾、胡汉一体」→「南北统一、胡汉一体」、
  //   「互通有无」→「华夷共生」）。把作业/测验标题（常常就是「第 N 讲 + 主题」）一起发过去，
  // 模型才知道该按哪一讲的口径选。取不到就不加，绝不编造。
  const COURSE_CTX_CACHE = /* @__PURE__ */ new Map();
  const COURSE_CTX_WORK_SELECTORS = [".mark_title", "h2.mark_title", "#mark_title", ".workTitle", "#workTitle", ".work-title", ".examTitle", ".title_name"];
  const COURSE_CTX_CHAPTER_SELECTORS = [".posCatalog_select .posCatalog_name", ".posCatalog_active .posCatalog_name", "#chapterName", ".chapterName", ".curChapter", ".prev_next", ".chapter_title"];
  const COURSE_CTX_COURSE_SELECTORS = ["#courseName", ".courseName", ".course_name", ".course-name", ".courseTitle"];
  const COURSE_CTX_JUNK = /^(作业|考试|章节|详情|作业详情|考试详情|返回|首页|退出|超星学习通|学习通|智慧树|知到|个人空间)$/;
  const COURSE_CTX_PLATFORM = /超星学习通|学习通|智慧树|知到|个人空间|课程空间/;
  const COURSE_CTX_MAX = 220;
  const readCtxText = (node) => {
    try {
      return String(node && (node.textContent || node.innerText) || "").replace(/\s+/g, " ").trim();
    } catch (error) {
      return "";
    }
  };
  const cleanCtxText = (text) => {
    const value = String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    if (value.length < 4 || value.length > 120)
      return "";
    if (COURSE_CTX_JUNK.test(value))
      return "";
    if (COURSE_CTX_PLATFORM.test(value) && value.length < 16)
      return "";
    return value;
  };
  const firstCtxMatch = (doc, selectors) => {
    if (!doc)
      return "";
    for (const selector of selectors) {
      let nodes;
      try {
        nodes = doc.querySelectorAll(selector);
      } catch (error) {
        continue;
      }
      for (const node of nodes) {
        const value = cleanCtxText(readCtxText(node));
        if (value)
          return value;
      }
    }
    return "";
  };
  const collectCourseContext = (question) => {
    let doc = null;
    try {
      doc = question && question.element ? question.element.ownerDocument : null;
    } catch (error) {
      doc = null;
    }
    const cacheable = !!doc;
    if (cacheable && COURSE_CTX_CACHE.has(doc))
      return COURSE_CTX_CACHE.get(doc);
    const parts = [];
    const push = (label, value) => {
      const text = cleanCtxText(value);
      if (!text || parts.some((item) => item.value === text))
        return;
      parts.push({ label, value: text });
    };
    push("作业/测验", firstCtxMatch(doc, COURSE_CTX_WORK_SELECTORS));
    push("章节", firstCtxMatch(doc, COURSE_CTX_CHAPTER_SELECTORS));
    let topDoc = null;
    try {
      if (typeof window !== "undefined" && window.top && window.top.document && window.top.document !== doc)
        topDoc = window.top.document;
    } catch (error) {
      topDoc = null;
    }
    if (topDoc) {
      push("课程", firstCtxMatch(topDoc, COURSE_CTX_COURSE_SELECTORS));
      if (!parts.some((item) => item.label === "作业/测验"))
        push("作业/测验", firstCtxMatch(topDoc, COURSE_CTX_WORK_SELECTORS));
      if (!parts.some((item) => item.label === "章节"))
        push("章节", firstCtxMatch(topDoc, COURSE_CTX_CHAPTER_SELECTORS));
    }
    if (!parts.length) {
      try {
        push("页面标题", topDoc ? topDoc.title : doc ? doc.title : "");
      } catch (error) {
      }
    }
    const line = parts.length ? "课程/章节上下文：" + parts.map((item) => item.label + "=" + item.value).join("；").slice(0, COURSE_CTX_MAX) + "（请按这一讲/这一章讲过的口径作答）" : "";
    if (cacheable && line)
      COURSE_CTX_CACHE.set(doc, line);
    return line;
  };
  const withCourseContext = (text, question) => {
    const body = String(text == null ? "" : text);
    const context = collectCourseContext(question);
    if (!context || body.indexOf(context) === 0)
      return body;
    return context + "\n" + body;
  };
  const buildAiQuestionText = (question, imageCount) => {
    const kind = resolveQuestionKind(question.type);
    const rule = AI_KIND_RULES[kind];
    const options = (Array.isArray(question.optionsText) ? question.optionsText : []).map(stripTagsForAi).filter(Boolean);
    const needsBlanks = kind === "fill" || kind === "essay" || kind === "unknown";
    const blanks = needsBlanks ? buildBlankAwareStem(question) : { text: "", blankCount: 0 };
    const lines = [];
    lines.push("题型：" + rule.label);
    lines.push("作答要求：" + rule.extra + "输出格式：" + rule.format);
    if (blanks.blankCount > 0 && blanks.text) {
      lines.push("题干（题干里用【空k】标出了第 k 个空的位置，共有 " + blanks.blankCount + " 个空）：" + blanks.text);
      lines.push("本题 answer 数组必须正好 " + blanks.blankCount + " 项，第 k 项对应【空k】，顺序不能错；每一项都要是具体答案，不许写“第k空”或“无法确定”。");
    } else {
      lines.push("题目：" + (stripTagsForAi(question.title) || "（题干文字缺失，请依据图片判断）"));
      if (needsBlanks)
        lines.push("答案项数与题目中的空格数保持一致，按空格的先后顺序排列。");
    }
    if (options.length) {
      lines.push("选项：");
      for (let index = 0; index < options.length; index += 1) {
        lines.push(String.fromCharCode(65 + index) + ". " + options[index]);
      }
    }
    if (imageCount) {
      lines.push("本题附带了 " + imageCount + " 张图片，请结合图片里的内容作答。");
    }
    appendEncodingHints(lines, lines.join("\n"));
    return lines.join("\n");
  };
  const buildAiMessages = (question, images, textOverride) => {
    const list = Array.isArray(images) ? images : [];
    const text = withCourseContext(typeof textOverride === "string" && textOverride ? textOverride : buildAiQuestionText(question, list.length), question);
    if (!list.length) {
      return [
        { role: "system", content: AI_SYSTEM_PROMPT },
        { role: "user", content: text }
      ];
    }
    const parts = [{ type: "text", text }];
    for (const image of list) {
      const imageUrl = { url: image.dataUrl };
      if (image.detail)
        imageUrl.detail = image.detail;
      parts.push({ type: "image_url", image_url: imageUrl });
    }
    return [
      { role: "system", content: AI_SYSTEM_PROMPT },
      { role: "user", content: parts }
    ];
  };
  // ---------- 综合大题拆成小题分别作答 ----------
  // 一个 60 分的大题可能有 20 个空、6 个小问，一次性让模型填完正确率很低
  // （实测会把 8421 码值写成编码名、阶码算错、把 RGB 顺序搞反）。
  // 这里按（1）（2）…把小问切开，每个小问单独问一次，再按顺序合并。
  const AI_SUBQ_RE = /[（(]\s*\d{1,2}\s*[)）]/g;
  const AI_SPLIT_MIN_BLANKS = 4;
  const AI_SPLIT_MIN_PARTS = 2;
  const planFillParts = (question) => {
    if (!question || typeof question.element === "undefined")
      return null;
    const stem = buildBlankAwareStem(question);
    if (!stem.text || stem.blankCount < AI_SPLIT_MIN_BLANKS)
      return null;
    const matches = [];
    AI_SUBQ_RE.lastIndex = 0;
    let matched;
    while ((matched = AI_SUBQ_RE.exec(stem.text)) !== null)
      matches.push({ index: matched.index, label: matched[0] });
    if (matches.length < AI_SPLIT_MIN_PARTS)
      return null;
    const preamble = stem.text.slice(0, matches[0].index).trim();
    const parts = [];
    for (let index = 0; index < matches.length; index += 1) {
      const from = matches[index].index;
      const to = index + 1 < matches.length ? matches[index + 1].index : stem.text.length;
      const body = stem.text.slice(from, to).trim();
      const blankCount = (body.match(/【空\d+】/g) || []).length;
      if (!blankCount)
        continue;
      parts.push({ label: matches[index].label, text: preamble ? preamble + " " + body : body, blankCount });
    }
    if (parts.length < AI_SPLIT_MIN_PARTS)
      return null;
    let total = 0;
    for (const part of parts)
      total += part.blankCount;
    // 拆出来的空数必须与整题空数一致，否则说明有空格落在小问标记之外，宁可不拆
    if (total !== stem.blankCount)
      return null;
    return { parts, totalBlanks: total };
  };
  const buildAiPartText = (question, part, imageCount) => {
    const rule = AI_KIND_RULES[resolveQuestionKind(question.type)];
    const lines = [];
    lines.push("题型：" + rule.label + "（这是综合大题里的一个小问）");
    lines.push("作答要求：" + rule.extra + "输出格式：" + rule.format);
    lines.push("只回答下面标出的这一个小问，不要回答其他小问，answer 数组里只放这一个小问的答案。");
    lines.push("题干：" + part.text);
    lines.push("这一小问共有 " + part.blankCount + " 个空，answer 数组必须正好 " + part.blankCount + " 项，按【空k】的先后一一对应。");
    if (imageCount)
      lines.push("本题附带了 " + imageCount + " 张图片，请结合图片内容作答。");
    appendEncodingHints(lines, part.text);
    return lines.join("\n");
  };
  // 一次请求拿到答案；思考模式把输出额度烧完时会 content 为空，这时自动关掉思考重答一次。
  // 返回 { result, extracted }，extracted.ok 为 false 表示这次没拿到可用答案。
  const askAiForAnswer = async (url2, aiConfig, payload, question, logStore) => {
    let result = await requestAiAnswer(url2, aiConfig.apiKey, payload);
    if (!result.ok)
      return { result, extracted: null };
    let extracted = extractAnswerFromBody(result.body, question);
    if (extracted.ok)
      return { result, extracted };
    const thinkingOn = payload.thinking && payload.thinking.type !== "disabled";
    if (thinkingOn) {
      const plainPayload = Object.assign({}, payload, { thinking: { type: "disabled" }, temperature: 0 });
      delete plainPayload.reasoning_effort;
      const retryResult = await requestAiAnswer(url2, aiConfig.apiKey, plainPayload);
      if (retryResult.ok) {
        const retryExtracted = extractAnswerFromBody(retryResult.body, question);
        if (retryExtracted.ok) {
          if (logStore)
            logStore.addLog("模型这次只输出了思考过程、没给出答案（输出被截断），已自动关掉思考重答", "warning");
          recordAiUsage(aiConfig.model, retryResult.body ? retryResult.body.usage : null, false);
          return { result: retryResult, extracted: retryExtracted };
        }
      }
    }
    return { result, extracted };
  };
  // 逐个小题请求并合并；任何一步失败就返回 null，让上层退回整题一次性作答
  const answerCompositeParts = async (question, plans, basePayload, images, url2, aiConfig, logStore) => {
    const merged = [];
    let usageText = "";
    for (let index = 0; index < plans.parts.length; index += 1) {
      const part = plans.parts[index];
      const messages = buildAiMessages(question, images, buildAiPartText(question, part, images.length));
      const asked = await askAiForAnswer(url2, aiConfig, Object.assign({}, basePayload, { messages }), question, index === 0 ? logStore : null);
      if (!asked.extracted || !asked.extracted.ok)
        return null;
      const items = asked.extracted.answer.slice(0, part.blankCount);
      while (items.length < part.blankCount)
        items.push("");
      // 这一小问里出现占位符也退回整题流程（那边有更严格的重问机制）
      if (findPlaceholderAnswer(items))
        return null;
      for (const item of items)
        merged.push(item);
      usageText = recordAiUsage(aiConfig.model, asked.result.body ? asked.result.body.usage : null, index === 0);
    }
    if (merged.length !== plans.totalBlanks)
      return null;
    return { answer: merged, usageText };
  };
  // 挑一个大概率便宜的模型（flash/mini/lite 之类）
  const pickPreferredModel = (models) => {
    if (!Array.isArray(models) || !models.length)
      return "";
    const cheap = models.find((name) => /flash|mini|lite|turbo|air/i.test(String(name)));
    return cheap || models[0];
  };
  // 把接口返回的模型列表写进配置；若当前选的模型不在列表里，自动换一个能用的
  const applyAiModels = (aiConfig, models, origin) => {
    const list = (Array.isArray(models) ? models : []).map((name) => String(name || "").trim()).filter(Boolean);
    if (!list.length)
      return "";
    const unique = [];
    for (const name of list) {
      if (unique.indexOf(name) === -1)
        unique.push(name);
    }
    aiConfig.models = unique;
    aiConfig.modelsFrom = aiConfig.baseUrl;
    aiConfig.modelsVersion = AI_MODELS_VERSION;
    const current = String(aiConfig.model || "").trim();
    if (current && unique.indexOf(current) !== -1)
      return "";
    const next = pickPreferredModel(unique);
    if (!next)
      return "";
    aiConfig.model = next;
    return `模型 ${current || "(空)"} 在${origin || "该接口"}不受支持，已自动改用 ${next}`;
  };
  const looksLikeModelError = (message) => {
    const text = String(message == null ? "" : message);
    if (!/model|模型/i.test(text))
      return false;
    return /support|not found|no such|invalid|unknown|unavailable|passed|不存在|不支持|无效/i.test(text);
  };
  const parseAiJson = (content) => {
    const text = String(content == null ? "" : content).trim().replace(/^```[a-zA-Z]*\s*/, "").replace(/```$/, "").trim();
    if (!text)
      return null;
    const candidates = [text];
    const matched = text.match(/\{[\s\S]*\}/);
    if (matched)
      candidates.push(matched[0]);
    for (const candidate of candidates) {
      try {
        const parsed = JSON.parse(candidate);
        if (parsed && typeof parsed === "object")
          return parsed;
      } catch (error) {
      }
    }
    return null;
  };
  const isLetterOnlyAnswer = (text) => {
    const stripped = String(text == null ? "" : text).replace(/[\s,，、;；/|.．]/g, "");
    return stripped.length > 0 && stripped.length <= 8 && /^[A-Za-z]+$/.test(stripped);
  };
  const optionTextByLetter = (text, options) => {
    const letters = String(text == null ? "" : text).replace(/[^A-Za-z]/g, "").toUpperCase();
    const result = [];
    for (const letter of letters.split("")) {
      const index = letter.charCodeAt(0) - 65;
      if (index >= 0 && index < options.length)
        result.push(options[index]);
    }
    return result;
  };
  const normalizeJudgementAnswer = (text) => {
    const value = String(text == null ? "" : text).replace(/[.．、:：\s"'“”‘’()（）]/g, "").toLowerCase();
    if (/^(a)?(正确|是|对|√|t|true|right|yes)$/.test(value))
      return "true";
    if (/^(b)?(错误|否|错|×|x|f|false|wrong|no)$/.test(value))
      return "false";
    return "";
  };
  const countBlankFields = (question) => {
    try {
      if (!question.element || typeof question.element.querySelectorAll !== "function")
        return 0;
      return question.element.querySelectorAll("textarea").length;
    } catch (error) {
      return 0;
    }
  };
  const resolveAiAnswer = (rawAnswer, question) => {
    const kind = resolveQuestionKind(question.type);
    const options = (Array.isArray(question.optionsText) ? question.optionsText : []).map((text) => {
      return String(text == null ? "" : text).replace(/\s+/g, " ").trim();
    });
    const items = (Array.isArray(rawAnswer) ? rawAnswer : [rawAnswer]).map((item) => {
      return String(item == null ? "" : item).trim();
    }).filter(Boolean);
    if (!items.length)
      return [];
    if (kind === "judge") {
      let text = items[0];
      if (options.length && isLetterOnlyAnswer(text))
        text = optionTextByLetter(text, options)[0] || text;
      const judgement = normalizeJudgementAnswer(text);
      if (judgement === "true")
        return ["正确"];
      if (judgement === "false")
        return ["错误"];
      return [text];
    }
    if (kind === "single" || kind === "multi") {
      const mapped = [];
      for (const item of items) {
        if (options.length && isLetterOnlyAnswer(item)) {
          const texts = optionTextByLetter(item, options);
          if (texts.length) {
            for (const text of texts)
              mapped.push(text);
            continue;
          }
        }
        mapped.push(item);
      }
      const unique = [];
      for (const item of mapped) {
        if (item && unique.indexOf(item) === -1)
          unique.push(item);
      }
      return unique;
    }
    if (kind === "fill" && items.length === 1) {
      const blankCount = countBlankFields(question);
      if (blankCount > 1) {
        const splitted = items[0].split(/[|｜;；\n]+/).map((part) => part.trim()).filter(Boolean);
        if (splitted.length === blankCount)
          return splitted;
      }
    }
    return items;
  };
  const cacheAiAnswer = (cacheKey, answer) => {
    if (AI_ANSWER_CACHE.size >= 200) {
      const oldest = AI_ANSWER_CACHE.keys().next();
      if (!oldest.done)
        AI_ANSWER_CACHE.delete(oldest.value);
    }
    AI_ANSWER_CACHE.set(cacheKey, answer.slice());
  };
  // 高峰时段判断：北京时间（UTC+8）周一至周五 9-12、14-18 点
  const isPeakNow = (date) => {
    const now = date || new Date();
    const beijing = new Date(now.getTime() + (now.getTimezoneOffset() + 480) * 6e4);
    const day = beijing.getDay();
    if (day === 0 || day === 6)
      return false;
    const hour = beijing.getHours();
    return AI_PEAK_HOUR_RANGES.some((range) => hour >= range[0] && hour < range[1]);
  };
  const getAiPrice = (model) => AI_PRICE_TABLE[AI_PRICE_ALIASES[model] || model] || null;
  const estimateAiCost = (model, usage, date) => {
    const price = getAiPrice(model);
    if (!price || !usage)
      return null;
    const period = isPeakNow(date) ? "peak" : "offPeak";
    const hit = Number(usage.prompt_cache_hit_tokens || 0);
    const miss = usage.prompt_cache_miss_tokens === void 0 ? Math.max(0, Number(usage.prompt_tokens || 0) - hit) : Number(usage.prompt_cache_miss_tokens || 0);
    const output = Number(usage.completion_tokens || 0);
    const cost = hit * price.cacheHit[period] / 1e6 + miss * price.cacheMiss[period] / 1e6 + output * price.output[period] / 1e6;
    return { cost, currency: "¥", period };
  };
  const formatNumber = (value) => String(Math.round(Number(value) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formatCost = (cost) => {
    const value = Number(cost) || 0;
    if (value <= 0)
      return "¥0";
    if (value < 1e-4)
      return "¥" + value.toFixed(6);
    if (value < 0.01)
      return "¥" + value.toFixed(4);
    return "¥" + value.toFixed(3);
  };
  const recordAiUsage = (model, usage, countQuestion) => {
    if (!usage)
      return "";
    const promptTokens = Number(usage.prompt_tokens || 0);
    const cachedTokens = Number(usage.prompt_cache_hit_tokens || 0);
    const completionTokens = Number(usage.completion_tokens || 0);
    if (countQuestion !== false)
      AI_USAGE.questions += 1;
    AI_USAGE.promptTokens += promptTokens;
    AI_USAGE.cachedTokens += cachedTokens;
    AI_USAGE.completionTokens += completionTokens;
    const estimate = estimateAiCost(model, usage);
    if (estimate)
      AI_USAGE.cost += estimate.cost;
    else
      AI_USAGE.unpriced += 1;
    return "入 " + formatNumber(promptTokens) + "（缓存 " + formatNumber(cachedTokens) + "）/ 出 " + formatNumber(completionTokens) + " tokens" + (estimate ? " ≈ " + formatCost(estimate.cost) : "（该模型无官方价，未估算）");
  };
  const aiUsageSummary = () => {
    if (!AI_USAGE.questions)
      return "本次会话还没有 AI 作答记录（每题只发一次请求、不带历史，输出已限长）";
    const hitRate = AI_USAGE.promptTokens ? Math.round(AI_USAGE.cachedTokens / AI_USAGE.promptTokens * 100) : 0;
    return "本次会话：AI 作答 " + AI_USAGE.questions + " 题｜输入 " + formatNumber(AI_USAGE.promptTokens) + "（缓存命中 " + hitRate + "%）/ 输出 " + formatNumber(AI_USAGE.completionTokens) + " tokens｜约 " + formatCost(AI_USAGE.cost) + (AI_USAGE.unpriced ? "（含无官方价的模型，未计入）" : "");
  };
  // ---------- 联网搜索（可选）：把搜到的资料当"参考资料"一起发给模型 ----------
  // 为什么加：实测一份文科小测（28 题 100 分得 73.5），错的题不是模型不会，
  // 而是不知道这门课按哪套口径讲；题库又没有这道题时，联网查一下标准说法能明显提高命中率。
  // 默认关闭；provider 为空/没填 key 时静默跳过，绝不因为搜索失败卡住答题。
  const AI_SEARCH_PROVIDERS = ["off", "tavily", "searxng", "bing", "custom"];
  const AI_SEARCH_SNIPPET_MAX = 220;
  const AI_SEARCH_TIMEOUT = 12e3;
  const searchRequest = (options) => new Promise((resolve) => {
    try {
      _GM_xmlhttpRequest({
        url: options.url,
        method: options.method || "GET",
        headers: options.headers || {},
        data: options.data,
        timeout: options.timeout || AI_SEARCH_TIMEOUT,
        onload: (response) => resolve(response && response.status >= 200 && response.status < 300 ? response : null),
        onerror: () => resolve(null),
        ontimeout: () => resolve(null)
      });
    } catch (error) {
      resolve(null);
    }
  });
  const searchParseJson = (text) => {
    try {
      return JSON.parse(String(text || ""));
    } catch (error) {
      return null;
    }
  };
  const normalizeSearchItems = (items) => {
    const out = [];
    for (const item of Array.isArray(items) ? items : []) {
      if (!item || typeof item !== "object")
        continue;
      const title = String(item.title || item.name || item.heading || "").replace(/\s+/g, " ").trim();
      const snippet = String(item.content || item.snippet || item.description || item.body || item.text || "").replace(/\s+/g, " ").trim();
      const url = String(item.url || item.link || item.href || "").trim();
      if (!snippet && !title)
        continue;
      out.push({ title, snippet: snippet.slice(0, AI_SEARCH_SNIPPET_MAX), url });
    }
    return out;
  };
  const webSearch = async (query, aiConfig) => {
    const provider = AI_SEARCH_PROVIDERS.indexOf(aiConfig.searchProvider) === -1 ? "off" : aiConfig.searchProvider;
    if (provider === "off" || !query)
      return [];
    const limit = aiConfig.searchMaxResults || 3;
    const key = aiConfig.searchKey || "";
    const endpoint = aiConfig.searchEndpoint || "";
    try {
      if (provider === "tavily") {
        if (!key)
          return [];
        const response = await searchRequest({
          url: "https://api.tavily.com/search",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({ api_key: key, query, max_results: limit, search_depth: "basic", include_answer: false })
        });
        const body = searchParseJson(response && response.responseText);
        return normalizeSearchItems(body && body.results).slice(0, limit);
      }
      if (provider === "bing") {
        if (!key)
          return [];
        const url2 = "https://api.bing.microsoft.com/v7.0/search?count=" + limit + "&mkt=zh-CN&q=" + encodeURIComponent(query);
        const response = await searchRequest({ url: url2, headers: { "Ocp-Apim-Subscription-Key": key } });
        const body = searchParseJson(response && response.responseText);
        return normalizeSearchItems(body && body.webPages && body.webPages.value).slice(0, limit);
      }
      if (provider === "searxng") {
        if (!endpoint)
          return [];
        const base = endpoint.replace(/\/+$/, "");
        const url2 = base + "/search?format=json&language=zh-CN&q=" + encodeURIComponent(query);
        const response = await searchRequest({ url: url2, headers: { "Accept": "application/json" } });
        const body = searchParseJson(response && response.responseText);
        return normalizeSearchItems(body && body.results).slice(0, limit);
      }
      if (provider === "custom") {
        if (!endpoint)
          return [];
        const url2 = endpoint.indexOf("{q}") === -1 ? endpoint + encodeURIComponent(query) : endpoint.split("{q}").join(encodeURIComponent(query));
        const response = await searchRequest({ url: url2, headers: { "Accept": "application/json" } });
        const body = searchParseJson(response && response.responseText);
        const buckets = body ? [body.results, body.items, body.data, body.webPages && body.webPages.value, body.organic] : [];
        for (const bucket of buckets) {
          const items = normalizeSearchItems(bucket);
          if (items.length)
            return items.slice(0, limit);
        }
        return [];
      }
    } catch (error) {
      return [];
    }
    return [];
  };
  // 搜索词 = 课程口径关键词 + 题干（太长反而搜不准，也容易撞到不相关页面）
  const buildSearchQuery = (question) => {
    const stem = stripTagsForAi(question && question.title).replace(/[（(]\s*[)）]/g, " ").replace(/\s+/g, " ").trim();
    if (!stem)
      return "";
    let topic = "";
    try {
      topic = String(collectCourseContext(question) || "").replace(/^课程\/章节上下文：/, "").replace(/（请按.*$/, "").replace(/[；=]/g, " ").trim().slice(0, 40);
    } catch (error) {
      topic = "";
    }
    return (topic ? topic + " " : "") + stem.slice(0, 100);
  };
  const formatSearchReferences = (items) => {
    if (!items || !items.length)
      return "";
    const lines = ["以下是联网搜索到的参考资料（来自网络，可能不准；与课程/教材口径冲突时以课程口径为准，不要照抄错误资料）："];
    items.forEach((item, index) => {
      const head = item.title ? "[" + (index + 1) + "] " + item.title : "[" + (index + 1) + "]";
      lines.push(head + (item.snippet ? "：" + item.snippet : ""));
    });
    return lines.join("\n");
  };
  // 给一道题取参考资料（没配置/失败/没结果都返回空串，绝不抛错）
  const collectSearchHint = async (question, aiConfig) => {
    try {
      const query = buildSearchQuery(question);
      if (!query)
        return "";
      const items = await webSearch(query, aiConfig);
      if (!items.length)
        return "";
      return formatSearchReferences(items);
    } catch (error) {
      return "";
    }
  };
  const requestAiAnswer = (url2, apiKey, payload) => new Promise((resolve) => {
    _GM_xmlhttpRequest({
      url: url2,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + apiKey
      },
      data: JSON.stringify(payload),
      timeout: 6e4,
      onload: (response) => {
        let body = null;
        try {
          body = JSON.parse(response.responseText);
        } catch (error) {
          body = null;
        }
        if (response.status >= 200 && response.status < 300 && body) {
          resolve({ ok: true, body });
          return;
        }
        const detail = body && body.error && body.error.message ? body.error.message : body && body.message ? body.message : "HTTP " + response.status;
        resolve({ ok: false, status: response.status, message: detail });
      },
      onerror: () => resolve({ ok: false, status: 0, message: "网络请求失败（请检查网络或脚本的 @connect 权限）" }),
      ontimeout: () => resolve({ ok: false, status: 0, message: "AI 请求超时（60 秒）" })
    });
  });
  const apiEndpoint = (baseUrl, apiPath) => {
    const trimmed = String(baseUrl || DEEPSEEK_DEFAULT_BASE_URL).trim().replace(/\/+$/, "").replace(/\/chat\/completions$/, "");
    return trimmed + apiPath;
  };
  const chatCompletionsUrl = (baseUrl) => apiEndpoint(baseUrl, "/chat/completions");
  const aiModelLabel = (model) => {
    const id = String(model == null ? "" : model);
    const lower = id.toLowerCase();
    if (lower === "deepseek-flash")
      return id + "（官方：最便宜，日常首选）";
    if (lower === "deepseek-v4-pro")
      return id + "（官方：更强，贵约 3 倍）";
    if (lower.indexOf("vision") !== -1)
      return id + "（视觉模型：本脚本不发图片，选它没有额外收益）";
    if (lower.indexOf("reason") !== -1 || lower.indexOf("think") !== -1 || /(^|[^a-z])r1([^a-z]|$)/.test(lower))
      return id + "（推理模型：思维链按输出计费，较贵）";
    if (lower.indexOf("flash") !== -1 || lower.indexOf("mini") !== -1 || lower.indexOf("lite") !== -1 || lower.indexOf("turbo") !== -1 || lower.indexOf("air") !== -1)
      return id + "（轻量快速档，通常更便宜）";
    return id;
  };
  const listAiModels = async (aiConfig) => {
    const apiKey = String(aiConfig && aiConfig.apiKey || "").trim();
    if (!apiKey)
      return { ok: false, message: "请先填写 API Key 再拉取模型列表" };
    return new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: apiEndpoint(aiConfig.baseUrl, "/models"),
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
        timeout: 2e4,
        onload: (response) => {
          let body = null;
          try {
            body = JSON.parse(response.responseText);
          } catch (error) {
            body = null;
          }
          if (response.status >= 200 && response.status < 300 && body && Array.isArray(body.data)) {
            const models = body.data.map((item) => {
              return String(item && item.id ? item.id : item == null ? "" : item);
            }).filter(Boolean);
            models.sort();
            resolve({ ok: true, models, message: "已获取 " + models.length + " 个可用模型" });
            return;
          }
          const detail = body && body.error && body.error.message ? body.error.message : "HTTP " + response.status;
          resolve({ ok: false, message: "拉取模型列表失败：" + detail });
        },
        onerror: () => resolve({ ok: false, message: "拉取模型列表失败：网络错误" }),
        ontimeout: () => resolve({ ok: false, message: "拉取模型列表失败：超时" })
      });
    });
  };
  const fetchAiBalance = async (aiConfig) => {
    const apiKey = String(aiConfig && aiConfig.apiKey || "").trim();
    if (!apiKey)
      return { ok: false, message: "请先填写 API Key 再查余额" };
    return new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: apiEndpoint(aiConfig.baseUrl, "/user/balance"),
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey },
        timeout: 2e4,
        onload: (response) => {
          let body = null;
          try {
            body = JSON.parse(response.responseText);
          } catch (error) {
            body = null;
          }
          if (response.status >= 200 && response.status < 300 && body && Array.isArray(body.balance_infos) && body.balance_infos.length) {
            const info = body.balance_infos[0];
            const symbol = info.currency === "USD" ? "$" : info.currency === "CNY" ? "¥" : String(info.currency || "") + " ";
            resolve({
              ok: true,
              message: "余额 " + symbol + info.total_balance + (body.is_available === false ? "（余额可能不足）" : "")
            });
            return;
          }
          const detail = body && body.error && body.error.message ? body.error.message : "HTTP " + response.status;
          resolve({ ok: false, message: "查余额失败：" + detail + "（第三方中转一般没有这个接口）" });
        },
        onerror: () => resolve({ ok: false, message: "查余额失败：网络错误" }),
        ontimeout: () => resolve({ ok: false, message: "查余额失败：超时" })
      });
    });
  };
  // ---------- 图片题（视觉）支持 ----------
  const blobToDataUrl = (blob) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
      reader.onerror = () => resolve("");
      reader.readAsDataURL(blob);
    } catch (error) {
      resolve("");
    }
  });
  const decodeImage = async (blob) => {
    try {
      if (typeof createImageBitmap === "function")
        return await createImageBitmap(blob);
      if (_unsafeWindow && typeof _unsafeWindow.createImageBitmap === "function")
        return await _unsafeWindow.createImageBitmap(blob);
    } catch (error) {
    }
    return null;
  };
  const shrinkImageToDataUrl = (bitmap, maxSide) => {
    try {
      const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context)
        return "";
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      return String(canvas.toDataURL("image/jpeg", 0.85) || "");
    } catch (error) {
      return "";
    }
  };
  // 取一张网络图片 -> data URL（太大就压一下；失败返回空串，绝不因为图片问题中断答题）
  const prepareAiImage = async (src) => {
    const response = await new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: src,
        method: "GET",
        responseType: "arraybuffer",
        headers: { "Accept": "image/*" },
        timeout: 15e3,
        onload: (res) => resolve(res && res.status >= 200 && res.status < 300 ? res : null),
        onerror: () => resolve(null),
        ontimeout: () => resolve(null)
      });
    });
    if (!response || !response.response || typeof response.response === "string")
      return "";
    const buffer = response.response;
    if (!buffer.byteLength || buffer.byteLength > AI_IMAGE_MAX_BYTES)
      return "";
    const headerMatch = String(response.responseHeaders || "").match(/content-type:\s*([^\s;]+)/i);
    const type = headerMatch && /^image\//i.test(headerMatch[1]) ? headerMatch[1] : "image/png";
    const blob = new Blob([buffer], { type });
    const bitmap = await decodeImage(blob);
    if (bitmap && (bitmap.width < AI_IMAGE_MIN_SIDE || bitmap.height < AI_IMAGE_MIN_SIDE))
      return "";
    if (bitmap && (Math.max(bitmap.width, bitmap.height) > AI_IMAGE_MAX_SIDE || buffer.byteLength > 1.2e6)) {
      const shrunk = shrinkImageToDataUrl(bitmap, AI_IMAGE_MAX_SIDE);
      if (shrunk)
        return shrunk;
    }
    return await blobToDataUrl(blob);
  };
  const collectAiImages = async (question) => {
    const urls = collectQuestionImageUrls(question);
    const images = [];
    for (const url of urls) {
      const dataUrl = await prepareAiImage(url);
      if (dataUrl)
        images.push({ dataUrl, detail: getAiConfig().visionLowDetail ? "low" : "" });
    }
    return { urls, images };
  };
  const getAnswerFromAi = async (question, options) => {
    const opts = options || {};
    const aiConfig = getAiConfig();
    if (!aiConfig.apiKey)
      return aiError("未配置 API Key：请在“答题”标签页填写 DeepSeek 的 API Key");
    const logStore = useLogStore();
    const imageUrls = aiConfig.vision ? collectQuestionImageUrls(question) : [];
    if (!questionIsAnswerable(question, aiConfig.vision))
      return aiError("题干为空（多半是图片题）；可在「答题」页勾选“图片题也发给 AI”后重试，当前跳过不消耗 token");
    const cacheKey = [resolveQuestionKind(question.type), question.title, (question.optionsText || []).join("\u0001"), imageUrls.join("\u0001"), collectCourseContext(question)].join("\u0002");
    const cached = AI_ANSWER_CACHE.get(cacheKey);
    if (cached && cached.length) {
      return {
        code: 200,
        data: { answer: cached.slice(), num: "", usenum: "", source: "ai", cached: true, usageText: "命中本地缓存，未消耗 token" },
        msg: ""
      };
    }
    let images = [];
    let imageNote = "";
    if (imageUrls.length) {
      const collected = await collectAiImages(question);
      images = collected.images;
      if (!images.length)
        imageNote = "图片读取失败，已按纯文字作答";
      else if (images.length < imageUrls.length)
        imageNote = "部分图片读取失败（" + images.length + "/" + imageUrls.length + "）";
    }
    const kind = resolveQuestionKind(question.type);
    const effectiveThinking = resolveThinking(question, aiConfig, kind);
    const payload = {
      model: aiConfig.model,
      messages: buildAiMessages(question, images),
      max_tokens: aiMaxTokens(question, effectiveThinking),
      stream: false
    };
    // 联网搜索：把搜到的资料附加到最后一条 user 消息（appendHintToMessages 只动最后一条）
    if (opts.withSearch) {
      const searchHint = await collectSearchHint(question, aiConfig);
      if (searchHint) {
        payload.messages = appendHintToMessages(payload.messages, searchHint);
        try {
          logStore.addLog("已联网搜索，附上参考资料后再作答", "primary");
        } catch (error) {
        }
      }
    }
    if (effectiveThinking === "off") {
      // 关闭思考链：思维链也按输出 token 计费，选择题完全没必要开
      payload.thinking = { type: "disabled" };
      payload.temperature = 0;
    } else {
      payload.thinking = { type: "enabled" };
      payload.reasoning_effort = effectiveThinking === "low" ? "low" : "high";
    }
    payload.response_format = { type: "json_object" };
    const url2 = chatCompletionsUrl(aiConfig.baseUrl);
    // 综合大题（多个小问、很多空）先按小题拆开分别问，正确率高很多；失败则退回整题一次性作答
    if (aiConfig.splitBigFill) {
      const plans = planFillParts(question);
      if (plans) {
        const composite = await answerCompositeParts(question, plans, payload, images, url2, aiConfig);
        if (composite) {
          cacheAiAnswer(cacheKey, composite.answer);
          const compositeText = [
            images.length ? "图片 " + images.length + " 张" : "",
            imageNote,
            "按 " + plans.parts.length + " 个小问分别作答",
            effectiveThinking === "off" ? "" : "思考链：" + effectiveThinking,
            composite.usageText
          ].filter(Boolean).join("｜");
          return {
            code: 200,
            data: { answer: composite.answer, num: compositeText, usenum: "", source: "ai", usageText: compositeText },
            msg: ""
          };
        }
        logStore.addLog("小题拆分作答失败，改为整题一次性作答", "warning");
      }
    }
    let result = await requestAiAnswer(url2, aiConfig.apiKey, payload);
    // 模型名不被接口支持（例如给官方接口传了中转站别名）：拉一次真实列表、换成能用的模型再重试
    if (!result.ok && result.status >= 400 && result.status < 500 && looksLikeModelError(result.message)) {
      const refreshed = await listAiModels(aiConfig);
      // 注意：必须改真正的 store 配置（getAiConfig 返回的是副本），否则下一题又会用回错的模型
      const liveAiConfig = useConfigStore().aiConfig;
      const notice = refreshed.ok ? applyAiModels(liveAiConfig, refreshed.models, "接口 " + aiConfig.baseUrl) : "";
      if (notice) {
        logStore.addLog(notice, "warning");
        aiConfig.model = liveAiConfig.model;
        payload.model = liveAiConfig.model;
        result = await requestAiAnswer(url2, aiConfig.apiKey, payload);
      }
    }
    if (!result.ok && result.status >= 400 && result.status < 500) {
      // 中转不认识 thinking / response_format / 图片时，去掉这些可选参数再试一次（4xx 不计费）
      const fallbackPayload = {
        model: aiConfig.model,
        messages: payload.messages,
        max_tokens: payload.max_tokens,
        temperature: 0,
        stream: false
      };
      if (images.length) {
        // 视觉参数不被支持时退回纯文字，至少还能作答
        fallbackPayload.messages = buildAiMessages(question, []);
      }
      result = await requestAiAnswer(url2, aiConfig.apiKey, fallbackPayload);
      if (result.ok && images.length)
        imageNote = (imageNote ? imageNote + "；" : "") + "该接口不支持图片，已按纯文字作答";
    }
    if (!result.ok)
      return aiError("AI 请求失败：" + result.message);
    let extracted = extractAnswerFromBody(result.body, question);
    // 思考模式把 max_tokens 烧完时只会返回思考过程、content 为空 —— 自动关掉思考重答一次，
    // 否则这题就只能报“无法解析”，页面里还会留着上一次的旧答案（实测就是这个原因）
    if (!extracted.ok && payload.thinking && payload.thinking.type !== "disabled") {
      const plainPayload = Object.assign({}, payload, { thinking: { type: "disabled" }, temperature: 0 });
      delete plainPayload.reasoning_effort;
      const retryResult = await requestAiAnswer(url2, aiConfig.apiKey, plainPayload);
      if (retryResult.ok) {
        const retryExtracted = extractAnswerFromBody(retryResult.body, question);
        if (retryExtracted.ok) {
          logStore.addLog("模型这次只输出了思考过程、没给出答案（输出被截断），已自动关掉思考重答", "warning");
          result = retryResult;
          extracted = retryExtracted;
        }
      }
    }
    if (!extracted.ok)
      return aiError(extracted.message);
    let answer = extracted.answer;
    let usedBody = result.body;
    // 出现“第N空/无法确定”这类占位符 = 模型在糊弄，用更严格的要求重问一次（只此一次）
    const placeholder = findPlaceholderAnswer(answer);
    if (placeholder) {
      logStore.addLog("检测到占位符答案（" + placeholder + "），已用更严格的要求重问这一题", "warning");
      const strictResult = await requestAiAnswer(url2, aiConfig.apiKey, Object.assign({}, payload, {
        messages: appendHintToMessages(payload.messages, "上一次的 answer 里出现了占位符“" + placeholder + "”，这是不允许的。请逐个空给出具体答案（数字、符号或词语），不要写“第N空”“无法确定”“未知”这类内容，也不要在答案里混入序号或解释。")
      }));
      if (strictResult.ok) {
        const strictExtract = extractAnswerFromBody(strictResult.body, question);
        if (strictExtract.ok && !findPlaceholderAnswer(strictExtract.answer)) {
          answer = strictExtract.answer;
          usedBody = strictResult.body;
        }
      }
    }
    cacheAiAnswer(cacheKey, answer);
    const usageText = [images.length ? "图片 " + images.length + " 张" : "", imageNote, effectiveThinking === "off" ? "" : "思考链：" + effectiveThinking, recordAiUsage(aiConfig.model, usedBody ? usedBody.usage : null)].filter(Boolean).join("｜");
    return {
      code: 200,
      data: {
        answer,
        num: usageText,
        usenum: "",
        source: "ai",
        usageText
      },
      msg: ""
    };
  };
  const getAnswerFromBank = async (question) => {
    for (const url2 of apis) {
      const result = await getAnswerFrom(question, url2);
      if (result.code !== 10003) {
        return result;
      }
    }
    return handleError("请求失败");
  };
  const getAnswer = async (question) => {
    const configStore = useConfigStore();
    const aiConfig = getAiConfig();
    if (aiConfig.enabled) {
      // 联网搜索：choice=单选/多选/判断先搜；mis=AI 没答出来才搜；always=所有题先搜
      const answerKind = resolveQuestionKind(question.type);
      const isChoiceQuestion = answerKind === "single" || answerKind === "multi" || answerKind === "judge";
      const searchOff = AI_SEARCH_PROVIDERS.indexOf(aiConfig.searchProvider) === -1 || aiConfig.searchProvider === "off";
      const searchTrigger = searchOff ? "off" : aiConfig.searchTrigger;
      const preSearch = searchTrigger === "always" || (searchTrigger === "choice" && isChoiceQuestion);
      let aiResult = await getAnswerFromAi(question, { withSearch: preSearch });
      if (aiResult.code !== 200 && !preSearch && (searchTrigger === "miss" || searchTrigger === "choice" && isChoiceQuestion))
        aiResult = await getAnswerFromAi(question, { withSearch: true });
      if (aiResult.code === 200)
        return aiResult;
      const bankToken = configStore.queryApis && configStore.queryApis[0] ? String(configStore.queryApis[0].token || "").trim() : "";
      if (!aiConfig.fallbackToBank || !bankToken)
        return aiResult;
      const bankResult = await getAnswerFromBank(question);
      return bankResult.code === 200 ? bankResult : aiResult;
    }
    return getAnswerFromBank(question);
  };
  const toAnnouncementItems = (notice) => {
    const content = notice.trim();
    return content ? [{ id: "remote-notice", content }] : [];
  };
  const getNotice = async () => {
    return new Promise((resolve) => {
      _GM_xmlhttpRequest({
        url: withScriptInfoParams(NOTICE_API_URL),
        method: "GET",
        headers: createApiHeaders(window.location.href),
        timeout: 5e3,
        onload: (response) => {
          try {
            const apiResponse = JSON.parse(response.responseText);
            resolve(apiResponse.code === 1 ? toAnnouncementItems(apiResponse.data || "") : []);
          } catch (e) {
            resolve([]);
          }
        },
        onerror: () => resolve([]),
        ontimeout: () => resolve([])
      });
    });
  };
  const _hoisted_1$5 = { class: "script-home" };
  const ANSWER_TAB_NAME$1 = "1";
  const _sfc_main$8 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      logList: {}
    },
    setup(__props) {
      const configStore = useConfigStore();
      const announcements = vue.ref([]);
      vue.onMounted(async () => {
        announcements.value = await getNotice();
      });
      const handleLogClick = (event) => {
        const target = event.target;
        const actionElement = target == null ? void 0 : target.closest('[data-log-action="show-answer-tab"]');
        if (!actionElement)
          return;
        event.preventDefault();
        configStore.menuIndex = ANSWER_TAB_NAME$1;
      };
      return (_ctx, _cache) => {
        const _component_el_text = vue.resolveComponent("el-text");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
          vue.createVNode(_sfc_main$9, { items: announcements.value }, null, 8, ["items"]),
          vue.createVNode(_component_el_scrollbar, {
            always: "",
            class: "log",
            "max-height": "230px",
            onClick: handleLogClick
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.logList, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("div", { key: index }, [
                  vue.createVNode(_component_el_text, {
                    class: "log-time",
                    size: "small",
                    type: "info"
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(item.time), 1)
                    ]),
                    _: 2
                  }, 1024),
                  vue.createVNode(_component_el_text, null, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(" ")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_text, {
                    type: item.type ? item.type : "primary",
                    size: "small",
                    innerHTML: item.message
                  }, null, 8, ["type", "innerHTML"]),
                  vue.createVNode(_component_el_divider, {
                    class: "log-divider",
                    "border-style": "dashed"
                  })
                ]);
              }), 128))
            ]),
            _: 1
          })
        ]);
      };
    }
  });
  const _hoisted_1$4 = { class: "setting" };
  const _hoisted_2$4 = { class: "setting-section-title" };
  const _hoisted_3$3 = { class: "setting-section-title" };
  const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
    __name: "index",
    props: {
      globalConfig: {}
    },
    setup(__props) {
      return (_ctx, _cache) => {
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_input_number = vue.resolveComponent("el-input-number");
        const _component_el_form_item = vue.resolveComponent("el-form-item");
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.globalConfig.platformParams[_ctx.globalConfig.platformName].parts, (part) => {
            return vue.openBlock(), vue.createElementBlock("div", {
              key: part.name
            }, [
              vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
                default: vue.withCtx(() => [
                  vue.createElementVNode("span", _hoisted_2$4, vue.toDisplayString(part.name), 1)
                ]),
                _: 2
              }, 1024),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(part.params, (param) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: param.name
                }, [
                  param.type === "boolean" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                    key: 0,
                    class: "setting-checkbox",
                    modelValue: param.value,
                    "onUpdate:modelValue": ($event) => param.value = $event,
                    label: param.name,
                    size: "small"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])) : (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                    key: 1,
                    label: param.name,
                    required: ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_input_number, {
                        modelValue: param.value,
                        "onUpdate:modelValue": ($event) => param.value = $event,
                        min: param.min ?? 3e3,
                        max: param.max,
                        step: param.step ?? 1e3,
                        "controls-position": "right",
                        size: "small"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "step"])
                    ]),
                    _: 2
                  }, 1032, ["label"]))
                ], 64);
              }), 128))
            ]);
          }), 128)),
          vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_divider, { "border-style": "dashed" }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("span", _hoisted_3$3, vue.toDisplayString(_ctx.globalConfig.otherParams.name), 1)
              ]),
              _: 1
            }),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(_ctx.globalConfig.otherParams.params, (item) => {
              return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                key: item.name
              }, [
                item.type === "boolean" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                  key: 0,
                  modelValue: item.value,
                  "onUpdate:modelValue": ($event) => item.value = $event,
                  size: "small"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : (vue.openBlock(), vue.createBlock(_component_el_form_item, {
                  key: 1,
                  class: "setting-number",
                  label: item.name,
                  required: "",
                  size: "small"
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(_component_el_input_number, {
                      modelValue: item.value,
                      "onUpdate:modelValue": ($event) => item.value = $event,
                      min: item.min ?? 3,
                      max: item.max ?? 100,
                      step: item.step ?? 1,
                      size: "small"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "step"])
                  ]),
                  _: 2
                }, 1032, ["label"]))
              ], 64);
            }), 128))
          ])
        ]);
      };
    }
  });
  const _hoisted_1$3 = { class: "question_table" };
  const _hoisted_2$3 = ["innerHTML"];
  const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
    __name: "QuestionTable",
    props: {
      questionList: {}
    },
    setup(__props) {
      const isTokenEditing = vue.ref(false);
      const isApiKeyEditing = vue.ref(false);
      const configStore = useConfigStore();
      const logStore = useLogStore();
      const modelStatus = vue.ref("");
      const domDump = vue.ref("");
      const handleRefill = () => {
        if (!activeCxHandler) {
          modelStatus.value = "当前页面还没解析到题目，无法重写";
          logStore.addLog("当前页面还没解析到题目，请先进入作业/考试页面并等解析完成", "danger");
          return;
        }
        const count = activeCxHandler.refillAll();
        modelStatus.value = "已把 " + count + " 道题的答案重新写入页面";
        logStore.addLog(`已把 ${count} 道题的答案重新写了一遍（不重新问 AI）；如果页面里还是旧答案，说明该题被页面锁定了，需要在页面上点“修改/重做”后再点一次`, count ? "success" : "danger");
      };
      const handleDumpDom = () => {        let dump = "";
        try {
          dump = buildPageDiagnostics();
        } catch (error) {
          dump = "诊断失败：" + (error && error.message ? error.message : String(error));
        }
        domDump.value = dump;
        modelStatus.value = "已导出页面结构，请点下面的文本框全选复制发给脚本作者";
        logStore.addLog("已导出页面结构（" + dump.length + " 字符），可在「答题」页文本框里复制", "success");
      };
      const modelOptions = vue.computed(() => {
        const stored = Array.isArray(configStore.aiConfig.models) && configStore.aiConfig.models.length ? configStore.aiConfig.models : AI_DEFAULT_MODELS;
        const current = String(configStore.aiConfig.model || "").trim();
        const values = current && stored.indexOf(current) === -1 ? [current].concat(stored) : stored.slice();
        return values.map((value) => ({ value, label: aiModelLabel(value) }));
      });
      const handleCheckBalance = async () => {
        modelStatus.value = "正在查询余额…";
        const result = await fetchAiBalance(configStore.aiConfig);
        modelStatus.value = result.message;
        logStore.addLog(result.message, result.ok ? "success" : "danger");
      };
      const selectModel = (value) => {
        configStore.aiConfig.model = value;
        modelStatus.value = "已选择模型：" + value;
      };
      const modelChipClass = (value) => {
        return "ai-chip" + (String(configStore.aiConfig.model || "").trim() === value ? " is-active" : "");
      };
      // 思考模式用两个普通勾选框表达，避免下拉弹层在 shadow DOM 里定位失败
      const thinkingEnabled = vue.computed({
        get: () => String(configStore.aiConfig.thinking || "off") !== "off",
        set: (value) => {
          configStore.aiConfig.thinking = value ? "low" : "off";
        }
      });
      const thinkingHigh = vue.computed({
        get: () => String(configStore.aiConfig.thinking || "off") === "high",
        set: (value) => {
          configStore.aiConfig.thinking = value ? "high" : "low";
        }
      });
      // ---- 联网搜索控件（用 chip 不用下拉：shadow DOM 里下拉弹层定位会错位）----
      const searchProviders = [
        { value: "off", label: "不联网" },
        { value: "tavily", label: "Tavily" },
        { value: "bing", label: "Bing" },
        { value: "searxng", label: "SearXNG" },
        { value: "custom", label: "自定义" }
      ];
      const searchTriggers = [
        { value: "choice", label: "选择/判断先搜" },
        { value: "miss", label: "AI 没答出来才搜" },
        { value: "always", label: "所有题都先搜" }
      ];
      const setSearchProvider = (value) => {
        configStore.aiConfig.searchProvider = value;
        modelStatus.value = value === "off" ? "已关闭联网搜索" : "联网搜索已设为：" + value;
      };
      const setSearchTrigger = (value) => {
        configStore.aiConfig.searchTrigger = value;
      };
      const setSearchKey = (value) => {
        configStore.aiConfig.searchKey = value;
      };
      const setSearchEndpoint = (value) => {
        configStore.aiConfig.searchEndpoint = value;
      };
      const searchChipClass = (current, value) => "ai-chip" + (String(current || "") === value ? " is-active" : "");
      const searchProviderHint = vue.computed(() => {
        const provider = String(configStore.aiConfig.searchProvider || "off");
        if (provider === "tavily")
          return "Tavily：下方 Key 填 tvly- 开头的 API Key（官网注册有免费额度）";
        if (provider === "bing")
          return "Bing：下方 Key 填 Azure 的 Bing Search v7 订阅密钥";
        if (provider === "searxng")
          return "SearXNG：下方填实例根地址（如 https://searx.be），该实例需允许 JSON 输出";
        if (provider === "custom")
          return "自定义：下方填完整 URL，用 {q} 表示关键词，返回带 results/items/data 的 JSON";
        return "默认不联网。开启后会把搜到的资料作为「参考资料」一起发给模型（每题多一次搜索请求）";
      });
      // 首次进面板时静默拉一次真实模型列表（换了接口地址或列表版本升级过就重新拉），失败不打扰用户
      vue.onMounted(() => {
        const aiConfig = configStore.aiConfig;
        if (AI_MODELS_TRIED.value || !aiConfig.apiKey)
          return;
        const fresh = aiConfig.modelsFrom === aiConfig.baseUrl && Number(aiConfig.modelsVersion || 0) === AI_MODELS_VERSION && Array.isArray(aiConfig.models) && aiConfig.models.length;
        if (fresh)
          return;
        AI_MODELS_TRIED.value = true;
        listAiModels(aiConfig).then((result) => {
          if (!result.ok)
            return;
          const notice = applyAiModels(aiConfig, result.models, "接口 " + aiConfig.baseUrl);
          if (notice)
            logStore.addLog(notice, "warning");
        });
      });
      return (_ctx, _cache) => {
        const _component_el_button = vue.resolveComponent("el-button");
        const _component_el_input = vue.resolveComponent("el-input");
        const _component_el_checkbox = vue.resolveComponent("el-checkbox");
        const _component_el_table_column = vue.resolveComponent("el-table-column");
        const _component_el_table = vue.resolveComponent("el-table");
        const _component_el_empty = vue.resolveComponent("el-empty");
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
          vue.createVNode(_component_el_input, {
            class: "token-input",
            modelValue: vue.unref(configStore).aiConfig.apiKey,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).aiConfig.apiKey = $event),
            type: isApiKeyEditing.value ? "text" : "password",
            onFocus: _cache[1] || (_cache[1] = ($event) => isApiKeyEditing.value = true),
            onBlur: _cache[2] || (_cache[2] = ($event) => isApiKeyEditing.value = false),
            placeholder: "DeepSeek API Key（sk- 开头），到 platform.deepseek.com 申请，填这里即可用 AI 答题"
          }, {
            prepend: vue.withCtx(() => [
              vue.createVNode(_component_el_button, { class: "token-label" }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode("AI Key")
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue", "type"]),
          vue.createElementVNode("div", { class: "ai-chips" }, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(modelOptions.value.slice(0, 12), (item) => {
              return vue.openBlock(), vue.createElementBlock("span", {
                key: item.value,
                class: modelChipClass(item.value),
                title: item.label,
                onClick: ($event) => selectModel(item.value)
              }, vue.toDisplayString(item.value), 11, ["title", "onClick"]);
            }), 128))
          ]),
          vue.createVNode(_component_el_checkbox, {
            class: "setting-checkbox",
            modelValue: thinkingEnabled.value,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => thinkingEnabled.value = $event),
            label: "启用思考链",
            size: "small"
          }, null, 8, ["modelValue", "label"]),
          vue.createVNode(_component_el_checkbox, {
            class: "setting-checkbox",
            modelValue: thinkingHigh.value,
            "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => thinkingHigh.value = $event),
            label: "思考用高档",
            size: "small"
          }, null, 8, ["modelValue", "label"]),
          vue.createVNode(_component_el_checkbox, {
            class: "setting-checkbox",
            modelValue: vue.unref(configStore).aiConfig.autoThinking,
            "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => vue.unref(configStore).aiConfig.autoThinking = $event),
            label: "填空/简答/综合大题自动加低档思考",
            size: "small"
          }, null, 8, ["modelValue", "label"]),
          vue.createVNode(_component_el_checkbox, {
            class: "setting-checkbox",
            modelValue: vue.unref(configStore).aiConfig.splitBigFill,
            "onUpdate:modelValue": _cache[17] || (_cache[17] = ($event) => vue.unref(configStore).aiConfig.splitBigFill = $event),
            label: "综合大题按小问拆分作答",
            size: "small"
          }, null, 8, ["modelValue", "label"]),
          vue.createElementVNode("div", { class: "ai-row" }, [
            vue.createElementVNode("span", { class: "ai-label" }, "联网搜索"),
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(searchProviders, (item) => {
              return vue.openBlock(), vue.createElementBlock("span", {
                key: item.value,
                class: searchChipClass(vue.unref(configStore).aiConfig.searchProvider, item.value),
                title: item.label,
                onClick: ($event) => setSearchProvider(item.value)
              }, vue.toDisplayString(item.label), 11, ["title", "onClick"]);
            }), 128))
          ]),
          vue.unref(configStore).aiConfig.searchProvider && vue.unref(configStore).aiConfig.searchProvider !== "off" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            vue.createElementVNode("div", { class: "ai-row" }, [
              vue.createElementVNode("span", { class: "ai-label" }, "搜索时机"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(searchTriggers, (item) => {
                return vue.openBlock(), vue.createElementBlock("span", {
                  key: item.value,
                  class: searchChipClass(vue.unref(configStore).aiConfig.searchTrigger, item.value),
                  title: item.label,
                  onClick: ($event) => setSearchTrigger(item.value)
                }, vue.toDisplayString(item.label), 11, ["title", "onClick"]);
              }), 128))
            ]),
            vue.createVNode(_component_el_input, {
              class: "token-input",
              modelValue: vue.unref(configStore).aiConfig.searchKey,
              "onUpdate:modelValue": setSearchKey,
              placeholder: "搜索服务 API Key（Tavily/Bing 必填，SearXNG/自定义可留空）"
            }, null, 8, ["modelValue"]),
            vue.createVNode(_component_el_input, {
              class: "token-input",
              modelValue: vue.unref(configStore).aiConfig.searchEndpoint,
              "onUpdate:modelValue": setSearchEndpoint,
              placeholder: "SearXNG 实例地址 / 自定义 URL 模板（含 {q}）"
            }, null, 8, ["modelValue"]),
            vue.createElementVNode("p", { class: "ai-hint" }, vue.toDisplayString(searchProviderHint.value), 1)
          ], 64)) : vue.createCommentVNode("", true),
          vue.createElementVNode("div", { class: "ai-row" }, [
            vue.createVNode(_component_el_button, {
              size: "small",
              onClick: _cache[19] || (_cache[19] = ($event) => handleDumpDom())
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("导出结构")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_input, {
              class: "token-input dom-dump",
              modelValue: domDump.value,
              "onUpdate:modelValue": _cache[18] || (_cache[18] = ($event) => domDump.value = $event),
              type: "textarea",
              rows: 3,
              readonly: "",
              placeholder: "点左边按钮导出当前答题页结构（只含标签/class，不含题目文字）"
            }, null, 8, ["modelValue"])
          ]),
          vue.createVNode(_component_el_checkbox, {
            class: "setting-checkbox",
            modelValue: vue.unref(configStore).aiConfig.vision,
            "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => vue.unref(configStore).aiConfig.vision = $event),
            label: "图片题也发给 AI",
            size: "small"
          }, null, 8, ["modelValue", "label"]),
          vue.createElementVNode("div", { class: "ai-row" }, [
            vue.createVNode(_component_el_button, {
              size: "small",
              onClick: _cache[13] || (_cache[13] = ($event) => handleCheckBalance())
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("查余额")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              size: "small",
              onClick: _cache[20] || (_cache[20] = ($event) => handleRefill())
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("重写答案")
              ]),
              _: 1
            }),
            vue.createElementVNode("span", { class: "ai-usage", style: { "flex": "1 1 auto" } }, vue.toDisplayString(modelStatus.value), 1)
          ]),
          vue.createElementVNode("div", { class: "ai-usage" }, vue.toDisplayString(aiUsageSummary()), 1),
          vue.withDirectives(vue.createElementVNode("div", _hoisted_1$3, [
            vue.createVNode(_component_el_table, {
              stripe: "",
              data: _ctx.questionList,
              "max-height": "400",
              class: "question-list"
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_el_table_column, {
                  type: "index",
                  width: "40"
                }),
                vue.createVNode(_component_el_table_column, {
                  prop: "title",
                  label: "题目",
                  width: "370"
                }),
                vue.createVNode(_component_el_table_column, {
                  prop: "answer",
                  label: "答案",
                  width: "215"
                }, {
                  default: vue.withCtx((scope) => [
                    vue.createElementVNode("div", {
                      innerHTML: escapeHtml(scope.row.answer.join())
                    }, null, 8, _hoisted_2$3)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["data"])
          ], 512), [
            [vue.vShow, _ctx.questionList.length]
          ]),
          vue.withDirectives(vue.createElementVNode("div", null, [
            vue.createVNode(_component_el_empty, { description: "该页面无需答题" })
          ], 512), [
            [vue.vShow, !_ctx.questionList.length]
          ])
        ], 64);
      };
    }
  });
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$5 = {};
  const _hoisted_1$2 = { style: { "font-size": "12px" } };
  const _hoisted_2$2 = /* @__PURE__ */ vue.createElementVNode("p", null, "1、脚本功能完全免费，不存在付费情况，进入相应页面即可使用。", -1);
  const _hoisted_3$2 = /* @__PURE__ */ vue.createElementVNode("p", null, '2、本版本已改造为 AI 答题：脚本内置题库被替换为 DeepSeek 在线作答，遇到题库没有的题也能直接做。使用方法：[1] 到 platform.deepseek.com 申请一个 API Key --> [2] 点击标签页"答题" --> [3] 把 Key 填进"AI Key"，点「拉取模型」选一个便宜模型（推荐 deepseek-flash）--> [4] 刷新页面（Key 只保存在你自己的浏览器里，脚本作者拿不到）', -1);
  const _hoisted_4$1 = /* @__PURE__ */ vue.createElementVNode("p", { style: { "font-weight": "500" } }, "务必注意：", -1);
  const _hoisted_5$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 脚本出现相关问题，请在脚本反馈区反馈，或者私信作者修复。", -1);
  const _hoisted_6$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 模型怎么选：进页面时脚本会自动调用你接口的 /models 拉取真实可用的模型列表，列在「答题」页的模型标签里，点一下就切换；DeepSeek 官方接口只认 deepseek-flash 和 deepseek-v4-pro（41flash、visionflash 之类是第三方中转自己起的别名，填给官方接口必然报错），万一模型名不受支持，脚本会自动换成能用的模型并重答那一题。", -1);
  const _hoisted_7$2 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 图片题：默认不上传图片（图片最贵）。勾选“图片题也发给 AI”后，脚本会把题干和选项里的图片抓下来发给视觉模型，只有 deepseek-flash 支持图片（v4-pro 不支持），每张图最多约 1000 token。图片读取失败不会中断答题，会退回纯文字。", -1);
  const _hoisted_8$2 = /* @__PURE__ */ vue.createElementVNode("p", null, "-- 为提高正确率做了什么：① 系统提示里写死了严格规则（按“错误的/正确的”问法作答、IEEE754 阶码真值必须减 127/1023、补码移码范围、8421/ASCII/国标码换算、禁止输出“第N空”这类占位符、多字节按高字节到低字节拆）；② 填空题会在题干里用【空1】【空2】标出每个空的位置（超星题干本来就用连续下划线表示空位）并告知空数，要求答案项数严格一致；③ 填空/简答/综合大题自动加低档思考链（选择题不自动开：思考链和答案共用 max_tokens，额度一满就只返回思考过程、答案为空，想更准可在面板手动勾选「启用思考链」）；④ 一旦答出“第N空/无法确定”这类占位符会自动用更严格的要求重问；⑤ 若思考模式还是把额度烧完（返回空答案），会自动关掉思考再答一次。", -1);
  const _hoisted_8$1 = [
    _hoisted_2$2,
    _hoisted_3$2,
    _hoisted_4$1,
    _hoisted_5$1,
    _hoisted_6$1,
    _hoisted_7$2,
    _hoisted_8$2
  ];
  function _sfc_render$1(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, _hoisted_8$1);
  }
  const Tutorial = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
  const _sfc_main$4 = {};
  const _hoisted_1$1 = { style: { "font-size": "12px" } };
  const _hoisted_2$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "1、本脚本仅供学习和研究目的使用，并应在24小时内删除。脚本的使用不应违反任何法律法规及学术道德标准。", -1);
  const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("p", null, "2、用户在使用脚本时，必须遵守所有适用的法律法规。任何由于使用脚本而引起的违法行为或不当行为，其产生的一切后果由用户自行承担。", -1);
  const _hoisted_4 = /* @__PURE__ */ vue.createElementVNode("p", null, "3、开发者不对用户使用脚本所产生的任何直接或间接后果负责。用户应自行评估使用脚本的风险，并对任何可能的负面影响承担全责。", -1);
  const _hoisted_5 = /* @__PURE__ */ vue.createElementVNode("p", null, "4、本声明的目的在于提醒用户注意相关法律法规与风险，确保用户在明智、合法的前提下使用脚本。", -1);
  const _hoisted_6 = /* @__PURE__ */ vue.createElementVNode("p", null, "5、如用户在使用脚本的过程中有任何疑问，建议立即停止使用，并删除所有相关文件。", -1);
  const _hoisted_7 = /* @__PURE__ */ vue.createElementVNode("p", null, "6、本免责声明的最终解释权归脚本开发者所有。", -1);
  const _hoisted_8 = [
    _hoisted_2$1,
    _hoisted_3$1,
    _hoisted_4,
    _hoisted_5,
    _hoisted_6,
    _hoisted_7
  ];
  function _sfc_render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, _hoisted_8);
  }
  const ScriptTip = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
  function isFunction(value) {
    return typeof value === "function";
  }
  function hasLift(source) {
    return isFunction(source === null || source === void 0 ? void 0 : source.lift);
  }
  function operate(init) {
    return function(source) {
      if (hasLift(source)) {
        return source.lift(function(liftedSource) {
          try {
            return init(liftedSource, this);
          } catch (err) {
            this.error(err);
          }
        });
      }
      throw new TypeError("Unable to lift unknown Observable type");
    };
  }
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }
  function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  }
  function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  }
  function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m)
      return m.call(o);
    if (o && typeof o.length === "number")
      return {
        next: function() {
          if (o && i >= o.length)
            o = void 0;
          return { value: o && o[i++], done: !o };
        }
      };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m)
      return o;
    var i = m.call(o), r, ar = [], e;
    try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
        ar.push(r.value);
    } catch (error) {
      e = { error };
    } finally {
      try {
        if (r && !r.done && (m = i["return"]))
          m.call(i);
      } finally {
        if (e)
          throw e.error;
      }
    }
    return ar;
  }
  function __spreadArray(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
  }
  function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  }
  function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function awaitReturn(f) {
      return function(v) {
        return Promise.resolve(v).then(f, reject);
      };
    }
    function verb(n, f) {
      if (g[n]) {
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
        if (f)
          i[n] = f(i[n]);
      }
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  }
  function __asyncValues(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve, reject) {
          v = o[n](v), settle(resolve, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve({ value: v2, done: d });
      }, reject);
    }
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var isArrayLike = function(x) {
    return x && typeof x.length === "number" && typeof x !== "function";
  };
  function isPromise(value) {
    return isFunction(value === null || value === void 0 ? void 0 : value.then);
  }
  function createErrorClass(createImpl) {
    var _super = function(instance) {
      Error.call(instance);
      instance.stack = new Error().stack;
    };
    var ctorFunc = createImpl(_super);
    ctorFunc.prototype = Object.create(Error.prototype);
    ctorFunc.prototype.constructor = ctorFunc;
    return ctorFunc;
  }
  var UnsubscriptionError = createErrorClass(function(_super) {
    return function UnsubscriptionErrorImpl(errors) {
      _super(this);
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return i + 1 + ") " + err.toString();
      }).join("\n  ") : "";
      this.name = "UnsubscriptionError";
      this.errors = errors;
    };
  });
  function arrRemove(arr, item) {
    if (arr) {
      var index = arr.indexOf(item);
      0 <= index && arr.splice(index, 1);
    }
  }
  var Subscription = function() {
    function Subscription2(initialTeardown) {
      this.initialTeardown = initialTeardown;
      this.closed = false;
      this._parentage = null;
      this._finalizers = null;
    }
    Subscription2.prototype.unsubscribe = function() {
      var e_1, _a, e_2, _b;
      var errors;
      if (!this.closed) {
        this.closed = true;
        var _parentage = this._parentage;
        if (_parentage) {
          this._parentage = null;
          if (Array.isArray(_parentage)) {
            try {
              for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
                var parent_1 = _parentage_1_1.value;
                parent_1.remove(this);
              }
            } catch (e_1_1) {
              e_1 = { error: e_1_1 };
            } finally {
              try {
                if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return))
                  _a.call(_parentage_1);
              } finally {
                if (e_1)
                  throw e_1.error;
              }
            }
          } else {
            _parentage.remove(this);
          }
        }
        var initialFinalizer = this.initialTeardown;
        if (isFunction(initialFinalizer)) {
          try {
            initialFinalizer();
          } catch (e) {
            errors = e instanceof UnsubscriptionError ? e.errors : [e];
          }
        }
        var _finalizers = this._finalizers;
        if (_finalizers) {
          this._finalizers = null;
          try {
            for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
              var finalizer = _finalizers_1_1.value;
              try {
                execFinalizer(finalizer);
              } catch (err) {
                errors = errors !== null && errors !== void 0 ? errors : [];
                if (err instanceof UnsubscriptionError) {
                  errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
                } else {
                  errors.push(err);
                }
              }
            }
          } catch (e_2_1) {
            e_2 = { error: e_2_1 };
          } finally {
            try {
              if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return))
                _b.call(_finalizers_1);
            } finally {
              if (e_2)
                throw e_2.error;
            }
          }
        }
        if (errors) {
          throw new UnsubscriptionError(errors);
        }
      }
    };
    Subscription2.prototype.add = function(teardown) {
      var _a;
      if (teardown && teardown !== this) {
        if (this.closed) {
          execFinalizer(teardown);
        } else {
          if (teardown instanceof Subscription2) {
            if (teardown.closed || teardown._hasParent(this)) {
              return;
            }
            teardown._addParent(this);
          }
          (this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
        }
      }
    };
    Subscription2.prototype._hasParent = function(parent) {
      var _parentage = this._parentage;
      return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
    };
    Subscription2.prototype._addParent = function(parent) {
      var _parentage = this._parentage;
      this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
    };
    Subscription2.prototype._removeParent = function(parent) {
      var _parentage = this._parentage;
      if (_parentage === parent) {
        this._parentage = null;
      } else if (Array.isArray(_parentage)) {
        arrRemove(_parentage, parent);
      }
    };
    Subscription2.prototype.remove = function(teardown) {
      var _finalizers = this._finalizers;
      _finalizers && arrRemove(_finalizers, teardown);
      if (teardown instanceof Subscription2) {
        teardown._removeParent(this);
      }
    };
    Subscription2.EMPTY = function() {
      var empty = new Subscription2();
      empty.closed = true;
      return empty;
    }();
    return Subscription2;
  }();
  Subscription.EMPTY;
  function isSubscription(value) {
    return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
  }
  function execFinalizer(finalizer) {
    if (isFunction(finalizer)) {
      finalizer();
    } else {
      finalizer.unsubscribe();
    }
  }
  var config = {
    onUnhandledError: null,
    onStoppedNotification: null,
    Promise: void 0,
    useDeprecatedSynchronousErrorHandling: false,
    useDeprecatedNextContext: false
  };
  var timeoutProvider = {
    setTimeout: function(handler, timeout) {
      var args = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
      }
      return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
    },
    clearTimeout: function(handle) {
      return (clearTimeout)(handle);
    },
    delegate: void 0
  };
  function reportUnhandledError(err) {
    timeoutProvider.setTimeout(function() {
      {
        throw err;
      }
    });
  }
  function noop() {
  }
  function errorContext(cb) {
    {
      cb();
    }
  }
  var Subscriber = function(_super) {
    __extends(Subscriber2, _super);
    function Subscriber2(destination) {
      var _this = _super.call(this) || this;
      _this.isStopped = false;
      if (destination) {
        _this.destination = destination;
        if (isSubscription(destination)) {
          destination.add(_this);
        }
      } else {
        _this.destination = EMPTY_OBSERVER;
      }
      return _this;
    }
    Subscriber2.create = function(next, error, complete) {
      return new SafeSubscriber(next, error, complete);
    };
    Subscriber2.prototype.next = function(value) {
      if (this.isStopped)
        ;
      else {
        this._next(value);
      }
    };
    Subscriber2.prototype.error = function(err) {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber2.prototype.complete = function() {
      if (this.isStopped)
        ;
      else {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber2.prototype.unsubscribe = function() {
      if (!this.closed) {
        this.isStopped = true;
        _super.prototype.unsubscribe.call(this);
        this.destination = null;
      }
    };
    Subscriber2.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber2.prototype._error = function(err) {
      try {
        this.destination.error(err);
      } finally {
        this.unsubscribe();
      }
    };
    Subscriber2.prototype._complete = function() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    };
    return Subscriber2;
  }(Subscription);
  var _bind = Function.prototype.bind;
  function bind(fn, thisArg) {
    return _bind.call(fn, thisArg);
  }
  var ConsumerObserver = function() {
    function ConsumerObserver2(partialObserver) {
      this.partialObserver = partialObserver;
    }
    ConsumerObserver2.prototype.next = function(value) {
      var partialObserver = this.partialObserver;
      if (partialObserver.next) {
        try {
          partialObserver.next(value);
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    ConsumerObserver2.prototype.error = function(err) {
      var partialObserver = this.partialObserver;
      if (partialObserver.error) {
        try {
          partialObserver.error(err);
        } catch (error) {
          handleUnhandledError(error);
        }
      } else {
        handleUnhandledError(err);
      }
    };
    ConsumerObserver2.prototype.complete = function() {
      var partialObserver = this.partialObserver;
      if (partialObserver.complete) {
        try {
          partialObserver.complete();
        } catch (error) {
          handleUnhandledError(error);
        }
      }
    };
    return ConsumerObserver2;
  }();
  var SafeSubscriber = function(_super) {
    __extends(SafeSubscriber2, _super);
    function SafeSubscriber2(observerOrNext, error, complete) {
      var _this = _super.call(this) || this;
      var partialObserver;
      if (isFunction(observerOrNext) || !observerOrNext) {
        partialObserver = {
          next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
          error: error !== null && error !== void 0 ? error : void 0,
          complete: complete !== null && complete !== void 0 ? complete : void 0
        };
      } else {
        var context_1;
        if (_this && config.useDeprecatedNextContext) {
          context_1 = Object.create(observerOrNext);
          context_1.unsubscribe = function() {
            return _this.unsubscribe();
          };
          partialObserver = {
            next: observerOrNext.next && bind(observerOrNext.next, context_1),
            error: observerOrNext.error && bind(observerOrNext.error, context_1),
            complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
          };
        } else {
          partialObserver = observerOrNext;
        }
      }
      _this.destination = new ConsumerObserver(partialObserver);
      return _this;
    }
    return SafeSubscriber2;
  }(Subscriber);
  function handleUnhandledError(error) {
    {
      reportUnhandledError(error);
    }
  }
  function defaultErrorHandler(err) {
    throw err;
  }
  var EMPTY_OBSERVER = {
    closed: true,
    next: noop,
    error: defaultErrorHandler,
    complete: noop
  };
  var observable = function() {
    return typeof Symbol === "function" && Symbol.observable || "@@observable";
  }();
  function identity(x) {
    return x;
  }
  function pipeFromArray(fns) {
    if (fns.length === 0) {
      return identity;
    }
    if (fns.length === 1) {
      return fns[0];
    }
    return function piped(input) {
      return fns.reduce(function(prev, fn) {
        return fn(prev);
      }, input);
    };
  }
  var Observable = function() {
    function Observable2(subscribe) {
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable2.prototype.lift = function(operator) {
      var observable2 = new Observable2();
      observable2.source = this;
      observable2.operator = operator;
      return observable2;
    };
    Observable2.prototype.subscribe = function(observerOrNext, error, complete) {
      var _this = this;
      var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
      errorContext(function() {
        var _a = _this, operator = _a.operator, source = _a.source;
        subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
      });
      return subscriber;
    };
    Observable2.prototype._trySubscribe = function(sink) {
      try {
        return this._subscribe(sink);
      } catch (err) {
        sink.error(err);
      }
    };
    Observable2.prototype.forEach = function(next, promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var subscriber = new SafeSubscriber({
          next: function(value) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscriber.unsubscribe();
            }
          },
          error: reject,
          complete: resolve
        });
        _this.subscribe(subscriber);
      });
    };
    Observable2.prototype._subscribe = function(subscriber) {
      var _a;
      return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
    };
    Observable2.prototype[observable] = function() {
      return this;
    };
    Observable2.prototype.pipe = function() {
      var operations = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        operations[_i] = arguments[_i];
      }
      return pipeFromArray(operations)(this);
    };
    Observable2.prototype.toPromise = function(promiseCtor) {
      var _this = this;
      promiseCtor = getPromiseCtor(promiseCtor);
      return new promiseCtor(function(resolve, reject) {
        var value;
        _this.subscribe(function(x) {
          return value = x;
        }, function(err) {
          return reject(err);
        }, function() {
          return resolve(value);
        });
      });
    };
    Observable2.create = function(subscribe) {
      return new Observable2(subscribe);
    };
    return Observable2;
  }();
  function getPromiseCtor(promiseCtor) {
    var _a;
    return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
  }
  function isObserver(value) {
    return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
  }
  function isSubscriber(value) {
    return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
  }
  function isInteropObservable(input) {
    return isFunction(input[observable]);
  }
  function isAsyncIterable(obj) {
    return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
  }
  function createInvalidObservableTypeError(input) {
    return new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
  }
  function getSymbolIterator() {
    if (typeof Symbol !== "function" || !Symbol.iterator) {
      return "@@iterator";
    }
    return Symbol.iterator;
  }
  var iterator = getSymbolIterator();
  function isIterable(input) {
    return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
  }
  function readableStreamLikeToAsyncGenerator(readableStream) {
    return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
      var reader, _a, value, done;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            reader = readableStream.getReader();
            _b.label = 1;
          case 1:
            _b.trys.push([1, , 9, 10]);
            _b.label = 2;
          case 2:
            return [4, __await(reader.read())];
          case 3:
            _a = _b.sent(), value = _a.value, done = _a.done;
            if (!done)
              return [3, 5];
            return [4, __await(void 0)];
          case 4:
            return [2, _b.sent()];
          case 5:
            return [4, __await(value)];
          case 6:
            return [4, _b.sent()];
          case 7:
            _b.sent();
            return [3, 2];
          case 8:
            return [3, 10];
          case 9:
            reader.releaseLock();
            return [7];
          case 10:
            return [2];
        }
      });
    });
  }
  function isReadableStreamLike(obj) {
    return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
  }
  function innerFrom(input) {
    if (input instanceof Observable) {
      return input;
    }
    if (input != null) {
      if (isInteropObservable(input)) {
        return fromInteropObservable(input);
      }
      if (isArrayLike(input)) {
        return fromArrayLike(input);
      }
      if (isPromise(input)) {
        return fromPromise(input);
      }
      if (isAsyncIterable(input)) {
        return fromAsyncIterable(input);
      }
      if (isIterable(input)) {
        return fromIterable(input);
      }
      if (isReadableStreamLike(input)) {
        return fromReadableStreamLike(input);
      }
    }
    throw createInvalidObservableTypeError(input);
  }
  function fromInteropObservable(obj) {
    return new Observable(function(subscriber) {
      var obs = obj[observable]();
      if (isFunction(obs.subscribe)) {
        return obs.subscribe(subscriber);
      }
      throw new TypeError("Provided object does not correctly implement Symbol.observable");
    });
  }
  function fromArrayLike(array) {
    return new Observable(function(subscriber) {
      for (var i = 0; i < array.length && !subscriber.closed; i++) {
        subscriber.next(array[i]);
      }
      subscriber.complete();
    });
  }
  function fromPromise(promise) {
    return new Observable(function(subscriber) {
      promise.then(function(value) {
        if (!subscriber.closed) {
          subscriber.next(value);
          subscriber.complete();
        }
      }, function(err) {
        return subscriber.error(err);
      }).then(null, reportUnhandledError);
    });
  }
  function fromIterable(iterable) {
    return new Observable(function(subscriber) {
      var e_1, _a;
      try {
        for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
          var value = iterable_1_1.value;
          subscriber.next(value);
          if (subscriber.closed) {
            return;
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 };
      } finally {
        try {
          if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return))
            _a.call(iterable_1);
        } finally {
          if (e_1)
            throw e_1.error;
        }
      }
      subscriber.complete();
    });
  }
  function fromAsyncIterable(asyncIterable) {
    return new Observable(function(subscriber) {
      process(asyncIterable, subscriber).catch(function(err) {
        return subscriber.error(err);
      });
    });
  }
  function fromReadableStreamLike(readableStream) {
    return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
  }
  function process(asyncIterable, subscriber) {
    var asyncIterable_1, asyncIterable_1_1;
    var e_2, _a;
    return __awaiter(this, void 0, void 0, function() {
      var value, e_2_1;
      return __generator(this, function(_b) {
        switch (_b.label) {
          case 0:
            _b.trys.push([0, 5, 6, 11]);
            asyncIterable_1 = __asyncValues(asyncIterable);
            _b.label = 1;
          case 1:
            return [4, asyncIterable_1.next()];
          case 2:
            if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done))
              return [3, 4];
            value = asyncIterable_1_1.value;
            subscriber.next(value);
            if (subscriber.closed) {
              return [2];
            }
            _b.label = 3;
          case 3:
            return [3, 1];
          case 4:
            return [3, 11];
          case 5:
            e_2_1 = _b.sent();
            e_2 = { error: e_2_1 };
            return [3, 11];
          case 6:
            _b.trys.push([6, , 9, 10]);
            if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return)))
              return [3, 8];
            return [4, _a.call(asyncIterable_1)];
          case 7:
            _b.sent();
            _b.label = 8;
          case 8:
            return [3, 10];
          case 9:
            if (e_2)
              throw e_2.error;
            return [7];
          case 10:
            return [7];
          case 11:
            subscriber.complete();
            return [2];
        }
      });
    });
  }
  function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
  }
  var OperatorSubscriber = function(_super) {
    __extends(OperatorSubscriber2, _super);
    function OperatorSubscriber2(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
      var _this = _super.call(this, destination) || this;
      _this.onFinalize = onFinalize;
      _this.shouldUnsubscribe = shouldUnsubscribe;
      _this._next = onNext ? function(value) {
        try {
          onNext(value);
        } catch (err) {
          destination.error(err);
        }
      } : _super.prototype._next;
      _this._error = onError ? function(err) {
        try {
          onError(err);
        } catch (err2) {
          destination.error(err2);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._error;
      _this._complete = onComplete ? function() {
        try {
          onComplete();
        } catch (err) {
          destination.error(err);
        } finally {
          this.unsubscribe();
        }
      } : _super.prototype._complete;
      return _this;
    }
    OperatorSubscriber2.prototype.unsubscribe = function() {
      var _a;
      if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
        var closed_1 = this.closed;
        _super.prototype.unsubscribe.call(this);
        !closed_1 && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
      }
    };
    return OperatorSubscriber2;
  }(Subscriber);
  function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
    if (delay === void 0) {
      delay = 0;
    }
    if (repeat === void 0) {
      repeat = false;
    }
    var scheduleSubscription = scheduler.schedule(function() {
      work();
      if (repeat) {
        parentSubscription.add(this.schedule(null, delay));
      } else {
        this.unsubscribe();
      }
    }, delay);
    parentSubscription.add(scheduleSubscription);
    if (!repeat) {
      return scheduleSubscription;
    }
  }
  function map(project, thisArg) {
    return operate(function(source, subscriber) {
      var index = 0;
      source.subscribe(createOperatorSubscriber(subscriber, function(value) {
        subscriber.next(project.call(thisArg, value, index++));
      }));
    });
  }
  function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
    var buffer = [];
    var active = 0;
    var index = 0;
    var isComplete = false;
    var checkComplete = function() {
      if (isComplete && !buffer.length && !active) {
        subscriber.complete();
      }
    };
    var outerNext = function(value) {
      return active < concurrent ? doInnerSub(value) : buffer.push(value);
    };
    var doInnerSub = function(value) {
      expand && subscriber.next(value);
      active++;
      var innerComplete = false;
      innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
        onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);
        if (expand) {
          outerNext(innerValue);
        } else {
          subscriber.next(innerValue);
        }
      }, function() {
        innerComplete = true;
      }, void 0, function() {
        if (innerComplete) {
          try {
            active--;
            var _loop_1 = function() {
              var bufferedValue = buffer.shift();
              if (innerSubScheduler) {
                executeSchedule(subscriber, innerSubScheduler, function() {
                  return doInnerSub(bufferedValue);
                });
              } else {
                doInnerSub(bufferedValue);
              }
            };
            while (buffer.length && active < concurrent) {
              _loop_1();
            }
            checkComplete();
          } catch (err) {
            subscriber.error(err);
          }
        }
      }));
    };
    source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
      isComplete = true;
      checkComplete();
    }));
    return function() {
      additionalFinalizer === null || additionalFinalizer === void 0 ? void 0 : additionalFinalizer();
    };
  }
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    if (isFunction(resultSelector)) {
      return mergeMap(function(a, i) {
        return map(function(b, ii) {
          return resultSelector(a, b, i, ii);
        })(innerFrom(project(a, i)));
      }, concurrent);
    } else if (typeof resultSelector === "number") {
      concurrent = resultSelector;
    }
    return operate(function(source, subscriber) {
      return mergeInternals(source, subscriber, project, concurrent);
    });
  }
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Infinity;
    }
    return mergeMap(identity, concurrent);
  }
  function concatAll() {
    return mergeAll(1);
  }
  function concatMap(project, resultSelector) {
    return isFunction(resultSelector) ? mergeMap(project, resultSelector, 1) : mergeMap(project, 1);
  }
  class IframeUtils {
    static getIframes(element) {
      return Array.from(element.querySelectorAll("iframe"));
    }
    static getAllNestedIframes(element) {
      const iframes = IframeUtils.getIframes(element);
      if (iframes.length === 0) {
        return rxjs.of([]);
      } else {
        return rxjs.from(iframes).pipe(
          mergeMap(
            (iframe) => new rxjs.Observable((subscriber) => {
              if (iframe.contentDocument) {
                const iframeDocument = iframe.contentDocument;
                const nestedIframes = IframeUtils.getAllNestedIframes(iframeDocument.documentElement);
                nestedIframes.subscribe((nestedIframes2) => {
                  subscriber.next([iframe, ...nestedIframes2]);
                  subscriber.complete();
                });
              } else {
                subscriber.next([]);
                subscriber.complete();
              }
            })
          ),
          concatAll(),
          rxjs.toArray()
        );
      }
    }
  }
  var Typr$1 = {};
  var Typr = {};
  Typr.parse = function(buff) {
    var bin = Typr._bin;
    var data = new Uint8Array(buff);
    var tag = bin.readASCII(data, 0, 4);
    if (tag == "ttcf") {
      var offset = 4;
      bin.readUshort(data, offset);
      offset += 2;
      bin.readUshort(data, offset);
      offset += 2;
      var numF = bin.readUint(data, offset);
      offset += 4;
      var fnts = [];
      for (var i = 0; i < numF; i++) {
        var foff = bin.readUint(data, offset);
        offset += 4;
        fnts.push(Typr._readFont(data, foff));
      }
      return fnts;
    } else
      return [Typr._readFont(data, 0)];
  };
  Typr._readFont = function(data, offset) {
    var bin = Typr._bin;
    var ooff = offset;
    bin.readFixed(data, offset);
    offset += 4;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var tags = [
      "cmap",
      "head",
      "hhea",
      "maxp",
      "hmtx",
      "name",
      "OS/2",
      "post",
      //"cvt",
      //"fpgm",
      "loca",
      "glyf",
      "kern",
      //"prep"
      //"gasp"
      "CFF ",
      "GPOS",
      "GSUB",
      "SVG "
      //"VORG",
    ];
    var obj = { _data: data, _offset: ooff };
    var tabs = {};
    for (var i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      var length = bin.readUint(data, offset);
      offset += 4;
      tabs[tag] = { offset: toffset, length };
    }
    for (var i = 0; i < tags.length; i++) {
      var t = tags[i];
      if (tabs[t])
        obj[t.trim()] = Typr[t.trim()].parse(data, tabs[t].offset, tabs[t].length, obj);
    }
    return obj;
  };
  Typr._tabOffset = function(data, tab, foff) {
    var bin = Typr._bin;
    var numTables = bin.readUshort(data, foff + 4);
    var offset = foff + 12;
    for (var i = 0; i < numTables; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      var toffset = bin.readUint(data, offset);
      offset += 4;
      bin.readUint(data, offset);
      offset += 4;
      if (tag == tab)
        return toffset;
    }
    return 0;
  };
  Typr._bin = {
    readFixed: function(data, o) {
      return (data[o] << 8 | data[o + 1]) + (data[o + 2] << 8 | data[o + 3]) / (256 * 256 + 4);
    },
    readF2dot14: function(data, o) {
      var num = Typr._bin.readShort(data, o);
      return num / 16384;
    },
    readInt: function(buff, p) {
      return Typr._bin._view(buff).getInt32(p);
    },
    readInt8: function(buff, p) {
      return Typr._bin._view(buff).getInt8(p);
    },
    readShort: function(buff, p) {
      return Typr._bin._view(buff).getInt16(p);
    },
    readUshort: function(buff, p) {
      return Typr._bin._view(buff).getUint16(p);
    },
    readUshorts: function(buff, p, len) {
      var arr = [];
      for (var i = 0; i < len; i++)
        arr.push(Typr._bin.readUshort(buff, p + i * 2));
      return arr;
    },
    readUint: function(buff, p) {
      return Typr._bin._view(buff).getUint32(p);
    },
    readUint64: function(buff, p) {
      return Typr._bin.readUint(buff, p) * (4294967295 + 1) + Typr._bin.readUint(buff, p + 4);
    },
    readASCII: function(buff, p, l) {
      var s = "";
      for (var i = 0; i < l; i++)
        s += String.fromCharCode(buff[p + i]);
      return s;
    },
    readUnicode: function(buff, p, l) {
      var s = "";
      for (var i = 0; i < l; i++) {
        var c = buff[p++] << 8 | buff[p++];
        s += String.fromCharCode(c);
      }
      return s;
    },
    _tdec: typeof window !== "undefined" && window["TextDecoder"] ? new window["TextDecoder"]() : null,
    readUTF8: function(buff, p, l) {
      var tdec = Typr._bin._tdec;
      if (tdec && p == 0 && l == buff.length)
        return tdec["decode"](buff);
      return Typr._bin.readASCII(buff, p, l);
    },
    readBytes: function(buff, p, l) {
      var arr = [];
      for (var i = 0; i < l; i++)
        arr.push(buff[p + i]);
      return arr;
    },
    readASCIIArray: function(buff, p, l) {
      var s = [];
      for (var i = 0; i < l; i++)
        s.push(String.fromCharCode(buff[p + i]));
      return s;
    },
    _view: function(buff) {
      return buff._dataView || (buff._dataView = buff.buffer ? new DataView(buff.buffer, buff.byteOffset, buff.byteLength) : new DataView(new Uint8Array(buff).buffer));
    }
  };
  Typr._lctf = {};
  Typr._lctf.parse = function(data, offset, length, font, subt) {
    var bin = Typr._bin;
    var obj = {};
    var offset0 = offset;
    bin.readFixed(data, offset);
    offset += 4;
    var offScriptList = bin.readUshort(data, offset);
    offset += 2;
    var offFeatureList = bin.readUshort(data, offset);
    offset += 2;
    var offLookupList = bin.readUshort(data, offset);
    offset += 2;
    obj.scriptList = Typr._lctf.readScriptList(data, offset0 + offScriptList);
    obj.featureList = Typr._lctf.readFeatureList(data, offset0 + offFeatureList);
    obj.lookupList = Typr._lctf.readLookupList(data, offset0 + offLookupList, subt);
    return obj;
  };
  Typr._lctf.readLookupList = function(data, offset, subt) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = [];
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var lut = Typr._lctf.readLookupTable(data, offset0 + noff, subt);
      obj.push(lut);
    }
    return obj;
  };
  Typr._lctf.readLookupTable = function(data, offset, subt) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = { tabs: [] };
    obj.ltype = bin.readUshort(data, offset);
    offset += 2;
    obj.flag = bin.readUshort(data, offset);
    offset += 2;
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    var ltype = obj.ltype;
    for (var i = 0; i < cnt; i++) {
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var tab = subt(data, ltype, offset0 + noff, obj);
      obj.tabs.push(tab);
    }
    return obj;
  };
  Typr._lctf.numOfOnes = function(n) {
    var num = 0;
    for (var i = 0; i < 32; i++)
      if ((n >>> i & 1) != 0)
        num++;
    return num;
  };
  Typr._lctf.readClassDef = function(data, offset) {
    var bin = Typr._bin;
    var obj = [];
    var format = bin.readUshort(data, offset);
    offset += 2;
    if (format == 1) {
      var startGlyph = bin.readUshort(data, offset);
      offset += 2;
      var glyphCount = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < glyphCount; i++) {
        obj.push(startGlyph + i);
        obj.push(startGlyph + i);
        obj.push(bin.readUshort(data, offset));
        offset += 2;
      }
    }
    if (format == 2) {
      var count = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < count; i++) {
        obj.push(bin.readUshort(data, offset));
        offset += 2;
        obj.push(bin.readUshort(data, offset));
        offset += 2;
        obj.push(bin.readUshort(data, offset));
        offset += 2;
      }
    }
    return obj;
  };
  Typr._lctf.getInterval = function(tab, val) {
    for (var i = 0; i < tab.length; i += 3) {
      var start = tab[i], end = tab[i + 1];
      tab[i + 2];
      if (start <= val && val <= end)
        return i;
    }
    return -1;
  };
  Typr._lctf.readCoverage = function(data, offset) {
    var bin = Typr._bin;
    var cvg = {};
    cvg.fmt = bin.readUshort(data, offset);
    offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2;
    if (cvg.fmt == 1)
      cvg.tab = bin.readUshorts(data, offset, count);
    if (cvg.fmt == 2)
      cvg.tab = bin.readUshorts(data, offset, count * 3);
    return cvg;
  };
  Typr._lctf.coverageIndex = function(cvg, val) {
    var tab = cvg.tab;
    if (cvg.fmt == 1)
      return tab.indexOf(val);
    if (cvg.fmt == 2) {
      var ind = Typr._lctf.getInterval(tab, val);
      if (ind != -1)
        return tab[ind + 2] + (val - tab[ind]);
    }
    return -1;
  };
  Typr._lctf.readFeatureList = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = [];
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2;
      var feat = Typr._lctf.readFeatureTable(data, offset0 + noff);
      feat.tag = tag.trim();
      obj.push(feat);
    }
    return obj;
  };
  Typr._lctf.readFeatureTable = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var feat = {};
    var featureParams = bin.readUshort(data, offset);
    offset += 2;
    if (featureParams > 0) {
      feat.featureParams = offset0 + featureParams;
    }
    var lookupCount = bin.readUshort(data, offset);
    offset += 2;
    feat.tab = [];
    for (var i = 0; i < lookupCount; i++)
      feat.tab.push(bin.readUshort(data, offset + 2 * i));
    return feat;
  };
  Typr._lctf.readScriptList = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    var count = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < count; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var noff = bin.readUshort(data, offset);
      offset += 2;
      obj[tag.trim()] = Typr._lctf.readScriptTable(data, offset0 + noff);
    }
    return obj;
  };
  Typr._lctf.readScriptTable = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    var defLangSysOff = bin.readUshort(data, offset);
    offset += 2;
    obj["default"] = Typr._lctf.readLangSysTable(data, offset0 + defLangSysOff);
    var langSysCount = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < langSysCount; i++) {
      var tag = bin.readASCII(data, offset, 4);
      offset += 4;
      var langSysOff = bin.readUshort(data, offset);
      offset += 2;
      obj[tag.trim()] = Typr._lctf.readLangSysTable(data, offset0 + langSysOff);
    }
    return obj;
  };
  Typr._lctf.readLangSysTable = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    obj.reqFeature = bin.readUshort(data, offset);
    offset += 2;
    var featureCount = bin.readUshort(data, offset);
    offset += 2;
    obj.features = bin.readUshorts(data, offset, featureCount);
    return obj;
  };
  Typr.CFF = {};
  Typr.CFF.parse = function(data, offset, length) {
    var bin = Typr._bin;
    data = new Uint8Array(data.buffer, offset, length);
    offset = 0;
    data[offset];
    offset++;
    data[offset];
    offset++;
    data[offset];
    offset++;
    data[offset];
    offset++;
    var ninds = [];
    offset = Typr.CFF.readIndex(data, offset, ninds);
    var names = [];
    for (var i = 0; i < ninds.length - 1; i++)
      names.push(bin.readASCII(data, offset + ninds[i], ninds[i + 1] - ninds[i]));
    offset += ninds[ninds.length - 1];
    var tdinds = [];
    offset = Typr.CFF.readIndex(data, offset, tdinds);
    var topDicts = [];
    for (var i = 0; i < tdinds.length - 1; i++)
      topDicts.push(Typr.CFF.readDict(data, offset + tdinds[i], offset + tdinds[i + 1]));
    offset += tdinds[tdinds.length - 1];
    var topdict = topDicts[0];
    var sinds = [];
    offset = Typr.CFF.readIndex(data, offset, sinds);
    var strings = [];
    for (var i = 0; i < sinds.length - 1; i++)
      strings.push(bin.readASCII(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
    offset += sinds[sinds.length - 1];
    Typr.CFF.readSubrs(data, offset, topdict);
    if (topdict.CharStrings) {
      offset = topdict.CharStrings;
      var sinds = [];
      offset = Typr.CFF.readIndex(data, offset, sinds);
      var cstr = [];
      for (var i = 0; i < sinds.length - 1; i++)
        cstr.push(bin.readBytes(data, offset + sinds[i], sinds[i + 1] - sinds[i]));
      topdict.CharStrings = cstr;
    }
    if (topdict.ROS) {
      offset = topdict.FDArray;
      var fdind = [];
      offset = Typr.CFF.readIndex(data, offset, fdind);
      topdict.FDArray = [];
      for (var i = 0; i < fdind.length - 1; i++) {
        var dict = Typr.CFF.readDict(data, offset + fdind[i], offset + fdind[i + 1]);
        Typr.CFF._readFDict(data, dict, strings);
        topdict.FDArray.push(dict);
      }
      offset += fdind[fdind.length - 1];
      offset = topdict.FDSelect;
      topdict.FDSelect = [];
      var fmt = data[offset];
      offset++;
      if (fmt == 3) {
        var rns = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < rns + 1; i++) {
          topdict.FDSelect.push(bin.readUshort(data, offset), data[offset + 2]);
          offset += 3;
        }
      } else
        throw fmt;
    }
    if (topdict.Encoding)
      topdict.Encoding = Typr.CFF.readEncoding(data, topdict.Encoding, topdict.CharStrings.length);
    if (topdict.charset)
      topdict.charset = Typr.CFF.readCharset(data, topdict.charset, topdict.CharStrings.length);
    Typr.CFF._readFDict(data, topdict, strings);
    return topdict;
  };
  Typr.CFF._readFDict = function(data, dict, ss) {
    var offset;
    if (dict.Private) {
      offset = dict.Private[1];
      dict.Private = Typr.CFF.readDict(data, offset, offset + dict.Private[0]);
      if (dict.Private.Subrs)
        Typr.CFF.readSubrs(data, offset + dict.Private.Subrs, dict.Private);
    }
    for (var p in dict)
      if (["FamilyName", "FontName", "FullName", "Notice", "version", "Copyright"].indexOf(p) != -1)
        dict[p] = ss[dict[p] - 426 + 35];
  };
  Typr.CFF.readSubrs = function(data, offset, obj) {
    var bin = Typr._bin;
    var gsubinds = [];
    offset = Typr.CFF.readIndex(data, offset, gsubinds);
    var bias, nSubrs = gsubinds.length;
    if (nSubrs < 1240)
      bias = 107;
    else if (nSubrs < 33900)
      bias = 1131;
    else
      bias = 32768;
    obj.Bias = bias;
    obj.Subrs = [];
    for (var i = 0; i < gsubinds.length - 1; i++)
      obj.Subrs.push(bin.readBytes(data, offset + gsubinds[i], gsubinds[i + 1] - gsubinds[i]));
  };
  Typr.CFF.tableSE = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    0,
    111,
    112,
    113,
    114,
    0,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    0,
    123,
    0,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    0,
    132,
    133,
    0,
    134,
    135,
    136,
    137,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    138,
    0,
    139,
    0,
    0,
    0,
    0,
    140,
    141,
    142,
    143,
    0,
    0,
    0,
    0,
    0,
    144,
    0,
    0,
    0,
    145,
    0,
    0,
    146,
    147,
    148,
    149,
    0,
    0,
    0,
    0
  ];
  Typr.CFF.glyphByUnicode = function(cff, code) {
    for (var i = 0; i < cff.charset.length; i++)
      if (cff.charset[i] == code)
        return i;
    return -1;
  };
  Typr.CFF.glyphBySE = function(cff, charcode) {
    if (charcode < 0 || charcode > 255)
      return -1;
    return Typr.CFF.glyphByUnicode(cff, Typr.CFF.tableSE[charcode]);
  };
  Typr.CFF.readEncoding = function(data, offset, num) {
    Typr._bin;
    var array = [".notdef"];
    var format = data[offset];
    offset++;
    if (format == 0) {
      var nCodes = data[offset];
      offset++;
      for (var i = 0; i < nCodes; i++)
        array.push(data[offset + i]);
    } else
      throw "error: unknown encoding format: " + format;
    return array;
  };
  Typr.CFF.readCharset = function(data, offset, num) {
    var bin = Typr._bin;
    var charset = [".notdef"];
    var format = data[offset];
    offset++;
    if (format == 0) {
      for (var i = 0; i < num; i++) {
        var first = bin.readUshort(data, offset);
        offset += 2;
        charset.push(first);
      }
    } else if (format == 1 || format == 2) {
      while (charset.length < num) {
        var first = bin.readUshort(data, offset);
        offset += 2;
        var nLeft = 0;
        if (format == 1) {
          nLeft = data[offset];
          offset++;
        } else {
          nLeft = bin.readUshort(data, offset);
          offset += 2;
        }
        for (var i = 0; i <= nLeft; i++) {
          charset.push(first);
          first++;
        }
      }
    } else
      throw "error: format: " + format;
    return charset;
  };
  Typr.CFF.readIndex = function(data, offset, inds) {
    var bin = Typr._bin;
    var count = bin.readUshort(data, offset) + 1;
    offset += 2;
    var offsize = data[offset];
    offset++;
    if (offsize == 1)
      for (var i = 0; i < count; i++)
        inds.push(data[offset + i]);
    else if (offsize == 2)
      for (var i = 0; i < count; i++)
        inds.push(bin.readUshort(data, offset + i * 2));
    else if (offsize == 3)
      for (var i = 0; i < count; i++)
        inds.push(bin.readUint(data, offset + i * 3 - 1) & 16777215);
    else if (count != 1)
      throw "unsupported offset size: " + offsize + ", count: " + count;
    offset += count * offsize;
    return offset - 1;
  };
  Typr.CFF.getCharString = function(data, offset, o) {
    var bin = Typr._bin;
    var b0 = data[offset], b1 = data[offset + 1];
    data[offset + 2];
    data[offset + 3];
    data[offset + 4];
    var vs = 1;
    var op = null, val = null;
    if (b0 <= 20) {
      op = b0;
      vs = 1;
    }
    if (b0 == 12) {
      op = b0 * 100 + b1;
      vs = 2;
    }
    if (21 <= b0 && b0 <= 27) {
      op = b0;
      vs = 1;
    }
    if (b0 == 28) {
      val = bin.readShort(data, offset + 1);
      vs = 3;
    }
    if (29 <= b0 && b0 <= 31) {
      op = b0;
      vs = 1;
    }
    if (32 <= b0 && b0 <= 246) {
      val = b0 - 139;
      vs = 1;
    }
    if (247 <= b0 && b0 <= 250) {
      val = (b0 - 247) * 256 + b1 + 108;
      vs = 2;
    }
    if (251 <= b0 && b0 <= 254) {
      val = -(b0 - 251) * 256 - b1 - 108;
      vs = 2;
    }
    if (b0 == 255) {
      val = bin.readInt(data, offset + 1) / 65535;
      vs = 5;
    }
    o.val = val != null ? val : "o" + op;
    o.size = vs;
  };
  Typr.CFF.readCharString = function(data, offset, length) {
    var end = offset + length;
    var bin = Typr._bin;
    var arr = [];
    while (offset < end) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2];
      data[offset + 3];
      data[offset + 4];
      var vs = 1;
      var op = null, val = null;
      if (b0 <= 20) {
        op = b0;
        vs = 1;
      }
      if (b0 == 12) {
        op = b0 * 100 + b1;
        vs = 2;
      }
      if (b0 == 19 || b0 == 20) {
        op = b0;
        vs = 2;
      }
      if (21 <= b0 && b0 <= 27) {
        op = b0;
        vs = 1;
      }
      if (b0 == 28) {
        val = bin.readShort(data, offset + 1);
        vs = 3;
      }
      if (29 <= b0 && b0 <= 31) {
        op = b0;
        vs = 1;
      }
      if (32 <= b0 && b0 <= 246) {
        val = b0 - 139;
        vs = 1;
      }
      if (247 <= b0 && b0 <= 250) {
        val = (b0 - 247) * 256 + b1 + 108;
        vs = 2;
      }
      if (251 <= b0 && b0 <= 254) {
        val = -(b0 - 251) * 256 - b1 - 108;
        vs = 2;
      }
      if (b0 == 255) {
        val = bin.readInt(data, offset + 1) / 65535;
        vs = 5;
      }
      arr.push(val != null ? val : "o" + op);
      offset += vs;
    }
    return arr;
  };
  Typr.CFF.readDict = function(data, offset, end) {
    var bin = Typr._bin;
    var dict = {};
    var carr = [];
    while (offset < end) {
      var b0 = data[offset], b1 = data[offset + 1];
      data[offset + 2];
      data[offset + 3];
      data[offset + 4];
      var vs = 1;
      var key = null, val = null;
      if (b0 == 28) {
        val = bin.readShort(data, offset + 1);
        vs = 3;
      }
      if (b0 == 29) {
        val = bin.readInt(data, offset + 1);
        vs = 5;
      }
      if (32 <= b0 && b0 <= 246) {
        val = b0 - 139;
        vs = 1;
      }
      if (247 <= b0 && b0 <= 250) {
        val = (b0 - 247) * 256 + b1 + 108;
        vs = 2;
      }
      if (251 <= b0 && b0 <= 254) {
        val = -(b0 - 251) * 256 - b1 - 108;
        vs = 2;
      }
      if (b0 == 255) {
        val = bin.readInt(data, offset + 1) / 65535;
        vs = 5;
        throw "unknown number";
      }
      if (b0 == 30) {
        var nibs = [];
        vs = 1;
        while (true) {
          var b = data[offset + vs];
          vs++;
          var nib0 = b >> 4, nib1 = b & 15;
          if (nib0 != 15)
            nibs.push(nib0);
          if (nib1 != 15)
            nibs.push(nib1);
          if (nib1 == 15)
            break;
        }
        var s = "";
        var chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ".", "e", "e-", "reserved", "-", "endOfNumber"];
        for (var i = 0; i < nibs.length; i++)
          s += chars[nibs[i]];
        val = parseFloat(s);
      }
      if (b0 <= 21) {
        var keys = [
          "version",
          "Notice",
          "FullName",
          "FamilyName",
          "Weight",
          "FontBBox",
          "BlueValues",
          "OtherBlues",
          "FamilyBlues",
          "FamilyOtherBlues",
          "StdHW",
          "StdVW",
          "escape",
          "UniqueID",
          "XUID",
          "charset",
          "Encoding",
          "CharStrings",
          "Private",
          "Subrs",
          "defaultWidthX",
          "nominalWidthX"
        ];
        key = keys[b0];
        vs = 1;
        if (b0 == 12) {
          var keys = [
            "Copyright",
            "isFixedPitch",
            "ItalicAngle",
            "UnderlinePosition",
            "UnderlineThickness",
            "PaintType",
            "CharstringType",
            "FontMatrix",
            "StrokeWidth",
            "BlueScale",
            "BlueShift",
            "BlueFuzz",
            "StemSnapH",
            "StemSnapV",
            "ForceBold",
            0,
            0,
            "LanguageGroup",
            "ExpansionFactor",
            "initialRandomSeed",
            "SyntheticBase",
            "PostScript",
            "BaseFontName",
            "BaseFontBlend",
            0,
            0,
            0,
            0,
            0,
            0,
            "ROS",
            "CIDFontVersion",
            "CIDFontRevision",
            "CIDFontType",
            "CIDCount",
            "UIDBase",
            "FDArray",
            "FDSelect",
            "FontName"
          ];
          key = keys[b1];
          vs = 2;
        }
      }
      if (key != null) {
        dict[key] = carr.length == 1 ? carr[0] : carr;
        carr = [];
      } else
        carr.push(val);
      offset += vs;
    }
    return dict;
  };
  Typr.cmap = {};
  Typr.cmap.parse = function(data, offset, length) {
    data = new Uint8Array(data.buffer, offset, length);
    offset = 0;
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    var numTables = bin.readUshort(data, offset);
    offset += 2;
    var offs = [];
    obj.tables = [];
    for (var i = 0; i < numTables; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUint(data, offset);
      offset += 4;
      var id = "p" + platformID + "e" + encodingID;
      var tind = offs.indexOf(noffset);
      if (tind == -1) {
        tind = obj.tables.length;
        var subt;
        offs.push(noffset);
        var format = bin.readUshort(data, noffset);
        if (format == 0)
          subt = Typr.cmap.parse0(data, noffset);
        else if (format == 4)
          subt = Typr.cmap.parse4(data, noffset);
        else if (format == 6)
          subt = Typr.cmap.parse6(data, noffset);
        else if (format == 12)
          subt = Typr.cmap.parse12(data, noffset);
        else
          console.warn("unknown format: " + format, platformID, encodingID, noffset);
        obj.tables.push(subt);
      }
      if (obj[id] != null)
        throw "multiple tables for one platform+encoding";
      obj[id] = tind;
    }
    return obj;
  };
  Typr.cmap.parse0 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    var len = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    obj.map = [];
    for (var i = 0; i < len - 6; i++)
      obj.map.push(data[offset + i]);
    return obj;
  };
  Typr.cmap.parse4 = function(data, offset) {
    var bin = Typr._bin;
    var offset0 = offset;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    var length = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var segCountX2 = bin.readUshort(data, offset);
    offset += 2;
    var segCount = segCountX2 / 2;
    obj.searchRange = bin.readUshort(data, offset);
    offset += 2;
    obj.entrySelector = bin.readUshort(data, offset);
    offset += 2;
    obj.rangeShift = bin.readUshort(data, offset);
    offset += 2;
    obj.endCount = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    offset += 2;
    obj.startCount = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    obj.idDelta = [];
    for (var i = 0; i < segCount; i++) {
      obj.idDelta.push(bin.readShort(data, offset));
      offset += 2;
    }
    obj.idRangeOffset = bin.readUshorts(data, offset, segCount);
    offset += segCount * 2;
    obj.glyphIdArray = [];
    while (offset < offset0 + length) {
      obj.glyphIdArray.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return obj;
  };
  Typr.cmap.parse6 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    obj.firstCode = bin.readUshort(data, offset);
    offset += 2;
    var entryCount = bin.readUshort(data, offset);
    offset += 2;
    obj.glyphIdArray = [];
    for (var i = 0; i < entryCount; i++) {
      obj.glyphIdArray.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return obj;
  };
  Typr.cmap.parse12 = function(data, offset) {
    var bin = Typr._bin;
    var obj = {};
    obj.format = bin.readUshort(data, offset);
    offset += 2;
    offset += 2;
    bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    var nGroups = bin.readUint(data, offset);
    offset += 4;
    obj.groups = [];
    for (var i = 0; i < nGroups; i++) {
      var off = offset + i * 12;
      var startCharCode = bin.readUint(data, off + 0);
      var endCharCode = bin.readUint(data, off + 4);
      var startGlyphID = bin.readUint(data, off + 8);
      obj.groups.push([startCharCode, endCharCode, startGlyphID]);
    }
    return obj;
  };
  Typr.glyf = {};
  Typr.glyf.parse = function(data, offset, length, font) {
    var obj = [];
    for (var g = 0; g < font.maxp.numGlyphs; g++)
      obj.push(null);
    return obj;
  };
  Typr.glyf._parseGlyf = function(font, g) {
    var bin = Typr._bin;
    var data = font._data;
    var offset = Typr._tabOffset(data, "glyf", font._offset) + font.loca[g];
    if (font.loca[g] == font.loca[g + 1])
      return null;
    var gl = {};
    gl.noc = bin.readShort(data, offset);
    offset += 2;
    gl.xMin = bin.readShort(data, offset);
    offset += 2;
    gl.yMin = bin.readShort(data, offset);
    offset += 2;
    gl.xMax = bin.readShort(data, offset);
    offset += 2;
    gl.yMax = bin.readShort(data, offset);
    offset += 2;
    if (gl.xMin >= gl.xMax || gl.yMin >= gl.yMax)
      return null;
    if (gl.noc > 0) {
      gl.endPts = [];
      for (var i = 0; i < gl.noc; i++) {
        gl.endPts.push(bin.readUshort(data, offset));
        offset += 2;
      }
      var instructionLength = bin.readUshort(data, offset);
      offset += 2;
      if (data.length - offset < instructionLength)
        return null;
      gl.instructions = bin.readBytes(data, offset, instructionLength);
      offset += instructionLength;
      var crdnum = gl.endPts[gl.noc - 1] + 1;
      gl.flags = [];
      for (var i = 0; i < crdnum; i++) {
        var flag = data[offset];
        offset++;
        gl.flags.push(flag);
        if ((flag & 8) != 0) {
          var rep = data[offset];
          offset++;
          for (var j = 0; j < rep; j++) {
            gl.flags.push(flag);
            i++;
          }
        }
      }
      gl.xs = [];
      for (var i = 0; i < crdnum; i++) {
        var i8 = (gl.flags[i] & 2) != 0, same = (gl.flags[i] & 16) != 0;
        if (i8) {
          gl.xs.push(same ? data[offset] : -data[offset]);
          offset++;
        } else {
          if (same)
            gl.xs.push(0);
          else {
            gl.xs.push(bin.readShort(data, offset));
            offset += 2;
          }
        }
      }
      gl.ys = [];
      for (var i = 0; i < crdnum; i++) {
        var i8 = (gl.flags[i] & 4) != 0, same = (gl.flags[i] & 32) != 0;
        if (i8) {
          gl.ys.push(same ? data[offset] : -data[offset]);
          offset++;
        } else {
          if (same)
            gl.ys.push(0);
          else {
            gl.ys.push(bin.readShort(data, offset));
            offset += 2;
          }
        }
      }
      var x = 0, y = 0;
      for (var i = 0; i < crdnum; i++) {
        x += gl.xs[i];
        y += gl.ys[i];
        gl.xs[i] = x;
        gl.ys[i] = y;
      }
    } else {
      var ARG_1_AND_2_ARE_WORDS = 1 << 0;
      var ARGS_ARE_XY_VALUES = 1 << 1;
      var WE_HAVE_A_SCALE = 1 << 3;
      var MORE_COMPONENTS = 1 << 5;
      var WE_HAVE_AN_X_AND_Y_SCALE = 1 << 6;
      var WE_HAVE_A_TWO_BY_TWO = 1 << 7;
      var WE_HAVE_INSTRUCTIONS = 1 << 8;
      gl.parts = [];
      var flags;
      do {
        flags = bin.readUshort(data, offset);
        offset += 2;
        var part = { m: { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 }, p1: -1, p2: -1 };
        gl.parts.push(part);
        part.glyphIndex = bin.readUshort(data, offset);
        offset += 2;
        if (flags & ARG_1_AND_2_ARE_WORDS) {
          var arg1 = bin.readShort(data, offset);
          offset += 2;
          var arg2 = bin.readShort(data, offset);
          offset += 2;
        } else {
          var arg1 = bin.readInt8(data, offset);
          offset++;
          var arg2 = bin.readInt8(data, offset);
          offset++;
        }
        if (flags & ARGS_ARE_XY_VALUES) {
          part.m.tx = arg1;
          part.m.ty = arg2;
        } else {
          part.p1 = arg1;
          part.p2 = arg2;
        }
        if (flags & WE_HAVE_A_SCALE) {
          part.m.a = part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        } else if (flags & WE_HAVE_AN_X_AND_Y_SCALE) {
          part.m.a = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        } else if (flags & WE_HAVE_A_TWO_BY_TWO) {
          part.m.a = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.b = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.c = bin.readF2dot14(data, offset);
          offset += 2;
          part.m.d = bin.readF2dot14(data, offset);
          offset += 2;
        }
      } while (flags & MORE_COMPONENTS);
      if (flags & WE_HAVE_INSTRUCTIONS) {
        var numInstr = bin.readUshort(data, offset);
        offset += 2;
        gl.instr = [];
        for (var i = 0; i < numInstr; i++) {
          gl.instr.push(data[offset]);
          offset++;
        }
      }
    }
    return gl;
  };
  Typr.GPOS = {};
  Typr.GPOS.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GPOS.subt);
  };
  Typr.GPOS.subt = function(data, ltype, offset, ltable) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.fmt = bin.readUshort(data, offset);
    offset += 2;
    if (ltype == 1 || ltype == 2 || ltype == 3 || ltype == 7 || ltype == 8 && tab.fmt <= 2) {
      var covOff = bin.readUshort(data, offset);
      offset += 2;
      tab.coverage = Typr._lctf.readCoverage(data, covOff + offset0);
    }
    if (ltype == 1 && tab.fmt == 1) {
      var valFmt1 = bin.readUshort(data, offset);
      offset += 2;
      var ones1 = Typr._lctf.numOfOnes(valFmt1);
      if (valFmt1 != 0)
        tab.pos = Typr.GPOS.readValueRecord(data, offset, valFmt1);
    } else if (ltype == 2 && tab.fmt >= 1 && tab.fmt <= 2) {
      var valFmt1 = bin.readUshort(data, offset);
      offset += 2;
      var valFmt2 = bin.readUshort(data, offset);
      offset += 2;
      var ones1 = Typr._lctf.numOfOnes(valFmt1);
      var ones2 = Typr._lctf.numOfOnes(valFmt2);
      if (tab.fmt == 1) {
        tab.pairsets = [];
        var psc = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < psc; i++) {
          var psoff = offset0 + bin.readUshort(data, offset);
          offset += 2;
          var pvc = bin.readUshort(data, psoff);
          psoff += 2;
          var arr = [];
          for (var j = 0; j < pvc; j++) {
            var gid2 = bin.readUshort(data, psoff);
            psoff += 2;
            var value1, value2;
            if (valFmt1 != 0) {
              value1 = Typr.GPOS.readValueRecord(data, psoff, valFmt1);
              psoff += ones1 * 2;
            }
            if (valFmt2 != 0) {
              value2 = Typr.GPOS.readValueRecord(data, psoff, valFmt2);
              psoff += ones2 * 2;
            }
            arr.push({ gid2, val1: value1, val2: value2 });
          }
          tab.pairsets.push(arr);
        }
      }
      if (tab.fmt == 2) {
        var classDef1 = bin.readUshort(data, offset);
        offset += 2;
        var classDef2 = bin.readUshort(data, offset);
        offset += 2;
        var class1Count = bin.readUshort(data, offset);
        offset += 2;
        var class2Count = bin.readUshort(data, offset);
        offset += 2;
        tab.classDef1 = Typr._lctf.readClassDef(data, offset0 + classDef1);
        tab.classDef2 = Typr._lctf.readClassDef(data, offset0 + classDef2);
        tab.matrix = [];
        for (var i = 0; i < class1Count; i++) {
          var row = [];
          for (var j = 0; j < class2Count; j++) {
            var value1 = null, value2 = null;
            if (valFmt1 != 0) {
              value1 = Typr.GPOS.readValueRecord(data, offset, valFmt1);
              offset += ones1 * 2;
            }
            if (valFmt2 != 0) {
              value2 = Typr.GPOS.readValueRecord(data, offset, valFmt2);
              offset += ones2 * 2;
            }
            row.push({ val1: value1, val2: value2 });
          }
          tab.matrix.push(row);
        }
      }
    } else if (ltype == 9 && tab.fmt == 1) {
      var extType = bin.readUshort(data, offset);
      offset += 2;
      var extOffset = bin.readUint(data, offset);
      offset += 4;
      if (ltable.ltype == 9) {
        ltable.ltype = extType;
      } else if (ltable.ltype != extType) {
        throw "invalid extension substitution";
      }
      return Typr.GPOS.subt(data, ltable.ltype, offset0 + extOffset);
    } else
      console.warn("unsupported GPOS table LookupType", ltype, "format", tab.fmt);
    return tab;
  };
  Typr.GPOS.readValueRecord = function(data, offset, valFmt) {
    var bin = Typr._bin;
    var arr = [];
    arr.push(valFmt & 1 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 1 ? 2 : 0;
    arr.push(valFmt & 2 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 2 ? 2 : 0;
    arr.push(valFmt & 4 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 4 ? 2 : 0;
    arr.push(valFmt & 8 ? bin.readShort(data, offset) : 0);
    offset += valFmt & 8 ? 2 : 0;
    return arr;
  };
  Typr.GSUB = {};
  Typr.GSUB.parse = function(data, offset, length, font) {
    return Typr._lctf.parse(data, offset, length, font, Typr.GSUB.subt);
  };
  Typr.GSUB.subt = function(data, ltype, offset, ltable) {
    var bin = Typr._bin, offset0 = offset, tab = {};
    tab.fmt = bin.readUshort(data, offset);
    offset += 2;
    if (ltype != 1 && ltype != 4 && ltype != 5 && ltype != 6)
      return null;
    if (ltype == 1 || ltype == 4 || ltype == 5 && tab.fmt <= 2 || ltype == 6 && tab.fmt <= 2) {
      var covOff = bin.readUshort(data, offset);
      offset += 2;
      tab.coverage = Typr._lctf.readCoverage(data, offset0 + covOff);
    }
    if (ltype == 1 && tab.fmt >= 1 && tab.fmt <= 2) {
      if (tab.fmt == 1) {
        tab.delta = bin.readShort(data, offset);
        offset += 2;
      } else if (tab.fmt == 2) {
        var cnt = bin.readUshort(data, offset);
        offset += 2;
        tab.newg = bin.readUshorts(data, offset, cnt);
        offset += tab.newg.length * 2;
      }
    } else if (ltype == 4) {
      tab.vals = [];
      var cnt = bin.readUshort(data, offset);
      offset += 2;
      for (var i = 0; i < cnt; i++) {
        var loff = bin.readUshort(data, offset);
        offset += 2;
        tab.vals.push(Typr.GSUB.readLigatureSet(data, offset0 + loff));
      }
    } else if (ltype == 5 && tab.fmt == 2) {
      if (tab.fmt == 2) {
        var cDefOffset = bin.readUshort(data, offset);
        offset += 2;
        tab.cDef = Typr._lctf.readClassDef(data, offset0 + cDefOffset);
        tab.scset = [];
        var subClassSetCount = bin.readUshort(data, offset);
        offset += 2;
        for (var i = 0; i < subClassSetCount; i++) {
          var scsOff = bin.readUshort(data, offset);
          offset += 2;
          tab.scset.push(scsOff == 0 ? null : Typr.GSUB.readSubClassSet(data, offset0 + scsOff));
        }
      }
    } else if (ltype == 6 && tab.fmt == 3) {
      if (tab.fmt == 3) {
        for (var i = 0; i < 3; i++) {
          var cnt = bin.readUshort(data, offset);
          offset += 2;
          var cvgs = [];
          for (var j = 0; j < cnt; j++)
            cvgs.push(Typr._lctf.readCoverage(data, offset0 + bin.readUshort(data, offset + j * 2)));
          offset += cnt * 2;
          if (i == 0)
            tab.backCvg = cvgs;
          if (i == 1)
            tab.inptCvg = cvgs;
          if (i == 2)
            tab.ahedCvg = cvgs;
        }
        var cnt = bin.readUshort(data, offset);
        offset += 2;
        tab.lookupRec = Typr.GSUB.readSubstLookupRecords(data, offset, cnt);
      }
    } else if (ltype == 7 && tab.fmt == 1) {
      var extType = bin.readUshort(data, offset);
      offset += 2;
      var extOffset = bin.readUint(data, offset);
      offset += 4;
      if (ltable.ltype == 9) {
        ltable.ltype = extType;
      } else if (ltable.ltype != extType) {
        throw "invalid extension substitution";
      }
      return Typr.GSUB.subt(data, ltable.ltype, offset0 + extOffset);
    } else
      console.warn("unsupported GSUB table LookupType", ltype, "format", tab.fmt);
    return tab;
  };
  Typr.GSUB.readSubClassSet = function(data, offset) {
    var rUs = Typr._bin.readUshort, offset0 = offset, lset = [];
    var cnt = rUs(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = rUs(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readSubClassRule(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readSubClassRule = function(data, offset) {
    var rUs = Typr._bin.readUshort, rule = {};
    var gcount = rUs(data, offset);
    offset += 2;
    var scount = rUs(data, offset);
    offset += 2;
    rule.input = [];
    for (var i = 0; i < gcount - 1; i++) {
      rule.input.push(rUs(data, offset));
      offset += 2;
    }
    rule.substLookupRecords = Typr.GSUB.readSubstLookupRecords(data, offset, scount);
    return rule;
  };
  Typr.GSUB.readSubstLookupRecords = function(data, offset, cnt) {
    var rUs = Typr._bin.readUshort;
    var out = [];
    for (var i = 0; i < cnt; i++) {
      out.push(rUs(data, offset), rUs(data, offset + 2));
      offset += 4;
    }
    return out;
  };
  Typr.GSUB.readChainSubClassSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [];
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < cnt; i++) {
      var loff = bin.readUshort(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readChainSubClassRule(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readChainSubClassRule = function(data, offset) {
    var bin = Typr._bin, rule = {};
    var pps = ["backtrack", "input", "lookahead"];
    for (var pi = 0; pi < pps.length; pi++) {
      var cnt = bin.readUshort(data, offset);
      offset += 2;
      if (pi == 1)
        cnt--;
      rule[pps[pi]] = bin.readUshorts(data, offset, cnt);
      offset += rule[pps[pi]].length * 2;
    }
    var cnt = bin.readUshort(data, offset);
    offset += 2;
    rule.subst = bin.readUshorts(data, offset, cnt * 2);
    offset += rule.subst.length * 2;
    return rule;
  };
  Typr.GSUB.readLigatureSet = function(data, offset) {
    var bin = Typr._bin, offset0 = offset, lset = [];
    var lcnt = bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < lcnt; j++) {
      var loff = bin.readUshort(data, offset);
      offset += 2;
      lset.push(Typr.GSUB.readLigature(data, offset0 + loff));
    }
    return lset;
  };
  Typr.GSUB.readLigature = function(data, offset) {
    var bin = Typr._bin, lig = { chain: [] };
    lig.nglyph = bin.readUshort(data, offset);
    offset += 2;
    var ccnt = bin.readUshort(data, offset);
    offset += 2;
    for (var k = 0; k < ccnt - 1; k++) {
      lig.chain.push(bin.readUshort(data, offset));
      offset += 2;
    }
    return lig;
  };
  Typr.head = {};
  Typr.head.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readFixed(data, offset);
    offset += 4;
    obj.fontRevision = bin.readFixed(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    obj.flags = bin.readUshort(data, offset);
    offset += 2;
    obj.unitsPerEm = bin.readUshort(data, offset);
    offset += 2;
    obj.created = bin.readUint64(data, offset);
    offset += 8;
    obj.modified = bin.readUint64(data, offset);
    offset += 8;
    obj.xMin = bin.readShort(data, offset);
    offset += 2;
    obj.yMin = bin.readShort(data, offset);
    offset += 2;
    obj.xMax = bin.readShort(data, offset);
    offset += 2;
    obj.yMax = bin.readShort(data, offset);
    offset += 2;
    obj.macStyle = bin.readUshort(data, offset);
    offset += 2;
    obj.lowestRecPPEM = bin.readUshort(data, offset);
    offset += 2;
    obj.fontDirectionHint = bin.readShort(data, offset);
    offset += 2;
    obj.indexToLocFormat = bin.readShort(data, offset);
    offset += 2;
    obj.glyphDataFormat = bin.readShort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.hhea = {};
  Typr.hhea.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readFixed(data, offset);
    offset += 4;
    obj.ascender = bin.readShort(data, offset);
    offset += 2;
    obj.descender = bin.readShort(data, offset);
    offset += 2;
    obj.lineGap = bin.readShort(data, offset);
    offset += 2;
    obj.advanceWidthMax = bin.readUshort(data, offset);
    offset += 2;
    obj.minLeftSideBearing = bin.readShort(data, offset);
    offset += 2;
    obj.minRightSideBearing = bin.readShort(data, offset);
    offset += 2;
    obj.xMaxExtent = bin.readShort(data, offset);
    offset += 2;
    obj.caretSlopeRise = bin.readShort(data, offset);
    offset += 2;
    obj.caretSlopeRun = bin.readShort(data, offset);
    offset += 2;
    obj.caretOffset = bin.readShort(data, offset);
    offset += 2;
    offset += 4 * 2;
    obj.metricDataFormat = bin.readShort(data, offset);
    offset += 2;
    obj.numberOfHMetrics = bin.readUshort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.hmtx = {};
  Typr.hmtx.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var obj = {};
    obj.aWidth = [];
    obj.lsBearing = [];
    var aw = 0, lsb = 0;
    for (var i = 0; i < font.maxp.numGlyphs; i++) {
      if (i < font.hhea.numberOfHMetrics) {
        aw = bin.readUshort(data, offset);
        offset += 2;
        lsb = bin.readShort(data, offset);
        offset += 2;
      }
      obj.aWidth.push(aw);
      obj.lsBearing.push(lsb);
    }
    return obj;
  };
  Typr.kern = {};
  Typr.kern.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var version = bin.readUshort(data, offset);
    offset += 2;
    if (version == 1)
      return Typr.kern.parseV1(data, offset - 2, length, font);
    var nTables = bin.readUshort(data, offset);
    offset += 2;
    var map2 = { glyph1: [], rval: [] };
    for (var i = 0; i < nTables; i++) {
      offset += 2;
      var length = bin.readUshort(data, offset);
      offset += 2;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      format &= 15;
      if (format == 0)
        offset = Typr.kern.readFormat0(data, offset, map2);
      else
        throw "unknown kern table format: " + format;
    }
    return map2;
  };
  Typr.kern.parseV1 = function(data, offset, length, font) {
    var bin = Typr._bin;
    bin.readFixed(data, offset);
    offset += 4;
    var nTables = bin.readUint(data, offset);
    offset += 4;
    var map2 = { glyph1: [], rval: [] };
    for (var i = 0; i < nTables; i++) {
      bin.readUint(data, offset);
      offset += 4;
      var coverage = bin.readUshort(data, offset);
      offset += 2;
      bin.readUshort(data, offset);
      offset += 2;
      var format = coverage >>> 8;
      format &= 15;
      if (format == 0)
        offset = Typr.kern.readFormat0(data, offset, map2);
      else
        throw "unknown kern table format: " + format;
    }
    return map2;
  };
  Typr.kern.readFormat0 = function(data, offset, map2) {
    var bin = Typr._bin;
    var pleft = -1;
    var nPairs = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    for (var j = 0; j < nPairs; j++) {
      var left = bin.readUshort(data, offset);
      offset += 2;
      var right = bin.readUshort(data, offset);
      offset += 2;
      var value = bin.readShort(data, offset);
      offset += 2;
      if (left != pleft) {
        map2.glyph1.push(left);
        map2.rval.push({ glyph2: [], vals: [] });
      }
      var rval = map2.rval[map2.rval.length - 1];
      rval.glyph2.push(right);
      rval.vals.push(value);
      pleft = left;
    }
    return offset;
  };
  Typr.loca = {};
  Typr.loca.parse = function(data, offset, length, font) {
    var bin = Typr._bin;
    var obj = [];
    var ver = font.head.indexToLocFormat;
    var len = font.maxp.numGlyphs + 1;
    if (ver == 0)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUshort(data, offset + (i << 1)) << 1);
    if (ver == 1)
      for (var i = 0; i < len; i++)
        obj.push(bin.readUint(data, offset + (i << 2)));
    return obj;
  };
  Typr.maxp = {};
  Typr.maxp.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    var ver = bin.readUint(data, offset);
    offset += 4;
    obj.numGlyphs = bin.readUshort(data, offset);
    offset += 2;
    if (ver == 65536) {
      obj.maxPoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxContours = bin.readUshort(data, offset);
      offset += 2;
      obj.maxCompositePoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxCompositeContours = bin.readUshort(data, offset);
      offset += 2;
      obj.maxZones = bin.readUshort(data, offset);
      offset += 2;
      obj.maxTwilightPoints = bin.readUshort(data, offset);
      offset += 2;
      obj.maxStorage = bin.readUshort(data, offset);
      offset += 2;
      obj.maxFunctionDefs = bin.readUshort(data, offset);
      offset += 2;
      obj.maxInstructionDefs = bin.readUshort(data, offset);
      offset += 2;
      obj.maxStackElements = bin.readUshort(data, offset);
      offset += 2;
      obj.maxSizeOfInstructions = bin.readUshort(data, offset);
      offset += 2;
      obj.maxComponentElements = bin.readUshort(data, offset);
      offset += 2;
      obj.maxComponentDepth = bin.readUshort(data, offset);
      offset += 2;
    }
    return obj;
  };
  Typr.name = {};
  Typr.name.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    bin.readUshort(data, offset);
    offset += 2;
    var count = bin.readUshort(data, offset);
    offset += 2;
    bin.readUshort(data, offset);
    offset += 2;
    var names = [
      "copyright",
      "fontFamily",
      "fontSubfamily",
      "ID",
      "fullName",
      "version",
      "postScriptName",
      "trademark",
      "manufacturer",
      "designer",
      "description",
      "urlVendor",
      "urlDesigner",
      "licence",
      "licenceURL",
      "---",
      "typoFamilyName",
      "typoSubfamilyName",
      "compatibleFull",
      "sampleText",
      "postScriptCID",
      "wwsFamilyName",
      "wwsSubfamilyName",
      "lightPalette",
      "darkPalette"
    ];
    var offset0 = offset;
    for (var i = 0; i < count; i++) {
      var platformID = bin.readUshort(data, offset);
      offset += 2;
      var encodingID = bin.readUshort(data, offset);
      offset += 2;
      var languageID = bin.readUshort(data, offset);
      offset += 2;
      var nameID = bin.readUshort(data, offset);
      offset += 2;
      var slen = bin.readUshort(data, offset);
      offset += 2;
      var noffset = bin.readUshort(data, offset);
      offset += 2;
      var cname = names[nameID];
      var soff = offset0 + count * 12 + noffset;
      var str;
      if (platformID == 0)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (platformID == 3 && encodingID == 0)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (encodingID == 0)
        str = bin.readASCII(data, soff, slen);
      else if (encodingID == 1)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (encodingID == 3)
        str = bin.readUnicode(data, soff, slen / 2);
      else if (platformID == 1) {
        str = bin.readASCII(data, soff, slen);
        console.warn("reading unknown MAC encoding " + encodingID + " as ASCII");
      } else
        throw "unknown encoding " + encodingID + ", platformID: " + platformID;
      var tid = "p" + platformID + "," + languageID.toString(16);
      if (obj[tid] == null)
        obj[tid] = {};
      obj[tid][cname !== void 0 ? cname : nameID] = str;
      obj[tid]._lang = languageID;
    }
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 1033)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 0)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null && obj[p]._lang == 3084)
        return obj[p];
    for (var p in obj)
      if (obj[p].postScriptName != null)
        return obj[p];
    var tname;
    for (var p in obj) {
      tname = p;
      break;
    }
    console.warn("returning name table with languageID " + obj[tname]._lang);
    return obj[tname];
  };
  Typr["OS/2"] = {};
  Typr["OS/2"].parse = function(data, offset, length) {
    var bin = Typr._bin;
    var ver = bin.readUshort(data, offset);
    offset += 2;
    var obj = {};
    if (ver == 0)
      Typr["OS/2"].version0(data, offset, obj);
    else if (ver == 1)
      Typr["OS/2"].version1(data, offset, obj);
    else if (ver == 2 || ver == 3 || ver == 4)
      Typr["OS/2"].version2(data, offset, obj);
    else if (ver == 5)
      Typr["OS/2"].version5(data, offset, obj);
    else
      throw "unknown OS/2 table version: " + ver;
    return obj;
  };
  Typr["OS/2"].version0 = function(data, offset, obj) {
    var bin = Typr._bin;
    obj.xAvgCharWidth = bin.readShort(data, offset);
    offset += 2;
    obj.usWeightClass = bin.readUshort(data, offset);
    offset += 2;
    obj.usWidthClass = bin.readUshort(data, offset);
    offset += 2;
    obj.fsType = bin.readUshort(data, offset);
    offset += 2;
    obj.ySubscriptXSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptYSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptXOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySubscriptYOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptXSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptYSize = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptXOffset = bin.readShort(data, offset);
    offset += 2;
    obj.ySuperscriptYOffset = bin.readShort(data, offset);
    offset += 2;
    obj.yStrikeoutSize = bin.readShort(data, offset);
    offset += 2;
    obj.yStrikeoutPosition = bin.readShort(data, offset);
    offset += 2;
    obj.sFamilyClass = bin.readShort(data, offset);
    offset += 2;
    obj.panose = bin.readBytes(data, offset, 10);
    offset += 10;
    obj.ulUnicodeRange1 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange2 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange3 = bin.readUint(data, offset);
    offset += 4;
    obj.ulUnicodeRange4 = bin.readUint(data, offset);
    offset += 4;
    obj.achVendID = [bin.readInt8(data, offset), bin.readInt8(data, offset + 1), bin.readInt8(data, offset + 2), bin.readInt8(data, offset + 3)];
    offset += 4;
    obj.fsSelection = bin.readUshort(data, offset);
    offset += 2;
    obj.usFirstCharIndex = bin.readUshort(data, offset);
    offset += 2;
    obj.usLastCharIndex = bin.readUshort(data, offset);
    offset += 2;
    obj.sTypoAscender = bin.readShort(data, offset);
    offset += 2;
    obj.sTypoDescender = bin.readShort(data, offset);
    offset += 2;
    obj.sTypoLineGap = bin.readShort(data, offset);
    offset += 2;
    obj.usWinAscent = bin.readUshort(data, offset);
    offset += 2;
    obj.usWinDescent = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr["OS/2"].version1 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version0(data, offset, obj);
    obj.ulCodePageRange1 = bin.readUint(data, offset);
    offset += 4;
    obj.ulCodePageRange2 = bin.readUint(data, offset);
    offset += 4;
    return offset;
  };
  Typr["OS/2"].version2 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version1(data, offset, obj);
    obj.sxHeight = bin.readShort(data, offset);
    offset += 2;
    obj.sCapHeight = bin.readShort(data, offset);
    offset += 2;
    obj.usDefault = bin.readUshort(data, offset);
    offset += 2;
    obj.usBreak = bin.readUshort(data, offset);
    offset += 2;
    obj.usMaxContext = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr["OS/2"].version5 = function(data, offset, obj) {
    var bin = Typr._bin;
    offset = Typr["OS/2"].version2(data, offset, obj);
    obj.usLowerOpticalPointSize = bin.readUshort(data, offset);
    offset += 2;
    obj.usUpperOpticalPointSize = bin.readUshort(data, offset);
    offset += 2;
    return offset;
  };
  Typr.post = {};
  Typr.post.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = {};
    obj.version = bin.readFixed(data, offset);
    offset += 4;
    obj.italicAngle = bin.readFixed(data, offset);
    offset += 4;
    obj.underlinePosition = bin.readShort(data, offset);
    offset += 2;
    obj.underlineThickness = bin.readShort(data, offset);
    offset += 2;
    return obj;
  };
  Typr.SVG = {};
  Typr.SVG.parse = function(data, offset, length) {
    var bin = Typr._bin;
    var obj = { entries: [] };
    var offset0 = offset;
    bin.readUshort(data, offset);
    offset += 2;
    var svgDocIndexOffset = bin.readUint(data, offset);
    offset += 4;
    bin.readUint(data, offset);
    offset += 4;
    offset = svgDocIndexOffset + offset0;
    var numEntries = bin.readUshort(data, offset);
    offset += 2;
    for (var i = 0; i < numEntries; i++) {
      var startGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var endGlyphID = bin.readUshort(data, offset);
      offset += 2;
      var svgDocOffset = bin.readUint(data, offset);
      offset += 4;
      var svgDocLength = bin.readUint(data, offset);
      offset += 4;
      var sbuf = new Uint8Array(data.buffer, offset0 + svgDocOffset + svgDocIndexOffset, svgDocLength);
      var svg = bin.readUTF8(sbuf, 0, sbuf.length);
      for (var f = startGlyphID; f <= endGlyphID; f++) {
        obj.entries[f] = svg;
      }
    }
    return obj;
  };
  Typr.SVG.toPath = function(str) {
    var pth = { cmds: [], crds: [] };
    if (str == null)
      return pth;
    var prsr = new DOMParser();
    var doc = prsr["parseFromString"](str, "image/svg+xml");
    var svg = doc.firstChild;
    while (svg.tagName != "svg")
      svg = svg.nextSibling;
    var vb = svg.getAttribute("viewBox");
    if (vb)
      vb = vb.trim().split(" ").map(parseFloat);
    else
      vb = [0, 0, 1e3, 1e3];
    Typr.SVG._toPath(svg.children, pth);
    for (var i = 0; i < pth.crds.length; i += 2) {
      var x = pth.crds[i], y = pth.crds[i + 1];
      x -= vb[0];
      y -= vb[1];
      y = -y;
      pth.crds[i] = x;
      pth.crds[i + 1] = y;
    }
    return pth;
  };
  Typr.SVG._toPath = function(nds, pth, fill) {
    for (var ni = 0; ni < nds.length; ni++) {
      var nd = nds[ni], tn = nd.tagName;
      var cfl = nd.getAttribute("fill");
      if (cfl == null)
        cfl = fill;
      if (tn == "g")
        Typr.SVG._toPath(nd.children, pth, cfl);
      else if (tn == "path") {
        pth.cmds.push(cfl ? cfl : "#000000");
        var d = nd.getAttribute("d");
        var toks = Typr.SVG._tokens(d);
        Typr.SVG._toksToPath(toks, pth);
        pth.cmds.push("X");
      } else if (tn == "defs")
        ;
      else
        console.warn(tn, nd);
    }
  };
  Typr.SVG._tokens = function(d) {
    var ts = [], off = 0, rn = false, cn = "";
    while (off < d.length) {
      var cc = d.charCodeAt(off), ch = d.charAt(off);
      off++;
      var isNum = 48 <= cc && cc <= 57 || ch == "." || ch == "-";
      if (rn) {
        if (ch == "-") {
          ts.push(parseFloat(cn));
          cn = ch;
        } else if (isNum)
          cn += ch;
        else {
          ts.push(parseFloat(cn));
          if (ch != "," && ch != " ")
            ts.push(ch);
          rn = false;
        }
      } else {
        if (isNum) {
          cn = ch;
          rn = true;
        } else if (ch != "," && ch != " ")
          ts.push(ch);
      }
    }
    if (rn)
      ts.push(parseFloat(cn));
    return ts;
  };
  Typr.SVG._toksToPath = function(ts, pth) {
    var i = 0, x = 0, y = 0, ox = 0, oy = 0;
    var pc = { "M": 2, "L": 2, "H": 1, "V": 1, "S": 4, "C": 6 };
    var cmds = pth.cmds, crds = pth.crds;
    while (i < ts.length) {
      var cmd = ts[i];
      i++;
      if (cmd == "z") {
        cmds.push("Z");
        x = ox;
        y = oy;
      } else {
        var cmu = cmd.toUpperCase();
        var ps = pc[cmu], reps = Typr.SVG._reps(ts, i, ps);
        for (var j = 0; j < reps; j++) {
          var xi = 0, yi = 0;
          if (cmd != cmu) {
            xi = x;
            yi = y;
          }
          if (cmu == "M") {
            x = xi + ts[i++];
            y = yi + ts[i++];
            cmds.push("M");
            crds.push(x, y);
            ox = x;
            oy = y;
          } else if (cmu == "L") {
            x = xi + ts[i++];
            y = yi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "H") {
            x = xi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "V") {
            y = yi + ts[i++];
            cmds.push("L");
            crds.push(x, y);
          } else if (cmu == "C") {
            var x1 = xi + ts[i++], y1 = yi + ts[i++], x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C");
            crds.push(x1, y1, x2, y2, x3, y3);
            x = x3;
            y = y3;
          } else if (cmu == "S") {
            var co = Math.max(crds.length - 4, 0);
            var x1 = x + x - crds[co], y1 = y + y - crds[co + 1];
            var x2 = xi + ts[i++], y2 = yi + ts[i++], x3 = xi + ts[i++], y3 = yi + ts[i++];
            cmds.push("C");
            crds.push(x1, y1, x2, y2, x3, y3);
            x = x3;
            y = y3;
          } else
            console.warn("Unknown SVG command " + cmd);
        }
      }
    }
  };
  Typr.SVG._reps = function(ts, off, ps) {
    var i = off;
    while (i < ts.length) {
      if (typeof ts[i] == "string")
        break;
      i += ps;
    }
    return (i - off) / ps;
  };
  if (Typr == null)
    Typr = {};
  if (Typr.U == null)
    Typr.U = {};
  Typr.U.codeToGlyph = function(font, code) {
    var cmap = font.cmap;
    var tind = -1;
    if (cmap.p0e4 != null)
      tind = cmap.p0e4;
    else if (cmap.p3e1 != null)
      tind = cmap.p3e1;
    else if (cmap.p1e0 != null)
      tind = cmap.p1e0;
    else if (cmap.p0e3 != null)
      tind = cmap.p0e3;
    if (tind == -1)
      throw "no familiar platform and encoding!";
    var tab = cmap.tables[tind];
    if (tab.format == 0) {
      if (code >= tab.map.length)
        return 0;
      return tab.map[code];
    } else if (tab.format == 4) {
      var sind = -1;
      for (var i = 0; i < tab.endCount.length; i++) {
        if (code <= tab.endCount[i]) {
          sind = i;
          break;
        }
      }
      if (sind == -1)
        return 0;
      if (tab.startCount[sind] > code)
        return 0;
      var gli = 0;
      if (tab.idRangeOffset[sind] != 0) {
        gli = tab.glyphIdArray[code - tab.startCount[sind] + (tab.idRangeOffset[sind] >> 1) - (tab.idRangeOffset.length - sind)];
      } else {
        gli = code + tab.idDelta[sind];
      }
      return gli & 65535;
    } else if (tab.format == 12) {
      if (code > tab.groups[tab.groups.length - 1][1])
        return 0;
      for (var i = 0; i < tab.groups.length; i++) {
        var grp = tab.groups[i];
        if (grp[0] <= code && code <= grp[1])
          return grp[2] + (code - grp[0]);
      }
      return 0;
    } else {
      throw "unknown cmap table format " + tab.format;
    }
  };
  Typr.U.glyphToPath = function(font, gid) {
    var path = { cmds: [], crds: [] };
    if (font.SVG && font.SVG.entries[gid]) {
      var p = font.SVG.entries[gid];
      if (p == null)
        return path;
      if (typeof p == "string") {
        p = Typr.SVG.toPath(p);
        font.SVG.entries[gid] = p;
      }
      return p;
    } else if (font.CFF) {
      var state = { x: 0, y: 0, stack: [], nStems: 0, haveWidth: false, width: font.CFF.Private ? font.CFF.Private.defaultWidthX : 0, open: false };
      var cff = font.CFF, pdct = font.CFF.Private;
      if (cff.ROS) {
        var gi = 0;
        while (cff.FDSelect[gi + 2] <= gid)
          gi += 2;
        pdct = cff.FDArray[cff.FDSelect[gi + 1]].Private;
      }
      Typr.U._drawCFF(font.CFF.CharStrings[gid], state, cff, pdct, path);
    } else if (font.glyf) {
      Typr.U._drawGlyf(gid, font, path);
    }
    return path;
  };
  Typr.U._drawGlyf = function(gid, font, path) {
    var gl = font.glyf[gid];
    if (gl == null)
      gl = font.glyf[gid] = Typr.glyf._parseGlyf(font, gid);
    if (gl != null) {
      if (gl.noc > -1) {
        Typr.U._simpleGlyph(gl, path);
      } else {
        Typr.U._compoGlyph(gl, font, path);
      }
    }
  };
  Typr.U._simpleGlyph = function(gl, p) {
    for (var c = 0; c < gl.noc; c++) {
      var i0 = c == 0 ? 0 : gl.endPts[c - 1] + 1;
      var il = gl.endPts[c];
      for (var i = i0; i <= il; i++) {
        var pr = i == i0 ? il : i - 1;
        var nx = i == il ? i0 : i + 1;
        var onCurve = gl.flags[i] & 1;
        var prOnCurve = gl.flags[pr] & 1;
        var nxOnCurve = gl.flags[nx] & 1;
        var x = gl.xs[i], y = gl.ys[i];
        if (i == i0) {
          if (onCurve) {
            if (prOnCurve) {
              Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
            } else {
              Typr.U.P.moveTo(p, x, y);
              continue;
            }
          } else {
            if (prOnCurve) {
              Typr.U.P.moveTo(p, gl.xs[pr], gl.ys[pr]);
            } else {
              Typr.U.P.moveTo(p, (gl.xs[pr] + x) / 2, (gl.ys[pr] + y) / 2);
            }
          }
        }
        if (onCurve) {
          if (prOnCurve)
            Typr.U.P.lineTo(p, x, y);
        } else {
          if (nxOnCurve) {
            Typr.U.P.qcurveTo(p, x, y, gl.xs[nx], gl.ys[nx]);
          } else {
            Typr.U.P.qcurveTo(p, x, y, (x + gl.xs[nx]) / 2, (y + gl.ys[nx]) / 2);
          }
        }
      }
      Typr.U.P.closePath(p);
    }
  };
  Typr.U._compoGlyph = function(gl, font, p) {
    for (var j = 0; j < gl.parts.length; j++) {
      var path = { cmds: [], crds: [] };
      var prt = gl.parts[j];
      Typr.U._drawGlyf(prt.glyphIndex, font, path);
      var m = prt.m;
      for (var i = 0; i < path.crds.length; i += 2) {
        var x = path.crds[i], y = path.crds[i + 1];
        p.crds.push(x * m.a + y * m.b + m.tx);
        p.crds.push(x * m.c + y * m.d + m.ty);
      }
      for (var i = 0; i < path.cmds.length; i++) {
        p.cmds.push(path.cmds[i]);
      }
    }
  };
  Typr.U._getGlyphClass = function(g, cd) {
    var intr = Typr._lctf.getInterval(cd, g);
    return intr == -1 ? 0 : cd[intr + 2];
  };
  Typr.U.getPairAdjustment = function(font, g1, g2) {
    var hasGPOSkern = false;
    if (font.GPOS) {
      var gpos = font["GPOS"];
      var llist = gpos.lookupList, flist = gpos.featureList;
      var tused = [];
      for (var i = 0; i < flist.length; i++) {
        var fl = flist[i];
        if (fl.tag != "kern")
          continue;
        hasGPOSkern = true;
        for (var ti = 0; ti < fl.tab.length; ti++) {
          if (tused[fl.tab[ti]])
            continue;
          tused[fl.tab[ti]] = true;
          var tab = llist[fl.tab[ti]];
          for (var j = 0; j < tab.tabs.length; j++) {
            if (tab.tabs[j] == null)
              continue;
            var ltab = tab.tabs[j], ind;
            if (ltab.coverage) {
              ind = Typr._lctf.coverageIndex(ltab.coverage, g1);
              if (ind == -1)
                continue;
            }
            if (tab.ltype == 1)
              ;
            else if (tab.ltype == 2) {
              var adj = null;
              if (ltab.fmt == 1) {
                var right = ltab.pairsets[ind];
                for (var i = 0; i < right.length; i++) {
                  if (right[i].gid2 == g2)
                    adj = right[i];
                }
              } else if (ltab.fmt == 2) {
                var c1 = Typr.U._getGlyphClass(g1, ltab.classDef1);
                var c2 = Typr.U._getGlyphClass(g2, ltab.classDef2);
                adj = ltab.matrix[c1][c2];
              }
              if (adj) {
                var offset = 0;
                if (adj.val1 && adj.val1[2])
                  offset += adj.val1[2];
                if (adj.val2 && adj.val2[0])
                  offset += adj.val2[0];
                return offset;
              }
            }
          }
        }
      }
    }
    if (font.kern && !hasGPOSkern) {
      var ind1 = font.kern.glyph1.indexOf(g1);
      if (ind1 != -1) {
        var ind2 = font.kern.rval[ind1].glyph2.indexOf(g2);
        if (ind2 != -1)
          return font.kern.rval[ind1].vals[ind2];
      }
    }
    return 0;
  };
  Typr.U.stringToGlyphs = function(font, str) {
    var gls = [];
    for (var i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      if (cc > 65535)
        i++;
      gls.push(Typr.U.codeToGlyph(font, cc));
    }
    for (var i = 0; i < str.length; i++) {
      var cc = str.codePointAt(i);
      if (cc == 2367) {
        var t = gls[i - 1];
        gls[i - 1] = gls[i];
        gls[i] = t;
      }
      if (cc > 65535)
        i++;
    }
    var gsub = font["GSUB"];
    if (gsub == null)
      return gls;
    var llist = gsub.lookupList, flist = gsub.featureList;
    var cligs = [
      "rlig",
      "liga",
      "mset",
      "isol",
      "init",
      "fina",
      "medi",
      "half",
      "pres",
      "blws"
      /* Tibetan fonts like Himalaya.ttf */
    ];
    var tused = [];
    for (var fi = 0; fi < flist.length; fi++) {
      var fl = flist[fi];
      if (cligs.indexOf(fl.tag) == -1)
        continue;
      for (var ti = 0; ti < fl.tab.length; ti++) {
        if (tused[fl.tab[ti]])
          continue;
        tused[fl.tab[ti]] = true;
        var tab = llist[fl.tab[ti]];
        for (var ci = 0; ci < gls.length; ci++) {
          var feat = Typr.U._getWPfeature(str, ci);
          if ("isol,init,fina,medi".indexOf(fl.tag) != -1 && fl.tag != feat)
            continue;
          Typr.U._applySubs(gls, ci, tab, llist);
        }
      }
    }
    return gls;
  };
  Typr.U._getWPfeature = function(str, ci) {
    var wsep = '\n	" ,.:;!?()  ،';
    var R = "آأؤإاةدذرزوٱٲٳٵٶٷڈډڊڋڌڍڎڏڐڑڒړڔڕږڗژڙۀۃۄۅۆۇۈۉۊۋۍۏےۓەۮۯܐܕܖܗܘܙܞܨܪܬܯݍݙݚݛݫݬݱݳݴݸݹࡀࡆࡇࡉࡔࡧࡩࡪࢪࢫࢬࢮࢱࢲࢹૅેૉ૊૎૏ૐ૑૒૝ૡ૤૯஁ஃ஄அஉ஌எஏ஑னப஫஬";
    var L = "ꡲ્૗";
    var slft = ci == 0 || wsep.indexOf(str[ci - 1]) != -1;
    var srgt = ci == str.length - 1 || wsep.indexOf(str[ci + 1]) != -1;
    if (!slft && R.indexOf(str[ci - 1]) != -1)
      slft = true;
    if (!srgt && R.indexOf(str[ci]) != -1)
      srgt = true;
    if (!srgt && L.indexOf(str[ci + 1]) != -1)
      srgt = true;
    if (!slft && L.indexOf(str[ci]) != -1)
      slft = true;
    var feat = null;
    if (slft) {
      feat = srgt ? "isol" : "init";
    } else {
      feat = srgt ? "fina" : "medi";
    }
    return feat;
  };
  Typr.U._applySubs = function(gls, ci, tab, llist) {
    var rlim = gls.length - ci - 1;
    for (var j = 0; j < tab.tabs.length; j++) {
      if (tab.tabs[j] == null)
        continue;
      var ltab = tab.tabs[j], ind;
      if (ltab.coverage) {
        ind = Typr._lctf.coverageIndex(ltab.coverage, gls[ci]);
        if (ind == -1)
          continue;
      }
      if (tab.ltype == 1) {
        gls[ci];
        if (ltab.fmt == 1)
          gls[ci] = gls[ci] + ltab.delta;
        else
          gls[ci] = ltab.newg[ind];
      } else if (tab.ltype == 4) {
        var vals = ltab.vals[ind];
        for (var k = 0; k < vals.length; k++) {
          var lig = vals[k], rl = lig.chain.length;
          if (rl > rlim)
            continue;
          var good = true, em1 = 0;
          for (var l = 0; l < rl; l++) {
            while (gls[ci + em1 + (1 + l)] == -1)
              em1++;
            if (lig.chain[l] != gls[ci + em1 + (1 + l)])
              good = false;
          }
          if (!good)
            continue;
          gls[ci] = lig.nglyph;
          for (var l = 0; l < rl + em1; l++)
            gls[ci + l + 1] = -1;
          break;
        }
      } else if (tab.ltype == 5 && ltab.fmt == 2) {
        var cind = Typr._lctf.getInterval(ltab.cDef, gls[ci]);
        var cls = ltab.cDef[cind + 2], scs = ltab.scset[cls];
        for (var i = 0; i < scs.length; i++) {
          var sc = scs[i], inp = sc.input;
          if (inp.length > rlim)
            continue;
          var good = true;
          for (var l = 0; l < inp.length; l++) {
            var cind2 = Typr._lctf.getInterval(ltab.cDef, gls[ci + 1 + l]);
            if (cind == -1 && ltab.cDef[cind2 + 2] != inp[l]) {
              good = false;
              break;
            }
          }
          if (!good)
            continue;
          var lrs = sc.substLookupRecords;
          for (var k = 0; k < lrs.length; k += 2) {
            lrs[k];
            lrs[k + 1];
          }
        }
      } else if (tab.ltype == 6 && ltab.fmt == 3) {
        if (!Typr.U._glsCovered(gls, ltab.backCvg, ci - ltab.backCvg.length))
          continue;
        if (!Typr.U._glsCovered(gls, ltab.inptCvg, ci))
          continue;
        if (!Typr.U._glsCovered(gls, ltab.ahedCvg, ci + ltab.inptCvg.length))
          continue;
        var lr = ltab.lookupRec;
        for (var i = 0; i < lr.length; i += 2) {
          var cind = lr[i], tab2 = llist[lr[i + 1]];
          Typr.U._applySubs(gls, ci + cind, tab2, llist);
        }
      }
    }
  };
  Typr.U._glsCovered = function(gls, cvgs, ci) {
    for (var i = 0; i < cvgs.length; i++) {
      var ind = Typr._lctf.coverageIndex(cvgs[i], gls[ci + i]);
      if (ind == -1)
        return false;
    }
    return true;
  };
  Typr.U.glyphsToPath = function(font, gls, clr) {
    var tpath = { cmds: [], crds: [] };
    var x = 0;
    for (var i = 0; i < gls.length; i++) {
      var gid = gls[i];
      if (gid == -1)
        continue;
      var gid2 = i < gls.length - 1 && gls[i + 1] != -1 ? gls[i + 1] : 0;
      var path = Typr.U.glyphToPath(font, gid);
      for (var j = 0; j < path.crds.length; j += 2) {
        tpath.crds.push(path.crds[j] + x);
        tpath.crds.push(path.crds[j + 1]);
      }
      if (clr)
        tpath.cmds.push(clr);
      for (var j = 0; j < path.cmds.length; j++)
        tpath.cmds.push(path.cmds[j]);
      if (clr)
        tpath.cmds.push("X");
      x += font.hmtx.aWidth[gid];
      if (i < gls.length - 1)
        x += Typr.U.getPairAdjustment(font, gid, gid2);
    }
    return tpath;
  };
  Typr.U.pathToSVG = function(path, prec) {
    if (prec == null)
      prec = 5;
    var out = [], co = 0, lmap = { "M": 2, "L": 2, "Q": 4, "C": 6 };
    for (var i = 0; i < path.cmds.length; i++) {
      var cmd = path.cmds[i], cn = co + (lmap[cmd] ? lmap[cmd] : 0);
      out.push(cmd);
      while (co < cn) {
        var c = path.crds[co++];
        out.push(parseFloat(c.toFixed(prec)) + (co == cn ? "" : " "));
      }
    }
    return out.join("");
  };
  Typr.U.pathToContext = function(path, ctx) {
    var c = 0, crds = path.crds;
    for (var j = 0; j < path.cmds.length; j++) {
      var cmd = path.cmds[j];
      if (cmd == "M") {
        ctx.moveTo(crds[c], crds[c + 1]);
        c += 2;
      } else if (cmd == "L") {
        ctx.lineTo(crds[c], crds[c + 1]);
        c += 2;
      } else if (cmd == "C") {
        ctx.bezierCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3], crds[c + 4], crds[c + 5]);
        c += 6;
      } else if (cmd == "Q") {
        ctx.quadraticCurveTo(crds[c], crds[c + 1], crds[c + 2], crds[c + 3]);
        c += 4;
      } else if (cmd.charAt(0) == "#") {
        ctx.beginPath();
        ctx.fillStyle = cmd;
      } else if (cmd == "Z") {
        ctx.closePath();
      } else if (cmd == "X") {
        ctx.fill();
      }
    }
  };
  Typr.U.P = {};
  Typr.U.P.moveTo = function(p, x, y) {
    p.cmds.push("M");
    p.crds.push(x, y);
  };
  Typr.U.P.lineTo = function(p, x, y) {
    p.cmds.push("L");
    p.crds.push(x, y);
  };
  Typr.U.P.curveTo = function(p, a, b, c, d, e, f) {
    p.cmds.push("C");
    p.crds.push(a, b, c, d, e, f);
  };
  Typr.U.P.qcurveTo = function(p, a, b, c, d) {
    p.cmds.push("Q");
    p.crds.push(a, b, c, d);
  };
  Typr.U.P.closePath = function(p) {
    p.cmds.push("Z");
  };
  Typr.U._drawCFF = function(cmds, state, font, pdct, p) {
    var stack = state.stack;
    var nStems = state.nStems, haveWidth = state.haveWidth, width = state.width, open = state.open;
    var i = 0;
    var x = state.x, y = state.y, c1x = 0, c1y = 0, c2x = 0, c2y = 0, c3x = 0, c3y = 0, c4x = 0, c4y = 0, jpx = 0, jpy = 0;
    var o = { val: 0, size: 0 };
    while (i < cmds.length) {
      Typr.CFF.getCharString(cmds, i, o);
      var v = o.val;
      i += o.size;
      if (v == "o1" || v == "o18") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
      } else if (v == "o3" || v == "o23") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
      } else if (v == "o4") {
        if (stack.length > 1 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        if (open)
          Typr.U.P.closePath(p);
        y += stack.pop();
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o5") {
        while (stack.length > 0) {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o6" || v == "o7") {
        var count = stack.length;
        var isX = v == "o6";
        for (var j = 0; j < count; j++) {
          var sval = stack.shift();
          if (isX) {
            x += sval;
          } else {
            y += sval;
          }
          isX = !isX;
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o8" || v == "o24") {
        var count = stack.length;
        var index = 0;
        while (index + 6 <= count) {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          index += 6;
        }
        if (v == "o24") {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
      } else if (v == "o11") {
        break;
      } else if (v == "o1234" || v == "o1235" || v == "o1236" || v == "o1237") {
        if (v == "o1234") {
          c1x = x + stack.shift();
          c1y = y;
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y;
          c3x = jpx + stack.shift();
          c3y = c2y;
          c4x = c3x + stack.shift();
          c4y = y;
          x = c4x + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1235") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y + stack.shift();
          c3x = jpx + stack.shift();
          c3y = jpy + stack.shift();
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          x = c4x + stack.shift();
          y = c4y + stack.shift();
          stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1236") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y;
          c3x = jpx + stack.shift();
          c3y = c2y;
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          x = c4x + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
        if (v == "o1237") {
          c1x = x + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          jpx = c2x + stack.shift();
          jpy = c2y + stack.shift();
          c3x = jpx + stack.shift();
          c3y = jpy + stack.shift();
          c4x = c3x + stack.shift();
          c4y = c3y + stack.shift();
          if (Math.abs(c4x - x) > Math.abs(c4y - y)) {
            x = c4x + stack.shift();
          } else {
            y = c4y + stack.shift();
          }
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, jpx, jpy);
          Typr.U.P.curveTo(p, c3x, c3y, c4x, c4y, x, y);
        }
      } else if (v == "o14") {
        if (stack.length > 0 && !haveWidth) {
          width = stack.shift() + font.nominalWidthX;
          haveWidth = true;
        }
        if (stack.length == 4) {
          var adx = stack.shift();
          var ady = stack.shift();
          var bchar = stack.shift();
          var achar = stack.shift();
          var bind2 = Typr.CFF.glyphBySE(font, bchar);
          var aind = Typr.CFF.glyphBySE(font, achar);
          Typr.U._drawCFF(font.CharStrings[bind2], state, font, pdct, p);
          state.x = adx;
          state.y = ady;
          Typr.U._drawCFF(font.CharStrings[aind], state, font, pdct, p);
        }
        if (open) {
          Typr.U.P.closePath(p);
          open = false;
        }
      } else if (v == "o19" || v == "o20") {
        var hasWidthArg;
        hasWidthArg = stack.length % 2 !== 0;
        if (hasWidthArg && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
        }
        nStems += stack.length >> 1;
        stack.length = 0;
        haveWidth = true;
        i += nStems + 7 >> 3;
      } else if (v == "o21") {
        if (stack.length > 2 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        y += stack.pop();
        x += stack.pop();
        if (open)
          Typr.U.P.closePath(p);
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o22") {
        if (stack.length > 1 && !haveWidth) {
          width = stack.shift() + pdct.nominalWidthX;
          haveWidth = true;
        }
        x += stack.pop();
        if (open)
          Typr.U.P.closePath(p);
        Typr.U.P.moveTo(p, x, y);
        open = true;
      } else if (v == "o25") {
        while (stack.length > 6) {
          x += stack.shift();
          y += stack.shift();
          Typr.U.P.lineTo(p, x, y);
        }
        c1x = x + stack.shift();
        c1y = y + stack.shift();
        c2x = c1x + stack.shift();
        c2y = c1y + stack.shift();
        x = c2x + stack.shift();
        y = c2y + stack.shift();
        Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
      } else if (v == "o26") {
        if (stack.length % 2) {
          x += stack.shift();
        }
        while (stack.length > 0) {
          c1x = x;
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x;
          y = c2y + stack.shift();
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        }
      } else if (v == "o27") {
        if (stack.length % 2) {
          y += stack.shift();
        }
        while (stack.length > 0) {
          c1x = x + stack.shift();
          c1y = y;
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x = c2x + stack.shift();
          y = c2y;
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
        }
      } else if (v == "o10" || v == "o29") {
        var obj = v == "o10" ? pdct : font;
        if (stack.length == 0) {
          console.warn("error: empty stack");
        } else {
          var ind = stack.pop();
          var subr = obj.Subrs[ind + obj.Bias];
          state.x = x;
          state.y = y;
          state.nStems = nStems;
          state.haveWidth = haveWidth;
          state.width = width;
          state.open = open;
          Typr.U._drawCFF(subr, state, font, pdct, p);
          x = state.x;
          y = state.y;
          nStems = state.nStems;
          haveWidth = state.haveWidth;
          width = state.width;
          open = state.open;
        }
      } else if (v == "o30" || v == "o31") {
        var count, count1 = stack.length;
        var index = 0;
        var alternate = v == "o31";
        count = count1 & ~2;
        index += count1 - count;
        while (index < count) {
          if (alternate) {
            c1x = x + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            if (count - index == 5) {
              x = c2x + stack.shift();
              index++;
            } else {
              x = c2x;
            }
            alternate = false;
          } else {
            c1x = x;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x = c2x + stack.shift();
            if (count - index == 5) {
              y = c2y + stack.shift();
              index++;
            } else {
              y = c2y;
            }
            alternate = true;
          }
          Typr.U.P.curveTo(p, c1x, c1y, c2x, c2y, x, y);
          index += 4;
        }
      } else if ((v + "").charAt(0) == "o") {
        console.warn("Unknown operation: " + v, cmds);
        throw v;
      } else
        stack.push(v);
    }
    state.x = x;
    state.y = y;
    state.nStems = nStems;
    state.haveWidth = haveWidth;
    state.width = width;
    state.open = open;
  };
  Typr$1.Typr = Typr;
  var Font_1 = void 0;
  var Typr_js_1 = Typr$1;
  var friendlyTags = { "aalt": "Access All Alternates", "abvf": "Above-base Forms", "abvm": "Above - base Mark Positioning", "abvs": "Above - base Substitutions", "afrc": "Alternative Fractions", "akhn": "Akhands", "blwf": "Below - base Forms", "blwm": "Below - base Mark Positioning", "blws": "Below - base Substitutions", "calt": "Contextual Alternates", "case": "Case - Sensitive Forms", "ccmp": "Glyph Composition / Decomposition", "cfar": "Conjunct Form After Ro", "cjct": "Conjunct Forms", "clig": "Contextual Ligatures", "cpct": "Centered CJK Punctuation", "cpsp": "Capital Spacing", "cswh": "Contextual Swash", "curs": "Cursive Positioning", "c2pc": "Petite Capitals From Capitals", "c2sc": "Small Capitals From Capitals", "dist": "Distances", "dlig": "Discretionary Ligatures", "dnom": "Denominators", "dtls": "Dotless Forms", "expt": "Expert Forms", "falt": "Final Glyph on Line Alternates", "fin2": "Terminal Forms #2", "fin3": "Terminal Forms #3", "fina": "Terminal Forms", "flac": "Flattened accent forms", "frac": "Fractions", "fwid": "Full Widths", "half": "Half Forms", "haln": "Halant Forms", "halt": "Alternate Half Widths", "hist": "Historical Forms", "hkna": "Horizontal Kana Alternates", "hlig": "Historical Ligatures", "hngl": "Hangul", "hojo": "Hojo Kanji Forms(JIS X 0212 - 1990 Kanji Forms)", "hwid": "Half Widths", "init": "Initial Forms", "isol": "Isolated Forms", "ital": "Italics", "jalt": "Justification Alternates", "jp78": "JIS78 Forms", "jp83": "JIS83 Forms", "jp90": "JIS90 Forms", "jp04": "JIS2004 Forms", "kern": "Kerning", "lfbd": "Left Bounds", "liga": "Standard Ligatures", "ljmo": "Leading Jamo Forms", "lnum": "Lining Figures", "locl": "Localized Forms", "ltra": "Left - to - right alternates", "ltrm": "Left - to - right mirrored forms", "mark": "Mark Positioning", "med2": "Medial Forms #2", "medi": "Medial Forms", "mgrk": "Mathematical Greek", "mkmk": "Mark to Mark Positioning", "mset": "Mark Positioning via Substitution", "nalt": "Alternate Annotation Forms", "nlck": "NLC Kanji Forms", "nukt": "Nukta Forms", "numr": "Numerators", "onum": "Oldstyle Figures", "opbd": "Optical Bounds", "ordn": "Ordinals", "ornm": "Ornaments", "palt": "Proportional Alternate Widths", "pcap": "Petite Capitals", "pkna": "Proportional Kana", "pnum": "Proportional Figures", "pref": "Pre - Base Forms", "pres": "Pre - base Substitutions", "pstf": "Post - base Forms", "psts": "Post - base Substitutions", "pwid": "Proportional Widths", "qwid": "Quarter Widths", "rand": "Randomize", "rclt": "Required Contextual Alternates", "rkrf": "Rakar Forms", "rlig": "Required Ligatures", "rphf": "Reph Forms", "rtbd": "Right Bounds", "rtla": "Right - to - left alternates", "rtlm": "Right - to - left mirrored forms", "ruby": "Ruby Notation Forms", "rvrn": "Required Variation Alternates", "salt": "Stylistic Alternates", "sinf": "Scientific Inferiors", "size": "Optical size", "smcp": "Small Capitals", "smpl": "Simplified Forms", "ssty": "Math script style alternates", "stch": "Stretching Glyph Decomposition", "subs": "Subscript", "sups": "Superscript", "swsh": "Swash", "titl": "Titling", "tjmo": "Trailing Jamo Forms", "tnam": "Traditional Name Forms", "tnum": "Tabular Figures", "trad": "Traditional Forms", "twid": "Third Widths", "unic": "Unicase", "valt": "Alternate Vertical Metrics", "vatu": "Vattu Variants", "vert": "Vertical Writing", "vhal": "Alternate Vertical Half Metrics", "vjmo": "Vowel Jamo Forms", "vkna": "Vertical Kana Alternates", "vkrn": "Vertical Kerning", "vpal": "Proportional Alternate Vertical Metrics", "vrt2": "Vertical Alternates and Rotation", "vrtr": "Vertical Alternates for Rotation", "zero": "Slashed Zero" };
  var Font = (
    /** @class */
    function() {
      function Font2(data) {
        var obj = Typr_js_1.Typr.parse(data);
        if (!obj.length || typeof obj[0] !== "object" || typeof obj[0].hasOwnProperty !== "function") {
          throw "unable to parse font";
        }
        for (var n in obj[0]) {
          this[n] = obj[0][n];
        }
        this.enabledGSUB = {};
      }
      Font2.prototype.getFamilyName = function() {
        return this.name && (this.name.typoFamilyName || this.name.fontFamily) || "";
      };
      Font2.prototype.getSubFamilyName = function() {
        return this.name && (this.name.typoSubfamilyName || this.name.fontSubfamily) || "";
      };
      Font2.prototype.glyphToPath = function(gid) {
        return Typr_js_1.Typr.U.glyphToPath(this, gid);
      };
      Font2.prototype.getPairAdjustment = function(gid1, gid2) {
        return Typr_js_1.Typr.U.getPairAdjustment(this, gid1, gid2);
      };
      Font2.prototype.stringToGlyphs = function(str) {
        return Typr_js_1.Typr.U.stringToGlyphs(this, str);
      };
      Font2.prototype.glyphsToPath = function(gls) {
        return Typr_js_1.Typr.U.glyphsToPath(this, gls);
      };
      Font2.prototype.pathToSVG = function(path, prec) {
        return Typr_js_1.Typr.U.pathToSVG(path, prec);
      };
      Font2.prototype.pathToContext = function(path, ctx) {
        return Typr_js_1.Typr.U.pathToContext(path, ctx);
      };
      Font2.prototype.lookupFriendlyName = function(table, feature) {
        if (this[table] !== void 0) {
          var tbl = this[table];
          var feat = tbl.featureList[feature];
          return this.featureFriendlyName(feat);
        }
        return "";
      };
      Font2.prototype.featureFriendlyName = function(feature) {
        if (friendlyTags[feature.tag]) {
          return friendlyTags[feature.tag];
        }
        if (feature.tag.match(/ss[0-2][0-9]/)) {
          var name_1 = "Stylistic Set " + Number(feature.tag.substr(2, 2)).toString();
          if (feature.featureParams) {
            var version = Typr_js_1.Typr._bin.readUshort(this._data, feature.featureParams);
            if (version === 0) {
              var nameID = Typr_js_1.Typr._bin.readUshort(this._data, feature.featureParams + 2);
              if (this.name && this.name[nameID] !== void 0) {
                return name_1 + " - " + this.name[nameID];
              }
            }
          }
          return name_1;
        }
        if (feature.tag.match(/cv[0-9][0-9]/)) {
          return "Character Variant " + Number(feature.tag.substr(2, 2)).toString();
        }
        return "";
      };
      Font2.prototype.enableGSUB = function(featureNumber) {
        if (this.GSUB) {
          var feature = this.GSUB.featureList[featureNumber];
          if (feature) {
            for (var i = 0; i < feature.tab.length; ++i) {
              this.enabledGSUB[feature.tab[i]] = (this.enabledGSUB[feature.tab[i]] || 0) + 1;
            }
          }
        }
      };
      Font2.prototype.disableGSUB = function(featureNumber) {
        if (this.GSUB) {
          var feature = this.GSUB.featureList[featureNumber];
          if (feature) {
            for (var i = 0; i < feature.tab.length; ++i) {
              if (this.enabledGSUB[feature.tab[i]] > 1) {
                --this.enabledGSUB[feature.tab[i]];
              } else {
                delete this.enabledGSUB[feature.tab[i]];
              }
            }
          }
        }
      };
      Font2.prototype.codeToGlyph = function(code) {
        var g = Typr_js_1.Typr.U.codeToGlyph(this, code);
        if (this.GSUB) {
          var gls = [g];
          for (var n in this.enabledGSUB) {
            var l = this.GSUB.lookupList[n];
            Typr_js_1.Typr.U._applySubs(gls, 0, l, this.GSUB.lookupList);
          }
          if (gls.length === 1)
            return gls[0];
        }
        return g;
      };
      return Font2;
    }()
  );
  Font_1 = Font;
  function decrypt(iframeDocument) {
    var _a, _b, _c;
    const styles = iframeDocument.querySelectorAll("style");
    let tip;
    for (let i = 0; i < styles.length; i++) {
      if ((_a = styles[i].textContent) == null ? void 0 : _a.includes("font-cxsecret")) {
        tip = styles[i];
        break;
      }
    }
    if (!tip)
      return;
    const fontData = (_c = (_b = tip.textContent) == null ? void 0 : _b.match(/base64,([\w\W]+?)'/)) == null ? void 0 : _c[1];
    if (!fontData)
      return;
    const fontArray = base64ToUint8Array(fontData);
    const font = new Font_1(fontArray);
    const table = JSON.parse(_GM_getResourceText("ttf"));
    const match = {};
    for (let i = 19968; i < 40870; i++) {
      const glyph = font.codeToGlyph(i);
      if (!glyph)
        continue;
      const path = font.glyphToPath(glyph);
      const hash = md5(JSON.stringify(path)).slice(24);
      match[i] = table[hash];
    }
    const elements = iframeDocument.querySelectorAll(".font-cxsecret");
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      let html = el.innerHTML;
      for (const key in match) {
        const value = String.fromCharCode(match[key]);
        const regExp = new RegExp(String.fromCharCode(Number(key)), "g");
        html = html.replace(regExp, value);
      }
      el.innerHTML = html;
      el.classList.remove("font-cxsecret");
    }
    function base64ToUint8Array(base64) {
      const data = window.atob(base64);
      const buffer = new Uint8Array(data.length);
      for (let i = 0; i < data.length; ++i) {
        buffer[i] = data.charCodeAt(i);
      }
      return buffer;
    }
  }
  class BaseQuestionHandler {
    constructor() {
      __publicField(this, "_document", document);
      __publicField(this, "_window", _unsafeWindow);
      __publicField(this, "addLog");
      __publicField(this, "addQuestion");
      __publicField(this, "questions", []);
      __publicField(this, "correctNum", 0);
      __publicField(this, "parseHtml", () => {
        throw new Error("请使用继承类的重写方法");
      });
      __publicField(this, "fillQuestion", (question) => {
        throw new Error("请使用继承类的重写方法");
      });
      __publicField(this, "removeHtml", (html) => {
        if (html == null) {
          return "";
        }
        return html.replace(/<((?!img|sub|sup|br)[^>]+)>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/<br\s*\/?>/g, "\n").replace(/<img.*?src="(.*?)".*?>/g, '<img src="$1"/>').trim();
      });
      __publicField(this, "clean", (str) => {
        return str.replace(/^【.*?】\s*/, "").replace(/\s*（\d+\.\d+分）$/, "");
      });
      __publicField(this, "findMatchedOption", (options, answer) => {
        const normalizedAnswer = this.normalizeOptionMatchText(answer);
        if (!normalizedAnswer)
          return null;
        let bestElement = null;
        let bestScore = -1;
        for (const [optionText, optionElement] of Object.entries(options)) {
          const score = this.calculateTextSimilarity(
            this.normalizeOptionMatchText(optionText),
            normalizedAnswer
          );
          if (score > bestScore) {
            bestElement = optionElement;
            bestScore = score;
          }
        }
        if (!bestElement)
          return null;
        return bestScore >= this.getAnswerSimilarityThreshold() ? bestElement : null;
      });
      __publicField(this, "inferQuestionTypeByStructure", (questionElement, optionElements, optionTexts) => {
        if (this.hasFillBlankControl(questionElement))
          return "2";
        if (this.hasLongTextControl(questionElement) && optionElements.length === 0)
          return "4";
        if (this.hasCheckboxControl(questionElement, optionElements))
          return "1";
        if (this.isJudgementQuestion(questionElement, optionElements, optionTexts))
          return "3";
        if (this.hasRadioControl(questionElement, optionElements))
          return "0";
        if (optionElements.length > 0)
          return "0";
        return "999";
      });
      __publicField(this, "hasFillBlankControl", (questionElement) => {
        const textInputs = Array.from(questionElement.querySelectorAll("input")).filter((input) => {
          const type = (input.getAttribute("type") || "text").toLowerCase();
          return ["", "text", "search", "number", "tel", "url", "email"].includes(type) && !input.disabled && !input.hidden;
        });
        const textareas = questionElement.querySelectorAll("textarea");
        const editableElements = questionElement.querySelectorAll('[contenteditable="true"]');
        const hasBlankCue = Array.from(questionElement.querySelectorAll("[class], [name], [placeholder]")).some((element) => [
          element.getAttribute("class"),
          element.getAttribute("name"),
          element.getAttribute("placeholder")
        ].filter(Boolean).join(" ").toLowerCase().includes("blank") || (element.getAttribute("placeholder") || "").includes("填"));
        return textInputs.length > 0 || editableElements.length > 0 || textareas.length > 1 || hasBlankCue;
      });
      __publicField(this, "hasLongTextControl", (questionElement) => {
        return questionElement.querySelectorAll("textarea").length > 0;
      });
      __publicField(this, "hasCheckboxControl", (questionElement, optionElements) => {
        if (questionElement.querySelector('input[type="checkbox"]'))
          return true;
        return optionElements.some((optionElement) => this.hasControlCue(optionElement, ["checkbox", "multi", "multiple"]));
      });
      __publicField(this, "hasRadioControl", (questionElement, optionElements) => {
        if (questionElement.querySelector('input[type="radio"]'))
          return true;
        return optionElements.some((optionElement) => this.hasControlCue(optionElement, ["radio"]));
      });
      __publicField(this, "hasControlCue", (optionElement, cues) => {
        var _a, _b;
        const cueText = [
          optionElement.getAttribute("role"),
          optionElement.getAttribute("type"),
          optionElement.getAttribute("class"),
          (_a = optionElement.querySelector("input")) == null ? void 0 : _a.getAttribute("type"),
          (_b = optionElement.querySelector("[role]")) == null ? void 0 : _b.getAttribute("role")
        ].filter(Boolean).join(" ").toLowerCase();
        return cues.some((cue) => cueText.includes(cue));
      });
      __publicField(this, "isJudgementQuestion", (questionElement, optionElements, optionTexts) => {
        if (optionTexts.length !== 2)
          return false;
        const judgementValues = optionTexts.map((optionText) => this.normalizeJudgementText(optionText));
        return judgementValues.includes("true") && judgementValues.includes("false") && this.hasJudgementStructureCue(questionElement, optionElements);
      });
      __publicField(this, "hasJudgementStructureCue", (questionElement, optionElements) => {
        const cueText = [
          this.collectElementCueText(questionElement),
          ...optionElements.map((optionElement) => this.collectElementCueText(optionElement))
        ].join(" ").toLowerCase();
        const judgementCues = [
          "judge",
          "judgement",
          "judgment",
          "truefalse",
          "true-false",
          "true_false",
          "判断",
          "对错"
        ];
        if (judgementCues.some((cue) => cueText.includes(cue)))
          return true;
        const optionAriaLabels = optionElements.map((optionElement) => {
          var _a;
          return [
            optionElement.getAttribute("aria-label"),
            (_a = optionElement.querySelector("[aria-label]")) == null ? void 0 : _a.getAttribute("aria-label")
          ].filter(Boolean).join(" ");
        }).join(" ");
        return optionAriaLabels.includes("对选择") && optionAriaLabels.includes("错选择");
      });
      __publicField(this, "collectElementCueText", (element) => {
        const cueAttributes = [
          "aria-label",
          "class",
          "data",
          "data-qtype",
          "data-question-type",
          "data-type",
          "name",
          "role",
          "type",
          "value"
        ];
        const cueElements = [
          element,
          ...Array.from(element.querySelectorAll(
            cueAttributes.map((attribute) => `[${attribute}]`).join(",")
          ))
        ];
        return cueElements.flatMap((cueElement) => cueAttributes.map((attribute) => cueElement.getAttribute(attribute) || "")).filter(Boolean).join(" ");
      });
      __publicField(this, "getAnswerSimilarityThreshold", () => {
        const configStore = useConfigStore();
        const thresholdParam = configStore.otherParams.params.find((param) => param.name.includes("相似"));
        const threshold = Number((thresholdParam == null ? void 0 : thresholdParam.value) ?? 85);
        if (!Number.isFinite(threshold))
          return 85;
        return Math.min(100, Math.max(0, threshold));
      });
      __publicField(this, "normalizeOptionMatchText", (text) => {
        return this.clean(this.removeHtml(text)).replace(/<img\s+src=["']?([^"'>\s]+).*?>/gi, "$1").replace(/&[a-z]+;/gi, "").replace(/^[a-z]\s*[.．、:：)\]]\s*/i, "").replace(/[\s\u00a0]+/g, "").replace(/[,.，。、;；:："'“”‘’!?！？()[\]{}【】<>《》]/g, "").toLowerCase();
      });
      __publicField(this, "calculateTextSimilarity", (left, right) => {
        if (!left || !right)
          return 0;
        if (left === right)
          return 100;
        const leftChars = Array.from(left);
        const rightChars = Array.from(right);
        const distance = this.getLevenshteinDistance(leftChars, rightChars);
        const maxLength = Math.max(leftChars.length, rightChars.length);
        return Math.round((1 - distance / maxLength) * 100);
      });
      __publicField(this, "getLevenshteinDistance", (left, right) => {
        const distances = Array.from({ length: left.length + 1 }, (_, index) => index);
        right.forEach((rightChar, rightIndex) => {
          let previous = distances[0];
          distances[0] = rightIndex + 1;
          left.forEach((leftChar, leftIndex) => {
            const current = distances[leftIndex + 1];
            distances[leftIndex + 1] = leftChar === rightChar ? previous : Math.min(previous, distances[leftIndex], current) + 1;
            previous = current;
          });
        });
        return distances[left.length];
      });
      __publicField(this, "normalizeJudgementText", (optionText) => {
        const text = this.clean(optionText).replace(/[.．、:：\s]/g, "").toLowerCase();
        if (/^(a)?(正确|是|对|√|t|true|right)$/.test(text))
          return "true";
        if (/^(b)?(错误|否|错|×|x|f|false|wrong)$/.test(text))
          return "false";
        return "";
      });
      const logStore = useLogStore();
      const questionStore = useQuestionStore();
      this.addLog = logStore.addLog;
      this.addQuestion = questionStore.addQuestion;
    }
  }
  // 最近一次解析题目的处理器：面板上的「重写答案」按钮用它把已拿到的答案再写一遍页面
  let activeCxHandler = null;
  class CxQuestionHandler extends BaseQuestionHandler {    constructor(type, iframe) {
      super();
      __publicField(this, "type");
      __publicField(this, "init", async () => {
        this.questions = [];
        this.correctNum = 0;
        this.parseHtml();
        if (this.questions.length) {
          this.addLog(`成功解析到${this.questions.length}个题目`, "primary");
          for (const [index, question] of this.questions.entries()) {
            const answerData = await getAnswer(question);
            if (answerData.code === 200) {
              question.answer = answerData.data.answer;
              this.fillQuestion(question);
              this.addLog(`第${index + 1}道题${isAiAnswerData(answerData) ? "AI 作答成功" : "搜索成功"}`, "success");
              this.addLog(isAiAnswerData(answerData) ? `AI 答案：${escapeHtml(question.answer.join(" ｜ "))}${answerData.data.usageText ? `　[${escapeHtml(answerData.data.usageText)}]` : ""}` : `剩余次数:${answerData.data.num}`, "primary");
              this.correctNum += 1;
            } else {
              this.addLog(`第${index + 1}道题答题失败，<a class="log-action-link" href="#" data-log-action="show-answer-tab">点击查看原因</a>`, "danger");
              question.answer[0] = answerData.msg;
              question.failed = true;
            }
            this.addQuestion(question);
          }
        } else
          this.addLog("未解析到题目，请进入正确页面", "danger");
        return this.questions.length ? this.correctNum / this.questions.length * 100 : 0;
      });
      __publicField(this, "parseHtml", () => {
        if (!this._document)
          return [];
        if (["zj"].includes(this.type)) {
          const questionElements = this._document.querySelectorAll(".TiMu");
          // 新版“泛雅”答题页（fanyaMarking）整个试卷就是一个 .TiMu，真正的题目是里面的 .questionLi；
          // 这种页面如果按 .TiMu 当题目，会把整张试卷当成一道题，所以这里拆一层。
          let nested = [];
          if (questionElements.length === 1 && typeof questionElements[0].querySelectorAll === "function")
            nested = questionElements[0].querySelectorAll(".questionLi");
          if (nested && nested.length)
            this.addQuestions(nested);
          else
            this.addQuestions(questionElements);
        } else if (["zy", "ks"].includes(this.type)) {
          const questionElements = this._document.querySelectorAll(".questionLi");
          this.addQuestions(questionElements);
        }
      });
      // 选项当前是否处于“已选中”状态（兼容 aria / checked / 打勾标记 / class 等多种写法）
      __publicField(this, "isOptionSelected", (optionElement) => {
        if (!optionElement)
          return false;
        try {
          if (optionElement.getAttribute && optionElement.getAttribute("aria-checked") === "true")
            return true;
          if (typeof optionElement.querySelector === "function") {
            if (optionElement.querySelector("input:checked"))
              return true;
            if (optionElement.querySelector(".check_answer, .check_answer_dx, .check_answer_dx2"))
              return true;
          }
          const className = String(optionElement.className || "");
          if (/(^|\s)(active|checked|selected|is-checked|cur)(\s|$)/.test(className))
            return true;
        } catch (error) {
        }
        return false;
      });
      __publicField(this, "clickOptionElement", (optionElement) => {
        if (!optionElement)
          return;
        try {
          optionElement.click();
        } catch (error) {
        }
      });
      // 选中一个选项：页面已保存旧答案 / 题目被锁定时会失败并给出提示（不再默默跳过）
      __publicField(this, "selectChoiceOption", (optionElement, label) => {
        if (!optionElement)
          return false;
        if (this.isOptionSelected(optionElement))
          return true;
        this.clickOptionElement(optionElement);
        if (this.isOptionSelected(optionElement))
          return true;
        // 有些页面的点击落在外层 <a>/<div> 上，真正的 input 藏在里面：再直接点里面的 input
        try {
          const inner = typeof optionElement.querySelector === "function" ? optionElement.querySelector("input") : null;
          if (inner) {
            if (typeof inner.click === "function")
              inner.click();
            if (!inner.checked && "checked" in inner) {
              inner.checked = true;
              if (typeof inner.dispatchEvent === "function") {
                inner.dispatchEvent(new Event("input", { bubbles: true }));
                inner.dispatchEvent(new Event("change", { bubbles: true }));
              }
            }
          }
        } catch (error) {
        }
        if (this.isOptionSelected(optionElement))
          return true;
        this.addLog(`覆盖失败：${label} 点了没反应，这题很可能已被页面锁定（系统保存了旧答案），需要先在页面上点“修改/重做”再重试`, "danger");
        return false;
      });
      // 写入一个空：setContent 之后必须 sync + contentchange，否则超星自己的答题状态还是旧答案
      __publicField(this, "setBlankAnswer", (fieldElement, value, label) => {
        const plain = (text) => String(text == null ? "" : text).replace(/<[^>]*>/g, "").replace(/&nbsp;/gi, " ").replace(/\s+/g, "").trim();
        const tag = String(fieldElement.tagName || "").toLowerCase();
        if (tag === "textarea") {
          let editor = null;
          try {
            editor = this._window.UE.getEditor(fieldElement.name);
          } catch (error) {
            editor = null;
          }
          if (editor && typeof editor.setContent === "function" && typeof editor.getContent === "function") {
            try {
              editor.setContent(value);
              if (typeof editor.sync === "function")
                editor.sync();
              if (typeof editor.fireEvent === "function")
                editor.fireEvent("contentchange");
            } catch (error) {
            }
            try {
              fieldElement.dispatchEvent(new Event("input", { bubbles: true }));
              fieldElement.dispatchEvent(new Event("change", { bubbles: true }));
            } catch (error) {
            }
            if (plain(editor.getContent()) === plain(value) || plain(fieldElement.value) === plain(value))
              return true;
            this.addLog(`覆盖失败：${label} 编辑器内容没写进去，这题可能已被页面锁定（系统保存了旧答案）`, "danger");
            return false;
          }
        }
        if (tag === "input" || tag === "textarea")
          fieldElement.value = value;
        else
          fieldElement.textContent = value;
        try {
          fieldElement.dispatchEvent(new Event("input", { bubbles: true }));
          fieldElement.dispatchEvent(new Event("change", { bubbles: true }));
        } catch (error) {
        }
        const after = fieldElement.value !== void 0 ? String(fieldElement.value) : String(fieldElement.textContent || "");
        if (plain(after) === plain(value))
          return true;
        this.addLog(`覆盖失败：${label} 的值没能写入（页面可能已锁定该题）`, "danger");
        return false;
      });
      // 不重新问 AI，只把已经拿到的答案再写一遍页面（页面把答案顶掉 / 锁定后重试用）
      __publicField(this, "refillAll", () => {
        let done = 0;
        for (const question of this.questions) {
          // 失败的题 answer[0] 里放的是报错文案，绝不能把它写进空里
          if (question.failed || !question.answer || !question.answer.length)
            continue;
          this.fillQuestion(question);
          done += 1;
        }
        return done;
      });
      __publicField(this, "fillQuestion", (question) => {
        var _a;
        if (!this._window)
          return;
        if (question.type === "0" || question.type === "1") {
          const targets = [];
          for (const answer of question.answer) {
            const optionElement = this.findMatchedOption(question.options, answer);
            if (optionElement && targets.indexOf(optionElement) === -1)
              targets.push(optionElement);
          }
          if (!targets.length)
            return;
          // 多选题：题目里已经保存的旧选项如果不在新答案里，要先取消，否则新旧答案会混在一起
          if (question.type === "1") {
            for (const key in question.options) {
              const optionElement = question.options[key];
              if (optionElement && targets.indexOf(optionElement) === -1 && this.isOptionSelected(optionElement))
                this.clickOptionElement(optionElement);
            }
          }
          for (const answer of question.answer) {
            const optionElement = this.findMatchedOption(question.options, answer);
            if (optionElement)
              this.selectChoiceOption(optionElement, `选项「${String(answer == null ? "" : answer).slice(0, 14)}」`);
          }
        } else if (question.type === "2") {
          // 原版只填 textarea，很多网考填空（尤其综合大题）是行内 <input>，会整片漏填；
          // 这里用与“【空k】提示”完全相同的收集顺序，保证第 k 个答案填进第 k 个空。
          // 注意：空里已经有系统保存的旧答案时也照样覆盖（这是明确要求的行为）。
          const fieldElements = collectBlankFields(question.element);
          if (fieldElements.length === 0) {
            this.addLog("没找到可填写的空（可能这题已被页面锁定，或当前是查看模式）", "danger");
            return;
          }
          fieldElements.forEach((fieldElement, index) => {
            if (index >= question.answer.length)
              return;
            const value = question.answer[index] == null ? "" : question.answer[index];
            this.setBlankAnswer(fieldElement, value, `第${index + 1}空`);
          });
        } else if (question.type === "3") {
          let answer = "true";
          if (question.answer[0].match(/(^|,)(正确|是|对|√|T|ri|right|true)(,|$)/)) {
            answer = "true";
          } else if (question.answer[0].match(/(^|,)(错误|否|错|×|F|wr|wrong|false)(,|$)/)) {
            answer = "false";
          }
          const trueOrFalse = {
            "true": "对",
            "false": "错"
          };
          for (const key in question.options) {
            if (["zj", "zy"].includes(this.type)) {
              if ((_a = question.options[key].getAttribute("aria-label")) == null ? void 0 : _a.includes(`${trueOrFalse[answer]}选择`)) {
                this.selectChoiceOption(question.options[key], `判断题「${trueOrFalse[answer]}」`);
              }
            } else if (["ks"].includes(this.type)) {
              const optionElement = question.options[key].querySelector(`span[data='${answer}']`);
              if (optionElement)
                this.selectChoiceOption(optionElement, `判断题「${trueOrFalse[answer]}」`);
            }
          }
        } else if (question.type === "4" || question.type === "6") {
          const textareaElement = question.element.querySelector("textarea");
          if (!textareaElement) {
            this.addLog("没找到简答题答题框（可能这题已被页面锁定）", "danger");
            return;
          }
          this.setBlankAnswer(textareaElement, question.answer[0] == null ? "" : question.answer[0], "简答题");
        } else
          ;
      });
      this.type = type;
      if (iframe) {
        this._document = iframe.contentDocument;
        this._window = iframe.contentWindow;
      }
    }
    extractOptions(optionElements, optionSelector) {
      const optionsObject = {};
      const optionTexts = [];
      optionElements.forEach((optionElement) => {
        var _a;
        const optionTextContent = this.removeHtml(((_a = optionElement.querySelector(optionSelector)) == null ? void 0 : _a.innerHTML) || "");
        optionsObject[optionTextContent] = optionElement;
        optionTexts.push(optionTextContent);
      });
      return [optionsObject, optionTexts];
    }
    addQuestions(questionElements) {
      questionElements.forEach((questionElement) => {
        var _a, _b, _c;
        let questionTitle = "";
        let optionElements = [];
        let optionsObject = {};
        let optionTexts = [];
        if (["zy", "ks"].includes(this.type)) {
          const titleElement = ((_a = questionElement == null ? void 0 : questionElement.querySelector("h3")) == null ? void 0 : _a.innerHTML) || "";
          const colorShallowElement = ((_b = questionElement.querySelector(".colorShallow")) == null ? void 0 : _b.outerHTML) || "";
          questionTitle = this.removeHtml(titleElement.split(colorShallowElement || "")[1] || "");
          const matchedOptionElements = questionElement.querySelectorAll(".answerBg");
          optionElements = Array.from(matchedOptionElements);
          [optionsObject, optionTexts] = this.extractOptions(matchedOptionElements, ".answer_p");
        } else if (["zj"].includes(this.type)) {
          questionTitle = this.removeHtml(((_c = questionElement.querySelector(".fontLabel")) == null ? void 0 : _c.innerHTML) || "");
          const matchedOptionElements = questionElement.querySelectorAll('[class*="before-after"]');
          if (matchedOptionElements.length) {
            optionElements = Array.from(matchedOptionElements);
            [optionsObject, optionTexts] = this.extractOptions(matchedOptionElements, ".fl.after");
          } else {
            // 新版泛雅答题页的选项结构与作业页一致（.answerBg/.answer_p），旧选择器抓不到会退化成填空
            const answerBgElements = questionElement.querySelectorAll(".answerBg");
            optionElements = Array.from(answerBgElements);
            [optionsObject, optionTexts] = this.extractOptions(answerBgElements, ".answer_p");
          }
        }
        this.questions.push({
          element: questionElement,
          type: this.inferQuestionTypeByStructure(questionElement, optionElements, optionTexts),
          title: this.clean(questionTitle),
          optionsText: optionTexts,
          options: optionsObject,
          answer: [],
          workType: this.type,
          refer: this._window.location.href
        });
      });
    }
  }
  const useCxChapterLogic = () => {
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    const init = () => {
      const currentUrl = window.location.href;
      if (!currentUrl.includes("&mooc2=1")) {
        window.location.href = currentUrl + "&mooc2=1";
      }
      questionStore.clearQuestion();
      logStore.addLog(`检测到用户进入到章节学习页面`, "primary");
      logStore.addLog(`正在解析任务点，请稍等5-10秒（如果长时间没有反应，请刷新页面）`, "warning");
    };
    const configStore = useConfigStore();
    const watchedRootIframes = /* @__PURE__ */ new WeakSet();
    const runningIframeDocumentTasks = /* @__PURE__ */ new WeakMap();
    const processedIframeDocuments = /* @__PURE__ */ new WeakSet();
    const processIframeTask = () => {
      const documentElement = document.documentElement;
      const iframe = documentElement.querySelector("iframe");
      if (!iframe) {
        console.warn("No iframe found.");
        return;
      }
      watchIframe(documentElement);
      if (!watchedRootIframes.has(iframe)) {
        watchedRootIframes.add(iframe);
        iframe.addEventListener("load", function() {
          watchIframe(documentElement);
        });
      }
    };
    const setupInterceptor = () => {
      let currentUrl = window.location.href;
      setInterval(() => {
        if (currentUrl !== window.location.href) {
          currentUrl = window.location.href;
          questionStore.clearQuestion();
          processIframeTask();
        }
      }, 2e3);
    };
    let currentWatchIframeTaskId = 0;
    const watchIframe = (documentElement) => {
      const thisTaskId = ++currentWatchIframeTaskId;
      IframeUtils.getAllNestedIframes(documentElement).subscribe((allIframes) => {
        console.log(allIframes);
        rxjs.from(allIframes).pipe(concatMap((iframe) => {
          if (thisTaskId !== currentWatchIframeTaskId)
            return Promise.resolve();
          return processIframe(iframe);
        })).subscribe({
          complete: async () => {
            if (thisTaskId === currentWatchIframeTaskId) {
              logStore.addLog(`本页任务点已全部完成，正前往下一章节`, "success");
              if (configStore.platformParams.cx.parts[0].params[1].value) {
                const nextBtn = documentElement.querySelector("#prevNextFocusNext");
                if (!nextBtn || nextBtn.style.display === "none") {
                  logStore.addLog(`已经到达最后一章节，无法跳转`, "danger");
                } else {
                  await sleep(configStore.otherParams.params[0].value);
                  document.querySelector(".jb_btn.jb_btn_92.fr.fs14.nextChapter").click();
                }
              } else {
                logStore.addLog(`已经关闭自动下一章节，在设置里可更改`, "danger");
              }
            }
          }
        });
      });
    };
    const processMedia = async (mediaType, iframeDocument) => {
      return new Promise((resolve) => {
        logStore.addLog(`发现一个${mediaType}，正在解析`, "warning");
        logStore.addLog(`正在尝试播放${mediaType}，请稍等5s`, "primary");
        let isExecuted = false;
        logStore.addLog("播放成功", "success");
        const intervalId = setInterval(async () => {
          const mediaElement = iframeDocument.documentElement.querySelector(mediaType);
          if (mediaElement && !isExecuted) {
            await mediaElement.pause();
            mediaElement.muted = true;
            await mediaElement.play();
            const listener = async () => {
              await sleep(configStore.otherParams.params[0].value);
              await mediaElement.play();
            };
            mediaElement.addEventListener("pause", listener);
            mediaElement.addEventListener("ended", () => {
              logStore.addLog(`${mediaType}已播放完成`, "success");
              mediaElement.removeEventListener("pause", listener);
              resolve();
            });
            isExecuted = true;
            clearInterval(intervalId);
          }
        }, 2500);
      });
    };
    const processWork = async (iframe, iframeDocument, iframeWindow) => {
      logStore.addLog("发现一个作业，正在解析", "warning");
      return new Promise(async (resolve) => {
        if (!iframeDocument)
          return resolve();
        if (iframeDocument.documentElement.innerText.includes("已完成") || iframeDocument.documentElement.innerText.includes("待批阅")) {
          logStore.addLog("作业已经完成，跳过", "success");
          return resolve();
        }
        decrypt(iframeDocument);
        logStore.addLog(`题目列表获取成功`, "primary");
        const workHandler = new CxQuestionHandler("zj", iframe);
        activeCxHandler = workHandler;
        const correctRate = await workHandler.init();
        iframeWindow.alert = () => {
        };
        if (configStore.platformParams.cx.parts[0].params[0].value) {
          logStore.addLog("自动提交已开启，尝试提交", "primary");
          if (correctRate < Number(configStore.otherParams.params[1].value)) {
            logStore.addLog(`正确率小于${configStore.otherParams.params[1].value}%，暂存`, "danger");
            await iframeWindow.noSubmit();
          } else {
            logStore.addLog(`正确率大于${configStore.otherParams.params[1].value}%，提交`, "success");
            await iframeWindow.btnBlueSubmit();
            await sleep(configStore.otherParams.params[0].value / 2);
            await iframeWindow.submitCheckTimes();
            logStore.addLog("提交成功", "success");
          }
        } else {
          logStore.addLog("未开启自动提交，暂存", "primary");
          await iframeWindow.noSubmit();
        }
        logStore.addLog("作业已完成", "success");
        return resolve();
      });
    };
    const processPpt = async (iframeWindow) => {
      const pptWindow = iframeWindow.document.querySelector("#panView").contentWindow;
      logStore.addLog("发现一个PPT，正在解析", "warning");
      await pptWindow.scrollTo(
        {
          top: pptWindow.document.body.scrollHeight,
          behavior: "smooth"
        }
      );
      logStore.addLog("阅读完成", "success");
      return Promise.resolve();
    };
    const processBook = async (iframeWindow) => {
      logStore.addLog("发现一个电子书，正在解析", "warning");
      _unsafeWindow.top.onchangepage(iframeWindow.getFrameAttr("end"));
      logStore.addLog("阅读完成", "success");
      return Promise.resolve();
    };
    const runIframeDocumentTask = (iframeDocument, task) => {
      if (processedIframeDocuments.has(iframeDocument))
        return Promise.resolve();
      const runningTask = runningIframeDocumentTasks.get(iframeDocument);
      if (runningTask)
        return runningTask;
      const taskPromise = Promise.resolve().then(task).then(() => {
        processedIframeDocuments.add(iframeDocument);
      }).finally(() => {
        runningIframeDocumentTasks.delete(iframeDocument);
      });
      runningIframeDocumentTasks.set(iframeDocument, taskPromise);
      return taskPromise;
    };
    const waitIframeLoad = async (iframe) => {
      return new Promise((resolve) => {
        const intervalId = setInterval(async () => {
          var _a;
          if (iframe.contentDocument && ((_a = iframe.contentDocument) == null ? void 0 : _a.readyState) == "complete") {
            resolve();
            clearInterval(intervalId);
          }
        }, 500);
      });
    };
    const processIframeBody = async (iframe, iframeSrc, iframeDocument, iframeWindow) => {
      var _a, _b;
      if (iframeSrc.includes("javascript:"))
        return Promise.resolve();
      const parentClass = ((_a = iframe.parentElement) == null ? void 0 : _a.className) || "";
      if (parentClass.includes("ans-job-finished")) {
        logStore.addLog("发现一个已完成任务点", "success");
      } else {
        if (iframeSrc.includes("api/work")) {
          return processWork(iframe, iframeDocument, iframeWindow);
        }
        if (configStore.platformParams.cx.parts[0].params[2].value) {
          logStore.addLog("只答题，不做其他已开启，可在设置里调整", "primary");
        } else {
          const ansJobIcon = (_b = iframe.parentElement) == null ? void 0 : _b.querySelector(".ans-job-icon");
          if (ansJobIcon) {
            if (iframeSrc.includes("video")) {
              return processMedia("video", iframeDocument);
            } else if (iframeSrc.includes("audio")) {
              return processMedia("audio", iframeDocument);
            } else if (["ppt", "doc", "pptx", "docx", "pdf"].some((type) => iframeSrc.includes("modules/" + type))) {
              return processPpt(iframeWindow);
            } else if (["innerbook"].some((type) => iframeSrc.includes("modules/" + type))) {
              return processBook(iframeWindow);
            }
          }
        }
      }
      return Promise.resolve();
    };
    const processIframe = async (iframe) => {
      if (iframe.src.includes("javascript:"))
        return Promise.resolve();
      if (!iframe.contentDocument || !iframe.contentWindow)
        return Promise.resolve();
      await waitIframeLoad(iframe);
      const iframeSrc = iframe.src;
      const iframeDocument = iframe.contentDocument;
      const iframeWindow = iframe.contentWindow;
      if (!iframeDocument || !iframeWindow)
        return Promise.resolve();
      return runIframeDocumentTask(iframeDocument, () => processIframeBody(
        iframe,
        iframeSrc,
        iframeDocument,
        iframeWindow
      ));
    };
    init();
    processIframeTask();
    setupInterceptor();
  };
  const useCxWorkLogic = async () => {
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog(`进入新版作业页面，开始准备答题`, "primary");
    logStore.addLog(`正在解析题目, 请等待5s`, "warning");
    const workHandler = new CxQuestionHandler("zy");
    activeCxHandler = workHandler;
    await workHandler.init();
  };
  const NEXT_STEP_TEXT = "下一步";
  const isVisibleElement = (element) => {
    const style2 = window.getComputedStyle(element);
    return style2.display !== "none" && style2.visibility !== "hidden" && style2.opacity !== "0" && element.getClientRects().length > 0;
  };
  const clickNextStepButton = () => {
    const examDocument = _unsafeWindow.document || document;
    const buttons = Array.from(examDocument.querySelectorAll(".nextDiv a"));
    const nextStepButton = buttons.find((button) => {
      var _a, _b;
      return isVisibleElement(button) && (((_a = button.getAttribute("onclick")) == null ? void 0 : _a.includes("topreview")) || ((_b = button.textContent) == null ? void 0 : _b.trim()) === NEXT_STEP_TEXT);
    });
    if (!nextStepButton)
      return false;
    nextStepButton.click();
    return true;
  };
  const useCxExamLogic = async () => {
    const logStore = useLogStore();
    const configStore = useConfigStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog("进入新版考试页面，开始准备答题", "primary");
    logStore.addLog("正在解析题目，请稍等", "warning");
    const examHandler = new CxQuestionHandler("ks");
    activeCxHandler = examHandler;
    await examHandler.init();
    if (configStore.platformParams.cx.parts[1].params[0].value) {
      logStore.addLog("自动切换已开启，正在前往下一题", "success");
      await sleep(configStore.otherParams.params[0].value);
      if (clickNextStepButton()) {
        logStore.addLog("已经到最后一题，正在点击下一步", "success");
        return;
      }
      _unsafeWindow.getTheNextQuestion(1);
    } else {
      logStore.addLog("已经关闭自动切换，在设置里可更改", "danger");
    }
  };
  class ZhsQuestionHandler extends BaseQuestionHandler {
    constructor() {
      super();
      __publicField(this, "init", async () => {
        var _a, _b;
        this.questions = [];
        this.parseHtml();
        if (this.questions.length) {
          this.addLog(`成功解析到${this.questions.length}个题目`, "primary");
          for (const [index, question] of this.questions.entries()) {
            const answerData = await getAnswer(question);
            if (answerData.code === 200) {
              question.answer = answerData.data.answer;
              this.fillQuestion(question);
              this.addLog(`第${index + 1}道题${isAiAnswerData(answerData) ? "AI 作答成功" : "搜索成功"}`, "success");
              this.addLog(isAiAnswerData(answerData) ? `AI 答案：${escapeHtml(question.answer.join(" ｜ "))}${answerData.data.usageText ? `　[${escapeHtml(answerData.data.usageText)}]` : ""}` : `剩余次数:${answerData.data.num}`, "primary");
            } else {
              this.addLog(`第${index + 1}道题答题失败，<a class="log-action-link" href="#" data-log-action="show-answer-tab">点击查看原因</a>`, "danger");
              question.answer[0] = answerData.msg;
              question.failed = true;
            }
            this.addQuestion(question);
            await ((_b = (_a = this._document) == null ? void 0 : _a.querySelectorAll(".switch-btn-box > button")[1]) == null ? void 0 : _b.click());
          }
        } else
          this.addLog("未解析到题目，请刷新重试或进入答题页面", "danger");
      });
      __publicField(this, "parseHtml", () => {
        if (!this._document)
          return [];
        const questionElements = this._document.querySelectorAll(".examPaper_subject");
        this.addQuestions(questionElements);
      });
      __publicField(this, "fillQuestion", (question) => {
        if (!this._window)
          return;
        if (question.type === "单选题" || question.type === "多选题") {
          question.answer.forEach((answer) => {
            const optionElement = this.findMatchedOption(question.options, answer);
            if (optionElement)
              this.clickOptionIfNeeded(optionElement);
          });
        } else if (question.type === "判断题") {
          let answer = "true";
          if (question.answer[0].match(/(^|,)(正确|是|对|√|T|ri|right|true)(,|$)/)) {
            answer = "true";
          } else if (question.answer[0].match(/(^|,)(错误|否|错|×|F|wr|wrong|false)(,|$)/)) {
            answer = "false";
          }
          for (const key in question.options) {
            if (this.normalizeJudgementText(key) === answer) {
              this.clickOptionIfNeeded(question.options[key]);
            }
          }
        } else if (question.type === "填空题" || question.type === "简答题") {
          this.fillTextQuestion(question);
        } else
          ;
      });
    }
    extractOptions(optionElements, optionSelector) {
      const optionsObject = {};
      const optionTexts = [];
      optionElements.forEach((optionElement) => {
        var _a;
        const optionTextContent = this.removeHtml(((_a = optionElement.querySelector(optionSelector)) == null ? void 0 : _a.innerHTML) || "");
        optionsObject[optionTextContent] = optionElement;
        optionTexts.push(optionTextContent);
      });
      return [optionsObject, optionTexts];
    }
    addQuestions(questionElements) {
      questionElements.forEach((questionElement) => {
        var _a, _b, _c;
        const titleElement = questionElement == null ? void 0 : questionElement.querySelector(".subject_describe div,.smallStem_describe p");
        const questionTitle = ((_c = (_b = (_a = titleElement == null ? void 0 : titleElement.__Ivue__) == null ? void 0 : _a._data) == null ? void 0 : _b.shadowDom) == null ? void 0 : _c.textContent) || (titleElement == null ? void 0 : titleElement.textContent) || "";
        const optionElements = questionElement == null ? void 0 : questionElement.querySelectorAll(".label");
        const [optionsObject, optionTexts] = this.extractOptions(optionElements, ".node_detail");
        const questionType = this.mapQuestionType(
          this.inferQuestionTypeByStructure(questionElement, Array.from(optionElements), optionTexts)
        );
        this.questions.push({
          element: questionElement,
          type: questionType,
          title: questionTitle,
          optionsText: optionTexts,
          options: optionsObject,
          answer: [],
          workType: "zhs",
          refer: this._window.location.href
        });
      });
    }
    mapQuestionType(type) {
      const typeMap = {
        "0": "单选题",
        "1": "多选题",
        "2": "填空题",
        "3": "判断题",
        "4": "简答题",
        "999": "未知题"
      };
      return typeMap[type] || "未知题";
    }
    clickOptionIfNeeded(optionElement) {
      const input = optionElement.querySelector("input");
      const className = optionElement.getAttribute("class") || "";
      if (input == null ? void 0 : input.checked)
        return;
      if (optionElement.getAttribute("aria-checked") === "true")
        return;
      if (/\b(active|checked|selected|is-checked)\b/.test(className))
        return;
      if (optionElement.querySelector(".active, .checked, .selected, .is-checked"))
        return;
      optionElement.click();
    }
    fillTextQuestion(question) {
      const fields = [
        ...Array.from(question.element.querySelectorAll("input")),
        ...Array.from(question.element.querySelectorAll("textarea")),
        ...Array.from(question.element.querySelectorAll('[contenteditable="true"]'))
      ].filter((field) => {
        if (field instanceof HTMLInputElement) {
          const type = (field.getAttribute("type") || "text").toLowerCase();
          return ["", "text", "search", "number", "tel", "url", "email"].includes(type) && !field.disabled && !field.hidden;
        }
        return true;
      });
      fields.forEach((field, index) => {
        const answer = question.answer[index] || question.answer[0] || "";
        if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
          field.value = answer;
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
          return;
        }
        field.textContent = answer;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      });
    }
  }
  const hookError = () => {
    console.log("hookError");
    const oldset = _unsafeWindow.setInterval;
    const oldout = _unsafeWindow.setTimeout;
    _unsafeWindow.setInterval = function(...args) {
      const err = new Error();
      if (err.stack && err.stack.indexOf("checkoutNotTrustScript") !== -1) {
        return -1;
      }
      return oldset.call(this, ...args);
    };
    _unsafeWindow.setTimeout = function(...args) {
      const err = new Error();
      if (err.stack && err.stack.indexOf("checkoutNotTrustScript") !== -1) {
        return -1;
      }
      return oldout.call(this, ...args);
    };
  };
  class XMLHttpRequestInterceptor {
    constructor(urlList, callback) {
      __publicField(this, "xhr");
      __publicField(this, "originalOpen");
      __publicField(this, "originalSend");
      __publicField(this, "callback");
      this.xhr = new XMLHttpRequest();
      this.originalOpen = this.xhr.open;
      this.originalSend = this.xhr.send;
      this.callback = callback;
      this.intercept(urlList);
    }
    intercept(urlList) {
      const self = this;
      XMLHttpRequest.prototype.open = function(method, url2) {
        self.originalOpen.apply(this, [method, url2]);
        const shouldIntercept = urlList.some((urlItem) => url2.includes(urlItem));
        if (shouldIntercept) {
          self.callback(this.responseText);
        }
      };
    }
  }
  const useZhsAnswerLogic = async () => {
    hookError();
    const logStore = useLogStore();
    const questionStore = useQuestionStore();
    questionStore.clearQuestion();
    logStore.addLog(`进入答题页面，开始准备答题`, "primary");
    logStore.addLog(`正在解析题目, 请等待5s`, "warning");
    new XMLHttpRequestInterceptor(["gateway/t/v1/answer/hasAnswer"], async () => {
      await sleep(1);
      _unsafeWindow.document.getSelection = function() {
        return {
          removeAllRanges: function() {
          }
        };
      };
      _unsafeWindow.document.onselectstart = true;
      _unsafeWindow.document.oncontextmenu = true;
      _unsafeWindow.document.oncut = true;
      _unsafeWindow.document.oncopy = true;
      _unsafeWindow.document.onpaste = true;
      await new ZhsQuestionHandler().init();
      return true;
    });
  };
  const DEFAULT_CARD_WIDTH = "310px";
  const ANSWER_CARD_WIDTH = "630px";
  const ANSWER_TAB_NAME = "1";
  const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
    __name: "Index",
    emits: ["customEvent"],
    setup(__props, { emit: __emit }) {
      var _a;
      const isShow = vue.ref(false);
      const configStore = useConfigStore();
      const logStore = useLogStore();
      const questionStore = useQuestionStore();
      const emit = __emit;
      const url2 = window.location.href;
      const cardWidth = vue.computed(() => configStore.menuIndex === ANSWER_TAB_NAME ? ANSWER_CARD_WIDTH : DEFAULT_CARD_WIDTH);
      (_a = document.querySelector("li>a.experience:not([onclick])")) == null ? void 0 : _a.click();
      logStore.addLog("用户悉知：使用脚本即为完全同意用户协议", "success");
      logStore.addLog("脚本加载成功，正在解析网页", "primary");
      logStore.addLog(`AI 答题版已就绪（v${getScriptInfo().version}）｜模型：${configStore.aiConfig.model}｜思考链：${configStore.aiConfig.thinking === "off" ? "关闭（最省 token）" : configStore.aiConfig.thinking}｜联网：${!configStore.aiConfig.searchProvider || configStore.aiConfig.searchProvider === "off" ? "关闭" : configStore.aiConfig.searchProvider}｜未配置 Key 请到「答题」页填写`, "warning");
      logStore.addLog("请不要多个脚本同时使用，会有脚本冲突问题", "warning");
      logStore.addLog("如果脚本出现异常，请用谷歌、火狐等浏览器", "warning");
      const urlLogicPairs = [
        { keyword: "/mycourse/studentstudy", logic: useCxChapterLogic },
        { keyword: "/mooc2/work/dowork", logic: useCxWorkLogic },
        { keyword: "/exam-ans/exam", logic: useCxExamLogic },
        {
          keyword: "mycourse/stu?courseid",
          logic: () => {
            logStore.addLog("该页面无任务，请进入章节或答题页面使用", "error");
          }
        },
        { keyword: "/stuExamWeb.html", logic: useZhsAnswerLogic }
      ];
      const updateVisible = (visible) => {
        isShow.value = visible;
        emit("customEvent", visible);
      };
      // 手动启动：默认不再一进页面就自动跑；先显示面板 + 「开始」按钮，点一下才执行
      const started = vue.ref(false);
      const pendingPair = vue.ref(null);
      const startNow = () => {
        if (started.value || !pendingPair.value)
          return;
        started.value = true;
        logStore.addLog("已点「开始」，开始执行本页任务", "primary");
        pendingPair.value.logic();
      };
      const prepareLogic = (currentUrl) => {
        const matchedPair = urlLogicPairs.find(({ keyword }) => currentUrl.includes(keyword));
        if (!matchedPair) {
          updateVisible(false);
          return;
        }
        updateVisible(true);
        pendingPair.value = matchedPair;
        if (configStore.aiConfig && configStore.aiConfig.autoStart) {
          startNow();
          return;
        }
        logStore.addLog("已就绪：确认页面无误后点面板上的「开始」，不会自动跑", "warning");
      };
      prepareLogic(url2);
      const tabs = [
        {
          name: "0",
          label: "首页",
          component: _sfc_main$8,
          props: { logList: logStore.logList }
        },
        {
          name: ANSWER_TAB_NAME,
          label: "答题",
          component: _sfc_main$6,
          props: { questionList: questionStore.questionList }
        },
        {
          name: "2",
          label: "设置",
          component: _sfc_main$7,
          props: { globalConfig: configStore }
        },
        {
          name: "3",
          label: "教程",
          component: Tutorial
        },
        {
          name: "4",
          label: "协议",
          component: ScriptTip
        }
      ];
      return (_ctx, _cache) => {
        const _component_el_tab_pane = vue.resolveComponent("el-tab-pane");
        const _component_el_tabs = vue.resolveComponent("el-tabs");
        const _component_el_button = vue.resolveComponent("el-button");
        return vue.openBlock(), vue.createElementBlock("div", {
          style: vue.normalizeStyle({ width: cardWidth.value }),
          class: "card_content"
        }, [
          vue.createElementVNode("div", {
            class: "start-bar",
            style: vue.normalizeStyle({ display: pendingPair.value && !started.value ? "" : "none" })
          }, [
            vue.createVNode(_component_el_button, {
              type: "primary",
              size: "small",
              onClick: startNow
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("开始")
              ]),
              _: 1
            }),
            vue.createElementVNode("span", { class: "start-bar-hint" }, "点「开始」才执行；不会一进页面就自动跑")
          ]),
          vue.createVNode(_component_el_tabs, {
            modelValue: vue.unref(configStore).menuIndex,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).menuIndex = $event),
            class: "demo-tabs"
          }, {
            default: vue.withCtx(() => [
              (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabs, (tab) => {
                return vue.createVNode(_component_el_tab_pane, {
                  key: tab.name,
                  name: tab.name,
                  label: tab.label
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(tab.component), vue.mergeProps({ ref_for: true }, tab.props), null, 16))
                  ]),
                  _: 2
                }, 1032, ["name", "label"]);
              }), 64))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ], 4);
      };
    }
  });
  const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
    __name: "ZoomButtons",
    emits: ["toggleZoom"],
    setup(__props, { emit: __emit }) {
      const emit = __emit;
      const toggleZoom = (value) => {
        emit("toggleZoom", value);
      };
      return (_ctx, _cache) => {
        const _component_el_icon = vue.resolveComponent("el-icon");
        return vue.openBlock(), vue.createElementBlock("div", {
          onMousedown: _cache[2] || (_cache[2] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createVNode(_component_el_icon, {
            onClick: _cache[0] || (_cache[0] = ($event) => toggleZoom(true)),
            class: "zoom-icon",
            size: "small"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(minus_default))
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_icon, {
            onClick: _cache[1] || (_cache[1] = ($event) => toggleZoom(false)),
            class: "zoom-icon is-spaced",
            size: "small"
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(vue.unref(full_screen_default))
            ]),
            _: 1
          })
        ], 32);
      };
    }
  });
  const _hoisted_1 = { class: "overlay" };
  const _hoisted_2 = { class: "title" };
  const _hoisted_3 = { class: "minus" };
  const WINDOW_EDGE_OFFSET = 11;
  const PANEL_WIDTH = 334;
  const MINIMIZED_PANEL_HEIGHT = 35;
  const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
    __name: "layout",
    setup(__props) {
      const isShow = vue.ref(false);
      const configStore = useConfigStore();
      const currentPlatformName = vue.computed(() => configStore.platformParams[configStore.platformName].name);
      vue.watch(configStore, (newVal) => {
        persistConfig(newVal);
      }, { deep: true });
      const isDragging = vue.ref(false);
      const offsetX = vue.ref(0);
      const offsetY = vue.ref(0);
      const moveStyle = vue.ref({
        left: configStore.position.x,
        top: configStore.position.y
      });
      const handleVisibleChange = (visible) => {
        isShow.value = visible;
      };
      const startDrag = (event) => {
        isDragging.value = true;
        const header = event.currentTarget;
        offsetX.value = event.clientX - header.getBoundingClientRect().left;
        offsetY.value = event.clientY - header.getBoundingClientRect().top;
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", endDrag);
      };
      const drag = (event) => {
        if (!isDragging.value)
          return;
        const x = event.clientX - offsetX.value;
        const y = event.clientY - offsetY.value;
        const nextLeft = `${x - WINDOW_EDGE_OFFSET}px`;
        const nextTop = `${y - WINDOW_EDGE_OFFSET}px`;
        moveStyle.value = {
          left: nextLeft,
          top: nextTop
        };
        configStore.position.x = nextLeft;
        configStore.position.y = nextTop;
        if (x < 0) {
          moveStyle.value.left = "0px";
          configStore.position.x = "0px";
        }
        if (y < 0) {
          moveStyle.value.top = "0px";
          configStore.position.y = "0px";
        }
        if (x > window.innerWidth - PANEL_WIDTH) {
          const maxLeft = `${window.innerWidth - PANEL_WIDTH}px`;
          moveStyle.value.left = maxLeft;
          configStore.position.x = maxLeft;
        }
        if (y > window.innerHeight - MINIMIZED_PANEL_HEIGHT) {
          const maxTop = `${window.innerHeight - MINIMIZED_PANEL_HEIGHT}px`;
          moveStyle.value.top = maxTop;
          configStore.position.y = maxTop;
        }
      };
      const endDrag = () => {
        isDragging.value = false;
        document.removeEventListener("mousemove", drag);
        document.removeEventListener("mouseup", endDrag);
      };
      return (_ctx, _cache) => {
        const _component_el_icon = vue.resolveComponent("el-icon");
        const _component_el_tooltip = vue.resolveComponent("el-tooltip");
        const _component_el_text = vue.resolveComponent("el-text");
        const _component_el_divider = vue.resolveComponent("el-divider");
        const _component_el_card = vue.resolveComponent("el-card");
        return vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
          style: vue.normalizeStyle(moveStyle.value),
          class: "main-page"
        }, [
          vue.withDirectives(vue.createElementVNode("div", _hoisted_1, null, 512), [
            [vue.vShow, isDragging.value]
          ]),
          vue.createVNode(_component_el_card, {
            "close-on-click-modal": false,
            "lock-scroll": false,
            modal: false,
            "show-close": false,
            "modal-class": "modal"
          }, {
            header: vue.withCtx(() => [
              vue.createElementVNode("div", {
                class: "card-header",
                onMousedown: startDrag
              }, [
                vue.createElementVNode("div", _hoisted_2, [
                  vue.createElementVNode("span", null, vue.toDisplayString(currentPlatformName.value), 1),
                  vue.createVNode(_component_el_tooltip, {
                    teleported: "",
                    effect: "dark",
                    placement: "top-start",
                    content: "<span>注意事项：<br/>请尽量使用新版，不要使用旧版。<br/></span>",
                    "raw-content": ""
                  }, {
                    default: vue.withCtx(() => [
                      vue.createVNode(_component_el_icon, {
                        class: "warning-icon",
                        size: "small"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(vue.unref(warning_default))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                vue.createVNode(_sfc_main$2, {
                  onToggleZoom: _cache[0] || (_cache[0] = ($event) => vue.unref(configStore).isMinus = $event)
                })
              ], 32)
            ]),
            default: vue.withCtx(() => [
              vue.withDirectives(vue.createVNode(_sfc_main$3, { onCustomEvent: handleVisibleChange }, null, 512), [
                [vue.vShow, !vue.unref(configStore).isMinus]
              ]),
              vue.withDirectives(vue.createElementVNode("div", _hoisted_3, [
                vue.createVNode(_component_el_text, {
                  type: "info",
                  size: "small"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode("已最小化，点击上方按钮恢复")
                  ]),
                  _: 1
                }),
                vue.createVNode(_component_el_divider, {
                  class: "compact-divider",
                  "border-style": "dashed"
                })
              ], 512), [
                [vue.vShow, vue.unref(configStore).isMinus]
              ])
            ]),
            _: 1
          })
        ], 4)), [
          [vue.vShow, isShow.value]
        ]);
      };
    }
  });
  const _sfc_main = /* @__PURE__ */ vue.defineComponent({
    __name: "App",
    setup(__props) {
      const platformMatchers = [
        { keyword: "chaoxing", platformName: "cx" },
        { keyword: "zhihuishu", platformName: "zhs" }
      ];
      const configStore = useConfigStore();
      const url2 = window.location.href;
      const matchedPlatform = platformMatchers.find(({ keyword }) => url2.includes(keyword));
      if (matchedPlatform) {
        configStore.platformName = matchedPlatform.platformName;
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(_sfc_main$1);
      };
    }
  });
  const cssLoader = (e) => {
    const t = GM_getResourceText(e), o = document.createElement("style");
    return o.innerText = t, document.head.append(o), t;
  };
  cssLoader("ElementPlus");
  const layoutCss = '.main-page {\n    --app-font-family: "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";\n    --el-font-family: var(--app-font-family);\n    z-index: 100003;\n    position: fixed;\n    color: #1f2329;\n    font-family: var(--app-font-family) !important;\n    font-size: 14px;\n    line-height: 1.5715;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    text-rendering: optimizeLegibility;\n}\n\n.main-page *,\n.main-page input,\n.main-page button,\n.main-page textarea {\n    font-family: var(--app-font-family) !important;\n    letter-spacing: 0;\n}\n\n.main-page .el-card,\n.main-page .el-tabs,\n.main-page .el-text,\n.main-page .el-button,\n.main-page .el-input,\n.main-page .el-input__inner,\n.main-page .el-input-number,\n.main-page .el-table {\n    font-family: var(--app-font-family) !important;\n}\n\n.main-page .overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: 1001;\n}\n\n.main-page .el-card {\n    border: 0;\n}\n\n.main-page .card-header {\n    display: flex;\n    justify-content: space-between;\n    flex-direction: row;\n    align-items: center;\n    margin: 0;\n    padding: 0;\n    cursor: move;\n}\n\n.main-page .card-header .title {\n    font-size: 14px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-weight: 500;\n}\n\n.main-page .warning-icon {\n    margin-left: 5px;\n}\n\n.main-page .zoom-icon {\n    cursor: pointer;\n}\n\n.main-page .zoom-icon.is-spaced {\n    margin-left: 8px;\n}\n\n.main-page .minus {\n    margin: 5px 10px -10px 0;\n}\n\n.main-page .compact-divider {\n    margin: 0;\n}\n\n.main-page .demo-tabs {\n    display: initial;\n}\n\n.main-page .el-card__header {\n    background-color: #1f71e0;\n    color: white;\n    padding: 7px 10px 7px 16px;\n    margin: 0;\n}\n\n.main-page .el-card__body {\n    padding: 0 16px 20px 16px;\n}\n\n.main-page .el-tabs__nav-wrap::after {\n    height: 1px;\n}\n\n.main-page .el-tabs__active-bar {\n    background-color: #176ae5;\n}\n\n.main-page .el-tabs__item {\n    font-size: 13px;\n    height: 34px;\n}\n\n.main-page .el-tabs__item.is-top {\n    font-weight: 400;\n    color: #4e5969;\n    padding: 0 8px 0 12px;\n}\n\n.main-page .el-tabs__item.is-active {\n    font-weight: 500;\n    color: #176ae5;\n    padding: 0 8px 0 12px;\n}\n\n.main-page .script-home {\n    padding-top: 2px;\n}\n\n.main-page .announcement-board {\n    box-sizing: border-box;\n    margin: 2px 0 10px;\n    padding: 8px 10px;\n    border: 1px solid #bae0ff;\n    border-radius: 6px;\n    background-color: #e6f4ff;\n}\n\n.main-page .announcement-heading {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 4px;\n    color: #0958d9;\n    font-size: 12px;\n    font-weight: 600;\n    line-height: 20px;\n}\n\n.main-page .announcement-heading::before {\n    content: "";\n    width: 6px;\n    height: 6px;\n    flex: 0 0 auto;\n    border-radius: 50%;\n    background-color: #1677ff;\n}\n\n.main-page .announcement-list {\n    display: grid;\n    gap: 3px;\n    margin: 0;\n    padding: 0;\n    list-style: none;\n}\n\n.main-page .announcement-item {\n    color: #1f2329;\n    font-size: 12px;\n    line-height: 20px;\n    word-break: break-word;\n}\n\n.main-page .log .el-text {\n    font-weight: 400;\n    white-space: normal;\n}\n\n.main-page .log-time {\n    font-weight: 400;\n}\n\n.main-page .log-action-link {\n    color: #176ae5;\n    cursor: pointer;\n    text-decoration: none;\n}\n\n.main-page .log-action-link:hover {\n    color: #409eff;\n    text-decoration: underline;\n}\n\n.main-page .log-divider {\n    margin: 0;\n}\n\n.main-page .token-input,\n.main-page .question-list {\n    font-size: 12px;\n}\n\n.main-page .token-label {\n    border-radius: 0;\n}\n\n.main-page .question_table {\n    width: 625px;\n}\n\n.main-page .setting {\n    margin-top: -8px;\n    font-size: 14px;\n}\n\n.main-page .setting-section-title {\n    font-size: 13px;\n}\n\n.main-page .setting-checkbox {\n    margin-bottom: 6px;\n}\n\n.main-page .setting-number {\n    margin-top: 6px;\n}\n\n.main-page .setting .el-form-item {\n    margin-bottom: 0;\n}\n\n.main-page .ai-row {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 6px;\n}\n\n.main-page .ai-row .el-select {\n    flex: 1 1 auto;\n    min-width: 0;\n}\n\n.main-page .ai-row .dom-dump {\n    flex: 1 1 auto;\n    min-width: 0;\n}\n\n.main-page .ai-row .el-button {\n    flex: 0 0 auto;\n}\n\n.main-page .ai-usage {\n    color: #86909c;\n    font-size: 12px;\n    line-height: 18px;\n    word-break: break-word;\n}\n\n.main-page .ai-chips {\n    display: flex;\n    flex-wrap: wrap;\n    gap: 4px;\n    margin: 0 0 6px 0;\n}\n\n.main-page .ai-chip {\n    padding: 1px 7px;\n    border: 1px solid #c9cdd4;\n    border-radius: 10px;\n    background-color: #f7f8fa;\n    color: #4e5969;\n    font-size: 12px;\n    line-height: 17px;\n    cursor: pointer;\n    user-select: none;\n}\n\n.main-page .ai-chip:hover {\n    border-color: #176ae5;\n    color: #176ae5;\n}\n\n.main-page .ai-chip.is-active {\n    border-color: #176ae5;\n    background-color: #e8f2ff;\n    color: #176ae5;\n    font-weight: 500;\n}\n\n.main-page .dom-dump textarea {\n    font-family: Consolas, Menlo, monospace !important;\n    font-size: 11px;\n    line-height: 15px;\n}\n';
  const hookWebpack = () => {
    let originCall = _unsafeWindow.Function.prototype.call;
    _unsafeWindow.Function.prototype.call = function(...args) {
      var _a, _b;
      const result = originCall.apply(this, args);
      if (((_b = (_a = args[0]) == null ? void 0 : _a.a) == null ? void 0 : _b.version) === "2.5.0") {
        const install = args[1].exports.a.install;
        args[1].exports.a.install = function(...installArgs) {
          installArgs[0].mixin({
            mounted: function() {
              this.$el["__Ivue__"] = this;
            }
          });
          return install.apply(this, installArgs);
        };
        return result;
      }
      return result;
    };
  };
  const BOOTSTRAP_INTERVAL = 100;
  const COMPLETE_READY_STATE = "complete";
  const ELEMENT_PLUS_STYLE_RESOURCE = "ElementPlusStyle";
  const url = _unsafeWindow.location.href;
  if (url.includes("zhihuishu.com")) {
    hookWebpack();
    hookError();
  }
  const AI_UI_CSS = "\n.main-page .start-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:0 0 8px;padding:8px 10px;border:1px solid #bae0ff;border-radius:6px;background:#e6f4ff}\n.main-page .start-bar-hint{color:#0958d9;font-size:11px;line-height:1.5}\n.main-page .ai-label{display:inline-block;min-width:64px;color:#4e5969;font-size:12px}\n.main-page .ai-hint{margin:2px 0 6px;color:#86909c;font-size:11px;line-height:1.5}\n.main-page .ai-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:6px}\n";
  const createStyleSheet = (cssText) => {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    return sheet;
  };
  const createShadowMountNode = () => {
    const shadowHost = document.createElement("div");
    const mountNode = document.createElement("div");
    const shadowRoot = shadowHost.attachShadow({ mode: "closed" });
    document.body.append(shadowHost);
    shadowRoot.appendChild(mountNode);
    shadowRoot.adoptedStyleSheets = [
      createStyleSheet(_GM_getResourceText(ELEMENT_PLUS_STYLE_RESOURCE) ?? ""),
      createStyleSheet(layoutCss),
      createStyleSheet(AI_UI_CSS)
    ];
    return mountNode;
  };
  const mountApp = () => {
    const app = vue.createApp(_sfc_main);
    app.use(pinia.createPinia());
    app.use(ElementPlus);
    app.mount(createShadowMountNode());
  };
  const timer = setInterval(() => {
    if (document.readyState !== COMPLETE_READY_STATE)
      return;
    clearInterval(timer);
    mountApp();
  }, BOOTSTRAP_INTERVAL);

})(Vue, Pinia, rxjs, md5, ElementPlus);
