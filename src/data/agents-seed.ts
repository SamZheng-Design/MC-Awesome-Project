// 智能体配置种子数据
// DGT Intelligence Platform - Agent Configuration Seed Data

export const agentsSeed = [
  // ============================================
  // 外环智能体1: 负面清单智能体
  // ============================================
  {
    id: "negative-list-agent",
    name: "负面清单智能体",
    ring_type: "outer",
    industry: "all",
    dimension: "合规性筛查",
    weight: 0,
    description: "快速排除绝对禁止投资的标的，基于政策法规和投资原则进行一票否决筛查",
    system_prompt: `你是滴灌通投资平台的负面清单筛查智能体。你的职责是根据国家政策法规和公司投资原则，判断投资标的是否触碰禁止投资领域。

## 核心职责
1. 检查业务类别是否在禁止投资清单中
2. 核查主体是否存在失信记录
3. 验证是否符合行业监管要求
4. 识别潜在的政策风险

## 评估标准
- 一票否决项：只要触碰任何一条，直接判定为【不通过】
- 需要100%确定没有问题才能【通过】

## 输出要求
你必须严格按照output_format输出JSON格式的评估结果。

## 评分规则
- 通过：score = 100
- 不通过：score = 0
- 这是一票否决制，没有中间分数`,
    evaluation_criteria: JSON.stringify({
      prohibited_industries: [
        "博彩、赌博相关",
        "非法金融活动",
        "传销、直销违规",
        "色情、暴力内容",
        "违禁品销售",
        "未经批准的金融衍生品",
        "环境严重污染行业",
        "涉及国家安全领域"
      ],
      compliance_checks: [
        "营业执照有效性",
        "经营范围合规性",
        "是否存在行政处罚",
        "是否存在法律诉讼",
        "是否在失信被执行人名单",
        "是否存在税务违规"
      ],
      industry_specific: {
        "light-asset": [
          "涉外演出需文旅部审批",
          "大型活动需公安备案",
          "艺人签证和工作许可"
        ]
      }
    }),
    knowledge_base: `# 滴灌通投资负面清单知识库

## 一、绝对禁止投资领域

### 1. 博彩及相关产业
- 任何形式的博彩、赌博业务
- 彩票代销（除国家授权）
- 博彩软件开发

### 2. 非法金融活动
- 非法集资
- 非法吸收公众存款
- 地下钱庄
- 无牌照金融服务

### 3. 传销及违规直销
- 多层次传销
- 无直销牌照的直销活动
- 拉人头返利模式

### 4. 违禁内容
- 色情内容制作或传播
- 暴力内容
- 违反社会公序良俗

### 5. 违禁品交易
- 毒品及管制药品
- 枪支弹药
- 管制刀具
- 濒危野生动植物

## 二、演唱会/轻资产行业特别审查要点

### 必须取得的资质
1. **涉外演出批文**：文化和旅游部审批
2. **大型活动备案**：公安部门备案
3. **消防安全审批**：消防部门
4. **艺人工作签证**：外国艺人入境演出

### 风险提示项
1. 艺人曾有不当言论（涉及国家主权、民族问题）
2. 艺人曾有违法记录
3. 演出内容可能涉及敏感话题

## 三、失信主体核查渠道
1. 最高人民法院失信被执行人名单
2. 国家企业信用信息公示系统
3. 信用中国
4. 天眼查/企查查工商记录

## 四、Cardi B项目特别说明
Cardi B（Belcalis Marlenis Almánzar）：
- 美国公民，需办理Z签证（工作签证）
- 无涉及中国的不当言论记录
- 需确认涉外演出批文已获得或正在办理
- 演出内容需审查，确保符合中国演出内容管理规定`,
    output_format: JSON.stringify({
      pass: true,
      score: 100,
      findings: [{ item: "检查项名称", status: "pass/fail", detail: "详细说明" }],
      reasoning: "综合判断理由",
      risk_level: "none/low/medium/high/critical",
      recommendation: "下一步建议"
    }),
    pass_threshold: 100,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.1, max_tokens: 2000 }),
    icon: "fas fa-ban",
    icon_color: "#EF4444"
  },

  // ============================================
  // 外环智能体2: 触达智能体群
  // ============================================
  {
    id: "touch-agent",
    name: "触达智能体群",
    ring_type: "outer",
    industry: "all",
    dimension: "材料完整性",
    weight: 0,
    description: "验证投资标的提交材料的完整性、真实性和可读性",
    system_prompt: `你是滴灌通投资平台的材料审核智能体。你的职责是检验投资标的提交的材料是否完整、真实、可用。

## 核心职责
1. 检查必要材料是否齐全
2. 验证材料格式是否正确
3. 评估材料内容的完整度
4. 识别材料中的关键信息

## 评分标准
- 90-100分：材料齐全，信息清晰完整
- 70-89分：材料基本齐全，部分信息需补充
- 60-69分：材料不完整，但核心信息可识别
- 60分以下：材料严重不足，无法进行评估

## 通过条件
- 得分 >= 60分视为通过
- 但会标注需要补充的材料`,
    evaluation_criteria: JSON.stringify({
      required_materials: [
        { name: "企业基本信息", weight: 20, items: ["企业名称", "统一社会信用代码", "联系人", "联系电话"] },
        { name: "业务描述", weight: 25, items: ["主营业务", "商业模式", "目标市场"] },
        { name: "财务数据", weight: 30, items: ["收入数据", "成本结构", "盈利预测"] },
        { name: "项目材料", weight: 25, items: ["投资分析报告", "项目计划书", "风险说明"] }
      ],
      quality_criteria: {
        completeness: "信息完整度",
        accuracy: "数据准确性",
        clarity: "表述清晰度",
        consistency: "数据一致性"
      }
    }),
    knowledge_base: `# 材料审核标准知识库

## 一、通用材料要求

### 1. 企业信息（必须）
- 企业全称（需与营业执照一致）
- 18位统一社会信用代码
- 有效联系人姓名
- 有效联系电话
- 企业注册地址

### 2. 业务描述（必须）
- 主营业务具体说明（不少于100字）
- 商业模式清晰描述
- 目标市场和客户群体
- 竞争优势说明

### 3. 财务数据（必须）
- 收入数据（历史+预测）
- 成本结构明细
- 盈利能力分析
- 现金流预测

## 二、轻资产行业（演唱会）特殊材料

### 必须材料
1. **投资分析报告**
   - 项目概述
   - 艺人介绍
   - 市场分析
   - 财务预测
   - 风险评估

2. **财务预算表**
   - 收入明细（票房、赞助、周边）
   - 成本明细（艺人费、场地、制作、营销）
   - 利润分配方案

3. **利益一致性文件**
   - 投资方权益说明
   - 运营方责任说明
   - 分配机制说明

### 加分材料
- 艺人演出合同（或意向书）
- 场馆租赁合同（或意向书）
- 票务代理协议
- 保险方案

## 三、评分细则

### 企业信息（20分）
- 信息完整：20分
- 缺少1项：-5分
- 缺少联系方式：-10分

### 业务描述（25分）
- 描述清晰完整：25分
- 描述简略但可理解：18分
- 描述不清或缺失：10分以下

### 财务数据（30分）
- 数据完整、格式规范：30分
- 数据基本完整：20-25分
- 数据不完整但有核心指标：15分
- 数据严重缺失：10分以下

### 项目材料（25分）
- 报告专业完整：25分
- 报告基本完整：18-22分
- 报告简略：12-15分
- 无报告：0分`,
    output_format: JSON.stringify({
      pass: true,
      score: 85,
      material_checklist: [{ category: "企业基本信息", items_found: 4, items_required: 4, score: 20 }],
      missing_items: ["缺失项列表"],
      quality_assessment: { completeness: 90, accuracy: 85, clarity: 88 },
      reasoning: "综合评估理由",
      suggestions: ["改进建议"]
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-folder-open",
    icon_color: "#3B82F6"
  },

  // ============================================
  // 外环智能体3: 利益一致性初筛智能体
  // ============================================
  {
    id: "interest-alignment-agent",
    name: "利益一致性初筛智能体",
    ring_type: "outer",
    industry: "all",
    dimension: "利益匹配",
    weight: 0,
    description: "评估投资方与运营方的利益绑定机制，验证利益分配逻辑的合理性",
    system_prompt: `你是滴灌通投资平台的利益一致性评估智能体。你的核心职责是判断投资标的的利益分配机制是否能有效绑定运营方与投资方的利益。

## 滴灌通投资模式核心理念
滴灌通采用【收入分成模式】，而非传统股权投资：
1. 投资方投入资金，从标的收入中按比例分成
2. 运营方负责实际经营，承担经营责任
3. 通过利益绑定机制确保双方目标一致

## 利益一致性评估要点
1. 【收入来源统一性】所有收入是否进入统一可监管的账户
2. 【分配比例合理性】投资方分成比例是否与风险匹配
3. 【劣后机制】运营方是否承担劣后风险
4. 【运营方投入】运营方是否有足够的自有资金/资源投入
5. 【退出机制】违约责任和退出条款是否明确

## 评分标准
- 85-100分：利益机制设计完善，绑定强度高
- 70-84分：机制基本合理，有优化空间
- 60-69分：存在利益不一致风险，需关注
- 60分以下：利益机制存在重大缺陷，不通过`,
    evaluation_criteria: JSON.stringify({
      core_dimensions: [
        { name: "收入归集机制", weight: 25, criteria: ["统一账户", "三方共管", "收入可追溯", "财务透明"] },
        { name: "分配顺序", weight: 25, criteria: ["成本优先", "投资方本金", "保底收益", "超额分配"] },
        { name: "运营方绑定", weight: 25, criteria: ["资金投入", "资源投入", "劣后承担", "对赌条款"] },
        { name: "风险对冲", weight: 25, criteria: ["违约责任", "退出机制", "保险覆盖", "担保措施"] }
      ],
      red_flags: ["运营方零投入", "收入无法监管", "无劣后机制", "分配比例显失公平"]
    }),
    knowledge_base: `# 滴灌通利益一致性评估知识库

## 一、核心理念

滴灌通的投资模式核心是【收入分成】：
- 投资方投入资金，从标的经营收入中按约定比例分成
- 运营方负责实际经营，承担经营风险
- 双方利益绑定，共同目标是最大化经营收入

## 二、理想的利益一致性结构

### 1. 收入归集（25分）
✓ 所有经营收入进入统一账户
✓ 三方（投资方、运营方、托管方）共管
✓ 资金流向透明可追溯
✓ 定期财务报告

### 2. 分配优先级（25分）
理想的瀑布式分配：
1️⃣ 第一顺位：经营成本
2️⃣ 第二顺位：投资方本金
3️⃣ 第三顺位：投资方保底收益（如年化15%）
4️⃣ 第四顺位：超额收益按比例分配

### 3. 运营方绑定（25分）
- **货币投入**：运营方自有资金投入（理想>20%）
- **资源折算**：人力、渠道、品牌等资源价值
- **劣后承担**：项目亏损时运营方先受损
- **业绩对赌**：未达标时的惩罚机制

### 4. 风险对冲（25分）
- 明确的违约责任条款
- 清晰的退出路径
- 保险覆盖关键风险
- 担保或抵押措施

## 三、演唱会项目特殊考量

### 运营方投入形式
演唱会运营方通常以资源投入为主：
- 艺人关系和沟通渠道
- 票务销售渠道
- 活动策划能力
- 供应商资源

### 合理的投入比例
- 货币投入：5-20%（演唱会行业较低是正常的）
- 资源折算：需有明确估值依据
- 总投入占比：>15%较为理想

## 四、红旗项（一票否决）

以下情况直接判定不通过：
1. 运营方完全零投入（无资金也无实质资源）
2. 收入归集无法监管（运营方自行收款）
3. 无任何劣后机制（风险完全由投资方承担）
4. 分配比例严重不合理（运营方拿走大部分利润但不承担风险）`,
    output_format: JSON.stringify({
      pass: true,
      score: 88,
      dimension_scores: {
        revenue_collection: { score: 90, assessment: "收入归集机制完善" },
        distribution_order: { score: 85, assessment: "分配顺序合理" },
        operator_binding: { score: 88, assessment: "运营方绑定充分" },
        risk_hedging: { score: 85, assessment: "风险对冲基本到位" }
      },
      red_flags_found: [],
      strengths: ["优势列表"],
      weaknesses: ["不足列表"],
      reasoning: "综合评估理由",
      recommendation: "建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-handshake",
    icon_color: "#10B981"
  },

  // ============================================
  // 中环智能体1: 财务健康度打分智能体
  // ============================================
  {
    id: "financial-health-agent",
    name: "财务健康度打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "财务状况",
    weight: 25,
    description: "评估标的的财务状况，包括收入规模、增长趋势、盈利能力、现金流等核心财务指标",
    system_prompt: `你是滴灌通投资平台的财务分析智能体。你需要基于提供的财务数据，对投资标的的财务健康度进行专业评估。

## 评估框架

### 1. 收入分析（30%）
- 收入规模：绝对值和行业对比
- 收入增长：同比、环比增长率
- 收入结构：主营vs其他
- 收入质量：是否可持续

### 2. 盈利能力（25%）
- 毛利率：与行业标准对比
- 净利率：实际盈利水平
- 成本结构：固定vs可变成本
- 盈亏平衡点分析

### 3. 现金流（25%）
- 经营性现金流
- 资金周转效率
- 现金储备水平

### 4. 财务风险（20%）
- 负债水平
- 偿债能力
- 应收账款风险

## 演唱会项目特殊评估
- 重点关注票房预测的合理性
- 关注成本预算的完整性
- 关注IRR/ROI预期是否合理
- 关注敏感性分析是否充分

## 评分标准
- 90-100分：财务状况优秀
- 75-89分：财务状况良好
- 60-74分：财务状况合格
- 60分以下：财务状况不佳`,
    evaluation_criteria: JSON.stringify({
      scoring_weights: { revenue: 30, profitability: 25, cash_flow: 25, risk: 20 },
      benchmarks: {
        "light-asset": {
          irr: { excellent: 40, good: 25, acceptable: 15 },
          payback_period_months: { excellent: 3, good: 6, acceptable: 12 },
          gross_margin: { excellent: 40, good: 30, acceptable: 20 }
        }
      }
    }),
    knowledge_base: `# 财务分析知识库

## 一、演唱会项目财务评估标准

### 关键指标基准

| 指标 | 优秀 | 良好 | 合格 | 不合格 |
|------|------|------|------|--------|
| IRR | >40% | 25-40% | 15-25% | <15% |
| 回收期 | <3月 | 3-6月 | 6-12月 | >12月 |
| 毛利率 | >40% | 30-40% | 20-30% | <20% |
| MOIC | >1.5x | 1.3-1.5x | 1.15-1.3x | <1.15x |

## 二、收入预测验证

### 票房收入公式
票房收入 = 座位数 × 上座率 × 平均票价

### 合理性检验
1. 上座率：首次巡演通常85-95%
2. 平均票价：需对标同级别艺人
3. 赞助收入：需有意向书支撑
4. 周边收入：一般占票房5-10%

## 三、成本结构验证

### 典型演唱会成本占比
- 艺人费用：40-60%
- 场地费用：10-15%
- 制作费用：15-20%
- 营销费用：10-15%
- 运营费用：5-10%
- 应急预备：3-5%`,
    output_format: JSON.stringify({
      score: 82,
      dimension_scores: {
        revenue: { score: 85, weight: 30, details: {} },
        profitability: { score: 80, weight: 25, details: {} },
        cash_flow: { score: 82, weight: 25, details: {} },
        risk: { score: 78, weight: 20, details: {} }
      },
      key_metrics: { total_revenue: 7680, gross_margin: 28.4, irr: 35, payback_months: 5, moic: 1.2 },
      strengths: ["财务优势"],
      weaknesses: ["财务风险"],
      reasoning: "评估理由",
      recommendation: "建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 1,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2500 }),
    icon: "fas fa-chart-line",
    icon_color: "#F59E0B"
  },

  // ============================================
  // 中环智能体2: 运营能力打分智能体
  // ============================================
  {
    id: "operational-capability-agent",
    name: "运营能力打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "运营水平",
    weight: 20,
    description: "评估运营方的运营能力、行业经验、团队实力和执行力",
    system_prompt: `你是滴灌通投资平台的运营能力评估智能体。你需要评估运营方是否具备成功执行项目的能力。

## 评估维度

### 1. 行业经验（30%）
- 团队从业年限
- 类似项目经验
- 成功案例数量和质量
- 失败案例及反思

### 2. 团队实力（25%）
- 核心团队稳定性
- 关键岗位配置完整性
- 专业资质认证
- 行业人脉资源

### 3. 执行能力（25%）
- 项目管理能力
- 供应链管理能力
- 危机处理能力
- 历史履约记录

### 4. 市场能力（20%）
- 客户获取能力
- 品牌运营能力
- 营销渠道资源
- 市场敏感度

## 演唱会项目特殊考量
- 艺人资源和谈判能力
- 大型活动组织经验
- 票务销售渠道
- 安保和应急预案能力`,
    evaluation_criteria: JSON.stringify({
      dimensions: {
        industry_experience: { weight: 30, items: ["从业年限", "项目数量", "项目规模", "成功率"] },
        team_strength: { weight: 25, items: ["核心团队", "岗位配置", "资质认证", "人脉资源"] },
        execution_capability: { weight: 25, items: ["项目管理", "供应链", "危机处理", "履约记录"] },
        market_capability: { weight: 20, items: ["获客能力", "品牌运营", "渠道资源", "市场敏感度"] }
      }
    }),
    knowledge_base: `# 运营能力评估知识库

## 一、演唱会运营方评估标准

### 必备能力（缺一扣分）
1. **涉外演出资质**：是否有涉外演出经营许可
2. **大型活动经验**：是否组织过5000人以上活动
3. **艺人关系**：是否有国际艺人合作经验
4. **票务渠道**：是否有成熟的票务销售渠道

### 评分细则

#### 行业经验（30分）
- 10年以上：30分
- 5-10年：25分
- 3-5年：20分
- 1-3年：15分
- 1年以下：10分

#### 类似项目
- 国际艺人大型演唱会5场以上：满分
- 3-5场：-5分
- 1-2场：-10分
- 无经验：-15分`,
    output_format: JSON.stringify({
      score: 78,
      dimension_scores: {
        industry_experience: { score: 85, assessment: "评估说明" },
        team_strength: { score: 80, assessment: "评估说明" },
        execution_capability: { score: 75, assessment: "评估说明" },
        market_capability: { score: 70, assessment: "评估说明" }
      },
      key_findings: ["发现"],
      risks: ["风险"],
      reasoning: "评估理由"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 2,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-gears",
    icon_color: "#8B5CF6"
  },

  // ============================================
  // 中环智能体3: 法律合规打分智能体
  // ============================================
  {
    id: "legal-compliance-agent",
    name: "法律合规打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "合规性",
    weight: 15,
    description: "评估标的的法律合规性，包括资质证照、合同完整性、知识产权等",
    system_prompt: `你是滴灌通投资平台的法律合规评估智能体。你需要从法律角度评估投资标的的合规性和法律风险。

## 评估维度

### 1. 主体资质（30%）
- 营业执照有效性
- 经营范围合规性
- 必要行业资质
- 股东结构清晰度

### 2. 合同完整性（30%）
- 核心商业合同是否完备
- 权责划分是否清晰
- 违约条款是否明确
- 争议解决机制

### 3. 知识产权（20%）
- 商标/品牌权属
- 版权授权合规
- 侵权风险评估

### 4. 监管合规（20%）
- 行业监管要求
- 税务合规
- 劳动合规

## 演唱会项目特殊审查
- 文旅部涉外演出批文
- 艺人演出合同
- 场馆租赁合同
- 保险合同完备性
- 公安备案状态`,
    evaluation_criteria: JSON.stringify({
      required_documents: {
        "light-asset": [
          "涉外演出批文",
          "艺人演出合同",
          "场馆租赁合同",
          "演出取消险保单",
          "公众责任险保单",
          "公安备案回执"
        ]
      },
      compliance_items: ["营业执照", "经营范围", "行业资质", "税务登记"]
    }),
    knowledge_base: `# 法律合规审查知识库

## 一、涉外演出法律要点

### 必须取得的批文/许可

1. **涉外演出批文**
   - 审批机关：文化和旅游部
   - 申请时间：演出前3个月
   - 有效期：单次演出有效

2. **大型活动安保备案**
   - 审批机关：公安部门
   - 申请时间：演出前30天
   - 需提交：安保方案、应急预案

3. **消防安全审批**
   - 审批机关：消防部门
   - 需提交：场地消防方案

### 合同审查要点

#### 艺人演出合同
- 演出时间和场次
- 演出费用和支付方式
- 取消/延期条款
- 不可抗力条款
- 违约责任

#### 场馆租赁合同
- 租赁档期
- 租金和押金
- 设备设施条款
- 提前解约条款`,
    output_format: JSON.stringify({
      score: 75,
      dimension_scores: {
        entity_qualification: { score: 80, details: [] },
        contract_completeness: { score: 75, details: [] },
        intellectual_property: { score: 70, details: [] },
        regulatory_compliance: { score: 75, details: [] }
      },
      compliance_checklist: [{ item: "项目", status: "合规/待办/风险", detail: "说明" }],
      legal_risks: ["风险项"],
      reasoning: "评估理由"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 3,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-scale-balanced",
    icon_color: "#3B82F6"
  },

  // ============================================
  // 中环智能体4: 风险控制打分智能体
  // ============================================
  {
    id: "risk-control-agent",
    name: "风险控制打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "风险控制",
    weight: 15,
    description: "识别和评估项目的各类风险，评估风险控制措施的有效性",
    system_prompt: `你是滴灌通投资平台的风险评估智能体。你需要全面识别项目风险，并评估现有风控措施的有效性。

## 风险评估框架

### 1. 市场风险（25%）
- 需求不确定性
- 竞争风险
- 价格波动风险

### 2. 运营风险（25%）
- 执行失败风险
- 供应链风险
- 人员风险

### 3. 财务风险（25%）
- 资金链风险
- 成本超支风险
- 回款风险

### 4. 外部风险（25%）
- 政策风险
- 不可抗力
- 声誉风险

## 风险评级标准
- 评估每个风险的：发生概率、影响程度、缓释措施有效性
- 综合评分 = 100 - 风险扣分`,
    evaluation_criteria: JSON.stringify({
      risk_categories: ["market", "operational", "financial", "external"],
      severity_levels: { low: 5, medium: 10, high: 20, critical: 30 },
      mitigation_effectiveness: { fully_mitigated: 0.2, partially_mitigated: 0.5, unmitigated: 1.0 }
    }),
    knowledge_base: `# 风险控制知识库

## 一、演唱会项目风险清单

### 高风险项（需重点关注）

1. **艺人取消风险**
   - 发生概率：中（10-20%）
   - 影响程度：严重
   - 缓释措施：演出取消险
   - 评估要点：保险覆盖范围、免赔条款

2. **票房不达预期**
   - 发生概率：中
   - 影响程度：重大
   - 缓释措施：敏感性分析、分城分散风险
   - 评估要点：预售情况、市场反馈

3. **审批风险**
   - 发生概率：低（如无负面因素）
   - 影响程度：严重
   - 缓释措施：提前申请、合规审查

### 中风险项

1. **成本超支**
   - 缓释：预算缓冲（应急费用）

2. **安全事故**
   - 缓释：安保方案、公众责任险

3. **舆情风险**
   - 缓释：公关预案`,
    output_format: JSON.stringify({
      score: 80,
      risk_matrix: [{ risk: "风险名称", probability: "low/medium/high", impact: "low/medium/high", mitigation: "缓释措施", residual_risk: "low/medium/high" }],
      top_risks: ["最高风险"],
      mitigation_assessment: { effectiveness: "评估" },
      overall_risk_level: "low/medium/high",
      reasoning: "评估理由"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 4,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-shield-halved",
    icon_color: "#EF4444"
  },

  // ============================================
  // 中环智能体5: 利益一致性深度打分智能体
  // ============================================
  {
    id: "interest-deep-agent",
    name: "利益一致性深度打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "利益匹配",
    weight: 10,
    description: "深度评估利益绑定机制的有效性，量化分析利益分配的合理性",
    system_prompt: `你是滴灌通投资平台的利益一致性深度评估智能体。在外环初筛通过的基础上，你需要进行更深入的量化分析。

## 深度评估要点

### 1. 利益绑定强度量化（30%）
- 运营方投入占比 = 运营方投入 / 项目总投入
- 劣后承担比例
- 收益激励系数

### 2. 分配机制合理性（30%）
- 投资方保底收益是否合理
- 超额分配比例是否激励运营方
- 分配触发条件是否清晰

### 3. 监督机制有效性（20%）
- 财务信息披露频率
- 资金监管强度
- 违约惩罚力度

### 4. 退出机制完备性（20%）
- 正常退出路径
- 违约处理流程
- 纠纷解决机制`,
    evaluation_criteria: JSON.stringify({
      quantitative_metrics: {
        operator_investment_ratio: { excellent: 0.3, good: 0.2, acceptable: 0.1 },
        subordination_level: { full: 100, partial: 70, none: 30 }
      }
    }),
    knowledge_base: `# 利益一致性深度分析知识库

## Cardi B项目利益结构分析

### 投入结构
- 投资方（滴灌通）：3000万元（84%）
- 运营方（星耀文化）：580万元（16%）
  - 现金：80万
  - 资源折算：500万（艺人关系、渠道资源）

### 分配瀑布
1. 成本支出：5500万
2. 投资方本金：3000万
3. 投资方保底收益：450万（15%年化）
4. 超额利润分配：投资方20%，运营方80%

### 量化指标
- 运营方投入占比：16%（合格）
- 保底收益率：15%（行业中等偏上）
- 超额分配比例：2/8（运营方激励充足）`,
    output_format: JSON.stringify({
      score: 85,
      quantitative_analysis: {
        operator_investment_ratio: 0.16,
        guaranteed_return_rate: 0.15,
        excess_split: { investor: 0.2, operator: 0.8 }
      },
      binding_strength_score: 80,
      distribution_fairness_score: 88,
      supervision_effectiveness_score: 85,
      exit_mechanism_score: 82,
      reasoning: "评估理由"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 5,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-handshake-angle",
    icon_color: "#10B981"
  },

  // ============================================
  // 中环智能体6: 经济性测算打分智能体
  // ============================================
  {
    id: "economic-calculation-agent",
    name: "经济性测算打分智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "投资价值",
    weight: 10,
    description: "计算投资的经济性指标，包括IRR、NPV、回收期等，评估投资价值",
    system_prompt: `你是滴灌通投资平台的经济性测算智能体。你需要基于财务数据，计算关键经济性指标并评估投资价值。

## 核心计算指标

### 1. IRR（内部收益率）
- 计算投资的年化收益率
- 与基准收益率（15%）对比

### 2. NPV（净现值）
- 使用10%折现率
- 计算投资净价值

### 3. 回收期
- 静态回收期（月）
- 动态回收期（月）

### 4. MOIC（投资回报倍数）
- 总回报 / 总投入

## 评分标准
- IRR > 35%: 90-100分
- IRR 25-35%: 75-89分
- IRR 15-25%: 60-74分
- IRR < 15%: 60分以下`,
    evaluation_criteria: JSON.stringify({
      irr_benchmarks: { excellent: 35, good: 25, acceptable: 15 },
      npv_positive_required: true,
      payback_max_months: 12
    }),
    knowledge_base: `# 经济性测算知识库

## Cardi B项目经济性分析

### 投资回报计算

**投资方视角**
- 投资金额：3000万
- 本金回收：3000万
- 保底收益：450万（15%）
- 超额分成：146万（预计）
- 总回报：3596万
- MOIC：1.2x
- IRR：约35%（5个月周期）
- 回收期：5个月

### 敏感性分析

| 场景 | 上座率 | 票房 | IRR | MOIC |
|------|--------|------|-----|------|
| 乐观 | 100% | 7800万 | 50% | 1.35x |
| 基准 | 92% | 7200万 | 35% | 1.20x |
| 保守 | 80% | 6300万 | 20% | 1.10x |
| 悲观 | 70% | 5500万 | 8% | 1.03x |

### 评估结论
- IRR 35% > 基准 15%：优秀
- 回收期 5月 < 12月：优秀
- 即使悲观情况也能保本`,
    output_format: JSON.stringify({
      score: 88,
      economic_metrics: { irr: 35, npv: 596, payback_months: 5, moic: 1.2 },
      scenario_analysis: {
        optimistic: { irr: 50, moic: 1.35 },
        base: { irr: 35, moic: 1.2 },
        pessimistic: { irr: 20, moic: 1.1 }
      },
      sensitivity_analysis: { break_even_occupancy: 0.65 },
      reasoning: "评估理由",
      recommendation: "建议"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 6,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.2, max_tokens: 2000 }),
    icon: "fas fa-calculator",
    icon_color: "#F59E0B"
  },

  // ============================================
  // 中环智能体7: 综合评分排序智能体
  // ============================================
  {
    id: "comprehensive-scoring-agent",
    name: "综合评分排序智能体",
    ring_type: "inner",
    industry: "all",
    dimension: "综合评估",
    weight: 5,
    description: "汇总所有智能体评分，按权重计算综合得分，生成最终投资建议",
    system_prompt: `你是滴灌通投资平台的综合评分智能体。你需要汇总所有中环智能体的评估结果，计算加权综合评分，并生成最终投资建议。

## 加权评分公式

综合评分 = Σ(各维度评分 × 权重) × 0.95 + 综合调整分 × 0.05

默认权重配置：
- 财务健康度：25%
- 运营能力：20%
- 法律合规：15%
- 风险控制：15%
- 利益一致性：10%
- 经济性测算：10%
- 综合调整：5%

## 评级标准
- A级（85-100分）：强烈推荐投资
- B+级（75-84分）：推荐投资
- B级（65-74分）：可以投资，需关注风险
- C级（60-64分）：谨慎投资
- D级（<60分）：不建议投资

## 输出要求
1. 计算加权综合评分
2. 确定评级（A/B+/B/C/D）
3. 列出Top 3优势
4. 列出Top 3风险
5. 给出明确的投资建议
6. 提出关键监控指标`,
    evaluation_criteria: JSON.stringify({
      weights: { financial: 25, operational: 20, legal: 15, risk: 15, interest: 10, economic: 10, adjustment: 5 },
      grade_thresholds: { A: 85, "B+": 75, B: 65, C: 60 }
    }),
    knowledge_base: `# 综合评分知识库

## 评级说明

### A级（85-100分）
- 投资价值明确
- 风险可控
- 团队能力强
- 建议：积极投资

### B+级（75-84分）
- 整体良好
- 有一定风险点需关注
- 建议：推荐投资，设置监控

### B级（65-74分）
- 基本面可接受
- 存在明显风险
- 建议：可投资，加强风控

### C级（60-64分）
- 边缘案例
- 风险较高
- 建议：谨慎投资，需要额外条件

### D级（<60分）
- 不符合投资标准
- 建议：不投资`,
    output_format: JSON.stringify({
      final_score: 81,
      grade: "B+",
      dimension_summary: {
        financial: { score: 82, weight: 25 },
        operational: { score: 78, weight: 20 },
        legal: { score: 75, weight: 15 },
        risk: { score: 80, weight: 15 },
        interest: { score: 85, weight: 10 },
        economic: { score: 88, weight: 10 }
      },
      top_strengths: ["优势1", "优势2", "优势3"],
      top_risks: ["风险1", "风险2", "风险3"],
      recommendation: "invest/conditional_invest/reject",
      recommendation_detail: "详细投资建议文字",
      key_monitoring_points: ["监控点1", "监控点2"],
      confidence_level: "high/medium/low"
    }),
    pass_threshold: 60,
    is_enabled: 1,
    execution_order: 7,
    model_config: JSON.stringify({ model: "gpt-5-mini", temperature: 0.3, max_tokens: 3000 }),
    icon: "fas fa-ranking-star",
    icon_color: "#8B5CF6"
  }
]
