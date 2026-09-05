fetch("https://bible-api.com/romanos+11?translation=almeida")
  .then(r => r.json())
  .then(d => {
    console.log("Verses in Romanos 11:", d.verses.length);
  })
  .catch(console.error);
