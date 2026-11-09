/* =========================================================
   App Inatel - Reserva de Salas de Estudo
   Projeto Final - S05 Interface Homem-Máquina
   Caroline Ferreira De Souza

   Simula a tarefa completa: login -> busca de salas -> filtros ->
   detalhe -> formulário -> confirmação -> processamento (com
   possível conflito) -> feedback -> acompanhamento, edição,
   cancelamento, notificações e aprovação pelo professor.

   Os dados ficam salvos no navegador (localStorage), então a
   reserva feita pelo aluno aparece para o professor aprovar.
   ========================================================= */

/* ---------------- Logo (mesmo SVG do App Inatel da aula) ---------------- */
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="100 150 390 116" role="img" aria-label="Inatel"><path d="M127.455,156.988h21.287l-21.859,102.835H105.69L127.455,156.988L127.455,156.988z M225.618,208.048 l-10.941,51.775H194.51l9.726-45.911c0.286-1.168,0.477-2.312,0.62-3.456c0.143-1.144,0.214-2.145,0.214-3.027 c0-2.86-0.834-4.982-2.527-6.412c-1.668-1.407-4.147-2.122-7.461-2.122c-5.078,0-9.392,1.406-12.968,4.219 c-3.552,2.836-5.888,6.698-6.96,11.633l-9.559,45.076h-20.31l16.186-75.946h19.905l-2.002,9.559 c3.957-3.886,8.105-6.794,12.491-8.701c4.362-1.907,9.011-2.86,13.945-2.86c6.508,0,11.656,1.501,15.447,4.529 c3.79,3.027,5.697,7.151,5.697,12.372c0,1.239-0.096,2.55-0.286,3.933S226.143,205.855,225.618,208.048L225.618,208.048z  M282.709,222.636c-3.29,1.455-7.318,2.646-12.038,3.6c-4.744,0.954-7.557,1.55-8.438,1.788c-3.218,0.978-5.674,2.526-7.414,4.648 c-1.716,2.122-2.574,4.672-2.574,7.652c0,2.074,0.739,3.719,2.24,4.887c1.478,1.168,3.552,1.74,6.222,1.74 c5.078,0,9.487-1.574,13.206-4.721s6.15-7.342,7.271-12.61L282.709,222.636L282.709,222.636z M306.333,202.613l-9.154,43.145  c-0.238,1.313-0.405,2.432-0.524,3.361s-0.167,1.717-0.167,2.385c0,1.168,0.167,2.098,0.548,2.789 c0.381,0.715,1.049,1.406,2.026,2.098l-0.763,3.432h-21.025c-0.048-0.285-0.143-0.643-0.286-1.119  c-0.381-1.813-0.572-3.076-0.572-3.768c0-0.428,0.048-1,0.119-1.715c0.072-0.74,0.167-1.574,0.31-2.551 c-3.218,3.861-7.032,6.793-11.49,8.818c-4.458,2.027-9.344,3.053-14.708,3.053c-5.721,0-10.274-1.455-13.659-4.338  c-3.361-2.885-5.054-6.771-5.054-11.658c0-9.51,2.574-16.876,7.724-22.097c5.125-5.197,13.206-8.629,24.171-10.25 c1.788-0.287,4.195-0.645,7.271-1.049c10.131-1.168,15.185-4.53,15.185-10.108c0-2.098-0.834-3.623-2.527-4.577 c-1.669-0.954-4.338-1.43-8.033-1.43c-4.195,0-7.581,0.93-10.131,2.813c-2.574,1.883-4.052,4.529-4.481,7.914h-19.166 c1.359-8.2,5.292-14.684,11.824-19.451c6.507-4.768,14.731-7.151,24.672-7.151c8.987,0,15.971,1.454,20.954,4.362 s7.484,6.984,7.484,12.205c0,0.834-0.047,1.668-0.143,2.503C306.642,201.063,306.5,201.874,306.333,202.613L306.333,202.613z M335.081,163.281h20.31l-4.338,20.595h12.634l-3.004,14.303h-12.776l-8.844,42.026c0,0.238-0.048,0.547-0.144,0.93 c-0.095,0.404-0.144,0.668-0.144,0.811c0,1.119,0.549,1.93,1.67,2.406c1.119,0.502,3.051,0.74,5.792,0.74h4.409l-3.289,15.303 c-1.168,0.049-2.717,0.096-4.672,0.145c-3.528,0.094-5.84,0.143-6.913,0.143c-6.508,0-11.18-0.883-14.017-2.646  c-2.837-1.787-4.267-4.672-4.267-8.678c0-1.119,0.118-2.455,0.357-4.051c0.214-1.574,0.596-3.6,1.12-6.08l8.701-41.048h-10.752 l3.004-14.303h10.895L335.081,163.281L335.081,163.281z M432.339,227.213H383.4c-0.167,1.025-0.311,2.026-0.405,3.004  s-0.144,1.835-0.144,2.574c0,4.1,0.978,7.199,2.956,9.297s4.911,3.146,8.772,3.146c3.266,0,6.031-0.668,8.344-1.979 c2.313-1.334,4.434-3.48,6.389-6.46h20.309c-3.576,7.962-8.914,14.208-16.018,18.761c-7.105,4.553-14.994,6.842-23.695,6.842  c-8.63,0-15.424-2.551-20.43-7.676c-5.006-5.127-7.508-12.016-7.508-20.692c0-6.197,1.096-12.609,3.289-19.236 c2.17-6.627,5.077-12.325,8.725-17.092c4.172-5.435,9.059-9.559,14.588-12.348c5.531-2.789,11.633-4.195,18.283-4.195 c8.939,0,15.924,2.36,20.955,7.104c5.029,4.72,7.531,11.275,7.531,19.666c0,2.193-0.213,4.696-0.666,7.534 C434.246,218.322,433.458,222.232,432.339,227.213L432.339,227.213z M414.46,213.912c0.143-1.119,0.262-2.098,0.334-2.955  c0.07-0.858,0.096-1.55,0.096-2.05c0-3.385-0.979-6.031-2.957-7.914s-4.768-2.813-8.344-2.813c-4.146,0-7.676,1.335-10.607,4.005 s-5.172,6.579-6.697,11.728H414.46L414.46,213.912z M461.826,156.988h20.311l-21.932,102.835h-20.262L461.826,156.988 L461.826,156.988z"/></svg>`;

/* ---------------- Dados fixos (classes do diagrama) ---------------- */
// Usuario {abstract} -> Aluno / Professor
const USUARIOS = {
  '1234': { matricula: '1234', senha: 'inatel', nome: 'Ana Souza', tipo: 'aluno', curso: 'Engenharia de Software', periodo: 5, email: 'ana.souza@ges.inatel.br' },
  '9999': { matricula: '9999', senha: 'inatel', nome: 'Ricardo Alves', tipo: 'professor', departamento: 'Departamento de Software', email: 'ricardo.alves@inatel.br' }
};
const OUTROS_ALUNOS = { '2210': 'João Pedro Costa', '2315': 'Beatriz Lima', '2402': 'Lucas Martins' };

// Recurso
const RECURSOS = {
  quadro:     { nome: 'Quadro branco', icone: 'border_color' },
  tv:         { nome: 'TV',            icone: 'tv' },
  projetor:   { nome: 'Projetor',      icone: 'videocam' },
  tomadas:    { nome: 'Tomadas',       icone: 'power' },
  computador: { nome: 'Computador',    icone: 'computer' }
};
const FILTRO_RECURSOS = [
  { id: 'quadro', nome: 'Quadro', icone: 'border_color', tem: s => s.recursos.quadro },
  { id: 'tela', nome: 'Projetor/TV', icone: 'tv', tem: s => s.recursos.tv || s.recursos.projetor },
  { id: 'tomadas', nome: 'Tomadas', icone: 'power', tem: s => s.recursos.tomadas },
  { id: 'computador', nome: 'Computador', icone: 'computer', tem: s => s.recursos.computador }
];

// Sala
const FOTO = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=640&h=420&q=70`;
const SALAS = [
  { id: 1, nome: 'Sala de Estudo 1', bloco: 'A', andar: '1º andar', capacidade: 8,  recursos: { quadro: 1, tomadas: 8, tv: 1 }, foto: FOTO('photo-1517502884422-41eaead166d4') },
  { id: 2, nome: 'Sala de Estudo 2', bloco: 'A', andar: '2º andar', capacidade: 10, recursos: { quadro: 2, tomadas: 10, projetor: 1 }, foto: FOTO('photo-1497366216548-37526070297c') },
  { id: 3, nome: 'Sala de Estudo 3', bloco: 'B', andar: '2º andar', capacidade: 6,  recursos: { quadro: 1, tomadas: 6, tv: 1 }, foto: FOTO('photo-1522202176988-66273c2fd55f') },
  { id: 4, nome: 'Sala de Estudo 4', bloco: 'B', andar: '1º andar', capacidade: 4,  recursos: { quadro: 1, tomadas: 4, computador: 2 }, foto: FOTO('photo-1524758631624-e2822e304c36') },
  { id: 5, nome: 'Sala de Estudo 5', bloco: 'C', andar: 'Térreo',   capacidade: 4,  recursos: { quadro: 1, tomadas: 4 }, foto: FOTO('photo-1523240795612-9a054b0db644') },
  { id: 6, nome: 'Sala de Estudo 6', bloco: 'C', andar: '1º andar', capacidade: 6,  recursos: { tomadas: 6, computador: 4, projetor: 1 }, foto: FOTO('photo-1497366811353-6870744d04b2') },
  { id: 7, nome: 'Sala de Estudo 7', bloco: 'D', andar: 'Térreo',   capacidade: 8,  recursos: { quadro: 1, tomadas: 8, tv: 1 }, foto: FOTO('photo-1556761175-b413da4baf72') },
  { id: 8, nome: 'Sala de Estudo 8', bloco: 'D', andar: '1º andar', capacidade: 12, recursos: { quadro: 2, tomadas: 12, projetor: 1, computador: 1 }, foto: FOTO('photo-1531482615713-2afd69097998') }
];
const BLOCOS = ['A', 'B', 'C', 'D'];
const ABRE = 8, FECHA = 22;          // salas abertas das 08:00 às 22:00
const DURACAO_MAX = 3;               // regra: no máximo 3 h por reserva
const LIMITE_ATIVAS = 3;             // regra: aluno tem no máx. 3 reservas ativas
const PESSOAS_APROVACAO = 5;         // regra: 5+ pessoas precisa do professor
const CANCELA_ATE_MIN = 60;          // regra: cancelar até 1 h antes
const TEMPO_CONFIRMACAO = 5000;      // simula o processamento da confirmação

