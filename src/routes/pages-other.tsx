// 工作流页面 - workflow.html
export const workflowPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">工作流编排</h1>
    <p class="text-gray-500">可视化配置多智能体评估流程</p>
  </div>
</div>

<div class="bg-white rounded-xl card-shadow p-6">
  <!-- 流程图 -->
  <div class="flex items-center justify-center py-8 overflow-x-auto">
    <div class="flex items-center space-x-4 min-w-max">
      <!-- 开始 -->
      <div class="flex flex-col items-center">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white shadow-lg">
          <i class="fas fa-play text-xl"></i>
        </div>
        <span class="mt-2 text-sm font-medium">开始</span>
      </div>

      <div class="w-12 h-0.5 bg-gray-300"></div>

      <!-- 外环筛选 -->
      <div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 min-w-64">
        <div class="flex items-center mb-3">
          <i class="fas fa-circle-notch text-red-500 mr-2"></i>
          <span class="font-semibold text-red-700">外环筛选</span>
          <span class="ml-2 text-xs bg-red-500 text-white px-2 py-0.5 rounded">串行</span>
        </div>
        <div id="outer-flow" class="space-y-2">
          <!-- 动态加载 -->
        </div>
        <div class="mt-3 text-xs text-red-600">
          <i class="fas fa-exclamation-triangle mr-1"></i>
          一票否决制：任一不通过即终止
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="w-12 h-0.5 bg-gray-300"></div>
        <div class="text-xs text-gray-500 my-1">全部通过</div>
        <div class="w-12 h-0.5 bg-gray-300"></div>
      </div>

      <!-- 中环评估 -->
      <div class="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 min-w-80">
        <div class="flex items-center mb-3">
          <i class="fas fa-bullseye text-blue-500 mr-2"></i>
          <span class="font-semibold text-blue-700">中环评估</span>
          <span class="ml-2 text-xs bg-blue-500 text-white px-2 py-0.5 rounded">并行</span>
        </div>
        <div id="inner-flow" class="grid grid-cols-2 gap-2">
          <!-- 动态加载 -->
        </div>
        <div class="mt-3 text-xs text-blue-600">
          <i class="fas fa-calculator mr-1"></i>
          加权评分：各维度按权重计算
        </div>
      </div>

      <div class="w-12 h-0.5 bg-gray-300"></div>

      <!-- 综合评分 -->
      <div class="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 w-48">
        <div class="flex items-center mb-3">
          <i class="fas fa-ranking-star text-purple-500 mr-2"></i>
          <span class="font-semibold text-purple-700">综合评分</span>
        </div>
        <div class="text-sm text-gray-600">
          <p>汇总所有评分</p>
          <p>生成投资建议</p>
        </div>
      </div>

      <div class="w-12 h-0.5 bg-gray-300"></div>

      <!-- 人工复核 -->
      <div class="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 w-40">
        <div class="flex items-center mb-2">
          <i class="fas fa-user-check text-yellow-600 mr-2"></i>
          <span class="font-semibold text-yellow-700">人工复核</span>
        </div>
        <div class="text-xs text-gray-600">
          投委会审批
        </div>
      </div>

      <div class="w-12 h-0.5 bg-gray-300"></div>

      <!-- 结束 -->
      <div class="flex flex-col items-center">
        <div class="w-16 h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white shadow-lg">
          <i class="fas fa-flag-checkered text-xl"></i>
        </div>
        <span class="mt-2 text-sm font-medium">完成</span>
      </div>
    </div>
  </div>

  <!-- 权重配置 -->
  <div class="mt-8 pt-8 border-t">
    <h3 class="font-semibold mb-4">中环权重配置</h3>
    <div id="weight-config" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <!-- 动态加载 -->
    </div>
    <p class="text-xs text-gray-500 mt-4">* 权重总和应为100%，可在智能体配置中调整</p>
  </div>
</div>

