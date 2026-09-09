# VALDORA · 山海王冠之城官方网站

独立的作品宣传站。Vite + React + TypeScript；原城市核心文件没有修改。

## 打开成品

在此文件夹双击 **启动官网.cmd**。它通过 PowerShell 7 启动本地静态服务并打开 `http://127.0.0.1:5188/`。

当前电脑已具备 Node.js / PowerShell 7。成品在 `dist`，运行成品无需安装依赖、无需联网。请保留 `dist` 与 `scripts/serve.mjs` 的相对目录。

停止本地服务：用 PowerShell 7 运行 `停止官网.ps1`。脚本仅停止命令行与本工程匹配的服务。

这是模块化前端项目，应通过本地服务访问，不是双击源码 `index.html`。原城市副本位于 `dist/world/index.html`，仍可独立打开。

## 开发

```powershell
npm install
npm run dev
npm run build
```

`npm run build` 先运行 TypeScript 编译检查，再生成生产静态文件。所有页面图片与城市内核均为本地资源。

## 文件结构

```text
src/
  components/  导航、品牌标记、图鉴目录、灯箱
  sections/    13个独立章节
  data/        文案、36原型、真实建筑足迹与运行数字
  hooks/       章节观察、Reduced Motion
  styles/      品牌、构图、响应式样式
public/
  images/      1600 / 800 两档 WebP
  world/       原城市文件的字节一致副本
scripts/       本地服务、资产生成、实际浏览器验证
docs/          项目解读、设计系统、源码完整性、验证报告
evidence/      原始截图、运行数据、桌面/手机QA截图
dist/          已构建的可运行成品
```

## 与原项目的关系

原件：`../欧洲体素箱庭小镇/index.html`。

官网首页 `/` → 入城 `/world/index.html`。地标入口用 `cam=x,y,z|x,y,z` 定位。复制的是完整内嵌版本，不依赖重构、不修改原件；SHA-256 记录在 `docs/source-integrity.json` 与 `evidence/world-integration-qa.json`。

原城市后续更新时，可运行 `npm run sync-world` 同步副本，然后重新拍摄/更新事实数据并 build。不要只替换核心文件却保留已失效的宣传数字与旧截图。

## 复现取景与检查

首次使用浏览器脚本如缺少 Chromium：运行 `npx playwright install chromium`。

```powershell
node scripts/capture.mjs
node scripts/architecture-capture.mjs
node scripts/light-capture.mjs
node scripts/prepare-assets.mjs
node scripts/extract-catalog.mjs
npm run build
node scripts/serve.mjs
# 保持服务运行，在另一终端：
node scripts/qa.mjs
node scripts/world-integration-qa.mjs
node scripts/performance-qa.mjs
```

取景脚本保留本机原始工程路径；如果移动整个工程，请同步调整该路径。完整依据与原项目光影相位的既有差异，见 `docs/01-项目解读与内容依据.md`。