/* ---------------- Utilidades de data ---------------- */
const SEM = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const pad = n => String(n).padStart(2, '0');
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const deIso = s => { const [a, m, d] = s.split('-').map(Number); return new Date(a, m - 1, d); };
const hh = h => `${pad(h)}:00`;
const fmtData = s => { const d = deIso(s); return `${SEM[d.getDay()]}, ${pad(d.getDate())}/${pad(d.getMonth() + 1)}`; };
const fmtDataLonga = s => `${fmtData(s)}/${deIso(s).getFullYear()}`;
const hojeIso = () => iso(new Date());
const inicioReserva = r => { const d = deIso(r.data); d.setHours(r.ini, 0, 0, 0); return d; };
const fimReserva = r => { const d = deIso(r.data); d.setHours(r.fim, 0, 0, 0); return d; };
const fmtHora = ts => { const d = new Date(ts); return `${pad(d.getHours())}:${pad(d.getMinutes())}`; };
function fmtQuando(ts) {
  const d = new Date(ts), hoje = hojeIso(), dia = iso(d);
  if (dia === hoje) return fmtHora(ts);
  const ontem = new Date(); ontem.setDate(ontem.getDate() - 1);
  if (dia === iso(ontem)) return 'ontem';
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}`;
}
function fmtFalta(min) {
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60), m = min % 60;
  if (h < 24) return m ? `${h} h ${m} min` : `${h} h`;
  const d = Math.floor(h / 24);
  return d === 1 ? '1 dia' : `${d} dias`;
}
// próximos 5 dias de funcionamento (sem domingo)
function diasDisponiveis() {
  const lista = [], d = new Date();
  if (d.getHours() >= FECHA - 1) d.setDate(d.getDate() + 1);
  while (lista.length < 5) {
    if (d.getDay() !== 0) lista.push(iso(d));
    d.setDate(d.getDate() + 1);
  }
  return lista;
}
// horário já passou?
function passou(data, h) {
  const agora = new Date();
  if (data < iso(agora)) return true;
  if (data > iso(agora)) return false;
  return h < agora.getHours() + (agora.getMinutes() > 0 ? 1 : 0);
}
function primeiraHoraLivreHoje(data) {
  for (let h = ABRE; h < FECHA; h++) if (!passou(data, h)) return h;
  return ABRE;
}

/* ---------------- Estado (salvo no navegador) ---------------- */
const CHAVE = 'inatel-reserva-salas-v1';
let state;
let ui = { tela: 'login', params: {}, pilha: [], voltar: false };

function carregar() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (salvo && salvo.versao === 1) { state = salvo; return; }
  } catch (e) { /* sem storage: segue com dados novos */ }
  state = estadoInicial();
}
function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(state)); } catch (e) { /* ignora */ }
}

function estadoInicial() {
  const dias = diasDisponiveis();
  const passado = n => { const d = new Date(); d.setDate(d.getDate() - n); return iso(d); };
  const agora = Date.now();
  const H = (n) => agora - n * 3600e3;
  const st = {
    versao: 1, sessao: null, tema: 'inatel', seq: 1046, conflitoSimulado: false,
    favoritos: [3], bloqueios: [], reservas: [], notifs: []
  };
  const r = (o) => st.reservas.push(Object.assign({ motivo: '', lembrete: true, turma: false, avaliacao: null, historico: [] }, o));
  // Reservas da Ana (aluna)
  r({ id: 1042, usuario: '1234', salaId: 3, data: dias[1], ini: 14, fim: 16, pessoas: 3, status: 'CONFIRMADA', motivo: 'Estudo para a prova de IHM',
      historico: [{ status: 'PENDENTE', em: H(26), txt: 'Reserva enviada' }, { status: 'CONFIRMADA', em: H(25.9), txt: 'Confirmada pelo sistema' }] });
  r({ id: 1038, usuario: '1234', salaId: 1, data: passado(6), ini: 8, fim: 10, pessoas: 4, status: 'CONCLUIDA',
      historico: [{ status: 'PENDENTE', em: H(170), txt: 'Reserva enviada' }, { status: 'CONFIRMADA', em: H(169.9), txt: 'Confirmada pelo sistema' }, { status: 'CONCLUIDA', em: H(140), txt: 'Reserva concluída' }] });
  r({ id: 1035, usuario: '1234', salaId: 2, data: passado(12), ini: 16, fim: 17, pessoas: 2, status: 'CANCELADA',
      historico: [{ status: 'PENDENTE', em: H(300), txt: 'Reserva enviada' }, { status: 'CONFIRMADA', em: H(299.9), txt: 'Confirmada pelo sistema' }, { status: 'CANCELADA', em: H(290), txt: 'Cancelada por você: mudança de planos' }] });
  // Pedidos de grupo aguardando o professor
  r({ id: 1043, usuario: '2210', salaId: 3, data: dias[2], ini: 14, fim: 16, pessoas: 5, status: 'PENDENTE', motivo: 'Grupo - IHM Lab', historico: [{ status: 'PENDENTE', em: H(3), txt: 'Reserva enviada' }] });
  r({ id: 1044, usuario: '2315', salaId: 1, data: dias[3], ini: 10, fim: 12, pessoas: 6, status: 'PENDENTE', motivo: 'Monitoria C04', historico: [{ status: 'PENDENTE', em: H(5), txt: 'Reserva enviada' }] });
  r({ id: 1045, usuario: '2402', salaId: 2, data: dias[4], ini: 18, fim: 20, pessoas: 8, status: 'PENDENTE', motivo: 'Revisão P2', historico: [{ status: 'PENDENTE', em: H(20), txt: 'Reserva enviada' }] });

  const n = (o) => st.notifs.push(Object.assign({ id: Math.random().toString(36).slice(2), lida: false }, o));
  n({ usuario: '1234', tipo: 'confirmada', titulo: 'Reserva confirmada', texto: `Sala de Estudo 3 · ${fmtData(dias[1])} às 14:00.`, em: H(25.9), reservaId: 1042 });
  n({ usuario: '1234', tipo: 'concluida', titulo: 'Reserva concluída', texto: 'Como foi a Sala de Estudo 1? Avalie a sala.', em: H(140), reservaId: 1038, lida: true });
  n({ usuario: '1234', tipo: 'cancelada', titulo: 'Reserva cancelada', texto: 'Sala de Estudo 2 foi liberada para outros alunos.', em: H(290), reservaId: 1035, lida: true });
  n({ usuario: '9999', tipo: 'pedido', titulo: '3 pedidos aguardando aprovação', texto: 'Reservas de grupo da turma precisam da sua aprovação.', em: H(3) });
  return st;
}

/* ---------------- Regras de negócio (métodos do diagrama) ---------------- */
const usuario = () => USUARIOS[state.sessao];
const sala = id => SALAS.find(s => s.id === id);
const nomeDe = mat => (USUARIOS[mat] && USUARIOS[mat].nome) || OUTROS_ALUNOS[mat] || 'Aluno';
const ativa = r => r.status === 'PENDENTE' || r.status === 'CONFIRMADA';

// ocupação de fundo (outros usuários do Inatel), determinística por sala/dia/hora
function ocupadoBase(salaId, data, h) {
  const n = Number(data.replace(/-/g, '')) % 97;
  return (salaId * 13 + n * 7 + h * 5) % 11 < 3;
}
// Sala.verificarDisponibilidade(data, hora)
function horaLivre(salaId, data, h, ignorarId) {
  if (h < ABRE || h >= FECHA || passou(data, h)) return false;
  if (ocupadoBase(salaId, data, h)) return false;
  if (state.bloqueios.some(b => b.salaId === salaId && b.data === data && h >= b.ini && h < b.fim)) return false;
  return !state.reservas.some(r => r.id !== ignorarId && ativa(r) && r.salaId === salaId && r.data === data && h >= r.ini && h < r.fim);
}
function verificarDisponibilidade(salaId, data, ini, fim, ignorarId) {
  for (let h = ini; h < fim; h++) if (!horaLivre(salaId, data, h, ignorarId)) return false;
  return true;
}
// primeiro horário, depois do pedido, em que a sala fica livre pela duração toda
function livreAs(salaId, data, aPartir, dur = 1) {
  for (let h = aPartir + 1; h + dur <= FECHA; h++) if (verificarDisponibilidade(salaId, data, h, h + dur)) return h;
  return null;
}
// janelas livres numa sala com a mesma duração
function janelasLivres(salaId, data, dur, ignorarId) {
  const lista = [];
  for (let h = ABRE; h + dur <= FECHA; h++) if (verificarDisponibilidade(salaId, data, h, h + dur, ignorarId)) lista.push(h);
  return lista;
}
const minhasReservas = () => state.reservas.filter(r => r.usuario === state.sessao);
const precisaAprovacao = (pessoas) => usuario().tipo === 'aluno' && pessoas >= PESSOAS_APROVACAO;

// Notificacao.enviar()
function notificar(usuarioMat, tipo, titulo, texto, reservaId) {
  const nt = { id: Math.random().toString(36).slice(2), usuario: usuarioMat, tipo, titulo, texto, em: Date.now(), lida: false, reservaId };
  state.notifs.unshift(nt);
  salvar();
  if (usuarioMat === state.sessao) {
    toast(`<b>${titulo}</b><br>${texto}`, 'info', reservaId ? { rotulo: 'Ver', fn: () => { nt.lida = true; salvar(); ir('reserva', { id: reservaId }); } } : null, 'notifications_active');
    desenharCabecalho();
  }
}
const naoLidas = () => state.notifs.filter(n => n.usuario === state.sessao && !n.lida).length;

function mudarStatus(r, status, txt) {
  r.status = status;
  r.historico.push({ status, em: Date.now(), txt });
  salvar();
}

// Reserva.confirmar() automática (simula o servidor)
const timers = {};
function agendarConfirmacao(r) {
  if (timers[r.id]) return;
  const espera = Math.max(500, TEMPO_CONFIRMACAO - (Date.now() - r.criadaEm));
  timers[r.id] = setTimeout(() => {
    delete timers[r.id];
    const atual = state.reservas.find(x => x.id === r.id);
    if (!atual || atual.status !== 'PENDENTE') return;
    mudarStatus(atual, 'CONFIRMADA', 'Confirmada pelo sistema');
    notificar(atual.usuario, 'confirmada', 'Reserva confirmada', `${sala(atual.salaId).nome} · ${fmtData(atual.data)} às ${hh(atual.ini)}.`, atual.id);
    if (['sucesso', 'reserva', 'minhas', 'inicio'].includes(ui.tela)) render();
  }, espera);
}

// rotina que roda a cada 20 s: concluir, expirar e lembrar
function rotina() {
  if (!state) return;
  const agora = Date.now();
  let mudou = false;
  state.reservas.forEach(r => {
    if (r.status === 'CONFIRMADA' && fimReserva(r) <= agora) {
      mudarStatus(r, 'CONCLUIDA', 'Reserva concluída'); mudou = true;
      notificar(r.usuario, 'concluida', 'Reserva concluída', `Como foi a ${sala(r.salaId).nome}? Avalie a sala.`, r.id);
    } else if (r.status === 'PENDENTE' && inicioReserva(r) <= agora) {
      mudarStatus(r, 'CANCELADA', 'Expirou sem aprovação'); mudou = true;
    } else if (r.status === 'CONFIRMADA' && r.lembrete && !r.lembrado) {
      const falta = (inicioReserva(r) - agora) / 60000;
      if (falta <= 15 && falta > 0) {
        r.lembrado = true; mudou = true;
        notificar(r.usuario, 'lembrete', 'Lembrete', `Sua reserva na ${sala(r.salaId).nome} começa em ${Math.ceil(falta)} minutos.`, r.id);
      }
    }
    if (r.status === 'PENDENTE' && r.automatica) agendarConfirmacao(r);
  });
  if (mudou) { salvar(); if (ui.tela !== 'login') render(); }
}

/* ---------------- Navegação ---------------- */
function ir(tela, params = {}, opcoes = {}) {
  fecharCamada();
  if (!opcoes.substituir && ui.tela !== tela) ui.pilha.push({ tela: ui.tela, params: ui.params });
  if (opcoes.raiz) ui.pilha = [];
  ui.tela = tela; ui.params = params; ui.voltar = false;
  render();
  window.scrollTo({ top: 0 });
}
function voltar() {
  fecharCamada();
  const ant = ui.pilha.pop();
  if (!ant) return ir('inicio', {}, { raiz: true });
  ui.tela = ant.tela; ui.params = ant.params; ui.voltar = true;
  render();
  window.scrollTo({ top: 0 });
}

/* ---------------- Filtros da busca ---------------- */
let filtros = null;
function filtrosPadrao() {
  const dias = diasDisponiveis();
  const ini = Math.min(primeiraHoraLivreHoje(dias[0]), FECHA - 2);
  return { data: dias[0], ini, fim: Math.min(ini + 2, FECHA), blocos: [], capMin: 1, recursos: [], busca: '' };
}
function salaPassaFiltros(s, f, ignorarBusca) {
  if (!ignorarBusca && f.busca) {
    const t = f.busca.toLowerCase().trim();
    if (!(`${s.nome} bloco ${s.bloco}`.toLowerCase().includes(t))) return false;
  }
  if (f.blocos.length && !f.blocos.includes(s.bloco)) return false;
  if (s.capacidade < f.capMin) return false;
  return f.recursos.every(id => FILTRO_RECURSOS.find(x => x.id === id).tem(s));
}
function buscarSalas(f) {
  const candidatas = SALAS.filter(s => salaPassaFiltros(s, f));
  const livres = candidatas.filter(s => verificarDisponibilidade(s.id, f.data, f.ini, f.fim));
  const ocupadas = candidatas.filter(s => !livres.includes(s));
  return { livres, ocupadas };
}
const qtdFiltrosExtras = f => f.blocos.length + f.recursos.length + (f.capMin > 1 ? 1 : 0);

/* ---------------- Componentes ---------------- */
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const ic = (nome, cls = '') => `<span class="material-symbols-outlined ${cls}" aria-hidden="true">${nome}</span>`;
const STATUS = {
  PENDENTE: { txt: 'PENDENTE', cls: 'alerta' },
  CONFIRMADA: { txt: 'CONFIRMADA', cls: 'ok' },
  CONCLUIDA: { txt: 'CONCLUÍDA', cls: 'cinza' },
  CANCELADA: { txt: 'CANCELADA', cls: 'erro' },
  RECUSADA: { txt: 'RECUSADA', cls: 'erro' }
};
const pillStatus = st => `<span class="pill ${STATUS[st].cls}">${STATUS[st].txt}</span>`;
function listaRecursos(s, comQtd) {
  return `<div class="recursos">${Object.entries(s.recursos).map(([k, q]) =>
    `<span>${ic(RECURSOS[k].icone)}${RECURSOS[k].nome}${comQtd ? ` (${q})` : ''}</span>`).join('')}</div>`;
}
function foto(s, cls) {
  return `<img class="${cls}" src="${s.foto}" alt="Foto da ${s.nome}" onerror="this.style.visibility='hidden'">`;
}
function progresso(r) {
  const etapas = ['Pendente', 'Confirmada', 'Concluída'];
  const idx = { PENDENTE: 0, CONFIRMADA: 1, CONCLUIDA: 2 }[r.status];
  if (r.status === 'CANCELADA' || r.status === 'RECUSADA') {
    return `<div class="progresso"><div class="etapa feita"><div class="bola">${ic('check')}</div>Pendente</div>
      <div class="etapa cancel"><div class="bola">${ic('close')}</div>${r.status === 'RECUSADA' ? 'Recusada' : 'Cancelada'}</div></div>`;
  }
  return `<div class="progresso">${etapas.map((e, i) => {
    const cls = i < idx || (i === idx && r.status === 'CONCLUIDA') ? 'feita' : i === idx ? (i === 0 ? 'atual' : 'feita') : '';
    return `<div class="etapa ${cls}"><div class="bola">${cls === 'feita' ? ic('check') : cls === 'atual' ? ic('hourglass_top') : ''}</div>${e}</div>`;
  }).join('')}</div>`;
}
function textoSituacao(r) {
  const agora = Date.now();
  if (r.status === 'PENDENTE') return r.automatica === false || r.pessoas >= PESSOAS_APROVACAO && USUARIOS[r.usuario]?.tipo !== 'professor'
    ? `${ic('pending_actions')} Aguardando aprovação do professor` : `${ic('sync')} Aguardando confirmação`;
  if (r.status === 'CONFIRMADA') {
    const ini = inicioReserva(r), fim = fimReserva(r);
    if (ini <= agora && fim > agora) return `${ic('meeting_room')} Acontecendo agora`;
    return `${ic('schedule')} Começa em ${fmtFalta(Math.round((ini - agora) / 60000))}`;
  }
  return '';
}

/* ---------------- Cabeçalho ---------------- */
function cabecalho() {
  const t = ui.tela;
  const sino = `<button class="icon-btn" data-acao="notificacoes" aria-label="Notificações (${naoLidas()} não lidas)">${ic('notifications')}${naoLidas() ? `<span class="badge">${naoLidas()}</span>` : ''}</button>`;
  const menu = `<button class="icon-btn" data-acao="menu" aria-label="Abrir menu">${ic('menu')}</button>`;
  const back = `<button class="icon-btn" data-acao="voltar" aria-label="Voltar">${ic('arrow_back')}</button>`;
  const fechar = `<button class="icon-btn" data-acao="fecharForm" aria-label="Fechar">${ic('close')}</button>`;
  if (t === 'inicio') return `${menu}<div class="logo">${LOGO}</div>${sino}`;
  const titulos = {
    salas: 'Reserva de salas', minhas: 'Minhas reservas', notificacoes: 'Notificações', aprovar: 'Aprovar reservas',
    form: ui.params.editarId ? `Editar reserva #${ui.params.editarId}` : 'Nova reserva', conflito: 'Nova reserva', sucesso: 'Reserva',
    sala: sala(ui.params.id)?.nome, reserva: `Reserva #${ui.params.id}`
  };
  const esquerda = ['minhas', 'aprovar'].includes(t) ? menu : ['form', 'conflito'].includes(t) ? fechar : t === 'sucesso' ? `<button class="icon-btn" data-acao="inicio" aria-label="Início">${ic('home')}</button>` : back;
  let direita = sino;
  if (t === 'sala') {
    const fav = state.favoritos.includes(ui.params.id);
    direita = `<button class="icon-btn" data-acao="favorito" aria-label="${fav ? 'Remover dos' : 'Adicionar aos'} favoritos">${ic('favorite', fav ? 'fill' : '')}</button>`;
  }
  if (t === 'notificacoes') direita = `<button class="link" data-acao="marcarTodas">Marcar todas</button>`;
  if (['form', 'conflito'].includes(t)) direita = '<span style="width:42px"></span>';
  return `${esquerda}<div class="titulo">${esc(titulos[t] || '')}</div>${direita}`;
}
function desenharCabecalho() {
  const h = document.querySelector('.header');
  if (h) h.innerHTML = cabecalho();
}

