# CI/CD、环境与发布策略

本文档记录项目的分支、环境、部署、发布和回滚约定。

## 1. 总体目标

项目使用一套代码、一个 GitHub Actions workflow，管理多套运行环境：

```text
开发分支/迭代分支 -> 开发环境
发布候选版本       -> 预发布环境
手动生产发布         -> 生产环境
```

核心原则：

- `dev` 可以用于日常集成，不保证所有代码都会发布。
- `pre` 只部署当前准备验收和发布的版本。
- `pro` 只通过手动发布 workflow 部署，并在发布时创建 tag。
- 生产回滚通过重新部署旧 tag 完成，不直接修改服务器代码，也不重写 Git 历史。

## 2. 环境定义

| 环境 | 作用 | 推荐来源 | 是否需要审批 |
| --- | --- | --- | --- |
| `dev` | 开发集成和联调 | `dev` 或迭代分支 | 否 |
| `pre` | 发布前验收 | `release/*` 或选定的迭代分支 | 建议 |
| `pro` | 生产环境 | `main` 当前提交，由手动发布 workflow 打 tag | 是 |

如果项目只有一个迭代，可以暂时使用：

```text
dev 分支 -> dev 环境
pre 分支 -> pre 环境
main     -> pro 环境
```

当前项目采用下面的生产发布方式：

```text
dev 分支       -> dev 环境
iteration/<需求名>/dev 分支 -> 该迭代独立 dev 环境
iteration/<需求名>/pre 分支 -> 该迭代独立 pre 环境
release/* 分支 -> pre 环境
手动发布 workflow -> 从 main 打 tag -> pro 环境
```

## 3. 多迭代开发

多个迭代不建议长期共用一个 `dev` 和一个 `pre`。

推荐按迭代隔离：

```text
feature/order-*  -> iteration/order/dev -> iteration/order/pre
feature/member-* -> iteration/member/dev -> iteration/member/pre
```

每个迭代至少要有独立的：

- 部署目录
- PM2 进程名
- 端口
- 环境变量
- 数据库或数据库 schema（如果未来引入数据库）

示例：

| 迭代 | 环境 | 部署目录 | PM2 进程 | 端口 |
| --- | --- | --- | --- | --- |
| order | dev | `/var/www/pokedex-iterations/order/dev` | `pokedex-order-dev` | 动态生成 |
| order | pre | `/var/www/pokedex-iterations/order/pre` | `pokedex-order-pre` | 动态生成 |
| member | dev | `/var/www/pokedex-iterations/member/dev` | `pokedex-member-dev` | 动态生成 |
| member | pre | `/var/www/pokedex-iterations/member/pre` | `pokedex-member-pre` | 动态生成 |
| production | pro | `/var/www/pokedex-pro` | `pokedex-pro` | `5000` |

如果某个迭代取消，只需要停止并删除它对应的分支和环境，不会污染其他迭代。

迭代端口通过 `ITERATION_*_PORT_BASE + hash(迭代名) % 500` 生成，因此 dev 和 pre 的端口区间不能重叠。示例中的 `5300-5799` 和 `5800-6299` 是两个独立区间。如果发生 hash 碰撞，需要调整迭代名、端口基线，或后续引入显式端口覆盖变量。

对于短期功能，也可以使用 PR Preview 环境，例如：

```text
preview-pr-42
```

PR 关闭后删除对应环境，避免服务器上长期保留大量临时部署。

## 4. GitHub Environments

在仓库中创建以下 GitHub Environments：

```text
dev
pre
pro
iteration-order-dev
iteration-order-pre
```

固定环境 `dev`、`pre`、`pro` 建议手工创建并配置保护规则。迭代环境可以由 workflow 动态创建，例如 `iteration-order-dev` 和 `iteration-order-pre`。

动态创建的 Environment 只适合展示部署记录。GitHub 不会自动给这些新环境配置审批规则和 Environment secrets。如果某个迭代的 pre 环境必须强制审批，需要提前创建对应 Environment，例如 `iteration-order-pre`，并手工配置保护规则。

workflow 通过动态表达式选择环境。固定分支直接对应同名环境，`release/*` 分支统一部署到 `pre` 环境，迭代分支会转换为 `iteration-<name>-<stage>`：

```yaml
environment:
  name: ${{ needs.resolve_deployment.outputs.environment_name }}
```

每个 Environment 配置自己的 Secrets：

