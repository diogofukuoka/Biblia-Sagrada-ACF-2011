const lines = [
  'Condição Negativa: "Todo aquele que prevarica, e não persevera na doutrina de Cristo"',
  'Resultado do Julgamento: "não tem a DEUS."',
  'Condição Positiva / Contraste: "Quem persevera na doutrina de Cristo"',
  'Resultado da Promessa (Bênção): "esse tem tanto ao PAI como ao FILHO."'
];

for (const line of lines) {
  const match3 = line.match(/^([^:]+?):\s*"(.+)"\s*$/);
  if (match3) {
    const boldText = match3[1].trim(); // Rótulo
    const bibleText = match3[2].trim(); // Texto Bíblico
    console.log(`[ *${bibleText}* ] -> **${boldText}**`);
  } else {
    console.log("No match:", line);
  }
}
