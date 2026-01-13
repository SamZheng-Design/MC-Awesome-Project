// Cardi B演唱会项目种子数据
// DGT Intelligence Platform - Cardi B Concert Deal Seed Data

export const cardiBDeal = {
  id: "DGT-2026-CARDIB",
  company_name: "星耀文化传媒有限公司",
  credit_code: "91110000MA00XXXXX0",
  industry: "light-asset",
  status: "evaluation",
  main_business: `大型演唱会策划运营，专注于国际艺人中国巡演项目。公司成立于2015年，拥有9年以上大型演出组织经验，成功操盘过多个国际艺人中国演唱会项目，包括韩国顶流偶像团体中国巡演、欧美独立音乐人专场等。核心团队来自知名演出公司，具备完整的涉外演出资质和丰富的国际艺人合作经验。`,
  funding_amount: 3000,
  contact_name: "陈经理",
  contact_phone: "13900139000",
  website: "https://xingyao-culture.com",
  submitted_date: "2026-01-10T10:00:00.000Z",
  project_documents: `【项目名称】Cardi B 2026中国巡回演唱会

【艺人介绍】
Cardi B（本名：Belcalis Marlenis Almánzar），美国著名说唱歌手、词曲作者。

艺人成就：
- 格莱美最佳说唱专辑获得者（2019年，《Invasion of Privacy》）
- Billboard Hot 100冠军单曲：Bodak Yellow、I Like It、WAP等
- 全球唱片销量超过1亿
- Instagram粉丝1.6亿，YouTube总播放量超过百亿
- 福布斯100位最具影响力女性

代表作品：Bodak Yellow、I Like It、WAP、Up、Money、Press

【巡演安排】
巡演城市（三城联动）：
1. 杭州站：杭州奥体中心体育馆（容量20000人）
2. 深圳站：深圳大运中心体育馆（容量25000人）
3. 成都站：成都凤凰山体育公园（容量22000人）

演出档期：2026年5月-6月（具体日期待艺人确认）

【市场分析】
参考案例：Travis Scott 2024三亚站
- 场馆容量：1.8万人
- 开票时间：3分钟内售罄
- 二级市场溢价：300%以上
- 说明国际说唱艺人在中国市场具有强劲需求

Cardi B中国市场热度：
- 微博话题阅读量：超过50亿
- 抖音相关视频播放：超过100亿
- 首次中国巡演，稀缺性极强

【项目亮点】
1. 稀缺性：Cardi B首次中国巡演，市场期待度极高
2. 分散风险：三城联动，单城风险可控
3. 团队经验：运营方具备国际艺人操盘经验
4. 合规保障：已获得文旅部涉外演出批文
5. 财务健康：预期IRR 35%，回收期5个月

【运营方介绍】
星耀文化传媒有限公司：
- 成立时间：2015年
- 从业年限：9年+
- 涉外演出资质：有
- 过往项目：国际艺人演唱会5场+，大型音乐节10+场
- 项目成功率：90%+

【核心团队】
- CEO：15年演出行业经验
- 制作总监：10年大型活动经验
- 票务总监：原大麦网区域负责人
- 艺人对接：有国际经纪公司合作关系

【渠道资源】
- 票务：大麦网、猫眼、票星球直连
- 赞助：有品牌赞助商库
- 媒体：主流娱乐媒体合作关系`,
  financial_data: JSON.stringify({
    project_type: "concert_tour",
    investment_amount: 3000,
    investment_currency: "CNY",
    investment_unit: "万元",
    revenue_forecast: {
      total: 7680,
      unit: "万元",
      breakdown: {
        ticket_sales: 7200,
        sponsorship: 300,
        merchandise: 180
      },
      by_city: {
        hangzhou: {
          venue: "杭州奥体中心",
          capacity: 20000,
          ticket_price_avg: 1200,
          occupancy_rate: 0.95,
          ticket_revenue: 2280
        },
        shenzhen: {
          venue: "深圳大运中心",
          capacity: 25000,
          ticket_price_avg: 1300,
          occupancy_rate: 0.92,
          ticket_revenue: 2990
        },
        chengdu: {
          venue: "成都凤凰山",
          capacity: 22000,
          ticket_price_avg: 1100,
          occupancy_rate: 0.90,
          ticket_revenue: 2178
        }
      }
    },
    cost_structure: {
      total: 5500,
      unit: "万元",
      breakdown: {
        artist_fee: { amount: 2800, percentage: 51, note: "含艺人出场费、团队差旅、技术rider" },
        venue_rental: { amount: 600, percentage: 11, note: "三城场馆租赁费用" },
        production: { amount: 900, percentage: 16, note: "舞台搭建、灯光音响、视觉制作" },
        marketing: { amount: 700, percentage: 13, note: "媒体投放、KOL合作、线下宣传" },
        operations: { amount: 300, percentage: 5, note: "票务、安保、现场运营" },
        contingency: { amount: 200, percentage: 4, note: "应急预备金" }
      }
    },
    profit_distribution: {
      gross_profit: 2180,
      distribution_waterfall: [
        { order: 1, item: "operating_costs", description: "运营成本支付", amount: 5500 },
        { order: 2, item: "investor_principal", description: "投资方本金回收", amount: 3000 },
        { order: 3, item: "investor_guaranteed_return", description: "投资方保底收益", rate: 0.15, amount: 450 },
        { order: 4, item: "excess_profit_split", description: "超额利润分配", investor_share: 0.2, operator_share: 0.8, estimated_excess: 730, investor_excess: 146, operator_excess: 584 }
      ],
      investor_return: {
        principal: 3000,
        guaranteed_return: 450,
        excess_share: 146,
        total_return: 3596,
        roi: 0.199,
        irr_estimate: 0.35,
        payback_months: 5
      }
    },
    operator_investment: {
      cash: 80,
      resources_valuation: 500,
      resources_detail: ["艺人关系渠道", "票务销售渠道", "供应商资源", "媒体合作关系"],
      total: 580,
      percentage_of_total: 0.16
    },
    sensitivity_analysis: {
      scenarios: [
        { name: "乐观", occupancy: 1.0, revenue: 7800, irr: 0.50, moic: 1.35 },
        { name: "基准", occupancy: 0.92, revenue: 7200, irr: 0.35, moic: 1.20 },
        { name: "保守", occupancy: 0.80, revenue: 6300, irr: 0.20, moic: 1.10 },
        { name: "悲观", occupancy: 0.70, revenue: 5500, irr: 0.08, moic: 1.03 }
      ],
      break_even_occupancy: 0.65
    },
    risk_mitigation: {
      cancellation_insurance: { coverage: 3000, premium: 150, note: "演出取消险" },
      liability_insurance: { coverage_per_show: 1000, premium: 50, note: "公众责任险" },
      deposit_mechanism: { operator_deposit: 200, note: "运营方保证金" }
    }
  }),
  total_score: null,
  score_financial: null,
  score_operational: null,
  score_legal: null,
  score_risk: null,
  score_interest: null,
  score_economic: null,
  evaluation_details: null,
  final_recommendation: null,
  result: "pending"
}

