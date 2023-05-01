// preinit-script.js
require("dotenv").config();
const { exec } = require("child_process");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
console.log("GITHUB_TOKEN:", GITHUB_TOKEN);
const command = `curl -u Kastholm:${GITHUB_TOKEN} https://api.github.com/user/repos -d "{\\"name\\":\\"AngularPlanner\\"}"`;

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
