// 智能体配置页面 - agents.html
export const agentsPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">智能体配置中心</h1>
    <p class="text-gray-500">配置和管理所有AI评估智能体</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="refreshAgents()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-sync-alt mr-2"></i>刷新
    </button>
  </div>
</div>

<!-- 双层Tab布局 -->
<div class="bg-white rounded-xl card-shadow overflow-hidden">
  <!-- 环类型Tab -->
  <div class="border-b">
    <div class="flex">
      <button id="tab-outer" onclick="switchRingTab('outer')" class="px-6 py-4 font-medium text-primary-600 border-b-2 border-primary-500 bg-primary-50">
        <i class="fas fa-circle-notch mr-2"></i>外环智能体 <span class="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">一票否决</span>
      </button>
      <button id="tab-inner" onclick="switchRingTab('inner')" class="px-6 py-4 font-medium text-gray-500 hover:text-gray-700 transition">
        <i class="fas fa-bullseye mr-2"></i>中环智能体 <span class="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">加权评分</span>
      </button>
    </div>
  </div>

  <!-- 智能体列表 -->
  <div class="p-6">
    <div id="agents-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <!-- 动态加载 -->
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
          <textarea id="edit-prompt" class="w-full h-96 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent" placeholder="输入System Prompt..."></textarea>
        </div>

        <!-- 知识库 Tab -->
        <div id="panel-knowledge" class="detail-panel hidden">
          <div class="mb-4 flex justify-between items-center">
            <label class="font-medium text-gray-700">知识库内容</label>
            <div class="space-x-2">
              <button onclick="toggleKnowledgeEdit()" id="btn-edit-knowledge" class="px-3 py-1 bg-primary-100 text-primary-700 rounded text-sm hover:bg-primary-200">
                <i class="fas fa-edit mr-1"></i>编辑
              </button>
              <label class="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 cursor-pointer">
                <i class="fas fa-upload mr-1"></i>上传文档
                <input type="file" class="hidden" accept=".txt,.md,.pdf" onchange="uploadKnowledge(event)">
              </label>
            </div>
          </div>
          <div id="knowledge-view" class="border rounded-lg p-4 bg-gray-50 h-96 overflow-y-auto markdown-content"></div>
          <textarea id="knowledge-edit" class="hidden w-full h-96 border rounded-lg p-4 font-mono text-sm focus:ring-2 focus:ring-primary-500"></textarea>
          <div id="knowledge-mode" class="mt-2 hidden">
            <label class="inline-flex items-center mr-4">
              <input type="radio" name="upload-mode" value="replace" checked class="mr-2"> 替换现有内容
            </label>
            <label class="inline-flex items-center">
              <input type="radio" name="upload-mode" value="append" class="mr-2"> 追加到现有内容
            </label>
          </div>
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
              <p class="text-xs text-gray-500 mt-1">外环智能体权重为0（一票否决制）</p>
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
                <div class="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
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

  // 切换环类型Tab
  function switchRingTab(type) {
    currentRingType = type;
    document.getElementById('tab-outer').className = type === 'outer' 
      ? 'px-6 py-4 font-medium text-primary-600 border-b-2 border-primary-500 bg-primary-50'
      : 'px-6 py-4 font-medium text-gray-500 hover:text-gray-700 transition';
    document.getElementById('tab-inner').className = type === 'inner'
      ? 'px-6 py-4 font-medium text-primary-600 border-b-2 border-primary-500 bg-primary-50'
      : 'px-6 py-4 font-medium text-gray-500 hover:text-gray-700 transition';
    renderAgents();
  }

  // 加载智能体数据
  async function loadAgents() {
    try {
      const { data } = await apiCall('/api/agents');
      currentAgents = data;
      renderAgents();
    } catch (e) {}
  }

  // 渲染智能体列表
  function renderAgents() {
    const filtered = currentAgents.filter(a => a.ring_type === currentRingType);
    const container = document.getElementById('agents-list');
    
    container.innerHTML = filtered.map(agent => \`
      <div class="agent-card bg-gray-50 rounded-xl p-4 cursor-pointer hover:shadow-md transition" onclick="openAgentModal('\${agent.id}')">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
              <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">\${agent.name}</h4>
              <p class="text-xs text-gray-500">\${agent.dimension}</p>
            </div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer" onclick="event.stopPropagation()">
            <input type="checkbox" class="sr-only peer" \${agent.is_enabled ? 'checked' : ''} onchange="toggleAgent('\${agent.id}', this.checked)">
            <div class="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
        <p class="text-sm text-gray-600 line-clamp-2 mb-3">\${agent.description}</p>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>\${agent.ring_type === 'outer' ? '一票否决' : '权重 ' + agent.weight + '%'}</span>
          <span>阈值 \${agent.pass_threshold}</span>
        </div>
      </div>
    \`).join('');
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

    document.getElementById('modal-icon').innerHTML = \`<i class="\${currentAgent.icon}" style="color: \${currentAgent.icon_color}"></i>\`;
    document.getElementById('modal-icon').style.background = currentAgent.icon_color + '20';
    document.getElementById('modal-title').textContent = currentAgent.name;
    document.getElementById('modal-dimension').textContent = currentAgent.dimension + ' | ' + (currentAgent.ring_type === 'outer' ? '外环' : '中环');

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
        ? 'py-3 px-4 font-medium text-primary-600 border-b-2 border-primary-500'
        : 'py-3 px-4 font-medium text-gray-500 hover:text-gray-700';
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
      const mode = document.querySelector('input[name="upload-mode"]:checked')?.value || 'append';
      
      if (mode === 'append') {
        document.getElementById('knowledge-edit').value += '\\n\\n---\\n\\n' + content;
      } else {
        document.getElementById('knowledge-edit').value = content;
      }
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

  function refreshAgents() {
    loadAgents();
    showToast('已刷新');
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadAgents, 500);
  });
</script>
`