```text
SERVER_HOST
SERVER_USER
SSH_PRIVATE_KEY
```

建议配置为 Environment secrets，而不是 Repository secrets。

迭代环境使用仓库级 Secrets：

```text
ITERATION_SERVER_HOST
ITERATION_SERVER_USER
ITERATION_SSH_PRIVATE_KEY
```

这样新增一个迭代时不需要为每个动态 Environment 重复配置 SSH secrets。

每个 Environment 配置自己的 Variables：

```text
DEPLOY_PATH
PM2_APP_NAME
PORT
```

仓库级 Variables 额外需要：

```text
ITERATION_DEPLOY_ROOT
ITERATION_DEV_PORT_BASE
ITERATION_PRE_PORT_BASE
```

示例：

```text
ITERATION_DEPLOY_ROOT = /var/www/pokedex-iterations
ITERATION_DEV_PORT_BASE = 5300
ITERATION_PRE_PORT_BASE = 5800
```

当分支为 `iteration/order/dev` 时，workflow 会自动生成：

```text
Environment  = iteration-order-dev
DEPLOY_PATH  = /var/www/pokedex-iterations/order/dev
PM2_APP_NAME = pokedex-order-dev
PORT         = 5300 至 5799 之间的稳定端口
```

当分支为 `iteration/order/pre` 时，会对应到：

```text
Environment  = iteration-order-pre
DEPLOY_PATH  = /var/www/pokedex-iterations/order/pre
PM2_APP_NAME = pokedex-order-pre
PORT         = 5800 至 6299 之间的稳定端口
```

如果以后有域名，可以增加：

```text
APP_URL
```

`APP_URL` 只用于 GitHub Deployment 页面显示访问地址，不决定部署位置，也不是应用运行必需项。当前 workflow 未使用 `APP_URL`，没有域名时不需要配置。

示例：

```text
dev:
  DEPLOY_PATH  = /var/www/pokedex-dev
  PM2_APP_NAME = pokedex-dev
  PORT         = 5001

pre:
  DEPLOY_PATH  = /var/www/pokedex-pre
  PM2_APP_NAME = pokedex-pre
  PORT         = 5002

pro:
  DEPLOY_PATH  = /var/www/pokedex-pro
  PM2_APP_NAME = pokedex-pro
  PORT         = 5000
```

## 5. 环境保护规则

建议按以下方式配置：

```text
dev:
  允许分支：dev
  审批：不设置

pre:
  允许分支：release/* 或 pre
  审批：至少 1 人

iteration-*-dev:
  允许分支：iteration/*/dev
  审批：通常不设置

iteration-*-pre:
  允许分支：iteration/*/pre
  审批：建议至少 1 人

pro:
  允许来源：Release production workflow
  审批：至少 1 人
  Prevent self-review：开启
```

效果：

1. `dev` 自动部署，方便开发联调。
2. `pre` 部署前需要验收审批。
3. `pro` 部署前需要生产审批。
4. 不符合分支或 tag 规则的任务不能部署到对应环境。
5. 环境 Secrets 只有 job 获得该环境授权后才能使用。

## 6. CI 流程

当前项目的质量检查命令：

```bash
npm ci
npm run eslint
npm test -- --ci --runInBand
npm run build
npm run test:e2e
```

推荐的 job 关系：

```text
quality
  └── e2e
        └── deploy
```

其中：

- `quality` 执行 ESLint、Jest 和生产构建。
- `quality` 将 `dist` 上传为 artifact。
- `e2e` 下载相同的 `dist`，启动 `app.js`，执行 Cypress。
- `deploy` 只有在 `quality` 和 `e2e` 全部成功后才可以执行。

这样部署的是已经经过测试的构建产物，而不是部署 job 重新构建出来的另一份文件。

## 7. PR Preview 环境

PR Preview 用于给每个 PR 创建临时环境：

```text
PR #42 -> preview-pr-42
```

触发条件：

```text
opened
synchronize
reopened
closed
```

打开、更新或重新打开 PR 时：

```text
CI + E2E -> 构建 artifact -> 部署 preview-pr-编号
```

关闭 PR 时：

```text
停止 PM2 进程 -> 删除 preview 目录
```

PR Preview 使用仓库级 Secrets：

```text
PREVIEW_SERVER_HOST
PREVIEW_SERVER_USER
PREVIEW_SSH_PRIVATE_KEY
```

PR Preview 使用仓库级 Variables：

