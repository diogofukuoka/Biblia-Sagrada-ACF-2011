const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const targetAppend = `        if (prepend) {
           const topSentinel = document.getElementById("notes-sentinel-top");
           if (topSentinel && topSentinel.nextSibling) {
              mobileFeed.insertBefore(wrap, topSentinel.nextSibling);
           } else {
              mobileFeed.prepend(wrap);
           }
        } else {
           mobileFeed.appendChild(wrap);
        }`;
        
const replaceAppend = `        if (prepend) {
           const topSentinel = document.getElementById("notes-sentinel-top");
           if (topSentinel && topSentinel.nextSibling) {
              mobileFeed.insertBefore(wrap, topSentinel.nextSibling);
           } else {
              mobileFeed.prepend(wrap);
           }
        } else {
           const bottomSentinel = document.getElementById("notes-sentinel-bottom");
           if (bottomSentinel) {
              mobileFeed.insertBefore(wrap, bottomSentinel);
           } else {
              mobileFeed.appendChild(wrap);
           }
        }`;

code = code.replace(targetAppend, replaceAppend);
fs.writeFileSync('index.html', code);
console.log("Success patch sentinel");
