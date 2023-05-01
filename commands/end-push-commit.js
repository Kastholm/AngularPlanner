// commit-and-push.js
const { exec } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter the commit message: ", (commitMessage) => {
  const commands = [
    "git add .",
    `git commit -m "${commitMessage}"`,
    "git push",
    "rmdir /s /q node_modules",
    "taskkill /F /IM code.exe",
  ];

  const runCommand = (index) => {
    if (index >= commands.length) {
      rl.close();
      return;
    }

    const command = commands[index];
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`);
        console.error(`exec error: ${error}`);
        rl.close();
        return;
      }

      console.log(`Output for command: ${command}`);
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);

      runCommand(index + 1);
    });
  };

  runCommand(0);
});