/* ---------------- Render principal ---------------- */
const app = document.getElementById('app');
function render() {
  document.documentElement.dataset.tema = state.tema;
  if (!state.sessao) ui.tela = 'login';
  if (ui.tela === 'login') { app.innerHTML = telaLogin(); return; }
  const tela = TELAS[ui.tela] || TELAS.inicio;
  const chave = ui.tela + JSON.stringify(ui.params);
  const animar = chave !== render.ultima;
  render.ultima = chave;
  app.innerHTML = `<header class="header">${cabecalho()}</header><main class="view ${animar ? (ui.voltar ? 'voltar' : '') : 'estatico'}" id="view">${tela()}</main>`;
  ui.voltar = false;
  posRender();
}
let posRenderFns = [];
function posRender() { posRenderFns.forEach(f => f()); posRenderFns = []; }

/* ======================= TELA 1 - LOGIN ======================= */
let loginErros = {};
function telaLogin() {
  return `<div class="login">
    <div class="logo" style="text-align:center">${LOGO}</div>
    <div class="sub">App Inatel · entre com sua matrícula</div>
    <form id="formLogin" novalidate>
      <div class="campo">
        <label for="mat">Matrícula</label>
        <div class="input-icone">${ic('badge')}
          <input class="input ${loginErros.mat ? 'invalido' : ''}" id="mat" name="mat" inputmode="numeric" autocomplete="username" placeholder="Ex.: 1234" maxlength="8">
        </div>
        ${loginErros.mat ? `<div class="erro-msg">${ic('error')}${loginErros.mat}</div>` : ''}
      </div>
      <div class="campo">
        <label for="senha">Senha</label>
        <div class="input-icone">${ic('lock')}
          <input class="input ${loginErros.senha ? 'invalido' : ''}" id="senha" name="senha" type="password" autocomplete="current-password" placeholder="Sua senha">
          <button type="button" class="material-symbols-outlined olho" data-acao="verSenha" aria-label="Mostrar senha">visibility</button>
        </div>
        ${loginErros.senha ? `<div class="erro-msg">${ic('error')}${loginErros.senha}</div>` : ''}
      </div>
      <label class="check"><input type="checkbox" id="manter" checked> Manter conectado</label>
      <button class="btn bloco" id="btnEntrar" type="submit" style="margin-top:8px">ENTRAR</button>
      <div style="text-align:center;margin-top:10px"><button type="button" class="link" data-acao="esqueci">Esqueci minha senha</button></div>
    </form>
    <div class="demo">
      <div class="linha" style="font-weight:bold;font-size:13px">${ic('science')} Acesso de demonstração</div>
      <div class="muted">Aluna: matrícula <b>1234</b> · Professor: matrícula <b>9999</b> · senha <b>inatel</b></div>
      <div class="acoes"><button class="btn sec peq" data-acao="demo" data-mat="1234">Entrar como aluna</button><button class="btn sec peq" data-acao="demo" data-mat="9999">Entrar como professor</button></div>
    </div>
  </div>`;
}
// Usuario.autenticar()
function autenticar(mat, senha, manter) {
  const erros = {};
  if (!mat) erros.mat = 'Informe sua matrícula.';
  else if (!/^\d+$/.test(mat)) erros.mat = 'A matrícula tem apenas números.';
  if (!senha) erros.senha = 'Informe sua senha.';
  const btn = document.getElementById('btnEntrar');
  if (Object.keys(erros).length) { loginErros = erros; mostrarLogin(mat, senha); return; }
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Entrando...';
  setTimeout(() => {
    const u = USUARIOS[mat];
    if (!u || u.senha !== senha) {
      loginErros = { senha: 'Matrícula ou senha inválida.' };
      mostrarLogin(mat, '');
      document.querySelector('.login form').classList.add('shake');
      return;
    }
    loginErros = {};
    state.sessao = mat; state.manter = manter; salvar();
    filtros = filtrosPadrao();
    ui.pilha = [];
    ir('inicio', {}, { raiz: true, substituir: true });
    toast(`Bem-vindo(a), ${u.nome.split(' ')[0]}!`, 'ok', null, 'waving_hand');
    rotina();
  }, 900);
}
function mostrarLogin(mat, senha) {
  app.innerHTML = telaLogin();
  document.getElementById('mat').value = mat || '';
  document.getElementById('senha').value = senha || '';
  (loginErros.mat ? document.getElementById('mat') : document.getElementById('senha')).focus();
}

/* ======================= TELA 2 - INÍCIO ======================= */
function telaInicio() {
  const u = usuario();
  const proximas = minhasReservas().filter(r => ativa(r)).sort((a, b) => inicioReserva(a) - inicioReserva(b));
  const prox = proximas[0];
  const pendentesProf = state.reservas.filter(r => r.status === 'PENDENTE' && USUARIOS[r.usuario]?.tipo !== 'professor' && r.pessoas >= PESSOAS_APROVACAO).length;
  return `
    <div class="card">
      <div class="saudacao">Olá, ${esc(u.nome.split(' ')[0])}!</div>
      <div class="muted">${u.tipo === 'aluno' ? `${u.curso} · ${u.periodo}º período` : `Professor · ${u.departamento}`}</div>
    </div>
    <div class="card" style="background:var(--cor-click);color:#fff">
      <div class="entre">
        <div><h3 style="color:#fff">Reservar sala de estudo</h3><div style="font-size:12.5px;opacity:.9">Encontre uma sala livre agora</div></div>
        ${ic('meeting_room', 'fill" style="font-size:40px;color:#fff;opacity:.9')}
      </div>
      <button class="btn bloco" style="background:#fff;color:var(--cor-click);border-color:#fff;margin-top:14px" data-acao="verSalas">${ic('search')} VER SALAS</button>
    </div>
    ${u.tipo === 'professor' ? `
    <div class="card clicavel" data-acao="aprovar">
      <div class="entre"><div><h3>Pedidos da turma</h3><div class="muted">${pendentesProf ? `${pendentesProf} reserva(s) de grupo aguardando sua aprovação` : 'Nenhum pedido pendente'}</div></div>
      ${pendentesProf ? `<span class="pill alerta">${pendentesProf}</span>` : ic('task_alt')}</div>
    </div>` : ''}
    <div class="secao">Próxima reserva</div>
    ${prox ? `
    <div class="card clicavel" data-acao="abrirReserva" data-id="${prox.id}">
      <div class="entre"><h3>${sala(prox.salaId).nome}</h3>${pillStatus(prox.status)}</div>
      <div class="muted">Bloco ${sala(prox.salaId).bloco} · ${fmtData(prox.data)} · ${hh(prox.ini)}–${hh(prox.fim)}</div>
      <div class="muted linha" style="margin-top:8px;color:var(--cor-click);font-weight:bold">${textoSituacao(prox)}</div>
    </div>` : `
    <div class="card"><div class="linha">${ic('event_available')}<div class="muted">Você não tem reservas futuras. Que tal reservar uma sala para estudar?</div></div></div>`}
    <div class="secao">Aulas de hoje</div>
    <div class="card"><h3>S05 - Interface Homem-máquina</h3><div class="muted">Local e Horário: <b>P1-S17 - 10:00</b></div>
      <div class="aula-tags"><span class="pill">FALTAS: 2/25</span><span class="pill ok">CR: 9,1</span></div></div>
    <div class="card"><h3>E01 - Circuitos Elétricos em CC</h3><div class="muted">Local e Horário: <b>P1-S12 - 13:30</b></div>
      <div class="aula-tags"><span class="pill">FALTAS: 4/25</span><span class="pill ok">CR: 7,8</span></div></div>`;
}

