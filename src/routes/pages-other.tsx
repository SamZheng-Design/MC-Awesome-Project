// 工作流页面 - workflow.html
export const workflowPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-slate-800">工作流编排</h1>
    <p class="text-slate-500">可视化配置多智能体评估流程 · 选择赛道查看专属智能体群</p>
  </div>
</div>

<div class="gs-card p-6">
  <!-- 赛道选择器 -->
  <div class="mb-6 pb-6 border-b border-slate-100">
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold text-slate-700">
        <i class="fas fa-layer-group mr-2 text-primary-500"></i>选择赛道查看对应智能体群
      </h3>
      <span id="selected-track-badge" class="gs-badge gs-badge-neutral">
        <i class="fas fa-globe mr-1"></i>全部赛道
      </span>
    </div>
    <div id="workflow-track-selector" class="flex flex-wrap gap-2">
      <!-- 动态加载 -->
    </div>
  </div>

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

      <!-- 外环漏斗体系 -->
      <div class="bg-red-50 border-2 border-red-200 rounded-xl p-4 min-w-64">
        <div class="flex items-center mb-3">
          <i class="fas fa-funnel-dollar text-red-500 mr-2"></i>
          <span class="font-semibold text-red-700">外环漏斗体系</span>
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

      <!-- 中环筛子体系 -->
      <div class="bg-slate-100 border-2 border-primary-500 rounded-xl p-4 min-w-96">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center">
            <i class="fas fa-filter text-violet-500 mr-2"></i>
            <span class="font-semibold text-slate-800">中环筛子体系</span>
            <span class="ml-2 text-xs bg-primary-500 text-white px-2 py-0.5 rounded">并行</span>
          </div>
          <span id="inner-agent-count" class="text-xs text-violet-500"></span>
        </div>
        
        <!-- 通用智能体 -->
        <div id="inner-flow-general" class="mb-3">
          <div class="text-xs text-gray-500 mb-2 flex items-center">
            <i class="fas fa-globe mr-1"></i>通用智能体
          </div>
          <div class="grid grid-cols-2 gap-2" id="inner-flow-general-list">
            <!-- 动态加载 -->
          </div>
        </div>
        
        <!-- 专属智能体 -->
        <div id="inner-flow-specific" class="hidden">
          <div class="text-xs mb-2 flex items-center" id="inner-flow-specific-title">
            <i class="fas fa-tag mr-1"></i>专属智能体
          </div>
          <div class="grid grid-cols-2 gap-2" id="inner-flow-specific-list">
            <!-- 动态加载 -->
          </div>
        </div>
        
        <div class="mt-3 text-xs text-slate-800">
          <i class="fas fa-calculator mr-1"></i>
          加权评分：各维度按权重计算
        </div>
      </div>

      <div class="w-12 h-0.5 bg-gray-300"></div>

      <!-- 综合评分 -->
      <div class="bg-slate-50 border-2 border-violet-500 rounded-xl p-4 w-48">
        <div class="flex items-center mb-3">
          <i class="fas fa-ranking-star text-violet-500 mr-2"></i>
          <span class="font-semibold text-slate-800">综合评分</span>
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
    <div class="flex items-center justify-between mb-4">
      <h3 class="font-semibold">中环筛子体系权重配置</h3>
      <span id="weight-track-label" class="text-sm text-gray-500">当前赛道智能体权重分配</span>
    </div>
    <div id="weight-config" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <!-- 动态加载 -->
    </div>
    <p class="text-xs text-gray-500 mt-4">* 权重总和应为100%，可在智能体配置中调整</p>
  </div>
</div>

