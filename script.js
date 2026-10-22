// Estado global da aplicação
const appState = {
  activeRole: 'paciente', // 'paciente', 'medico', 'admin'
  currentUser: null
};

// Rótulos e textos dinâmicos para a tela de Login
const loginRoleConfig = {
  paciente: {
    label: 'CPF, E-mail ou Cartão SUS',
    placeholder: 'Ex: 123.456.789-00'
  },
  medico: {
    label: 'CPF ou CRM / Matrícula',
    placeholder: 'Ex: CRM/RN 12345'
  },
  admin: {
    label: 'Matrícula do Administrador',
    placeholder: 'Ex: ADM-98765'
  }
};

/* ==========================================================================
   1. GERENCIADOR DE NAVEGAÇÃO ENTRE TELAS
   ========================================================================== */

/**
 * Alterna a visualização da tela ativa
 * @param {string} screenId - ID do elemento <section> que deve ser exibido
 */
function switchScreen(screenId) {
  const screens = document.querySelectorAll('.screen-view');
  
  screens.forEach(screen => {
    screen.classList.remove('active');
  });

  const targetScreen = document.getElementById(screenId);
  if (targetScreen) {
    targetScreen.classList.add('active');
    // Rola até o topo da tela
    const viewport = document.querySelector('.app-viewport');
    if (viewport) viewport.scrollTop = 0;
  }
}

/* ==========================================================================
   2. CONTROLE DO MÓDULO DE AUTENTICAÇÃO (LOGIN)
   ========================================================================== */

/**
 * Seleciona a aba do perfil de login (Paciente, Médico ou Admin)
 * @param {string} role - Identificador do perfil
 * @param {HTMLElement} activeBtn - Botão clicado
 */
function setLoginRole(role, activeBtn) {
  appState.activeRole = role;

  // Atualiza destaque visual das abas
  document.querySelectorAll('.login-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  if (activeBtn) activeBtn.classList.add('active');

  // Atualiza o texto do campo de entrada conforme o perfil
  const label = document.getElementById('lbl-login-input');
  const input = document.getElementById('login-identifier');

  if (label && input && loginRoleConfig[role]) {
    label.innerText = loginRoleConfig[role].label;
    input.placeholder = loginRoleConfig[role].placeholder;
  }
}

/**
 * Processa o envio do formulário de Login
 */
function handleLoginSubmit(event) {
  event.preventDefault();

  // Direciona para o painel correspondente ao perfil selecionado
  switch (appState.activeRole) {
    case 'paciente':
      switchScreen('view-home-paciente');
      break;
    case 'medico':
      switchScreen('view-home-medico');
      break;
    case 'admin':
      switchScreen('view-home-admin');
      break;
    default:
      switchScreen('view-home-paciente');
  }
}

/**
 * Alterna a visualização da palavra-passe (Mostrar/Ocultar)
 */
function togglePasswordVisibility() {
  const pwdInput = document.getElementById('login-password');
  const pwdIcon = document.querySelector('#btn-toggle-pwd i');

  if (pwdInput) {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      if (pwdIcon) pwdIcon.className = 'ph ph-eye-slash';
    } else {
      pwdInput.type = 'password';
      if (pwdIcon) pwdIcon.className = 'ph ph-eye';
    }
  }
}

/* ==========================================================================
   3. AÇÕES DO PAINEL DO MÉDICO
   ========================================================================== */

function iniciarAtendimento() {
  alert('Atendimento iniciado para Ana Paula Costa. Prontuário eletrónico aberto!');
}

function registrarFalta() {
  const confirmacao = confirm('Confirma o registo de falta para este paciente?');
  if (confirmacao) {
    alert('Falta registada com sucesso.');
  }
}

/* ==========================================================================
   4. CHATBOT E ASSISTENTE VIRTUAL
   ========================================================================== */

function abrirAssistenteVirtual() {
  alert('Assistente Virtual Conecta Saúde:\n\nComo posso ajudar com as suas dúvidas sobre vacinação, consultas ou medicamentos?');
}

/* ==========================================================================
   5. INICIALIZAÇÃO DE EVENTOS AO CARREGAR O DOM
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Abas de Perfil na Tela de Login ---
  const tabPaciente = document.getElementById('tab-paciente');
  const tabMedico = document.getElementById('tab-medico');
  const tabAdmin = document.getElementById('tab-admin');

  if (tabPaciente) tabPaciente.addEventListener('click', (e) => setLoginRole('paciente', e.currentTarget));
  if (tabMedico) tabMedico.addEventListener('click', (e) => setLoginRole('medico', e.currentTarget));
  if (tabAdmin) tabAdmin.addEventListener('click', (e) => setLoginRole('admin', e.currentTarget));

  // --- Submissão do Login ---
  const formLogin = document.getElementById('form-login');
  if (formLogin) formLogin.addEventListener('submit', handleLoginSubmit);

  // --- Botão de Biometria ---
  const btnBiometria = document.getElementById('btn-biometria');
  if (btnBiometria) {
    btnBiometria.addEventListener('click', () => {
      handleLoginSubmit(new Event('submit'));
    });
  }

  // --- Visibilidade da Senha ---
  const btnTogglePwd = document.getElementById('btn-toggle-pwd');
  if (btnTogglePwd) btnTogglePwd.addEventListener('click', togglePasswordVisibility);

  // --- Navegação Global (Navegar para Perfil, Agendamento, Logout) ---
  document.querySelectorAll('.nav-logout').forEach(btn => {
    btn.addEventListener('click', () => switchScreen('view-login'));
  });

  document.querySelectorAll('.nav-voltar-home').forEach(btn => {
    btn.addEventListener('click', () => switchScreen('view-home-paciente'));
  });

  document.querySelectorAll('.nav-perfil').forEach(btn => {
    btn.addEventListener('click', () => switchScreen('view-perfil-paciente'));
  });

  document.querySelectorAll('.nav-agendar, #btn-shortcut-agendar').forEach(btn => {
    btn.addEventListener('click', () => switchScreen('view-agendar-consulta'));
  });

  const btnCriarConta = document.getElementById('btn-criar-conta');
  if (btnCriarConta) {
    btnCriarConta.addEventListener('click', () => switchScreen('view-perfil-paciente'));
  }

  // --- Formulário de Endereço/Perfil ---
  const formEndereco = document.getElementById('form-endereco');
  if (formEndereco) {
    formEndereco.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Endereço e informações salvas com sucesso!');
    });
  }

  // --- Ações do Médico ---
  const btnIniciar = document.getElementById('btn-iniciar-atendimento');
  const btnFalta = document.getElementById('btn-registrar-falta');

  if (btnIniciar) btnIniciar.addEventListener('click', iniciarAtendimento);
  if (btnFalta) btnFalta.addEventListener('click', registrarFalta);

  // --- Chatbot ---
  const btnChatbot = document.getElementById('btn-chatbot');
  if (btnChatbot) btnChatbot.addEventListener('click', abrirAssistenteVirtual);

});
