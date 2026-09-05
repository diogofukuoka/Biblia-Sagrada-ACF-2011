fetch("https://bible-api.com/Romanos+11?translation=almeida")
  .then(r => r.json())
  .then(d => {
    if (d.error) {
      console.log("Error:", d.error);
    } else {
      console.log("Verses length:", d.verses.length);
    }
  })
  .catch(console.error);
