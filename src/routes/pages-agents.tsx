// 智能体配置页面 - agents.html
export const agentsPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">智能体配置中心</h1>
    <p class="text-gray-500">配置和管理所有AI评估智能体 · 不同赛道拥有专属评估智能体群</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="openAddAgentModal()" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
      <i class="fas fa-plus mr-2"></i>添加智能体
    </button>
    <button onclick="refreshAgents()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-sync-alt mr-2"></i>刷新
    </button>
  </div>
</div>

<!-- 双层Tab布局 -->
<div class="bg-white rounded-xl card-shadow overflow-hidden">
  <!-- 环类型Tab -->
  <div class="border-b">
    <div class="flex items-center justify-between">
      <div class="flex">
        <button id="tab-outer" onclick="switchRingTab('outer')" class="px-6 py-4 font-medium text-primary-600 border-b-2 border-primary-500 bg-primary-50">
          <i class="fas fa-filter mr-2"></i>筛子体系 <span class="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">一票否决</span>
        </button>
        <button id="tab-inner" onclick="switchRingTab('inner')" class="px-6 py-4 font-medium text-gray-500 hover:text-gray-700 transition">
          <i class="fas fa-funnel-dollar mr-2"></i>漏斗体系 <span class="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">加权评分</span>
        </button>
      </div>
    </div>
  </div>

  <!-- 赛道选择卡片（仅中环显示） -->
  <div id="track-selector" class="hidden">
    <div class="p-6 bg-gradient-to-br from-slate-50 to-gray-100">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="font-semibold text-gray-800">选择赛道查看专属智能体</h3>
          <p class="text-sm text-gray-500">不同赛道拥有专属的评估智能体群</p>
        </div>
        <button onclick="showAllAgentsPage()" class="px-4 py-2 bg-gradient-to-r from-[#00D29E] to-[#00B88A] text-white rounded-lg hover:opacity-90 transition text-sm">
          <i class="fas fa-th-large mr-2"></i>全部智能体
        </button>
      </div>
      <div id="track-cards" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <!-- 动态加载赛道卡片 -->
      </div>
    </div>
  </div>

  <!-- 当前赛道标题（选择赛道后显示） -->
  <div id="current-track-header" class="hidden px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button onclick="backToTrackSelector()" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div id="current-track-icon" class="w-10 h-10 rounded-lg flex items-center justify-center"></div>
        <div>
          <h3 id="current-track-name" class="font-bold text-lg text-gray-800"></h3>
          <p id="current-track-desc" class="text-sm text-gray-500"></p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span id="current-track-count" class="px-3 py-1 rounded-full text-sm text-white"></span>
      </div>
    </div>
  </div>

  <!-- 全部智能体页面标题（显示全部时） -->
  <div id="all-agents-header" class="hidden px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <button onclick="backToTrackSelector()" class="w-8 h-8 rounded-lg bg-white hover:bg-gray-100 flex items-center justify-center text-gray-600 transition shadow-sm">
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
          <i class="fas fa-th-large text-white"></i>
        </div>
        <div>
          <h3 class="font-bold text-lg text-gray-800">全部智能体</h3>
          <p class="text-sm text-gray-500">所有漏斗体系智能体一览，按特性标签分类</p>
        </div>
      </div>
      <div class="flex items-center space-x-2">
        <span id="all-agents-count" class="px-3 py-1 rounded-full text-sm bg-purple-500 text-white"></span>
      </div>
    </div>
  </div>

  <!-- 智能体列表 -->
  <div class="p-6">
    <div id="agents-list">
      <!-- 动态加载 -->
    </div>
  </div>
</div>

<!-- 添加智能体模态框 -->
<div id="add-agent-modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
    <div class="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-primary-500 to-purple-500 text-white">
      <h2 class="text-lg font-semibold"><i class="fas fa-plus-circle mr-2"></i>添加新智能体</h2>
      <button onclick="closeAddAgentModal()" class="hover:bg-white/20 rounded-full w-8 h-8 flex items-center justify-center">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto p-6">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">智能体ID *</label>
            <input type="text" id="new-agent-id" placeholder="例如: my-custom-agent" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
            <p class="text-xs text-gray-500 mt-1">唯一标识符，仅允许小写字母、数字和横线</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">智能体名称 *</label>
            <input type="text" id="new-agent-name" placeholder="例如: 我的自定义智能体" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">所属体系</label>
            <select id="new-agent-ring" onchange="updateNewAgentForm()" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
              <option value="outer">筛子体系（一票否决）</option>
              <option value="inner" selected>漏斗体系（加权评分）</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">评估维度</label>
            <input type="text" id="new-agent-dimension" placeholder="例如: 财务健康度" 
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
          </div>
        </div>
        
        <div id="new-agent-track-section">
          <label class="block text-sm font-medium text-gray-700 mb-1">适用赛道</label>
          <select id="new-agent-track" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
            <option value="all">通用（适用所有赛道）</option>
          </select>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">权重 (%) <span id="new-weight-note" class="text-xs text-gray-400">（漏斗体系有效）</span></label>
            <input type="number" id="new-agent-weight" value="10" min="0" max="100"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">通过阈值</label>
            <input type="number" id="new-agent-threshold" value="60" min="0" max="100"
              class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">描述</label>
          <textarea id="new-agent-description" rows="2" placeholder="智能体功能描述..."
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400"></textarea>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">System Prompt *</label>
          <textarea id="new-agent-prompt" rows="6" placeholder="你是一个专业的投资评估智能体..."
            class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400 font-mono text-sm"></textarea>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">图标</label>
            <select id="new-agent-icon" class="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary-400">
              <option value="fas fa-robot">🤖 机器人</option>
              <option value="fas fa-chart-line">📈 图表</option>
              <option value="fas fa-shield-alt">🛡️ 盾牌</option>
              <option value="fas fa-balance-scale">⚖️ 天平</option>
              <option value="fas fa-search-dollar">💰 财务</option>
              <option value="fas fa-handshake">🤝 合作</option>
              <option value="fas fa-cogs">⚙️ 齿轮</option>
              <option value="fas fa-brain">🧠 大脑</option>
              <option value="fas fa-lightbulb">💡 灯泡</option>
              <option value="fas fa-check-double">✅ 检查</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">图标颜色</label>
            <input type="color" id="new-agent-color" value="#6366F1"
              class="w-full h-10 px-1 py-1 border rounded-lg cursor-pointer">
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
      <button onclick="closeAddAgentModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">取消</button>
      <button onclick="createNewAgent()" class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
        <i class="fas fa-plus mr-2"></i>创建智能体
      </button>
    </div>
  </div>