/* ======================= TELA 3 - MENU LATERAL ======================= */
function abrirMenu() {
  const u = usuario();
  const item = (acao, icone, txt, tela, extra = '') => `<button class="item-menu ${ui.tela === tela ? 'ativo' : ''}" data-acao="${acao}">${ic(icone)}${txt}${extra}</button>`;
  const iniciais = u.nome.split(' ').map(p => p[0]).slice(0, 2).join('');
  abrirCamada(`<div class="scrim" data-acao="fecharCamada"></div>
    <aside class="drawer" role="dialog" aria-label="Menu">
      <div class="topo"><div class="avatar">${iniciais}</div><b>${esc(u.nome)}</b><div style="font-size:12.5px;opacity:.85">Mat. ${u.matricula} · ${u.tipo === 'aluno' ? 'Aluna' : 'Professor'}</div></div>
      <nav>
        ${item('inicio', 'home', 'Início', 'inicio')}
        ${item('verSalas', 'meeting_room', 'Reserva de salas', 'salas')}
        ${item('minhas', 'event_note', 'Minhas reservas', 'minhas')}
        ${u.tipo === 'professor' ? item('aprovar', 'fact_check', 'Aprovar reservas', 'aprovar') : ''}
        ${item('notificacoes', 'notifications', 'Notificações', 'notificacoes', naoLidas() ? `<span class="badge">${naoLidas()}</span>` : '')}
        ${item('tema', state.tema === 'escuro' ? 'light_mode' : 'dark_mode', state.tema === 'escuro' ? 'Tema Inatel (claro)' : 'Tema escuro', '-')}
        ${item('reiniciar', 'restart_alt', 'Reiniciar demonstração', '-')}
      </nav>
      <div class="rodape"><button class="item-menu sair" data-acao="sair">${ic('logout')}Sair</button></div>
    </aside>`);
}

/* ======================= TELAS 4 e 13 - LISTA / SEM RESULTADOS ======================= */
let carregandoLista = false;
function telaSalas() {
  const f = filtros;
  const extras = qtdFiltrosExtras(f);
  const topo = `
    <div class="campo input-icone" style="margin-bottom:10px">${ic('search')}
      <input class="input" id="busca" placeholder="Buscar sala ou bloco" value="${esc(f.busca)}" aria-label="Buscar sala ou bloco" autocomplete="off">
    </div>
    <div class="chips">
      <button class="chip ativo" data-acao="filtros">${ic('calendar_today')}${f.data === hojeIso() ? 'Hoje' : fmtData(f.data)}</button>
      <button class="chip ativo" data-acao="filtros">${ic('schedule')}${hh(f.ini)}–${hh(f.fim)}</button>
      <button class="chip ${f.blocos.length ? 'ativo' : ''}" data-acao="filtros">${ic('apartment')}${f.blocos.length ? 'Bloco ' + f.blocos.join(', ') : 'Bloco'} ▾</button>
      <button class="chip ${extras ? 'ativo' : ''}" data-acao="filtros">${ic('tune')}Filtros${extras ? ` (${extras})` : ''}</button>
    </div>`;
  if (carregandoLista) {
    return topo + `<div class="contador">Buscando salas...</div>` + [1, 2, 3].map(() =>
      `<div class="card sala-card"><div class="skeleton" style="width:92px;height:92px"></div><div><div class="skeleton" style="height:16px;width:70%;margin:6px 0 10px"></div><div class="skeleton" style="height:12px;width:50%;margin-bottom:8px"></div><div class="skeleton" style="height:12px;width:85%"></div></div></div>`).join('');
  }
  const { livres, ocupadas } = buscarSalas(f);
  if (!livres.length) return topo + semResultados(ocupadas);
  return topo + `
    <div class="contador"><b>${livres.length} ${livres.length === 1 ? 'sala disponível' : 'salas disponíveis'}</b> · ${fmtData(f.data)}, ${hh(f.ini)}–${hh(f.fim)}</div>
    ${livres.map(s => cardSala(s, true)).join('')}
    ${ocupadas.length ? `<div class="secao">Ocupadas nesse horário</div>${ocupadas.map(s => cardSala(s, false)).join('')}` : ''}`;
}
function cardSala(s, livre) {
  const libera = !livre && livreAs(s.id, filtros.data, filtros.ini, filtros.fim - filtros.ini);
  return `<div class="card clicavel sala-card ${livre ? '' : 'ocupada'}" data-acao="abrirSala" data-id="${s.id}" role="button" tabindex="0" aria-label="${s.nome}, ${livre ? 'livre' : 'ocupada'}">
    ${foto(s, 'sala-foto')}
    <div style="min-width:0">
      <div class="entre"><h3>${s.nome}</h3>${livre ? '<span class="pill ok">LIVRE</span>' : '<span class="pill erro">OCUPADA</span>'}</div>
      <div class="muted">Bloco ${s.bloco} · até ${s.capacidade} pessoas${!livre ? (libera ? ` · livre às ${hh(libera)}` : ' · sem horário livre no dia') : ''}</div>
      ${listaRecursos(s)}
    </div>
  </div>`;
}
function semResultados(ocupadas) {
  const f = filtros;
  // sugestões: mesmo horário sem os filtros de bloco/recursos, ou a sala filtrada em outro horário
  const sug = [];
  SALAS.filter(s => s.capacidade >= f.capMin && !sug.find(x => x.s.id === s.id)).forEach(s => {
    if (verificarDisponibilidade(s.id, f.data, f.ini, f.fim)) sug.push({ s, data: f.data, ini: f.ini, fim: f.fim });
  });
  const dur = f.fim - f.ini;
  SALAS.filter(s => salaPassaFiltros(s, f)).forEach(s => {
    const j = janelasLivres(s.id, f.data, dur).find(h => h > f.ini);
    if (j && !sug.find(x => x.s.id === s.id)) sug.unshift({ s, data: f.data, ini: j, fim: j + dur });
  });
  return `
    <div class="contador"><b>0 salas disponíveis</b> · <button class="link" data-acao="limparFiltros">Limpar filtros</button></div>
    <div class="card vazio">
      ${ic('event_busy')}
      <h3>Nenhuma sala livre com esses filtros</h3>
      <div class="muted">${f.busca ? `Nenhum resultado para “${esc(f.busca)}”. ` : ''}Tente outro horário ou bloco.</div>
    </div>
    ${sug.length ? `<div class="secao">Sugestões próximas</div>${sug.slice(0, 3).map(x => `
      <div class="card clicavel" data-acao="abrirSugestao" data-id="${x.s.id}" data-ini="${x.ini}" data-fim="${x.fim}">
        <div class="entre"><h3>${x.s.nome} · Bloco ${x.s.bloco}</h3><span class="pill ok">LIVRE</span></div>
        <div class="muted">${fmtData(x.data)} · ${hh(x.ini)}–${hh(x.fim)} · até ${x.s.capacidade} pessoas</div>
      </div>`).join('')}` : ''}
    <button class="btn bloco" data-acao="filtros">${ic('tune')} AJUSTAR FILTROS</button>`;
}
function recarregarLista() {
  carregandoLista = true; render();
  clearTimeout(recarregarLista.t);
  recarregarLista.t = setTimeout(() => { carregandoLista = false; if (ui.tela === 'salas') { const b = document.getElementById('busca'); const foco = b && document.activeElement === b; render(); if (foco) { const n = document.getElementById('busca'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); } } }, 550);
}

/* ======================= TELA 5 - FILTROS (bottom sheet) ======================= */
let rascunhoFiltro;
function abrirFiltros() {
  rascunhoFiltro = JSON.parse(JSON.stringify(filtros));
  desenharFiltros(true);
}
function desenharFiltros(primeira) {
  const f = rascunhoFiltro, dias = diasDisponiveis();
  const erro = f.fim <= f.ini ? 'O horário final deve ser depois do inicial.' : f.fim - f.ini > DURACAO_MAX ? `A reserva pode ter no máximo ${DURACAO_MAX} horas.` : '';
  const qtd = erro ? 0 : buscarSalas(f).livres.length;
  const opcoesHora = (sel, de, ate) => { let o = ''; for (let h = de; h <= ate; h++) o += `<option value="${h}" ${h === sel ? 'selected' : ''}>${hh(h)}</option>`; return o; };
  abrirCamada(`<div class="scrim ${primeira ? '' : 'sem-anim'}" data-acao="fecharCamada"></div>
    <section class="sheet ${primeira ? '' : 'sem-anim'}" role="dialog" aria-label="Filtrar salas">
      <div class="pegador"></div>
      <div class="entre" style="margin-bottom:14px"><h2>Filtrar salas</h2><button class="link" data-acao="filtroLimpar">Limpar</button></div>
      <span class="rotulo">Data</span>
      <div class="dias" style="margin-bottom:14px">${dias.map(d => { const x = deIso(d); return `<button class="dia ${d === f.data ? 'ativo' : ''}" data-acao="filtroDia" data-v="${d}">${d === hojeIso() ? 'HOJE' : SEM[x.getDay()].toUpperCase()}<b>${pad(x.getDate())}</b></button>`; }).join('')}</div>
      <div class="grid2">
        <div class="campo"><label for="fIni">Início</label><select class="input ${erro ? 'invalido' : ''}" id="fIni" data-filtro="ini">${opcoesHora(f.ini, ABRE, FECHA - 1)}</select></div>
        <div class="campo"><label for="fFim">Fim</label><select class="input ${erro ? 'invalido' : ''}" id="fFim" data-filtro="fim">${opcoesHora(f.fim, ABRE + 1, FECHA)}</select></div>
      </div>
      ${erro ? `<div class="erro-msg" style="margin:-6px 0 12px">${ic('error')}${erro}</div>` : ''}
      <span class="rotulo">Bloco</span>
      <div class="chips quebra" style="margin-bottom:8px">${BLOCOS.map(b => `<button class="chip ${f.blocos.includes(b) ? 'ativo' : ''}" data-acao="filtroBloco" data-v="${b}">${b}</button>`).join('')}</div>
      <div class="entre" style="margin:6px 0 14px"><span class="rotulo" style="margin:0">Capacidade mínima</span>
        <div class="stepper"><button data-acao="filtroCap" data-v="-1" ${f.capMin <= 1 ? 'disabled' : ''} aria-label="Menos">−</button><span>${f.capMin} ${f.capMin === 1 ? 'pessoa' : 'pessoas'}</span><button data-acao="filtroCap" data-v="1" ${f.capMin >= 12 ? 'disabled' : ''} aria-label="Mais">+</button></div>
      </div>
      <span class="rotulo">Recursos necessários</span>
      <div class="chips quebra" style="margin-bottom:16px">${FILTRO_RECURSOS.map(r => `<button class="chip ${f.recursos.includes(r.id) ? 'ativo' : ''}" data-acao="filtroRecurso" data-v="${r.id}">${ic(r.icone)}${r.nome}</button>`).join('')}</div>
      <button class="btn bloco" data-acao="filtroAplicar" ${erro ? 'disabled' : ''}>${erro ? 'CORRIJA O HORÁRIO' : qtd ? `MOSTRAR ${qtd} ${qtd === 1 ? 'SALA' : 'SALAS'}` : 'NENHUMA SALA LIVRE · VER SUGESTÕES'}</button>
    </section>`);
}

