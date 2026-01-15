// 滴灌通标的种子数据 - 创新领域版（20个新增标的）
// DGT Intelligence Platform - Innovative Deals Seed Data
// 基于国际Revenue Sharing模式设计，探索非实体门店的收入分成机会

/**
 * 创新标的设计原则（参考国际Revenue Sharing模式）：
 * - 跳出传统实体门店，探索数字经济、新能源、IP、票务等领域
 * - 参考国际案例：Pipe（SaaS收入分成）、Clearco（电商收入分成）、Royalty Exchange（版权分成）
 * - 覆盖：票务/演出、抖音投流、充电桩、SaaS订阅、IP授权、MCN、知识付费、新能源等
 * - 关键可行性：现金流可追踪、收入可预测、第三方监管
 */

// ============================================
// 标的31：票务-演唱会巡演（全国/按场次分成）
// ============================================
export const deal_31_concert = {
  id: "DGT-2026-031",
  company_name: "薛之谦2026巡回演唱会（华东站）",
  credit_code: "91110000MA01CONC31",
  industry: "entertainment",
  industry_sub: "演唱会票务",
  status: "pending",
  region: "华东",
  city: "上海/杭州/南京",
  district: "多城巡演",
  
  main_business: `薛之谦是华语乐坛顶级歌手，2024年巡演全国票房超8亿。本项目为2026年华东三城巡演（上海、杭州、南京），预计6场演出，场均票房3500万+。投资人按票房收入分成，由大麦网实时结算，演出保险全覆盖。`,
  
  funding_amount: 500,
  funding_purpose: "演出制作（200万）+ 场地租赁（150万）+ 宣发推广（100万）+ 保证金（50万）",
  investment_period_months: 8,
  revenue_share_ratio: 0.03,
  cashflow_frequency: "weekly",
  
  contact_name: "陈总监",
  contact_phone: "13900000031",
  website: "https://www.damai.cn",
  submitted_date: "2026-01-16T09:00:00.000Z",
  
  project_documents: `【项目名称】薛之谦2026华东巡演收入分成项目

【艺人介绍】
薛之谦，华语流行歌手，代表作《演员》《认真的雪》《丑八怪》等。
- 微博粉丝：7200万+
- 抖音粉丝：4500万+
- 2024年巡演票房：8.2亿元
- 巡演场次：32场
- 平均上座率：98%+

【巡演计划】
- 城市：上海（2场）、杭州（2场）、南京（2场）
- 场馆：上海体育场、杭州奥体中心、南京奥体中心
- 时间：2026年4月-6月
- 单场座位：35000-45000座
- 票价区间：380-1680元

【收入测算】
- 单场平均票房：3800万元
- 6场总票房预估：2.28亿元
- 扣除成本后净收入：1.6亿元

【收入分成机制】
1. 分成来源：票房总收入（大麦网实时数据）
2. 分成比例：3%
3. 分成频率：每场演出后T+7结算
4. 监管方式：大麦网+银行三方共管账户
5. 保障措施：演出取消险、公众责任险

【投资回报测算】
- 投资金额：500万元
- 预期分成收入：2.28亿 × 3% = 684万元
- 预期IRR：约37%
- 回本周期：约6个月

【风险提示】
1. 演出风险：如遇不可抗力取消，有演出取消险赔付
2. 票房风险：薛之谦票房稳定，历史上座率98%+
3. 政策风险：需关注演出审批政策`,

  financial_data: JSON.stringify({
    project_type: "entertainment_tour",
    investment_amount: 500,
    investment_period_months: 8,
    revenue_share_ratio: 0.03,
    cashflow_frequency: "weekly",
    tour_metrics: { cities: 3, shows: 6, avg_capacity: 40000, avg_ticket_price: 950 },
    revenue_data: { per_show_revenue: 38000000, total_revenue: 228000000, gross_margin: 0.70, net_margin: 0.35 },
    investment_return: { total_share_income: 6840000, moic: 1.37, irr_estimate: 0.37 }
  }),
  
  result: "pending"
};

// ============================================
// 标的32：抖音投流-服装品牌ROI分成（广州/每周分成）
// ============================================
export const deal_32_douyin_fashion = {
  id: "DGT-2026-032",
  company_name: "UR快时尚抖音投流项目",
  credit_code: "91440100MA5LDOUY32",
  industry: "douyin-ads",
  industry_sub: "抖音投流-服装",
  status: "pending",
  region: "广东",
  city: "广州",
  district: "抖音电商",
  
  main_business: `UR是中国本土快时尚领导品牌，2024年抖音GMV超15亿。本项目为UR 2026春夏系列抖音投流，投资用于信息流广告投放，按ROI分成。巨量引擎实时数据监控，确保投放效果可追踪。`,
  
  funding_amount: 200,
  funding_purpose: "抖音信息流广告投放（180万）+ 素材制作（20万）",
  investment_period_months: 6,
  revenue_share_ratio: 0.15,
  cashflow_frequency: "weekly",
  
  contact_name: "林经理",
  contact_phone: "13900000032",
  website: "https://www.ur.cn",
  submitted_date: "2026-01-16T10:00:00.000Z",
  
  project_documents: `【项目名称】UR快时尚抖音投流收入分成项目

【品牌介绍】
UR（URBAN REVIVO）创立于2006年广州，是中国本土快时尚领导品牌。
- 全国门店数量：300+
- 2024年总营收：80亿+
- 抖音GMV：15亿+
- 抖音粉丝：850万
- 平均客单价：280元

【投流计划】
- 投放平台：抖音信息流+千川
- 投放周期：2026年2月-7月（春夏季）
- 日均预算：1万元
- 目标ROI：3.5+
- 素材类型：达人种草+品牌自播

【收入分成机制】
1. 分成来源：投流带来的GMV
2. 分成比例：15%（基于净利润）
3. 分成频率：每周结算
4. 数据监控：巨量引擎后台实时数据
5. 保障措施：ROI低于2.5时自动止损

【投资回报测算】
- 投资金额：200万元
- 预期投流GMV：200万 × 3.5 = 700万元
- 净利润（25%）：175万元
- 投资人分成：175万 × 15% = 262.5万元
- 预期IRR：约32%`,

  financial_data: JSON.stringify({
    project_type: "douyin_ads",
    investment_amount: 200,
    investment_period_months: 6,
    revenue_share_ratio: 0.15,
    cashflow_frequency: "weekly",
    ads_metrics: { daily_budget: 10000, target_roi: 3.5, platform: "抖音千川" },
    revenue_data: { expected_gmv: 7000000, gross_margin: 0.50, net_margin: 0.25, share_base: "net_profit" },
    investment_return: { total_share_income: 2625000, moic: 1.31, irr_estimate: 0.32 }
  }),
  
  result: "pending"
};

