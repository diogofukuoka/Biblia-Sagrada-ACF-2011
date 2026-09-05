const text = `7. Diagramador Bíblico / Analista de Versículos
2 João 1:1
[ O ancião ] → A Autoridade Apostólica e Maturidade
[ à senhora eleita, ] → O Alvo da Graça (A Igreja / Corpo de CRISTO)
[ e a seus filhos, ] → Os Frutos da Eleição (Os Salvos)
[ aos quais amo ] → O Vínculo Cristão Verdadeiro
[ na verdade, ] → A Base Inabalável (A Esfera do Amor)
[ e não somente eu, ] → O Contraste de Inclusão
[ mas também todos ] → A Universalidade do Corpo de CRISTO
[ os que têm conhecido ] → A Experiência Salvífica Intransferível e Eterna
[ a verdade, ] → A Revelação Eterna e Absoluta
8. Análise de Fraseamento (Phrasing) e Rótulos Semânticos
[ O ancião à senhora eleita, e a seus filhos, ] → Identificação e Endereçamento (Remetente e Destinatários)
[ aos quais amo na verdade, ] → Modo / Esfera de Ação (Condição subjacente do amor)
[ e não somente eu, ] → Contraste Negativo / Inclusão Antecipada
[ mas também todos os que têm conhecido a verdade, ] → Adição e Qualificação de Sujeito Conjunto (A base da comunhão coletiva`;

const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");

for (let rawLine of lines) {
  const line = rawLine.trim();
  if (line.match(/^7\.\s*Diagramador B[íi]blico\s*\/\s*Analista de Vers[íi]culos/i)) {
    console.log("MATCHED 7");
  }
  if (line.match(/^8\.\s*An[áa]lise de Fraseamento\s*\(Phrasing\)\s*e R[óo]tulos Sem[âa]nticos/i)) {
    console.log("MATCHED 8");
  }
}