/* ======================= TELA 6 - DETALHE DA SALA ======================= */
let selecao = null; // { salaId, data, ini, fim }
function telaSala() {
  const s = sala(ui.params.id);
  if (!selecao || selecao.salaId !== s.id) {
    const ok = verificarDisponibilidade(s.id, filtros.data, filtros.ini, filtros.fim);
    selecao = { salaId: s.id, data: ui.params.data || filtros.data, ini: ok ? (ui.params.ini ?? filtros.ini) : null, fim: ok ? (ui.params.fim ?? filtros.fim) : null };
    if (ui.params.ini != null) { selecao.ini = ui.params.ini; selecao.fim = ui.params.fim; }
  }
  const sel = selecao, dias = diasDisponiveis();
  const livreAgora = sel.ini != null;
  let slots = '';
  for (let h = ABRE; h < FECHA; h++) {
    const livre = horaLivre(s.id, sel.data, h);
    const marcado = sel.ini != null && h >= sel.ini && h < sel.fim;
    slots += `<button class="slot ${marcado ? 'sel' : ''}" data-acao="slot" data-h="${h}" ${livre ? '' : 'disabled'} aria-pressed="${marcado}" aria-label="${hh(h)} ${livre ? 'livre' : 'ocupado'}">${hh(h)}</button>`;
  }
  return `
    <div class="hero">${foto(s, '')}<div class="sobre">${livreAgora ? '<span class="pill ok">LIVRE NO HORÁRIO ESCOLHIDO</span>' : '<span class="pill contorno" style="background:#fff">ESCOLHA UM HORÁRIO</span>'}</div></div>
    <h2 style="margin:0 0 4px">${s.nome}</h2>
    <div class="muted">Bloco ${s.bloco} · ${s.andar} · até ${s.capacidade} pessoas</div>
    <div class="secao">Recursos</div>
    <div class="card" style="padding:12px 14px">${listaRecursos(s, true)}</div>
    <div class="secao">Escolha o dia</div>
    <div class="dias">${dias.map(d => { const x = deIso(d); return `<button class="dia ${d === sel.data ? 'ativo' : ''}" data-acao="diaSala" data-v="${d}">${d === hojeIso() ? 'HOJE' : SEM[x.getDay()].toUpperCase()}<b>${pad(x.getDate())}</b></button>`; }).join('')}</div>
    <div class="secao">Horários</div>
    <div class="slots">${slots}</div>
    <div class="legenda"><span><i></i>Livre</span><span><i class="s"></i>Selecionado</span><span><i class="o"></i>Ocupado</span></div>
    <div class="dica">Toque no horário de início e depois no último horário (máx. ${DURACAO_MAX} h seguidas).</div>
    <div class="barra-fixa">
      <div class="entre" style="margin-bottom:10px"><span class="muted">Selecionado:</span><b>${sel.ini != null ? `${fmtData(sel.data)} · ${hh(sel.ini)}–${hh(sel.fim)} (${sel.fim - sel.ini} h)` : 'nenhum horário'}</b></div>
      <button class="btn bloco" data-acao="reservar" ${sel.ini == null ? 'disabled' : ''}>${ic('event_available')} RESERVAR</button>
    </div>`;
}
function tocarSlot(h) {
  const sel = selecao;
  if (sel.ini == null || h < sel.ini || h >= sel.fim + DURACAO_MAX || (h >= sel.ini && h < sel.fim && sel.fim - sel.ini > 1)) {
    sel.ini = h; sel.fim = h + 1;
  } else if (h === sel.ini && sel.fim - sel.ini === 1) {
    sel.ini = null; sel.fim = null;
  } else {
    const novoFim = h + 1;
    if (novoFim - sel.ini > DURACAO_MAX) { toast(`Cada reserva pode ter no máximo ${DURACAO_MAX} horas.`, 'erro', null, 'error'); sel.ini = h; sel.fim = h + 1; }
    else if (!verificarDisponibilidade(sel.salaId, sel.data, sel.ini, novoFim)) { toast('Escolha horários seguidos e livres.', 'erro', null, 'error'); sel.ini = h; sel.fim = h + 1; }
    else sel.fim = novoFim;
  }
  render();
}

/* ======================= TELA 7 - FORMULÁRIO DA RESERVA ======================= */
let form = null;
function novoForm(base) {
  const u = usuario();
  return Object.assign({ salaId: null, data: null, ini: 14, fim: 16, pessoas: Math.min(2, sala(base.salaId).capacidade), motivo: '', turma: false, turmaNome: 'S05 - Interface Homem-máquina', lembrete: true, editarId: null, tocado: {} }, base, { ehProf: u.tipo === 'professor' });
}
// Aluno.reservarSala() / Professor.reservarSala() -> validações
function validarForm(f) {
  const e = {};
  const s = sala(f.salaId);
  if (f.fim <= f.ini) e.hora = 'O horário final deve ser depois do inicial.';
  else if (f.fim - f.ini > DURACAO_MAX) e.hora = `A reserva pode ter no máximo ${DURACAO_MAX} horas.`;
  else if (passou(f.data, f.ini)) e.hora = 'Esse horário já passou. Escolha um horário futuro.';
  else if (!verificarDisponibilidade(f.salaId, f.data, f.ini, f.fim, f.editarId)) e.hora = 'A sala está ocupada em parte desse horário.';
  if (f.pessoas < 1) e.pessoas = 'Informe pelo menos 1 pessoa.';
  else if (f.pessoas > s.capacidade) e.pessoas = `Essa sala comporta no máximo ${s.capacidade} pessoas.`;
  if (f.motivo.length > 80) e.motivo = 'Use no máximo 80 caracteres.';
  if (!f.editarId && usuario().tipo === 'aluno') {
    const ativas = minhasReservas().filter(ativa).length;
    if (ativas >= LIMITE_ATIVAS) e.geral = `Você já tem ${ativas} reservas ativas (limite de ${LIMITE_ATIVAS}). Cancele uma em “Minhas reservas” para fazer outra.`;
  }
  return e;
}
function telaForm() {
  const f = form, s = sala(f.salaId), dias = diasDisponiveis();
  const e = validarForm(f);
  const valido = !Object.keys(e).length;
  const mostra = k => e[k] ? `<div class="erro-msg">${ic('error')}${e[k]}</div>` : '';
  const opcoesHora = (sel, de, ate) => { let o = ''; for (let h = de; h <= ate; h++) o += `<option value="${h}" ${h === sel ? 'selected' : ''}>${hh(h)}</option>`; return o; };
  const diasOpc = [...new Set([...dias, f.data])].sort();
  return `
    <div class="card linha" style="gap:12px;padding:12px">
      ${foto(s, 'sala-foto" style="width:60px;height:60px')}
      <div><h3>${s.nome}</h3><div class="muted">Bloco ${s.bloco} · até ${s.capacidade} pessoas</div></div>
    </div>
    ${e.geral ? `<div class="aviso erro">${ic('block')}<div>${e.geral}</div></div>` : ''}
    <div class="campo"><label for="fData">Data</label>
      <select class="input" id="fData" data-form="data">${diasOpc.map(d => `<option value="${d}" ${d === f.data ? 'selected' : ''}>${fmtDataLonga(d)}</option>`).join('')}</select></div>
    <div class="grid2">
      <div class="campo" style="margin:0"><label for="fIni2">Início</label><select class="input ${e.hora ? 'invalido' : ''}" id="fIni2" data-form="ini">${opcoesHora(f.ini, ABRE, FECHA - 1)}</select></div>
      <div class="campo" style="margin:0"><label for="fFim2">Fim</label><select class="input ${e.hora ? 'invalido' : ''}" id="fFim2" data-form="fim">${opcoesHora(f.fim, ABRE + 1, FECHA)}</select></div>
    </div>
    <div class="campo">${mostra('hora') || (f.fim > f.ini ? `<div class="dica">Duração: ${f.fim - f.ini} h</div>` : '')}</div>
    <div class="campo"><span class="rotulo">Número de pessoas</span>
      <div class="entre"><div class="stepper"><button data-acao="pessoas" data-v="-1" ${f.pessoas <= 1 ? 'disabled' : ''} aria-label="Menos pessoas">−</button><span>${f.pessoas}</span><button data-acao="pessoas" data-v="1" ${f.pessoas >= s.capacidade ? 'disabled' : ''} aria-label="Mais pessoas">+</button></div>
      <span class="muted">máx. ${s.capacidade}</span></div>${mostra('pessoas')}</div>
    ${precisaAprovacao(f.pessoas) ? `<div class="aviso alerta">${ic('groups')}<div>Reservas com ${PESSOAS_APROVACAO} ou mais pessoas são de grupo e <b>precisam da aprovação do professor</b>. Você será avisado quando ele aprovar.</div></div>` : ''}
    <div class="campo"><label for="fMotivo">Motivo (opcional)</label>
      <textarea class="input ${e.motivo ? 'invalido' : ''}" id="fMotivo" data-form="motivo" maxlength="90" placeholder="Ex.: estudo para a prova de IHM">${esc(f.motivo)}</textarea>
      <div class="entre"><span>${mostra('motivo')}</span><span class="dica" id="contaMotivo">${f.motivo.length}/80</span></div></div>
    ${f.ehProf ? `<label class="check"><input type="checkbox" data-form="turma" ${f.turma ? 'checked' : ''}> Reserva para turma (somente professor)</label>
      ${f.turma ? `<div class="campo"><select class="input" data-form="turmaNome">${['S05 - Interface Homem-máquina', 'S06 - Engenharia de Software', 'C04 - Monitoria'].map(t => `<option ${t === f.turmaNome ? 'selected' : ''}>${t}</option>`).join('')}</select><div class="dica">Os alunos da turma serão avisados da reserva.</div></div>` : ''}` : ''}
    <label class="check entre" style="padding:12px 0"><span class="linha">${ic('alarm', 'azul')} Lembrar-me 15 min antes</span>
      <span class="switch"><input type="checkbox" data-form="lembrete" ${f.lembrete ? 'checked' : ''}><i></i></span></label>
    <div class="acoes" style="margin-top:8px">
      <button class="btn sec" data-acao="fecharForm">CANCELAR</button>
      <button class="btn" data-acao="continuar" ${valido ? '' : 'disabled'}>CONTINUAR</button>
    </div>`;
}

/* ======================= TELA 8 - CONFIRMAR (diálogo) ======================= */
function abrirConfirmacao() {
  const f = form, s = sala(f.salaId);
  abrirCamada(`<div class="scrim"></div>
    <div class="dialogo" role="alertdialog" aria-labelledby="tConf">
      <h2 id="tConf">${f.editarId ? 'Salvar alterações?' : 'Confirmar reserva?'}</h2>
      <dl class="resumo">
        <dt>Sala</dt><dd>${s.nome} – Bloco ${s.bloco}</dd>
        <dt>Data</dt><dd>${fmtDataLonga(f.data)}</dd>
        <dt>Horário</dt><dd>${hh(f.ini)} às ${hh(f.fim)} (${f.fim - f.ini} h)</dd>
        <dt>Pessoas</dt><dd>${f.pessoas}</dd>
        ${f.motivo ? `<dt>Motivo</dt><dd>${esc(f.motivo)}</dd>` : ''}
        ${f.turma ? `<dt>Turma</dt><dd>${esc(f.turmaNome)}</dd>` : ''}
      </dl>
      ${precisaAprovacao(f.pessoas) ? `<div class="aviso alerta">${ic('groups')}<div>Vai para a aprovação do professor antes de ser confirmada.</div></div>` : ''}
      <div class="aviso">${ic('info')}<div>Cancele até 1 h antes para liberar a sala a outros alunos.</div></div>
      <div class="acoes"><button class="btn sec" data-acao="fecharCamada">VOLTAR</button><button class="btn" id="btnConfirmar" data-acao="confirmar">CONFIRMAR</button></div>
    </div>`);
}
// Reserva.criar() / Reserva.editar() com verificação final (processamento)
function confirmarReserva() {
  const btn = document.getElementById('btnConfirmar');
  btn.disabled = true; btn.innerHTML = '<span class="spinner"></span> Verificando...';
  document.querySelector('.dialogo .btn.sec').disabled = true;
  const f = form;
  setTimeout(() => {
    // simulação: na 1ª tentativa de reservar a Sala de Estudo 3, outro aluno "pega" o horário antes
    if (!f.editarId && f.salaId === 3 && !state.conflitoSimulado) {
      state.conflitoSimulado = true;
      state.bloqueios.push({ salaId: 3, data: f.data, ini: f.ini, fim: f.fim });
      salvar();
      return ir('conflito', {}, { substituir: true });
    }
    if (!verificarDisponibilidade(f.salaId, f.data, f.ini, f.fim, f.editarId)) return ir('conflito', {}, { substituir: true });
    const u = usuario();
    let r;
    if (f.editarId) {
      r = state.reservas.find(x => x.id === f.editarId);
      Object.assign(r, { salaId: f.salaId, data: f.data, ini: f.ini, fim: f.fim, pessoas: f.pessoas, motivo: f.motivo, lembrete: f.lembrete, turma: f.turma, lembrado: false });
      const aprov = precisaAprovacao(f.pessoas);
      r.automatica = !aprov && u.tipo === 'aluno';
      r.criadaEm = Date.now();
      if (u.tipo === 'professor') mudarStatus(r, 'CONFIRMADA', 'Horário alterado');
      else mudarStatus(r, 'PENDENTE', 'Horário alterado – aguardando nova confirmação');
    } else {
      r = { id: state.seq++, usuario: u.matricula, salaId: f.salaId, data: f.data, ini: f.ini, fim: f.fim, pessoas: f.pessoas, motivo: f.motivo, lembrete: f.lembrete, turma: f.turma, turmaNome: f.turma ? f.turmaNome : null, avaliacao: null, status: 'PENDENTE', criadaEm: Date.now(), historico: [{ status: 'PENDENTE', em: Date.now(), txt: 'Reserva enviada' }] };
      r.automatica = u.tipo === 'aluno' && !precisaAprovacao(f.pessoas);
      state.reservas.push(r);
      if (u.tipo === 'professor') mudarStatus(r, 'CONFIRMADA', f.turma ? `Reserva da turma ${f.turmaNome}` : 'Confirmada na hora (professor)');
    }
    salvar();
    if (r.status === 'PENDENTE') {
      notificar(u.matricula, 'enviada', f.editarId ? 'Alteração enviada' : 'Reserva enviada', r.automatica ? `${sala(r.salaId).nome} · aguardando confirmação.` : `${sala(r.salaId).nome} · aguardando aprovação do professor.`, r.id);
      if (!r.automatica) notificar('9999', 'pedido', 'Novo pedido de reserva', `${nomeDe(u.matricula)} pediu a ${sala(r.salaId).nome} para ${r.pessoas} pessoas.`, r.id);
    }
    if (r.automatica) agendarConfirmacao(r);
    selecao = null;
    ir('sucesso', { id: r.id, editado: !!f.editarId }, { substituir: true });
    ui.pilha = [{ tela: 'inicio', params: {} }];
    form = null;
  }, 1300);
}