// ============================================
// 标的33：充电桩-高速服务区（京沪高速/每日分成）
// ============================================
export const deal_33_ev_charging = {
  id: "DGT-2026-033",
  company_name: "特来电京沪高速充电站（10站打包）",
  credit_code: "91370200MA3NCHGE33",
  industry: "new-energy",
  industry_sub: "充电桩运营",
  status: "pending",
  region: "华东",
  city: "京沪沿线",
  district: "高速服务区",
  
  main_business: `特来电是中国充电桩运营龙头（A股上市），本项目为京沪高速沿线10个服务区充电站打包投资。每站配备8个120kW快充桩，日均充电量稳定。按充电服务费分成，国网实时结算。`,
  
  funding_amount: 300,
  funding_purpose: "充电设备采购（200万）+ 安装施工（60万）+ 运维储备（40万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.20,
  cashflow_frequency: "daily",
  
  contact_name: "王总",
  contact_phone: "13900000033",
  website: "https://www.teld.cn",
  submitted_date: "2026-01-16T11:00:00.000Z",
  
  project_documents: `【项目名称】特来电京沪高速充电站收入分成项目

【品牌介绍】
特来电是中国充电桩运营龙头企业，青岛特锐德旗下（A股上市）。
- 全国充电桩数量：52万+
- 覆盖城市：360+
- 日充电量：8000万度+
- 市场份额：约28%

【项目信息】
- 位置：京沪高速沿线10个服务区
- 单站配置：8个120kW直流快充桩
- 总桩数：80个
- 投运时间：2025年已投运
- 日均单桩充电量：180度
- 充电服务费：0.6元/度

【收入测算】
- 日均充电量：80桩 × 180度 = 14400度
- 日均服务费收入：14400 × 0.6 = 8640元
- 月均收入：25.92万元
- 年收入：311万元

【收入分成机制】
1. 分成来源：充电服务费收入
2. 分成比例：20%
3. 分成频率：T+1日结算
4. 数据监控：特来电APP+国网平台
5. 保障措施：设备质保5年

【投资回报测算】
- 投资金额：300万元
- 年分成收入：311万 × 20% = 62.2万元
- 预期IRR：约21%
- 回本周期：约4.8年`,

  financial_data: JSON.stringify({
    project_type: "ev_charging",
    investment_amount: 300,
    investment_period_months: 36,
    revenue_share_ratio: 0.20,
    cashflow_frequency: "daily",
    station_metrics: { stations: 10, chargers_per_station: 8, power_kw: 120, service_fee: 0.6 },
    revenue_data: { daily_kwh_per_charger: 180, daily_revenue: 8640, monthly_revenue: 259200, annual_revenue: 3110400 },
    investment_return: { annual_share_income: 622080, moic: 0.21, irr_estimate: 0.21 }
  }),
  
  result: "pending"
};

// ============================================
// 标的34：SaaS订阅-企业服务（深圳/每月分成）
// ============================================
export const deal_34_saas = {
  id: "DGT-2026-034",
  company_name: "有赞电商SaaS订阅收入分成",
  credit_code: "91330100MA2HSAAS34",
  industry: "tech",
  industry_sub: "SaaS订阅",
  status: "pending",
  region: "浙江",
  city: "杭州",
  district: "SaaS服务",
  
  main_business: `有赞是中国领先的电商SaaS服务商（港股上市），为商家提供微商城、小程序、直播等解决方案。本项目按有赞新签约商户的SaaS订阅收入分成，对标国际Pipe模式。ARR可预测，续费率高。`,
  
  funding_amount: 400,
  funding_purpose: "商户拓展（250万）+ 客户成功（100万）+ 运营储备（50万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "monthly",
  
  contact_name: "孙总监",
  contact_phone: "13900000034",
  website: "https://www.youzan.com",
  submitted_date: "2026-01-16T12:00:00.000Z",
  
  project_documents: `【项目名称】有赞电商SaaS订阅收入分成项目

【公司介绍】
有赞创立于2012年，港股上市公司，是中国领先的电商SaaS服务商。
- 付费商家数量：10万+
- ARR（年度经常性收入）：15亿+
- 续费率：75%+
- 客单价：1.5万/年
- 服务商家GMV：超1000亿

【项目模式】
参考国际Pipe模式（2021年获YC投资，估值20亿美元），为SaaS公司提供基于ARR的收入分成融资。

【分成来源】
- 目标商户：500家新签约中小商户
- 平均客单价：1.2万/年
- 预期总ARR：600万/年
- 续费率预估：70%

【收入分成机制】
1. 分成来源：目标商户群的SaaS订阅收入
2. 分成比例：8%
3. 分成周期：24个月
4. 分成频率：每月结算
5. 数据监控：有赞后台系统
6. 保障措施：优先受偿权

【投资回报测算】
- 投资金额：400万元
- 24个月ARR总额：600万 × 2 × 0.85（考虑续费）= 1020万元
- 投资人分成：1020万 × 8% = 81.6万元/两年
- 年化分成：40.8万元
- 预期IRR：约10%`,

  financial_data: JSON.stringify({
    project_type: "saas_subscription",
    investment_amount: 400,
    investment_period_months: 24,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "monthly",
    saas_metrics: { target_merchants: 500, avg_arpu: 12000, renewal_rate: 0.70 },
    revenue_data: { year1_arr: 6000000, year2_arr: 4200000, total_arr: 10200000 },
    investment_return: { total_share_income: 816000, moic: 0.20, irr_estimate: 0.10 }
  }),
  
  result: "pending"
};

// ============================================
// 标的35：MCN-达人孵化收入分成（杭州/每月分成）
// ============================================
export const deal_35_mcn = {
  id: "DGT-2026-035",
  company_name: "无忧传媒达人孵化计划（10人组合）",
  credit_code: "91330100MA2NMCN035",
  industry: "entertainment",
  industry_sub: "MCN达人孵化",
  status: "pending",
  region: "浙江",
  city: "杭州",
  district: "MCN产业",
  
  main_business: `无忧传媒是中国头部MCN机构，签约达人超2万人。本项目为10名潜力达人孵化计划，投资用于内容制作、流量投放、商务拓展。按达人直播带货GMV+广告收入分成。`,
  
  funding_amount: 150,
  funding_purpose: "内容制作（50万）+ 流量投放（60万）+ 商务拓展（40万）",
  investment_period_months: 18,
  revenue_share_ratio: 0.12,
  cashflow_frequency: "monthly",
  
  contact_name: "赵经理",
  contact_phone: "13900000035",
  website: "https://www.wuyoucm.com",
  submitted_date: "2026-01-16T13:00:00.000Z",
  
  project_documents: `【项目名称】无忧传媒达人孵化收入分成项目

【公司介绍】
无忧传媒创立于2017年，是中国头部MCN机构。
- 签约达人：2万+
- 头部达人：刘畊宏、广东夫妇等
- 全平台粉丝：超20亿
- 年GMV：超500亿

【孵化计划】
- 孵化人数：10人（5男5女）
- 领域分布：美妆3人、穿搭3人、生活2人、美食2人
- 目标粉丝：单人100万+
- 孵化周期：18个月

【收入来源】
1. 直播带货GMV分成
2. 品牌广告收入
3. 星图任务收入
4. 平台激励收入

【收入分成机制】
1. 分成来源：达人总收入（GMV+广告）
2. 分成比例：12%
3. 分成频率：每月结算
4. 数据监控：MCN内部系统+平台后台

【投资回报测算】
- 投资金额：150万元
- 18个月达人总收入预估：1200万元
- 投资人分成：1200万 × 12% = 144万元
- 预期IRR：约25%`,

  financial_data: JSON.stringify({
    project_type: "mcn_incubation",
    investment_amount: 150,
    investment_period_months: 18,
    revenue_share_ratio: 0.12,
    cashflow_frequency: "monthly",
    mcn_metrics: { influencers: 10, target_followers: 1000000, categories: ["美妆", "穿搭", "生活", "美食"] },
    revenue_data: { expected_gmv: 10000000, expected_ads: 2000000, total_revenue: 12000000 },
    investment_return: { total_share_income: 1440000, moic: 0.96, irr_estimate: 0.25 }
  }),
  
  result: "pending"
};

