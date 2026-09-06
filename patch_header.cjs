const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

const target1 = `    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }`;
const replace1 = `    .header-actions {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      flex-shrink: 0;
    }`;

const target2 = `    .header-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
    }`;
const replace2 = `    .header-brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      cursor: pointer;
      flex-shrink: 0;
    }`;

const target3 = `    .top-bible-selector {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      margin: 0 1rem;
      justify-content: flex-start;
    }`;
const replace3 = `    .top-bible-selector {
      position: relative;
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      margin: 0 1rem;
      justify-content: flex-start;
    }`;

const target4 = `    .btn-top-bible-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      width: auto;
      height: 44px;
      padding: 0 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background-color: var(--ui-bg);
      color: var(--text-primary);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      text-align: left;
      user-select: none;
    }`;
const replace4 = `    .btn-top-bible-trigger {
      display: inline-flex;
      align-items: center;
      gap: 0.75rem;
      width: auto;
      max-width: 100%;
      height: 44px;
      padding: 0 1rem;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background-color: var(--ui-bg);
      color: var(--text-primary);
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: var(--transition);
      text-align: left;
      user-select: none;
      min-width: 0;
    }`;

const target5 = `    .trigger-text-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
    }`;
const replace5 = `    .trigger-text-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1px;
      min-width: 0;
      overflow: hidden;
    }`;

if (code.includes(target1)) code = code.replace(target1, replace1);
if (code.includes(target2)) code = code.replace(target2, replace2);
if (code.includes(target3)) code = code.replace(target3, replace3);
if (code.includes(target4)) code = code.replace(target4, replace4);
if (code.includes(target5)) code = code.replace(target5, replace5);

fs.writeFileSync('index.html', code);
console.log("Success patch");
