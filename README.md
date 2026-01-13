# 🤖 滴灌通智能体筛选系统 (DGT Intelligence Platform)

## 项目概述
- **名称**: 滴灌通智能体筛选系统
- **目标**: 构建真正接入大模型的多智能体投资评估系统
- **模式**: 双层漏斗模型（外环一票否决 + 中环加权评分）

## 🌐 在线访问
- **Sandbox URL**: https://3000-isamie14vn6sqeukq0ano-c07dda5e.sandbox.novita.ai

## 📊 功能特性

### 已完成功能 ✅
1. **10个智能体配置**
   - 外环智能体（3个）: 负面清单、触达审核、利益一致性初筛
   - 中环智能体（7个）: 财务健康度、运营能力、法律合规、风险控制、利益一致性深度、经济性测算、综合评分

2. **智能体配置中心** (`/agents`)
   - System Prompt在线编辑
   - 知识库在线编辑和上传
   - 评估标准JSON编辑
   - 参数配置（权重、阈值、执行顺序）
   - AI模型配置（模型、Temperature、Max Tokens）
   - 测试运行功能

3. **Demo演示页面** (`/demo`)
   - Cardi B演唱会项目完整评估演示
   - 外环串行执行动画
   - 中环并行执行动画
   - 雷达图评分展示
   - 最终投资建议

4. **其他页面**
   - Dashboard主页 (`/`)
   - 工作流可视化 (`/workflow`)
   - 标的管理 (`/deals`)
   - 4步提交表单 (`/submit`)

### API端点
| 端点 | 方法 | 功能 |
|------|------|------|
| `/api/init-db` | POST | 初始化数据库 |
| `/api/agents` | GET | 获取所有智能体 |
| `/api/agents/:id` | GET/PATCH | 获取/更新单个智能体 |
| `/api/deals` | GET/POST | 获取所有标的/创建标的 |
| `/api/deals/:id` | GET/PATCH | 获取/更新单个标的 |
| `/api/workflow` | GET | 获取工作流配置 |
| `/api/evaluation-logs/:dealId` | GET | 获取评估日志 |
| `/api/ai/evaluate` | POST | 执行单个智能体评估 |
| `/api/ai/evaluate-deal` | POST | 执行完整评估流程 |
| `/api/stats` | GET | 获取统计数据 |

## 🗄️ 数据架构

### 数据库表
1. **deals** - 投资标的
2. **agents** - 智能体配置（核心表）
3. **evaluation_logs** - 评估日志
4. **workflow** - 工作流配置

### 存储服务
- **Cloudflare D1** - SQLite数据库

## 🚀 技术栈
- **后端**: Hono + TypeScript
- **数据库**: Cloudflare D1
- **AI**: OpenAI API (gpt-5)
- **前端**: TailwindCSS + Chart.js + Marked.js
- **部署**: Cloudflare Pages

## 📦 本地开发

```bash
# 安装依赖
npm install

# 初始化数据库
npx wrangler d1 migrations apply dgt-db --local

# 构建项目
npm run build

# 启动开发服务器
npm run dev:sandbox
# 或使用PM2
pm2 start ecosystem.config.cjs
```

## 🔐 环境变量
- `OPENAI_API_KEY` - OpenAI API密钥
- `OPENAI_BASE_URL` - OpenAI API基础URL

## 📅 更新日志
- **2026-01-13**: 初始版本发布
  - 完成10个智能体配置
  - 完成6个页面开发
  - 集成OpenAI API
  - Cardi B项目演示数据

## 📝 使用指南

### 1. 查看智能体配置
访问 `/agents` 页面，可以：
- 切换查看外环/中环智能体
- 点击智能体卡片编辑配置
- 修改System Prompt和知识库
- 测试运行智能体

### 2. 运行评估演示
访问 `/demo` 页面，点击"开始评估"按钮：
- 系统将依次执行外环筛选（一票否决）
- 然后并行执行中环评估
- 最后显示综合评分和投资建议

### 3. 提交新标的
访问 `/submit` 页面：
- 选择行业类型
- 填写企业基本信息
- 上传项目材料
- 确认提交

## 📌 下一步计划
- [ ] 增加更多行业专属智能体
- [ ] 支持批量评估
- [ ] 添加评估结果导出功能
- [ ] 增加用户权限管理