<script>
  async function loadWorkflow() {
    try {
      const { data: agents } = await apiCall('/api/agents');
      
      // 外环智能体
      const outerAgents = agents.filter(a => a.ring_type === 'outer').sort((a, b) => a.execution_order - b.execution_order);
      document.getElementById('outer-flow').innerHTML = outerAgents.map((a, i) => \`
        <div class="flex items-center">
          <span class="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2">\${i + 1}</span>
          <span class="text-sm">\${a.name}</span>
        </div>
      \`).join('');

      // 中环智能体
      const innerAgents = agents.filter(a => a.ring_type === 'inner' && a.id !== 'comprehensive-scoring-agent');
      document.getElementById('inner-flow').innerHTML = innerAgents.map(a => \`
        <div class="flex items-center text-sm">
          <i class="\${a.icon} mr-1" style="color: \${a.icon_color}"></i>
          <span class="truncate">\${a.name.replace('智能体', '')}</span>
        </div>
      \`).join('');

      // 权重配置
      document.getElementById('weight-config').innerHTML = innerAgents.map(a => \`
        <div class="bg-gray-50 rounded-lg p-3 text-center">
          <i class="\${a.icon} text-xl mb-2" style="color: \${a.icon_color}"></i>
          <p class="text-sm font-medium truncate">\${a.dimension}</p>
          <p class="text-2xl font-bold text-primary-600">\${a.weight}%</p>
        </div>
      \`).join('');
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(loadWorkflow, 500));
</script>
`

// 提交申请页面 - submit.html
export const submitPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">提交投资申请</h1>
    <p class="text-gray-500">填写标的信息，开始智能评估</p>
  </div>
</div>

<div class="bg-white rounded-xl card-shadow overflow-hidden">
  <!-- 步骤指示器 -->
  <div class="bg-gray-50 px-6 py-4 border-b">
    <div class="flex items-center justify-center space-x-4">
      <div class="flex items-center" id="submit-step-1">
        <div class="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">1</div>
        <span class="ml-2 font-medium text-primary-600">选择行业</span>
      </div>
      <div class="w-12 h-0.5 bg-gray-300"></div>
      <div class="flex items-center opacity-50" id="submit-step-2">
        <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">2</div>
        <span class="ml-2 font-medium text-gray-600">基本信息</span>
      </div>
      <div class="w-12 h-0.5 bg-gray-300"></div>
      <div class="flex items-center opacity-50" id="submit-step-3">
        <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">3</div>
        <span class="ml-2 font-medium text-gray-600">项目材料</span>
      </div>
      <div class="w-12 h-0.5 bg-gray-300"></div>
      <div class="flex items-center opacity-50" id="submit-step-4">
        <div class="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm">4</div>
        <span class="ml-2 font-medium text-gray-600">确认提交</span>
      </div>
    </div>
  </div>

  <!-- 表单内容 -->
  <div class="p-6">
    <!-- Step 1: 选择行业 -->
    <div id="form-step-1" class="step-content">
      <h3 class="text-lg font-semibold mb-4">选择所属行业</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <label class="cursor-pointer">
          <input type="radio" name="industry" value="ecommerce" class="hidden peer">
          <div class="p-6 border-2 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition">
            <i class="fas fa-shopping-cart text-3xl text-orange-500 mb-2"></i>
            <p class="font-medium">电商</p>
          </div>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="industry" value="overseas" class="hidden peer">
          <div class="p-6 border-2 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition">
            <i class="fas fa-globe text-3xl text-blue-500 mb-2"></i>
            <p class="font-medium">海外</p>
          </div>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="industry" value="light-asset" class="hidden peer" checked>
          <div class="p-6 border-2 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition">
            <i class="fas fa-music text-3xl text-purple-500 mb-2"></i>
            <p class="font-medium">轻资产</p>
          </div>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="industry" value="retail" class="hidden peer">
          <div class="p-6 border-2 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-gray-300 transition">
            <i class="fas fa-store text-3xl text-green-500 mb-2"></i>
            <p class="font-medium">零售</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 2: 基本信息 -->
    <div id="form-step-2" class="step-content hidden">
      <h3 class="text-lg font-semibold mb-4">企业基本信息</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">企业名称 *</label>
          <input type="text" id="company_name" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="请输入企业全称">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">统一社会信用代码</label>
          <input type="text" id="credit_code" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="18位信用代码">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">联系人 *</label>
          <input type="text" id="contact_name" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="联系人姓名">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">联系电话 *</label>
          <input type="tel" id="contact_phone" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="手机号码">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">融资金额（万元）*</label>
          <input type="number" id="funding_amount" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="例如：3000">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">官网/店铺链接</label>
          <input type="url" id="website" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="https://...">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">主营业务描述 *</label>
          <textarea id="main_business" rows="4" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500" placeholder="请详细描述企业主营业务、商业模式、目标市场等（不少于100字）"></textarea>
        </div>
      </div>
    </div>

    <!-- Step 3: 项目材料 -->
    <div id="form-step-3" class="step-content hidden">
      <h3 class="text-lg font-semibold mb-4">项目材料</h3>
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">项目说明文档 *</label>
          <textarea id="project_documents" rows="10" class="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-primary-500" placeholder="请输入或粘贴项目说明文档内容..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">财务数据 (JSON格式)</label>
          <textarea id="financial_data" rows="8" class="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-primary-500" placeholder='{"revenue_forecast": {...}, "cost_structure": {...}}'></textarea>
        </div>
      </div>
    </div>

    <!-- Step 4: 确认提交 -->
    <div id="form-step-4" class="step-content hidden">
      <h3 class="text-lg font-semibold mb-4">确认信息</h3>
      <div id="confirm-summary" class="bg-gray-50 rounded-lg p-6 space-y-4">
        <!-- 动态生成 -->
      </div>
      <div class="mt-6 p-4 bg-yellow-50 rounded-lg">
        <p class="text-sm text-yellow-700">
          <i class="fas fa-info-circle mr-2"></i>
          提交后，系统将自动启动多智能体评估流程，预计耗时2-5分钟。
        </p>
      </div>
    </div>
  </div>

  <!-- 底部按钮 -->
  <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
    <button id="btn-prev" onclick="prevStep()" class="px-4 py-2 text-gray-600 hover:text-gray-800 hidden">
      <i class="fas fa-arrow-left mr-2"></i>上一步
    </button>
    <div></div>
    <button id="btn-next" onclick="nextStep()" class="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
      下一步<i class="fas fa-arrow-right ml-2"></i>
    </button>
  </div>
</div>

<script>
  let currentStep = 1;
  const totalSteps = 4;

  function updateStepUI() {
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(\`submit-step-\${i}\`);
      const formEl = document.getElementById(\`form-step-\${i}\`);
      
      if (i < currentStep) {
        stepEl.classList.remove('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').innerHTML = '<i class="fas fa-check"></i>';
      } else if (i === currentStep) {
        stepEl.classList.remove('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').textContent = i;
        stepEl.querySelector('span').className = 'ml-2 font-medium text-primary-600';
      } else {
        stepEl.classList.add('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').textContent = i;
        stepEl.querySelector('span').className = 'ml-2 font-medium text-gray-600';
      }
      
      formEl.classList.toggle('hidden', i !== currentStep);
    }
    
    document.getElementById('btn-prev').classList.toggle('hidden', currentStep === 1);
    document.getElementById('btn-next').innerHTML = currentStep === totalSteps 
      ? '<i class="fas fa-check mr-2"></i>提交申请' 
      : '下一步<i class="fas fa-arrow-right ml-2"></i>';
  }

  function nextStep() {
    if (currentStep === totalSteps) {
      submitDeal();
      return;
    }
    
    if (currentStep === 2) {
      if (!document.getElementById('company_name').value || !document.getElementById('contact_name').value) {
        showToast('请填写必填信息', 'error');
        return;
      }
    }
    
    if (currentStep === 3) {
      generateConfirmSummary();
    }
    
    currentStep++;
    updateStepUI();
  }

  function prevStep() {
    if (currentStep > 1) {
      currentStep--;
      updateStepUI();
    }
  }

  function generateConfirmSummary() {
    const industry = document.querySelector('input[name="industry"]:checked')?.value;
    const industryMap = { ecommerce: '电商', overseas: '海外', 'light-asset': '轻资产', retail: '零售' };
    
    document.getElementById('confirm-summary').innerHTML = \`
      <div class="grid grid-cols-2 gap-4">
        <div><span class="text-gray-500">行业：</span>\${industryMap[industry] || industry}</div>
        <div><span class="text-gray-500">企业：</span>\${document.getElementById('company_name').value}</div>
        <div><span class="text-gray-500">联系人：</span>\${document.getElementById('contact_name').value}</div>
        <div><span class="text-gray-500">电话：</span>\${document.getElementById('contact_phone').value}</div>
        <div><span class="text-gray-500">融资金额：</span>\${document.getElementById('funding_amount').value}万元</div>
        <div><span class="text-gray-500">信用代码：</span>\${document.getElementById('credit_code').value || '-'}</div>
      </div>
      <div class="mt-4 pt-4 border-t">
        <p class="text-gray-500 mb-2">主营业务：</p>
        <p class="text-sm">\${document.getElementById('main_business').value.substring(0, 200)}...</p>
      </div>
    \`;
  }

  async function submitDeal() {
    const deal = {
      company_name: document.getElementById('company_name').value,
      credit_code: document.getElementById('credit_code').value,
      industry: document.querySelector('input[name="industry"]:checked')?.value,
      main_business: document.getElementById('main_business').value,
      funding_amount: parseFloat(document.getElementById('funding_amount').value),
      contact_name: document.getElementById('contact_name').value,
      contact_phone: document.getElementById('contact_phone').value,
      website: document.getElementById('website').value,
      project_documents: document.getElementById('project_documents').value,
      financial_data: document.getElementById('financial_data').value || '{}'
    };

    try {
      const result = await apiCall('/api/deals', {
        method: 'POST',
        body: JSON.stringify(deal)
      });
      showToast('提交成功！标的ID: ' + result.data.id, 'success');
      setTimeout(() => window.location.href = '/deals', 2000);
    } catch (e) {}
  }
</script>
`

// 标的管理页面 - deals.html
export const dealsPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">标的管理</h1>
    <p class="text-gray-500">查看和管理所有投资标的</p>
  </div>
  <a href="/submit" class="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
    <i class="fas fa-plus mr-2"></i>新建标的
  </a>
</div>

<!-- 筛选条件 -->
<div class="bg-white rounded-xl card-shadow p-4 mb-6">
  <div class="flex flex-wrap gap-4">
    <select id="filter-status" onchange="loadDeals()" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500">
      <option value="">全部状态</option>
      <option value="pending">待处理</option>
      <option value="outer">外环筛选</option>
      <option value="evaluation">评估中</option>
      <option value="review">待审核</option>
      <option value="completed">已完成</option>
      <option value="rejected">已拒绝</option>
    </select>
    <select id="filter-industry" onchange="loadDeals()" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500">
      <option value="">全部行业</option>
      <option value="ecommerce">电商</option>
      <option value="overseas">海外</option>
      <option value="light-asset">轻资产</option>
      <option value="retail">零售</option>
    </select>
    <button onclick="loadDeals()" class="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-sync-alt"></i>
    </button>
  </div>
</div>

<!-- 标的列表 -->
<div class="bg-white rounded-xl card-shadow overflow-hidden">
  <table class="w-full">
    <thead>
      <tr class="bg-gray-50">
        <th class="text-left py-4 px-6 font-medium text-gray-600">ID</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">企业名称</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">行业</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">融资金额</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">状态</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">评分</th>
        <th class="text-left py-4 px-6 font-medium text-gray-600">操作</th>
      </tr>
    </thead>
    <tbody id="deals-list">
      <!-- 动态加载 -->
    </tbody>
  </table>
</div>

<!-- 标的详情模态框 -->
<div id="deal-modal" class="fixed inset-0 bg-black/50 z-50 hidden">
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
      <div class="flex items-center justify-between px-6 py-4 border-b">
        <h2 id="deal-modal-title" class="text-lg font-semibold"></h2>
        <button onclick="closeDealModal()" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-6" id="deal-modal-content">
        <!-- 动态内容 -->
      </div>
      <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <button onclick="closeDealModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">关闭</button>
        <button onclick="startEvaluation()" id="btn-evaluate" class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          <i class="fas fa-play mr-2"></i>开始评估
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  let currentDealId = null;

  const statusMap = {
    pending: { label: '待处理', class: 'bg-gray-100 text-gray-600' },
    outer: { label: '外环筛选', class: 'bg-blue-100 text-blue-600' },
    evaluation: { label: '评估中', class: 'bg-yellow-100 text-yellow-600' },
    review: { label: '待审核', class: 'bg-purple-100 text-purple-600' },
    completed: { label: '已完成', class: 'bg-green-100 text-green-600' },
    rejected: { label: '已拒绝', class: 'bg-red-100 text-red-600' }
  };

  const industryMap = {
    ecommerce: '电商',
    overseas: '海外',
    'light-asset': '轻资产',
    retail: '零售'
  };

  async function loadDeals() {
    const status = document.getElementById('filter-status').value;
    const industry = document.getElementById('filter-industry').value;
    
    let url = '/api/deals?';
    if (status) url += \`status=\${status}&\`;
    if (industry) url += \`industry=\${industry}\`;

    try {
      const { data } = await apiCall(url);
      const tbody = document.getElementById('deals-list');
      
      if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="py-12 text-center text-gray-500">暂无数据</td></tr>';
        return;
      }

      tbody.innerHTML = data.map(deal => {
        const status = statusMap[deal.status] || { label: deal.status, class: 'bg-gray-100' };
        return \`
          <tr class="border-b hover:bg-gray-50 cursor-pointer" onclick="openDealModal('\${deal.id}')">
            <td class="py-4 px-6 font-mono text-sm">\${deal.id}</td>
            <td class="py-4 px-6">\${deal.company_name}</td>
            <td class="py-4 px-6">\${industryMap[deal.industry] || deal.industry}</td>
            <td class="py-4 px-6">\${deal.funding_amount ? deal.funding_amount + '万' : '-'}</td>
            <td class="py-4 px-6"><span class="px-2 py-1 rounded text-xs \${status.class}">\${status.label}</span></td>
            <td class="py-4 px-6 font-mono">\${deal.total_score ? deal.total_score.toFixed(1) : '-'}</td>
            <td class="py-4 px-6">
              <button class="text-primary-500 hover:text-primary-700" onclick="event.stopPropagation(); openDealModal('\${deal.id}')">
                <i class="fas fa-eye"></i>
              </button>
            </td>
          </tr>
        \`;
      }).join('');
    } catch (e) {}
  }

  async function openDealModal(id) {
    currentDealId = id;
    try {
      const { data: deal } = await apiCall(\`/api/deals/\${id}\`);
      const { data: logs } = await apiCall(\`/api/evaluation-logs/\${id}\`);
      
      document.getElementById('deal-modal-title').textContent = deal.company_name + ' (' + deal.id + ')';
      
      const status = statusMap[deal.status] || { label: deal.status, class: 'bg-gray-100' };
      
      document.getElementById('deal-modal-content').innerHTML = \`
        <div class="grid grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium mb-3">基本信息</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-500">行业</span><span>\${industryMap[deal.industry] || deal.industry}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">融资金额</span><span>\${deal.funding_amount}万元</span></div>
              <div class="flex justify-between"><span class="text-gray-500">联系人</span><span>\${deal.contact_name}</span></div>
              <div class="flex justify-between"><span class="text-gray-500">状态</span><span class="px-2 py-0.5 rounded text-xs \${status.class}">\${status.label}</span></div>
            </div>
          </div>
          <div>
            <h4 class="font-medium mb-3">评估结果</h4>
            \${deal.total_score ? \`
              <div class="text-center">
                <div class="text-4xl font-bold text-primary-600">\${deal.total_score.toFixed(1)}</div>
                <div class="text-gray-500 mt-1">\${deal.total_score >= 85 ? 'A级' : deal.total_score >= 75 ? 'B+级' : deal.total_score >= 65 ? 'B级' : 'C级'}</div>
              </div>
              <div class="mt-4 space-y-2 text-sm">
                <div class="flex justify-between"><span>财务健康</span><span>\${deal.score_financial || '-'}</span></div>
                <div class="flex justify-between"><span>运营能力</span><span>\${deal.score_operational || '-'}</span></div>
                <div class="flex justify-between"><span>法律合规</span><span>\${deal.score_legal || '-'}</span></div>
                <div class="flex justify-between"><span>风险控制</span><span>\${deal.score_risk || '-'}</span></div>
              </div>
            \` : '<p class="text-gray-500 text-center py-8">尚未评估</p>'}
          </div>
        </div>
        
        \${logs.length > 0 ? \`
          <div class="mt-6 pt-6 border-t">
            <h4 class="font-medium mb-3">评估日志</h4>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              \${logs.map(log => \`
                <div class="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                  <span>\${log.agent_name}</span>
                  <span class="font-mono">\${log.score}</span>
                  <span class="\${log.pass_status ? 'text-green-600' : 'text-red-600'}">\${log.pass_status ? '通过' : '未通过'}</span>
                  <span class="text-gray-400">\${log.execution_time}ms</span>
                </div>
              \`).join('')}
            </div>
          </div>
        \` : ''}
      \`;
      
      const btnEvaluate = document.getElementById('btn-evaluate');
      btnEvaluate.classList.toggle('hidden', deal.status !== 'pending' && deal.status !== 'evaluation');
      
      document.getElementById('deal-modal').classList.remove('hidden');
    } catch (e) {}
  }

  function closeDealModal() {
    document.getElementById('deal-modal').classList.add('hidden');
    currentDealId = null;
  }

  async function startEvaluation() {
    if (!currentDealId) return;
    
    try {
      document.getElementById('btn-evaluate').disabled = true;
      document.getElementById('btn-evaluate').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
      
      const result = await apiCall('/api/ai/evaluate-deal', {
        method: 'POST',
        body: JSON.stringify({ dealId: currentDealId })
      });
      
      showToast('评估完成！', 'success');
      closeDealModal();
      loadDeals();
    } catch (e) {
    } finally {
      document.getElementById('btn-evaluate').disabled = false;
      document.getElementById('btn-evaluate').innerHTML = '<i class="fas fa-play mr-2"></i>开始评估';
    }
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(loadDeals, 500));
</script>
`
