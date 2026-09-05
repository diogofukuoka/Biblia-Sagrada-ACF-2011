fetch("https://raw.githubusercontent.com/marcossancal/Biblias-em-JSON/master/json/biblia-almeida-corrigida-fiel.json")
  .then(r => r.json())
  .then(data => {
    let rmChap11 = data.find(entry => entry.livro.toLowerCase() === 'rm' && entry.capitulo == 11);
    console.log("Is array?", Array.isArray(rmChap11.versiculos));
    console.log("First element:", rmChap11.versiculos[0]);
    console.log("Second element:", rmChap11.versiculos[1]);
  })
  .catch(console.error);
