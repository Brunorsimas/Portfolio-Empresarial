// Dados demonstrativos
let projetos = [
  {
    id: 1,
    nome: "Edifício Residencial Solaris",
    cliente: "Construtora Alpha",
    tipo: "residencial",
    status: "andamento",
    orcamento: 2500000,
    dataInicio: "2024-01-15",
    dataFim: "2024-12-15",
    progresso: 65,
    descricao: "Construção de edifício residencial com 24 apartamentos",
    etapas: [
      { id: 1, nome: "Fundação", concluida: true, data: "2024-02-28" },
      { id: 2, nome: "Estrutura", concluida: true, data: "2024-05-30" },
      { id: 3, nome: "Alvenaria", concluida: true, data: "2024-08-30" },
      { id: 4, nome: "Acabamento", concluida: false, data: "2024-11-30" }
    ],
    documentos: [
      { id: 1, nome: "Projeto Arquitetônico.pdf", data: "2024-01-10", tipo: "pdf" },
      { id: 2, nome: "Alvará de Construção.pdf", data: "2024-01-12", tipo: "pdf" }
    ],
    equipe: [
      { id: 1, nome: "João Silva", funcao: "Engenheiro Civil" },
      { id: 2, nome: "Maria Santos", funcao: "Arquiteta" },
      { id: 3, nome: "Pedro Costa", funcao: "Mestre de Obras" }
    ]
  },
  {
    id: 2,
    nome: "Shopping Center Nova Vida",
    cliente: "Grupo Empresarial Beta",
    tipo: "comercial",
    status: "planejamento",
    orcamento: 8500000,
    dataInicio: "2024-03-01",
    dataFim: "2025-06-01",
    progresso: 15,
    descricao: "Construção de shopping center com 150 lojas",
    etapas: [
      { id: 1, nome: "Estudo de Viabilidade", concluida: true, data: "2024-02-15" },
      { id: 2, nome: "Licenciamento", concluida: false, data: "2024-04-30" },
      { id: 3, nome: "Terraplanagem", concluida: false, data: "2024-07-30" }
    ],
    documentos: [
      { id: 1, nome: "Estudo de Impacto.pdf", data: "2024-01-20", tipo: "pdf" },
      { id: 2, nome: "Análise de Tráfego.xlsx", data: "2024-01-25", tipo: "excel" }
    ],
    equipe: [
      { id: 1, nome: "Carlos Mendes", funcao: "Engenheiro Civil" },
      { id: 2, nome: "Ana Paula", funcao: "Arquiteta" }
    ]
  },
  {
    id: 3,
    nome: "Planta Industrial TechCorp",
    cliente: "TechCorp Indústria",
    tipo: "industrial",
    status: "atrasado",
    orcamento: 12000000,
    dataInicio: "2023-09-01",
    dataFim: "2024-03-01",
    progresso: 80,
    descricao: "Construção de planta industrial de 5.000m²",
    etapas: [
      { id: 1, nome: "Fundação", concluida: true, data: "2023-10-30" },
      { id: 2, nome: "Estrutura Metálica", concluida: true, data: "2024-01-30" },
      { id: 3, nome: "Instalações", concluida: false, data: "2024-02-28" }
    ],
    documentos: [
      { id: 1, nome: "Projeto Estrutural.dwg", data: "2023-08-15", tipo: "cad" },
      { id: 2, nome: "Layout Industrial.pdf", data: "2023-08-20", tipo: "pdf" }
    ],
    equipe: [
      { id: 1, nome: "Roberto Alves", funcao: "Engenheiro Mecânico" },
      { id: 2, nome: "Luiza Fernandes", funcao: "Engenheira Civil" }
    ]
  },
  {
    id: 4,
    nome: "Ponte Rio Verde",
    cliente: "Prefeitura Municipal",
    tipo: "infraestrutura",
    status: "concluido",
    orcamento: 4500000,
    dataInicio: "2023-01-01",
    dataFim: "2023-10-01",
    progresso: 100,
    descricao: "Construção de ponte sobre o rio Verde",
    etapas: [
      { id: 1, nome: "Fundação", concluida: true, data: "2023-03-30" },
      { id: 2, nome: "Estrutura", concluida: true, data: "2023-07-30" },
      { id: 3, nome: "Pavimentação", concluida: true, data: "2023-09-30" }
    ],
    documentos: [
      { id: 1, nome: "Projeto Estrutural.pdf", data: "2022-12-01", tipo: "pdf" },
      { id: 2, nome: "Licença Ambiental.pdf", data: "2022-12-15", tipo: "pdf" }
    ],
    equipe: [
      { id: 1, nome: "Marcos Oliveira", funcao: "Engenheiro Civil" },
      { id: 2, nome: "Fernanda Lima", funcao: "Engenheira Ambiental" }
    ]
  },
  {
    id: 5,
    nome: "Condomínio Residencial Jardins",
    cliente: "Incorporadora Verde",
    tipo: "residencial",
    status: "andamento",
    orcamento: 6800000,
    dataInicio: "2024-02-01",
    dataFim: "2025-01-01",
    progresso: 35,
    descricao: "Condomínio com 48 casas unifamiliares",
    etapas: [
      { id: 1, nome: "Terraplanagem", concluida: true, data: "2024-03-30" },
      { id: 2, nome: "Infraestrutura", concluida: true, data: "2024-05-30" },
      { id: 3, nome: "Construção Casas", concluida: false, data: "2024-11-30" }
    ],
    documentos: [
      { id: 1, nome: "Planta Master.pdf", data: "2024-01-15", tipo: "pdf" }
    ],
    equipe: [
      { id: 1, nome: "Ricardo Dias", funcao: "Engenheiro Civil" },
      { id: 2, nome: "Camila Souza", funcao: "Arquiteta Paisagista" }
    ]
  }
];