/* ======================= TELA 14 - CONFLITO DE HORÁRIO ======================= */
let escolhaConflito = null;
function telaConflito() {
  const f = form, s = sala(f.salaId), dur = f.fim - f.ini;
  const janelas = janelasLivres(s.id, f.data, dur, f.editarId).sort((a, b) => Math.abs(a - f.ini) - Math.abs(b - f.ini)).slice(0, 6).sort((a, b) => a - b);
  const outras = SALAS.filter(x => x.id !== s.id && x.capacidade >= f.pessoas && verificarDisponibilidade(x.id, f.data, f.ini, f.fim)).slice(0, 3);
  const esc_ = escolhaConflito;
  return `
    <div class="sucesso" style="padding-top:6px">
      <div class="check-anim alerta">${ic('priority_high')}</div>
      <h2 style="margin:0 0 6px">Esse horário acabou de ser reservado</h2>
      <div class="muted" style="margin-bottom:14px">Outro aluno reservou a ${s.nome} das ${hh(f.ini)} às ${hh(f.fim)} enquanto você preenchia. <b>Nenhuma reserva foi criada.</b></div>
    </div>
    <div class="secao">Horários livres nesta sala · ${fmtData(f.data)}</div>
    ${janelas.length ? `<div class="chips quebra">${janelas.map(h => `<button class="chip ${esc_ && esc_.salaId === s.id && esc_.ini === h ? 'ativo' : ''}" data-acao="escolherJanela" data-sala="${s.id}" data-ini="${h}">${hh(h)}–${hh(h + dur)}</button>`).join('')}</div>`
      : `<div class="muted">Sem outros horários de ${dur} h nesse dia.</div>`}
    <div class="secao">Outras salas às ${hh(f.ini)}</div>
    ${outras.length ? outras.map(x => `
      <div class="card clicavel ${esc_ && esc_.salaId === x.id ? '' : ''}" data-acao="escolherJanela" data-sala="${x.id}" data-ini="${f.ini}" style="${esc_ && esc_.salaId === x.id ? 'outline:2.5px solid var(--cor-click)' : ''}">
        <div class="entre"><h3>${x.nome} · Bloco ${x.bloco}</h3><span class="pill ok">LIVRE</span></div>
        <div class="muted">${hh(f.ini)}–${hh(f.fim)} · até ${x.capacidade} pessoas</div></div>`).join('') : '<div class="muted">Nenhuma outra sala livre nesse horário.</div>'}
    <div style="margin-top:16px;display:grid;gap:8px">
      <button class="btn bloco" data-acao="reservarAlternativa" ${esc_ ? '' : 'disabled'}>${esc_ ? `RESERVAR ${sala(esc_.salaId).nome.replace('Sala de Estudo', 'SALA')} · ${hh(esc_.ini)}–${hh(esc_.ini + dur)}` : 'ESCOLHA UMA OPÇÃO ACIMA'}</button>
      <button class="btn sec bloco" data-acao="outraSala">Escolher outra sala</button>
    </div>`;
}

/* ======================= TELA 9 - RESERVA ENVIADA ======================= */
function telaSucesso() {
  const r = state.reservas.find(x => x.id === ui.params.id), s = sala(r.salaId);
  const aprov = r.status === 'PENDENTE' && !r.automatica;
  return `
    <div class="sucesso">
      <div class="check-anim">${ic('check')}</div>
      <h2 style="margin:0 0 4px">${ui.params.editado ? 'Alteração enviada!' : 'Reserva enviada!'}</h2>
      <div class="muted">${s.nome} · Bloco ${s.bloco}<br>${fmtData(r.data)} · ${hh(r.ini)}–${hh(r.fim)} · código #${r.id}</div>
    </div>
    <div class="card" style="margin-top:18px">
      <div class="entre"><b>Status da reserva</b>${pillStatus(r.status)}</div>
      ${progresso(r)}
      <div class="aviso" style="margin:12px 0 0">${ic(r.status === 'CONFIRMADA' ? 'verified' : aprov ? 'groups' : 'notifications_active')}<div>${
        r.status === 'CONFIRMADA' ? 'Tudo certo! A sala está garantida para você.' :
        aprov ? 'Como é uma reserva de grupo, ela foi enviada ao professor. Você receberá uma notificação quando ele aprovar.' :
        'Você receberá uma notificação quando a reserva for confirmada (leva alguns segundos).'}</div></div>
    </div>
    <div style="display:grid;gap:10px">
      <button class="btn sec bloco" data-acao="agenda" data-id="${r.id}">${ic('calendar_add_on')} ADICIONAR À AGENDA</button>
      <button class="btn bloco" data-acao="minhas">VER MINHAS RESERVAS</button>
      <button class="link" data-acao="inicio">Voltar ao início</button>
    </div>`;
}

/* ======================= TELA 10 - MINHAS RESERVAS ======================= */
let abaMinhas = 'proximas';
function telaMinhas() {
  const todas = minhasReservas();
  const prox = todas.filter(ativa).sort((a, b) => inicioReserva(a) - inicioReserva(b));
  const hist = todas.filter(r => !ativa(r)).sort((a, b) => inicioReserva(b) - inicioReserva(a));
  const lista = abaMinhas === 'proximas' ? prox : hist;
  return `
    <div class="abas" role="tablist">
      <button class="aba ${abaMinhas === 'proximas' ? 'ativo' : ''}" data-acao="abaMinhas" data-v="proximas" role="tab">Próximas (${prox.length})</button>
      <button class="aba ${abaMinhas === 'historico' ? 'ativo' : ''}" data-acao="abaMinhas" data-v="historico" role="tab">Histórico (${hist.length})</button>
    </div>
    ${lista.length ? lista.map(cardReserva).join('') : `<div class="card vazio">${ic(abaMinhas === 'proximas' ? 'event_available' : 'history')}<h3>${abaMinhas === 'proximas' ? 'Nenhuma reserva futura' : 'Histórico vazio'}</h3><div class="muted">${abaMinhas === 'proximas' ? 'Reserve uma sala para estudar com seu grupo.' : 'Reservas concluídas e canceladas aparecem aqui.'}</div></div>`}
    <button class="btn fab" data-acao="verSalas">${ic('add')} NOVA RESERVA</button>`;
}
function podeCancelar(r) { return ativa(r) && (inicioReserva(r) - Date.now()) / 60000 >= CANCELA_ATE_MIN; }
function cardReserva(r) {
  const s = sala(r.salaId);
  return `<div class="card clicavel" data-acao="abrirReserva" data-id="${r.id}">
    <div class="entre"><h3>${s.nome}</h3>${pillStatus(r.status)}</div>
    <div class="muted">Bloco ${s.bloco} · ${fmtData(r.data)} · ${hh(r.ini)}–${hh(r.fim)} · ${r.pessoas} ${r.pessoas === 1 ? 'pessoa' : 'pessoas'}</div>
    ${ativa(r) ? `<div class="muted linha" style="margin-top:6px;color:var(--cor-click);font-weight:bold">${textoSituacao(r)}</div>
      <div class="acoes" style="margin-top:12px"><button class="btn sec peq" data-acao="editar" data-id="${r.id}">${ic('edit')} EDITAR</button><button class="btn perigo sec peq" data-acao="cancelar" data-id="${r.id}" ${podeCancelar(r) ? '' : 'aria-disabled="true"'}>${ic('event_busy')} CANCELAR</button></div>` : ''}
    ${r.status === 'CONCLUIDA' && !r.avaliacao ? `<div class="muted linha" style="margin-top:6px">${ic('star')} Toque para avaliar a sala</div>` : ''}
    ${r.avaliacao ? `<div class="muted" style="margin-top:6px">Sua avaliação: ${'★'.repeat(r.avaliacao)}${'☆'.repeat(5 - r.avaliacao)}</div>` : ''}
  </div>`;
}

