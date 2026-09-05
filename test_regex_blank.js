const prev = "Graça, misericórdia e paz, (Sujeito Composto / Núcleo da Bênção)";
const next = "da parte de DEUS PAI (Origem / Agência Primária)";

const regex1 = /^\[\s*(.+?)\s*\]\s*(?:→|->|—>|-->|→)\s*(.+)$/;
const regex2 = /^([^(]+?)\s*(\(.+?\))\.?$/;

console.log("Prev:", regex1.test(prev) || regex2.test(prev));
console.log("Next:", regex1.test(next) || regex2.test(next));
