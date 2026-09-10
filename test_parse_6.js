const fs = require('fs');

let textToProcess = `7- Diagramador Bíblico / Analista de VersículosSalmos 22:22[ Então ] → A Consequência Lógica e Temporal da Vitória Divina[ declararei ] → A Ação Solene e Intencional de Proclamação[ o TEU nome ] → A Revelação da Essência e Autoridade de DEUS[ aos meus irmãos; ] → Os Beneficiários da Graça (A Família da Fé)[ louvar-te-ei ] → A Resposta Extrema de Adoração e Exaltação[ no meio ] → O Centro Exato da Comunhão[ da congregação. ] → A Assembleia Universal dos Remidos  8- Análise de Fraseamento (Phrasing) e Rótulos Semânticos"Então declararei o TEU nome aos meus irmãos;" (Oração coordenada sindética/temporal indicando Consequência / Resultado direto da intervenção e ressurreição divina sobre a morte, expressando a missão ativa de testificar).  "louvar-te-ei no meio da congregação." (Oração coordenada sindética por assindeto/paralelismo progressivo indicando Modo e Espaço da Adoração, demonstrando que o louvor gerado pela redenção é essencialmente comunitário e público).`;

textToProcess = textToProcess.replace(/([A-Za-z0-9)])\s*(?:\d+-)?\s*(Diagramador B[íi]blico)/gi, "$1\nI. $2");
textToProcess = textToProcess.replace(/([A-Za-z0-9)])\s*(?:\d+-)?\s*(An[áa]lise de Fraseamento)/gi, "$1\nII. $2");
textToProcess = textToProcess.replace(/^\s*\d+-\s*(Diagramador B[íi]blico)/gim, "I. $1");
textToProcess = textToProcess.replace(/^\s*\d+-\s*(An[áa]lise de Fraseamento)/gim, "II. $1");
textToProcess = textToProcess.replace(/([^\n])\s*\[\s*([^\]]+)\s*\]\s*(?:-|—|->|→|—>)/g, "$1\n[ $2 ] →");
textToProcess = textToProcess.replace(/\)\s*\[/g, ")\n[");
textToProcess = textToProcess.replace(/(\)\.)\s*"/g, "$1\n\"");
textToProcess = textToProcess.replace(/([a-zA-Z0-9)])\s*(")/g, "$1\n$2");
textToProcess = textToProcess.replace(/(Analista de Vers[íi]culos)([A-Z][a-z]+ \d+:\d+)/gi, "$1\n$2\n");

console.log(textToProcess);