// ============================================
// 标的36：知识付费-得到App课程（北京/每月分成）
// ============================================
export const deal_36_knowledge = {
  id: "DGT-2026-036",
  company_name: "得到App《商业洞察力》课程项目",
  credit_code: "91110000MA01KNOW36",
  industry: "education",
  industry_sub: "知识付费",
  status: "pending",
  region: "北京",
  city: "北京",
  district: "知识付费",
  
  main_business: `得到App是中国知识付费头部平台，用户超5000万。本项目为知名商业导师打造的《商业洞察力》专栏课程，课程定价199元，按销售收入分成。`,
  
  funding_amount: 80,
  funding_purpose: "课程制作（40万）+ 营销推广（30万）+ 运营服务（10万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.15,
  cashflow_frequency: "monthly",
  
  contact_name: "刘总监",
  contact_phone: "13900000036",
  website: "https://www.igetget.com",
  submitted_date: "2026-01-16T14:00:00.000Z",
  
  project_documents: `【项目名称】得到App课程收入分成项目

【平台介绍】
得到App创立于2016年，是中国知识付费头部平台。
- 注册用户：5000万+
- 付费用户：800万+
- 年营收：15亿+
- 头部课程：《薛兆丰的经济学课》等

【课程信息】
- 课程名称：《商业洞察力：看透本质的思维方式》
- 主讲人：知名商业顾问
- 课程形式：音频+文稿，52讲
- 定价：199元
- 预期销量：5万份

【收入分成机制】
1. 分成来源：课程销售收入
2. 分成比例：15%
3. 分成频率：每月结算
4. 数据监控：得到App后台

【投资回报测算】
- 投资金额：80万元
- 预期销售额：199元 × 5万份 = 995万元
- 投资人分成：995万 × 15% = 149.25万元
- 预期IRR：约40%`,

  financial_data: JSON.stringify({
    project_type: "knowledge_course",
    investment_amount: 80,
    investment_period_months: 24,
    revenue_share_ratio: 0.15,
    cashflow_frequency: "monthly",
    course_metrics: { price: 199, target_sales: 50000, lectures: 52 },
    revenue_data: { total_sales_revenue: 9950000, platform_share: 0.30, net_revenue: 6965000 },
    investment_return: { total_share_income: 1492500, moic: 1.87, irr_estimate: 0.40 }
  }),
  
  result: "pending"
};

// ============================================
// 标的37：音乐版权-华语金曲版税分成（全国/每季分成）
// ============================================
export const deal_37_music_royalty = {
  id: "DGT-2026-037",
  company_name: "华语经典金曲版税分成基金（50首）",
  credit_code: "91110000MA01MUSC37",
  industry: "entertainment",
  industry_sub: "音乐版权",
  status: "pending",
  region: "全国",
  city: "北京",
  district: "版权收益",
  
  main_business: `参考国际Royalty Exchange模式，本项目打包50首华语经典金曲的版税收益权。歌曲来自2000-2015年，版税收入稳定，由中国音著协统一结算。`,
  
  funding_amount: 600,
  funding_purpose: "版权收益权收购（550万）+ 法务费用（30万）+ 管理储备（20万）",
  investment_period_months: 60,
  revenue_share_ratio: 0.70,
  cashflow_frequency: "monthly",
  
  contact_name: "何总",
  contact_phone: "13900000037",
  website: "https://www.mcsc.com.cn",
  submitted_date: "2026-01-16T15:00:00.000Z",
  
  project_documents: `【项目名称】华语金曲版税分成基金

【项目模式】
参考国际Royalty Exchange（美国音乐版税交易平台），为投资人提供音乐版税收益分成机会。

【歌曲组合】
- 歌曲数量：50首
- 年代范围：2000-2015年
- 类型分布：流行35首、摇滚10首、民谣5首
- 代表歌曲：包含多首年度金曲
- 历史年均版税：85万元

【版税来源】
1. 数字音乐平台（QQ音乐、网易云等）
2. 公播版税（商场、酒店、餐厅）
3. 影视授权
4. 演唱会翻唱授权

【收入分成机制】
1. 分成来源：全部版税收入
2. 分成比例：70%
3. 分成周期：60个月
4. 分成频率：每月结算
5. 结算机构：中国音像著作权集体管理协会

【投资回报测算】
- 投资金额：600万元
- 5年版税总收入预估：425万元
- 投资人分成：425万 × 70% = 297.5万元
- 预期IRR：约8%（稳健型）`,

  financial_data: JSON.stringify({
    project_type: "music_royalty",
    investment_amount: 600,
    investment_period_months: 60,
    revenue_share_ratio: 0.70,
    cashflow_frequency: "monthly",
    royalty_metrics: { songs: 50, historical_annual_royalty: 850000, collection_agency: "中国音著协" },
    revenue_data: { projected_5yr_royalty: 4250000, investor_share: 2975000 },
    investment_return: { total_share_income: 2975000, moic: 0.50, irr_estimate: 0.08 }
  }),
  
  result: "pending"
};

