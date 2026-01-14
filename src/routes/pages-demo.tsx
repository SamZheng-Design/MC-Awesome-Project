// Demo演示页面 - demo.html
export const demoPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-[#49754D]">Cardi B 演唱会项目演示</h1>
    <p class="text-gray-500">完整展示多智能体评估流程（含详细推理过程）</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="toggleAllDetails()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-eye mr-2"></i><span id="toggle-all-text">展开全部</span>
    </button>
    <button onclick="resetDemo()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-redo mr-2"></i>重置
    </button>
    <button onclick="startDemo()" id="btn-start" class="px-6 py-2 bg-gradient-to-r from-[#00D29E] to-[#629C85] text-white rounded-lg hover:opacity-90 transition">
      <i class="fas fa-play mr-2"></i>开始评估
    </button>
  </div>
</div>

<!-- 步骤指示器 -->
<div class="bg-white rounded-xl p-6 card-shadow mb-6">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div id="step-1" class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-[#00D29E] text-white flex items-center justify-center font-bold">1</div>
        <span class="font-medium text-[#00D29E]">项目材料</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-1"></div>
      <div id="step-2" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">2</div>
        <span class="font-medium text-gray-600">外环筛选</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-2"></div>
      <div id="step-3" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">3</div>
        <span class="font-medium text-gray-600">中环评估</span>
      </div>
      <div class="w-16 h-0.5 bg-gray-200" id="line-3"></div>
      <div id="step-4" class="flex items-center space-x-2 opacity-50">
        <div class="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold">4</div>
        <span class="font-medium text-gray-600">综合评分</span>
      </div>
    </div>
    <div id="overall-status" class="text-sm text-gray-500">
      准备就绪
    </div>
  </div>
</div>

<!-- 主内容区 -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <!-- 左侧：项目信息 -->
  <div class="lg:col-span-1">
    <div class="bg-white rounded-xl card-shadow overflow-hidden sticky top-24">
      <div class="gradient-bg p-4 text-white">
        <div class="flex items-center space-x-3">
          <img src="https://i.pravatar.cc/60?img=47" class="w-12 h-12 rounded-full border-2 border-white">
          <div>
            <h3 class="font-bold">Cardi B</h3>
            <p class="text-sm opacity-80">2026中国巡演</p>
          </div>
        </div>
      </div>
      <div class="p-4">
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">运营方</span>
            <span class="font-medium">星耀文化传媒</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">行业</span>
            <span class="font-medium">轻资产/演出</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">融资金额</span>
            <span class="font-medium text-[#00D29E]">3,000万</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">预期IRR</span>
            <span class="font-medium text-green-600">35%</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">巡演城市</span>
            <span class="font-medium">杭州/深圳/成都</span>
          </div>
        </div>
        
        <div class="mt-4 pt-4 border-t">
          <h4 class="font-medium mb-2">财务预测</h4>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-500">预计收入</span>
              <span>7,680万</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预计成本</span>
              <span>5,500万</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-500">预计利润</span>
              <span class="text-green-600">2,180万</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 右侧：评估过程 -->
  <div class="lg:col-span-2 space-y-6">
    <!-- 外环筛选 -->
    <div id="outer-section" class="bg-white rounded-xl card-shadow p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-circle-notch text-red-500 mr-2"></i>
          外环筛选
          <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">一票否决</span>
        </h3>
        <span id="outer-status" class="text-sm text-gray-500">等待开始</span>
      </div>
      
      <!-- 外环说明 -->
      <div class="mb-4 p-3 bg-red-50 rounded-lg text-sm text-red-800">
        <i class="fas fa-info-circle mr-2"></i>
        外环采用<strong>串行执行</strong>，每个智能体必须通过才能进入下一步，任何一个不通过则<strong>一票否决</strong>
      </div>
      
      <div id="outer-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 中环评估 -->
    <div id="inner-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-bullseye text-[#629C85] mr-2"></i>
          中环评估
          <span class="ml-2 text-xs bg-[#D9EDDF] text-[#49754D] px-2 py-0.5 rounded">加权评分</span>
        </h3>
        <span id="inner-status" class="text-sm text-gray-500">等待外环完成</span>
      </div>
      
      <!-- 中环说明 -->
      <div class="mb-4 p-3 bg-[#D9EDDF] rounded-lg text-sm text-[#49754D]">
        <i class="fas fa-info-circle mr-2"></i>
        中环采用<strong>并行执行</strong>，多个智能体同时评估，按权重计算加权评分
      </div>
      
      <div id="inner-agents" class="space-y-4">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 综合评分 -->
    <div id="final-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-ranking-star text-[#00D29E] mr-2"></i>
          综合评分
        </h3>
        <span id="final-status" class="text-sm text-gray-500">等待评估完成</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- 雷达图 -->
        <div>
          <canvas id="radar-chart" width="300" height="300"></canvas>
        </div>
        
        <!-- 评分详情 -->
        <div id="final-details" class="space-y-4">
          <div class="text-center py-8 text-gray-400">
            <i class="fas fa-chart-pie text-4xl mb-2"></i>
            <p>评估完成后显示结果</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 投资建议 -->
    <div id="recommendation-section" class="hidden">
      <div class="bg-gradient-to-r from-[#00D29E] to-[#629C85] rounded-xl p-6 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl font-bold mb-2" id="rec-title">投资建议</h3>
            <p id="rec-detail" class="opacity-90"></p>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold" id="rec-score">--</div>
            <div class="text-sm opacity-80" id="rec-grade">评级</div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-white/20">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h4 class="font-medium mb-2">核心优势</h4>
              <ul id="rec-strengths" class="text-sm space-y-1 opacity-90"></ul>
            </div>
            <div>
              <h4 class="font-medium mb-2">关注风险</h4>
              <ul id="rec-risks" class="text-sm space-y-1 opacity-90"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 综合改进建议（优化版v2） -->
    <div id="improvement-section" class="hidden">
      <div class="bg-white rounded-xl card-shadow overflow-hidden">
        <!-- 标题栏 -->
        <div class="p-4 bg-gradient-to-r from-orange-50 to-amber-50 border-b">
          <h3 class="font-semibold text-lg flex items-center text-gray-800">
            <i class="fas fa-clipboard-check text-orange-500 mr-2"></i>
            综合改进建议
            <span class="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">智能汇总</span>
          </h3>
        </div>
        
        <div class="p-6">
          <!-- 三栏卡片布局 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <!-- 待补充材料卡片 -->
            <div class="bg-amber-50 rounded-xl border border-amber-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-amber-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('missing')">
                <h4 class="font-medium text-amber-800 flex items-center text-sm">
                  <i class="fas fa-file-circle-plus mr-2 text-amber-500"></i>
                  待补充材料
                  <span id="missing-count" class="ml-2 bg-amber-200 text-amber-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="missing-expand-icon" class="fas fa-chevron-down text-amber-400 text-xs transition-transform"></i>
              </div>
              <div id="missing-content" class="p-3">
                <ul id="missing-materials" class="space-y-2 text-sm text-amber-900">
                  <li class="text-gray-400 text-xs">加载中...</li>
                </ul>
                <button onclick="showImprovementPopup('missing')" class="mt-3 w-full text-xs text-amber-600 hover:text-amber-700 flex items-center justify-center py-1.5 bg-amber-100/50 rounded-lg hover:bg-amber-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
            
            <!-- 项目改进建议卡片 -->
            <div class="bg-blue-50 rounded-xl border border-blue-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-blue-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('improvement')">
                <h4 class="font-medium text-blue-800 flex items-center text-sm">
                  <i class="fas fa-lightbulb mr-2 text-blue-500"></i>
                  改进建议
                  <span id="improvement-count" class="ml-2 bg-blue-200 text-blue-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="improvement-expand-icon" class="fas fa-chevron-down text-blue-400 text-xs transition-transform"></i>
              </div>
              <div id="improvement-content" class="p-3">
                <ul id="improvement-suggestions" class="space-y-2 text-sm text-blue-900">
                  <li class="text-gray-400 text-xs">加载中...</li>
                </ul>
                <button onclick="showImprovementPopup('improvement')" class="mt-3 w-full text-xs text-blue-600 hover:text-blue-700 flex items-center justify-center py-1.5 bg-blue-100/50 rounded-lg hover:bg-blue-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
            
            <!-- 下一步行动卡片 -->
            <div class="bg-green-50 rounded-xl border border-green-100 overflow-hidden hover:shadow-md transition-shadow">
              <div class="p-3 bg-green-100/50 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('actions')">
                <h4 class="font-medium text-green-800 flex items-center text-sm">
                  <i class="fas fa-tasks mr-2 text-green-500"></i>
                  下一步行动
                  <span id="actions-count" class="ml-2 bg-green-200 text-green-700 text-xs px-1.5 py-0.5 rounded-full">0</span>
                </h4>
                <i id="actions-expand-icon" class="fas fa-chevron-down text-green-400 text-xs transition-transform"></i>
              </div>
              <div id="actions-content" class="p-3">
                <div id="next-actions" class="space-y-2 text-sm">
                  <div class="text-gray-400 text-xs">加载中...</div>
                </div>
                <button onclick="showImprovementPopup('actions')" class="mt-3 w-full text-xs text-green-600 hover:text-green-700 flex items-center justify-center py-1.5 bg-green-100/50 rounded-lg hover:bg-green-100 transition">
                  <i class="fas fa-expand-alt mr-1"></i>查看全部
                </button>
              </div>
            </div>
            
          </div>
          
          <!-- 风险建议专区（来自风险控制智能体） -->
          <div id="risk-recommendation-section" class="mt-4 hidden">
            <div class="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border border-red-100 overflow-hidden">
              <div class="p-3 bg-red-100/30 flex items-center justify-between cursor-pointer" onclick="toggleImprovementCard('risk-rec')">
                <h4 class="font-medium text-red-800 flex items-center text-sm">
                  <i class="fas fa-shield-halved mr-2 text-red-500"></i>
                  风险管理建议
                  <span class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded">来自风险控制智能体</span>
                </h4>
                <i id="risk-rec-expand-icon" class="fas fa-chevron-down text-red-400 text-xs transition-transform"></i>
              </div>
              <div id="risk-rec-content" class="p-4">
                <div id="risk-recommendation-preview" class="text-sm text-gray-700 line-clamp-3">
                  加载中...
                </div>
                <button onclick="showImprovementPopup('risk-rec')" class="mt-3 text-sm text-red-600 hover:text-red-700 flex items-center transition">
                  <i class="fas fa-external-link-alt mr-1"></i>查看完整风险管理建议
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 改进建议详情浮窗 -->
    <div id="improvement-popup" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeImprovementPopup()">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        <div id="improvement-popup-header" class="p-4 border-b flex items-center justify-between">
          <h3 id="improvement-popup-title" class="font-bold text-lg flex items-center">
            <i class="fas fa-lightbulb mr-2"></i>
            <span>详情</span>
          </h3>
          <button onclick="closeImprovementPopup()" class="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition">
            <i class="fas fa-times text-gray-500"></i>
          </button>
        </div>
        <div id="improvement-popup-content" class="p-6 overflow-y-auto max-h-[70vh]">
          <!-- 内容动态填充 -->
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 评估详情弹窗（优化版） -->
<div id="detail-modal" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeDetailModal()">
  <div class="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
    <div class="p-4 border-b flex items-center justify-between bg-gradient-to-r from-[#00D29E] to-[#629C85] text-white">
      <h3 id="modal-title" class="font-bold text-lg">评估详情</h3>
      <button onclick="closeDetailModal()" class="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div id="modal-content" class="p-6 overflow-y-auto max-h-[80vh]">
      <!-- 内容动态填充 -->
    </div>
  </div>
</div>

<!-- AI推理内容浮窗 -->
<div id="reasoning-popup" class="fixed inset-0 bg-black/50 z-50 hidden flex items-center justify-center p-4" onclick="if(event.target === this) closeReasoningPopup()">
  <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
    <div class="p-4 border-b flex items-center justify-between bg-[#D9EDDF]">
      <h3 class="font-bold text-[#49754D] flex items-center">
        <i class="fas fa-brain mr-2"></i>
        <span id="popup-title">AI推理过程</span>
      </h3>
      <button onclick="closeReasoningPopup()" class="w-8 h-8 rounded-full hover:bg-[#c5e6ce] flex items-center justify-center transition">
        <i class="fas fa-times text-[#49754D]"></i>
      </button>
    </div>
    <div id="popup-content" class="p-6 overflow-y-auto max-h-[70vh]">
      <!-- 内容动态填充 -->
    </div>
  </div>
</div>

<style>
  /* 自定义滚动条 */
  #modal-content::-webkit-scrollbar,
  #popup-content::-webkit-scrollbar {
    width: 6px;
  }
  #modal-content::-webkit-scrollbar-track,
  #popup-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  #modal-content::-webkit-scrollbar-thumb,
  #popup-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  #modal-content::-webkit-scrollbar-thumb:hover,
  #popup-content::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
  
  /* 推理内容格式化 */
  .reasoning-text {
    white-space: pre-wrap;
    word-break: break-word;
    line-height: 1.8;
  }
  .reasoning-text p {
    margin-bottom: 0.75rem;
  }
  
  /* 改进建议浮窗滚动条 */
  #improvement-popup-content::-webkit-scrollbar {
    width: 6px;
  }
  #improvement-popup-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  #improvement-popup-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 3px;
  }
  #improvement-popup-content::-webkit-scrollbar-thumb:hover {
    background: #a1a1a1;
  }
  
  /* 风险建议内容格式 */
  .risk-rec-content h4 {
    font-size: 0.95rem;
    margin-top: 1rem;
  }
  .risk-rec-content ul {
    list-style: none;
    padding-left: 0;
  }
  .risk-rec-content li {
    font-size: 0.875rem;
  }
  
  /* 文本截断 */
  .line-clamp-1 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>