export const workflowConfig = {
  id: "workflow-standard",
  name: "标准投资筛选工作流",
  version: "v1.0.0",
  status: "active",
  outer_agents: JSON.stringify(["negative-list-agent", "touch-agent", "interest-alignment-agent"]),
  inner_agents: JSON.stringify(["financial-health-agent", "operational-capability-agent", "legal-compliance-agent", "risk-control-agent", "interest-deep-agent", "economic-calculation-agent", "comprehensive-scoring-agent"]),
  scoring_formula: "final_score = (financial × 0.25) + (operational × 0.20) + (legal × 0.15) + (risk × 0.15) + (interest × 0.10) + (economic × 0.10) + (adjustment × 0.05)",
  pass_criteria: JSON.stringify({
    outer_ring: "ALL agents must pass",
    inner_ring: "weighted_average >= 60",
    final_decision: {
      strong_recommend: { min_score: 85, label: "A级-强烈推荐" },
      recommend: { min_score: 75, label: "B+级-推荐投资" },
      conditional: { min_score: 65, label: "B级-可投资" },
      cautious: { min_score: 60, label: "C级-谨慎投资" },
      reject: { min_score: 0, label: "D级-不建议投资" }
    }
  }),
  execution_mode: JSON.stringify({
    outer_ring: "sequential",
    inner_ring: "parallel",
    comprehensive: "after_all_inner_complete"
  }),
  execution_count: 0,
  success_rate: 0,
  avg_duration: 0
}