/* ======================= TELA 11 - DETALHE DA RESERVA ======================= */
function telaReserva() {
  const r = state.reservas.find(x => x.id === ui.params.id);
  if (!r) return '<div class="card vazio"><h3>Reserva não encontrada</h3></div>';
  const s = sala(r.salaId);
  const minhas = r.usuario === state.sessao;
  const motivoCancel = ativa(r) && !podeCancelar(r) ? `<div class="dica">Não é mais possível cancelar: faltam menos de 1 h para o início.</div>` : '';
  return `
    <div class="card">
      <div class="linha" style="gap:12px;align-items:flex-start">${foto(s, 'sala-foto" style="width:64px;height:64px')}
        <div style="flex:1"><div class="entre"><h3>${s.nome}</h3>${pillStatus(r.status)}</div>
        <div class="muted">Bloco ${s.bloco} · ${fmtData(r.data)} · ${hh(r.ini)}–${hh(r.fim)} · ${r.pessoas} pessoas</div>
        ${!minhas ? `<div class="muted">Solicitado por ${nomeDe(r.usuario)}</div>` : ''}</div></div>
      ${progresso(r)}
      ${ativa(r) ? `<div class="muted linha" style="justify-content:center;color:var(--cor-click);font-weight:bold;margin-top:6px">${textoSituacao(r)}</div>` : ''}
    </div>
    ${r.motivo || r.turmaNome ? `<div class="card"><div class="resumo" style="margin:0">${r.motivo ? `<dt>Motivo</dt><dd>${esc(r.motivo)}</dd>` : ''}${r.turmaNome ? `<dt>Turma</dt><dd>${esc(r.turmaNome)}</dd>` : ''}<dt>Lembrete</dt><dd>${r.lembrete ? '15 min antes' : 'Desligado'}</dd></div></div>` : ''}
    ${minhas && ativa(r) ? `<div style="display:grid;gap:10px;margin-bottom:14px">
      <button class="btn bloco" data-acao="editar" data-id="${r.id}">${ic('edit_calendar')} EDITAR HORÁRIO</button>
      <button class="btn perigo sec bloco" data-acao="cancelar" data-id="${r.id}" ${podeCancelar(r) ? '' : 'disabled'}>${ic('event_busy')} CANCELAR RESERVA</button>${motivoCancel}
      <button class="btn sec bloco" data-acao="agenda" data-id="${r.id}">${ic('calendar_add_on')} ADICIONAR À AGENDA</button></div>` : ''}
    ${minhas && r.status === 'CONCLUIDA' ? `<div class="card"><b>${r.avaliacao ? 'Sua avaliação' : 'Como foi a sala?'}</b>${estrelas(r)}</div>` : ''}
    <div class="secao">Histórico</div>
    <div class="card"><ul class="historico">${[...r.historico].reverse().map(h => `<li><b>${h.txt}</b><div class="muted">${new Date(h.em).toLocaleDateString('pt-BR')} às ${fmtHora(h.em)}</div></li>`).join('')}</ul></div>`;
}
function estrelas(r) {
  return `<div class="estrelas" role="radiogroup" aria-label="Avaliar sala">${[1, 2, 3, 4, 5].map(n => `<button data-acao="avaliar" data-id="${r.id}" data-v="${n}" aria-label="${n} estrela(s)">${ic('star', r.avaliacao >= n ? 'fill' : '')}</button>`).join('')}</div>`;
}
// Reserva.cancelar()
function abrirCancelamento(id) {
  const r = state.reservas.find(x => x.id === id);
  if (!podeCancelar(r)) return toast('Faltam menos de 1 h para o início. Não é possível cancelar.', 'erro', null, 'block');
  abrirCamada(`<div class="scrim" data-acao="fecharCamada"></div>
    <div class="dialogo" role="alertdialog" aria-labelledby="tCanc">
      <h2 id="tCanc">Cancelar esta reserva?</h2>
      <div class="muted" style="margin-bottom:14px">${sala(r.salaId).nome} · ${fmtData(r.data)} · ${hh(r.ini)}–${hh(r.fim)}.<br>A sala ficará livre para outros alunos.</div>
      <div class="campo"><label for="motivoCanc">Motivo (opcional)</label>
        <select class="input" id="motivoCanc"><option value="">Selecione</option><option>Mudança de planos</option><option>Escolhi o horário errado</option><option>O grupo não vai mais estudar</option><option>Outro motivo</option></select></div>
      <div class="acoes"><button class="btn sec" data-acao="fecharCamada">MANTER</button><button class="btn perigo" data-acao="confirmarCancelamento" data-id="${r.id}">SIM, CANCELAR</button></div>
    </div>`);
}
function cancelarReserva(id) {
  const r = state.reservas.find(x => x.id === id);
  const motivo = document.getElementById('motivoCanc').value;
  const anterior = r.status, histAntes = r.historico.length;
  mudarStatus(r, 'CANCELADA', `Cancelada por você${motivo ? ': ' + motivo.toLowerCase() : ''}`);
  fecharCamada();
  render();
  let desfeito = false;
  toast('Reserva cancelada. A sala foi liberada.', 'ok', { rotulo: 'Desfazer', fn: () => {
    desfeito = true;
    if (!verificarDisponibilidade(r.salaId, r.data, r.ini, r.fim, r.id)) return toast('Não deu para desfazer: alguém já reservou esse horário.', 'erro', null, 'error');
    r.status = anterior; r.historico.length = histAntes; salvar(); render();
    toast('Cancelamento desfeito.', 'ok', null, 'undo');
  } }, 'event_busy', 6000);
  setTimeout(() => { if (!desfeito && r.status === 'CANCELADA') notificar(r.usuario, 'cancelada', 'Reserva cancelada', `${sala(r.salaId).nome} foi liberada para outros alunos.`, r.id); }, 6200);
}

/* ======================= TELA 12 - NOTIFICAÇÕES ======================= */
const ICONE_NOTIF = { confirmada: 'event_available', lembrete: 'alarm', enviada: 'send', concluida: 'star', cancelada: 'event_busy', pedido: 'fact_check', aprovada: 'verified', recusada: 'block' };
function telaNotificacoes() {
  const minhas = state.notifs.filter(n => n.usuario === state.sessao).sort((a, b) => b.em - a.em);
  const hoje = minhas.filter(n => iso(new Date(n.em)) === hojeIso());
  const antes = minhas.filter(n => iso(new Date(n.em)) !== hojeIso());
  const item = n => {
    const r = n.reservaId && state.reservas.find(x => x.id === n.reservaId);
    return `<div class="card clicavel notif ${n.lida ? '' : 'nao-lida'}" data-acao="abrirNotif" data-id="${n.id}">
      <div class="ic">${ic(ICONE_NOTIF[n.tipo] || 'notifications')}</div>
      <div><div class="entre" style="padding-right:16px"><b>${n.titulo}</b><span class="muted">${fmtQuando(n.em)}</span></div>
      <div class="muted">${n.texto}</div>
      ${n.tipo === 'concluida' && r && r.usuario === state.sessao ? estrelas(r) : ''}</div></div>`;
  };
  if (!minhas.length) return `<div class="card vazio">${ic('notifications_off')}<h3>Sem notificações</h3><div class="muted">Avisos sobre suas reservas aparecem aqui.</div></div>`;
  return `${hoje.length ? `<div class="secao">Hoje</div>${hoje.map(item).join('')}` : ''}${antes.length ? `<div class="secao">Anteriores</div>${antes.map(item).join('')}` : ''}`;
}

/* ======================= TELA 15 - APROVAR RESERVAS (PROFESSOR) ======================= */
let abaAprovar = 'pendentes', selecionadas = new Set();
const pedidosTurma = () => state.reservas.filter(r => USUARIOS[r.usuario]?.tipo !== 'professor' && r.pessoas >= PESSOAS_APROVACAO);
function telaAprovar() {
  const pend = pedidosTurma().filter(r => r.status === 'PENDENTE').sort((a, b) => inicioReserva(a) - inicioReserva(b));
  const feitas = pedidosTurma().filter(r => r.status !== 'PENDENTE' && r.historico.some(h => /professor/i.test(h.txt))).sort((a, b) => b.historico.at(-1).em - a.historico.at(-1).em);
  [...selecionadas].forEach(id => { if (!pend.find(r => r.id === id)) selecionadas.delete(id); });
  const lista = abaAprovar === 'pendentes' ? pend : feitas;
  return `
    <div class="abas" role="tablist">
      <button class="aba ${abaAprovar === 'pendentes' ? 'ativo' : ''}" data-acao="abaAprovar" data-v="pendentes">Pendentes (${pend.length})</button>
      <button class="aba ${abaAprovar === 'feitas' ? 'ativo' : ''}" data-acao="abaAprovar" data-v="feitas">Respondidas (${feitas.length})</button>
    </div>
    ${abaAprovar === 'pendentes' && pend.length ? `<label class="check" style="margin:-4px 0 6px"><input type="checkbox" data-acao="selTodas" ${selecionadas.size === pend.length ? 'checked' : ''}> Selecionar todas</label>` : ''}
    ${lista.length ? lista.map(r => {
      const s = sala(r.salaId);
      return `<div class="card pedido">
        ${abaAprovar === 'pendentes' ? `<input type="checkbox" data-acao="selPedido" data-id="${r.id}" ${selecionadas.has(r.id) ? 'checked' : ''} aria-label="Selecionar pedido ${r.id}">` : `<span>${ic(r.status === 'CONFIRMADA' || r.status === 'CONCLUIDA' ? 'check_circle' : 'cancel')}</span>`}
        <div><div class="entre"><h3>${esc(r.motivo || 'Reserva de grupo')}</h3>${pillStatus(r.status)}</div>
          <div class="muted">${s.nome} · Bloco ${s.bloco} · ${fmtData(r.data)} · ${hh(r.ini)}–${hh(r.fim)}</div>
          <div class="muted">Solicitado por: <b>${nomeDe(r.usuario)}</b> · ${r.pessoas} pessoas</div>
          ${abaAprovar === 'pendentes' ? `<div class="acoes" style="margin-top:12px"><button class="btn perigo sec peq" data-acao="recusar" data-id="${r.id}">RECUSAR</button><button class="btn ok peq" data-acao="aprovarUm" data-id="${r.id}">APROVAR</button></div>` : ''}
        </div></div>`;
    }).join('') : `<div class="card vazio">${ic('task_alt')}<h3>${abaAprovar === 'pendentes' ? 'Nenhum pedido pendente' : 'Nada respondido ainda'}</h3><div class="muted">${abaAprovar === 'pendentes' ? 'Quando um grupo pedir uma sala, o pedido aparece aqui.' : ''}</div></div>`}
    ${abaAprovar === 'pendentes' && pend.length ? `<div class="barra-fixa"><button class="btn ok bloco" data-acao="aprovarSel" ${selecionadas.size ? '' : 'disabled'}>${ic('done_all')} APROVAR SELECIONADAS (${selecionadas.size})</button></div>` : ''}`;
}
// Professor.aprovarReservaTurma()
function aprovar(ids) {
  const u = usuario();
  ids.forEach(id => {
    const r = state.reservas.find(x => x.id === id);
    mudarStatus(r, 'CONFIRMADA', `Aprovada pelo professor ${u.nome}`);
    notificar(r.usuario, 'aprovada', 'Reserva aprovada', `O professor aprovou a ${sala(r.salaId).nome} · ${fmtData(r.data)} às ${hh(r.ini)}.`, r.id);
    selecionadas.delete(id);
  });
  render();
  toast(`${ids.length} ${ids.length === 1 ? 'reserva aprovada' : 'reservas aprovadas'}. ${ids.length === 1 ? 'O aluno foi notificado' : 'Os alunos foram notificados'}.`, 'ok', null, 'done_all');
}
function abrirRecusa(id) {
  const r = state.reservas.find(x => x.id === id);
  abrirCamada(`<div class="scrim" data-acao="fecharCamada"></div>
    <section class="sheet" role="dialog" aria-label="Recusar reserva"><div class="pegador"></div>
      <h2>Recusar pedido</h2>
      <div class="muted" style="margin:6px 0 14px">${esc(r.motivo)} · ${sala(r.salaId).nome} · ${fmtData(r.data)} ${hh(r.ini)}–${hh(r.fim)}</div>
      <div class="campo"><label for="motivoRecusa">Motivo da recusa (obrigatório)</label>
        <textarea class="input" id="motivoRecusa" placeholder="Ex.: a turma já tem uma sala reservada nesse horário"></textarea>
        <div id="erroRecusa"></div></div>
      <div class="acoes"><button class="btn sec" data-acao="fecharCamada">VOLTAR</button><button class="btn perigo" data-acao="confirmarRecusa" data-id="${id}">RECUSAR</button></div>
    </section>`);
  document.getElementById('motivoRecusa').focus();
}

/* ---------------- Camadas, toasts, agenda ---------------- */
const camada = document.getElementById('camada');
function abrirCamada(html) { camada.innerHTML = html; document.body.style.overflow = 'hidden'; }
function fecharCamada() { camada.innerHTML = ''; document.body.style.overflow = ''; }

function toast(html, tipo = 'ok', acao = null, icone = 'check_circle', tempo = 3800) {
  const box = document.getElementById('toasts');
  const el = document.createElement('div');
  el.className = `toast ${tipo}`;
  el.innerHTML = `${ic(icone)}<span class="txt">${html}</span>${acao ? `<button>${acao.rotulo}</button>` : ''}`;
  const sai = () => { el.classList.add('sair'); setTimeout(() => el.remove(), 260); };
  if (acao) el.querySelector('button').onclick = () => { sai(); acao.fn(); };
  box.appendChild(el);
  while (box.children.length > 3) box.firstChild.remove();
  setTimeout(sai, tempo);
}

function baixarAgenda(r) {
  const s = sala(r.salaId);
  const dt = (d) => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}0000`;
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//App Inatel//Reserva de Salas//PT', 'BEGIN:VEVENT',
    `UID:reserva-${r.id}@app.inatel`, `DTSTART:${dt(inicioReserva(r))}`, `DTEND:${dt(fimReserva(r))}`,
    `SUMMARY:${s.nome} (Bloco ${s.bloco})`, `DESCRIPTION:Reserva #${r.id} - ${r.pessoas} pessoas`, `LOCATION:Inatel - Bloco ${s.bloco}, ${s.andar}`,
    'BEGIN:VALARM', 'TRIGGER:-PT15M', 'ACTION:DISPLAY', 'DESCRIPTION:Sua reserva começa em 15 minutos', 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = `reserva-${r.id}.ics`;
  a.click();
  toast('Arquivo da agenda gerado. Abra para salvar no calendário.', 'ok', null, 'calendar_add_on');
}

/* ---------------- Mapa de telas ---------------- */
const TELAS = {
  inicio: telaInicio, salas: telaSalas, sala: telaSala, form: telaForm, conflito: telaConflito,
  sucesso: telaSucesso, minhas: telaMinhas, reserva: telaReserva, notificacoes: telaNotificacoes, aprovar: telaAprovar
};