```text
PREVIEW_DEPLOY_ROOT
PREVIEW_PORT_BASE
```

示例：

```text
PREVIEW_DEPLOY_ROOT = /var/www/pokedex-previews
PREVIEW_PORT_BASE   = 6000
```

PR #42 会生成：

```text
DEPLOY_PATH  = /var/www/pokedex-previews/pr-42
PM2_APP_NAME = pokedex-pr-42
PORT         = 6042
```

PR Preview 端口按 `PREVIEW_PORT_BASE + PR 编号` 生成。需要预留足够大的端口区间，并确保它不和 `dev`、`pre`、`pro`、迭代环境端口重叠。

为了安全，PR Preview 对所有非 closed PR 执行 CI + E2E，但只部署来自当前仓库的 PR：

```text
github.event.pull_request.head.repo.full_name == github.repository
```

来自 fork 的 PR 只跑检查，不会部署 preview，避免把 SSH secrets 暴露给不可信代码。

## 8. 发布流程

生产环境推荐保留手动发布入口。代码合并和生产发布分开处理：

```text
PR 合并 main -> 手动点击 Release production -> 创建 tag -> 部署 pro
```

不建议在 workflow 中自动把分支合并到 `main`。合并代码应该走 PR、review、branch protection 和 CI；生产发布应该走手动触发、环境审批、tag 和部署审计。

### 8.1 合并和验收

```text
feature/*
  -> dev
  -> release/1.0.0
  -> pre
  -> 验收
```

如果 `dev` 中包含暂时不发布的功能，不要直接把整个 `dev` 合并到 `pre`。可以从稳定基线创建 `release/*`，只合入本次确定发布的功能。

### 8.2 创建发布 tag

验收通过后，先通过 PR 将本次发布内容合并到 `main`。然后在 GitHub Actions 页面手动运行：

```text
Release production
```

输入版本号：

```text
v1.0.0
```

workflow 会：

1. 要求 workflow 从 `main` 分支触发。
2. checkout `main`。
3. 校验 tag 格式和是否已存在。
4. 执行 lint、unit test、build、E2E。
5. 保存发布 artifact。
6. 创建 annotated tag，例如 `v1.0.0`。
7. 通过 `pro` Environment 审批后部署生产。
8. 预留白名单、冒烟测试、灰度和切流步骤。

当前实现是在生产环境审批前创建 tag。如果审批被拒或部署失败，可能出现“tag 已创建但生产未成功上线”的状态。此时不要删除或重写 tag，应通过重新运行发布 workflow、触发回滚 workflow，或创建新的修复版本来恢复审计链路。

生产发布和生产回滚共用同一个 concurrency group：`production-deploy`。同一时间只允许一个生产部署流程执行，避免 release 和 rollback 同时修改 `pro` 环境。

### 8.3 保存发布产物

每个生产版本至少记录：

- Git tag
- Git commit SHA
- `dist` 构建产物
- `app.js`
- `package.json`
- `package-lock.json`
- 发布时间

可以将构建产物保存为 GitHub Actions artifact 或 GitHub Release asset。

当前实现使用 GitHub Actions artifact，保留 30 天。更严格的生产方案是把发布产物同步保存为 GitHub Release asset 或制品仓库，避免 30 天后无法直接取回当时的构建产物。

## 9. 回滚流程

假设当前生产版本是 `v1.0.3`，上一稳定版本是 `v1.0.2`。

标准回滚步骤：

```text
发现 v1.0.3 有问题
  -> 选择已验证的 v1.0.2
  -> 手动触发 rollback workflow
  -> 输入 v1.0.2
  -> 通过 pro Environment 审批
  -> 部署 v1.0.2 的构建产物
  -> 检查服务、日志和核心功能
```

回滚 workflow 可以使用：

```yaml
on:
  workflow_dispatch:
    inputs:
      version:
        description: '要部署的 tag，例如 v1.0.2'
        required: true
        type: string
```

回滚时优先重新部署旧 tag，不要执行：

```bash
git reset --hard
```

也不要为了回滚生产而重写远程 `main` 分支历史。

当前 rollback workflow 会 checkout 指定 tag，然后重新执行 `npm ci`、unit test 和 build，再部署新构建出的产物。这保证代码来源是旧 tag，但不等同于复用当时发布时保存的 artifact。如果需要严格复现生产发布产物，应改为从 GitHub Release asset 或长期制品仓库下载对应版本。

## 10. 服务器版本目录