let currentProject = null;

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  carregarProjetos();
  atualizarEstatisticas();
});

// Carregar projetos na tela
function carregarProjetos() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  
  projetos.forEach(projeto => {
    const card = criarProjectCard(projeto);
    grid.appendChild(card);
  });
}

// Criar card de projeto
function criarProjectCard(projeto) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.onclick = () => verDetalhes(projeto.id);
  
  const statusClass = `status-${projeto.status}`;
  const statusText = getStatusText(projeto.status);
  const tipoText = getTipoText(projeto.tipo);
  
  card.innerHTML = `
    <div class="project-header">
      <div>
        <div class="project-title">${projeto.nome}</div>
        <div class="project-client">${projeto.cliente}</div>
      </div>
      <span class="project-status ${statusClass}">${statusText}</span>
    </div>
    
    <div class="project-info">
      <div class="info-item">
        <span class="info-label">Tipo</span>
        <span class="info-value">${tipoText}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Orçamento</span>
        <span class="info-value">R$ ${formatarMoeda(projeto.orcamento)}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Início</span>
        <span class="info-value">${formatarData(projeto.dataInicio)}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Término</span>
        <span class="info-value">${formatarData(projeto.dataFim)}</span>
      </div>
    </div>
    
    <div class="progress-container">
      <div class="progress-label">
        <span>Progresso</span>
        <span>${projeto.progresso}%</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: ${projeto.progresso}%"></div>
      </div>
    </div>
    
    <div class="project-actions">
      <button class="btn btn-primary" onclick="event.stopPropagation(); verDetalhes(${projeto.id})">
        <i class="fas fa-eye"></i> Ver Detalhes
      </button>
      <button class="btn btn-secondary" onclick="event.stopPropagation(); editarProjeto(${projeto.id})">
        <i class="fas fa-edit"></i> Editar
      </button>
    </div>
  `;
  
  return card;
}

// Ver detalhes do projeto
function verDetalhes(projetoId) {
  currentProject = projetos.find(p => p.id === projetoId);
  if (!currentProject) return;
  
  document.getElementById('modalProjectTitle').textContent = currentProject.nome;
  document.getElementById('detailCliente').textContent = currentProject.cliente;
  document.getElementById('detailTipo').textContent = getTipoText(currentProject.tipo);
  document.getElementById('detailOrcamento').textContent = `R$ ${formatarMoeda(currentProject.orcamento)}`;
  document.getElementById('detailStatus').textContent = getStatusText(currentProject.status);
  document.getElementById('detailStatus').className = `project-status status-${currentProject.status}`;
  document.getElementById('detailProgress').style.width = `${currentProject.progresso}%`;
  document.getElementById('detailProgressText').textContent = `${currentProject.progresso}%`;
  
  carregarEtapas();
  carregarDocumentos();
  carregarEquipe();
  
  openModal('detalhesProjeto');
}

// Carregar etapas
function carregarEtapas() {
  const etapasList = document.getElementById('etapasList');
  etapasList.innerHTML = '';
  
  currentProject.etapas.forEach(etapa => {
    const etapaItem = document.createElement('div');
    etapaItem.className = 'etapa-item';
    
    const statusClass = etapa.concluida ? 'status-concluido' : 'status-andamento';
    const statusText = etapa.concluida ? 'Concluída' : 'Em Andamento';
    
    etapaItem.innerHTML = `
      <input type="checkbox" class="etapa-checkbox" ${etapa.concluida ? 'checked' : ''} 
             onchange="toggleEtapa(${etapa.id})">
      <div class="etapa-info">
        <div class="etapa-nome">${etapa.nome}</div>
        <div class="etapa-data">Previsão: ${formatarData(etapa.data)}</div>
      </div>
      <span class="etapa-status ${statusClass}">${statusText}</span>
    `;
    
    etapasList.appendChild(etapaItem);
  });
}