</div>

<!-- 智能体详情编辑模态框 -->
<div id="agent-modal" class="fixed inset-0 bg-black/50 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
      <!-- 模态框头部 -->
      <div class="flex items-center justify-between px-6 py-4 border-b bg-gray-50">
        <div class="flex items-center space-x-3">
          <div id="modal-icon" class="w-10 h-10 rounded-lg flex items-center justify-center"></div>
          <div>
            <h2 id="modal-title" class="text-lg font-semibold"></h2>
            <p id="modal-dimension" class="text-sm text-gray-500"></p>
          </div>
        </div>
        <button onclick="closeAgentModal()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- 模态框内容Tab -->
      <div class="border-b px-6">
        <div class="flex space-x-4">
          <button onclick="switchDetailTab('prompt')" id="detail-tab-prompt" class="py-3 px-4 font-medium text-primary-600 border-b-2 border-primary-500">
            <i class="fas fa-terminal mr-2"></i>System Prompt
          </button>
          <button onclick="switchDetailTab('knowledge')" id="detail-tab-knowledge" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-book mr-2"></i>知识库
          </button>
          <button onclick="switchDetailTab('criteria')" id="detail-tab-criteria" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-list-check mr-2"></i>评估标准
          </button>
          <button onclick="switchDetailTab('config')" id="detail-tab-config" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-sliders mr-2"></i>参数配置
          </button>
          <button onclick="switchDetailTab('test')" id="detail-tab-test" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-flask mr-2"></i>测试运行
          </button>
        </div>
      </div>

      <!-- 模态框内容区 -->
      <div class="flex-1 overflow-y-auto p-6">
        <!-- System Prompt Tab -->
        <div id="panel-prompt" class="detail-panel">
          <div class="mb-4 flex justify-between items-center">
            <label class="font-medium text-gray-700">System Prompt</label>
            <div class="space-x-2">
              <button onclick="resetPrompt()" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-undo mr-1"></i>重置默认
              </button>
            </div>
          </div>
          <textarea id="edit-prompt" class="w-full h-96 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-[#00D29E] focus:border-transparent border-[#D9EDDF]" placeholder="输入System Prompt..."></textarea>
        </div>

        <!-- 知识库 Tab -->
        <div id="panel-knowledge" class="detail-panel hidden">
          <div class="mb-4 flex justify-between items-center">
            <label class="font-medium text-gray-700">知识库内容</label>
            <div class="space-x-2">
              <button onclick="toggleKnowledgeEdit()" id="btn-edit-knowledge" class="px-3 py-1 bg-[#D9EDDF] text-[#49754D] rounded text-sm hover:bg-[#c5e6ce]">
                <i class="fas fa-edit mr-1"></i>编辑
              </button>
              <label class="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 cursor-pointer">
                <i class="fas fa-upload mr-1"></i>上传文档
                <input type="file" class="hidden" accept=".txt,.md,.pdf" onchange="uploadKnowledge(event)">
              </label>
            </div>
          </div>
          <div id="knowledge-view" class="border rounded-lg p-4 bg-gray-50 h-96 overflow-y-auto markdown-content"></div>
          <textarea id="knowledge-edit" class="hidden w-full h-96 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-[#00D29E] border-[#D9EDDF]"></textarea>
        </div>

        <!-- 评估标准 Tab -->
        <div id="panel-criteria" class="detail-panel hidden">
          <div class="mb-4 flex justify-between items-center">
            <label class="font-medium text-gray-700">评估标准 (JSON)</label>
            <div class="space-x-2">
              <button onclick="formatJSON('edit-criteria')" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-code mr-1"></i>格式化
              </button>
              <button onclick="validateJSON('edit-criteria')" class="text-sm text-gray-500 hover:text-gray-700">
                <i class="fas fa-check mr-1"></i>验证
              </button>
            </div>
          </div>
          <textarea id="edit-criteria" class="w-full h-64 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500"></textarea>
          
          <div class="mt-6">
            <label class="font-medium text-gray-700 mb-2 block">输出格式模板 (JSON)</label>
            <textarea id="edit-output" class="w-full h-48 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500"></textarea>
          </div>
        </div>

        <!-- 参数配置 Tab -->
        <div id="panel-config" class="detail-panel hidden">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="font-medium text-gray-700 mb-2 block">权重 (%)</label>
              <div class="flex items-center space-x-4">
                <input type="range" id="config-weight" min="0" max="100" class="flex-1" oninput="document.getElementById('weight-value').textContent = this.value">
                <span id="weight-value" class="w-12 text-center font-mono">0</span>
              </div>
              <p class="text-xs text-gray-500 mt-1">筛子体系智能体权重为0（一票否决制）</p>
            </div>
            
            <div>
              <label class="font-medium text-gray-700 mb-2 block">通过阈值</label>
              <div class="flex items-center space-x-4">
                <input type="range" id="config-threshold" min="0" max="100" class="flex-1" oninput="document.getElementById('threshold-value').textContent = this.value">
                <span id="threshold-value" class="w-12 text-center font-mono">60</span>
              </div>
            </div>
            
            <div>
              <label class="font-medium text-gray-700 mb-2 block">执行顺序</label>
              <input type="number" id="config-order" min="1" max="99" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500">
            </div>
            
            <div>
              <label class="font-medium text-gray-700 mb-2 block">启用状态</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="config-enabled" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00D29E]"></div>
                <span class="ml-3 text-sm text-gray-700">启用</span>
              </label>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t">
            <h4 class="font-medium text-gray-700 mb-4">AI模型配置</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="text-sm text-gray-600 mb-1 block">模型</label>
                <select id="config-model" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500">
                  <option value="gpt-5">GPT-5</option>
                  <option value="gpt-5-mini">GPT-5 Mini</option>
                  <option value="gpt-5.1">GPT-5.1</option>
                </select>
              </div>
              <div>
                <label class="text-sm text-gray-600 mb-1 block">Temperature</label>
                <div class="flex items-center space-x-2">
                  <input type="range" id="config-temp" min="0" max="100" class="flex-1" oninput="document.getElementById('temp-value').textContent = (this.value/100).toFixed(2)">
                  <span id="temp-value" class="w-12 text-center font-mono">0.20</span>
                </div>
              </div>
              <div>
                <label class="text-sm text-gray-600 mb-1 block">Max Tokens</label>
                <input type="number" id="config-tokens" min="100" max="8000" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-primary-500">
              </div>
            </div>
          </div>
        </div>

        <!-- 测试运行 Tab -->
        <div id="panel-test" class="detail-panel hidden">
          <div class="mb-4">
            <label class="font-medium text-gray-700 mb-2 block">测试输入数据 (JSON)</label>
            <textarea id="test-input" class="w-full h-48 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500" placeholder='{"company_name": "测试公司", ...}'></textarea>
          </div>
          
          <div class="flex space-x-4 mb-4">
            <button onclick="runAgentTest()" id="btn-run-test" class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              <i class="fas fa-play mr-2"></i>运行测试
            </button>
            <button onclick="loadSampleData()" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              <i class="fas fa-file-import mr-2"></i>加载示例数据
            </button>
          </div>
          
          <div id="test-result" class="border rounded-lg p-4 bg-gray-50 min-h-48 hidden">
            <div class="flex items-center justify-between mb-4">
              <span class="font-medium">测试结果</span>
              <span id="test-time" class="text-sm text-gray-500"></span>
            </div>
            <pre id="test-output" class="text-sm font-mono whitespace-pre-wrap"></pre>
          </div>
          
          <div id="test-loading" class="hidden text-center py-12">
            <i class="fas fa-spinner fa-spin text-4xl text-primary-500 mb-4"></i>
            <p class="text-gray-500">正在调用AI进行评估...</p>
          </div>
        </div>
      </div>

      <!-- 模态框底部 -->
      <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <button onclick="closeAgentModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">
          取消
        </button>
        <button onclick="saveAgentConfig()" class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
          <i class="fas fa-save mr-2"></i>保存配置
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  let currentAgents = [];
  let currentRingType = 'outer';
  let currentAgent = null;
  let isKnowledgeEditing = false;
  let selectedTrack = null;  // 当前选中的赛道（null表示显示赛道选择器）
  let showAllAgents = false; // 是否显示全部智能体页面
  let industryTracks = [];

  // 智能体特性标签定义
  const agentTags = {
    'financial-health-agent': ['财务分析', '数据驱动', '定量评估'],
    'operational-capability-agent': ['运营评估', '效率分析', '流程优化'],
    'legal-compliance-agent': ['合规审查', '风险预警', '资质验证'],
    'risk-control-agent': ['风险管控', '预警机制', '损失控制'],
    'alignment-deep-agent': ['利益分析', '激励机制', '博弈评估'],
    'economic-analysis-agent': ['经济测算', 'ROI分析', '投资回报'],
    'comprehensive-scoring-agent': ['综合评分', '多维汇总', '决策支持'],
    'catering-location-agent': ['选址分析', '商圈评估', '人流预测'],
    'catering-food-safety-agent': ['食品安全', '资质审查', '卫生监管'],
    'catering-unit-model-agent': ['单店模型', '坪效分析', '翻台率'],
    'retail-inventory-agent': ['库存管理', '周转分析', '损耗控制'],
    'retail-supply-chain-agent': ['供应链', '物流效率', '成本优化'],
    'retail-community-agent': ['社区分析', '消费画像', '需求预测'],
    'ecommerce-gmv-agent': ['GMV评估', '增长分析', '质量验证'],
    'ecommerce-platform-agent': ['平台关系', '依赖度', '多元化'],
    'ecommerce-kol-agent': ['主播矩阵', '头部风险', 'MCN评估'],
    'education-qualification-agent': ['资质审查', '合规办学', '政策风险'],
    'education-employment-agent': ['就业保障', '薪资追踪', '转化率'],
    'service-qualification-agent': ['服务资质', '执业认证', '安全合规'],
    'service-customer-agent': ['客户分析', '复购率', 'LTV评估'],
    'service-standardization-agent': ['服务标准化', 'SOP评估', '可复制性'],
    'light-asset-ip-agent': ['IP评估', '版权价值', '商业潜力'],
    'light-asset-execution-agent': ['执行能力', '活动经验', '团队评估']
  };

  // 加载赛道数据
  async function loadTracks() {
    try {
      const { data } = await apiCall('/api/tracks');
      industryTracks = data || [];
      updateTrackSelects();
    } catch (e) {
      // 使用默认赛道
      industryTracks = [
        { id: 'all', name: '通用', icon: 'fas fa-globe', icon_color: '#6B7280', description: '适用于所有赛道的基础评估' },
        { id: 'catering', name: '餐饮', icon: 'fas fa-utensils', icon_color: '#F59E0B', description: '餐厅、茶饮、快餐等' },
        { id: 'retail', name: '零售', icon: 'fas fa-store', icon_color: '#10B981', description: '生鲜、便利店、专业零售' },
        { id: 'ecommerce', name: '电商', icon: 'fas fa-shopping-cart', icon_color: '#3B82F6', description: '直播电商、MCN、品牌电商' },
        { id: 'education', name: '教育培训', icon: 'fas fa-graduation-cap', icon_color: '#EC4899', description: '职业培训、技能教育' },
        { id: 'service', name: '生活服务', icon: 'fas fa-concierge-bell', icon_color: '#14B8A6', description: '宠物、健身、医美、民宿' },
        { id: 'light-asset', name: '文娱轻资产', icon: 'fas fa-film', icon_color: '#8B5CF6', description: '演出、活动、IP运营' }
      ];
      updateTrackSelects();
    }
  }

  // 更新赛道选择器（用于新建智能体）
  function updateTrackSelects() {
    const newTrackSelect = document.getElementById('new-agent-track');
    if (newTrackSelect) {
      newTrackSelect.innerHTML = '<option value="all">通用（适用所有赛道）</option>' + 
        industryTracks.filter(t => t.id !== 'all').map(t => 
          \`<option value="\${t.id}">\${t.name}</option>\`
        ).join('');
    }
    renderTrackCards();
  }

  // 渲染赛道选择卡片
  function renderTrackCards() {
    const container = document.getElementById('track-cards');
    if (!container) return;
    
    // 统计各赛道智能体数量
    const trackCounts = {};
    let generalCount = 0;
    currentAgents.filter(a => a.ring_type === 'inner').forEach(a => {
      if (a.industry === 'all') {
        generalCount++;
      } else {
        trackCounts[a.industry] = (trackCounts[a.industry] || 0) + 1;
      }
    });
    
    // 渲染赛道卡片（不包括通用）
    container.innerHTML = industryTracks.filter(t => t.id !== 'all').map(t => {
      const count = trackCounts[t.id] || 0;
      const totalCount = count + generalCount; // 专属 + 通用
      return \`
        <div onclick="selectTrack('\${t.id}')" 
          class="cursor-pointer p-4 rounded-xl border-2 border-transparent bg-white hover:border-gray-200 hover:shadow-lg transition group">
          <div class="flex flex-col items-center text-center">
            <div class="w-14 h-14 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition" 
              style="background: linear-gradient(135deg, \${t.icon_color}20, \${t.icon_color}40)">
              <i class="\${t.icon} text-2xl" style="color: \${t.icon_color}"></i>
            </div>
            <h4 class="font-semibold text-gray-800 mb-1">\${t.name}</h4>
            <p class="text-xs text-gray-500 mb-2 line-clamp-1">\${t.description || ''}</p>
            <div class="flex items-center space-x-2 text-xs">
              <span class="px-2 py-0.5 rounded-full text-white" style="background: \${t.icon_color}">\${count}个专属</span>
              <span class="px-2 py-0.5 bg-gray-100 rounded-full text-gray-500">+\${generalCount}通用</span>
            </div>
          </div>
        </div>
      \`;
    }).join('');
  }

  // 选择赛道
  function selectTrack(trackId) {
    selectedTrack = trackId;
    showAllAgents = false;
    updateInnerView();
  }

  // 返回赛道选择器
  function backToTrackSelector() {
    selectedTrack = null;
    showAllAgents = false;
    updateInnerView();
  }

  // 显示全部智能体页面
  function showAllAgentsPage() {
    showAllAgents = true;
    selectedTrack = null;
    updateInnerView();
  }

  // 更新中环视图
  function updateInnerView() {
    const trackSelector = document.getElementById('track-selector');
    const currentTrackHeader = document.getElementById('current-track-header');
    const allAgentsHeader = document.getElementById('all-agents-header');
    
    if (currentRingType !== 'inner') return;
    
    if (showAllAgents) {
      // 显示全部智能体页面
      trackSelector.classList.add('hidden');
      currentTrackHeader.classList.add('hidden');
      allAgentsHeader.classList.remove('hidden');
      
      const totalCount = currentAgents.filter(a => a.ring_type === 'inner').length;
      document.getElementById('all-agents-count').textContent = totalCount + '个智能体';
      
      renderAllAgentsWithTags();
    } else if (selectedTrack) {
      // 显示选中赛道的智能体
      trackSelector.classList.add('hidden');
      allAgentsHeader.classList.add('hidden');
      currentTrackHeader.classList.remove('hidden');
      
      const track = industryTracks.find(t => t.id === selectedTrack);
      if (track) {
        document.getElementById('current-track-icon').innerHTML = \`<i class="\${track.icon} text-xl" style="color: \${track.icon_color}"></i>\`;
        document.getElementById('current-track-icon').style.background = track.icon_color + '20';
        document.getElementById('current-track-name').textContent = track.name + '赛道智能体';
        document.getElementById('current-track-desc').textContent = track.description || '专属评估智能体群';
        
        const specificAgents = currentAgents.filter(a => a.ring_type === 'inner' && a.industry === selectedTrack);
        const generalAgents = currentAgents.filter(a => a.ring_type === 'inner' && a.industry === 'all');
        const totalCount = specificAgents.length + generalAgents.length;
        
        document.getElementById('current-track-count').textContent = totalCount + '个智能体';
        document.getElementById('current-track-count').style.background = track.icon_color;
      }
      
      renderTrackAgents();
    } else {
      // 显示赛道选择器
      trackSelector.classList.remove('hidden');
      currentTrackHeader.classList.add('hidden');
      allAgentsHeader.classList.add('hidden');
      
      renderTrackCards();
      document.getElementById('agents-list').innerHTML = '';
    }
  }

  // 渲染选中赛道的智能体
  function renderTrackAgents() {
    const container = document.getElementById('agents-list');
    const track = industryTracks.find(t => t.id === selectedTrack);
    
    const specificAgents = currentAgents.filter(a => a.ring_type === 'inner' && a.industry === selectedTrack);
    const generalAgents = currentAgents.filter(a => a.ring_type === 'inner' && a.industry === 'all');
    
    let html = '';
    
    // 专属智能体
    if (specificAgents.length > 0) {
      html += \`
        <div class="mb-8">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center" style="background: \${track?.icon_color}20">
              <i class="\${track?.icon}" style="color: \${track?.icon_color}"></i>
            </div>
            <h3 class="font-bold text-gray-800">\${track?.name}赛道专属</h3>
            <span class="px-2 py-1 rounded-full text-xs text-white" style="background: \${track?.icon_color}">\${specificAgents.length}个</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${specificAgents.map(renderAgentCard).join('')}
          </div>
        </div>
      \`;
    }
    
    // 通用智能体
    if (generalAgents.length > 0) {
      html += \`
        <div class="mb-8">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center bg-gray-100">
              <i class="fas fa-globe text-gray-500"></i>
            </div>
            <h3 class="font-bold text-gray-800">通用评估智能体</h3>
            <span class="px-2 py-1 bg-gray-200 rounded-full text-xs text-gray-600">\${generalAgents.length}个</span>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            \${generalAgents.map(renderAgentCard).join('')}
          </div>
        </div>
      \`;
    }
    
    if (html === '') {
      html = \`
        <div class="text-center py-12 text-gray-500">
          <i class="fas fa-robot text-4xl mb-4 opacity-30"></i>
          <p>该赛道暂无智能体</p>
          <button onclick="openAddAgentModal()" class="mt-4 text-[#00D29E] hover:text-[#629C85]">
            <i class="fas fa-plus mr-1"></i>添加智能体
          </button>
        </div>
      \`;
    }
    
    container.innerHTML = html;
  }

  // 渲染全部智能体（带标签）
  function renderAllAgentsWithTags() {
    const container = document.getElementById('agents-list');
    const innerAgents = currentAgents.filter(a => a.ring_type === 'inner');
    
    if (innerAgents.length === 0) {
      container.innerHTML = \`
        <div class="text-center py-12 text-gray-500">
          <i class="fas fa-robot text-4xl mb-4 opacity-30"></i>
          <p>暂无漏斗体系智能体</p>
        </div>
      \`;
      return;
    }
    
    // 收集所有标签
    const allTags = new Set();
    innerAgents.forEach(a => {
      const tags = agentTags[a.id] || ['通用'];
      tags.forEach(t => allTags.add(t));
    });
    
    container.innerHTML = \`
      <div class="mb-6">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-sm text-gray-500 mr-2">特性标签：</span>
          \${Array.from(allTags).slice(0, 12).map(tag => \`
            <span class="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs cursor-pointer hover:bg-purple-200 transition" onclick="filterByTag('\${tag}')">\${tag}</span>
          \`).join('')}
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        \${innerAgents.map(a => renderAgentCardWithTags(a)).join('')}
      </div>
    \`;
  }

  // 渲染带标签的智能体卡片
  function renderAgentCardWithTags(agent) {
    const track = industryTracks.find(t => t.id === agent.industry);
    const trackLabel = agent.industry === 'all' ? '通用' : (track?.name || agent.industry);
    const trackColor = track?.icon_color || '#6B7280';
    const tags = agentTags[agent.id] || ['通用'];
    
    return \`
      <div class="agent-card bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition relative group border border-gray-100" onclick="openAgentModal('\${agent.id}')">
        <button onclick="event.stopPropagation(); confirmDeleteAgent('\${agent.id}', '\${agent.name}')" 
          class="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition flex items-center justify-center hover:bg-red-200">
          <i class="fas fa-trash text-xs"></i>
        </button>
        
        <div class="flex items-start justify-between mb-3 pr-8">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style="background: linear-gradient(135deg, \${agent.icon_color}20, \${agent.icon_color}40)">
              <i class="\${agent.icon} text-lg" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension}</p>
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer" onclick="event.stopPropagation()">
            <input type="checkbox" class="sr-only peer" \${agent.is_enabled ? 'checked' : ''} onchange="toggleAgent('\${agent.id}', this.checked)">
            <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D29E]"></div>
          </label>
        </div>
        
        <p class="text-sm text-gray-600 line-clamp-2 mb-3">\${agent.description}</p>
        
        <!-- 特性标签 -->
        <div class="flex flex-wrap gap-1 mb-3">
          \${tags.map(tag => \`<span class="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-xs">\${tag}</span>\`).join('')}
        </div>
        
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-1 bg-gray-100 rounded text-gray-600">权重 \${agent.weight}%</span>
            <span class="px-2 py-1 rounded text-white" style="background: \${trackColor}">\${trackLabel}</span>
          </div>
          <span class="text-gray-500">阈值 \${agent.pass_threshold}</span>
        </div>
      </div>
    \`;
  }

  // 按标签筛选（简单提示）
  function filterByTag(tag) {
    showToast(\`标签筛选: \${tag}\`);
  }

  // 切换环类型Tab
  function switchRingTab(type) {
    currentRingType = type;
    selectedTrack = null;
    showAllAgents = false;
    
    document.getElementById('tab-outer').className = type === 'outer' 
      ? 'px-6 py-4 font-medium text-[#00D29E] border-b-2 border-[#00D29E] bg-[#D9EDDF]'
      : 'px-6 py-4 font-medium text-gray-500 hover:text-[#629C85] transition';
    document.getElementById('tab-inner').className = type === 'inner'
      ? 'px-6 py-4 font-medium text-[#00D29E] border-b-2 border-[#00D29E] bg-[#D9EDDF]'
      : 'px-6 py-4 font-medium text-gray-500 hover:text-[#629C85] transition';
    
    // 显示/隐藏赛道选择器
    document.getElementById('track-selector').classList.toggle('hidden', type !== 'inner');
    document.getElementById('current-track-header').classList.add('hidden');
    document.getElementById('all-agents-header').classList.add('hidden');
    
    if (type === 'inner') {
      updateInnerView();
    } else {
      renderAgents();
    }
  }

  // 加载智能体数据
  async function loadAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      currentAgents = data;
      renderTrackCards();
      renderAgents();
    } catch (e) {}
  }

  // 刷新智能体列表
  function refreshAgents() {
    loadAgents();
    showToast('已刷新');
  }

  // 渲染单个智能体卡片
  function renderAgentCard(agent) {
    const track = industryTracks.find(t => t.id === agent.industry);
    const trackLabel = agent.industry === 'all' ? '通用' : (track?.name || agent.industry);
    const trackColor = track?.icon_color || '#6B7280';
    
    return \`
      <div class="agent-card bg-white rounded-xl p-4 cursor-pointer hover:shadow-lg transition relative group border border-gray-100" onclick="openAgentModal('\${agent.id}')">
        <button onclick="event.stopPropagation(); confirmDeleteAgent('\${agent.id}', '\${agent.name}')" 
          class="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-100 text-red-500 opacity-0 group-hover:opacity-100 transition flex items-center justify-center hover:bg-red-200">
          <i class="fas fa-trash text-xs"></i>
        </button>
        
        <div class="flex items-start justify-between mb-3 pr-8">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm" style="background: linear-gradient(135deg, \${agent.icon_color}20, \${agent.icon_color}40)">
              <i class="\${agent.icon} text-lg" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension}</p>
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer" onclick="event.stopPropagation()">
            <input type="checkbox" class="sr-only peer" \${agent.is_enabled ? 'checked' : ''} onchange="toggleAgent('\${agent.id}', this.checked)">
            <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#00D29E]"></div>
          </label>
        </div>
        <p class="text-sm text-gray-600 line-clamp-2 mb-3">\${agent.description}</p>
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2">
            <span class="px-2 py-1 bg-gray-100 rounded text-gray-600">\${agent.ring_type === 'outer' ? '一票否决' : '权重 ' + agent.weight + '%'}</span>
            \${agent.ring_type === 'inner' ? \`<span class="px-2 py-1 rounded text-white" style="background: \${trackColor}">\${trackLabel}</span>\` : ''}
          </div>
          <span class="text-gray-500">阈值 \${agent.pass_threshold}</span>
        </div>
      </div>
    \`;
  }

  // 渲染智能体列表（外环）
  function renderAgents() {
    const container = document.getElementById('agents-list');
    
    // 外环直接显示列表
    if (currentRingType === 'outer') {
      const filtered = currentAgents.filter(a => a.ring_type === 'outer');
      if (filtered.length === 0) {
        container.innerHTML = \`
          <div class="text-center py-12 text-gray-500">
            <i class="fas fa-robot text-4xl mb-4 opacity-30"></i>
            <p>暂无筛子体系智能体</p>
            <button onclick="openAddAgentModal()" class="mt-4 text-[#00D29E] hover:text-[#629C85]">
              <i class="fas fa-plus mr-1"></i>添加智能体
            </button>
          </div>
        \`;
        return;
      }
      container.innerHTML = \`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\${filtered.map(renderAgentCard).join('')}</div>\`;
    }
  }

  // 打开添加智能体模态框
  function openAddAgentModal() {
    document.getElementById('add-agent-modal').classList.remove('hidden');
    document.getElementById('new-agent-id').value = '';
    document.getElementById('new-agent-name').value = '';
    document.getElementById('new-agent-ring').value = 'inner';
    document.getElementById('new-agent-dimension').value = '';
    document.getElementById('new-agent-track').value = 'all';
    document.getElementById('new-agent-weight').value = '10';
    document.getElementById('new-agent-threshold').value = '60';
    document.getElementById('new-agent-description').value = '';
    document.getElementById('new-agent-prompt').value = '';
    updateNewAgentForm();
  }

  function closeAddAgentModal() {
    document.getElementById('add-agent-modal').classList.add('hidden');
  }

  // 更新新建表单状态
  function updateNewAgentForm() {
    const ring = document.getElementById('new-agent-ring').value;
    const trackSection = document.getElementById('new-agent-track-section');
    const weightNote = document.getElementById('new-weight-note');
    
    // 筛子体系不需要选择赛道
    trackSection.classList.toggle('hidden', ring === 'outer');
    
    // 筛子体系权重为0
    if (ring === 'outer') {
      document.getElementById('new-agent-weight').value = '0';
      document.getElementById('new-agent-threshold').value = '100';
    } else {
      document.getElementById('new-agent-weight').value = '10';
      document.getElementById('new-agent-threshold').value = '60';
    }
  }

  // 创建新智能体
  async function createNewAgent() {
    const id = document.getElementById('new-agent-id').value.trim();
    const name = document.getElementById('new-agent-name').value.trim();
    const ringType = document.getElementById('new-agent-ring').value;
    const dimension = document.getElementById('new-agent-dimension').value.trim();
    const industry = ringType === 'outer' ? 'all' : document.getElementById('new-agent-track').value;
    const weight = parseInt(document.getElementById('new-agent-weight').value) || 0;
    const threshold = parseInt(document.getElementById('new-agent-threshold').value) || 60;
    const description = document.getElementById('new-agent-description').value.trim();
    const prompt = document.getElementById('new-agent-prompt').value.trim();
    const icon = document.getElementById('new-agent-icon').value;
    const iconColor = document.getElementById('new-agent-color').value;

    // 验证
    if (!id || !/^[a-z0-9-]+$/.test(id)) {
      showToast('ID只能包含小写字母、数字和横线', 'error');
      return;
    }
    if (!name) {
      showToast('请输入智能体名称', 'error');
      return;
    }
    if (!prompt) {
      showToast('请输入System Prompt', 'error');
      return;
    }

    try {
      await apiCall('/api/agents', {
        method: 'POST',
        body: JSON.stringify({
          id,
          name,
          ring_type: ringType,
          industry,
          dimension: dimension || '自定义',
          weight: ringType === 'outer' ? 0 : weight,
          description,
          system_prompt: prompt,
          pass_threshold: threshold,
          icon,
          icon_color: iconColor
        })
      });
      showToast('智能体创建成功');
      closeAddAgentModal();
      loadAgents();
    } catch (e) {}
  }

  // 确认删除智能体
  function confirmDeleteAgent(id, name) {
    if (confirm(\`确定要删除智能体 "\${name}" 吗？此操作不可恢复。\`)) {
      deleteAgent(id);
    }
  }

  // 删除智能体
  async function deleteAgent(id) {
    try {
      await apiCall(\`/api/agents/\${id}\`, { method: 'DELETE' });
      showToast('智能体已删除');
      loadAgents();
    } catch (e) {}
  }

  // 切换智能体启用状态
  async function toggleAgent(id, enabled) {
    try {
      await apiCall(\`/api/agents/\${id}\`, {
        method: 'PATCH',
        body: JSON.stringify({ is_enabled: enabled ? 1 : 0 })
      });
      showToast(enabled ? '智能体已启用' : '智能体已禁用');
      loadAgents();
    } catch (e) {}
  }

  // 打开智能体编辑模态框
  function openAgentModal(id) {
    currentAgent = currentAgents.find(a => a.id === id);
    if (!currentAgent) return;

    const track = industryTracks.find(t => t.id === currentAgent.industry);
    const trackLabel = currentAgent.industry === 'all' ? '通用' : (track?.name || currentAgent.industry);

    document.getElementById('modal-icon').innerHTML = \`<i class="\${currentAgent.icon}" style="color: \${currentAgent.icon_color}"></i>\`;
    document.getElementById('modal-icon').style.background = currentAgent.icon_color + '20';
    document.getElementById('modal-title').textContent = currentAgent.name;
    document.getElementById('modal-dimension').textContent = currentAgent.dimension + ' | ' + (currentAgent.ring_type === 'outer' ? '筛子体系' : '漏斗体系 · ' + trackLabel);

    // 填充表单
    document.getElementById('edit-prompt').value = currentAgent.system_prompt || '';
    document.getElementById('knowledge-view').innerHTML = marked.parse(currentAgent.knowledge_base || '');
    document.getElementById('knowledge-edit').value = currentAgent.knowledge_base || '';
    document.getElementById('edit-criteria').value = formatJSONString(currentAgent.evaluation_criteria);
    document.getElementById('edit-output').value = formatJSONString(currentAgent.output_format);
    
    document.getElementById('config-weight').value = currentAgent.weight;
    document.getElementById('weight-value').textContent = currentAgent.weight;
    document.getElementById('config-threshold').value = currentAgent.pass_threshold;
    document.getElementById('threshold-value').textContent = currentAgent.pass_threshold;
    document.getElementById('config-order').value = currentAgent.execution_order;
    document.getElementById('config-enabled').checked = currentAgent.is_enabled;
    
    const modelConfig = JSON.parse(currentAgent.model_config || '{}');
    document.getElementById('config-model').value = modelConfig.model || 'gpt-5';
    document.getElementById('config-temp').value = (modelConfig.temperature || 0.2) * 100;
    document.getElementById('temp-value').textContent = (modelConfig.temperature || 0.2).toFixed(2);
    document.getElementById('config-tokens').value = modelConfig.max_tokens || 2000;

    // 重置状态
    isKnowledgeEditing = false;
    document.getElementById('knowledge-view').classList.remove('hidden');
    document.getElementById('knowledge-edit').classList.add('hidden');
    document.getElementById('btn-edit-knowledge').innerHTML = '<i class="fas fa-edit mr-1"></i>编辑';
    document.getElementById('test-result').classList.add('hidden');
    document.getElementById('test-loading').classList.add('hidden');

    switchDetailTab('prompt');
    document.getElementById('agent-modal').classList.remove('hidden');
  }

  function closeAgentModal() {
    document.getElementById('agent-modal').classList.add('hidden');
    currentAgent = null;
  }

  // 切换详情Tab
  function switchDetailTab(tab) {
    ['prompt', 'knowledge', 'criteria', 'config', 'test'].forEach(t => {
      document.getElementById(\`detail-tab-\${t}\`).className = t === tab
        ? 'py-3 px-4 font-medium text-[#00D29E] border-b-2 border-[#00D29E]'
        : 'py-3 px-4 font-medium text-gray-500 hover:text-[#629C85]';
      document.getElementById(\`panel-\${t}\`).classList.toggle('hidden', t !== tab);
    });
  }

  // 知识库编辑切换
  function toggleKnowledgeEdit() {
    isKnowledgeEditing = !isKnowledgeEditing;
    document.getElementById('knowledge-view').classList.toggle('hidden', isKnowledgeEditing);
    document.getElementById('knowledge-edit').classList.toggle('hidden', !isKnowledgeEditing);
    document.getElementById('btn-edit-knowledge').innerHTML = isKnowledgeEditing 
      ? '<i class="fas fa-eye mr-1"></i>预览'
      : '<i class="fas fa-edit mr-1"></i>编辑';
    
    if (!isKnowledgeEditing) {
      document.getElementById('knowledge-view').innerHTML = marked.parse(document.getElementById('knowledge-edit').value);
    }
  }

  // 上传知识库文档
  async function uploadKnowledge(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
      const content = e.target.result;
      document.getElementById('knowledge-edit').value += '\\n\\n---\\n\\n' + content;
      document.getElementById('knowledge-view').innerHTML = marked.parse(document.getElementById('knowledge-edit').value);
      showToast('文档已加载');
    };
    reader.readAsText(file);
  }

  // 格式化JSON
  function formatJSON(elementId) {
    const el = document.getElementById(elementId);
    try {
      el.value = JSON.stringify(JSON.parse(el.value), null, 2);
      showToast('JSON已格式化');
    } catch (e) {
      showToast('JSON格式错误', 'error');
    }
  }

  function formatJSONString(str) {
    try {
      return JSON.stringify(JSON.parse(str), null, 2);
    } catch {
      return str;
    }
  }

  // 验证JSON
  function validateJSON(elementId) {
    const el = document.getElementById(elementId);
    try {
      JSON.parse(el.value);
      showToast('JSON格式有效', 'success');
    } catch (e) {
      showToast('JSON格式错误: ' + e.message, 'error');
    }
  }

  // 保存智能体配置
  async function saveAgentConfig() {
    if (!currentAgent) return;

    const modelConfig = {
      model: document.getElementById('config-model').value,
      temperature: parseFloat(document.getElementById('config-temp').value) / 100,
      max_tokens: parseInt(document.getElementById('config-tokens').value)
    };

    const updates = {
      system_prompt: document.getElementById('edit-prompt').value,
      knowledge_base: document.getElementById('knowledge-edit').value,
      evaluation_criteria: document.getElementById('edit-criteria').value,
      output_format: document.getElementById('edit-output').value,
      weight: parseInt(document.getElementById('config-weight').value),
      pass_threshold: parseInt(document.getElementById('config-threshold').value),
      execution_order: parseInt(document.getElementById('config-order').value),
      is_enabled: document.getElementById('config-enabled').checked ? 1 : 0,
      model_config: JSON.stringify(modelConfig)
    };

    try {
      await apiCall(\`/api/agents/\${currentAgent.id}\`, {
        method: 'PATCH',
        body: JSON.stringify(updates)
      });
      showToast('配置保存成功');
      closeAgentModal();
      loadAgents();
    } catch (e) {}
  }

  // 测试运行智能体
  async function runAgentTest() {
    if (!currentAgent) return;

    let testInput;
    try {
      testInput = JSON.parse(document.getElementById('test-input').value || '{}');
    } catch (e) {
      showToast('测试输入不是有效的JSON', 'error');
      return;
    }

    document.getElementById('btn-run-test').disabled = true;
    document.getElementById('test-loading').classList.remove('hidden');
    document.getElementById('test-result').classList.add('hidden');

    try {
      const startTime = Date.now();
      const response = await apiCall('/api/ai/evaluate', {
        method: 'POST',
        body: JSON.stringify({
          agentId: currentAgent.id,
          testMode: true,
          testInput: testInput
        })
      });
      const elapsed = Date.now() - startTime;

      document.getElementById('test-loading').classList.add('hidden');
      document.getElementById('test-result').classList.remove('hidden');
      document.getElementById('test-time').textContent = \`耗时: \${elapsed}ms\`;
      document.getElementById('test-output').textContent = JSON.stringify(response.data, null, 2);
      
      showToast('测试完成');
    } catch (e) {
      document.getElementById('test-loading').classList.add('hidden');
    } finally {
      document.getElementById('btn-run-test').disabled = false;
    }
  }

  // 加载示例数据
  function loadSampleData() {
    const sampleData = {
      deal_info: {
        company_name: "星耀文化传媒有限公司",
        industry: "light-asset",
        main_business: "大型演唱会策划运营"
      },
      project_documents: "Cardi B 2026中国巡回演唱会项目...",
      financial_data: {
        investment_amount: 3000,
        revenue_forecast: { total: 7680 },
        irr_estimate: 0.35
      }
    };
    document.getElementById('test-input').value = JSON.stringify(sampleData, null, 2);
    showToast('已加载示例数据');
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      loadTracks();
      loadAgents();
    }, 500);
  });
  
  // ESC关闭模态框
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAgentModal();
      closeAddAgentModal();
    }
  });
</script>
`
