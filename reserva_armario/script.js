// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {

  // obter tipo de armário selecionado pelo usuário no html.
  let tipoSelecionado = document.getElementById("tipoArmario").value;

  // na lista armários, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  let armariosDisponiveis = armarios.filter(a => a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel);

  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }

  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção.
  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];

  // Depois localizamos o armário emprestado na lista de armarios.
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);

  // Mudamos o status do armário.
  armarioEmprestado.status = false;

  // 1. Registramos a data/hora da reserva no objeto do armário.
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva;

  // 2. Calculamos a data/hora de entrega (prazo de 24h) e registramos no objeto.
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega;

  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;

  // Formatamos a data de entrega para exibição (pt-br).
  let dataEntregaFormatada = dataEntrega.toLocaleString("pt-BR");

  // 3. Impmimimos uma mensagem de reserva para o usuário, incluindo o prazo de entrega.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioSorteado.id} foi reservado com sucesso! Prazo para entrega das chaves: ${dataEntregaFormatada}.`;

  console.log(usuario);
  console.log(armarios);

}