fetch("https://raw.githubusercontent.com/marcossancal/Biblias-em-JSON/master/json/biblia-almeida-corrigida-fiel.json")
  .then(r => r.json())
  .then(data => {
    // Find Romanos
    const rm = data.find(b => b.livro.toLowerCase() === "rm" || b.livro === "Romanos");
    console.log("Romanos found?", !!rm);
    if (rm) {
        // Wait, the structure is an array of entries { livro, capitulo, versiculos } ?
    }
    
    let rmChap11 = data.find(entry => entry.livro.toLowerCase() === 'rm' && entry.capitulo == 11);
    if(rmChap11) {
        console.log("Rm 11 length:", rmChap11.versiculos.length);
        console.log("Rm 11 verses keys:", Object.keys(rmChap11.versiculos).length);
        console.log("Last verse:", Object.keys(rmChap11.versiculos).pop());
    } else {
        console.log("Rm 11 not found by 'rm'");
    }
  })
  .catch(console.error);