<script>
  let workflowAgents = [];
  let workflowTracks = [];
  let selectedWorkflowTrack = 'all';

  // 默认赛道数据
  const defaultTracks = [
    { id: 'all', name: '全部', icon: 'fas fa-globe', icon_color: '#6B7280' },
    { id: 'catering', name: '餐饮', icon: 'fas fa-utensils', icon_color: '#F59E0B' },
    { id: 'retail', name: '零售', icon: 'fas fa-store', icon_color: '#10B981' },
    { id: 'ecommerce', name: '电商', icon: 'fas fa-shopping-cart', icon_color: '#3B82F6' },
    { id: 'education', name: '教育培训', icon: 'fas fa-graduation-cap', icon_color: '#EC4899' },
    { id: 'service', name: '生活服务', icon: 'fas fa-concierge-bell', icon_color: '#14B8A6' },
    { id: 'light-asset', name: '文娱轻资产', icon: 'fas fa-film', icon_color: '#8B5CF6' }
  ];

  async function loadWorkflow() {
    try {
      const { data: agents } = await apiCall('/api/agents');
      workflowAgents = agents;
      
      // 尝试加载赛道数据
      try {
        const { data: tracks } = await apiCall('/api/tracks');
        workflowTracks = tracks || defaultTracks;
      } catch (e) {
        workflowTracks = defaultTracks;
      }
      
      renderWorkflowTrackSelector();
      renderWorkflow();
    } catch (e) {}
  }

  // 渲染赛道选择器
  function renderWorkflowTrackSelector() {
    const container = document.getElementById('workflow-track-selector');
    
    container.innerHTML = workflowTracks.map(t => {
      const isActive = selectedWorkflowTrack === t.id;
      const count = t.id === 'all' 
        ? workflowAgents.filter(a => a.ring_type === 'inner').length
        : workflowAgents.filter(a => a.ring_type === 'inner' && a.industry === t.id).length;
      
      return \`
        <button onclick="selectWorkflowTrack('\${t.id}')" 
          class="px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 \${isActive ? 'text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border'}"
          style="\${isActive ? 'background:' + t.icon_color : ''}">
          <i class="\${t.icon}"></i>
          <span>\${t.name}</span>
          \${count > 0 ? \`<span class="bg-white/20 px-1.5 rounded text-xs">\${count}</span>\` : ''}
        </button>
      \`;
    }).join('');
  }

  // 选择赛道
  function selectWorkflowTrack(trackId) {
    selectedWorkflowTrack = trackId;
    renderWorkflowTrackSelector();
    renderWorkflow();
    
    // 更新赛道标签
    const track = workflowTracks.find(t => t.id === trackId);
    const badge = document.getElementById('selected-track-badge');
    if (track) {
      badge.innerHTML = \`<i class="\${track.icon} mr-1"></i>\${track.name}赛道\`;
      badge.style.background = track.icon_color + '20';
      badge.style.color = track.icon_color;
    }
  }

  // 渲染工作流
  function renderWorkflow() {
    // 外环漏斗体系智能体（不受赛道影响）
    const outerAgents = workflowAgents.filter(a => a.ring_type === 'outer').sort((a, b) => a.execution_order - b.execution_order);
    document.getElementById('outer-flow').innerHTML = outerAgents.map((a, i) => \`
      <div class="flex items-center">
        <span class="w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center mr-2">\${i + 1}</span>
        <span class="text-sm">\${a.name}</span>
      </div>
    \`).join('');

    // 中环筛子体系智能体（按赛道筛选）
    const generalAgents = workflowAgents.filter(a => a.ring_type === 'inner' && a.industry === 'all' && a.id !== 'comprehensive-scoring-agent');
    let specificAgents = [];
    
    if (selectedWorkflowTrack !== 'all') {
      specificAgents = workflowAgents.filter(a => a.ring_type === 'inner' && a.industry === selectedWorkflowTrack);
    }
    
    // 通用智能体列表
    document.getElementById('inner-flow-general-list').innerHTML = generalAgents.map(a => \`
      <div class="flex items-center text-sm bg-white/50 rounded px-2 py-1">
        <i class="\${a.icon} mr-1" style="color: \${a.icon_color}"></i>
        <span class="truncate">\${a.name.replace('智能体', '')}</span>
      </div>
    \`).join('');
    
    // 专属智能体列表
    const specificSection = document.getElementById('inner-flow-specific');
    const specificTitle = document.getElementById('inner-flow-specific-title');
    const specificList = document.getElementById('inner-flow-specific-list');
    
    if (selectedWorkflowTrack !== 'all' && specificAgents.length > 0) {
      const track = workflowTracks.find(t => t.id === selectedWorkflowTrack);
      specificSection.classList.remove('hidden');
      specificTitle.innerHTML = \`<i class="\${track?.icon || 'fas fa-tag'} mr-1" style="color: \${track?.icon_color}"></i>\${track?.name || ''}专属智能体\`;
      specificTitle.style.color = track?.icon_color;
      specificList.innerHTML = specificAgents.map(a => \`
        <div class="flex items-center text-sm rounded px-2 py-1" style="background: \${a.icon_color}15">
          <i class="\${a.icon} mr-1" style="color: \${a.icon_color}"></i>
          <span class="truncate">\${a.name.replace('智能体', '')}</span>
        </div>
      \`).join('');
    } else {
      specificSection.classList.add('hidden');
    }
    
    // 更新智能体数量
    const totalCount = generalAgents.length + specificAgents.length;
    document.getElementById('inner-agent-count').textContent = \`\${totalCount}个智能体\`;

    // 权重配置
    const allInnerAgents = selectedWorkflowTrack === 'all' 
      ? workflowAgents.filter(a => a.ring_type === 'inner' && a.id !== 'comprehensive-scoring-agent')
      : [...generalAgents, ...specificAgents];
    
    document.getElementById('weight-config').innerHTML = allInnerAgents.map(a => {
      const track = workflowTracks.find(t => t.id === a.industry);
      return \`
        <div class="bg-gray-50 rounded-lg p-3 text-center border-2 border-transparent hover:border-primary-500 transition cursor-pointer">
          <i class="\${a.icon} text-xl mb-2" style="color: \${a.icon_color}"></i>
          <p class="text-sm font-medium truncate">\${a.dimension}</p>
          <p class="text-2xl font-bold text-primary-500">\${a.weight}%</p>
          <p class="text-xs mt-1 px-2 py-0.5 rounded-full inline-block" style="background: \${track?.icon_color || '#6B7280'}20; color: \${track?.icon_color || '#6B7280'}">\${a.industry === 'all' ? '通用' : (track?.name || a.industry)}</p>
        </div>
      \`;
    }).join('');
    
    // 更新权重标签
    const trackLabel = selectedWorkflowTrack === 'all' ? '全部赛道' : (workflowTracks.find(t => t.id === selectedWorkflowTrack)?.name + '赛道');
    document.getElementById('weight-track-label').textContent = trackLabel + '智能体权重分配';
  }

  document.addEventListener('DOMContentLoaded', () => setTimeout(loadWorkflow, 500));
</script>
`

// 提交申请页面 - submit.html
export const submitPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-slate-800">提交投资申请</h1>
    <p class="text-gray-500">填写标的信息，开始智能评估</p>
  </div>
</div>

<div class="gs-card overflow-hidden">
  <!-- 步骤指示器 -->
  <div class="bg-slate-50 px-6 py-5 border-b border-slate-100">
    <div class="flex items-center justify-center space-x-3">
      <div class="flex items-center" id="submit-step-1">
        <div class="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold text-sm shadow-sm">1</div>
        <span class="ml-2 font-medium text-primary-600">选择行业</span>
      </div>
      <div class="w-16 h-0.5 bg-slate-200 rounded"></div>
      <div class="flex items-center opacity-50" id="submit-step-2">
        <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-semibold text-sm">2</div>
        <span class="ml-2 font-medium text-slate-500">基本信息</span>
      </div>
      <div class="w-16 h-0.5 bg-slate-200 rounded"></div>
      <div class="flex items-center opacity-50" id="submit-step-3">
        <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-semibold text-sm">3</div>
        <span class="ml-2 font-medium text-slate-500">项目材料</span>
      </div>
      <div class="w-16 h-0.5 bg-slate-200 rounded"></div>
      <div class="flex items-center opacity-50" id="submit-step-4">
        <div class="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-semibold text-sm">4</div>
        <span class="ml-2 font-medium text-slate-500">确认提交</span>
      </div>
    </div>
  </div>

  <!-- 表单内容 -->
  <div class="p-8">
    <!-- Step 1: 选择行业 -->
    <div id="form-step-1" class="step-content">
      <h3 class="text-lg font-semibold mb-6 text-slate-800">选择所属行业（赛道）</h3>
      <div id="industry-grid" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <!-- 动态加载赛道选项 -->
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="light-asset" class="hidden peer" checked>
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-100 transition">
              <i class="fas fa-feather text-xl text-purple-500"></i>
            </div>
            <p class="font-medium text-slate-700">轻资产</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="retail" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-emerald-100 transition">
              <i class="fas fa-store text-xl text-emerald-500"></i>
            </div>
            <p class="font-medium text-slate-700">零售</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="catering" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-amber-100 transition">
              <i class="fas fa-utensils text-xl text-amber-500"></i>
            </div>
            <p class="font-medium text-slate-700">餐饮</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="ecommerce" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-blue-100 transition">
              <i class="fas fa-shopping-cart text-xl text-blue-500"></i>
            </div>
            <p class="font-medium text-slate-700">电商</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="education" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-pink-100 transition">
              <i class="fas fa-graduation-cap text-xl text-pink-500"></i>
            </div>
            <p class="font-medium text-slate-700">教育培训</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="healthcare" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-red-100 transition">
              <i class="fas fa-heartbeat text-xl text-red-500"></i>
            </div>
            <p class="font-medium text-slate-700">医疗健康</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="entertainment" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-100 transition">
              <i class="fas fa-film text-xl text-indigo-500"></i>
            </div>
            <p class="font-medium text-slate-700">文娱</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="service" class="hidden peer">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-primary-500 peer-checked:bg-primary-50 hover:border-slate-300 hover:shadow-sm transition-all">
            <div class="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-100 transition">
              <i class="fas fa-concierge-bell text-xl text-teal-500"></i>
            </div>
            <p class="font-medium text-slate-700">生活服务</p>
          </div>
        </label>
        <label class="cursor-pointer group">
          <input type="radio" name="industry" value="douyin-ecommerce" class="hidden peer" onchange="handleIndustryChange(this.value)">
          <div class="p-6 border-2 border-slate-200 rounded-xl text-center peer-checked:border-[#00B386] peer-checked:bg-[#C9DFD0] hover:border-slate-300 hover:shadow-sm transition-all relative">
            <div class="absolute -top-2 -right-2 bg-gradient-to-r from-[#00B386] to-[#49754D] text-white text-xs px-2.5 py-1 rounded-full font-medium shadow-sm">热门</div>
            <div class="w-12 h-12 rounded-xl bg-[#C9DFD0] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#A8B8A8] transition">
              <i class="fab fa-tiktok text-xl text-[#00B386]"></i>
            </div>
            <p class="font-medium text-slate-700">抖音投流</p>
          </div>
        </label>
      </div>
    </div>

    <!-- Step 2: 基本信息（通用行业） -->
    <div id="form-step-2" class="step-content hidden">
      <h3 class="text-lg font-semibold mb-6 text-slate-800">企业基本信息</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">企业名称 <span class="text-red-500">*</span></label>
          <input type="text" id="company_name" class="gs-input w-full" placeholder="请输入企业全称">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">统一社会信用代码</label>
          <input type="text" id="credit_code" class="gs-input w-full" placeholder="18位信用代码">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">联系人 <span class="text-red-500">*</span></label>
          <input type="text" id="contact_name" class="gs-input w-full" placeholder="联系人姓名">
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">联系电话 <span class="text-red-500">*</span></label>
          <input type="tel" id="contact_phone" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder="手机号码">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">融资金额（万元）*</label>
          <input type="number" id="funding_amount" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder="例如：3000">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">官网/店铺链接</label>
          <input type="url" id="website" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder="https://...">
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">主营业务描述 *</label>
          <textarea id="main_business" rows="4" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder="请详细描述企业主营业务、商业模式、目标市场等（不少于100字）"></textarea>
        </div>
      </div>
    </div>

    <!-- Step 2: 抖音投流专属表单 -->
    <div id="form-step-2-douyin" class="step-content hidden">
      <div class="flex items-center mb-6">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00B386] to-[#49754D] flex items-center justify-center mr-3">
          <i class="fab fa-tiktok text-2xl text-white"></i>
        </div>
        <div>
          <h3 class="text-lg font-semibold text-[#1E2B1E]">抖音投流信息采集</h3>
          <p class="text-sm text-[#4A5B4A]">请填写基本信息（必填），其他信息为推荐填写</p>
        </div>
      </div>
      
      <!-- 提示说明 -->
      <div class="bg-[#C9DFD0] border border-[#A8B8A8] rounded-lg p-4 mb-6">
        <p class="text-sm text-[#1E2B1E]">
          <i class="fas fa-info-circle mr-2 text-[#00B386]"></i>
          <strong>填写说明：</strong>带 <span class="text-[#A85454] font-bold">*</span> 为必填项，带 <span class="text-[#9A7B4E] font-bold">★</span> 为推荐填写项（有助于更准确的评估）
        </p>
      </div>
      
      <!-- 基本信息区域 -->
      <div class="bg-gradient-to-r from-[#E8E4D4] to-[#F0EDE0] rounded-xl p-6 mb-6 border border-[#C9DFD0]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-building text-[#00B386] mr-2"></i>基本信息 <span class="ml-2 text-xs text-[#A85454]">（必填）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">企业名称 <span class="text-red-500">*</span></label>
            <input type="text" id="dy_company_name" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#F0EDE0]" placeholder="请输入企业全称">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">社会统一信用代码 <span class="text-red-500">*</span></label>
            <input type="text" id="dy_credit_code" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#F0EDE0]" placeholder="18位统一社会信用代码" maxlength="18">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">品牌名称 <span class="text-red-500">*</span></label>
            <input type="text" id="dy_brand_name" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#F0EDE0]" placeholder="品牌名称">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">抖店名称 <span class="text-red-500">*</span></label>
            <input type="text" id="dy_shop_name" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#F0EDE0]" placeholder="抖音店铺名称">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">合作伙伴 <span class="text-red-500">*</span></label>
            <select id="dy_partner" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#E8E4D4]">
              <option value="良辰美" selected>良辰美</option>
            </select>
            <p class="text-xs text-gray-400 mt-1">默认合作伙伴</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">良辰美联络人名称 <span class="text-red-500">*</span></label>
            <input type="text" id="dy_partner_contact" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-[#F0EDE0]" placeholder="良辰美对接人姓名">
          </div>
        </div>
      </div>

      <!-- 品类与合作信息 -->
      <div class="bg-[#F0EDE0] rounded-xl p-6 mb-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-tags text-[#9A7B4E] mr-2"></i>品类与合作信息 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">品类划分 <span class="text-amber-500">★</span></label>
            <select id="dy_category" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择品类</option>
              <option value="food">食品饮料</option>
              <option value="beauty">美妆护肤</option>
              <option value="clothing">服饰鞋包</option>
              <option value="home">家居家装</option>
              <option value="electronics">数码电子</option>
              <option value="baby">母婴用品</option>
              <option value="health">健康保健</option>
              <option value="sports">运动户外</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">已与投流伙伴合作时间（月）<span class="text-amber-500">★</span></label>
            <input type="number" id="dy_coop_duration" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：12">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">总计投流金额（万元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_total_spend" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">目前管理账户总数（个）<span class="text-amber-500">★</span></label>
            <input type="number" id="dy_account_count" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：5">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">账户留存金额（万元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_account_balance" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：50">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">品类押金（万元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_category_deposit" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：10">
          </div>
        </div>
      </div>

      <!-- 未来合作计划 -->
      <div class="bg-[#C9DFD0] rounded-xl p-6 mb-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-rocket text-[#4A7896] mr-2"></i>未来合作计划 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">未来合作时间（月）<span class="text-amber-500">★</span></label>
            <input type="number" id="dy_future_coop_duration" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：12">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">未来投流计划（万元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_future_spend_plan" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：1000">
          </div>
        </div>
      </div>

      <!-- 店铺与品牌信息 -->
      <div class="bg-[#F0EDE0] rounded-xl p-6 mb-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-store text-[#629C85] mr-2"></i>店铺与品牌信息 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">抖店链接 <span class="text-amber-500">★</span></label>
            <input type="url" id="dy_shop_link" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="https://...">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">抖店成立时间（月）<span class="text-amber-500">★</span></label>
            <input type="number" id="dy_shop_age" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：24">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">品牌成立时间（月）<span class="text-amber-500">★</span></label>
            <input type="number" id="dy_brand_age" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：36">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">抖音店铺评分 <span class="text-amber-500">★</span></label>
            <input type="number" step="0.1" min="0" max="5" id="dy_shop_rating" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：4.8">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">抖音店铺收入占比（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.1" min="0" max="100" id="dy_revenue_ratio" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：60">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">店铺收入年度增长（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.1" id="dy_revenue_growth" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：30">
          </div>
        </div>
      </div>

      <!-- 历史合作与合规信息 -->
      <div class="bg-[#DDD9C8] rounded-xl p-6 mb-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-history text-[#9A7B4E] mr-2"></i>历史合作与合规信息 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">是否历史有过垫资合作 <span class="text-amber-500">★</span></label>
            <select id="dy_has_advance_coop" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">历史合作情况 <span class="text-amber-500">★</span></label>
            <textarea id="dy_coop_history" rows="2" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="请描述历史合作情况..."></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">是否有违约记录 <span class="text-amber-500">★</span></label>
            <select id="dy_has_default" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">是否有账户扣款权限 <span class="text-amber-500">★</span></label>
            <select id="dy_has_deduction_auth" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">是否有冻结/取现权限 <span class="text-amber-500">★</span></label>
            <select id="dy_has_freeze_auth" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">排他投流合作 <span class="text-amber-500">★</span></label>
            <select id="dy_exclusive_coop" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white">
              <option value="">请选择</option>
              <option value="yes">是</option>
              <option value="no">否</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 投放效果指标 -->
      <div class="bg-gradient-to-r from-[#C9DFD0] to-[#D9EDDF] rounded-xl p-6 mb-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-chart-line text-[#3D7A5A] mr-2"></i>投放效果指标 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ROI（1元投流转化收入）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_roi" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：3.5">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">GMV 成交金额（万元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_gmv" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：1000">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">CPM 千次曝光成本（元）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_cpm" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：15">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">CTR 点击率（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_ctr" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：2.5">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">完播率（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_completion_rate" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：35">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">自然流量增幅（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_organic_growth" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：50">
          </div>
        </div>
      </div>

      <!-- 商品质量指标 -->
      <div class="bg-[#F0EDE0] rounded-xl p-6 border border-[#A8B8A8]">
        <h4 class="font-semibold text-gray-800 mb-4 flex items-center">
          <i class="fas fa-box text-[#49754D] mr-2"></i>商品质量指标 <span class="ml-2 text-xs text-[#9A7B4E]">（★ 推荐填写）</span>
        </h4>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">退货率（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_return_rate" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：5">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">商品毛利率（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_gross_margin" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：40">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">复购率（%）<span class="text-amber-500">★</span></label>
            <input type="number" step="0.01" id="dy_repurchase_rate" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#00B386] border-[#A8B8A8] bg-white" placeholder="例如：25">
          </div>
        </div>
      </div>
    </div>

    <!-- Step 3: 项目材料 -->
    <div id="form-step-3" class="step-content hidden">
      <h3 class="text-lg font-semibold mb-4">项目材料</h3>
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">项目说明文档 *</label>
          <textarea id="project_documents" rows="10" class="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder="请输入或粘贴项目说明文档内容..."></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">财务数据 (JSON格式)</label>
          <textarea id="financial_data" rows="8" class="w-full border rounded-lg p-3 font-mono text-sm focus:ring-2 focus:ring-primary-500 border-slate-100" placeholder='{"revenue_forecast": {...}, "cost_structure": {...}}'></textarea>
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
    <button id="btn-next" onclick="nextStep()" class="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:opacity-90 transition">
      下一步<i class="fas fa-arrow-right ml-2"></i>
    </button>
  </div>
</div>

<script>
  let currentStep = 1;
  const totalSteps = 4;
  let isDouyinMode = false;

  // 检测是否为抖音投流模式
  function checkDouyinMode() {
    const industry = document.querySelector('input[name="industry"]:checked')?.value;
    isDouyinMode = industry === 'douyin-ecommerce';
    return isDouyinMode;
  }

  // 行业切换处理
  function handleIndustryChange(value) {
    isDouyinMode = value === 'douyin-ecommerce';
  }

  function updateStepUI() {
    checkDouyinMode();
    
    for (let i = 1; i <= totalSteps; i++) {
      const stepEl = document.getElementById(\`submit-step-\${i}\`);
      // 通用表单
      const formEl = document.getElementById(\`form-step-\${i}\`);
      // 抖音专属表单（只有Step 2有专属版）
      const douyinFormEl = document.getElementById(\`form-step-\${i}-douyin\`);
      
      if (i < currentStep) {
        stepEl.classList.remove('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').innerHTML = '<i class="fas fa-check"></i>';
      } else if (i === currentStep) {
        stepEl.classList.remove('opacity-50');
        const activeColor = isDouyinMode ? '#00B386' : 'primary-500';
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').style.backgroundColor = activeColor;
        stepEl.querySelector('div').textContent = i;
        stepEl.querySelector('span').className = 'ml-2 font-medium';
        stepEl.querySelector('span').style.color = activeColor;
      } else {
        stepEl.classList.add('opacity-50');
        stepEl.querySelector('div').className = 'w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold text-sm';
        stepEl.querySelector('div').style.backgroundColor = '';
        stepEl.querySelector('div').textContent = i;
        stepEl.querySelector('span').className = 'ml-2 font-medium text-gray-600';
        stepEl.querySelector('span').style.color = '';
      }
      
      // 隐藏所有表单
      if (formEl) formEl.classList.add('hidden');
      if (douyinFormEl) douyinFormEl.classList.add('hidden');
      
      // 显示当前步骤的表单
      if (i === currentStep) {
        if (i === 2 && isDouyinMode && douyinFormEl) {
          douyinFormEl.classList.remove('hidden');
        } else if (formEl) {
          formEl.classList.remove('hidden');
        }
      }
    }
    
    document.getElementById('btn-prev').classList.toggle('hidden', currentStep === 1);
    
    // 更新按钮样式
    const btnNext = document.getElementById('btn-next');
    if (isDouyinMode) {
      btnNext.className = 'px-6 py-2 bg-gradient-to-r from-[#00B386] to-[#49754D] text-white rounded-lg hover:opacity-90 transition';
    } else {
      btnNext.className = 'px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:opacity-90 transition';
    }
    
    btnNext.innerHTML = currentStep === totalSteps 
      ? '<i class="fas fa-check mr-2"></i>提交申请' 
      : '下一步<i class="fas fa-arrow-right ml-2"></i>';
  }

  function nextStep() {
    checkDouyinMode();
    
    if (currentStep === totalSteps) {
      if (isDouyinMode) {
        submitDouyinDeal();
      } else {
        submitDeal();
      }
      return;
    }
    
    // 验证Step 2
    if (currentStep === 2) {
      if (isDouyinMode) {
        // 抖音投流表单验证 - 只验证基本信息（必填项）
        const requiredFields = [
          { id: 'dy_company_name', name: '企业名称' },
          { id: 'dy_credit_code', name: '社会统一信用代码' },
          { id: 'dy_brand_name', name: '品牌名称' },
          { id: 'dy_shop_name', name: '抖店名称' },
          { id: 'dy_partner', name: '合作伙伴' },
          { id: 'dy_partner_contact', name: '良辰美联络人名称' }
        ];
        
        for (const field of requiredFields) {
          const el = document.getElementById(field.id);
          if (!el || !el.value) {
            showToast(\`请填写\${field.name}\`, 'error');
            el?.focus();
            return;
          }
        }
      } else {
        // 通用表单验证
        if (!document.getElementById('company_name').value || !document.getElementById('contact_name').value) {
          showToast('请填写必填信息', 'error');
          return;
        }
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
    checkDouyinMode();
    const industry = document.querySelector('input[name="industry"]:checked')?.value;
    const industryMap = { 
      ecommerce: '电商', overseas: '海外', 'light-asset': '轻资产', retail: '零售',
      catering: '餐饮', education: '教育培训', healthcare: '医疗健康', entertainment: '文娱', 
      service: '生活服务', 'douyin-ecommerce': '抖音投流'
    };
    
    if (isDouyinMode) {
      // 抖音投流确认摘要
      const categoryMap = {
        food: '食品饮料', beauty: '美妆护肤', clothing: '服饰鞋包', home: '家居家装',
        electronics: '数码电子', baby: '母婴用品', health: '健康保健', sports: '运动户外', other: '其他'
      };
      
      const getValue = (id) => document.getElementById(id)?.value || '-';
      
      document.getElementById('confirm-summary').innerHTML = \`
        <div class="bg-gradient-to-r from-[#E8E4D4] to-[#F0EDE0] rounded-lg p-4 mb-4 border border-[#C9DFD0]">
          <h4 class="font-semibold text-[#1E2B1E] mb-3 flex items-center">
            <i class="fab fa-tiktok mr-2 text-[#00B386]"></i>抖音投流申请确认
          </h4>
          <div class="mb-3">
            <span class="text-xs bg-[#A85454]/20 text-[#A85454] px-2 py-1 rounded">必填信息</span>
          </div>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><span class="text-gray-500">企业名称：</span>\${getValue('dy_company_name')}</div>
            <div><span class="text-gray-500">统一信用代码：</span>\${getValue('dy_credit_code')}</div>
            <div><span class="text-gray-500">品牌名称：</span>\${getValue('dy_brand_name')}</div>
            <div><span class="text-gray-500">抖店名称：</span>\${getValue('dy_shop_name')}</div>
            <div><span class="text-gray-500">合作伙伴：</span>\${getValue('dy_partner')}</div>
            <div><span class="text-gray-500">良辰美联络人：</span>\${getValue('dy_partner_contact')}</div>
          </div>
        </div>
        
        <div class="bg-[#DDD9C8] rounded-lg p-4 mb-4 border border-[#A8B8A8]">
          <div class="mb-3">
            <span class="text-xs bg-[#9A7B4E]/20 text-[#9A7B4E] px-2 py-1 rounded">推荐填写信息</span>
          </div>
          <div class="grid grid-cols-3 gap-4 text-center mb-4">
            <div class="bg-[#F0EDE0] rounded-lg p-3 border border-[#A8B8A8]">
              <p class="text-xs text-[#4A5B4A]">已投流金额</p>
              <p class="text-xl font-bold text-[#4A7896]">\${getValue('dy_total_spend') || '-'}<span class="text-sm">万</span></p>
            </div>
            <div class="bg-[#F0EDE0] rounded-lg p-3 border border-[#A8B8A8]">
              <p class="text-xs text-[#4A5B4A]">计划投流金额</p>
              <p class="text-xl font-bold text-[#3D7A5A]">\${getValue('dy_future_spend_plan') || '-'}<span class="text-sm">万</span></p>
            </div>
            <div class="bg-[#F0EDE0] rounded-lg p-3 border border-[#A8B8A8]">
              <p class="text-xs text-[#4A5B4A]">ROI</p>
              <p class="text-xl font-bold text-[#49754D]">\${getValue('dy_roi') || '-'}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div><span class="text-gray-500">品类：</span>\${categoryMap[getValue('dy_category')] || '-'}</div>
            <div><span class="text-gray-500">店铺评分：</span>\${getValue('dy_shop_rating')}</div>
            <div><span class="text-gray-500">合作时间：</span>\${getValue('dy_coop_duration')}个月</div>
            <div><span class="text-gray-500">GMV：</span>\${getValue('dy_gmv')}万元</div>
          </div>
        </div>
      \`;
    } else {
      // 通用确认摘要
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
  }

  // 通用提交
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

  // 抖音投流专属提交
  async function submitDouyinDeal() {
    // 辅助函数获取值
    const getVal = (id) => document.getElementById(id)?.value || '';
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;
    const getInt = (id) => parseInt(document.getElementById(id)?.value) || 0;
    const getBool = (id) => document.getElementById(id)?.value === 'yes';
    
    // 收集所有抖音投流字段
    const douyinData = {
      // 基本信息（必填）
      company_name: getVal('dy_company_name'),
      credit_code: getVal('dy_credit_code'),
      brand_name: getVal('dy_brand_name'),
      shop_name: getVal('dy_shop_name'),
      partner: getVal('dy_partner'),
      partner_contact: getVal('dy_partner_contact'),
      
      // 品类与合作（推荐）
      category: getVal('dy_category'),
      coop_duration: getInt('dy_coop_duration'),
      total_spend: getNum('dy_total_spend'),
      account_count: getInt('dy_account_count'),
      account_balance: getNum('dy_account_balance'),
      category_deposit: getNum('dy_category_deposit'),
      
      // 未来计划（推荐）
      future_coop_duration: getInt('dy_future_coop_duration'),
      future_spend_plan: getNum('dy_future_spend_plan'),
      
      // 店铺与品牌（推荐）
      shop_link: getVal('dy_shop_link'),
      shop_age: getInt('dy_shop_age'),
      brand_age: getInt('dy_brand_age'),
      shop_rating: getNum('dy_shop_rating'),
      revenue_ratio: getNum('dy_revenue_ratio'),
      revenue_growth: getNum('dy_revenue_growth'),
      
      // 历史合作与合规（推荐）
      has_advance_coop: getBool('dy_has_advance_coop'),
      coop_history: getVal('dy_coop_history'),
      has_default: getBool('dy_has_default'),
      has_deduction_auth: getBool('dy_has_deduction_auth'),
      has_freeze_auth: getBool('dy_has_freeze_auth'),
      exclusive_coop: getBool('dy_exclusive_coop'),
      
      // 投放效果指标（推荐）
      roi: getNum('dy_roi'),
      gmv: getNum('dy_gmv'),
      cpm: getNum('dy_cpm'),
      ctr: getNum('dy_ctr'),
      completion_rate: getNum('dy_completion_rate'),
      organic_growth: getNum('dy_organic_growth'),
      
      // 商品质量指标（推荐）
      return_rate: getNum('dy_return_rate'),
      gross_margin: getNum('dy_gross_margin'),
      repurchase_rate: getNum('dy_repurchase_rate')
    };

    // 构建提交数据
    const categoryMap = {
      food: '食品饮料', beauty: '美妆护肤', clothing: '服饰鞋包', home: '家居家装',
      electronics: '数码电子', baby: '母婴用品', health: '健康保健', sports: '运动户外', other: '其他'
    };
    
    const deal = {
      company_name: douyinData.company_name,
      credit_code: douyinData.credit_code,
      industry: 'douyin-ecommerce',
      main_business: \`抖音投流业务
品牌名称：\${douyinData.brand_name}
抖店名称：\${douyinData.shop_name}
合作伙伴：\${douyinData.partner}
良辰美联络人：\${douyinData.partner_contact}
品类：\${categoryMap[douyinData.category] || '-'}
店铺评分：\${douyinData.shop_rating || '-'}
已合作\${douyinData.coop_duration || '-'}个月，累计投流\${douyinData.total_spend || '-'}万元
计划未来\${douyinData.future_coop_duration || '-'}个月投流\${douyinData.future_spend_plan || '-'}万元
ROI: \${douyinData.roi || '-'}, GMV: \${douyinData.gmv || '-'}万元\`,
      funding_amount: douyinData.future_spend_plan || 0,
      contact_name: douyinData.partner_contact,
      contact_phone: '',
      website: douyinData.shop_link,
      project_documents: document.getElementById('project_documents')?.value || '',
      financial_data: JSON.stringify(douyinData)
    };

    try {
      const result = await apiCall('/api/deals', {
        method: 'POST',
        body: JSON.stringify(deal)
      });
      showToast('抖音投流申请提交成功！标的ID: ' + result.data.id, 'success');
      setTimeout(() => window.location.href = '/deals/' + result.data.id, 2000);
    } catch (e) {
      showToast('提交失败，请重试', 'error');
    }
  }

  // 页面加载时检查行业选择
  document.addEventListener('DOMContentLoaded', () => {
    // 监听所有行业选择变化
    document.querySelectorAll('input[name="industry"]').forEach(radio => {
      radio.addEventListener('change', function() {
        handleIndustryChange(this.value);
      });
    });
  });
</script>
`

// 标的管理页面 - deals.html
export const dealsPageContent = `
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-slate-800">标的管理</h1>
    <p class="text-gray-500">查看和管理所有投资标的</p>
  </div>
  <a href="/submit" class="px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:opacity-90 transition">
    <i class="fas fa-plus mr-2"></i>新建标的
  </a>
</div>

<!-- 筛选条件 -->
<div class="bg-white rounded-xl card-shadow p-4 mb-6">
  <div class="flex flex-wrap gap-4">
    <select id="filter-status" onchange="loadDeals()" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 border-slate-100">
      <option value="">全部状态</option>
      <option value="pending">待处理</option>
      <option value="outer">外环漏斗体系</option>
      <option value="evaluation">评估中</option>
      <option value="review">待审核</option>
      <option value="completed">已完成</option>
      <option value="rejected">已拒绝</option>
    </select>
    <select id="filter-industry" onchange="loadDeals()" class="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-500 border-slate-100">
      <option value="">全部行业</option>
      <option value="light-asset">文娱轻资产</option>
      <option value="catering">餐饮</option>
      <option value="retail">零售</option>
      <option value="ecommerce">电商</option>
      <option value="douyin-ecommerce">抖音投流</option>
      <option value="education">教育培训</option>
      <option value="service">生活服务</option>
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
      
      <!-- Tab切换 -->
      <div class="border-b px-6">
        <div class="flex space-x-4">
          <button onclick="switchDealTab('info')" id="deal-tab-info" class="py-3 px-4 font-medium text-primary-500 border-b-2 border-primary-500">
            <i class="fas fa-info-circle mr-2"></i>基本信息
          </button>
          <button onclick="switchDealTab('materials')" id="deal-tab-materials" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-file-upload mr-2"></i>补充材料
          </button>
          <button onclick="switchDealTab('logs')" id="deal-tab-logs" class="py-3 px-4 font-medium text-gray-500 hover:text-gray-700">
            <i class="fas fa-history mr-2"></i>评估日志
          </button>
        </div>
      </div>
      
      <div class="flex-1 overflow-y-auto p-6" id="deal-modal-content">
        <!-- 动态内容 -->
      </div>
      <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
        <button onclick="closeDealModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">关闭</button>
        <div class="flex space-x-2">
          <button onclick="openUploadMaterialModal()" id="btn-upload-material" class="px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-slate-800 transition">
            <i class="fas fa-upload mr-2"></i>上传材料
          </button>
          <button onclick="startEvaluation()" id="btn-evaluate" class="px-6 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:opacity-90 transition">
            <i class="fas fa-play mr-2"></i>开始评估
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- 上传材料模态框 -->
<div id="upload-material-modal" class="fixed inset-0 bg-black/50 z-[60] hidden flex items-center justify-center p-4">
  <div class="bg-white rounded-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
    <div class="flex items-center justify-between px-6 py-4 border-b bg-amber-50">
      <h2 class="text-lg font-semibold text-amber-800">
        <i class="fas fa-file-upload mr-2"></i>上传补充材料
      </h2>
      <button onclick="closeUploadMaterialModal()" class="text-gray-400 hover:text-gray-600">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="flex-1 overflow-y-auto p-6">
      <!-- 拖拽上传区 -->
      <div id="deal-drop-zone" 
        class="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-dashed border-amber-300 cursor-pointer hover:border-amber-400 transition"
        onclick="document.getElementById('deal-file-input').click()"
        ondrop="handleDealFileDrop(event)" 
        ondragover="handleDealDragOver(event)" 
        ondragleave="handleDealDragLeave(event)">
        <div class="text-center">
          <i class="fas fa-cloud-upload-alt text-4xl text-amber-400 mb-3"></i>
          <p class="font-medium text-amber-700 mb-1">拖拽文件或点击选择</p>
          <p class="text-xs text-gray-500">支持 TXT、PDF、DOC、DOCX、图片等</p>
        </div>
        <input type="file" id="deal-file-input" class="hidden" multiple 
          accept=".txt,.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.gif,.md"
          onchange="handleDealFileSelect(event)">
      </div>
      
      <!-- 已选文件列表 -->
      <div id="deal-selected-files" class="mt-4 hidden">
        <h5 class="font-medium text-sm text-gray-700 mb-2">已选择文件：</h5>
        <div id="deal-files-list" class="space-y-2 max-h-32 overflow-y-auto"></div>
      </div>
      
      <!-- 材料分类 -->
      <div class="mt-4">
        <label class="text-sm text-gray-600">材料分类：</label>
        <select id="deal-material-category" class="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-400">
          <option value="合同文件">合同文件</option>
          <option value="审批文件">审批文件</option>
          <option value="财务文件">财务文件</option>
          <option value="保险文件">保险文件</option>
          <option value="其他">其他</option>
        </select>
      </div>
      
      <!-- 已上传材料 -->
      <div id="deal-uploaded-materials" class="mt-4 hidden">
        <h5 class="font-medium text-sm text-green-700 mb-2">
          <i class="fas fa-check-circle mr-1"></i>已上传材料：
        </h5>
        <div id="deal-uploaded-list" class="space-y-2 max-h-32 overflow-y-auto"></div>
      </div>
    </div>
    <div class="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
      <button onclick="closeUploadMaterialModal()" class="px-4 py-2 text-gray-600 hover:text-gray-800">取消</button>
      <div class="flex space-x-2">
        <button onclick="uploadDealMaterials()" id="btn-do-upload" class="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          <i class="fas fa-upload mr-2"></i>上传
        </button>
        <button onclick="uploadAndEvaluate()" id="btn-upload-evaluate" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
          <i class="fas fa-play mr-2"></i>上传并评估
        </button>
      </div>
    </div>
  </div>
</div>

<script>
  let currentDealId = null;
  let currentDealData = null;
  let currentDealLogs = [];
  let dealSelectedFiles = [];
  let dealUploadedMaterials = [];
  let currentDealTab = 'info';

  const statusMap = {
    pending: { label: '待处理', class: 'bg-gray-100 text-gray-600' },
    outer: { label: '外环漏斗体系', class: 'bg-blue-100 text-blue-600' },
    evaluation: { label: '评估中', class: 'bg-yellow-100 text-yellow-600' },
    review: { label: '待审核', class: 'bg-purple-100 text-purple-600' },
    completed: { label: '已完成', class: 'bg-green-100 text-green-600' },
    rejected: { label: '已拒绝', class: 'bg-red-100 text-red-600' }
  };

  const industryMap = {
    ecommerce: '电商',
    overseas: '海外',
    'light-asset': '文娱轻资产',
    retail: '零售',
    catering: '餐饮',
    education: '教育培训',
    healthcare: '医疗健康',
    entertainment: '文娱',
    service: '生活服务',
    'douyin-ecommerce': '抖音投流'
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
          <tr class="border-b hover:bg-gray-50 cursor-pointer" onclick="window.location.href='/deals/\${deal.id}'">
            <td class="py-4 px-6 font-mono text-sm">\${deal.id}</td>
            <td class="py-4 px-6">\${deal.company_name}</td>
            <td class="py-4 px-6">\${industryMap[deal.industry] || deal.industry}</td>
            <td class="py-4 px-6">\${deal.funding_amount ? deal.funding_amount + '万' : '-'}</td>
            <td class="py-4 px-6"><span class="px-2 py-1 rounded text-xs \${status.class}">\${status.label}</span></td>
            <td class="py-4 px-6 font-mono">\${deal.total_score ? deal.total_score.toFixed(1) : '-'}</td>
            <td class="py-4 px-6">
              <a href="/deals/\${deal.id}" class="text-primary-500 hover:text-violet-500" onclick="event.stopPropagation()">
                <i class="fas fa-external-link-alt mr-1"></i>查看详情
              </a>
            </td>
          </tr>
        \`;
      }).join('');
    } catch (e) {}
  }

  async function openDealModal(id) {
    currentDealId = id;
    currentDealTab = 'info';
    try {
      const { data: deal } = await apiCall(\`/api/deals/\${id}\`);
      let logs = [];
      try {
        const logsRes = await apiCall(\`/api/evaluation-logs/\${id}\`, { silent: true });
        logs = logsRes.data || [];
      } catch (e) {}
      
      currentDealData = deal;
      currentDealLogs = logs;
      
      // 解析已上传材料
      try {
        dealUploadedMaterials = JSON.parse(deal.supplementary_materials || '[]');
      } catch (e) {
        dealUploadedMaterials = [];
      }
      
      document.getElementById('deal-modal-title').textContent = deal.company_name + ' (' + deal.id + ')';
      
      // 更新Tab样式
      updateDealTabs();
      
      // 渲染内容
      renderDealContent();
      
      const btnEvaluate = document.getElementById('btn-evaluate');
      btnEvaluate.classList.toggle('hidden', deal.status === 'completed' || deal.status === 'rejected');
      
      document.getElementById('deal-modal').classList.remove('hidden');
    } catch (e) {
      showToast('加载失败: ' + e.message, 'error');
    }
  }
  
  // Tab切换
  function switchDealTab(tab) {
    currentDealTab = tab;
    updateDealTabs();
    renderDealContent();
  }
  
  function updateDealTabs() {
    ['info', 'materials', 'logs'].forEach(t => {
      const tabEl = document.getElementById(\`deal-tab-\${t}\`);
      if (tabEl) {
        tabEl.className = t === currentDealTab
          ? 'py-3 px-4 font-medium text-primary-500 border-b-2 border-primary-500'
          : 'py-3 px-4 font-medium text-gray-500 hover:text-violet-500';
      }
    });
  }
  
  function renderDealContent() {
    const deal = currentDealData;
    const logs = currentDealLogs;
    if (!deal) return;
    
    const status = statusMap[deal.status] || { label: deal.status, class: 'bg-gray-100' };
    const contentEl = document.getElementById('deal-modal-content');
    
    if (currentDealTab === 'info') {
      contentEl.innerHTML = \`
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
                <div class="text-4xl font-bold text-primary-500">\${deal.total_score.toFixed(1)}</div>
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
        <div class="mt-6 pt-6 border-t">
          <h4 class="font-medium mb-3">主营业务</h4>
          <p class="text-sm text-gray-600 line-clamp-4">\${deal.main_business || '暂无描述'}</p>
        </div>
      \`;
    } else if (currentDealTab === 'materials') {
      contentEl.innerHTML = \`
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="font-medium">补充材料</h4>
            <button onclick="openUploadMaterialModal()" class="text-sm text-amber-600 hover:text-amber-700">
              <i class="fas fa-plus mr-1"></i>上传新材料
            </button>
          </div>
          \${dealUploadedMaterials.length > 0 ? \`
            <div class="space-y-3">
              \${dealUploadedMaterials.map((m, i) => \`
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-3">
                    <i class="fas fa-file text-gray-400"></i>
                    <div>
                      <p class="text-sm font-medium">\${m.name}</p>
                      <p class="text-xs text-gray-500">\${m.category} · \${new Date(m.uploadedAt).toLocaleString()}</p>
                    </div>
                  </div>
                  <span class="text-xs px-2 py-1 rounded bg-green-100 text-green-600">已上传</span>
                </div>
              \`).join('')}
            </div>
          \` : \`
            <div class="text-center py-12 text-gray-400">
              <i class="fas fa-folder-open text-4xl mb-3"></i>
              <p>暂无补充材料</p>
              <button onclick="openUploadMaterialModal()" class="mt-4 text-amber-600 hover:text-amber-700">
                <i class="fas fa-upload mr-1"></i>上传材料
              </button>
            </div>
          \`}
        </div>
      \`;
    } else if (currentDealTab === 'logs') {
      contentEl.innerHTML = logs.length > 0 ? \`
        <div class="space-y-2">
          \${logs.map(log => \`
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm">
              <span class="font-medium">\${log.agent_name}</span>
              <span class="font-mono">\${log.score}</span>
              <span class="\${log.pass_status ? 'text-green-600' : 'text-red-600'}">\${log.pass_status ? '通过' : '未通过'}</span>
              <span class="text-gray-400">\${log.execution_time}ms</span>
            </div>
          \`).join('')}
        </div>
      \` : '<p class="text-center py-12 text-gray-400">暂无评估日志</p>';
    }
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

  // ============================================
  // 上传材料相关功能
  // ============================================
  
  function openUploadMaterialModal() {
    dealSelectedFiles = [];
    updateDealFilesList();
    loadDealUploadedMaterials();
    document.getElementById('upload-material-modal').classList.remove('hidden');
  }
  
  function closeUploadMaterialModal() {
    document.getElementById('upload-material-modal').classList.add('hidden');
  }
  
  function handleDealDragOver(e) {
    e.preventDefault();
    e.target.closest('#deal-drop-zone')?.classList.add('border-amber-500', 'bg-amber-100');
  }
  
  function handleDealDragLeave(e) {
    e.preventDefault();
    e.target.closest('#deal-drop-zone')?.classList.remove('border-amber-500', 'bg-amber-100');
  }
  
  function handleDealFileDrop(e) {
    e.preventDefault();
    e.target.closest('#deal-drop-zone')?.classList.remove('border-amber-500', 'bg-amber-100');
    addDealFiles(Array.from(e.dataTransfer.files));
  }
  
  function handleDealFileSelect(e) {
    addDealFiles(Array.from(e.target.files));
    e.target.value = '';
  }
  
  function addDealFiles(files) {
    const maxSize = 10 * 1024 * 1024;
    const validTypes = ['txt', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'png', 'jpg', 'jpeg', 'gif', 'md'];
    
    files.forEach(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      if (!validTypes.includes(ext)) {
        showToast(\`不支持的格式: \${file.name}\`, 'error');
        return;
      }
      if (file.size > maxSize) {
        showToast(\`文件过大: \${file.name}\`, 'error');
        return;
      }
      if (!dealSelectedFiles.find(f => f.name === file.name)) {
        dealSelectedFiles.push(file);
      }
    });
    updateDealFilesList();
  }
  
  function updateDealFilesList() {
    const section = document.getElementById('deal-selected-files');
    const list = document.getElementById('deal-files-list');
    if (!section || !list) return;
    
    if (dealSelectedFiles.length > 0) {
      section.classList.remove('hidden');
      list.innerHTML = dealSelectedFiles.map((f, i) => \`
        <div class="flex items-center justify-between p-2 bg-white rounded border">
          <span class="text-sm truncate">\${f.name}</span>
          <button onclick="dealSelectedFiles.splice(\${i}, 1); updateDealFilesList();" class="text-red-400 hover:text-red-600">
            <i class="fas fa-times"></i>
          </button>
        </div>
      \`).join('');
    } else {
      section.classList.add('hidden');
    }
  }
  
  function loadDealUploadedMaterials() {
    const section = document.getElementById('deal-uploaded-materials');
    const list = document.getElementById('deal-uploaded-list');
    if (!section || !list) return;
    
    if (dealUploadedMaterials.length > 0) {
      section.classList.remove('hidden');
      list.innerHTML = dealUploadedMaterials.map(m => \`
        <div class="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
          <span class="text-sm text-green-700">\${m.name}</span>
          <span class="text-xs text-green-500">\${m.category}</span>
        </div>
      \`).join('');
    } else {
      section.classList.add('hidden');
    }
  }
  
  async function uploadDealMaterials() {
    if (dealSelectedFiles.length === 0) {
      showToast('请先选择文件', 'error');
      return false;
    }
    
    const btn = document.getElementById('btn-do-upload');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>上传中...';
    btn.disabled = true;
    
    const category = document.getElementById('deal-material-category')?.value || '其他';
    
    try {
      const materials = [];
      for (const file of dealSelectedFiles) {
        const content = await readDealFileContent(file);
        materials.push({
          name: file.name,
          category: category,
          content: content,
          uploadedAt: new Date().toISOString()
        });
      }
      
      const response = await apiCall(\`/api/deals/\${currentDealId}/materials\`, {
        method: 'POST',
        body: JSON.stringify({ materials })
      });
      
      if (response.success) {
        dealUploadedMaterials = response.data || [];
        dealSelectedFiles = [];
        updateDealFilesList();
        loadDealUploadedMaterials();
        showToast('上传成功！', 'success');
        return true;
      }
    } catch (e) {
      showToast('上传失败: ' + e.message, 'error');
    } finally {
      btn.innerHTML = '<i class="fas fa-upload mr-2"></i>上传';
      btn.disabled = false;
    }
    return false;
  }
  
  async function readDealFileContent(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      const ext = file.name.split('.').pop().toLowerCase();
      reader.onload = (e) => {
        if (['txt', 'md'].includes(ext)) {
          resolve(e.target.result);
        } else {
          resolve(\`[文件: \${file.name}, 类型: \${ext.toUpperCase()}, 大小: \${(file.size/1024).toFixed(1)}KB]\`);
        }
      };
      reader.onerror = () => resolve(\`[文件: \${file.name}]\`);
      if (['txt', 'md'].includes(ext)) {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  }
  
  async function uploadAndEvaluate() {
    if (dealSelectedFiles.length > 0) {
      const uploaded = await uploadDealMaterials();
      if (!uploaded) return;
    }
    closeUploadMaterialModal();
    startEvaluation();
  }
  
  // 键盘事件
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDealModal();
      closeUploadMaterialModal();
    }
  });

  document.addEventListener('DOMContentLoaded', () => setTimeout(loadDeals, 500));
</script>
`
