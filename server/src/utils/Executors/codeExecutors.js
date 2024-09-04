const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const executeCode = async (code, input) => {
    // Defining the input files
    const codeFilePath = path.join(__dirname, 'code.cpp');
    const inputFilePath = path.join(__dirname, 'input.txt');
    const dockerfileDir = path.join(__dirname);

    // Transfering code to input files
    fs.writeFileSync(codeFilePath, code);
    fs.writeFileSync(inputFilePath, input);

    return new Promise((resolve, reject) => {
        // Running code in docker
        exec(`docker build -t code-executor ${dockerfileDir} && docker run --rm -v ${dockerfileDir}:/app code-executor`, (error, stdout, stderr) => {
            // Deleteing the above input files
            fs.unlinkSync(codeFilePath);
            fs.unlinkSync(inputFilePath);
            console.log(`Execution Error: ${stderr} and error is ${error}`)
            if (error) {
                console.error('Execution Error:', error);
                reject(`Execution Error: ${stderr || error.message}`);
            } else if (stderr) {
                const errorLines = stderr.trim().split('\n');
                const cppErrorIndex = errorLines.findIndex(line => line.includes('/app/code.cpp:'));

                if (cppErrorIndex !== -1) {
                    const relevantErrorLines = errorLines.slice(cppErrorIndex).join('\n');
                    console.log('Compilation or Runtime Error:', relevantErrorLines);
                    resolve(relevantErrorLines);
                } else {
                    console.log('No /app/code.cpp related error found.');
                    resolve(stdout);
                }
            } else {
                console.log('Execution Output:', stdout);
            }
        });
    });
};

module.exports = { executeCode };
