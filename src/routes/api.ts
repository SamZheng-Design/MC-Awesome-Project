import { Hono } from 'hono'
import OpenAI from 'openai'
import { agentsSeed } from '../data/agents-seed'
import { cardiBDeal, workflowConfig } from '../data/deals-seed'

type Bindings = {
  DB: D1Database
  OPENAI_API_KEY: string
  OPENAI_BASE_URL: string
}

// OpenAI配置 - 从环境变量或Cloudflare secrets读取
const getOpenAIClient = (env: Bindings) => {
  // 优先使用环境变量，然后使用Cloudflare bindings
  const apiKey = env.OPENAI_API_KEY || process.env.OPENAI_API_KEY
  const baseURL = env.OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://www.genspark.ai/api/llm_proxy/v1'
  
  return new OpenAI({
    apiKey,
    baseURL,
  })
}

const api = new Hono<{ Bindings: Bindings }>()

// ============================================
// 数据库初始化和种子数据
// ============================================
api.post('/init-db', async (c) => {
  const db = c.env.DB
  
  try {
    // 检查agents表是否有数据
    const existingAgents = await db.prepare('SELECT COUNT(*) as count FROM agents').first<{count: number}>()
    
    if (existingAgents && existingAgents.count > 0) {
      return c.json({ success: true, message: '数据库已初始化', agents: existingAgents.count })
    }
    
    // 插入智能体种子数据
    for (const agent of agentsSeed) {
      await db.prepare(`
        INSERT INTO agents (id, name, ring_type, industry, dimension, weight, description, 
          system_prompt, evaluation_criteria, knowledge_base, knowledge_files, output_format, 
          pass_threshold, is_enabled, execution_order, model_config, icon, icon_color)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        agent.id, agent.name, agent.ring_type, agent.industry, agent.dimension, agent.weight,
        agent.description, agent.system_prompt, agent.evaluation_criteria, agent.knowledge_base,
        JSON.stringify([]), agent.output_format, agent.pass_threshold, agent.is_enabled,
        agent.execution_order, agent.model_config, agent.icon, agent.icon_color
      ).run()
    }
    
    // 插入Cardi B项目数据
    await db.prepare(`
      INSERT INTO deals (id, company_name, credit_code, industry, status, main_business,
        funding_amount, contact_name, contact_phone, website, submitted_date, project_documents,
        financial_data, result)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      cardiBDeal.id, cardiBDeal.company_name, cardiBDeal.credit_code, cardiBDeal.industry,
      cardiBDeal.status, cardiBDeal.main_business, cardiBDeal.funding_amount,
      cardiBDeal.contact_name, cardiBDeal.contact_phone, cardiBDeal.website,
      cardiBDeal.submitted_date, cardiBDeal.project_documents, cardiBDeal.financial_data,
      cardiBDeal.result
    ).run()
    
    // 插入工作流配置
    await db.prepare(`
      INSERT INTO workflow (id, name, version, status, outer_agents, inner_agents,
        scoring_formula, pass_criteria, execution_mode, execution_count, success_rate, avg_duration)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).bind(
      workflowConfig.id, workflowConfig.name, workflowConfig.version, workflowConfig.status,
      workflowConfig.outer_agents, workflowConfig.inner_agents, workflowConfig.scoring_formula,
      workflowConfig.pass_criteria, workflowConfig.execution_mode, workflowConfig.execution_count,
      workflowConfig.success_rate, workflowConfig.avg_duration
    ).run()
    
    return c.json({ success: true, message: '数据库初始化成功', agents: agentsSeed.length })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 智能体 CRUD API
// ============================================

// 获取所有智能体
api.get('/agents', async (c) => {
  const db = c.env.DB
  const ringType = c.req.query('ring_type')
  
  try {
    let query = 'SELECT * FROM agents ORDER BY ring_type, execution_order'
    if (ringType) {
      query = 'SELECT * FROM agents WHERE ring_type = ? ORDER BY execution_order'
    }
    
    const result = ringType 
      ? await db.prepare(query).bind(ringType).all()
      : await db.prepare(query).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 获取单个智能体
api.get('/agents/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(id).first()
    if (!agent) {
      return c.json({ success: false, error: '智能体不存在' }, 404)
    }
    return c.json({ success: true, data: agent })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 更新智能体
api.patch('/agents/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const updates = await c.req.json()
  
  try {
    // 构建动态更新语句
    const fields = Object.keys(updates)
    const setClause = fields.map(f => `${f} = ?`).join(', ')
    const values = [...Object.values(updates), new Date().toISOString(), id]
    
    await db.prepare(`UPDATE agents SET ${setClause}, updated_at = ? WHERE id = ?`).bind(...values).run()
    
    const updated = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(id).first()
    return c.json({ success: true, data: updated, message: '智能体配置已更新' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 标的 CRUD API
// ============================================

// 获取所有标的
api.get('/deals', async (c) => {
  const db = c.env.DB
  const status = c.req.query('status')
  const industry = c.req.query('industry')
  
  try {
    let query = 'SELECT * FROM deals ORDER BY submitted_date DESC'
    let params: string[] = []
    
    if (status || industry) {
      const conditions: string[] = []
      if (status) {
        conditions.push('status = ?')
        params.push(status)
      }
      if (industry) {
        conditions.push('industry = ?')
        params.push(industry)
      }
      query = `SELECT * FROM deals WHERE ${conditions.join(' AND ')} ORDER BY submitted_date DESC`
    }
    
    const result = params.length > 0
      ? await db.prepare(query).bind(...params).all()
      : await db.prepare(query).all()
    
    return c.json({ success: true, data: result.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 获取单个标的
api.get('/deals/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  
  try {
    const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first()
    if (!deal) {
      return c.json({ success: false, error: '标的不存在' }, 404)
    }
    return c.json({ success: true, data: deal })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 创建新标的
api.post('/deals', async (c) => {
  const db = c.env.DB
  const deal = await c.req.json()
  
  try {
    // 生成ID
    const year = new Date().getFullYear()
    const count = await db.prepare('SELECT COUNT(*) as c FROM deals WHERE id LIKE ?').bind(`DGT-${year}-%`).first<{c: number}>()
    const newId = `DGT-${year}-${String((count?.c || 0) + 1).padStart(4, '0')}`
    
    await db.prepare(`
      INSERT INTO deals (id, company_name, credit_code, industry, status, main_business,
        funding_amount, contact_name, contact_phone, website, project_documents, financial_data, result)
      VALUES (?, ?, ?, ?, 'pending', ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(
      newId, deal.company_name, deal.credit_code, deal.industry, deal.main_business,
      deal.funding_amount, deal.contact_name, deal.contact_phone, deal.website,
      deal.project_documents, deal.financial_data
    ).run()
    
    const created = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(newId).first()
    return c.json({ success: true, data: created, message: '标的创建成功' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 更新标的
api.patch('/deals/:id', async (c) => {
  const db = c.env.DB
  const id = c.req.param('id')
  const updates = await c.req.json()
  
  try {
    const fields = Object.keys(updates)
    const setClause = fields.map(f => `${f} = ?`).join(', ')
    const values = [...Object.values(updates), new Date().toISOString(), id]
    
    await db.prepare(`UPDATE deals SET ${setClause}, updated_at = ? WHERE id = ?`).bind(...values).run()
    
    const updated = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(id).first()
    return c.json({ success: true, data: updated })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 工作流 API
// ============================================

api.get('/workflow', async (c) => {
  const db = c.env.DB
  
  try {
    const workflow = await db.prepare('SELECT * FROM workflow WHERE status = ?').bind('active').first()
    return c.json({ success: true, data: workflow })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// 评估日志 API
// ============================================

api.get('/evaluation-logs/:dealId', async (c) => {
  const db = c.env.DB
  const dealId = c.req.param('dealId')
  
  try {
    const logs = await db.prepare('SELECT * FROM evaluation_logs WHERE deal_id = ? ORDER BY executed_at')
      .bind(dealId).all()
    return c.json({ success: true, data: logs.results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ============================================
// AI 调用 API - 核心功能
// ============================================

api.post('/ai/evaluate', async (c) => {
  const { agentId, dealId, testMode = false, testInput = null } = await c.req.json()
  const db = c.env.DB
  
  try {
    // 获取智能体配置
    const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(agentId).first<any>()
    if (!agent) {
      return c.json({ success: false, error: '智能体不存在' }, 404)
    }
    
    // 获取标的数据（测试模式下可选）
    let dealData = testInput
    if (!testMode && dealId) {
      const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(dealId).first<any>()
      if (!deal) {
        return c.json({ success: false, error: '标的不存在' }, 404)
      }
      dealData = {
        deal_info: deal,
        project_documents: deal.project_documents,
        financial_data: deal.financial_data ? JSON.parse(deal.financial_data) : null
      }
    }
    
    // 构建完整Prompt
    const fullPrompt = `
${agent.system_prompt}

## 知识库参考
${agent.knowledge_base}

## 评估标准
${agent.evaluation_criteria}

## 输出格式要求
请严格按照以下JSON格式输出，确保返回有效的JSON：
${agent.output_format}

## 待评估数据
${JSON.stringify(dealData, null, 2)}

请开始评估，直接输出JSON结果：
`
    
    // 调用OpenAI API
    const modelConfig = JSON.parse(agent.model_config)
    const client = getOpenAIClient(c.env)
    
    const startTime = Date.now()
    
    const completion = await client.chat.completions.create({
      model: modelConfig.model || 'gpt-5',
      messages: [
        { role: 'system', content: agent.system_prompt },
        { role: 'user', content: fullPrompt }
      ],
      temperature: modelConfig.temperature || 0.2,
      max_tokens: modelConfig.max_tokens || 2000,
    })
    
    const executionTime = Date.now() - startTime
    const aiResponse = completion.choices[0]?.message?.content || ''
    
    // 解析AI返回的JSON
    let result
    try {
      // 尝试提取JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[0])
      } else {
        throw new Error('无法从AI响应中提取JSON')
      }
    } catch (parseError: any) {
      return c.json({
        success: false,
        error: '解析AI响应失败',
        raw_response: aiResponse,
        parse_error: parseError.message
      }, 500)
    }
    
    // 非测试模式下保存评估日志
    if (!testMode && dealId) {
      const logId = `LOG-${Date.now()}`
      await db.prepare(`
        INSERT INTO evaluation_logs (id, deal_id, agent_id, agent_name, ring_type,
          input_data, output_result, score, pass_status, reasoning, execution_time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        logId, dealId, agentId, agent.name, agent.ring_type,
        JSON.stringify(dealData), JSON.stringify(result),
        result.score || 0, result.pass ? 1 : 0, result.reasoning || '',
        executionTime
      ).run()
    }
    
    return c.json({
      success: true,
      data: {
        agentId,
        agentName: agent.name,
        ringType: agent.ring_type,
        result,
        executionTime,
        pass: result.pass !== undefined ? result.pass : (result.score >= agent.pass_threshold)
      }
    })
    
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 执行完整评估流程
api.post('/ai/evaluate-deal', async (c) => {
  const { dealId } = await c.req.json()
  const db = c.env.DB
  
  try {
    // 获取工作流配置
    const workflow = await db.prepare('SELECT * FROM workflow WHERE status = ?').bind('active').first<any>()
    if (!workflow) {
      return c.json({ success: false, error: '无可用工作流' }, 404)
    }
    
    const outerAgents = JSON.parse(workflow.outer_agents)
    const innerAgents = JSON.parse(workflow.inner_agents).filter((id: string) => id !== 'comprehensive-scoring-agent')
    
    const results: any = { outer: [], inner: [], final: null }
    
    // 更新标的状态
    await db.prepare('UPDATE deals SET status = ? WHERE id = ?').bind('outer', dealId).run()
    
    // 外环串行执行
    for (const agentId of outerAgents) {
      const response = await c.env.AI_INTERNAL?.fetch(new Request('http://internal/api/ai/evaluate', {
        method: 'POST',
        body: JSON.stringify({ agentId, dealId })
      }))
      
      // 直接调用评估函数
      const evalResult = await evaluateWithAgent(c, db, agentId, dealId)
      
      results.outer.push(evalResult)
      
      if (!evalResult.pass) {
        await db.prepare('UPDATE deals SET status = ?, result = ? WHERE id = ?')
          .bind('rejected', 'reject', dealId).run()
        return c.json({
          success: true,
          stage: 'outer',
          rejected: true,
          rejectAgent: agentId,
          results
        })
      }
    }
    
    // 更新状态为中环评估
    await db.prepare('UPDATE deals SET status = ? WHERE id = ?').bind('evaluation', dealId).run()
    
    // 中环并行执行
    const innerPromises = innerAgents.map((agentId: string) => 
      evaluateWithAgent(c, db, agentId, dealId)
    )
    
    results.inner = await Promise.all(innerPromises)
    
    // 计算加权评分
    const agentsMap: any = {}
    const agents = await db.prepare('SELECT * FROM agents WHERE ring_type = ?').bind('inner').all()
    agents.results?.forEach((a: any) => { agentsMap[a.id] = a })
    
    let weightedSum = 0
    let totalWeight = 0
    const scores: any = {}
    
    results.inner.forEach((r: any) => {
      const agent = agentsMap[r.agentId]
      if (agent) {
        scores[r.agentId] = r.result.score
        weightedSum += r.result.score * (agent.weight / 100)
        totalWeight += agent.weight / 100
      }
    })
    
    const normalizedScore = totalWeight > 0 ? weightedSum / totalWeight : 0
    
    // 综合评分智能体
    const comprehensiveResult = await evaluateWithAgent(c, db, 'comprehensive-scoring-agent', dealId, {
      dimension_scores: scores,
      weighted_score: normalizedScore,
      individual_results: results.inner
    })
    
    const finalScore = Math.round(normalizedScore * 100) / 100
    
    // 确定评级
    let grade = 'D'
    if (finalScore >= 85) grade = 'A'
    else if (finalScore >= 75) grade = 'B+'
    else if (finalScore >= 65) grade = 'B'
    else if (finalScore >= 60) grade = 'C'
    
    results.final = {
      score: finalScore,
      grade,
      details: comprehensiveResult.result
    }
    
    // 更新标的
    await db.prepare(`
      UPDATE deals SET 
        status = 'review',
        total_score = ?,
        score_financial = ?,
        score_operational = ?,
        score_legal = ?,
        score_risk = ?,
        score_interest = ?,
        score_economic = ?,
        evaluation_details = ?,
        final_recommendation = ?,
        result = ?,
        updated_at = ?
      WHERE id = ?
    `).bind(
      finalScore,
      scores['financial-health-agent'] || 0,
      scores['operational-capability-agent'] || 0,
      scores['legal-compliance-agent'] || 0,
      scores['risk-control-agent'] || 0,
      scores['interest-deep-agent'] || 0,
      scores['economic-calculation-agent'] || 0,
      JSON.stringify(results),
      comprehensiveResult.result?.recommendation_detail || '',
      finalScore >= 65 ? 'pass' : 'reject',
      new Date().toISOString(),
      dealId
    ).run()
    
    return c.json({ success: true, results })
    
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 辅助函数：执行单个智能体评估
async function evaluateWithAgent(c: any, db: D1Database, agentId: string, dealId: string, extraData?: any) {
  const agent = await db.prepare('SELECT * FROM agents WHERE id = ?').bind(agentId).first<any>()
  if (!agent) throw new Error(`智能体 ${agentId} 不存在`)
  
  const deal = await db.prepare('SELECT * FROM deals WHERE id = ?').bind(dealId).first<any>()
  if (!deal) throw new Error(`标的 ${dealId} 不存在`)
  
  const dealData = {
    deal_info: deal,
    project_documents: deal.project_documents,
    financial_data: deal.financial_data ? JSON.parse(deal.financial_data) : null,
    ...extraData
  }
  
  const fullPrompt = `
${agent.system_prompt}

## 知识库参考
${agent.knowledge_base}

## 评估标准
${agent.evaluation_criteria}

## 输出格式要求
请严格按照以下JSON格式输出：
${agent.output_format}

## 待评估数据
${JSON.stringify(dealData, null, 2)}

请开始评估，直接输出JSON结果：
`
  
  const modelConfig = JSON.parse(agent.model_config)
  const client = getOpenAIClient(c.env)
  
  const startTime = Date.now()
  
  const completion = await client.chat.completions.create({
    model: modelConfig.model || 'gpt-5',
    messages: [
      { role: 'system', content: agent.system_prompt },
      { role: 'user', content: fullPrompt }
    ],
    temperature: modelConfig.temperature || 0.2,
    max_tokens: modelConfig.max_tokens || 2000,
  })
  
  const executionTime = Date.now() - startTime
  const aiResponse = completion.choices[0]?.message?.content || ''
  
  let result
  try {
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      result = JSON.parse(jsonMatch[0])
    } else {
      throw new Error('无法从AI响应中提取JSON')
    }
  } catch (e) {
    result = { score: 0, pass: false, error: 'JSON解析失败', raw: aiResponse }
  }
  
  // 保存日志
  const logId = `LOG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  await db.prepare(`
    INSERT INTO evaluation_logs (id, deal_id, agent_id, agent_name, ring_type,
      input_data, output_result, score, pass_status, reasoning, execution_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(
    logId, dealId, agentId, agent.name, agent.ring_type,
    JSON.stringify(dealData), JSON.stringify(result),
    result.score || 0, result.pass ? 1 : 0, result.reasoning || '',
    executionTime
  ).run()
  
  return {
    agentId,
    agentName: agent.name,
    ringType: agent.ring_type,
    result,
    executionTime,
    pass: result.pass !== undefined ? result.pass : (result.score >= agent.pass_threshold)
  }
}

// ============================================
// 统计数据 API
// ============================================

api.get('/stats', async (c) => {
  const db = c.env.DB
  
  try {
    const totalDeals = await db.prepare('SELECT COUNT(*) as count FROM deals').first<{count: number}>()
    const passedDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE result = 'pass'").first<{count: number}>()
    const pendingDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE status IN ('pending', 'outer', 'evaluation')").first<{count: number}>()
    const rejectedDeals = await db.prepare("SELECT COUNT(*) as count FROM deals WHERE result = 'reject'").first<{count: number}>()
    const totalAgents = await db.prepare('SELECT COUNT(*) as count FROM agents WHERE is_enabled = 1').first<{count: number}>()
    
    return c.json({
      success: true,
      data: {
        totalDeals: totalDeals?.count || 0,
        passedDeals: passedDeals?.count || 0,
        pendingDeals: pendingDeals?.count || 0,
        rejectedDeals: rejectedDeals?.count || 0,
        totalAgents: totalAgents?.count || 0,
        automationRate: 95
      }
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

export default api