// ============================================
// 标的38：电商代运营-天猫店铺（上海/每月分成）
// ============================================
export const deal_38_ecom_operation = {
  id: "DGT-2026-038",
  company_name: "宝尊电商代运营收入分成（3品牌组合）",
  credit_code: "91310000MA1NECOM38",
  industry: "ecommerce",
  industry_sub: "电商代运营",
  status: "pending",
  region: "上海",
  city: "上海",
  district: "电商代运营",
  
  main_business: `宝尊电商是中国最大的品牌电商服务商（美股上市），服务超300个国际品牌。本项目为3个国际美妆品牌天猫旗舰店代运营收入分成，按GMV分成。`,
  
  funding_amount: 250,
  funding_purpose: "店铺运营（150万）+ 营销投放（80万）+ 客服仓储（20万）",
  investment_period_months: 12,
  revenue_share_ratio: 0.05,
  cashflow_frequency: "monthly",
  
  contact_name: "徐总监",
  contact_phone: "13900000038",
  website: "https://www.baozun.com",
  submitted_date: "2026-01-16T16:00:00.000Z",
  
  project_documents: `【项目名称】宝尊电商代运营收入分成项目

【公司介绍】
宝尊电商创立于2007年，美股上市公司，是中国最大的品牌电商服务商。
- 服务品牌：300+
- 服务品类：美妆、时尚、3C、快消
- 年GMV：600亿+
- 头部客户：Nike、Philips、Microsoft等

【项目信息】
- 代运营品牌：3个国际美妆品牌
- 平台：天猫旗舰店
- 合作模式：服务费+GMV分成
- 年度GMV目标：8000万元

【收入分成机制】
1. 分成来源：3店铺GMV
2. 分成比例：5%
3. 分成频率：每月结算
4. 数据监控：生意参谋实时数据

【投资回报测算】
- 投资金额：250万元
- 年度GMV预估：8000万元
- 投资人分成：8000万 × 5% = 400万元
- 预期IRR：约60%`,

  financial_data: JSON.stringify({
    project_type: "ecom_operation",
    investment_amount: 250,
    investment_period_months: 12,
    revenue_share_ratio: 0.05,
    cashflow_frequency: "monthly",
    operation_metrics: { brands: 3, platform: "天猫", category: "美妆" },
    revenue_data: { target_gmv: 80000000, gross_margin: 0.60 },
    investment_return: { total_share_income: 4000000, moic: 1.60, irr_estimate: 0.60 }
  }),
  
  result: "pending"
};

