const { execSync: execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const GIT_HASH = execSync('git rev-parse head').toString();
const text = `

/** 
 Git Hash: ${GIT_HASH} Create At: ${new Date().toLocaleString()}
*/
`;
fs.appendFileSync(path.join(__dirname, '..', 'dist', 'NosUploader.js'), text);
