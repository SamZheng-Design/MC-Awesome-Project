-- 滴灌通智能体筛选系统 - 数据库架构
-- DGT Intelligence Platform Database Schema

-- ============================================
-- 表1: deals (投资标的)
-- ============================================
CREATE TABLE IF NOT EXISTS deals (
  id TEXT PRIMARY KEY,                              -- 唯一标识符 DGT-YYYY-XXXX
  company_name TEXT NOT NULL,                       -- 企业名称
  credit_code TEXT,                                 -- 统一社会信用代码
  industry TEXT NOT NULL,                           -- 所属行业: ecommerce/overseas/light-asset/retail
  status TEXT DEFAULT 'pending',                    -- 状态: pending/outer/evaluation/review/completed/rejected
  main_business TEXT,                               -- 主营业务描述
  funding_amount REAL,                              -- 融资需求金额(万元)
  contact_name TEXT,                                -- 联系人
  contact_phone TEXT,                               -- 联系电话
  website TEXT,                                     -- 店铺/品牌链接
  submitted_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- 提交时间
  project_documents TEXT,                           -- 项目材料内容(文本化存储)
  financial_data TEXT,                              -- 财务数据(JSON格式字符串)
  total_score REAL,                                 -- 综合评分(0-100)
  score_financial REAL,                             -- 财务健康度评分
  score_operational REAL,                           -- 运营能力评分
  score_legal REAL,                                 -- 法律合规评分
  score_risk REAL,                                  -- 风险控制评分
  score_interest REAL,                              -- 利益一致性评分
  score_economic REAL,                              -- 经济性测算评分
  evaluation_details TEXT,                          -- 各Agent评估详情(JSON)
  final_recommendation TEXT,                        -- 最终投资建议
  result TEXT DEFAULT 'pending',                    -- 结果: pass/reject/pending
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 表2: agents (智能体配置) - 核心表
-- ============================================
CREATE TABLE IF NOT EXISTS agents (
  id TEXT PRIMARY KEY,                              -- 智能体ID
  name TEXT NOT NULL,                               -- 智能体名称
  ring_type TEXT NOT NULL,                          -- 环类型: outer(外环)/inner(中环)
  industry TEXT DEFAULT 'all',                      -- 适用行业: all/ecommerce/overseas/light-asset/retail
  dimension TEXT,                                   -- 评估维度
  weight REAL DEFAULT 0,                            -- 权重百分比(0-100)，外环为0
  description TEXT,                                 -- 智能体功能描述
  system_prompt TEXT,                               -- System Prompt (可在页面编辑)
  evaluation_criteria TEXT,                         -- 评估标准JSON (可在页面编辑)
  knowledge_base TEXT,                              -- 知识库内容 (可上传文档更新)
  knowledge_files TEXT,                             -- 知识库文件名列表(JSON数组)
  output_format TEXT,                               -- 输出格式模板JSON
  pass_threshold REAL DEFAULT 60,                   -- 通过阈值分数
  is_enabled INTEGER DEFAULT 1,                     -- 是否启用 (0/1)
  execution_order INTEGER DEFAULT 1,                -- 执行顺序
  model_config TEXT,                                -- 大模型配置(模型名称、temperature等)
  icon TEXT,                                        -- 图标CSS类
  icon_color TEXT,                                  -- 图标颜色
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 表3: evaluation_logs (评估日志)
-- ============================================
CREATE TABLE IF NOT EXISTS evaluation_logs (
  id TEXT PRIMARY KEY,                              -- 日志ID: LOG-时间戳
  deal_id TEXT NOT NULL,                            -- 关联的标的ID
  agent_id TEXT NOT NULL,                           -- 执行的智能体ID
  agent_name TEXT,                                  -- 智能体名称
  ring_type TEXT,                                   -- 环类型
  input_data TEXT,                                  -- 输入给AI的数据
  output_result TEXT,                               -- AI返回的结果(JSON)
  score REAL,                                       -- 评分
  pass_status INTEGER,                              -- 是否通过 (0/1)
  reasoning TEXT,                                   -- AI的评分理由
  execution_time INTEGER,                           -- 执行耗时(毫秒)
  executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,  -- 执行时间
  error_message TEXT,                               -- 错误信息(如有)
  FOREIGN KEY (deal_id) REFERENCES deals(id),
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

-- ============================================
-- 表4: workflow (工作流配置)
-- ============================================
CREATE TABLE IF NOT EXISTS workflow (
  id TEXT PRIMARY KEY,                              -- 工作流ID
  name TEXT NOT NULL,                               -- 工作流名称
  version TEXT DEFAULT 'v1.0.0',                    -- 版本号
  status TEXT DEFAULT 'active',                     -- 状态: active/inactive
  outer_agents TEXT,                                -- 外环智能体ID列表(JSON数组)
  inner_agents TEXT,                                -- 中环智能体ID列表(JSON数组)
  scoring_formula TEXT,                             -- 加权评分公式
  pass_criteria TEXT,                               -- 通过标准配置(JSON)
  execution_mode TEXT,                              -- 执行模式配置
  execution_count INTEGER DEFAULT 0,                -- 总执行次数
  success_rate REAL DEFAULT 0,                      -- 成功率(0-100)
  avg_duration REAL DEFAULT 0,                      -- 平均耗时(秒)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 索引优化
-- ============================================
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_industry ON deals(industry);
CREATE INDEX IF NOT EXISTS idx_deals_result ON deals(result);
CREATE INDEX IF NOT EXISTS idx_agents_ring_type ON agents(ring_type);
CREATE INDEX IF NOT EXISTS idx_agents_industry ON agents(industry);
CREATE INDEX IF NOT EXISTS idx_evaluation_logs_deal_id ON evaluation_logs(deal_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_logs_agent_id ON evaluation_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_workflow_status ON workflow(status);