// ============================================
// 标的39：光伏电站-分布式屋顶（浙江/每月分成）
// ============================================
export const deal_39_solar = {
  id: "DGT-2026-039",
  company_name: "正泰新能源分布式光伏（浙江10厂房）",
  credit_code: "91330000MA2NSOLA39",
  industry: "new-energy",
  industry_sub: "分布式光伏",
  status: "pending",
  region: "浙江",
  city: "嘉兴/湖州",
  district: "工业厂房屋顶",
  
  main_business: `正泰新能源是中国光伏行业龙头（A股上市），本项目为浙江10个工业厂房屋顶分布式光伏电站，装机容量5MW。按发电收入（自发自用+余电上网）分成。`,
  
  funding_amount: 350,
  funding_purpose: "光伏组件（250万）+ 安装施工（70万）+ 并网设备（30万）",
  investment_period_months: 60,
  revenue_share_ratio: 0.25,
  cashflow_frequency: "monthly",
  
  contact_name: "郑经理",
  contact_phone: "13900000039",
  website: "https://www.chintpower.com",
  submitted_date: "2026-01-16T17:00:00.000Z",
  
  project_documents: `【项目名称】正泰分布式光伏收入分成项目

【公司介绍】
正泰新能源是正泰集团旗下光伏龙头企业（A股上市）。
- 光伏组件产能：50GW+
- 电站装机：8GW+
- 覆盖国家：100+

【项目信息】
- 位置：浙江嘉兴、湖州10个工业园区
- 厂房面积：合计5万平米屋顶
- 装机容量：5MW
- 年发电量预估：550万度
- 电价：自用0.85元/度，上网0.4元/度
- 自用比例：70%

【收入测算】
- 自用收入：550万 × 70% × 0.85 = 327.25万元
- 上网收入：550万 × 30% × 0.4 = 66万元
- 年总收入：393.25万元

【收入分成机制】
1. 分成来源：发电收入（自用+上网）
2. 分成比例：25%
3. 分成周期：60个月
4. 分成频率：每月结算
5. 保障措施：25年组件质保

【投资回报测算】
- 投资金额：350万元
- 年分成收入：393.25万 × 25% = 98.3万元
- 预期IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "distributed_solar",
    investment_amount: 350,
    investment_period_months: 60,
    revenue_share_ratio: 0.25,
    cashflow_frequency: "monthly",
    solar_metrics: { capacity_mw: 5, rooftops: 10, annual_generation_kwh: 5500000, self_use_ratio: 0.70 },
    revenue_data: { self_use_price: 0.85, grid_price: 0.40, annual_revenue: 3932500 },
    investment_return: { annual_share_income: 983125, moic: 0.28, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 标的40：游戏联运-小程序游戏（深圳/每周分成）
// ============================================
export const deal_40_game = {
  id: "DGT-2026-040",
  company_name: "三七互娱小程序游戏联运项目",
  credit_code: "91440300MA5NGAME40",
  industry: "tech",
  industry_sub: "游戏联运",
  status: "pending",
  region: "广东",
  city: "深圳",
  district: "游戏发行",
  
  main_business: `三七互娱是中国游戏发行头部企业（A股上市），本项目为3款小程序游戏的联运发行投资。投资用于买量推广，按游戏流水分成。`,
  
  funding_amount: 180,
  funding_purpose: "买量投放（150万）+ 素材制作（20万）+ 运营服务（10万）",
  investment_period_months: 6,
  revenue_share_ratio: 0.18,
  cashflow_frequency: "weekly",
  
  contact_name: "黄总监",
  contact_phone: "13900000040",
  website: "https://www.37.com",
  submitted_date: "2026-01-17T09:00:00.000Z",
  
  project_documents: `【项目名称】三七互娱小程序游戏联运收入分成项目

【公司介绍】
三七互娱创立于2011年，A股上市公司，是中国游戏发行头部企业。
- 年流水：200亿+
- 发行游戏：100+款
- 头部产品：《斗罗大陆》《叫我大掌柜》等

【项目信息】
- 游戏数量：3款小程序游戏
- 类型：休闲+模拟经营
- 平台：微信小程序
- 投放周期：6个月
- 目标LTV：15元/用户
- 目标获客成本：8元/用户

【收入分成机制】
1. 分成来源：游戏充值流水
2. 分成比例：18%
3. 分成频率：每周结算
4. 数据监控：微信小游戏后台

【投资回报测算】
- 投资金额：180万元
- 预期获客：180万/8 = 22.5万用户
- 预期流水：22.5万 × 15 = 337.5万元
- 投资人分成：337.5万 × 18% = 60.75万元
- 预期IRR：约35%`,

  financial_data: JSON.stringify({
    project_type: "game_publishing",
    investment_amount: 180,
    investment_period_months: 6,
    revenue_share_ratio: 0.18,
    cashflow_frequency: "weekly",
    game_metrics: { games: 3, platform: "微信小程序", target_cac: 8, target_ltv: 15 },
    revenue_data: { expected_users: 225000, expected_revenue: 3375000 },
    investment_return: { total_share_income: 607500, moic: 0.34, irr_estimate: 0.35 }
  }),
  
  result: "pending"
};

// ============================================
// 标的41：票务-音乐节（成都/按场次分成）
// ============================================
export const deal_41_festival = {
  id: "DGT-2026-041",
  company_name: "草莓音乐节2026成都站",
  credit_code: "91510100MA6PFEST41",
  industry: "entertainment",
  industry_sub: "音乐节票务",
  status: "pending",
  region: "四川",
  city: "成都",
  district: "东郊记忆",
  
  main_business: `草莓音乐节是中国最大的户外音乐节品牌（摩登天空旗下），2024年全国举办15场，总票房超5亿。本项目为2026年成都站，为期3天，预计观众10万人次。`,
  
  funding_amount: 200,
  funding_purpose: "艺人费用（80万）+ 场地搭建（60万）+ 宣发推广（40万）+ 保证金（20万）",
  investment_period_months: 4,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "weekly",
  
  contact_name: "宋总监",
  contact_phone: "13900000041",
  website: "https://www.modernsky.com",
  submitted_date: "2026-01-17T10:00:00.000Z",
  
  project_documents: `【项目名称】草莓音乐节2026成都站收入分成项目

【品牌介绍】
草莓音乐节是摩登天空旗下音乐节品牌，中国最具影响力的户外音乐节。
- 创办时间：2009年
- 年均场次：15+场
- 年票房：5亿+
- 平均上座率：95%

【活动信息】
- 时间：2026年5月1日-3日（劳动节）
- 地点：成都东郊记忆
- 规模：3天，日均3万人
- 票价：单日票380元，3日通票880元
- 艺人阵容：30+组音乐人

【收入测算】
- 预计总票房：3000万元
- 赞助收入：500万元
- 周边销售：200万元
- 总收入：3700万元

【收入分成机制】
1. 分成来源：票房+赞助+周边
2. 分成比例：6%
3. 分成频率：活动后T+7结算

【投资回报测算】
- 投资金额：200万元
- 投资人分成：3700万 × 6% = 222万元
- 预期IRR：约55%`,

  financial_data: JSON.stringify({
    project_type: "music_festival",
    investment_amount: 200,
    investment_period_months: 4,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "weekly",
    festival_metrics: { days: 3, daily_capacity: 30000, ticket_price_range: "380-880" },
    revenue_data: { ticket_revenue: 30000000, sponsorship: 5000000, merchandise: 2000000, total: 37000000 },
    investment_return: { total_share_income: 2220000, moic: 1.11, irr_estimate: 0.55 }
  }),
  
  result: "pending"
};

// ============================================
// 标的42：抖音投流-食品品牌（福州/每周分成）
// ============================================
export const deal_42_douyin_food = {
  id: "DGT-2026-042",
  company_name: "三只松鼠抖音直播投流项目",
  credit_code: "91340100MA2PDOUY42",
  industry: "douyin-ads",
  industry_sub: "抖音投流-食品",
  status: "pending",
  region: "安徽",
  city: "芜湖",
  district: "抖音电商",
  
  main_business: `三只松鼠是中国休闲零食头部品牌（A股上市），抖音粉丝超3000万。本项目为2026年年货节抖音投流，按直播间GMV分成。`,
  
  funding_amount: 120,
  funding_purpose: "千川投放（100万）+ 达人合作（15万）+ 运营费用（5万）",
  investment_period_months: 3,
  revenue_share_ratio: 0.12,
  cashflow_frequency: "weekly",
  
  contact_name: "章经理",
  contact_phone: "13900000042",
  website: "https://www.3songshu.com",
  submitted_date: "2026-01-17T11:00:00.000Z",
  
  project_documents: `【项目名称】三只松鼠抖音年货节投流项目

【品牌介绍】
三只松鼠创立于2012年，A股上市公司，是中国休闲零食领导品牌。
- 年营收：100亿+
- 抖音粉丝：3000万+
- 抖音年GMV：20亿+

【投流计划】
- 投放周期：2026年1月-3月（年货季）
- 投放平台：抖音千川
- 日均预算：1.5万元
- 目标ROI：4.0+

【收入分成机制】
1. 分成来源：投流带来的直播间GMV
2. 分成比例：12%
3. 分成频率：每周结算

【投资回报测算】
- 投资金额：120万元
- 预期GMV：120万 × 4 = 480万元
- 净利润率：20%
- 投资人分成：480万 × 20% × 12% = 115.2万元
- 预期IRR：约96%`,

  financial_data: JSON.stringify({
    project_type: "douyin_ads",
    investment_amount: 120,
    investment_period_months: 3,
    revenue_share_ratio: 0.12,
    cashflow_frequency: "weekly",
    ads_metrics: { daily_budget: 15000, target_roi: 4.0, campaign: "年货节" },
    revenue_data: { expected_gmv: 4800000, net_margin: 0.20, share_base: "net_profit" },
    investment_return: { total_share_income: 1152000, moic: 0.96, irr_estimate: 0.96 }
  }),
  
  result: "pending"
};

// ============================================
// 标的43：储能电站-工商业储能（江苏/每日分成）
// ============================================
export const deal_43_energy_storage = {
  id: "DGT-2026-043",
  company_name: "宁德时代工商业储能项目（苏州3站）",
  credit_code: "91320000MA2NESTO43",
  industry: "new-energy",
  industry_sub: "工商业储能",
  status: "pending",
  region: "江苏",
  city: "苏州",
  district: "工业园区",
  
  main_business: `宁德时代是全球动力电池龙头，本项目为苏州3个工业园区的工商业储能电站。通过峰谷套利+需量管理获取收益，按储能收益分成。`,
  
  funding_amount: 280,
  funding_purpose: "储能系统（220万）+ 安装调试（40万）+ 运维储备（20万）",
  investment_period_months: 48,
  revenue_share_ratio: 0.22,
  cashflow_frequency: "daily",
  
  contact_name: "陆总",
  contact_phone: "13900000043",
  website: "https://www.catl.com",
  submitted_date: "2026-01-17T12:00:00.000Z",
  
  project_documents: `【项目名称】宁德时代工商业储能收入分成项目

【技术方介绍】
宁德时代是全球动力电池龙头企业，储能业务快速增长。
- 全球市占率：37%
- 储能系统出货：50GWh+

【项目信息】
- 位置：苏州工业园区3个厂区
- 总容量：3MWh（1MWh×3）
- 收益模式：峰谷套利+需量管理
- 峰谷价差：0.7元/度
- 日均充放：2次

【收入测算】
- 日均收益：3000度 × 0.7元 × 2次 = 4200元
- 月均收益：12.6万元
- 年收益：151.2万元

【收入分成机制】
1. 分成来源：储能运营收益
2. 分成比例：22%
3. 分成频率：T+1日结算
4. 保障措施：电池10年质保

【投资回报测算】
- 投资金额：280万元
- 年分成收入：151.2万 × 22% = 33.26万元
- 预期IRR：约12%`,

  financial_data: JSON.stringify({
    project_type: "energy_storage",
    investment_amount: 280,
    investment_period_months: 48,
    revenue_share_ratio: 0.22,
    cashflow_frequency: "daily",
    storage_metrics: { capacity_mwh: 3, sites: 3, peak_valley_spread: 0.70, daily_cycles: 2 },
    revenue_data: { daily_revenue: 4200, monthly_revenue: 126000, annual_revenue: 1512000 },
    investment_return: { annual_share_income: 332640, moic: 0.12, irr_estimate: 0.12 }
  }),
  
  result: "pending"
};

// ============================================
// 标的44：体育赛事-电竞联赛（上海/按赛季分成）
// ============================================
export const deal_44_esports = {
  id: "DGT-2026-044",
  company_name: "英雄联盟LPL战队收入分成（BLG）",
  credit_code: "91310000MA1NESPO44",
  industry: "entertainment",
  industry_sub: "电竞战队",
  status: "pending",
  region: "上海",
  city: "上海",
  district: "电竞产业",
  
  main_business: `BLG（哔哩哔哩电竞）是LPL顶级战队，2024年获得MSI冠军。本项目按战队赛季收入（联盟分成+赞助+直播）分成。`,
  
  funding_amount: 300,
  funding_purpose: "选手薪资（180万）+ 基地运营（80万）+ 训练保障（40万）",
  investment_period_months: 12,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "monthly",
  
  contact_name: "游总监",
  contact_phone: "13900000044",
  website: "https://www.bilibiligaming.com",
  submitted_date: "2026-01-17T13:00:00.000Z",
  
  project_documents: `【项目名称】BLG电竞战队收入分成项目

【战队介绍】
BLG（Bilibili Gaming）是哔哩哔哩旗下电竞战队，LPL顶级俱乐部。
- 2024年成绩：MSI冠军、LPL夏季赛亚军
- 粉丝数量：500万+
- 头部选手：Bin、Elk等

【收入来源】
1. 联盟分成（LPL版权收入）
2. 赞助商收入
3. 比赛奖金
4. 直播打赏分成
5. 周边销售

【收入分成机制】
1. 分成来源：战队全部运营收入
2. 分成比例：8%
3. 分成频率：每月结算

【投资回报测算】
- 投资金额：300万元
- 年度收入预估：5000万元
- 投资人分成：5000万 × 8% = 400万元
- 预期IRR：约33%`,

  financial_data: JSON.stringify({
    project_type: "esports_team",
    investment_amount: 300,
    investment_period_months: 12,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "monthly",
    team_metrics: { league: "LPL", achievements: "2024 MSI冠军" },
    revenue_data: { league_share: 20000000, sponsorship: 15000000, prize: 5000000, streaming: 8000000, merchandise: 2000000, total: 50000000 },
    investment_return: { total_share_income: 4000000, moic: 1.33, irr_estimate: 0.33 }
  }),
  
  result: "pending"
};

// ============================================
// 标的45：换电站-电动两轮车（全国/每日分成）
// ============================================
export const deal_45_battery_swap = {
  id: "DGT-2026-045",
  company_name: "哈啰换电两轮车换电站（20站打包）",
  credit_code: "91330000MA2NSWAP45",
  industry: "new-energy",
  industry_sub: "两轮车换电",
  status: "pending",
  region: "浙江",
  city: "杭州/宁波",
  district: "城市社区",
  
  main_business: `哈啰换电是中国两轮车换电龙头，本项目为杭州、宁波20个社区换电站打包投资。骑手换电刚需，日均换电量稳定。`,
  
  funding_amount: 160,
  funding_purpose: "换电柜采购（120万）+ 安装部署（25万）+ 运营储备（15万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.25,
  cashflow_frequency: "daily",
  
  contact_name: "施经理",
  contact_phone: "13900000045",
  website: "https://www.hello-inc.com",
  submitted_date: "2026-01-17T14:00:00.000Z",
  
  project_documents: `【项目名称】哈啰换电站收入分成项目

【公司介绍】
哈啰换电是哈啰出行旗下两轮车换电业务，行业龙头。
- 换电站数量：5万+
- 覆盖城市：400+
- 日换电次数：300万+

【项目信息】
- 位置：杭州、宁波20个骑手聚集社区
- 单站配置：12仓位换电柜
- 单次换电价格：5元
- 日均换电次数：60次/站

【收入测算】
- 日均收入：20站 × 60次 × 5元 = 6000元
- 月均收入：18万元
- 年收入：216万元

【收入分成机制】
1. 分成来源：换电服务费收入
2. 分成比例：25%
3. 分成频率：T+1日结算

【投资回报测算】
- 投资金额：160万元
- 年分成收入：216万 × 25% = 54万元
- 预期IRR：约22%`,

  financial_data: JSON.stringify({
    project_type: "battery_swap",
    investment_amount: 160,
    investment_period_months: 36,
    revenue_share_ratio: 0.25,
    cashflow_frequency: "daily",
    swap_metrics: { stations: 20, slots_per_station: 12, swap_price: 5, daily_swaps: 60 },
    revenue_data: { daily_revenue: 6000, monthly_revenue: 180000, annual_revenue: 2160000 },
    investment_return: { annual_share_income: 540000, moic: 0.34, irr_estimate: 0.22 }
  }),
  
  result: "pending"
};

// ============================================
// 标的46：影视IP-网剧分账（横店/按播放量分成）
// ============================================
export const deal_46_drama = {
  id: "DGT-2026-046",
  company_name: "爱奇艺分账剧《重生之都市修仙》",
  credit_code: "91330000MA2NDRAM46",
  industry: "entertainment",
  industry_sub: "网剧分账",
  status: "pending",
  region: "浙江",
  city: "横店",
  district: "影视制作",
  
  main_business: `本项目为爱奇艺平台分账剧《重生之都市修仙》的投资。基于同名小说IP改编，24集，按有效播放量分账。分账模式透明，爱奇艺实时结算。`,
  
  funding_amount: 180,
  funding_purpose: "制作费用（140万）+ 后期制作（25万）+ 宣发费用（15万）",
  investment_period_months: 12,
  revenue_share_ratio: 0.20,
  cashflow_frequency: "monthly",
  
  contact_name: "范导演",
  contact_phone: "13900000046",
  website: "https://www.iqiyi.com",
  submitted_date: "2026-01-17T15:00:00.000Z",
  
  project_documents: `【项目名称】爱奇艺分账剧收入分成项目

【项目信息】
- 剧名：《重生之都市修仙》
- 类型：都市玄幻
- 集数：24集
- 平台：爱奇艺独播
- IP来源：起点中文网热门小说

【分账规则】
爱奇艺分账剧按有效播放量分账：
- S级：3元/有效播放
- A级：2元/有效播放
- B级：1元/有效播放
本剧预估评级：A级

【收入分成机制】
1. 分成来源：播放分账收入
2. 分成比例：20%
3. 分成频率：每月结算

【投资回报测算】
- 投资金额：180万元
- 预期有效播放：800万次
- 分账收入：800万 × 2元 = 1600万元
- 投资人分成：1600万 × 20% = 320万元
- 预期IRR：约78%`,

  financial_data: JSON.stringify({
    project_type: "online_drama",
    investment_amount: 180,
    investment_period_months: 12,
    revenue_share_ratio: 0.20,
    cashflow_frequency: "monthly",
    drama_metrics: { episodes: 24, platform: "爱奇艺", tier: "A级", revenue_per_play: 2 },
    revenue_data: { expected_plays: 8000000, total_revenue: 16000000 },
    investment_return: { total_share_income: 3200000, moic: 1.78, irr_estimate: 0.78 }
  }),
  
  result: "pending"
};

// ============================================
// 标的47：电动汽车充电-目的地充电（北京/每周分成）
// ============================================
export const deal_47_dest_charging = {
  id: "DGT-2026-047",
  company_name: "星星充电目的地充电桩（北京20酒店）",
  credit_code: "91110000MA01DEST47",
  industry: "new-energy",
  industry_sub: "目的地充电",
  status: "pending",
  region: "北京",
  city: "北京",
  district: "高端酒店",
  
  main_business: `星星充电是中国民营充电桩龙头，本项目为北京20家高端酒店目的地充电桩，服务酒店客人及周边车主。慢充+快充组合，按充电服务费分成。`,
  
  funding_amount: 120,
  funding_purpose: "充电桩采购（90万）+ 安装施工（20万）+ 运营储备（10万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.22,
  cashflow_frequency: "weekly",
  
  contact_name: "邢经理",
  contact_phone: "13900000047",
  website: "https://www.wanke.cn",
  submitted_date: "2026-01-17T16:00:00.000Z",
  
  project_documents: `【项目名称】星星充电目的地充电桩收入分成项目

【公司介绍】
星星充电是万帮数字能源旗下充电运营商，民营充电龙头。
- 充电桩数量：40万+
- 覆盖城市：300+

【项目信息】
- 位置：北京20家高端酒店停车场
- 配置：每家4个充电桩（2快2慢）
- 总桩数：80个
- 服务费：快充1.5元/度，慢充0.8元/度

【收入测算】
- 日均充电量：80桩 × 50度 = 4000度
- 日均收入：4000 × 1.0（平均）= 4000元
- 年收入：146万元

【收入分成机制】
1. 分成来源：充电服务费收入
2. 分成比例：22%
3. 分成频率：每周结算

【投资回报测算】
- 投资金额：120万元
- 年分成收入：146万 × 22% = 32.12万元
- 预期IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "dest_charging",
    investment_amount: 120,
    investment_period_months: 36,
    revenue_share_ratio: 0.22,
    cashflow_frequency: "weekly",
    charging_metrics: { hotels: 20, chargers_per_hotel: 4, avg_kwh_daily: 50 },
    revenue_data: { daily_revenue: 4000, annual_revenue: 1460000 },
    investment_return: { annual_share_income: 321200, moic: 0.27, irr_estimate: 0.18 }
  }),
  
  result: "pending"
};

