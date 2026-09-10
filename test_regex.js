const regex = /^(.*?)(?:\s*\]?\s*(\(.*?\))\.?)?\s*\]?\.?$/;
console.log("No parens:", "Comando".match(regex));
console.log("Only parens:", "(Mandato Negativo)".match(regex));
console.log("Both:", "Comando (Teste).".match(regex));
