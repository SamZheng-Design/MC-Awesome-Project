// 滴灌通标的种子数据 - 完整重构版
// DGT Intelligence Platform - Complete Deals Seed Data
// 基于滴灌通DRO（每日收入分成凭证）真实投资模式设计

/**
 * 滴灌通投资模式核心要点（来源：联合资信DRO研究报告）
 * 
 * 1. DRO (Daily Revenue Obligation) = 每日收入分成凭证
 * 2. 投资方投入资金，从门店日常营业收入中按固定比例分成
 * 3. 收入每日归集清分，资金通过三方共管账户管理
 * 4. 主要赛道：餐饮、零售、服务、文体（行业光谱27类）
 * 5. 投资期限：通常12-36个月
 * 6. 核心指标：分成比例、回款周期、回本倍数、IRR
 * 
 * 标的设计原则：
 * - 10个标的覆盖不同行业（餐饮/零售/服务/文体）
 * - 不同地区（一线/新一线/二线城市）
 * - 不同分成频率（每日/每周/每月）
 * - 完整的财务数据和利益分配机制
 * - 真实的行业基准和指标
 */

// ============================================
// 标的1：餐饮-连锁茶饮（深圳/每日分成）
// ============================================
export const deal_01_tea = {
  id: "DGT-2026-001",
  company_name: "蜜雪冰城（深圳南山科技园店）",
  credit_code: "91440300MA5N7ABC01",
  industry: "catering",
  industry_sub: "茶饮连锁",
  status: "pending",
  region: "广东",
  city: "深圳",
  district: "南山区科技园",
  
  main_business: `蜜雪冰城是中国最大的现制茶饮连锁品牌，主打高性价比策略，产品均价6-8元。该门店位于深圳南山科技园核心区，周边为腾讯、百度等互联网企业办公区，目标客群为白领和程序员。门店面积25平米，属于"小店高频"模式，日均出杯量400-600杯。`,
  
  funding_amount: 35, // 万元
  funding_purpose: "门店升级改造（15万）+ 设备更新（10万）+ 流动资金（10万）",
  investment_period_months: 24, // 投资期限
  revenue_share_ratio: 0.08, // 收入分成比例8%
  cashflow_frequency: "daily", // 每日分成
  
  contact_name: "王店长",
  contact_phone: "13800000001",
  website: "https://mxbc.com",
  submitted_date: "2026-01-10T09:00:00.000Z",
  
  project_documents: `【项目名称】蜜雪冰城深圳南山科技园店收入分成项目

【品牌介绍】
蜜雪冰城创立于1997年，总部位于郑州，是中国门店数量最多的现制茶饮品牌。
- 全国门店数量：36,000+
- 覆盖城市：全国所有省份
- 品牌定位：高性价比平价茶饮
- 平均客单价：8元
- 产品：冰淇淋、柠檬水、奶茶

【门店信息】
- 位置：深圳市南山区科技园北区（腾讯大厦斜对面）
- 面积：25平米
- 开业时间：2023年6月
- 租金：1.8万/月（含物业）
- 员工：3人（1店长+2店员）
- 营业时间：9:00-22:00

【经营数据（近12个月平均）】
- 日均出杯量：520杯
- 日均营收：4,160元（520×8）
- 月均营收：12.48万元
- 年营收：149.76万元
- 毛利率：55%（行业标杆）
- 净利率：18%

【收入分成机制】
1. 分成来源：门店全部营业收入（POS系统直连）
2. 分成比例：8%
3. 分成频率：T+1日结算
4. 账户管理：招商银行三方共管账户
5. 资金路径：
   - 每日营收进入共管账户
   - 系统自动计算8%分成
   - T+1日自动划转至投资方账户
   - 剩余92%由运营方自主支配

【投资回报测算】
- 投资金额：35万元
- 年分成收入：149.76万 × 8% = 11.98万元
- 投资期限：24个月
- 预期总回款：23.96万元
- 回本倍数：0.68x（24个月）
- IRR：约18%（含本金回收）

注：滴灌通模式为收入分成，非本息回收模式。
实际回报 = 投资期内累计分成收入

【保障机制】
1. 品牌保障：蜜雪冰城总部提供经营支持
2. 数据透明：POS系统实时同步销售数据
3. 履约保证金：5万元（运营方缴纳）
4. 最低分成保障：月分成低于6000元时，品牌方补足差额

【风险提示】
1. 市场风险：茶饮行业竞争激烈，客流可能下滑
2. 租金风险：租约到期后可能面临涨租
3. 季节性风险：夏季旺季/冬季淡季，收入波动约±20%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 35,
    investment_unit: "万元",
    investment_period_months: 24,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "daily",
    
    store_metrics: {
      area_sqm: 25,
      rent_monthly: 1.8,
      staff_count: 3,
      operating_hours: "9:00-22:00",
      opening_date: "2023-06-15"
    },
    
    revenue_data: {
      daily_cups: 520,
      avg_price: 8,
      daily_revenue: 4160,
      monthly_revenue: 124800,
      annual_revenue: 1497600,
      gross_margin: 0.55,
      net_margin: 0.18
    },
    
    investment_return: {
      annual_share_income: 119808, // 149.76万×8%
      total_period_income: 239616, // 24个月
      moic: 0.68, // 回本倍数
      irr_estimate: 0.18
    },
    
    cost_structure: {
      ingredients: { ratio: 0.35, note: "原料成本" },
      labor: { ratio: 0.15, note: "人工成本" },
      rent: { ratio: 0.14, note: "租金物业" },
      utilities: { ratio: 0.05, note: "水电气" },
      franchise_fee: { ratio: 0.03, note: "品牌管理费" },
      other: { ratio: 0.10, note: "其他" },
      profit: { ratio: 0.18, note: "净利润" }
    },
    
    guarantee_mechanism: {
      deposit: 5,
      minimum_monthly_share: 6000,
      data_transparency: "POS实时同步",
      account_type: "三方共管账户"
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的2：餐饮-快餐连锁（上海/每日分成）
// ============================================
export const deal_02_fastfood = {
  id: "DGT-2026-002",
  company_name: "老乡鸡（上海徐汇日月光店）",
  credit_code: "91310104MA1G8DEF02",
  industry: "catering",
  industry_sub: "中式快餐",
  status: "pending",
  region: "上海",
  city: "上海",
  district: "徐汇区日月光中心",
  
  main_business: `老乡鸡是中国中式快餐领导品牌，主打"干净卫生"和"家常味道"，以肥西老母鸡汤为核心产品。该门店位于上海徐汇日月光购物中心B1层美食广场，客流量大，翻台率高。门店面积80平米，日均客流350-450人次，客单价35元。`,
  
  funding_amount: 80,
  funding_purpose: "门店装修升级（40万）+ 厨房设备更新（25万）+ 流动资金（15万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.06,
  cashflow_frequency: "daily",
  
  contact_name: "李经理",
  contact_phone: "13800000002",
  website: "https://laoxiangji.com.cn",
  submitted_date: "2026-01-09T14:00:00.000Z",
  
  project_documents: `【项目名称】老乡鸡上海徐汇日月光店收入分成项目

【品牌介绍】
老乡鸡创立于2003年，总部位于合肥，是中国中式快餐第一品牌（门店数）。
- 全国门店数量：1,200+
- 覆盖城市：全国16个省份
- 品牌定位：干净卫生的中式快餐
- 平均客单价：35元
- 核心产品：肥西老母鸡汤、现炒菜品

【门店信息】
- 位置：上海市徐汇区日月光中心B1层
- 面积：80平米（含堂食40座）
- 开业时间：2022年3月
- 租金：8万/月（含物业）
- 员工：8人（1店长+2厨师+5前厅）
- 营业时间：10:00-21:30

【经营数据（近12个月平均）】
- 日均客流：380人
- 客单价：35元
- 日均营收：13,300元
- 月均营收：39.9万元
- 年营收：478.8万元
- 毛利率：50%
- 净利率：12%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：6%
3. 分成频率：T+1日结算
4. 账户管理：工商银行三方共管账户

【投资回报测算】
- 投资金额：80万元
- 年分成收入：478.8万 × 6% = 28.73万元
- 投资期限：30个月
- 预期总回款：71.82万元
- 回本倍数：0.90x（30个月）
- IRR：约22%

【保障机制】
1. 品牌保障：老乡鸡总部统一管理
2. 供应链：中央厨房统一配送
3. 履约保证金：10万元
4. 闭店保障：提前3个月告知，按剩余期限×月均分成补偿`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 80,
    investment_period_months: 30,
    revenue_share_ratio: 0.06,
    cashflow_frequency: "daily",
    
    store_metrics: {
      area_sqm: 80,
      seats: 40,
      rent_monthly: 8,
      staff_count: 8,
      operating_hours: "10:00-21:30"
    },
    
    revenue_data: {
      daily_customers: 380,
      avg_ticket: 35,
      daily_revenue: 13300,
      monthly_revenue: 399000,
      annual_revenue: 4788000,
      gross_margin: 0.50,
      net_margin: 0.12
    },
    
    investment_return: {
      annual_share_income: 287280,
      total_period_income: 718200,
      moic: 0.90,
      irr_estimate: 0.22
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的3：零售-社区生鲜（杭州/每日分成）
// ============================================
export const deal_03_fresh = {
  id: "DGT-2026-003",
  company_name: "叮咚买菜（杭州拱墅区前置仓）",
  credit_code: "91330105MA2N9GHI03",
  industry: "retail",
  industry_sub: "社区生鲜",
  status: "pending",
  region: "浙江",
  city: "杭州",
  district: "拱墅区大关街道",
  
  main_business: `叮咚买菜是国内领先的即时零售生鲜电商平台，采用"前置仓+即时配送"模式。该前置仓服务拱墅区大关、德胜、小河等街道，覆盖约5万户家庭，提供29分钟送达服务。仓库面积300平米，SKU数1,500+，日均订单量450单。`,
  
  funding_amount: 120,
  funding_purpose: "仓储设备升级（50万）+ 冷链设备（40万）+ 运营资金（30万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.05,
  cashflow_frequency: "daily",
  
  contact_name: "张站长",
  contact_phone: "13800000003",
  website: "https://dingdong.com",
  submitted_date: "2026-01-08T10:00:00.000Z",
  
  project_documents: `【项目名称】叮咚买菜杭州拱墅区前置仓收入分成项目

【品牌介绍】
叮咚买菜成立于2017年，总部位于上海，是国内领先的即时零售生鲜平台。
- 前置仓数量：1,000+
- 覆盖城市：上海、杭州、深圳、北京等27城
- 服务半径：3公里
- 配送时效：最快29分钟
- 核心品类：蔬菜、水果、肉禽蛋、水产

【前置仓信息】
- 位置：杭州市拱墅区大关街道（社区内部）
- 面积：300平米
- 开仓时间：2023年8月
- 租金：3.5万/月
- 员工：15人（1站长+8分拣+6配送）
- 服务时间：6:00-23:00
- 覆盖家庭：5万户

【经营数据（近12个月平均）】
- 日均订单：450单
- 客单价：68元
- 日均GMV：30,600元
- 月均GMV：91.8万元
- 年GMV：1,101.6万元
- 毛利率：22%（生鲜行业标准）
- 净利率：3%（前置仓模式净利率偏低）

【收入分成机制】
1. 分成基数：前置仓全部GMV
2. 分成比例：5%
3. 分成频率：T+1日结算
4. 账户管理：浦发银行三方共管账户

【投资回报测算】
- 投资金额：120万元
- 年分成收入：1101.6万 × 5% = 55.08万元
- 投资期限：24个月
- 预期总回款：110.16万元
- 回本倍数：0.92x（24个月）
- IRR：约21%

【风险提示】
1. 生鲜损耗：损耗率控制在2%以内
2. 订单密度：需维持日均400单以上
3. 配送成本：每单配送成本约6元`,

  financial_data: JSON.stringify({
    project_type: "warehouse_operation",
    investment_amount: 120,
    investment_period_months: 24,
    revenue_share_ratio: 0.05,
    cashflow_frequency: "daily",
    
    warehouse_metrics: {
      area_sqm: 300,
      sku_count: 1500,
      coverage_households: 50000,
      delivery_radius_km: 3,
      delivery_time_minutes: 29
    },
    
    revenue_data: {
      daily_orders: 450,
      avg_ticket: 68,
      daily_gmv: 30600,
      monthly_gmv: 918000,
      annual_gmv: 11016000,
      gross_margin: 0.22,
      net_margin: 0.03
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的4：零售-便利店（成都/每日分成）
// ============================================
export const deal_04_convenience = {
  id: "DGT-2026-004",
  company_name: "罗森便利店（成都春熙路旗舰店）",
  credit_code: "91510104MA6K2JKL04",
  industry: "retail",
  industry_sub: "便利店",
  status: "pending",
  region: "四川",
  city: "成都",
  district: "锦江区春熙路",
  
  main_business: `罗森是日本三大便利店品牌之一，在中国由上海罗森授权运营。该门店位于成都核心商圈春熙路步行街，24小时营业，主打鲜食和进口商品。门店面积65平米，日均客流800-1200人次，客单价18元。`,
  
  funding_amount: 60,
  funding_purpose: "门店改造（30万）+ 鲜食设备（20万）+ 库存（10万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.07,
  cashflow_frequency: "daily",
  
  contact_name: "陈店长",
  contact_phone: "13800000004",
  website: "https://lawson.com.cn",
  submitted_date: "2026-01-07T11:00:00.000Z",
  
  project_documents: `【项目名称】罗森便利店成都春熙路旗舰店收入分成项目

【品牌介绍】
罗森（LAWSON）创立于1939年美国，1975年进入日本，2011年进入中国。
- 中国门店数量：6,000+
- 覆盖城市：上海、北京、成都、重庆等50+城市
- 品牌定位：时尚便利店
- 平均客单价：18元
- 核心优势：鲜食（便当、饭团、关东煮）

【门店信息】
- 位置：成都市锦江区春熙路北段
- 面积：65平米
- 开业时间：2024年1月
- 租金：4.5万/月
- 员工：6人（24小时排班）
- 营业时间：24小时

【经营数据（近12个月平均）】
- 日均客流：950人
- 客单价：18元
- 日均营收：17,100元
- 月均营收：51.3万元
- 年营收：615.6万元
- 毛利率：28%
- 净利率：8%
- 鲜食销售占比：35%

【收入分成机制】
1. 分成来源：门店全部销售收入
2. 分成比例：7%
3. 分成频率：T+1日结算
4. 账户管理：建设银行三方共管账户

【投资回报测算】
- 投资金额：60万元
- 年分成收入：615.6万 × 7% = 43.09万元
- 投资期限：30个月
- 预期总回款：107.73万元
- 回本倍数：1.80x（30个月）
- IRR：约35%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 60,
    investment_period_months: 30,
    revenue_share_ratio: 0.07,
    cashflow_frequency: "daily",
    
    store_metrics: {
      area_sqm: 65,
      rent_monthly: 4.5,
      staff_count: 6,
      operating_hours: "24小时"
    },
    
    revenue_data: {
      daily_customers: 950,
      avg_ticket: 18,
      daily_revenue: 17100,
      monthly_revenue: 513000,
      annual_revenue: 6156000,
      gross_margin: 0.28,
      net_margin: 0.08,
      fresh_food_ratio: 0.35
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的5：服务-宠物医疗（北京/每周分成）
// ============================================
export const deal_05_pet = {
  id: "DGT-2026-005",
  company_name: "新瑞鹏宠物医院（北京朝阳望京店）",
  credit_code: "91110105MA01KMNO05",
  industry: "service",
  industry_sub: "宠物医疗",
  status: "pending",
  region: "北京",
  city: "北京",
  district: "朝阳区望京",
  
  main_business: `新瑞鹏宠物医疗集团是中国最大的宠物医疗连锁机构，旗下拥有瑞鹏、美联众合、芭比堂等品牌。该门店位于北京望京商圈，服务周边高端社区，提供诊疗、疫苗、绝育、美容等服务。门店面积200平米，日均诊疗量25-35只。`,
  
  funding_amount: 150,
  funding_purpose: "医疗设备升级（80万）+ 装修改造（40万）+ 运营资金（30万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.12,
  cashflow_frequency: "weekly",
  
  contact_name: "刘院长",
  contact_phone: "13800000005",
  website: "https://xrpvet.com",
  submitted_date: "2026-01-06T09:00:00.000Z",
  
  project_documents: `【项目名称】新瑞鹏宠物医院北京望京店收入分成项目

【品牌介绍】
新瑞鹏宠物医疗集团成立于1998年，是中国最大的宠物医疗连锁机构。
- 全国门店数量：1,800+
- 覆盖城市：100+
- 执业兽医：5,000+
- 品牌定位：专业、信任、关爱
- 服务项目：诊疗、疫苗、手术、美容、寄养

【门店信息】
- 位置：北京市朝阳区望京西园四区
- 面积：200平米
- 开业时间：2021年5月
- 租金：6万/月
- 员工：8人（2兽医+3护士+2前台+1美容师）
- 营业时间：9:00-21:00

【经营数据（近12个月平均）】
- 日均诊疗：28只
- 客单价：380元
- 日均营收：10,640元
- 月均营收：31.92万元
- 年营收：383.04万元
- 毛利率：55%
- 净利率：18%

【服务构成】
- 诊疗服务：45%（挂号、检查、治疗）
- 疫苗驱虫：20%
- 手术服务：15%（绝育、骨科等）
- 美容服务：12%
- 商品销售：8%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：12%
3. 分成频率：每周一结算上周收入
4. 账户管理：招商银行三方共管账户

【投资回报测算】
- 投资金额：150万元
- 年分成收入：383.04万 × 12% = 45.96万元
- 投资期限：36个月
- 预期总回款：137.88万元
- 回本倍数：0.92x（36个月）
- IRR：约20%

【行业优势】
1. 宠物经济：中国宠物市场规模超3,000亿
2. 医疗刚需：宠物就医频次高，复购率强
3. 品牌壁垒：专业医疗资质门槛高`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 150,
    investment_period_months: 36,
    revenue_share_ratio: 0.12,
    cashflow_frequency: "weekly",
    
    store_metrics: {
      area_sqm: 200,
      rent_monthly: 6,
      staff_count: 8,
      vets: 2
    },
    
    revenue_data: {
      daily_patients: 28,
      avg_ticket: 380,
      daily_revenue: 10640,
      monthly_revenue: 319200,
      annual_revenue: 3830400,
      gross_margin: 0.55,
      net_margin: 0.18
    },
    
    service_mix: {
      medical: 0.45,
      vaccine: 0.20,
      surgery: 0.15,
      grooming: 0.12,
      retail: 0.08
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的6：服务-健身连锁（广州/每周分成）
// ============================================
export const deal_06_fitness = {
  id: "DGT-2026-006",
  company_name: "乐刻运动（广州天河体育中心店）",
  credit_code: "91440106MA5P3QRS06",
  industry: "service",
  industry_sub: "智能健身",
  status: "pending",
  region: "广东",
  city: "广州",
  district: "天河区体育中心",
  
  main_business: `乐刻运动是中国最大的智能健身房连锁品牌，主打"24小时、月付制、无推销"模式。该门店位于广州天河体育中心商圈，周边为白领聚集区。门店面积180平米，会员容量600人，采用无人值守智能管理系统。`,
  
  funding_amount: 85,
  funding_purpose: "器材更新（50万）+ 智能系统升级（20万）+ 装修（15万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.10,
  cashflow_frequency: "weekly",
  
  contact_name: "周店长",
  contact_phone: "13800000006",
  website: "https://likingfit.com",
  submitted_date: "2026-01-05T15:00:00.000Z",
  
  project_documents: `【项目名称】乐刻运动广州天河体育中心店收入分成项目

【品牌介绍】
乐刻运动成立于2015年，总部位于杭州，是中国最大的智能健身房连锁品牌。
- 全国门店数量：1,300+
- 覆盖城市：全国30+城市
- 注册用户：1,200万+
- 品牌定位：24小时智能健身
- 月卡价格：199元/月

【门店信息】
- 位置：广州市天河区天河北路
- 面积：180平米
- 开业时间：2023年3月
- 租金：3.8万/月
- 员工：2人（巡店模式）
- 营业时间：24小时

【经营数据（近12个月平均）】
- 活跃会员：520人
- 月卡均价：199元
- 私教课：200元/节（日均售出3节）
- 月均会员费收入：10.35万元
- 月均私教收入：1.8万元
- 月均营收：12.15万元
- 年营收：145.8万元
- 毛利率：60%
- 净利率：25%

【收入构成】
- 会员月卡：85%
- 私教课程：12%
- 自动售卖机：3%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：10%
3. 分成频率：每周一结算
4. 账户管理：三方共管账户

【投资回报测算】
- 投资金额：85万元
- 年分成收入：145.8万 × 10% = 14.58万元
- 投资期限：30个月
- 预期总回款：36.45万元
- 回本倍数：0.43x（30个月）
- IRR：约15%

【风险提示】
1. 会员流失：需保持65%以上续费率
2. 竞争：周边3公里内有3家健身房`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 85,
    investment_period_months: 30,
    revenue_share_ratio: 0.10,
    cashflow_frequency: "weekly",
    
    store_metrics: {
      area_sqm: 180,
      rent_monthly: 3.8,
      staff_count: 2,
      member_capacity: 600
    },
    
    revenue_data: {
      active_members: 520,
      monthly_fee: 199,
      private_training_price: 200,
      monthly_membership_revenue: 103480,
      monthly_pt_revenue: 18000,
      monthly_revenue: 121500,
      annual_revenue: 1458000,
      gross_margin: 0.60,
      net_margin: 0.25
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的7：服务-美容美发（武汉/每周分成）
// ============================================
export const deal_07_beauty = {
  id: "DGT-2026-007",
  company_name: "永琪美容美发（武汉光谷步行街店）",
  credit_code: "91420114MA4T5UVW07",
  industry: "service",
  industry_sub: "美容美发",
  status: "pending",
  region: "湖北",
  city: "武汉",
  district: "洪山区光谷步行街",
  
  main_business: `永琪美容美发创立于1999年，是华东地区知名的美容美发连锁品牌。该门店位于武汉光谷步行街核心位置，服务周边大学生和IT从业者。门店面积150平米，设有8个美发位、4个美容床位。`,
  
  funding_amount: 55,
  funding_purpose: "设备更新（25万）+ 装修升级（20万）+ 运营资金（10万）",
  investment_period_months: 24,
  revenue_share_ratio: 0.10,
  cashflow_frequency: "weekly",
  
  contact_name: "吴店长",
  contact_phone: "13800000007",
  website: "https://yongqi.com",
  submitted_date: "2026-01-04T10:00:00.000Z",
  
  project_documents: `【项目名称】永琪美容美发武汉光谷店收入分成项目

【品牌介绍】
永琪美容美发创立于1999年，总部位于上海，是华东地区规模最大的美容美发连锁之一。
- 全国门店数量：800+
- 覆盖城市：上海、杭州、南京、武汉等30+城市
- 品牌定位：专业、时尚、实惠
- 服务项目：剪发、烫染、护理、美容

【门店信息】
- 位置：武汉市洪山区光谷步行街
- 面积：150平米
- 开业时间：2022年9月
- 租金：3.5万/月
- 员工：12人（8发型师+3美容师+1前台）
- 营业时间：9:30-21:30

【经营数据（近12个月平均）】
- 日均客流：45人
- 客单价：120元
- 日均营收：5,400元
- 月均营收：16.2万元
- 年营收：194.4万元
- 毛利率：50%
- 净利率：15%

【服务构成】
- 剪发服务：35%
- 烫染服务：30%
- 护理项目：20%
- 美容服务：15%

【收入分成机制】
1. 分成来源：门店全部服务收入（不含产品零售）
2. 分成比例：10%
3. 分成频率：每周一结算
4. 账户管理：三方共管账户

【投资回报测算】
- 投资金额：55万元
- 年分成收入：194.4万 × 10% = 19.44万元
- 投资期限：24个月
- 预期总回款：38.88万元
- 回本倍数：0.71x（24个月）
- IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 55,
    investment_period_months: 24,
    revenue_share_ratio: 0.10,
    cashflow_frequency: "weekly",
    
    store_metrics: {
      area_sqm: 150,
      rent_monthly: 3.5,
      staff_count: 12,
      hair_stations: 8,
      beauty_beds: 4
    },
    
    revenue_data: {
      daily_customers: 45,
      avg_ticket: 120,
      daily_revenue: 5400,
      monthly_revenue: 162000,
      annual_revenue: 1944000,
      gross_margin: 0.50,
      net_margin: 0.15
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的8：文体-KTV连锁（南京/每月分成）
// ============================================
export const deal_08_ktv = {
  id: "DGT-2026-008",
  company_name: "唱吧麦颂KTV（南京新街口旗舰店）",
  credit_code: "91320102MA1X6YZA08",
  industry: "entertainment",
  industry_sub: "KTV娱乐",
  status: "pending",
  region: "江苏",
  city: "南京",
  district: "玄武区新街口",
  
  main_business: `唱吧麦颂是唱吧与麦颂合资打造的互联网KTV品牌，主打"自助式、碎片化、高性价比"消费模式。该门店位于南京新街口商圈，拥有35个包厢，支持线上预订和自助消费。`,
  
  funding_amount: 200,
  funding_purpose: "设备全面升级（100万）+ 装修翻新（60万）+ 运营资金（40万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.08,
  cashflow_frequency: "monthly",
  
  contact_name: "赵总经理",
  contact_phone: "13800000008",
  website: "https://changbamaisong.com",
  submitted_date: "2026-01-03T14:00:00.000Z",
  
  project_documents: `【项目名称】唱吧麦颂KTV南京新街口旗舰店收入分成项目

【品牌介绍】
唱吧麦颂成立于2014年，是唱吧与麦颂联合创办的互联网KTV品牌。
- 全国门店数量：500+
- 覆盖城市：北京、上海、南京、杭州等50+城市
- 品牌定位：互联网+自助式KTV
- 核心特色：在线预订、自助开房、智能点歌

【门店信息】
- 位置：南京市玄武区新街口金鹰国际
- 面积：800平米
- 包厢数量：35间（迷你2人间到派对15人间）
- 开业时间：2022年6月
- 租金：15万/月
- 员工：15人
- 营业时间：12:00-次日2:00

【经营数据（近12个月平均）】
- 日均开房：85间次
- 平均消费：180元/间
- 日均营收：15,300元
- 月均营收：45.9万元
- 年营收：550.8万元
- 毛利率：45%
- 净利率：12%

【收入构成】
- 房费：65%
- 酒水小食：30%
- 其他（充电宝等）：5%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：8%
3. 分成频率：每月5日结算上月收入
4. 账户管理：南京银行三方共管账户

【投资回报测算】
- 投资金额：200万元
- 年分成收入：550.8万 × 8% = 44.06万元
- 投资期限：36个月
- 预期总回款：132.18万元
- 回本倍数：0.66x（36个月）
- IRR：约15%

【行业特点】
1. 季节性：周末和节假日客流高峰
2. 时段差异：晚间收入占70%
3. 年龄层：18-35岁为主力消费群`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 200,
    investment_period_months: 36,
    revenue_share_ratio: 0.08,
    cashflow_frequency: "monthly",
    
    store_metrics: {
      area_sqm: 800,
      rooms: 35,
      rent_monthly: 15,
      staff_count: 15,
      operating_hours: "12:00-次日2:00"
    },
    
    revenue_data: {
      daily_room_sessions: 85,
      avg_spend_per_room: 180,
      daily_revenue: 15300,
      monthly_revenue: 459000,
      annual_revenue: 5508000,
      gross_margin: 0.45,
      net_margin: 0.12
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的9：服务-汽车养护（重庆/每月分成）
// ============================================
export const deal_09_auto = {
  id: "DGT-2026-009",
  company_name: "途虎养车工场店（重庆渝北龙湖店）",
  credit_code: "91500112MA5B7CDE09",
  industry: "service",
  industry_sub: "汽车养护",
  status: "pending",
  region: "重庆",
  city: "重庆",
  district: "渝北区龙湖",
  
  main_business: `途虎养车是中国领先的汽车养护服务平台，该工场店为途虎直营旗舰店，提供轮胎、保养、美容、维修等一站式服务。门店位于重庆渝北龙湖天街附近，服务周边10万+车主。`,
  
  funding_amount: 180,
  funding_purpose: "设备升级（80万）+ 库存备货（60万）+ 店面改造（40万）",
  investment_period_months: 30,
  revenue_share_ratio: 0.09,
  cashflow_frequency: "monthly",
  
  contact_name: "孙店长",
  contact_phone: "13800000009",
  website: "https://tuhu.cn",
  submitted_date: "2026-01-02T11:00:00.000Z",
  
  project_documents: `【项目名称】途虎养车重庆渝北龙湖工场店收入分成项目

【品牌介绍】
途虎养车成立于2011年，是中国最大的汽车后市场服务平台（2023年港股上市）。
- 工场店数量：5,300+
- 覆盖城市：全国400+城市
- 注册用户：1.2亿+
- 品牌定位：正品自营、标准服务、透明价格
- 服务项目：轮胎、保养、美容、维修、车品

【门店信息】
- 位置：重庆市渝北区龙湖天街商圈
- 面积：450平米（8个工位）
- 开业时间：2023年1月
- 租金：4.5万/月
- 员工：12人（1店长+8技师+3前台）
- 营业时间：8:00-20:00
- 服务车辆：周边10万+

【经营数据（近12个月平均）】
- 日均服务车辆：35台
- 客单价：450元
- 日均营收：15,750元
- 月均营收：47.25万元
- 年营收：567万元
- 毛利率：35%
- 净利率：10%

【服务构成】
- 轮胎服务：35%
- 保养服务：30%
- 美容服务：15%
- 维修服务：12%
- 商品销售：8%

【收入分成机制】
1. 分成来源：门店服务收入+商品销售
2. 分成比例：9%
3. 分成频率：每月10日结算
4. 账户管理：三方共管账户

【投资回报测算】
- 投资金额：180万元
- 年分成收入：567万 × 9% = 51.03万元
- 投资期限：30个月
- 预期总回款：127.58万元
- 回本倍数：0.71x（30个月）
- IRR：约18%`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 180,
    investment_period_months: 30,
    revenue_share_ratio: 0.09,
    cashflow_frequency: "monthly",
    
    store_metrics: {
      area_sqm: 450,
      bays: 8,
      rent_monthly: 4.5,
      staff_count: 12,
      service_vehicles: 100000
    },
    
    revenue_data: {
      daily_vehicles: 35,
      avg_ticket: 450,
      daily_revenue: 15750,
      monthly_revenue: 472500,
      annual_revenue: 5670000,
      gross_margin: 0.35,
      net_margin: 0.10
    }
  }),
  
  result: "pending"
};

// ============================================
// 标的10：餐饮-火锅连锁（西安/每月分成）
// ============================================
export const deal_10_hotpot = {
  id: "DGT-2026-010",
  company_name: "海底捞（西安大雁塔店）",
  credit_code: "91610113MA6F8GHI10",
  industry: "catering",
  industry_sub: "火锅连锁",
  status: "pending",
  region: "陕西",
  city: "西安",
  district: "雁塔区大雁塔",
  
  main_business: `海底捞是中国最知名的火锅连锁品牌，以极致服务著称。该门店位于西安大雁塔景区商圈，客流量大，旅游旺季翻台率极高。门店面积650平米，设有180个餐位。`,
  
  funding_amount: 300,
  funding_purpose: "店面升级（150万）+ 设备更新（80万）+ 运营资金（70万）",
  investment_period_months: 36,
  revenue_share_ratio: 0.05,
  cashflow_frequency: "monthly",
  
  contact_name: "马店长",
  contact_phone: "13800000010",
  website: "https://haidilao.com",
  submitted_date: "2026-01-01T09:00:00.000Z",
  
  project_documents: `【项目名称】海底捞西安大雁塔店收入分成项目

【品牌介绍】
海底捞创立于1994年，是中国最大的火锅连锁品牌（港股上市）。
- 全球门店数量：1,400+
- 覆盖国家：中国、美国、英国、新加坡等15+国家
- 品牌定位：服务至上的火锅体验
- 平均客单价：110元
- 核心特色：极致服务、等位零食、生日惊喜

【门店信息】
- 位置：西安市雁塔区大雁塔南广场
- 面积：650平米
- 餐位：180座
- 开业时间：2020年8月
- 租金：18万/月
- 员工：50人
- 营业时间：10:00-次日4:00

【经营数据（近12个月平均）】
- 日均翻台：4.2次
- 餐位利用率：85%
- 客单价：115元
- 日均营收：74,970元（180×4.2×85%×115）
- 月均营收：224.91万元
- 年营收：2,698.92万元
- 毛利率：58%
- 净利率：8%

【收入构成】
- 锅底菜品：75%
- 酒水饮料：15%
- 调料零售：5%
- 其他：5%

【收入分成机制】
1. 分成来源：门店全部营业收入
2. 分成比例：5%
3. 分成频率：每月15日结算上月收入
4. 账户管理：中国银行三方共管账户

【投资回报测算】
- 投资金额：300万元
- 年分成收入：2698.92万 × 5% = 134.95万元
- 投资期限：36个月
- 预期总回款：404.85万元
- 回本倍数：1.35x（36个月）
- IRR：约25%

【特别说明】
1. 海底捞品牌溢价高，分成比例相对较低
2. 旅游旺季（暑假、国庆）营收可上浮30%
3. 品牌保障：海底捞总部提供运营支持`,

  financial_data: JSON.stringify({
    project_type: "store_operation",
    investment_amount: 300,
    investment_period_months: 36,
    revenue_share_ratio: 0.05,
    cashflow_frequency: "monthly",
    
    store_metrics: {
      area_sqm: 650,
      seats: 180,
      rent_monthly: 18,
      staff_count: 50,
      operating_hours: "10:00-次日4:00"
    },
    
    revenue_data: {
      daily_turnover: 4.2,
      seat_utilization: 0.85,
      avg_ticket: 115,
      daily_revenue: 74970,
      monthly_revenue: 2249100,
      annual_revenue: 26989200,
      gross_margin: 0.58,
      net_margin: 0.08
    }
  }),
  
  result: "pending"
};

// ============================================
// 工作流配置
// ============================================
export const workflowConfig = {
  id: "workflow-dgt-standard",
  name: "滴灌通标准投资筛选工作流",
  version: "v2.0.0",
  status: "active",
  description: "基于DRO收入分成模式的双层漏斗筛选流程",
  
  outer_agents: JSON.stringify([
    "negative-list-agent",    // 负面清单初筛
    "touch-agent",            // 材料完整性审核
    "interest-alignment-agent" // 利益一致性初筛
  ]),
  
  inner_agents: JSON.stringify([
    "financial-health-agent",      // 财务健康度
    "operational-capability-agent", // 运营能力
    "legal-compliance-agent",      // 法律合规
    "risk-control-agent",          // 风险控制
    "interest-deep-agent",         // 利益一致性深度
    "economic-calculation-agent",  // 经济性测算
    "comprehensive-scoring-agent"  // 综合评分
  ]),
  
  scoring_formula: `final_score = (financial × 0.25) + (operational × 0.20) + (legal × 0.15) + (risk × 0.15) + (interest × 0.10) + (economic × 0.10) + (adjustment × 0.05)`,
  
  pass_criteria: JSON.stringify({
    outer_ring: {
      mode: "sequential",
      rule: "所有外环智能体必须通过（一票否决）"
    },
    inner_ring: {
      mode: "parallel",
      rule: "加权平均分 >= 60 分"
    },
    final_decision: {
      "A级-强烈推荐": { min_score: 85, description: "项目优质，建议立即投资" },
      "B+级-推荐投资": { min_score: 75, description: "项目良好，建议投资并设置监控" },
      "B级-可投资": { min_score: 65, description: "项目合格，需关注特定风险" },
      "C级-谨慎投资": { min_score: 60, description: "边缘项目，需额外保障条件" },
      "D级-不建议": { min_score: 0, description: "不符合投资标准" }
    }
  }),
  
  execution_mode: JSON.stringify({
    outer_ring: "sequential",
    inner_ring: "parallel",
    timeout_seconds: 300,
    retry_enabled: true,
    max_retries: 2
  }),
  
  execution_count: 0,
  success_rate: 0,
  avg_duration: 0
};

// ============================================
// 导入扩展标的（20个实体门店）
// ============================================
import { extendedDeals, extendedDealsSummary } from './deals-seed-extended';

// ============================================
// 导入创新标的（20个非实体门店：票务、抖音投流、充电桩等）
// ============================================
import { innovativeDeals, innovativeDealsSummary } from './deals-seed-innovative';

// ============================================
// 导出基础标的（10个实体门店）
// ============================================
export const baseDeals = [
  deal_01_tea,      // 蜜雪冰城-深圳-每日
  deal_02_fastfood, // 老乡鸡-上海-每日
  deal_03_fresh,    // 叮咚买菜-杭州-每日
  deal_04_convenience, // 罗森-成都-每日
  deal_05_pet,      // 新瑞鹏-北京-每周
  deal_06_fitness,  // 乐刻-广州-每周
  deal_07_beauty,   // 永琪-武汉-每周
  deal_08_ktv,      // 唱吧麦颂-南京-每月
  deal_09_auto,     // 途虎-重庆-每月
  deal_10_hotpot    // 海底捞-西安-每月
];

// ============================================
// 导出实体门店标的（30个 = 基础10个 + 扩展20个）
// ============================================
export const storeDeals = [
  ...baseDeals,
  ...extendedDeals
];

// ============================================
// 导出所有标的（50个 = 实体门店30个 + 创新领域20个）
// ============================================
export const allDeals = [
  ...storeDeals,
  ...innovativeDeals
];

// ============================================
// 基础标的摘要信息（10个）
// ============================================
export const baseDealsSummary = [
  { id: "DGT-2026-001", name: "蜜雪冰城深圳科技园店", industry: "餐饮-茶饮", city: "深圳", amount: 35, share: "8%", frequency: "每日", irr: "18%" },
  { id: "DGT-2026-002", name: "老乡鸡上海日月光店", industry: "餐饮-快餐", city: "上海", amount: 80, share: "6%", frequency: "每日", irr: "22%" },
  { id: "DGT-2026-003", name: "叮咚买菜杭州拱墅仓", industry: "零售-生鲜", city: "杭州", amount: 120, share: "5%", frequency: "每日", irr: "21%" },
  { id: "DGT-2026-004", name: "罗森便利店成都春熙路", industry: "零售-便利店", city: "成都", amount: 60, share: "7%", frequency: "每日", irr: "35%" },
  { id: "DGT-2026-005", name: "新瑞鹏宠物医院北京望京", industry: "服务-宠物医疗", city: "北京", amount: 150, share: "12%", frequency: "每周", irr: "20%" },
  { id: "DGT-2026-006", name: "乐刻运动广州天河店", industry: "服务-健身", city: "广州", amount: 85, share: "10%", frequency: "每周", irr: "15%" },
  { id: "DGT-2026-007", name: "永琪美发武汉光谷店", industry: "服务-美容美发", city: "武汉", amount: 55, share: "10%", frequency: "每周", irr: "18%" },
  { id: "DGT-2026-008", name: "唱吧麦颂KTV南京新街口", industry: "文娱-KTV", city: "南京", amount: 200, share: "8%", frequency: "每月", irr: "15%" },
  { id: "DGT-2026-009", name: "途虎养车重庆龙湖店", industry: "服务-汽车养护", city: "重庆", amount: 180, share: "9%", frequency: "每月", irr: "18%" },
  { id: "DGT-2026-010", name: "海底捞西安大雁塔店", industry: "餐饮-火锅", city: "西安", amount: 300, share: "5%", frequency: "每月", irr: "25%" }
];

// ============================================
// 实体门店标的摘要信息（30个）
// ============================================
export const storeDealsSummary = [
  ...baseDealsSummary,
  ...extendedDealsSummary
];

// ============================================
// 全部标的摘要信息（50个 = 实体30个 + 创新20个）
// ============================================
export const dealsSummary = [
  ...storeDealsSummary,
  ...innovativeDealsSummary
];
