const acharDiaUtil = (diaUtil, feriado) => {
  const initialDate = new Date(Date.now());

  const ultimoDiaDoMes = new Date(
    initialDate.getFullYear(),
    initialDate.getMonth() + 1,
    0
  ).getDate();

  const diasDoMes = [];

  for (let i = 1; i <= ultimoDiaDoMes; i++) {
    diasDoMes.push(i);
  }

  const finaisDeSemana = diasDoMes.filter((dia) => {
    const date = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      dia
    );
    const isFimDeSemana = date.getDay() in { 0: "Sunday", 6: "Saturday" };

    return isFimDeSemana;
  });

  let DiasUteis = diasDoMes.filter((e) => {
    let i = finaisDeSemana.indexOf(e);
    return i == -1 ? true : (finaisDeSemana.splice(i, 1), false);
  });

  const feriados = [feriado];

  let feriadosMes = DiasUteis.filter((e) => {
    let i = feriados.indexOf(e);
    return i == -1 ? true : (feriados.splice(i, 1), false);
  });

  if (feriadosMes[diaUtil - 1] < initialDate.getDate()) {
    const final = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      feriadosMes[diaUtil - 1]
    );
    return final;
  } else {
    const final = new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      feriadosMes[diaUtil - 1]
    );
    return final;
  }
};

// console.log(AchardIAuTIL(5, 2));

module.exports = acharDiaUtil;