当前项目可以先采用覆盖部署。更稳妥的生产方案是保留多个版本：

```text
/var/www/pokedex/releases/v1.0.1
/var/www/pokedex/releases/v1.0.2
/var/www/pokedex/releases/v1.0.3
/var/www/pokedex/current
```

发布时：

```text
上传到 releases/v1.0.3
切换 current 指向 v1.0.3
重启 PM2
```

回滚时：

```text
切换 current 指向 v1.0.2
重启 PM2
```

这比重新修改服务器上的文件更容易审计，也能缩短回滚时间。

## 11. Nginx 和访问方式

Nginx 反向代理不要求域名，可以使用 IP 和端口：

```text
http://服务器IP:5001 -> dev
http://服务器IP:5002 -> pre
http://服务器IP:5000 -> pro
```

有域名后，可以改成：

```text
dev.example.com -> dev
pre.example.com -> pre
example.com     -> pro
```

建议先用不同端口验证部署链路，后续再接 Nginx、域名和 HTTPS。

## 12. 服务器前置条件

部署服务器至少需要准备：

- Node.js 20 和 npm。
- PM2。
- SSH 用户可以写入对应部署目录。
- 服务器可以访问 npm registry，因为部署后会执行 `npm ci --omit=dev`。
- 防火墙或安全组放通对应端口。
- 如果接入 Nginx，需要配置反向代理、HTTPS 证书和必要的 reload 权限。

建议每次部署后增加最小健康检查，例如在 PM2 重启后执行：

```bash
curl -fsS http://127.0.0.1:$PORT
```

如果后续增加 `/healthz`，应优先检查 `/healthz`。

## 13. 分支保护和依赖维护

建议在 GitHub 配置：

- `main` 禁止直接 push，必须通过 PR 合并。
- `main` 至少 1 人 review，并要求 CI 检查通过。
- `main` 禁止 force push。
- `pre` 或 `release/*` 要求 CI 通过后再部署。
- 开启 Dependabot，覆盖 npm 依赖和 GitHub Actions。

如果用于更严格的生产环境，第三方 GitHub Actions 可以 pin 到 commit SHA，并在文档中维护允许使用的 action 清单。

## 14. 当前项目状态

当前 workflow 文件：

```text
.github/workflows/ci-cd.yml
.github/workflows/pr-preview.yml
.github/workflows/release-production.yml
.github/workflows/rollback.yml
```

当前触发规则：

```text
push dev      -> CI + E2E + deploy dev
push pre      -> CI + E2E + deploy pre
push main     -> CI + E2E，不部署
push release/* -> CI + E2E + deploy pre
push iteration/<需求名>/dev -> CI + E2E + deploy 该迭代 dev
push iteration/<需求名>/pre -> CI + E2E + deploy 该迭代 pre
pull request from fork -> CI + E2E，不部署 preview
pull request opened/synchronize/reopened -> 部署 preview-pr-编号
pull request closed -> 清理 preview-pr-编号
manual release workflow -> 从 main 打 tag，部署 pro
manual rollback workflow -> 输入旧 tag，部署 pro
```

当前已经具备：

- Node.js 20
- `npm ci`
- ESLint
- Jest
- Webpack production build
- Cypress E2E
- 构建产物 artifact
- `dev`、`pre` 分支到对应环境的自动部署
- `release/*` 分支到 `pre` 环境的自动部署
- 每个 `iteration/<需求名>/dev` 和 `iteration/<需求名>/pre` 拥有独立环境、目录、PM2 进程和端口
- PR Preview 临时环境和关闭后的清理流程
- 手动发布 workflow 从 `main` 创建 tag 并部署 `pro`
- 发布和回滚在进入 `pro` 前先完成构建和测试
- 部署前显式校验 `DEPLOY_PATH`、`PM2_APP_NAME`、`PORT`
- 环境级 Secrets 和 Variables
- `pro` Environment 保护入口
- 手动选择旧 tag 的生产回滚 workflow
- 生产发布和生产回滚共享并发锁，避免同时部署 `pro`

后续建议：

1. 为 `dev`、`pre`、`pro` 配置 GitHub Environment 保护规则。
2. 生产环境改为版本目录和 `current` 软链接。
3. 根据服务器资源设置 preview 环境保留时间和清理策略。
4. 将发布产物保存为 GitHub Release asset 或长期制品。
5. 增加部署后的健康检查和失败处理策略。
