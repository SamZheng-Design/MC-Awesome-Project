// Demo演示页面 - demo.html
export const demoPageContent = `
<!-- 页面标题 -->
<div class="flex items-center justify-between mb-6">
  <div>
    <h1 class="text-2xl font-bold text-gray-800">Cardi B 演唱会项目演示</h1>
    <p class="text-gray-500">完整展示多智能体评估流程</p>
  </div>
  <div class="flex space-x-2">
    <button onclick="resetDemo()" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
      <i class="fas fa-redo mr-2"></i>重置
    </button>
    <button onclick="startDemo()" id="btn-start" class="px-6 py-2 bg-gradient-to-r from-primary-500 to-purple-500 text-white rounded-lg hover:opacity-90 transition">
      <i class="fas fa-play mr-2"></i>开始评估
    </button>
  </div>
</div>

<!-- 步骤指示器 -->
<div class="bg-white rounded-xl p-6 card-shadow mb-6">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <div id="step-1" class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold">1</div>
        <span class="font-medium text-primary-600">项目材料</span>
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
            <span class="font-medium text-primary-600">3,000万</span>
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
      <div id="outer-agents" class="space-y-3">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 中环评估 -->
    <div id="inner-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-bullseye text-blue-500 mr-2"></i>
          中环评估
          <span class="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded">加权评分</span>
        </h3>
        <span id="inner-status" class="text-sm text-gray-500">等待外环完成</span>
      </div>
      <div id="inner-agents" class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- 智能体卡片将动态加载 -->
      </div>
    </div>

    <!-- 综合评分 -->
    <div id="final-section" class="bg-white rounded-xl card-shadow p-6 opacity-50">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold text-lg flex items-center">
          <i class="fas fa-ranking-star text-purple-500 mr-2"></i>
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
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white">
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
  </div>
</div>

<script>
  let demoAgents = [];
  let radarChart = null;
  let isRunning = false;

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

    document.getElementById('outer-agents').innerHTML = outerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-lg flex items-center justify-center" style="background: \${agent.icon_color}20">
            <i class="\${agent.icon}" style="color: \${agent.icon_color}"></i>
          </div>
          <div>
            <h4 class="font-medium">\${agent.name}</h4>
            <p class="text-xs text-gray-500">\${agent.dimension}</p>
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
        </div>
      </div>
    \`).join('');

    document.getElementById('inner-agents').innerHTML = innerAgents.map(agent => \`
      <div id="agent-\${agent.id}" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
        </div>
      </div>
    \`).join('');
  }

  // 更新智能体状态
  function updateAgentStatus(agentId, status, score = null) {
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
    } else if (status === 'pass') {
      statusEl.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-green-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      if (progressEl) progressEl.querySelector('div').style.width = '100%';
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-green-600';
      }
    } else if (status === 'fail') {
      statusEl.innerHTML = '<i class="fas fa-times text-white text-xs"></i>';
      statusEl.className = 'w-6 h-6 rounded-full bg-red-500 flex items-center justify-center';
      cardEl?.classList.remove('ring-2', 'ring-primary-300');
      if (score !== null) {
        scoreEl.textContent = score;
        scoreEl.className = 'font-mono text-lg font-bold text-red-600';
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

  // 开始演示
  async function startDemo() {
    if (isRunning) return;
    isRunning = true;
    
    document.getElementById('btn-start').disabled = true;
    document.getElementById('btn-start').innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>评估中...';
    document.getElementById('overall-status').textContent = '正在评估...';
    document.getElementById('recommendation-section').classList.add('hidden');

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
          body: JSON.stringify({
            agentId: agentId,
            dealId: 'DGT-2026-CARDIB'
          })
        });
        
        await sleep(500);
        
        const pass = response.data.pass;
        const score = response.data.result?.score || 0;
        updateAgentStatus(agentId, pass ? 'pass' : 'fail', score);
        
        if (!pass) {
          document.getElementById('outer-status').textContent = '未通过';
          document.getElementById('outer-status').className = 'text-sm text-red-600';
          updateStep(2, 'error');
          document.getElementById('overall-status').textContent = '外环筛选未通过';
          showToast('外环筛选未通过：' + (response.data.result?.reasoning || ''), 'error');
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
          body: JSON.stringify({
            agentId: agentId,
            dealId: 'DGT-2026-CARDIB'
          })
        });
        return { agentId, ...response.data };
      }));

      const scores = {};
      innerResults.forEach(r => {
        const score = r.result?.score || 0;
        scores[r.agentId] = score;
        updateAgentStatus(r.agentId, r.pass ? 'pass' : 'fail', score);
      });

      document.getElementById('inner-status').textContent = '评估完成';
      document.getElementById('inner-status').className = 'text-sm text-green-600';
      updateStep(3, 'complete');

      // 步骤4：综合评分
      updateStep(4, 'active');
      document.getElementById('final-section').classList.remove('opacity-50');
      document.getElementById('final-status').textContent = '计算中...';
      document.getElementById('final-status').className = 'text-sm text-primary-600';

      // 计算加权评分
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
      
      // 确定评级
      let grade = 'D';
      let gradeColor = 'red';
      if (finalScore >= 85) { grade = 'A'; gradeColor = 'green'; }
      else if (finalScore >= 75) { grade = 'B+'; gradeColor = 'emerald'; }
      else if (finalScore >= 65) { grade = 'B'; gradeColor = 'blue'; }
      else if (finalScore >= 60) { grade = 'C'; gradeColor = 'yellow'; }

      // 更新雷达图
      updateRadarChart(scores);

      // 更新评分详情
      document.getElementById('final-details').innerHTML = \`
        <div class="text-center">
          <div class="text-5xl font-bold text-\${gradeColor}-600 mb-2">\${finalScore}</div>
          <div class="text-2xl font-bold text-\${gradeColor}-500">\${grade}级</div>
          <p class="text-gray-500 mt-2">\${grade === 'A' ? '强烈推荐投资' : grade === 'B+' ? '推荐投资' : grade === 'B' ? '可以投资' : '谨慎投资'}</p>
        </div>
        <div class="space-y-2 mt-4">
          \${Object.entries(scores).map(([id, score]) => {
            const agent = demoAgents.find(a => a.id === id);
            return \`
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">\${agent?.dimension || id}</span>
                <span class="font-mono font-medium">\${score}</span>
              </div>
            \`;
          }).join('')}
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
      document.getElementById('rec-detail').textContent = 'Cardi B 2026中国巡演项目整体评估良好，IRR预期35%，回收期5个月，符合投资标准。';
      document.getElementById('rec-score').textContent = finalScore;
      document.getElementById('rec-grade').textContent = grade + '级';
      
      document.getElementById('rec-strengths').innerHTML = \`
        <li>• 首次中国巡演，市场稀缺性强</li>
        <li>• 三城联动分散风险</li>
        <li>• 运营方经验丰富</li>
      \`;
      
      document.getElementById('rec-risks').innerHTML = \`
        <li>• 艺人取消风险需关注</li>
        <li>• 票房预测依赖市场反应</li>
        <li>• 涉外审批进度需跟踪</li>
      \`;

      document.getElementById('overall-status').textContent = '评估完成';
      showToast('评估完成！综合评分：' + finalScore + '分', 'success');

    } catch (error) {
      showToast('评估过程出错：' + error.message, 'error');
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
    
    if (radarChart) {
      radarChart.destroy();
    }

    const labels = ['财务健康', '运营能力', '法律合规', '风险控制', '利益一致', '经济性'];
    const data = [
      scores['financial-health-agent'] || 0,
      scores['operational-capability-agent'] || 0,
      scores['legal-compliance-agent'] || 0,
      scores['risk-control-agent'] || 0,
      scores['interest-deep-agent'] || 0,
      scores['economic-calculation-agent'] || 0
    ];

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '评分',
          data: data,
          fill: true,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgb(99, 102, 241)',
          pointBackgroundColor: 'rgb(99, 102, 241)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(99, 102, 241)'
        }]
      },
      options: {
        elements: {
          line: { borderWidth: 2 }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20 }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // 重置演示
  function resetDemo() {
    location.reload();
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(loadDemoAgents, 500);
  });
</script>
`