// Carregar documentos
function carregarDocumentos() {
  const documentosList = document.getElementById('documentosList');
  documentosList.innerHTML = '';
  
  currentProject.documentos.forEach(doc => {
    const docItem = document.createElement('div');
    docItem.className = 'documento-item';
    
    const icon = getDocumentoIcon(doc.tipo);
    
    docItem.innerHTML = `
      <div class="documento-icon">
        <i class="${icon}"></i>
      </div>
      <div class="documento-info">
        <div class="documento-nome">${doc.nome}</div>
        <div class="documento-data">Adicionado em ${formatarData(doc.data)}</div>
      </div>
      <button class="btn btn-secondary" onclick="downloadDocumento('${doc.nome}')">
        <i class="fas fa-download"></i>
      </button>
    `;
    
    documentosList.appendChild(docItem);
  });
}

// Carregar equipe
function carregarEquipe() {
  const equipeList = document.getElementById('equipeList');
  equipeList.innerHTML = '';
  
  currentProject.equipe.forEach(membro => {
    const membroItem = document.createElement('div');
    membroItem.className = 'membro-item';
    
    const iniciais = membro.nome.split(' ').map(n => n[0]).join('').toUpperCase();
    
    membroItem.innerHTML = `
      <div class="membro-avatar">${iniciais}</div>
      <div class="membro-info">
        <div class="membro-nome">${membro.nome}</div>
        <div class="membro-funcao">${membro.funcao}</div>
      </div>
      <button class="btn btn-secondary" onclick="removerMembro(${membro.id})">
        <i class="fas fa-times"></i>
      </button>
    `;
    
    equipeList.appendChild(membroItem);
  });
}

// Salvar novo projeto
function salvarProjeto(event) {
  event.preventDefault();
  
  const novoProjeto = {
    id: projetos.length + 1,
    nome: document.getElementById('nomeProjeto').value,
    cliente: document.getElementById('cliente').value,
    tipo: document.getElementById('tipo').value,
    status: 'planejamento',
    orcamento: parseFloat(document.getElementById('orcamento').value.replace(/[^\d]/g, '')),
    dataInicio: document.getElementById('dataInicio').value,
    dataFim: document.getElementById('dataFim').value,
    progresso: 0,
    descricao: document.getElementById('descricao').value,
    etapas: [],
    documentos: [],
    equipe: []
  };
  
  projetos.push(novoProjeto);
  carregarProjetos();
  atualizarEstatisticas();
  closeModal('novoProjeto');
  
  // Limpar formulário
  document.getElementById('formNovoProjeto').reset();
  
  // Mostrar mensagem de sucesso
  mostrarMensagem('Projeto criado com sucesso!', 'success');
}

// Filtrar projetos
function filtrarProjetos() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const statusFilter = document.getElementById('statusFilter').value;
  const tipoFilter = document.getElementById('tipoFilter').value;
  
  const projetosFiltrados = projetos.filter(projeto => {
    const matchSearch = projeto.nome.toLowerCase().includes(searchTerm) || 
                       projeto.cliente.toLowerCase().includes(searchTerm);
    const matchStatus = !statusFilter || projeto.status === statusFilter;
    const matchTipo = !tipoFilter || projeto.tipo === tipoFilter;
    
    return matchSearch && matchStatus && matchTipo;
  });
  
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = '';
  
  projetosFiltrados.forEach(projeto => {
    const card = criarProjectCard(projeto);
    grid.appendChild(card);
  });
}

// Atualizar estatísticas
function atualizarEstatisticas() {
  const total = projetos.length;
  const andamento = projetos.filter(p => p.status === 'andamento').length;
  const concluidos = projetos.filter(p => p.status === 'concluido').length;
  const atrasados = projetos.filter(p => p.status === 'atrasado').length;
  
  document.getElementById('totalProjetos').textContent = total;
  document.getElementById('projetosAndamento').textContent = andamento;
  document.getElementById('projetosConcluidos').textContent = concluidos;
  document.getElementById('projetosAtrasados').textContent = atrasados;
}

// Funções utilitárias
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatarData(dataString) {
  const data = new Date(dataString);
  return data.toLocaleDateString('pt-BR');
}

function getStatusText(status) {
  const statusMap = {
    'planejamento': 'Planejamento',
    'andamento': 'Em Andamento',
    'concluido': 'Concluído',
    'atrasado': 'Com Atraso'
  };
  return statusMap[status] || status;
}

