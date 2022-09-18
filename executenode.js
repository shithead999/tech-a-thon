const { exec } = require("child_process");
const path = require("path")
const inputFile = path.join(__dirname, "input.txt");

const executenode = (filepath) => {
  return new Promise((resolve, reject) => {
    exec(
      `node ${filepath} < ${inputFile}`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};

module.exports = {
  executenode,
};