<script>
  let demoAgents = [];
  let radarChart = null;
  let isRunning = false;
  let allExpanded = false;
  let evaluationResults = {}; // 存储所有评估结果

  // 加载智能体
  async function loadDemoAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      demoAgents = data;
      renderAgentCards();
    } catch (e) {}
  }

  // 渲染智能体卡片
  function renderAgentCards() {
    const outerAgents = demoAgents.filter(a => a.ring_type === 'outer');
    const innerAgents = demoAgents.filter(a => a.ring_type === 'inner' && a.id !== 'comprehensive-scoring-agent');

    document.getElementById('outer-agents').innerHTML = outerAgents.map((agent, index) => \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <div class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension} · 阈值 \${agent.pass_threshold}分</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div id="progress-\${agent.id}" class="w-24 h-2 bg-gray-200 rounded-full overflow-hidden hidden">
              <div class="h-full bg-primary-500 transition-all duration-1000" style="width: 0%"></div>
            </div>
            <span id="score-\${agent.id}" class="font-mono text-lg font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-sm transition-transform"></i>
          </div>
        </div>
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-4 space-y-4">
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');

    document.getElementById('inner-agents').innerHTML = innerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="border rounded-lg overflow-hidden transition-all duration-300">
        <div class="flex items-center justify-between p-3 bg-gray-50 cursor-pointer hover:bg-gray-100" onclick="toggleAgentDetail('\${agent.id}')">
          <div class="flex items-center space-x-2">
            <div class="w-8 h-8 rounded flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon} text-sm" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-medium text-sm">\${agent.name.replace('智能体', '')}</h4>
              <p class="text-xs text-gray-500">权重 \${agent.weight}%</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span id="score-\${agent.id}" class="font-mono font-bold text-gray-400">--</span>
            <span id="status-\${agent.id}" class="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center">
              <i class="fas fa-minus text-gray-400 text-xs"></i>
            </span>
            <i id="expand-icon-\${agent.id}" class="fas fa-chevron-down text-gray-400 text-xs transition-transform"></i>
          </div>
        </div>
        <div id="detail-\${agent.id}" class="hidden border-t bg-white">
          <div class="p-3 space-y-3">
            <div id="steps-\${agent.id}" class="space-y-2">
              <div class="flex items-center space-x-2 text-gray-400 text-sm">
                <i class="fas fa-hourglass-start"></i>
                <span>等待执行...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    \`).join('');
  }

  // 切换智能体详情
  function toggleAgentDetail(agentId) {
    const detailEl = document.getElementById(\`detail-\${agentId}\`);
    const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
    if (detailEl.classList.contains('hidden')) {
      detailEl.classList.remove('hidden');
      expandIcon.classList.add('rotate-180');
    } else {
      detailEl.classList.add('hidden');
      expandIcon.classList.remove('rotate-180');
    }
  }

  // 展开/收起全部
  function toggleAllDetails() {
    allExpanded = !allExpanded;
    document.querySelectorAll('[id^="detail-"]').forEach(el => {
      if (el.id.startsWith('detail-') && !el.id.includes('modal')) {
        el.classList.toggle('hidden', !allExpanded);
      }
    });
    document.querySelectorAll('[id^="expand-icon-"]').forEach(icon => {
      icon.classList.toggle('rotate-180', allExpanded);
    });
    document.getElementById('toggle-all-text').textContent = allExpanded ? '收起全部' : '展开全部';
  }

  // 获取完整的推理内容（优先使用原始响应）
  function getFullReasoning(result) {
    // 如果有原始响应，尝试从中提取更完整的内容
    if (result._raw_response) {
      const raw = result._raw_response;
      // 尝试提取reasoning字段的完整内容
      const reasoningMatch = raw.match(/"reasoning"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)/);
      if (reasoningMatch && reasoningMatch[1] && reasoningMatch[1].length > 50) {
        return reasoningMatch[1]
          .replace(/\\\\n/g, '\\n')
          .replace(/\\\\"/g, '"')
          .replace(/\\\\\\\\/g, '\\\\');
      }
    }
    return result.reasoning || result.rationale || result.assessment || '暂无详细推理内容';
  }

  // 获取完整的建议内容
  function getFullRecommendation(result) {
    if (result._raw_response) {
      const raw = result._raw_response;
      const recMatch = raw.match(/"recommendation"\\s*:\\s*"([\\s\\S]*?)(?:"\\s*[,}]|"$)/);
      if (recMatch && recMatch[1] && recMatch[1].length > 10) {
        return recMatch[1]
          .replace(/\\\\n/g, '\\n')
          .replace(/\\\\"/g, '"')
          .replace(/\\\\\\\\/g, '\\\\');
      }
    }
    return result.recommendation || '';
  }

  // 显示推理内容浮窗
  function showReasoningPopup(agentId, type = 'reasoning') {
    const result = evaluationResults[agentId];
    const agent = demoAgents.find(a => a.id === agentId);
    if (!result || !agent) return;
    
    const popup = document.getElementById('reasoning-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    
    let content = '';
    let title = '';
    
    if (type === 'reasoning') {
      title = 'AI推理过程 - ' + agent.name;
      const reasoning = getFullReasoning(result.result);
      content = \`
        <div class="space-y-4">
          <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div class="flex items-center space-x-2">
              <span class="font-medium">评估得分:</span>
              <span class="text-2xl font-bold \${result.pass ? 'text-green-600' : 'text-red-600'}">\${result.result?.score || 0}</span>
            </div>
            <span class="px-3 py-1 rounded-full text-sm \${result.pass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
              \${result.pass ? '✓ 通过' : '✗ 未通过'}
            </span>
          </div>
          <div class="prose max-w-none">
            <h4 class="text-gray-700 font-medium mb-2">详细推理分析</h4>
            <div class="bg-purple-50 rounded-lg p-4 reasoning-text text-gray-700">
              \${formatReasoningText(reasoning)}
            </div>
          </div>
        </div>
      \`;
    } else if (type === 'recommendation') {
      title = '评估建议 - ' + agent.name;
      const recommendation = getFullRecommendation(result.result);
      content = \`
        <div class="space-y-4">
          <div class="prose max-w-none">
            <div class="bg-blue-50 rounded-lg p-4 reasoning-text text-gray-700">
              \${formatReasoningText(recommendation || '暂无具体建议')}
            </div>
          </div>
          \${result.result?.improvements?.length > 0 ? \`
          <div>
            <h4 class="text-gray-700 font-medium mb-2">改进建议</h4>
            <ul class="space-y-2">
              \${result.result.improvements.map(item => \`
                <li class="flex items-start space-x-2 text-gray-600">
                  <i class="fas fa-arrow-right text-blue-500 mt-1"></i>
                  <span>\${item}</span>
                </li>
              \`).join('')}
            </ul>
          </div>
          \` : ''}
        </div>
      \`;
    } else if (type === 'raw') {
      title = '原始响应数据 - ' + agent.name;
      const rawData = result.result?._raw_response || JSON.stringify(result.result, null, 2);
      content = \`
        <div class="space-y-4">
          <p class="text-sm text-gray-500">以下是AI返回的原始数据，可用于调试和验证：</p>
          <pre class="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto max-h-96 overflow-y-auto">\${escapeHtml(rawData)}</pre>
        </div>
      \`;
    }
    
    popupTitle.textContent = title;
    popupContent.innerHTML = content;
    popup.classList.remove('hidden');
  }

  // 关闭推理浮窗
  function closeReasoningPopup() {
    document.getElementById('reasoning-popup').classList.add('hidden');
  }

  // 格式化推理文本（处理换行、列表等）
  function formatReasoningText(text) {
    if (!text) return '';
    return text
      .replace(/\\n\\n/g, '</p><p class="mt-3">')
      .replace(/\\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
      .replace(/- /g, '• ');
  }

  // HTML转义
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 格式化finding项（处理对象或字符串）
  function formatFinding(f) {
    if (typeof f === 'string') {
      return f;
    } else if (typeof f === 'object' && f !== null) {
      // 处理 {item, status, detail} 格式
      if (f.item && f.detail) {
        return \`【\${f.item}】\${f.detail}\`;
      } else if (f.detail) {
        return f.detail;
      } else if (f.item) {
        return f.item;
      } else if (f.message) {
        return f.message;
      } else if (f.content) {
        return f.content;
      } else {
        // 尝试转换为可读字符串
        return Object.values(f).filter(v => typeof v === 'string').join(' - ') || JSON.stringify(f);
      }
    }
    return String(f);
  }

  // 获取finding的状态图标
  function getFindingIcon(f) {
    if (typeof f === 'object' && f !== null && f.status) {
      if (f.status === 'pass' || f.status === 'ok' || f.status === 'success') {
        return 'fa-check-circle text-green-500';
      } else if (f.status === 'fail' || f.status === 'error') {
        return 'fa-times-circle text-red-500';
      } else if (f.status === 'warning' || f.status === 'warn') {
        return 'fa-exclamation-circle text-yellow-500';
      }
    }
    return 'fa-check-circle text-amber-500';
  }

  // 更新评估步骤显示（优化版）
  function updateAgentSteps(agentId, status, result = null, agent = null) {
    const stepsEl = document.getElementById(\`steps-\${agentId}\`);
    if (!stepsEl) return;

    const agentInfo = agent || demoAgents.find(a => a.id === agentId);
    
    if (status === 'running') {
      stepsEl.innerHTML = \`
        <div class="space-y-3">
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>
            </div>
            <div>
              <p class="font-medium text-primary-700">正在执行评估...</p>
              <p class="text-sm text-gray-500 mt-1">AI智能体正在分析项目材料</p>
            </div>
          </div>
          <div class="ml-9 space-y-2 text-sm text-gray-500">
            <div class="flex items-center space-x-2"><i class="fas fa-circle-notch fa-spin text-xs"></i><span>读取项目基础信息...</span></div>
            <div class="flex items-center space-x-2"><i class="fas fa-circle-notch fa-spin text-xs"></i><span>分析\${agentInfo?.dimension || '维度'}数据...</span></div>
            <div class="flex items-center space-x-2"><i class="fas fa-circle-notch fa-spin text-xs"></i><span>生成评估结论...</span></div>
          </div>
        </div>
      \`;
    } else if (status === 'pass' || status === 'fail') {
      const isPassed = status === 'pass';
      const reasoning = getFullReasoning(result);
      const recommendation = getFullRecommendation(result);
      const findings = result?.findings || [];
      const riskLevel = result?.risk_level || 'medium';
      const score = result?.score || 0;
      
      const riskLevelMap = {
        low: { text: '低风险', color: 'green', icon: 'shield-alt' },
        medium: { text: '中风险', color: 'yellow', icon: 'exclamation-triangle' },
        high: { text: '高风险', color: 'red', icon: 'exclamation-circle' }
      };
      const riskInfo = riskLevelMap[riskLevel] || riskLevelMap.medium;
      
      // 截取预览内容
      const reasoningPreview = reasoning.length > 200 ? reasoning.substring(0, 200) + '...' : reasoning;
      const recommendationPreview = recommendation && recommendation.length > 150 ? recommendation.substring(0, 150) + '...' : recommendation;
      
      stepsEl.innerHTML = \`
        <div class="space-y-4">
          <!-- 评估结果概览 -->
          <div class="flex items-start space-x-3">
            <div class="w-6 h-6 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center flex-shrink-0 mt-0.5">
              <i class="fas \${isPassed ? 'fa-check text-green-500' : 'fa-times text-red-500'} text-xs"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <p class="font-medium \${isPassed ? 'text-green-700' : 'text-red-700'}">
                  \${isPassed ? '✓ 评估通过' : '✗ 评估未通过'}
                </p>
                <div class="flex items-center space-x-2">
                  <span class="px-2 py-0.5 rounded text-xs bg-\${riskInfo.color}-100 text-\${riskInfo.color}-700">
                    <i class="fas fa-\${riskInfo.icon} mr-1"></i>\${riskInfo.text}
                  </span>
                  <span class="font-mono font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}分</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- AI推理过程（点击展开完整内容） -->
          <div class="ml-9 space-y-3">
            <div class="bg-purple-50 rounded-lg p-3 cursor-pointer hover:bg-purple-100 transition" onclick="showReasoningPopup('\${agentId}', 'reasoning')">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-sm text-purple-700 flex items-center">
                  <i class="fas fa-brain mr-2"></i>AI推理过程
                </span>
                <span class="text-xs text-purple-500 flex items-center">
                  点击查看完整内容 <i class="fas fa-external-link-alt ml-1"></i>
                </span>
              </div>
              <div class="text-sm text-gray-600 line-clamp-3">\${reasoningPreview}</div>
            </div>
            
            \${findings.length > 0 ? \`
            <div class="bg-amber-50 rounded-lg p-3">
              <div class="flex items-center space-x-2 mb-2">
                <i class="fas fa-search text-amber-500"></i>
                <span class="font-medium text-sm text-gray-700">检查发现</span>
              </div>
              <ul class="space-y-1 text-sm">
                \${findings.slice(0, 3).map(f => \`
                  <li class="flex items-start space-x-2">
                    <i class="fas \${getFindingIcon(f)} mt-0.5 text-xs"></i>
                    <span class="text-gray-600">\${formatFinding(f)}</span>
                  </li>
                \`).join('')}
                \${findings.length > 3 ? \`<li class="text-gray-400 text-xs ml-4">...还有 \${findings.length - 3} 项</li>\` : ''}
              </ul>
            </div>
            \` : ''}
            
            \${recommendation ? \`
            <div class="bg-blue-50 rounded-lg p-3 cursor-pointer hover:bg-blue-100 transition" onclick="showReasoningPopup('\${agentId}', 'recommendation')">
              <div class="flex items-center justify-between mb-2">
                <span class="font-medium text-sm text-blue-700 flex items-center">
                  <i class="fas fa-lightbulb mr-2"></i>评估建议
                </span>
                <span class="text-xs text-blue-500 flex items-center">
                  点击查看完整内容 <i class="fas fa-external-link-alt ml-1"></i>
                </span>
              </div>
              <div class="text-sm text-gray-600 line-clamp-2">\${recommendationPreview}</div>
            </div>
            \` : ''}
          </div>
          
          <!-- 操作按钮 -->
          <div class="ml-9 pt-2 flex space-x-3">
            <button onclick="showFullReport('\${agentId}')" class="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1">
              <i class="fas fa-file-alt"></i>
              <span>完整报告</span>
            </button>
            <button onclick="showReasoningPopup('\${agentId}', 'raw')" class="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
              <i class="fas fa-code"></i>
              <span>原始数据</span>
            </button>
          </div>
        </div>
      \`;
    }
  }

  // 显示完整评估报告
  function showFullReport(agentId) {
    const result = evaluationResults[agentId];
    const agent = demoAgents.find(a => a.id === agentId);
    if (!result || !agent) {
      showToast('暂无评估结果', 'error');
      return;
    }
    
    const modal = document.getElementById('detail-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const isPassed = result.pass;
    const score = result.result?.score || 0;
    const reasoning = getFullReasoning(result.result);
    const recommendation = getFullRecommendation(result.result);
    const findings = result.result?.findings || [];
    const improvements = result.result?.improvements || [];
    const missingMaterials = result.result?.missing_materials || [];
    const riskLevel = result.result?.risk_level || 'medium';
    const executionTime = result.executionTime || 0;
    
    modalTitle.innerHTML = \`
      <div class="flex items-center space-x-2">
        <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
        <span>\${agent.name} - 完整评估报告</span>
      </div>
    \`;
    
    modalContent.innerHTML = \`
      <div class="space-y-6">
        <!-- 评估概览 -->
        <div class="flex items-center justify-between p-4 rounded-xl \${isPassed ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}">
          <div class="flex items-center space-x-4">
            <div class="w-14 h-14 rounded-full \${isPassed ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center">
              <i class="fas \${isPassed ? 'fa-check' : 'fa-times'} text-2xl \${isPassed ? 'text-green-500' : 'text-red-500'}"></i>
            </div>
            <div>
              <p class="font-bold text-xl \${isPassed ? 'text-green-700' : 'text-red-700'}">
                \${isPassed ? '评估通过' : '评估未通过'}
              </p>
              <p class="text-sm text-gray-500">执行耗时: \${(executionTime / 1000).toFixed(1)}秒 | 风险等级: \${riskLevel === 'low' ? '低' : riskLevel === 'high' ? '高' : '中'}</p>
            </div>
          </div>
          <div class="text-right">
            <div class="text-4xl font-bold \${isPassed ? 'text-green-600' : 'text-red-600'}">\${score}</div>
            <div class="text-sm text-gray-500">阈值: \${agent.pass_threshold}分</div>
          </div>
        </div>
        
        <!-- 智能体信息 -->
        <div class="bg-gray-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-gray-700">
            <i class="fas fa-robot mr-2 text-gray-400"></i>智能体信息
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div class="bg-white p-3 rounded-lg">
              <span class="text-gray-500 block text-xs">评估维度</span>
              <span class="font-medium">\${agent.dimension}</span>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <span class="text-gray-500 block text-xs">所属环节</span>
              <span class="font-medium">\${agent.ring_type === 'outer' ? '外环筛选' : '中环评估'}</span>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <span class="text-gray-500 block text-xs">权重</span>
              <span class="font-medium">\${agent.weight}%</span>
            </div>
            <div class="bg-white p-3 rounded-lg">
              <span class="text-gray-500 block text-xs">通过阈值</span>
              <span class="font-medium">\${agent.pass_threshold}分</span>
            </div>
          </div>
        </div>
        
        <!-- 详细推理过程 -->
        <div class="bg-purple-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-purple-700">
            <i class="fas fa-brain mr-2"></i>AI推理过程
          </h4>
          <div class="bg-white rounded-lg p-4 text-sm text-gray-700 reasoning-text max-h-64 overflow-y-auto">
            \${formatReasoningText(reasoning)}
          </div>
        </div>
        
        \${findings.length > 0 ? \`
        <div class="bg-amber-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-amber-700">
            <i class="fas fa-search mr-2"></i>检查发现 (\${findings.length}项)
          </h4>
          <div class="grid gap-2">
            \${findings.map((f, i) => \`
              <div class="flex items-start space-x-3 bg-white p-3 rounded-lg">
                <span class="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
                <span class="text-sm text-gray-700">\${formatFinding(f)}</span>
              </div>
            \`).join('')}
          </div>
        </div>
        \` : ''}
        
        \${recommendation ? \`
        <div class="bg-blue-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-blue-700">
            <i class="fas fa-lightbulb mr-2"></i>评估建议
          </h4>
          <div class="bg-white rounded-lg p-4 text-sm text-gray-700 reasoning-text">
            \${formatReasoningText(recommendation)}
          </div>
        </div>
        \` : ''}
        
        \${improvements.length > 0 ? \`
        <div class="bg-green-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-green-700">
            <i class="fas fa-arrow-up mr-2"></i>改进建议
          </h4>
          <ul class="space-y-2">
            \${improvements.map(item => \`
              <li class="flex items-start space-x-2 bg-white p-3 rounded-lg">
                <i class="fas fa-check-circle text-green-500 mt-0.5"></i>
                <span class="text-sm text-gray-700">\${item}</span>
              </li>
            \`).join('')}
          </ul>
        </div>
        \` : ''}
        
        \${missingMaterials.length > 0 ? \`
        <div class="bg-orange-50 rounded-xl p-4">
          <h4 class="font-semibold mb-3 flex items-center text-orange-700">
            <i class="fas fa-file-circle-plus mr-2"></i>待补充材料
          </h4>
          <ul class="space-y-2">
            \${missingMaterials.map(item => \`
              <li class="flex items-start space-x-2 bg-white p-3 rounded-lg">
                <i class="fas fa-file-alt text-orange-500 mt-0.5"></i>
                <span class="text-sm text-gray-700">\${item}</span>
              </li>
            \`).join('')}
          </ul>
        </div>
        \` : ''}
      </div>
    \`;
    
    modal.classList.remove('hidden');
  }

  // 关闭详情弹窗
  function closeDetailModal() {
    document.getElementById('detail-modal').classList.add('hidden');
  }

  // 更新智能体状态
  function updateAgentStatus(agentId, status, score = null, result = null) {
    const statusEl = document.getElementById(\`status-\${agentId}\`);
    const scoreEl = document.getElementById(\`score-\${agentId}\`);
    const progressEl = document.getElementById(\`progress-\${agentId}\`);
    const cardEl = document.getElementById(\`agent-\${agentId}\`);

    if (status === 'running') {
      statusEl.innerHTML = '<i class="fas fa-spinner fa-spin text-primary-500 text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center';
      cardEl?.classList.add('ring-2', 'ring-primary-300');
      if (progressEl) {
        progressEl.classList.remove('hidden');
        progressEl.querySelector('div').style.width = '30%';
        setTimeout(() => progressEl.querySelector('div').style.width = '70%', 500);
      }
      updateAgentSteps(agentId, 'running');
    } else if (status === 'pass') {
      statusEl.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-green-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-green-300');
      if (progressEl) progressEl.querySelector('div').style.width = '100%';
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-green-600';
      }
      updateAgentSteps(agentId, 'pass', result);
      // 自动展开
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    } else if (status === 'fail') {
      statusEl.innerHTML = '<i class="fas fa-times text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-red-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      cardEl?.classList.add('border-red-300');
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-red-600';
      }
      updateAgentSteps(agentId, 'fail', result);
      const detailEl = document.getElementById(\`detail-\${agentId}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agentId}\`);
      if (detailEl) {
        detailEl.classList.remove('hidden');
        expandIcon?.classList.add('rotate-180');
      }
    }
  }

  // 更新步骤状态
  function updateStep(step, status) {
    const stepEl = document.getElementById(\`step-\${step}\`);
    const lineEl = document.getElementById(\`line-\${step - 1}\`);
    
    if (status === 'active') {
      stepEl.classList.remove('opacity-50');
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold';
      if (lineEl) lineEl.className = 'w-16 h-0.5 bg-primary-500';
    } else if (status === 'complete') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-check"></i>';
    } else if (status === 'error') {
      stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center font-bold';
      stepEl.querySelector('div').innerHTML = '<i class="fas fa-times"></i>';
    }
  }

  // 存储改进建议数据（用于浮窗显示）
  let improvementData = {
    missing: [],
    improvement: [],
    actions: [],
    riskRecommendation: ''
  };

  // 生成综合改进建议
  function generateImprovementSuggestions() {
    const missingMaterials = new Set();
    const improvements = new Set();
    const nextActions = [];
    let riskRecommendation = '';
    
    // 从所有评估结果中收集改进建议
    Object.values(evaluationResults).forEach((r) => {
      if (r.result?.missing_materials) {
        r.result.missing_materials.forEach(m => missingMaterials.add(m));
      }
      if (r.result?.improvements) {
        r.result.improvements.forEach(i => improvements.add(i));
      }
      // 从findings中提取需要改进的项
      if (r.result?.findings) {
        r.result.findings.forEach(f => {
          const findingText = formatFinding(f);
          if (findingText.includes('缺') || findingText.includes('不足') || findingText.includes('需要') || findingText.includes('建议') || findingText.includes('应') || findingText.includes('未')) {
            improvements.add(findingText);
          }
        });
      }
      // 获取风险控制智能体的recommendation
      if (r.agentId === 'risk-control-agent' && r.result?.recommendation) {
        riskRecommendation = r.result.recommendation;
      }
    });
    
    // 默认材料建议（如果没有收集到）
    if (missingMaterials.size === 0) {
      missingMaterials.add('详细的艺人合同条款（包含取消条款）');
      missingMaterials.add('涉外演出批文或申请进度文件');
      missingMaterials.add('场地租赁合同或意向书');
      missingMaterials.add('票务销售平台合作协议');
      missingMaterials.add('保险方案（演出取消险）');
    }
    
    // 默认改进建议
    if (improvements.size === 0) {
      improvements.add('完善票房预测模型，增加敏感性分析');
      improvements.add('细化艺人取消风险应对预案');
      improvements.add('明确分城市的盈亏平衡点');
      improvements.add('补充历史类似项目的对标数据');
    }
    
    // 生成下一步行动
    nextActions.push({ priority: '紧急', action: '提交缺失材料至项目组审核', deadline: '本周内' });
    nextActions.push({ priority: '重要', action: '与运营方确认涉外审批进度', deadline: '3日内' });
    nextActions.push({ priority: '重要', action: '完成保险方案比选并签约', deadline: '2周内' });
    nextActions.push({ priority: '常规', action: '启动票务预售方案设计', deadline: '1月内' });
    
    // 存储数据供浮窗使用
    improvementData = {
      missing: Array.from(missingMaterials),
      improvement: Array.from(improvements),
      actions: nextActions,
      riskRecommendation
    };
    
    // 更新UI - 待补充材料
    const missingEl = document.getElementById('missing-materials');
    const missingArr = improvementData.missing.slice(0, 3);
    missingEl.innerHTML = missingArr.map(m => \`
      <li class="flex items-start space-x-2 p-1.5 bg-white/50 rounded-lg">
        <i class="fas fa-file-circle-exclamation text-amber-500 mt-0.5 text-xs"></i>
        <span class="text-xs line-clamp-1">\${m.length > 30 ? m.substring(0, 30) + '...' : m}</span>
      </li>
    \`).join('');
    document.getElementById('missing-count').textContent = improvementData.missing.length;
    
    // 更新UI - 项目改进建议
    const improvementEl = document.getElementById('improvement-suggestions');
    const improvementArr = improvementData.improvement.slice(0, 3);
    improvementEl.innerHTML = improvementArr.map(i => \`
      <li class="flex items-start space-x-2 p-1.5 bg-white/50 rounded-lg">
        <i class="fas fa-arrow-up-right-dots text-blue-500 mt-0.5 text-xs"></i>
        <span class="text-xs line-clamp-1">\${i.length > 30 ? i.substring(0, 30) + '...' : i}</span>
      </li>
    \`).join('');
    document.getElementById('improvement-count').textContent = improvementData.improvement.length;
    
    // 更新UI - 下一步行动
    const actionsEl = document.getElementById('next-actions');
    actionsEl.innerHTML = nextActions.slice(0, 3).map((a, i) => \`
      <div class="flex items-center space-x-2 p-1.5 bg-white/50 rounded-lg">
        <span class="w-5 h-5 rounded-full bg-green-200 text-green-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
        <span class="text-xs text-gray-700 line-clamp-1">\${a.action}</span>
      </div>
    \`).join('');
    document.getElementById('actions-count').textContent = nextActions.length;
    
    // 显示风险管理建议（如果有）
    if (riskRecommendation) {
      document.getElementById('risk-recommendation-section').classList.remove('hidden');
      const preview = riskRecommendation.replace(/\\n/g, ' ').substring(0, 150) + '...';
      document.getElementById('risk-recommendation-preview').textContent = preview;
    }
    
    document.getElementById('improvement-section').classList.remove('hidden');
  }
  
  // 切换卡片展开/收起
  function toggleImprovementCard(type) {
    const contentEl = document.getElementById(\`\${type}-content\`);
    const iconEl = document.getElementById(\`\${type}-expand-icon\`);
    if (contentEl && iconEl) {
      contentEl.classList.toggle('hidden');
      iconEl.classList.toggle('rotate-180');
    }
  }
  
  // 显示改进建议浮窗
  function showImprovementPopup(type) {
    const popup = document.getElementById('improvement-popup');
    const header = document.getElementById('improvement-popup-header');
    const title = document.getElementById('improvement-popup-title');
    const content = document.getElementById('improvement-popup-content');
    
    let headerClass = 'p-4 border-b flex items-center justify-between ';
    let titleHtml = '';
    let contentHtml = '';
    
    if (type === 'missing') {
      headerClass += 'bg-amber-50';
      titleHtml = '<i class="fas fa-file-circle-plus mr-2 text-amber-500"></i><span class="text-amber-800">待补充材料清单</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">以下材料需要补充完善，以便进行更准确的评估：</p>
        
        <!-- 文件上传区域 -->
        <div class="mb-6">
          <!-- 拖拽上传区 -->
          <div id="drop-zone" 
            class="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-dashed border-amber-300 transition-all cursor-pointer hover:border-amber-400 hover:bg-amber-100/50"
            onclick="document.getElementById('file-input').click()"
            ondrop="handleFileDrop(event)" 
            ondragover="handleDragOver(event)" 
            ondragleave="handleDragLeave(event)">
            <div class="text-center">
              <div class="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-cloud-upload-alt text-3xl text-amber-500"></i>
              </div>
              <h4 class="font-semibold text-amber-800 mb-2">上传补充材料</h4>
              <p class="text-sm text-amber-600 mb-3">拖拽文件到此处，或点击选择文件</p>
              <p class="text-xs text-gray-500">支持 TXT、PDF、DOC、DOCX、图片等格式，单个文件最大 10MB</p>
            </div>
            <input type="file" id="file-input" class="hidden" multiple 
              accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.md"
              onchange="handleFileSelect(event)">
          </div>
          
          <!-- 已选择文件列表 -->
          <div id="selected-files-section" class="mt-4 hidden">
            <h5 class="font-medium text-sm text-gray-700 mb-2 flex items-center justify-between">
              <span><i class="fas fa-paperclip mr-2"></i>已选择文件</span>
              <button onclick="clearSelectedFiles()" class="text-xs text-red-500 hover:text-red-600">
                <i class="fas fa-trash mr-1"></i>清空
              </button>
            </h5>
            <div id="selected-files-list" class="space-y-2 max-h-40 overflow-y-auto"></div>
          </div>
          
          <!-- 材料分类选择 -->
          <div class="mt-4 flex items-center space-x-3">
            <label class="text-sm text-gray-600 whitespace-nowrap">材料分类:</label>
            <select id="material-category" 
              class="flex-1 px-3 py-2 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-400 focus:border-transparent">
              <option value="合同文件">合同文件</option>
              <option value="审批文件">审批文件</option>
              <option value="财务文件">财务文件</option>
              <option value="保险文件">保险文件</option>
              <option value="其他">其他</option>
            </select>
          </div>
          
          <!-- 上传按钮 -->
          <div class="mt-4 flex space-x-3">
            <button onclick="uploadSelectedFiles()" id="btn-upload" 
              class="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              <i class="fas fa-upload mr-2"></i>上传材料
            </button>
            <button onclick="uploadFilesAndRerun()" id="btn-upload-rerun"
              class="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:opacity-90 transition flex items-center justify-center">
              <i class="fas fa-play mr-2"></i>上传并重新评估
            </button>
          </div>
        </div>
        
        <!-- 已上传材料列表 -->
        <div id="uploaded-materials-section" class="mb-4 hidden">
          <h5 class="font-medium text-sm text-green-700 mb-2 flex items-center">
            <i class="fas fa-check-circle mr-2"></i>已上传材料
          </h5>
          <div id="uploaded-materials-list" class="space-y-2 max-h-48 overflow-y-auto"></div>
        </div>
        
        <!-- 待补充材料清单 -->
        <h5 class="font-medium text-sm text-amber-700 mb-3 flex items-center">
          <i class="fas fa-list-check mr-2"></i>待补充清单
        </h5>
        <div class="space-y-3">
          \${improvementData.missing.map((m, i) => \`
            <div class="flex items-start space-x-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
              <span class="w-6 h-6 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center text-xs font-bold flex-shrink-0">\${i + 1}</span>
              <div class="flex-1">
                <p class="text-sm text-gray-800">\${m}</p>
              </div>
              <span class="text-xs bg-amber-100 text-amber-600 px-2 py-0.5 rounded">待上传</span>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (type === 'improvement') {
      headerClass += 'bg-blue-50';
      titleHtml = '<i class="fas fa-lightbulb mr-2 text-blue-500"></i><span class="text-blue-800">项目改进建议</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">基于AI智能体评估结果，以下方面建议改进：</p>
        <div class="space-y-3">
          \${improvementData.improvement.map((item, i) => \`
            <div class="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div class="w-6 h-6 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center flex-shrink-0">
                <i class="fas fa-arrow-up text-xs"></i>
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-800">\${item}</p>
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
    } else if (type === 'actions') {
      headerClass += 'bg-green-50';
      titleHtml = '<i class="fas fa-tasks mr-2 text-green-500"></i><span class="text-green-800">建议下一步行动</span>';
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">按优先级排序的行动计划：</p>
        <div class="space-y-3">
          \${improvementData.actions.map((a, i) => {
            const priorityColors = {
              '紧急': 'bg-red-100 text-red-700 border-red-200',
              '重要': 'bg-orange-100 text-orange-700 border-orange-200',
              '常规': 'bg-green-100 text-green-700 border-green-200'
            };
            const priorityBadge = priorityColors[a.priority] || priorityColors['常规'];
            return \`
              <div class="flex items-center space-x-3 p-3 bg-white rounded-lg border shadow-sm">
                <span class="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-bold">\${i + 1}</span>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">\${a.action}</p>
                  <p class="text-xs text-gray-500 mt-0.5">建议完成时间：\${a.deadline}</p>
                </div>
                <span class="text-xs px-2 py-1 rounded border \${priorityBadge}">\${a.priority}</span>
              </div>
            \`;
          }).join('')}
        </div>
      \`;
    } else if (type === 'risk-rec') {
      headerClass += 'bg-red-50';
      titleHtml = '<i class="fas fa-shield-halved mr-2 text-red-500"></i><span class="text-red-800">风险管理建议</span>';
      const formattedRec = formatRiskRecommendation(improvementData.riskRecommendation);
      contentHtml = \`
        <p class="text-sm text-gray-500 mb-4">来自风险控制智能体的专业建议：</p>
        <div class="bg-red-50 rounded-lg p-4 border border-red-100">
          <div class="prose prose-sm max-w-none text-gray-700 risk-rec-content">
            \${formattedRec}
          </div>
        </div>
      \`;
    }
    
    header.className = headerClass;
    title.innerHTML = titleHtml;
    content.innerHTML = contentHtml;
    popup.classList.remove('hidden');
  }
  
  // 格式化风险建议内容
  function formatRiskRecommendation(text) {
    if (!text) return '<p class="text-gray-400">暂无详细建议</p>';
    
    // 将文本按段落分割并格式化
    return text
      .split(/\\n\\n|\\\\n\\\\n/)
      .map(para => {
        // 检测是否是标题行（如 "1) 立即行动项："）
        if (/^\\d+\\)|^[一二三四五六七八九十]+、/.test(para.trim())) {
          const lines = para.split(/\\n|\\\\n/);
          const title = lines[0];
          const items = lines.slice(1);
          
          return \`
            <div class="mb-4">
              <h4 class="font-semibold text-red-800 mb-2">\${title}</h4>
              \${items.length > 0 ? \`
                <ul class="space-y-1 ml-4">
                  \${items.map(item => item.trim() ? \`<li class="flex items-start space-x-2"><i class="fas fa-check-circle text-red-400 mt-1 text-xs"></i><span>\${item.replace(/^\\s*-\\s*/, '')}</span></li>\` : '').join('')}
                </ul>
              \` : ''}
            </div>
          \`;
        }
        return para.trim() ? \`<p class="mb-3">\${para.replace(/\\n|\\\\n/g, '<br>')}</p>\` : '';
      })
      .join('');
  }
  
  // 关闭改进建议浮窗
  function closeImprovementPopup() {
    document.getElementById('improvement-popup').classList.add('hidden');
  }

  // 开始演示
  async function startDemo() {
    if (isRunning) return;
    isRunning = true;
    evaluationResults = {};
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-start').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    document.getElementById('overall-status').textContent = '正在评估...';
    document.getElementById('recommendation-section').classList.add('hidden');
    document.getElementById('improvement-section').classList.add('hidden');

    try {
      // 步骤2：外环筛选
      updateStep(2, 'active');
      document.getElementById('outer-section').classList.remove('opacity-50');
      document.getElementById('outer-status').textContent = '执行中...';
      document.getElementById('outer-status').className = 'text-sm text-primary-600';

      const outerAgents = ['negative-list-agent', 'touch-agent', 'interest-alignment-agent'];
      
      for (const agentId of outerAgents) {
        updateAgentStatus(agentId, 'running');
        
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({ agentId, dealId: 'DGT-2026-CARDIB' })
        });
        
        await sleep(500);
        
        const pass = response.data.pass;
        const score = response.data.result?.score || 0;
        evaluationResults[agentId] = response.data;
        updateAgentStatus(agentId, pass ? 'pass' : 'fail', score, response.data.result);
        
        if (!pass) {
          document.getElementById('outer-status').textContent = '未通过';
          document.getElementById('outer-status').className = 'text-sm text-red-600';
          updateStep(2, 'error');
          document.getElementById('overall-status').textContent = '外环筛选未通过';
          showToast('外环筛选未通过', 'error');
          generateImprovementSuggestions();
          return;
        }
      }

      document.getElementById('outer-status').textContent = '全部通过';
      document.getElementById('outer-status').className = 'text-sm text-green-600';
      updateStep(2, 'complete');

      // 步骤3：中环评估
      updateStep(3, 'active');
      document.getElementById('inner-section').classList.remove('opacity-50');
      document.getElementById('inner-status').textContent = '并行评估中...';
      document.getElementById('inner-status').className = 'text-sm text-primary-600';

      const innerAgentIds = ['financial-health-agent', 'operational-capability-agent', 'legal-compliance-agent', 
                            'risk-control-agent', 'interest-deep-agent', 'economic-calculation-agent'];
      
      innerAgentIds.forEach(id => updateAgentStatus(id, 'running'));

      const innerResults = await Promise.all(innerAgentIds.map(async agentId => {
        const response = await apiCall('/api/ai/evaluate', {
          method: 'POST',
          body: JSON.stringify({ agentId, dealId: 'DGT-2026-CARDIB' })
        });
        return { agentId, ...response.data };
      }));

      const scores = {};
      innerResults.forEach(r => {
        const score = r.result?.score || 0;
        scores[r.agentId] = score;
        evaluationResults[r.agentId] = r;
        updateAgentStatus(r.agentId, r.pass ? 'pass' : 'fail', score, r.result);
      });

      document.getElementById('inner-status').textContent = '评估完成';
      document.getElementById('inner-status').className = 'text-sm text-green-600';
      updateStep(3, 'complete');

      // 步骤4：综合评分
      updateStep(4, 'active');
      document.getElementById('final-section').classList.remove('opacity-50');
      document.getElementById('final-status').textContent = '计算中...';
      document.getElementById('final-status').className = 'text-sm text-primary-600';

      const weights = {
        'financial-health-agent': 25,
        'operational-capability-agent': 20,
        'legal-compliance-agent': 15,
        'risk-control-agent': 15,
        'interest-deep-agent': 10,
        'economic-calculation-agent': 10
      };

      let weightedSum = 0;
      let totalWeight = 0;
      Object.keys(weights).forEach(id => {
        weightedSum += (scores[id] || 0) * weights[id];
        totalWeight += weights[id];
      });

      const finalScore = Math.round(weightedSum / totalWeight * 10) / 10;
      
      let grade = 'D', gradeColor = 'red';
      if (finalScore >= 85) { grade = 'A'; gradeColor = 'green'; }
      else if (finalScore >= 75) { grade = 'B+'; gradeColor = 'emerald'; }
      else if (finalScore >= 65) { grade = 'B'; gradeColor = 'blue'; }
      else if (finalScore >= 60) { grade = 'C'; gradeColor = 'yellow'; }

      updateRadarChart(scores);

      document.getElementById('final-details').innerHTML = \`
        <div class="text-center">
          <div class="text-5xl font-bold text-\${gradeColor}-600 mb-2">\${finalScore}</div>
          <div class="text-2xl font-bold text-\${gradeColor}-500">\${grade}级</div>
          <p class="text-gray-500 mt-2">\${grade === 'A' ? '强烈推荐投资' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资'}</p>
        </div>
        <div class="space-y-2 mt-4">
          \${Object.entries(scores).map(([id, score]) => {
            const agent = demoAgents.find(a => a.id === id);
            return \`<div class="flex justify-between text-sm"><span class="text-gray-600">\${agent?.dimension || id}</span><span class="font-mono font-medium">\${score}</span></div>\`;
          }).join('')}
        </div>
        <div class="mt-4 pt-4 border-t">
          <p class="text-xs text-gray-500 mb-2"><i class="fas fa-calculator mr-1"></i>加权计算</p>
          <div class="text-xs text-gray-400 space-y-1">
            \${Object.entries(weights).map(([id, weight]) => {
              const agent = demoAgents.find(a => a.id === id);
              return \`<div>\${agent?.dimension || id}: \${scores[id] || 0} × \${weight}%</div>\`;
            }).join('')}
            <div class="font-medium text-gray-600 mt-2">= \${finalScore} 分</div>
          </div>
        </div>
      \`;

      document.getElementById('final-status').textContent = '评分完成';
      document.getElementById('final-status').className = 'text-sm text-green-600';
      updateStep(4, 'complete');

      // 显示投资建议
      const recSection = document.getElementById('recommendation-section');
      recSection.classList.remove('hidden');
      recSection.querySelector('.bg-gradient-to-r').className = \`bg-gradient-to-r from-\${gradeColor}-500 to-\${gradeColor === 'green' ? 'emerald' : gradeColor}-600 rounded-xl p-6 text-white\`;
      
      document.getElementById('rec-title').textContent = grade === 'A' || grade === 'B+' ? '✅ 建议投资' : grade === 'B' ? '⚠️ 可考虑投资' : '❌ 建议谨慎';
      document.getElementById('rec-detail').textContent = 'Cardi B 2026中国巡演项目整体评估良好，IRR预期35%，回收期5个月。';
      document.getElementById('rec-score').textContent = finalScore;
      document.getElementById('rec-grade').textContent = grade + '级';
      
      // 提取优势和风险
      const strengths = [], risks = [];
      Object.values(evaluationResults).forEach(r => {
        if (r.result?.findings) {
          r.result.findings.forEach(f => {
            const findingText = formatFinding(f);
            if (findingText.includes('优') || findingText.includes('强') || findingText.includes('好') || findingText.includes('完善') || findingText.includes('齐全') || findingText.includes('丰富') || findingText.includes('pass')) {
              if (strengths.length < 4) strengths.push(findingText);
            } else if (findingText.includes('风险') || findingText.includes('缺') || findingText.includes('不足') || findingText.includes('需要') || findingText.includes('关注') || findingText.includes('较')) {
              if (risks.length < 4) risks.push(findingText);
            }
          });
        }
      });
      
      document.getElementById('rec-strengths').innerHTML = (strengths.length > 0 ? strengths : [
        '首次中国巡演，市场稀缺性强', '三城联动分散风险', '运营方经验丰富'
      ]).slice(0, 3).map(s => {
        const text = typeof s === 'string' ? s : formatFinding(s);
        return \`<li>• \${text.length > 40 ? text.substring(0, 40) + '...' : text}</li>\`;
      }).join('');
      
      document.getElementById('rec-risks').innerHTML = (risks.length > 0 ? risks : [
        '艺人取消风险需关注', '票房预测依赖市场反应', '涉外审批进度需跟踪'
      ]).slice(0, 3).map(r => {
        const text = typeof r === 'string' ? r : formatFinding(r);
        return \`<li>• \${text.length > 40 ? text.substring(0, 40) + '...' : text}</li>\`;
      }).join('');

      // 生成综合改进建议
      generateImprovementSuggestions();

      document.getElementById('overall-status').textContent = '评估完成';
      showToast('评估完成！综合评分：' + finalScore + '分', 'success');

    } catch (error) {
      showToast('评估出错：' + error.message, 'error');
      document.getElementById('overall-status').textContent = '评估出错';
    } finally {
      isRunning = false;
      document.getElementById('btn-start').disabled = false;
      document.getElementById('btn-start').innerHTML = '<i class="fas fa-play mr-2"></i>重新评估';
    }
  }

  // 更新雷达图
  function updateRadarChart(scores) {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['财务健康', '运营能力', '法律合规', '风险控制', '利益一致', '经济性'],
        datasets: [{
          label: '评分',
          data: [
            scores['financial-health-agent'] || 0,
            scores['operational-capability-agent'] || 0,
            scores['legal-compliance-agent'] || 0,
            scores['risk-control-agent'] || 0,
            scores['interest-deep-agent'] || 0,
            scores['economic-calculation-agent'] || 0
          ],
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff'
        }]
      },
      options: {
        scales: { r: { beginAtZero: true, max: 100, ticks: { stepSize: 20 } } },
        plugins: { legend: { display: false } }
      }
    });
  }

  function resetDemo() { location.reload(); }
  function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  // 键盘事件
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeReasoningPopup();
      closeImprovementPopup();
    }
  });

  // ============================================
  // 文件上传功能
  // ============================================
  
  let uploadedMaterials = []; // 存储已上传的材料
  let selectedFiles = []; // 存储待上传的文件
  
  // 转义引号用于HTML属性
  function escapeQuotes(str) {
    return str.replace(/'/g, "\\\\'").replace(/"/g, '\\\\"');
  }
  
  // 获取文件图标
  function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      'pdf': 'fa-file-pdf text-red-500',
      'doc': 'fa-file-word text-blue-500',
      'docx': 'fa-file-word text-blue-500',
      'xls': 'fa-file-excel text-green-500',
      'xlsx': 'fa-file-excel text-green-500',
      'txt': 'fa-file-lines text-gray-500',
      'md': 'fa-file-code text-purple-500',
      'png': 'fa-file-image text-pink-500',
      'jpg': 'fa-file-image text-pink-500',
      'jpeg': 'fa-file-image text-pink-500',
      'gif': 'fa-file-image text-pink-500'
    };
    return icons[ext] || 'fa-file text-gray-400';
  }
  
  // 格式化文件大小
  function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }
  
  // 处理拖拽进入
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropZone = document.getElementById('drop-zone');
    dropZone.classList.add('border-amber-500', 'bg-amber-100');
  }
  
  // 处理拖拽离开
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropZone = document.getElementById('drop-zone');
    dropZone.classList.remove('border-amber-500', 'bg-amber-100');
  }
  
  // 处理文件拖放
  function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const dropZone = document.getElementById('drop-zone');
    dropZone.classList.remove('border-amber-500', 'bg-amber-100');
    
    const files = Array.from(e.dataTransfer.files);
    addFilesToSelection(files);
  }
  
  // 处理文件选择
  function handleFileSelect(e) {
    const files = Array.from(e.target.files);
    addFilesToSelection(files);
    e.target.value = ''; // 清空input以便再次选择相同文件
  }
  
  // 添加文件到选择列表
  function addFilesToSelection(files) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const validTypes = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'gif', 'md'];
    
    files.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      
      if (!validTypes.includes(ext)) {
        showToast(\`不支持的文件格式: \${file.name}\`, 'error');
        return;
      }
      
      if (file.size > maxSize) {
        showToast(\`文件过大: \${file.name} (\${formatFileSize(file.size)})\`, 'error');
        return;
      }
      
      // 检查是否已添加
      if (!selectedFiles.find(f => f.name === file.name && f.size === file.size)) {
        selectedFiles.push(file);
      }
    });
    
    updateSelectedFilesList();
  }
  
  // 更新已选择文件列表
  function updateSelectedFilesList() {
    const section = document.getElementById('selected-files-section');
    const list = document.getElementById('selected-files-list');
    
    if (!section || !list) return;
    
    if (selectedFiles.length > 0) {
      section.classList.remove('hidden');
      list.innerHTML = selectedFiles.map((file, index) => \`
        <div class="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <i class="fas \${getFileIcon(file.name)} text-lg"></i>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-700 truncate">\${file.name}</p>
              <p class="text-xs text-gray-400">\${formatFileSize(file.size)}</p>
            </div>
          </div>
          <button onclick="removeSelectedFile(\${index})" class="ml-2 w-6 h-6 rounded-full hover:bg-red-100 flex items-center justify-center text-red-400 hover:text-red-600 transition">
            <i class="fas fa-times text-xs"></i>
          </button>
        </div>
      \`).join('');
    } else {
      section.classList.add('hidden');
    }
  }
  
  // 移除选中的文件
  function removeSelectedFile(index) {
    selectedFiles.splice(index, 1);
    updateSelectedFilesList();
  }
  
  // 清空已选文件
  function clearSelectedFiles() {
    selectedFiles = [];
    updateSelectedFilesList();
  }
  
  // 读取文件内容
  async function readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const ext = file.name.split('.').pop().toLowerCase();
      
      reader.onload = (e) => {
        const result = e.target.result;
        
        // 文本文件直接返回内容
        if (['txt', 'md'].includes(ext)) {
          resolve({ type: 'text', content: result });
        }
        // 图片转为base64描述
        else if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
          resolve({ type: 'image', content: \`[图片文件: \${file.name}, 大小: \${formatFileSize(file.size)}]\` });
        }
        // PDF和Office文档提取基本信息
        else if (['pdf', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) {
          // 对于二进制文件，我们记录文件信息
          // 实际内容需要后端处理或使用专门的库
          resolve({ 
            type: 'document', 
            content: \`[文档文件: \${file.name}, 格式: \${ext.toUpperCase()}, 大小: \${formatFileSize(file.size)}]\\n\\n注：文档内容需要专业工具解析，请确保文件内容与待补充材料相关。\`
          });
        }
        else {
          resolve({ type: 'unknown', content: \`[文件: \${file.name}]\` });
        }
      };
      
      reader.onerror = () => reject(new Error('文件读取失败'));
      
      // 文本类型文件用文本方式读取
      if (['txt', 'md'].includes(ext)) {
        reader.readAsText(file);
      } else {
        // 其他文件用ArrayBuffer读取（用于后续处理）
        reader.readAsArrayBuffer(file);
      }
    });
  }
  
  // 上传选中的文件
  async function uploadSelectedFiles() {
    if (selectedFiles.length === 0) {
      showToast('请先选择文件', 'error');
      return false;
    }
    
    const btn = document.getElementById('btn-upload');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>上传中...';
    btn.disabled = true;
    
    const category = document.getElementById('material-category')?.value || '其他';
    
    try {
      // 读取所有文件内容
      const materialsToUpload = [];
      
      for (const file of selectedFiles) {
        try {
          const { type, content } = await readFileContent(file);
          materialsToUpload.push({
            name: file.name,
            category: category,
            content: content,
            fileType: type,
            fileSize: file.size,
            uploadedAt: new Date().toISOString()
          });
        } catch (err) {
          showToast(\`读取文件失败: \${file.name}\`, 'error');
        }
      }
      
      if (materialsToUpload.length === 0) {
        showToast('没有可上传的文件', 'error');
        return false;
      }
      
      // 调用API上传
      const response = await apiCall('/api/deals/DGT-2026-CARDIB/materials', {
        method: 'POST',
        body: JSON.stringify({ materials: materialsToUpload })
      });
      
      if (response.success) {
        uploadedMaterials = response.data || [];
        showToast(\`成功上传 \${materialsToUpload.length} 个文件！\`, 'success');
        
        // 清空已选文件
        clearSelectedFiles();
        
        // 更新已上传材料显示
        updateUploadedMaterialsList();
        
        return true;
      } else {
        showToast('上传失败: ' + (response.error || '未知错误'), 'error');
        return false;
      }
    } catch (error) {
      showToast('上传出错: ' + error.message, 'error');
      return false;
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  }
  
  // 上传文件并重新评估
  async function uploadFilesAndRerun() {
    // 如果有选中的文件则先上传
    if (selectedFiles.length > 0) {
      const uploaded = await uploadSelectedFiles();
      if (!uploaded) return;
    }
    
    // 关闭浮窗
    closeImprovementPopup();
    
    // 显示提示
    showToast('开始重新评估...', 'info');
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // 延迟一点再开始评估，让用户看到提示
    setTimeout(() => {
      // 重置评估状态
      resetDemoForRerun();
      // 开始评估
      startDemo();
    }, 500);
  }
  
  // 重置演示状态（不刷新页面）
  function resetDemoForRerun() {
    evaluationResults = {};
    
    // 重置步骤指示器
    for (let i = 2; i <= 4; i++) {
      const stepEl = document.getElementById(\`step-\${i}\`);
      if (stepEl) {
        stepEl.classList.add('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold';
        stepEl.querySelector('div').textContent = i;
      }
    }
    
    // 重置区域状态
    document.getElementById('outer-section')?.classList.add('opacity-50');
    document.getElementById('inner-section')?.classList.add('opacity-50');
    document.getElementById('final-section')?.classList.add('opacity-50');
    
    document.getElementById('outer-status').textContent = '等待开始';
    document.getElementById('outer-status').className = 'text-sm text-gray-500';
    document.getElementById('inner-status').textContent = '等待外环完成';
    document.getElementById('inner-status').className = 'text-sm text-gray-500';
    document.getElementById('final-status').textContent = '等待评估完成';
    document.getElementById('final-status').className = 'text-sm text-gray-500';
    
    // 隐藏结果区域
    document.getElementById('recommendation-section')?.classList.add('hidden');
    document.getElementById('improvement-section')?.classList.add('hidden');
    
    // 重置智能体卡片
    demoAgents.forEach(agent => {
      const statusEl = document.getElementById(\`status-\${agent.id}\`);
      const scoreEl = document.getElementById(\`score-\${agent.id}\`);
      const cardEl = document.getElementById(\`agent-\${agent.id}\`);
      const detailEl = document.getElementById(\`detail-\${agent.id}\`);
      const expandIcon = document.getElementById(\`expand-icon-\${agent.id}\`);
      
      if (statusEl) {
        statusEl.innerHTML = '<i class="fas fa-minus text-gray-400 text-xs"></i>';
        statusEl.className = 'w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center';
      }
      if (scoreEl) {
        scoreEl.textContent = '--';
        scoreEl.className = 'font-mono text-lg font-bold text-gray-400';
      }
      if (cardEl) {
        cardEl.classList.remove('ring-2', 'ring-primary-300', 'border-green-300', 'border-red-300');
      }
      if (detailEl) {
        detailEl.classList.add('hidden');
        detailEl.querySelector(\`#steps-\${agent.id}\`).innerHTML = '<div class="flex items-center space-x-2 text-gray-400 text-sm"><i class="fas fa-hourglass-start"></i><span>等待执行...</span></div>';
      }
      if (expandIcon) {
        expandIcon.classList.remove('rotate-180');
      }
    });
    
    // 重置雷达图
    if (radarChart) {
      radarChart.destroy();
      radarChart = null;
    }
    
    document.getElementById('final-details').innerHTML = '<div class="text-center py-8 text-gray-400"><i class="fas fa-chart-pie text-4xl mb-2"></i><p>评估完成后显示结果</p></div>';
    document.getElementById('overall-status').textContent = '准备就绪';
  }
  
  // 更新已上传材料列表显示
  function updateUploadedMaterialsList() {
    const section = document.getElementById('uploaded-materials-section');
    const list = document.getElementById('uploaded-materials-list');
    
    if (!section || !list) return;
    
    if (uploadedMaterials.length > 0) {
      section.classList.remove('hidden');
      list.innerHTML = uploadedMaterials.map(m => \`
        <div class="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-100">
          <div class="flex items-center space-x-3 flex-1 min-w-0">
            <i class="fas \${getFileIcon(m.name)} text-lg"></i>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-green-800 truncate">\${m.name}</p>
              <p class="text-xs text-green-600">[\${m.category}] \${m.fileSize ? formatFileSize(m.fileSize) : ''}</p>
            </div>
          </div>
          <div class="text-right ml-2">
            <span class="text-xs text-green-600 whitespace-nowrap">\${new Date(m.uploadedAt).toLocaleString('zh-CN')}</span>
          </div>
        </div>
      \`).join('');
    } else {
      section.classList.add('hidden');
    }
  }
  
  // 加载已上传的材料
  async function loadUploadedMaterials() {
    try {
      const response = await apiCall('/api/deals/DGT-2026-CARDIB/materials');
      if (response.success) {
        uploadedMaterials = response.data || [];
      }
    } catch (e) {
      console.log('加载已上传材料失败', e);
    }
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDemoAgents, 500);
    setTimeout(loadUploadedMaterials, 600);
  });
</script>
`