function getTipoText(tipo) {
  const tipoMap = {
    'residencial': 'Residencial',
    'comercial': 'Comercial',
    'industrial': 'Industrial',
    'infraestrutura': 'Infraestrutura'
  };
  return tipoMap[tipo] || tipo;
}

function getDocumentoIcon(tipo) {
  const iconMap = {
    'pdf': 'fas fa-file-pdf',
    'excel': 'fas fa-file-excel',
    'word': 'fas fa-file-word',
    'cad': 'fas fa-file-code',
    'image': 'fas fa-file-image'
  };
  return iconMap[tipo] || 'fas fa-file';
}

// Modal functions
function openModal(modalId) {
  document.getElementById(modalId).style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Tab functions
function switchTab(tabName) {
  // Remove active class from all tabs and panes
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
  
  // Add active class to selected tab and pane
  event.target.classList.add('active');
  document.getElementById(tabName).classList.add('active');
}

// Funções de interação
function toggleEtapa(etapaId) {
  if (!currentProject) return;
  
  const etapa = currentProject.etapas.find(e => e.id === etapaId);
  if (etapa) {
    etapa.concluida = !etapa.concluida;
    atualizarProgressoProjeto();
    carregarEtapas();
  }
}

function atualizarProgressoProjeto() {
  if (!currentProject) return;
  
  const etapasConcluidas = currentProject.etapas.filter(e => e.concluida).length;
  const totalEtapas = currentProject.etapas.length;
  
  if (totalEtapas > 0) {
    currentProject.progresso = Math.round((etapasConcluidas / totalEtapas) * 100);
  }
}

function adicionarEtapa() {
  const nome = prompt('Nome da etapa:');
  if (!nome) return;
  
  const data = prompt('Data prevista (AAAA-MM-DD):');
  if (!data) return;
  
  const novaEtapa = {
    id: currentProject.etapas.length + 1,
    nome: nome,
    concluida: false,
    data: data
  };
  
  currentProject.etapas.push(novaEtapa);
  carregarEtapas();
  mostrarMensagem('Etapa adicionada com sucesso!', 'success');
}

function adicionarDocumento() {
  const nome = prompt('Nome do documento:');
  if (!nome) return;
  
  const novoDocumento = {
    id: currentProject.documentos.length + 1,
    nome: nome,
    data: new Date().toISOString().split('T')[0],
    tipo: 'pdf'
  };
  
  currentProject.documentos.push(novoDocumento);
  carregarDocumentos();
  mostrarMensagem('Documento adicionado com sucesso!', 'success');
}

function adicionarMembro() {
  const nome = prompt('Nome do membro:');
  if (!nome) return;
  
  const funcao = prompt('Função:');
  if (!funcao) return;
  
  const novoMembro = {
    id: currentProject.equipe.length + 1,
    nome: nome,
    funcao: funcao
  };
  
  currentProject.equipe.push(novoMembro);
  carregarEquipe();
  mostrarMensagem('Membro adicionado com sucesso!', 'success');
}

function removerMembro(membroId) {
  if (!confirm('Tem certeza que deseja remover este membro?')) return;
  
  currentProject.equipe = currentProject.equipe.filter(m => m.id !== membroId);
  carregarEquipe();
  mostrarMensagem('Membro removido com sucesso!', 'success');
}

function downloadDocumento(nome) {
  mostrarMensagem(`Baixando ${nome}...`, 'info');
}

function editarProjeto(projetoId) {
  mostrarMensagem('Função de edição em desenvolvimento', 'info');
}

function mostrarMensagem(mensagem, tipo) {
  // Criar elemento de mensagem
  const mensagemDiv = document.createElement('div');
  mensagemDiv.className = `mensagem mensagem-${tipo}`;
  mensagemDiv.textContent = mensagem;
  
  // Estilo da mensagem
  mensagemDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  
  // Cor conforme tipo
  const cores = {
    success: '#22c55e',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b'
  };
  
  mensagemDiv.style.background = cores[tipo] || cores.info;
  
  document.body.appendChild(mensagemDiv);
  
  // Remover após 3 segundos
  setTimeout(() => {
    mensagemDiv.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(mensagemDiv);
    }, 300);
  }, 3000);
}

// Fechar modal ao clicar fora
window.onclick = function(event) {
  if (event.target.classList.contains('modal')) {
    event.target.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Formatar moeda no input
document.getElementById('orcamento').addEventListener('input', function(e) {
  let value = e.target.value.replace(/[^\d]/g, '');
  if (value) {
    value = (parseFloat(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }
  e.target.value = value;
});

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
