// vulnerable.js - Test file for GitHub Advanced Security
// WARNING: Do not use in production! Hardcoded secrets and unsafe code.

// Hardcoded AWS secret key (triggers secret scanning)
const AWS_ACCESS_KEY_ID = 'AKIAIOSFODNN7EXAMPLE';  // Invalid example key
const AWS_SECRET_ACCESS_KEY = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY';

// Prototype pollution vulnerability (common CodeQL alert)
function mergeUserData(target, source) {
  for (let key in source) {
    target[key] = source[key];  // No __proto__ check - vulnerable to pollution
  }
  return target;
}

// Unsanitized eval usage (triggers code scanning)
function executeUserInput(input) {
  return eval(input);  // Direct eval on untrusted input - XSS/RCE risk
}

// Example usage demonstrating vulnerabilities
const userInput = "alert('XSS from eval!')";
console.log(executeUserInput(userInput));

const maliciousPayload = { '__proto__': { 'isAdmin': true } };
const appConfig = {};
mergeUserData(appConfig, maliciousPayload);
console.log(appConfig.isAdmin);  // true - polluted!

// Deprecated/insecure crypto (another CodeQL flag)
const crypto = require('crypto');
const insecureHash = crypto.createHash('md5');  // MD5 is broken
