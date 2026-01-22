// vulnerable-codeql.js - Test file for GitHub CodeQL code scanning
// Common patterns: prototype pollution, eval injection, unsafe regex

// Prototype pollution (CodeQL query: js/prototype-pollution)
function mergeDeep(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object' && source[key] !== null) {
      mergeDeep(target[key] || (target[key] = {}), source[key]);
    } else {
      target[key] = source[key];  // Vulnerable: no __proto__ protection
    }
  }
  return target;
}

// Unsafe eval on user input (CodeQL: js/eval-injection)
function processCommand(cmd) {
  return eval(cmd);  // Direct eval - RCE risk
}

// Path traversal via unsanitized input (CodeQL: js/path-traversal)
const fs = require('fs');
function readFile(filename) {
  return fs.readFileSync(filename, 'utf8');  // No sanitization
}

// Regex DoS (ReDoS) - evil regex (CodeQL: js/regex-injection or similar)
const EVIL_REGEX = /^(a+)+$/;  // Catastrophic backtracking
function validateInput(input) {
  return EVIL_REGEX.test(input);
}

// XSS via innerHTML (CodeQL: js/xss)
function renderUserContent(userHtml) {
  document.getElementById('content').innerHTML = userHtml;  // Direct DOM sink
}

// Demo exploitation
const polluted = { __proto__: { admin: true } };
const config = {};
mergeDeep(config, polluted);
console.log(config.admin);  // true - polluted prototype

processCommand('alert("XSS via eval")');
validateInput('aaaaaaaaaaaaaaaa!');  // Hangs on ReDoS
