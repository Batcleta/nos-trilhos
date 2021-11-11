const DataDeVencimento = (
  vencimentoCartão,
  fechamentoDoCartão,
  numeroDaParcela,
  dataDaCompra
) => {
  const date = new Date(dataDaCompra);
  let parcela = numeroDaParcela;

  if (date.getDate() < fechamentoDoCartão) {
    parcela = numeroDaParcela - 1;
  }

  const vencimentoDaParcela = new Date(
    date.getFullYear(),
    date.getMonth() + parcela,
    vencimentoCartão
  );

  return vencimentoDaParcela;
};

const Parcelamento = (
  valorTotal,
  parcelas,
  vencimentoCartão,
  fechamentoDoCartão,
  dataDaCompra
) => {
  const valorParcelado = valorTotal / parcelas;
  const valorTeste = valorParcelado.toFixed(2);
  const Parcelas = [];
  const vencimentoDasParcelas = (i) =>
    DataDeVencimento(vencimentoCartão, fechamentoDoCartão, i, dataDaCompra);

  for (let i = 1; i <= parcelas; i++) {
    Parcelas.push({
      valorParcela: valorTeste,
      vencimentoParcela: vencimentoDasParcelas(i),
      numeroParcela: i,
      status: vencimentoDasParcelas(i) < new Date(Date.now()) ? false : true,
    });
  }

  return Parcelas;
};
//
// console.log(Parcelamento(700, 8, 15, 10, new Date(2021, 6, 11)));
// console.log(DataDeVencimento(15, 10, 6));

module.exports = Parcelamento;

// console.log(700 / 8);

// Verificar valores sendo arredondados para envio a base
