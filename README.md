# 梦幻研习社

梦幻西游电脑版时间服 221 五开学习站点。当前包括四课：

1. 人物属性、固伤技能与影响因素
2. 人物修炼、宠物修炼、帮贡与辅助技能
3. 装备、灵饰、宝石、符石与套装
4. 召唤兽资质、成长、技能、内丹、装备与宠修

线上站点：https://menghuan-221-classroom.creamygiant18.chatgpt.site

## 本地运行

这是纯静态站点，无需安装依赖或构建。安装 Python 3 后，在仓库根目录运行：

```bash
python3 -m http.server 8000 --directory dist
```

Windows 也可使用：

```powershell
py -m http.server 8000 --directory dist
```

打开 http://localhost:8000 。请使用 HTTP 服务预览，页面采用以网站根目录为基准的链接。

## 文件结构

- `dist/index.html`：第一课与默认首页
- `dist/lesson2.html`、`dist/lesson2.js`：第二课及计算器
- `dist/lesson3.html`、`dist/lesson3.js`、`dist/lesson3-extra.js`：第三课及交互工具
- `dist/lesson4.html`、`dist/lesson4.js`：第四课及交互工具
- `.openai/hosting.json`：原 Sites 项目关联与静态发布目录，不含凭据

页面样式目前写在各 HTML 内。课程切换、阅读进度、门派与宝宝搭配切换、计算器和购前清单均在浏览器运行。完成状态和清单保存在当前浏览器的 localStorage 中，不会同步到其他设备。

## 部署与维护

静态托管时，将 `dist/` 作为网站根目录。部署到子路径时，需要相应调整页面中以 `/` 开头的链接和脚本路径。

本仓库是 Sites 已发布版本的源码快照。向 GitHub 提交修改不会自动更新原 Sites 站点；需要在 Sites 中另行保存并发布。迁移为独立站点时，不要将原 `.openai/hosting.json` 中的项目 ID 用作新站点身份。

本次导出未包含临时凭据、部署压缩包、运行日志或本地工作目录状态。后续维护请继续排除这些文件。

## 内容说明

本站为非官方学习笔记。部分数值使用经典电脑版资料作教学示例，不能代替当前时间服游戏内规则。虚构装备、宝宝和演示单价均用于说明，不代表实时市场报价。
