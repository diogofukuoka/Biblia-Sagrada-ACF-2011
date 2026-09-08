const fs = require('fs');
let code = fs.readFileSync('index.html', 'utf8');

// 1. Hide .header-brand on mobile
const cssTarget = `    @media (max-width: 640px) {
      .sync-toggle-label {
        display: none;
      }
    }`;
const cssReplace = `    @media (max-width: 640px) {
      .sync-toggle-label {
        display: none;
      }
      .header-brand {
        display: none !important;
      }
    }`;
code = code.replace(cssTarget, cssReplace);


// 2. Change sync switch to simple checkbox
const targetSwitch = `        <div class="sync-toggle-container" title="Sincronizar Rolagem">
          <label class="switch">
            <input type="checkbox" id="sync-scroll-toggle" checked>
            <span class="slider"></span>
          </label>
          <span class="sync-toggle-label">Sync</span>
        </div>`;

const replaceSwitch = `        <div class="sync-toggle-container" title="Sincronizar Rolagem" style="margin-right: 8px;">
          <input type="checkbox" id="sync-scroll-toggle" checked style="cursor: pointer; width: 16px; height: 16px;">
          <label for="sync-scroll-toggle" class="sync-toggle-label" style="cursor: pointer;">Sync</label>
        </div>`;

code = code.replace(targetSwitch, replaceSwitch);

// 3. Remove .switch CSS since it's no longer used
const targetSwitchCSS = `    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 20px;
    }
    .switch input { 
      opacity: 0;
      width: 0;
      height: 0;
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: #ccc;
      transition: .4s;
      border-radius: 34px;
    }
    .slider:before {
      position: absolute;
      content: "";
      height: 16px;
      width: 16px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
    }
    input:checked + .slider {
      background-color: #2196F3;
    }
    input:checked + .slider:before {
      transform: translateX(20px);
    }`;

code = code.replace(targetSwitchCSS, '');

fs.writeFileSync('index.html', code);
console.log("Success update header");