/* ---------------- Ações (cliques) ---------------- */
const acoes = {
  // navegação geral
  voltar: () => voltar(),
  inicio: () => ir('inicio', {}, { raiz: true }),
  menu: () => abrirMenu(),
  fecharCamada: () => fecharCamada(),
  notificacoes: () => ir('notificacoes'),
  minhas: () => { abaMinhas = 'proximas'; ir('minhas', {}, { raiz: true }); },
  aprovar: () => { abaAprovar = 'pendentes'; ir('aprovar', {}, { raiz: true }); },
  verSalas: () => { if (!filtros) filtros = filtrosPadrao(); selecao = null; ir('salas'); recarregarLista(); },
  tema: () => { state.tema = state.tema === 'escuro' ? 'inatel' : 'escuro'; salvar(); fecharCamada(); render(); },
  reiniciar: () => {
    abrirCamada(`<div class="scrim" data-acao="fecharCamada"></div><div class="dialogo" role="alertdialog"><h2>Reiniciar demonstração?</h2>
      <div class="muted" style="margin-bottom:16px">Todas as reservas e notificações voltam ao estado inicial.</div>
      <div class="acoes"><button class="btn sec" data-acao="fecharCamada">VOLTAR</button><button class="btn perigo" data-acao="confirmarReinicio">REINICIAR</button></div></div>`);
  },
  confirmarReinicio: () => { const s = state.sessao; state = estadoInicial(); state.sessao = s; salvar(); filtros = filtrosPadrao(); ir('inicio', {}, { raiz: true }); toast('Demonstração reiniciada.', 'ok', null, 'restart_alt'); },
  // Usuario.sair()
  sair: () => {
    abrirCamada(`<div class="scrim" data-acao="fecharCamada"></div><div class="dialogo" role="alertdialog"><h2>Sair do app?</h2>
      <div class="muted" style="margin-bottom:16px">Você precisará entrar com sua matrícula de novo.</div>
      <div class="acoes"><button class="btn sec" data-acao="fecharCamada">FICAR</button><button class="btn" data-acao="confirmarSair">SAIR</button></div></div>`);
  },
  confirmarSair: () => { state.sessao = null; salvar(); fecharCamada(); ui = { tela: 'login', params: {}, pilha: [] }; loginErros = {}; render(); },

  // login
  verSenha: (el) => { const i = document.getElementById('senha'); const ver = i.type === 'password'; i.type = ver ? 'text' : 'password'; el.textContent = ver ? 'visibility_off' : 'visibility'; },
  esqueci: () => toast('Enviamos um link de redefinição para o seu e-mail institucional.', 'info', null, 'mail'),
  demo: (el) => { document.getElementById('mat').value = el.dataset.mat; document.getElementById('senha').value = 'inatel'; document.getElementById('btnEntrar').click(); },

  // lista e filtros
  filtros: () => abrirFiltros(),
  limparFiltros: () => { filtros = filtrosPadrao(); recarregarLista(); },
  filtroDia: (el) => { rascunhoFiltro.data = el.dataset.v; if (el.dataset.v === hojeIso() && passou(el.dataset.v, rascunhoFiltro.ini)) { rascunhoFiltro.ini = Math.min(primeiraHoraLivreHoje(el.dataset.v), FECHA - 1); rascunhoFiltro.fim = Math.min(rascunhoFiltro.ini + 2, FECHA); } desenharFiltros(); },
  filtroBloco: (el) => { const b = el.dataset.v, l = rascunhoFiltro.blocos; l.includes(b) ? l.splice(l.indexOf(b), 1) : l.push(b); desenharFiltros(); },
  filtroCap: (el) => { rascunhoFiltro.capMin = Math.max(1, Math.min(12, rascunhoFiltro.capMin + Number(el.dataset.v))); desenharFiltros(); },
  filtroRecurso: (el) => { const v = el.dataset.v, l = rascunhoFiltro.recursos; l.includes(v) ? l.splice(l.indexOf(v), 1) : l.push(v); desenharFiltros(); },
  filtroLimpar: () => { const b = rascunhoFiltro.busca; rascunhoFiltro = filtrosPadrao(); rascunhoFiltro.busca = b; desenharFiltros(); },
  filtroAplicar: () => { filtros = rascunhoFiltro; fecharCamada(); recarregarLista(); },
  abrirSala: (el) => { selecao = null; ir('sala', { id: Number(el.dataset.id) }); },
  abrirSugestao: (el) => { selecao = null; ir('sala', { id: Number(el.dataset.id), data: filtros.data, ini: Number(el.dataset.ini), fim: Number(el.dataset.fim) }); },

  // detalhe da sala
  favorito: () => { const id = ui.params.id, l = state.favoritos; const tem = l.includes(id); tem ? l.splice(l.indexOf(id), 1) : l.push(id); salvar(); desenharCabecalho(); toast(tem ? 'Removida dos favoritos.' : 'Sala salva nos favoritos.', 'ok', null, 'favorite'); },
  diaSala: (el) => { selecao.data = el.dataset.v; if (selecao.ini != null && !verificarDisponibilidade(selecao.salaId, selecao.data, selecao.ini, selecao.fim)) { selecao.ini = selecao.fim = null; toast('O horário escolhido não está livre nesse dia. Escolha outro.', 'info', null, 'info'); } render(); },
  slot: (el) => tocarSlot(Number(el.dataset.h)),
  reservar: () => { form = novoForm({ salaId: selecao.salaId, data: selecao.data, ini: selecao.ini, fim: selecao.fim }); ir('form'); },

  // formulário
  fecharForm: () => {
    if (ui.tela === 'conflito') { escolhaConflito = null; form = null; return ir('salas', {}, { substituir: true }); }
    form = null; voltar();
  },
  pessoas: (el) => { form.pessoas += Number(el.dataset.v); render(); },
  continuar: () => { if (Object.keys(validarForm(form)).length) return; abrirConfirmacao(); },
  confirmar: () => confirmarReserva(),

  // conflito
  escolherJanela: (el) => { escolhaConflito = { salaId: Number(el.dataset.sala), ini: Number(el.dataset.ini) }; render(); },
  reservarAlternativa: () => {
    const dur = form.fim - form.ini, e = escolhaConflito;
    form.salaId = e.salaId; form.ini = e.ini; form.fim = e.ini + dur;
    form.pessoas = Math.min(form.pessoas, sala(e.salaId).capacidade);
    escolhaConflito = null;
    abrirConfirmacao();
  },
  outraSala: () => { escolhaConflito = null; form = null; ir('salas', {}, { substituir: true }); recarregarLista(); },

  // reservas
  abrirReserva: (el, ev) => { if (ev.target.closest('[data-acao]') !== el) return; ir('reserva', { id: Number(el.dataset.id) }); },
  editar: (el) => {
    const r = state.reservas.find(x => x.id === Number(el.dataset.id));
    form = novoForm({ salaId: r.salaId, data: r.data, ini: r.ini, fim: r.fim, pessoas: r.pessoas, motivo: r.motivo, lembrete: r.lembrete, turma: r.turma, turmaNome: r.turmaNome || 'S05 - Interface Homem-máquina', editarId: r.id });
    ir('form', { editarId: r.id });
  },
  cancelar: (el) => abrirCancelamento(Number(el.dataset.id)),
  confirmarCancelamento: (el) => cancelarReserva(Number(el.dataset.id)),
  agenda: (el) => baixarAgenda(state.reservas.find(x => x.id === Number(el.dataset.id))),
  abaMinhas: (el) => { abaMinhas = el.dataset.v; render(); },
  avaliar: (el) => {
    const r = state.reservas.find(x => x.id === Number(el.dataset.id));
    r.avaliacao = Number(el.dataset.v); salvar(); render();
    toast(`Obrigado! Você deu ${r.avaliacao} ${r.avaliacao === 1 ? 'estrela' : 'estrelas'} para a ${sala(r.salaId).nome}.`, 'ok', null, 'star');
  },

  // notificações - Notificacao.marcarComoLida()
  marcarTodas: () => { state.notifs.forEach(n => { if (n.usuario === state.sessao) n.lida = true; }); salvar(); render(); toast('Todas as notificações foram marcadas como lidas.', 'ok', null, 'done_all'); },
  abrirNotif: (el, ev) => {
    if (ev.target.closest('.estrelas')) return;
    const n = state.notifs.find(x => x.id === el.dataset.id);
    n.lida = true; salvar();
    if (n.tipo === 'pedido' && usuario().tipo === 'professor') return ir('aprovar');
    if (n.reservaId) return ir('reserva', { id: n.reservaId });
    render();
  },

  // professor
  abaAprovar: (el) => { abaAprovar = el.dataset.v; render(); },
  aprovarUm: (el) => aprovar([Number(el.dataset.id)]),
  aprovarSel: () => aprovar([...selecionadas]),
  recusar: (el) => abrirRecusa(Number(el.dataset.id)),
  confirmarRecusa: (el) => {
    const txt = document.getElementById('motivoRecusa').value.trim();
    if (txt.length < 5) { document.getElementById('erroRecusa').innerHTML = `<div class="erro-msg">${ic('error')}Explique o motivo para o aluno (mín. 5 letras).</div>`; document.getElementById('motivoRecusa').classList.add('invalido'); return; }
    const r = state.reservas.find(x => x.id === Number(el.dataset.id));
    mudarStatus(r, 'CANCELADA', `Recusada pelo professor: ${txt}`);
    notificar(r.usuario, 'recusada', 'Reserva recusada', `${sala(r.salaId).nome}: ${txt}`, r.id);
    selecionadas.delete(r.id);
    fecharCamada(); render();
    toast('Pedido recusado. O aluno foi avisado do motivo.', 'ok', null, 'block');
  }
};

document.addEventListener('click', (ev) => {
  const el = ev.target.closest('[data-acao]');
  if (!el || el.disabled) return;
  if (el.getAttribute('aria-disabled') === 'true') { ev.stopPropagation(); if (el.dataset.acao === 'cancelar') abrirCancelamento(Number(el.dataset.id)); return; }
  const fn = acoes[el.dataset.acao];
  if (fn && el.tagName !== 'INPUT') { ev.preventDefault(); fn(el, ev); }
});
document.addEventListener('change', (ev) => {
  const el = ev.target;
  if (el.dataset.acao === 'selPedido') { const id = Number(el.dataset.id); el.checked ? selecionadas.add(id) : selecionadas.delete(id); return render(); }
  if (el.dataset.acao === 'selTodas') { const pend = pedidosTurma().filter(r => r.status === 'PENDENTE'); selecionadas = el.checked ? new Set(pend.map(r => r.id)) : new Set(); return render(); }
  if (el.dataset.filtro) { rascunhoFiltro[el.dataset.filtro] = Number(el.value); return desenharFiltros(); }
  if (el.dataset.form && form) {
    const k = el.dataset.form;
    form[k] = el.type === 'checkbox' ? el.checked : ['ini', 'fim'].includes(k) ? Number(el.value) : el.value;
    if (k === 'ini' && form.fim <= form.ini) form.fim = Math.min(form.ini + 1, FECHA);
    if (k !== 'motivo') render();
  }
});
document.addEventListener('input', (ev) => {
  const el = ev.target;
  if (el.id === 'busca') { filtros.busca = el.value; clearTimeout(document._b); document._b = setTimeout(recarregarLista, 250); }
  if (el.dataset.form === 'motivo' && form) {
    form.motivo = el.value;
    const c = document.getElementById('contaMotivo'); if (c) c.textContent = `${el.value.length}/80`;
    el.classList.toggle('invalido', el.value.length > 80);
    const btn = document.querySelector('[data-acao="continuar"]'); if (btn) btn.disabled = !!Object.keys(validarForm(form)).length;
  }
});
document.addEventListener('submit', (ev) => {
  if (ev.target.id === 'formLogin') {
    ev.preventDefault();
    autenticar(document.getElementById('mat').value.trim(), document.getElementById('senha').value, document.getElementById('manter').checked);
  }
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && camada.innerHTML) fecharCamada();
  if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('[role="button"][data-acao]')) { ev.preventDefault(); ev.target.click(); }
});

/* ---------------- Início ---------------- */
carregar();
if (state.sessao && state.manter === false) state.sessao = null;
if (state.sessao) { filtros = filtrosPadrao(); ui.tela = 'inicio'; }
render();
rotina();
setInterval(rotina, 20000);
setInterval(() => { if (['minhas', 'inicio', 'reserva'].includes(ui.tela) && !camada.innerHTML) desenharCabecalho(); }, 60000);