// ============================================
// 标的48：播客广告-头部播客（全国/每月分成）
// ============================================
export const deal_48_podcast = {
  id: "DGT-2026-048",
  company_name: "小宇宙播客广告分成计划（10档播客）",
  credit_code: "91110000MA01PODC48",
  industry: "media",
  industry_sub: "播客广告",
  status: "pending",
  region: "全国",
  city: "北京",
  district: "播客媒体",
  
  main_business: `小宇宙是中国最大的播客平台。本项目为10档头部播客的广告收入分成，包括《随机波动》《忽左忽右》等。按广告收入分成。`,
  
  funding_amount: 100,
  funding_purpose: "内容制作支持（60万）+ 广告运营（30万）+ 平台服务（10万）",
  investment_period_months: 12,
  revenue_share_ratio: 0.15,
  cashflow_frequency: "monthly",
  
  contact_name: "程总监",
  contact_phone: "13900000048",
  website: "https://www.xiaoyuzhoufm.com",
  submitted_date: "2026-01-18T09:00:00.000Z",
  
  project_documents: `【项目名称】小宇宙播客广告分成项目

【平台介绍】
小宇宙是中国最大的播客平台。
- 月活用户：1500万+
- 播客数量：10万+
- 头部播客：《随机波动》《忽左忽右》《无人知晓》等

【项目信息】
- 播客数量：10档
- 类型分布：财经3、人文3、生活2、科技2
- 单期平均收听：20万次
- 广告形式：口播、贴片

【收入分成机制】
1. 分成来源：广告收入
2. 分成比例：15%
3. 分成频率：每月结算

【投资回报测算】
- 投资金额：100万元
- 10档播客年广告收入预估：800万元
- 投资人分成：800万 × 15% = 120万元
- 预期IRR：约20%`,

  financial_data: JSON.stringify({
    project_type: "podcast_ads",
    investment_amount: 100,
    investment_period_months: 12,
    revenue_share_ratio: 0.15,
    cashflow_frequency: "monthly",
    podcast_metrics: { shows: 10, avg_listeners: 200000, categories: ["财经", "人文", "生活", "科技"] },
    revenue_data: { annual_ad_revenue: 8000000 },
    investment_return: { total_share_income: 1200000, moic: 1.20, irr_estimate: 0.20 }
  }),
  
  result: "pending"
};

