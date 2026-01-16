/**
 * 滴灌通投后回款数据生成器
 * 为100个标的生成模拟的投资和回款数据
 * 
 * 设计原则：
 * 1. 陆续投资：100个标的分布在过去18个月内陆续完成投资
 * 2. 真实回款：根据分成比例和频率生成回款记录
 * 3. 波动模拟：营收有季节性和随机波动
 * 4. 状态多样：包含已完成、进行中、部分延迟等状态
 * 5. 频率分布：70% daily, 20% weekly, 10% monthly - 使图表数据更稳定连续
 */

// 回款记录类型
export interface CashflowRecord {
  id: string;
  deal_id: string;
  amount: number;
  currency: string;
  period_type: string;
  period_start: string;
  period_end: string;
  payment_date: string;
  status: 'paid' | 'pending' | 'delayed';
  notes: string;
}

// 交易记录类型
export interface Transaction {
  id: string;
  deal_id: string;
  investor_id: string;
  transaction_type: 'invest' | 'divest' | 'transfer';
  amount: number;
  currency: string;
  transaction_date: string;
  price_per_unit: number | null;
  units: number | null;
  fee: number;
  status: string;
  notes: string;
}

// 投资时间分布配置（模拟12个月内陆续投资，从2025年1月开始）
const INVESTMENT_TIMELINE = {
  startDate: '2025-01-15', // 开始投资日期
  endDate: '2026-01-15',   // 当前日期
  phases: [
    { name: '初期', months: [0, 1], dealCount: 20, description: '试点阶段' },
    { name: '扩张期', months: [2, 3, 4], dealCount: 30, description: '快速扩张' },
    { name: '稳定期', months: [5, 6, 7, 8], dealCount: 30, description: '稳定增长' },
    { name: '近期', months: [9, 10, 11], dealCount: 20, description: '最新投资' }
  ]
};

// 季节性系数（模拟营收波动）
const SEASONALITY = {
  1: 0.85,   // 1月 春节前
  2: 0.70,   // 2月 春节
  3: 0.90,   // 3月 恢复
  4: 1.00,   // 4月 正常
  5: 1.05,   // 5月 五一
  6: 1.00,   // 6月 正常
  7: 1.15,   // 7月 暑期
  8: 1.20,   // 8月 暑期旺季
  9: 1.05,   // 9月 开学
  10: 1.10,  // 10月 国庆
  11: 1.15,  // 11月 双十一
  12: 1.25   // 12月 年底旺季
};

// 行业特定系数
const INDUSTRY_FACTORS: Record<string, { volatility: number; trend: number }> = {
  'catering': { volatility: 0.15, trend: 1.02 },      // 餐饮：中等波动，稳定增长
  'retail': { volatility: 0.12, trend: 1.01 },        // 零售：较低波动
  'service': { volatility: 0.10, trend: 1.03 },       // 服务：低波动，较快增长
  'entertainment': { volatility: 0.25, trend: 1.00 }, // 文娱：高波动
  'education': { volatility: 0.08, trend: 0.98 },     // 教育：低波动，略有下降
  'new-energy': { volatility: 0.20, trend: 1.08 },    // 新能源：高波动，快速增长
  'douyin-ads': { volatility: 0.30, trend: 1.05 },    // 抖音投流：高波动
  'default': { volatility: 0.15, trend: 1.00 }
};

