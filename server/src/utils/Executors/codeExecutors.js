const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeCode = async (code, input) => {
    // Define paths for the code and input files
    const codeFilePath = path.join(__dirname, 'code.cpp');
    const inputFilePath = path.join(__dirname, 'input.txt');
    const dockerfileDir = path.join(__dirname);

    // Write code and input to files
    fs.writeFileSync(codeFilePath, code);
    fs.writeFileSync(inputFilePath, input);

    return new Promise((resolve, reject) => {
        // Docker command to build and run the container
        exec(`docker build -t code-executor ${dockerfileDir} && docker run --rm -v ${dockerfileDir}:/app code-executor`, (error, stdout, stderr) => {
            // Clean up temporary files
            fs.unlinkSync(codeFilePath);
            fs.unlinkSync(inputFilePath);

            if (error) {
                reject(`Execution Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

module.exports = { executeCode };