// ============================================
// 标的49：私域电商-微信小程序（广州/每周分成）
// ============================================
export const deal_49_private_ecom = {
  id: "DGT-2026-049",
  company_name: "完美日记私域小程序GMV分成",
  credit_code: "91440100MA5NPRIV49",
  industry: "ecommerce",
  industry_sub: "私域电商",
  status: "pending",
  region: "广东",
  city: "广州",
  district: "私域运营",
  
  main_business: `完美日记是中国新锐美妆头部品牌（美股上市），私域用户超3000万。本项目按品牌微信小程序GMV分成，私域复购率高达40%。`,
  
  funding_amount: 150,
  funding_purpose: "私域运营（90万）+ 小程序开发（40万）+ 活动补贴（20万）",
  investment_period_months: 12,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "weekly",
  
  contact_name: "黄总监",
  contact_phone: "13900000049",
  website: "https://www.perfectdiary.com",
  submitted_date: "2026-01-18T10:00:00.000Z",
  
  project_documents: `【项目名称】完美日记私域小程序收入分成项目

【品牌介绍】
完美日记是逸仙电商旗下美妆品牌，美股上市公司。
- 年营收：40亿+
- 私域用户：3000万+
- 微信社群：1万+
- 复购率：40%

【项目信息】
- 运营渠道：微信小程序商城
- 目标GMV：3000万/年
- 复购提升目标：45%

【收入分成机制】
1. 分成来源：小程序GMV
2. 分成比例：6%
3. 分成频率：每周结算

【投资回报测算】
- 投资金额：150万元
- 年度GMV预估：3000万元
- 投资人分成：3000万 × 6% = 180万元
- 预期IRR：约20%`,

  financial_data: JSON.stringify({
    project_type: "private_ecom",
    investment_amount: 150,
    investment_period_months: 12,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "weekly",
    private_metrics: { users: 30000000, communities: 10000, repurchase_rate: 0.40 },
    revenue_data: { target_gmv: 30000000 },
    investment_return: { total_share_income: 1800000, moic: 1.20, irr_estimate: 0.20 }
  }),
  
  result: "pending"
};

