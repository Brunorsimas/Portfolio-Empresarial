// Mock Data
const obrasData = [
  {
    id: 1,
    nome: "Prédio Comercial - Centro",
    tipo: "Comercial",
    status: "em-andamento",
    progresso: 78,
    dataInicio: "2025-06-15",
    dataPrevista: "2026-04-30",
    local: "Avenida Principal, 1000",
    responsavel: "João Silva",
    investimento: "R$ 2.5M"
  },
  {
    id: 2,
    nome: "Residência Unifamiliar - Zona Sul",
    tipo: "Residencial",
    status: "em-andamento",
    progresso: 45,
    dataInicio: "2025-10-01",
    dataPrevista: "2026-08-15",
    local: "Rua das Flores, 250",
    responsavel: "Maria Santos",
    investimento: "R$ 850K"
  },
  {
    id: 3,
    nome: "Reforma Hotel - Praia",
    tipo: "Hotelaria",
    status: "em-andamento",
    progresso: 62,
    dataInicio: "2025-08-10",
    dataPrevista: "2026-05-30",
    local: "Praia Brava, Litoral",
    responsavel: "Carlos Oliveira",
    investimento: "R$ 3.2M"
  },
  {
    id: 4,
    nome: "Condomínio Residencial - Novo Bairro",
    tipo: "Residencial",
    status: "em-andamento",
    progresso: 35,
    dataInicio: "2025-11-20",
    dataPrevista: "2026-10-10",
    local: "Novo Bairro Empresarial",
    responsavel: "Ana Costa",
    investimento: "R$ 5.8M"
  },
  {
    id: 5,
    nome: "Galpão Industrial - Distrito",
    tipo: "Industrial",
    status: "concluido",
    progresso: 100,
    dataInicio: "2025-02-15",
    dataPrevista: "2026-01-05",
    local: "Distrito Industrial",
    responsavel: "Roberto Mendes",
    investimento: "R$ 1.8M"
  },
  {
    id: 6,
    nome: "Centro de Saúde - Bairro Norte",
    tipo: "Saúde",
    status: "concluido",
    progresso: 100,
    dataInicio: "2024-11-10",
    dataPrevista: "2025-12-20",
    local: "Bairro Norte",
    responsavel: "Fernanda Dias",
    investimento: "R$ 2.1M"
  },
  {
    id: 7,
    nome: "Escola Municipal - Centro Expandido",
    tipo: "Educação",
    status: "concluido",
    progresso: 100,
    dataInicio: "2024-09-01",
    dataPrevista: "2025-11-30",
    local: "Centro Expandido",
    responsavel: "Lucas Ferreira",
    investimento: "R$ 1.4M"
  },
  {
    id: 8,
    nome: "Edifício de Apartamentos - Zona Leste",
    tipo: "Residencial",
    status: "planejado",
    progresso: 5,
    dataInicio: "2026-02-01",
    dataPrevista: "2026-12-30",
    local: "Zona Leste",
    responsavel: "Beatriz Lima",
    investimento: "R$ 4.2M"
  }
];

// Page Navigation
const menuItems = document.querySelectorAll('.menu-item');
const pages = document.querySelectorAll('.page');

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active from all items and pages
    menuItems.forEach(m => m.classList.remove('active'));
    pages.forEach(p => p.classList.remove('active'));
    
    // Add active to clicked item
    item.classList.add('active');
    
    // Show corresponding page
    const pageId = item.getAttribute('data-page');
    const pageElement = document.getElementById(pageId);
    if (pageElement) {
      pageElement.classList.add('active');
      
      // Update page title
      updatePageTitle(pageId);
      
      // Load page content
      if (pageId === 'obras') {
        loadObras();
      } else if (pageId === 'timeline') {
        loadTimeline();
      }
    }
  });
});

// Update page title
function updatePageTitle(pageId) {
  const titles = {
    'overview': { title: 'Dashboard', subtitle: 'Visão geral do controle de obras' },
    'obras': { title: 'Gerenciador de Obras', subtitle: 'Lista completa de projetos' },
    'timeline': { title: 'Cronograma de Obras', subtitle: 'Visualização de prazos e etapas' },
    'relatorios': { title: 'Relatórios', subtitle: 'Análises e documentos' }
  };
  
  const titleData = titles[pageId];
  if (titleData) {
    document.getElementById('pageTitle').textContent = titleData.title;
    document.getElementById('pageSubtitle').textContent = titleData.subtitle;
  }
}

