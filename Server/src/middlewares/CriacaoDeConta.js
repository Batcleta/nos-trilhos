const vencimentoDasCobranças = (
  vencimentoContrato,
  mesDeCobrança,
  valorDoContrato,
  inicioDoContrato
) => {
  const aberturaContrato = new Date(inicioDoContrato || Date.now()),
    anoAberturaContrato = aberturaContrato.getFullYear(),
    mesAberturaContrato = aberturaContrato.getMonth(),
    diaAberturaContrato = aberturaContrato.getDate();

  let mesCobrança = mesDeCobrança,
    valorDaConta = valorDoContrato,
    statusDaConta = true;

  // Regra de criação do mes de cobrança
  if (diaAberturaContrato + 1 < vencimentoContrato) {
    mesCobrança = mesDeCobrança - 1;
  }

  const vencimentoDaConta = new Date(
    anoAberturaContrato,
    mesAberturaContrato + mesCobrança,
    vencimentoContrato
  );

  // Calculo de pagamento proporcional do mes recorrente
  if (
    vencimentoDaConta.getMonth() === mesAberturaContrato &&
    vencimentoDaConta.getFullYear() === anoAberturaContrato
  ) {
    const ultimoDiaDoMes = new Date(
      anoAberturaContrato,
      mesAberturaContrato + 1,
      0
    ).getDate();

    if (diaAberturaContrato + 1 < vencimentoContrato) {
      const dayGap = vencimentoContrato - diaAberturaContrato - 1;
      valorDaConta = (valorDoContrato / ultimoDiaDoMes) * dayGap;
    } else {
      valorDaConta = valorDoContrato;
    }
  }

  // Calculo do status da conta para contrato informado com data
  // anterior a data atual
  if (vencimentoDaConta < new Date(Date.now())) {
    statusDaConta = false;
  }

  return {
    vencimentoDaConta,
    valorDaConta,
    statusDaConta,
  };
};

// console.log(vencimentoDasCobranças(20, 1, 104, "2021-11-20"));

const CriarContas = (
  valorContrato,
  mesesFidelidade,
  VencimentoContrato,
  inicioDoContrato
) => {
  const contas = [];

  const nucleoConta = (i) => {
    const info = vencimentoDasCobranças(
      VencimentoContrato,
      i,
      valorContrato,
      inicioDoContrato
    );
    const { vencimentoDaConta, valorDaConta, statusDaConta } = info;

    return { vencimentoDaConta, valorDaConta, statusDaConta };
  };

  for (let i = 1; i < mesesFidelidade + 1; i++) {
    contas.push({
      vencimentoDaConta: nucleoConta(i).vencimentoDaConta,
      observacoesDaConta: undefined,
      valorDaConta: nucleoConta(i).valorDaConta,
      statusDaConta: nucleoConta(i).statusDaConta,
    });
  }

  return contas;
};

// console.log(CriarContas(104, 3, 20, "2021-9-05"));

module.exports = CriarContas;
