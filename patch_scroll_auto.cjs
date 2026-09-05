const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetJs = `                 const scrollPos = readerContainer.scrollTop + elementRect.top - containerRect.top - 20; 
                 readerContainer.scrollTo({ top: scrollPos, behavior: "smooth" });
              } else {
                 targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
              }`;

const replaceJs = `                 const scrollPos = readerContainer.scrollTop + elementRect.top - containerRect.top - 20; 
                 readerContainer.scrollTo({ top: scrollPos, behavior: "auto" });
              } else {
                 targetEl.scrollIntoView({ behavior: "auto", block: "start" });
              }`;

if (code.includes(targetJs)) {
    code = code.replace(targetJs, replaceJs);
    fs.writeFileSync('index.html', code);
    console.log("Success");
} else {
    console.log("Target not found");
}