// Load Obras
function loadObras() {
  const obrasList = document.getElementById('obrasList');
  obrasList.innerHTML = '';
  
  let filteredObras = obrasData;
  
  // Apply filters
  const statusFilter = document.getElementById('filterStatus')?.value || '';
  const searchFilter = document.getElementById('filterSearch')?.value.toLowerCase() || '';
  
  if (statusFilter) {
    filteredObras = filteredObras.filter(o => o.status === statusFilter);
  }
  
  if (searchFilter) {
    filteredObras = filteredObras.filter(o => o.nome.toLowerCase().includes(searchFilter));
  }
  
  filteredObras.forEach(obra => {
    const card = createObraCard(obra);
    obrasList.appendChild(card);
  });
}

function createObraCard(obra) {
  const card = document.createElement('div');
  card.className = 'obra-card';
  
  const statusLabel = {
    'concluido': 'Concluída',
    'em-andamento': 'Em Andamento',
    'planejado': 'Planejada'
  };
  
  card.innerHTML = `
    <div class="obra-header">
      <h3>${obra.nome}</h3>
      <span class="obra-status ${obra.status}">${statusLabel[obra.status]}</span>
    </div>
    <div class="obra-body">
      <div class="obra-item">
        <div class="obra-label">Tipo</div>
        <div class="obra-value">${obra.tipo}</div>
      </div>
      <div class="obra-item">
        <div class="obra-label">Progresso</div>
        <div class="progress-bar" style="margin-top: 4px;">
          <div class="progress-fill ${obra.status}" style="width: ${obra.progresso}%"></div>
        </div>
        <div class="obra-value" style="margin-top: 4px;">${obra.progresso}%</div>
      </div>
      <div class="obra-item">
        <div class="obra-label">Responsável</div>
        <div class="obra-value">${obra.responsavel}</div>
      </div>
      <div class="obra-item">
        <div class="obra-label">Previsão de Término</div>
        <div class="obra-value">${formatDate(obra.dataPrevista)}</div>
      </div>
      <div class="obra-item">
        <div class="obra-label">Investimento</div>
        <div class="obra-value">${obra.investimento}</div>
      </div>
    </div>
    <div class="obra-footer">
      <button onclick="viewObraDetails(${obra.id})">Detalhes</button>
      <button onclick="editObra(${obra.id})">Editar</button>
    </div>
  `;
  
  return card;
}

// Load Timeline (Gantt Chart)
function loadTimeline() {
  const ganttChart = document.getElementById('ganttChart');
  ganttChart.innerHTML = '';
  
  // Simplify timeline for display
  const relevantObras = obrasData.filter(o => o.status !== 'concluido');
  
  relevantObras.forEach(obra => {
    const startDate = new Date(obra.dataInicio);
    const endDate = new Date(obra.dataPrevista);
    const daysTotal = Math.max(1, (endDate - startDate) / (1000 * 60 * 60 * 24));
    
    const row = document.createElement('div');
    row.className = 'gantt-row';
    
    const label = document.createElement('div');
    label.className = 'gantt-label';
    label.textContent = obra.nome;
    
    const bar = document.createElement('div');
    bar.className = 'gantt-bar';
    
    const task = document.createElement('div');
    task.className = `gantt-task ${obra.status}`;
    task.style.left = '0%';
    task.style.width = '100%';
    task.textContent = `${obra.progresso}% - ${obra.nome.substring(0, 20)}...`;
    
    bar.appendChild(task);
    
    row.appendChild(label);
    row.appendChild(bar);
    
    ganttChart.appendChild(row);
  });
}

// Filter handlers
document.addEventListener('DOMContentLoaded', () => {
  const filterStatus = document.getElementById('filterStatus');
  const filterSearch = document.getElementById('filterSearch');
  
  if (filterStatus) {
    filterStatus.addEventListener('change', loadObras);
  }
  
  if (filterSearch) {
    filterSearch.addEventListener('input', loadObras);
  }
});

// Utility functions
function formatDate(dateString) {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

function viewObraDetails(id) {
  const obra = obrasData.find(o => o.id === id);
  alert(`Detalhes da obra:\n\nNome: ${obra.nome}\nLocal: ${obra.local}\nStatus: ${obra.status}\nProgresso: ${obra.progresso}%`);
}

function editObra(id) {
  alert(`Editar obra ID: ${id}\n(Função em desenvolvimento)`);
}

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.kpi-card, .chart-card, .obra-card');
  cards.forEach(card => observer.observe(card));
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'k') {
      e.preventDefault();
      document.querySelector('.search-box input')?.focus();
    }
  }
});