// 生成UUID
function generateId(prefix: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}`;
}

// 添加天数到日期
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// 格式化日期为 YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// 获取月份的季节性系数
function getSeasonality(date: Date): number {
  const month = date.getMonth() + 1;
  return SEASONALITY[month as keyof typeof SEASONALITY] || 1.0;
}

// 获取行业系数
function getIndustryFactor(industry: string): { volatility: number; trend: number } {
  return INDUSTRY_FACTORS[industry] || INDUSTRY_FACTORS['default'];
}

// 生成随机波动
function randomVariation(baseAmount: number, volatility: number): number {
  const variation = (Math.random() - 0.5) * 2 * volatility;
  return baseAmount * (1 + variation);
}

// 为单个标的生成投资日期
function generateInvestmentDate(dealIndex: number, totalDeals: number): Date {
  const startDate = new Date(INVESTMENT_TIMELINE.startDate);
  
  // 根据阶段分配投资日期
  let cumulativeDeals = 0;
  for (const phase of INVESTMENT_TIMELINE.phases) {
    cumulativeDeals += phase.dealCount;
    if (dealIndex < cumulativeDeals) {
      // 在该阶段的月份范围内随机选择
      const monthIndex = phase.months[Math.floor(Math.random() * phase.months.length)];
      const dayInMonth = Math.floor(Math.random() * 28) + 1;
      const investDate = new Date(startDate);
      investDate.setMonth(investDate.getMonth() + monthIndex);
      investDate.setDate(dayInMonth);
      return investDate;
    }
  }
  
  // 默认返回最近的日期
  return new Date('2025-11-15');
}

// 计算期间结束日期
function getPeriodEnd(periodStart: Date, frequency: string): Date {
  const end = new Date(periodStart);
  switch (frequency) {
    case 'daily':
      return end; // 同一天
    case 'weekly':
      end.setDate(end.getDate() + 6);
      return end;
    case 'monthly':
      end.setMonth(end.getMonth() + 1);
      end.setDate(0); // 月末
      return end;
    default:
      return end;
  }
}

// 获取下一个周期开始日期
function getNextPeriodStart(currentStart: Date, frequency: string): Date {
  const next = new Date(currentStart);
  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + 1);
      break;
    case 'weekly':
      next.setDate(next.getDate() + 7);
      break;
    case 'monthly':
      next.setMonth(next.getMonth() + 1);
      next.setDate(1);
      break;
  }
  return next;
}

// 计算单期预期回款金额
function calculateExpectedCashflow(
  deal: any,
  frequency: string
): number {
  let financialData: any = {};
  try {
    financialData = typeof deal.financial_data === 'string' 
      ? JSON.parse(deal.financial_data) 
      : deal.financial_data || {};
  } catch (e) {
    // 使用默认值
  }
  
  const monthlyRevenue = financialData.revenue_data?.monthly_revenue || 
                         financialData.revenue_data?.annual_revenue / 12 ||
                         deal.funding_amount * 10000 * 2; // 默认年营收为投资额的2倍
  
  const shareRatio = financialData.revenue_share_ratio || deal.revenue_share_ratio || 0.05;
  
  // 计算单期回款
  switch (frequency) {
    case 'daily':
      return (monthlyRevenue * shareRatio) / 30;
    case 'weekly':
      return (monthlyRevenue * shareRatio) / 4;
    case 'monthly':
      return monthlyRevenue * shareRatio;
    default:
      return monthlyRevenue * shareRatio;
  }
}

// 为单个标的生成回款记录
export function generateCashflowRecords(
  deal: any,
  investmentDate: Date,
  currentDate: Date
): CashflowRecord[] {
  const records: CashflowRecord[] = [];
  const frequency = deal.cashflow_frequency || 'monthly';
  const industry = deal.industry || 'default';
  const industryFactor = getIndustryFactor(industry);
  
  const baseAmount = calculateExpectedCashflow(deal, frequency);
  
  // 从投资日期开始，到当前日期结束
  let periodStart = new Date(investmentDate);
  
  // 调整到合适的起始日期
  if (frequency === 'monthly') {
    periodStart.setDate(1);
    if (periodStart < investmentDate) {
      periodStart.setMonth(periodStart.getMonth() + 1);
    }
  } else if (frequency === 'weekly') {
    // 调整到下一个周一
    const dayOfWeek = periodStart.getDay();
    if (dayOfWeek !== 1) {
      periodStart.setDate(periodStart.getDate() + (8 - dayOfWeek) % 7);
    }
  }
  
  let periodIndex = 0;
  // 限制最大周期数，避免生成过多数据
  // 每日: 最多90天, 每周: 最多52周, 每月: 最多18个月
  const maxPeriods = frequency === 'daily' ? 90 : frequency === 'weekly' ? 52 : 18;
  
  while (periodStart <= currentDate && periodIndex < maxPeriods) {
    const periodEnd = getPeriodEnd(periodStart, frequency);
    
    // 计算该期的实际金额（考虑季节性和波动）
    const seasonality = getSeasonality(periodStart);
    const trendFactor = Math.pow(industryFactor.trend, periodIndex / 12); // 年化趋势
    const actualAmount = randomVariation(
      baseAmount * seasonality * trendFactor,
      industryFactor.volatility
    );
    
    // 确定支付日期（通常在周期结束后1-3天）
    const paymentDelay = frequency === 'daily' ? 1 : frequency === 'weekly' ? 2 : 5;
    const paymentDate = addDays(periodEnd, paymentDelay + Math.floor(Math.random() * 2));
    
    // 确定状态（小概率延迟）
    let status: 'paid' | 'pending' | 'delayed' = 'paid';
    if (paymentDate > currentDate) {
      status = 'pending';
    } else if (Math.random() < 0.02) { // 2%概率延迟
      status = 'delayed';
    }
    
    records.push({
      id: generateId('CF'),
      deal_id: deal.id,
      amount: Math.round(actualAmount * 100) / 100,
      currency: 'CNY',
      period_type: frequency,
      period_start: formatDate(periodStart),
      period_end: formatDate(periodEnd),
      payment_date: formatDate(paymentDate),
      status,
      notes: `${deal.company_name} - ${frequency === 'daily' ? '日' : frequency === 'weekly' ? '周' : '月'}回款`
    });
    
    periodStart = getNextPeriodStart(periodStart, frequency);
    periodIndex++;
  }
  
  return records;
}

// 为单个标的生成投资交易记录
export function generateInvestmentTransaction(
  deal: any,
  investmentDate: Date,
  investorId: string
): Transaction {
  return {
    id: generateId('TRX'),
    deal_id: deal.id,
    investor_id: investorId,
    transaction_type: 'invest',
    amount: (deal.funding_amount || 50) * 10000, // 转换为元
    currency: 'CNY',
    transaction_date: formatDate(investmentDate),
    price_per_unit: 1,
    units: (deal.funding_amount || 50) * 10000,
    fee: Math.round((deal.funding_amount || 50) * 100), // 1%手续费
    status: 'completed',
    notes: `投资 ${deal.company_name}`
  };
}

// 计算标的的累计回款
export function calculateTotalCashflow(records: CashflowRecord[]): number {
  return records
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + r.amount, 0);
}

/**
 * 根据目标比例为标的分配回款频率
 * 目标分布：70% daily, 20% weekly, 10% monthly
 * 使用确定性算法确保每次生成结果一致，同时满足目标比例
 */
function assignCashflowFrequency(dealIndex: number, totalDeals: number): 'daily' | 'weekly' | 'monthly' {
  // 计算各频率的标的数量
  const dailyCount = Math.round(totalDeals * 0.70);
  const weeklyCount = Math.round(totalDeals * 0.20);
  // monthly 获取剩余的
  
  // 根据索引确定频率类型
  // 前70%为daily，接下来20%为weekly，最后10%为monthly
  if (dealIndex < dailyCount) {
    return 'daily';
  } else if (dealIndex < dailyCount + weeklyCount) {
    return 'weekly';
  } else {
    return 'monthly';
  }
}

/**
 * 使用 Fisher-Yates 洗牌算法打乱数组
 * 使用基于deal id的确定性种子，确保每次生成结果一致
 */
function shuffleWithSeed(array: any[], seed: number): any[] {
  const result = [...array];
  let currentIndex = result.length;
  
  // 简单的伪随机数生成器
  const seededRandom = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  
  while (currentIndex > 0) {
    const randomIndex = Math.floor(seededRandom() * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [result[randomIndex], result[currentIndex]];
  }
  
  return result;
}

// 生成所有标的的投后数据
export function generateAllPostInvestmentData(deals: any[]) {
  const currentDate = new Date('2026-01-15'); // 当前日期
  const allCashflows: CashflowRecord[] = [];
  const allTransactions: Transaction[] = [];
  const dealUpdates: any[] = [];
  
  // 默认投资人
  const defaultInvestorId = 'INV-DGT-001';
  
  // 为了使频率分配更加随机（而不是按顺序分配），
  // 我们先创建一个打乱顺序的索引数组
  // 使用确定性种子确保每次生成结果一致
  const seed = 20260116; // 固定种子
  const shuffledIndices = shuffleWithSeed(
    deals.map((_, i) => i),
    seed
  );
  
  // 创建索引到频率的映射
  const indexToFrequency = new Map<number, 'daily' | 'weekly' | 'monthly'>();
  shuffledIndices.forEach((originalIndex, shuffledPosition) => {
    const frequency = assignCashflowFrequency(shuffledPosition, deals.length);
    indexToFrequency.set(originalIndex, frequency);
  });
  
  deals.forEach((deal, index) => {
    // 生成投资日期
    const investmentDate = generateInvestmentDate(index, deals.length);
    
    // 生成投资交易
    const transaction = generateInvestmentTransaction(deal, investmentDate, defaultInvestorId);
    allTransactions.push(transaction);
    
    // 获取按比例分配的频率（覆盖原始deal中的频率设置）
    const assignedFrequency = indexToFrequency.get(index) || 'daily';
    
    // 创建带有分配频率的deal副本
    const dealWithAssignedFrequency = {
      ...deal,
      cashflow_frequency: assignedFrequency
    };
    
    // 生成回款记录
    const cashflows = generateCashflowRecords(dealWithAssignedFrequency, investmentDate, currentDate);
    allCashflows.push(...cashflows);
    
    // 计算累计回款
    const totalCashflow = calculateTotalCashflow(cashflows);
    
    // 标的更新信息
    dealUpdates.push({
      id: deal.id,
      status: 'invested',
      invested_amount: (deal.funding_amount || 50) * 10000,
      invested_date: formatDate(investmentDate),
      investor_id: defaultInvestorId,
      total_cashflow: Math.round(totalCashflow * 100) / 100,
      cashflow_frequency: assignedFrequency // 保存分配的频率
    });
  });
  
  // 计算实际频率分布统计
  const frequencyStats = {
    daily: dealUpdates.filter(d => d.cashflow_frequency === 'daily').length,
    weekly: dealUpdates.filter(d => d.cashflow_frequency === 'weekly').length,
    monthly: dealUpdates.filter(d => d.cashflow_frequency === 'monthly').length
  };
  
  return {
    cashflows: allCashflows,
    transactions: allTransactions,
    dealUpdates,
    summary: {
      totalDeals: deals.length,
      totalInvested: allTransactions.reduce((sum, t) => sum + t.amount, 0),
      totalCashflow: allCashflows.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0),
      cashflowRecords: allCashflows.length,
      byFrequency: {
        daily: allCashflows.filter(c => c.period_type === 'daily').length,
        weekly: allCashflows.filter(c => c.period_type === 'weekly').length,
        monthly: allCashflows.filter(c => c.period_type === 'monthly').length
      },
      // 新增：按标的统计的频率分布
      dealsByFrequency: frequencyStats,
      frequencyDistribution: {
        daily: `${(frequencyStats.daily / deals.length * 100).toFixed(1)}%`,
        weekly: `${(frequencyStats.weekly / deals.length * 100).toFixed(1)}%`,
        monthly: `${(frequencyStats.monthly / deals.length * 100).toFixed(1)}%`
      }
    }
  };
}

// 生成统计摘要
export function generateCashflowSummary(cashflows: CashflowRecord[], deals: any[]) {
  const byDeal = new Map<string, { total: number; count: number; latest: string }>();
  
  cashflows.forEach(cf => {
    const current = byDeal.get(cf.deal_id) || { total: 0, count: 0, latest: '' };
    if (cf.status === 'paid') {
      current.total += cf.amount;
      current.count++;
      if (cf.payment_date > current.latest) {
        current.latest = cf.payment_date;
      }
    }
    byDeal.set(cf.deal_id, current);
  });
  
  // 按月汇总
  const byMonth = new Map<string, number>();
  cashflows.filter(c => c.status === 'paid').forEach(cf => {
    const month = cf.payment_date.substring(0, 7);
    byMonth.set(month, (byMonth.get(month) || 0) + cf.amount);
  });
  
  return {
    byDeal: Object.fromEntries(byDeal),
    byMonth: Object.fromEntries([...byMonth.entries()].sort()),
    totalPaid: cashflows.filter(c => c.status === 'paid').reduce((sum, c) => sum + c.amount, 0),
    totalPending: cashflows.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0),
    totalDelayed: cashflows.filter(c => c.status === 'delayed').reduce((sum, c) => sum + c.amount, 0)
  };
}