// ============================================
// 标的50：虚拟偶像-演出+直播（上海/每月分成）
// ============================================
export const deal_50_vtuber = {
  id: "DGT-2026-050",
  company_name: "A-SOUL虚拟偶像运营收入分成",
  credit_code: "91310000MA1NVTUB50",
  industry: "entertainment",
  industry_sub: "虚拟偶像",
  status: "pending",
  region: "上海",
  city: "上海",
  district: "虚拟偶像",
  
  main_business: `A-SOUL是中国最成功的虚拟偶像团体（字节跳动投资），B站粉丝超400万。本项目按团体直播打赏+演出+周边收入分成。虚拟偶像无丑闻风险，生命周期长。`,
  
  funding_amount: 200,
  funding_purpose: "技术升级（80万）+ 内容制作（70万）+ 演出筹备（50万）",
  investment_period_months: 18,
  revenue_share_ratio: 0.10,
  cashflow_frequency: "monthly",
  
  contact_name: "卢总监",
  contact_phone: "13900000050",
  website: "https://asoul.bilibili.com",
  submitted_date: "2026-01-18T11:00:00.000Z",
  
  project_documents: `【项目名称】A-SOUL虚拟偶像收入分成项目

【IP介绍】
A-SOUL是中国最成功的虚拟偶像团体，字节跳动旗下乐华娱乐打造。
- B站粉丝：400万+
- 抖音粉丝：300万+
- 成员：5人女团
- 代表作：《传说的世界》《超级敏感》

【收入来源】
1. 直播打赏（B站、抖音）
2. 线下/线上演唱会
3. 品牌代言
4. 周边销售
5. 游戏联动

【收入分成机制】
1. 分成来源：全部运营收入
2. 分成比例：10%
3. 分成频率：每月结算

【投资回报测算】
- 投资金额：200万元
- 18个月收入预估：2500万元
- 投资人分成：2500万 × 10% = 250万元
- 预期IRR：约25%

【优势分析】
1. 无丑闻风险（虚拟偶像）
2. 生命周期长
3. 可复制性强
4. 粉丝黏性高`,

  financial_data: JSON.stringify({
    project_type: "virtual_idol",
    investment_amount: 200,
    investment_period_months: 18,
    revenue_share_ratio: 0.10,
    cashflow_frequency: "monthly",
    vtuber_metrics: { members: 5, bilibili_fans: 4000000, douyin_fans: 3000000 },
    revenue_data: { streaming: 10000000, concerts: 8000000, sponsorship: 4000000, merchandise: 3000000, total: 25000000 },
    investment_return: { total_share_income: 2500000, moic: 1.25, irr_estimate: 0.25 }
  }),
  
  result: "pending"
};

// ============================================
// 导出创新标的（20个）
// ============================================
export const innovativeDeals = [
  deal_31_concert,       // 演唱会巡演
  deal_32_douyin_fashion, // 抖音投流-服装
  deal_33_ev_charging,   // 充电桩-高速
  deal_34_saas,          // SaaS订阅
  deal_35_mcn,           // MCN达人孵化
  deal_36_knowledge,     // 知识付费
  deal_37_music_royalty, // 音乐版权
  deal_38_ecom_operation, // 电商代运营
  deal_39_solar,         // 分布式光伏
  deal_40_game,          // 游戏联运
  deal_41_festival,      // 音乐节
  deal_42_douyin_food,   // 抖音投流-食品
  deal_43_energy_storage, // 工商业储能
  deal_44_esports,       // 电竞战队
  deal_45_battery_swap,  // 两轮车换电
  deal_46_drama,         // 网剧分账
  deal_47_dest_charging, // 目的地充电
  deal_48_podcast,       // 播客广告
  deal_49_private_ecom,  // 私域电商
  deal_50_vtuber         // 虚拟偶像
];

// ============================================
// 创新标的摘要信息
// ============================================
export const innovativeDealsSummary = [
  { id: "DGT-2026-031", name: "薛之谦华东巡演", industry: "票务-演唱会", city: "上海/杭州/南京", amount: 500, share: "3%", frequency: "每周", irr: "37%" },
  { id: "DGT-2026-032", name: "UR抖音投流", industry: "抖音投流-服装", city: "广州", amount: 200, share: "15%", frequency: "每周", irr: "32%" },
  { id: "DGT-2026-033", name: "特来电高速充电站", industry: "充电桩-高速", city: "京沪沿线", amount: 300, share: "20%", frequency: "每日", irr: "21%" },
  { id: "DGT-2026-034", name: "有赞SaaS订阅", industry: "SaaS订阅", city: "杭州", amount: 400, share: "8%", frequency: "每月", irr: "10%" },
  { id: "DGT-2026-035", name: "无忧传媒达人孵化", industry: "MCN孵化", city: "杭州", amount: 150, share: "12%", frequency: "每月", irr: "25%" },
  { id: "DGT-2026-036", name: "得到课程项目", industry: "知识付费", city: "北京", amount: 80, share: "15%", frequency: "每月", irr: "40%" },
  { id: "DGT-2026-037", name: "华语金曲版税", industry: "音乐版权", city: "北京", amount: 600, share: "70%", frequency: "每月", irr: "8%" },
  { id: "DGT-2026-038", name: "宝尊电商代运营", industry: "电商代运营", city: "上海", amount: 250, share: "5%", frequency: "每月", irr: "60%" },
  { id: "DGT-2026-039", name: "正泰分布式光伏", industry: "分布式光伏", city: "嘉兴/湖州", amount: 350, share: "25%", frequency: "每月", irr: "18%" },
  { id: "DGT-2026-040", name: "三七互娱游戏联运", industry: "游戏联运", city: "深圳", amount: 180, share: "18%", frequency: "每周", irr: "35%" },
  { id: "DGT-2026-041", name: "草莓音乐节成都站", industry: "票务-音乐节", city: "成都", amount: 200, share: "6%", frequency: "每周", irr: "55%" },
  { id: "DGT-2026-042", name: "三只松鼠抖音投流", industry: "抖音投流-食品", city: "芜湖", amount: 120, share: "12%", frequency: "每周", irr: "96%" },
  { id: "DGT-2026-043", name: "宁德时代储能", industry: "工商业储能", city: "苏州", amount: 280, share: "22%", frequency: "每日", irr: "12%" },
  { id: "DGT-2026-044", name: "BLG电竞战队", industry: "电竞战队", city: "上海", amount: 300, share: "8%", frequency: "每月", irr: "33%" },
  { id: "DGT-2026-045", name: "哈啰两轮车换电", industry: "两轮车换电", city: "杭州/宁波", amount: 160, share: "25%", frequency: "每日", irr: "22%" },
  { id: "DGT-2026-046", name: "爱奇艺分账剧", industry: "网剧分账", city: "横店", amount: 180, share: "20%", frequency: "每月", irr: "78%" },
  { id: "DGT-2026-047", name: "星星充电目的地", industry: "目的地充电", city: "北京", amount: 120, share: "22%", frequency: "每周", irr: "18%" },
  { id: "DGT-2026-048", name: "小宇宙播客广告", industry: "播客广告", city: "北京", amount: 100, share: "15%", frequency: "每月", irr: "20%" },
  { id: "DGT-2026-049", name: "完美日记私域电商", industry: "私域电商", city: "广州", amount: 150, share: "6%", frequency: "每周", irr: "20%" },
  { id: "DGT-2026-050", name: "A-SOUL虚拟偶像", industry: "虚拟偶像", city: "上海", amount: 200, share: "10%", frequency: "每月", irr: "25%" }
];

export default innovativeDeals;
