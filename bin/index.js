#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const os = require('os').platform();
const fs = require('fs');

(async function () {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function ask(subject) {
    return new Promise((resolve, reject) => {
      readline.question(subject + ' ', (ans) => {
        resolve(ans);
      });
    });
  }

  console.log('以下將會協助你進行 Git 版控環境設定：');
  console.log();

  const name = await ask(`請問您的顯示名稱？`);
  const email = await ask(`請問您的 E-mail 地址？`);

  if (!name) {
    console.error('You MUST configure user.name setting!');
    return;
  }

  if (!validateEmail(email)) {
    console.error('You MUST configure user.email setting!');
    return;
  }

  console.log();
  console.log('開始進行 Git 環境設定');
  console.log('------------------------------------------');

  // Git user configuration
  await cmd(`git config --global user.name "${name}"`);
  await cmd(`git config --global user.email "${email}"`);

  // Git core configuration
  await cmd('git config --global core.editor "vim"');
  await cmd('git config --global core.autocrlf false');
  await cmd('git config --global core.quotepath false');
  await cmd('git config --global core.longpaths true');
  await cmd('git config --global svn.rmdir true');

  // Git help configuration
  await cmd('git config --global help.autocorrect 30');

  // Git color configuration
  await cmd('git config --global color.diff auto');
  await cmd('git config --global color.status auto');
  await cmd('git config --global color.branch auto');

  // Git pull configuration
  await cmd('git config --global pull.rebase true');

  // Git push configuration
  await cmd('git config --global push.followTags true');

  // Git aliases for basic commands
  if (os === 'win32') {
    await cmd('git config --global alias.list "!git --no-pager config --global --list"');
  } else {
    await cmd('git config --global alias.list \'!\'"git --no-pager config --global --list"');
  }
  await cmd('git config --global alias.co checkout');
  await cmd('git config --global alias.ss status');
  await cmd('git config --global alias.br branch');
  await cmd('git config --global alias.re remote');
  await cmd('git config --global alias.pf "push --force-with-lease"');
  await cmd('git config --global alias.di diff');

  // Git aliases for commit-related commands
  await cmd('git config --global alias.ci "commit --allow-empty-message"');
  await cmd('git config --global alias.cm "commit --amend -C HEAD"');

  // Git aliases for log visualization
  await cmd('git config --global alias.lo "log --oneline"');
  await cmd('git config --global alias.ls "log --show-signature"');
  await cmd('git config --global alias.ll "log --pretty=\'%C(Yellow)%h%x09%C(reset)(%ci) %C(Cyan)%an: %C(reset)%s\' --date=short"');
  await cmd('git config --global alias.lg "log --graph --pretty=format:\'%Cred%h%Creset %ad |%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset [%Cgreen%an%Creset]\' --abbrev-commit --date=short"');

  // Git aliases for status and type inspection
  await cmd('git config --global alias.sts "status -s"');
  await cmd('git config --global alias.type "cat-file -t"');
  await cmd('git config --global alias.dump "cat-file -p"');

  // Git aliases for advanced configurations
  await cmd('git config --global alias.alias "config --get-regexp ^alias\\."');

  // Git ignore alias configuration
  if (os === 'win32') {
    await cmd('git config --global alias.ignore "!gi() { curl -sL https://www.gitignore.io/api/$@ ;}; gi"');
  } else {
    await cmd('git config --global alias.ignore \'!\'"gi() { curl -sL https://www.gitignore.io/api/\\$@ ;}; gi"');
  }

  // Git initial commit alias configuration
  if (os === 'win32') {
    await cmd('git config --global alias.iac "!giac() { git init -b main && git add . && git commit -m \'Initial commit\' ;}; giac"');
  } else {
    await cmd("git config --global alias.iac '!'\"giac() { git init -b main && git add . && git commit -m 'Initial commit' ;}; giac\"");
  }

  // Git checkout and clean alias configuration
  if (os === 'win32') {
    await cmd('git config --global alias.cc "!gcc() { git checkout -- . && git clean -df ;}; gcc"');
  } else {
    await cmd('git config --global alias.cc \'!\'"gcc() { git checkout -- . && git clean -df ;}; gcc"');
  }

  // Git tag alias configuration
  if (os === 'win32') {
    await cmd('git config --global alias.tg "!gtg() { git tag -a \\"$1\\" -m \\"$1\\" ;}; gtg"');
  } else {
    await cmd('git config --global alias.tg \'!\'"gtg() { git tag -a \\"\\$1\\" -m \\"\\$1\\" ;}; gtg"');
  }

  // TortoiseGit log alias configuration for Windows
  if (os === 'win32' && fs.existsSync('C:/PROGRA~1/TortoiseGit/bin/TortoiseGitProc.exe')) {
    await cmd("git config --global alias.tlog \"!start 'C:\\PROGRA~1\\TortoiseGit\\bin\\TortoiseGitProc.exe' /command:log /path:.");
  }

  // Commitizen and changelog alias configuration
  if (os === 'win32') {
    await cmd('git config --global alias.cz "!npx cz"');
    await cmd('git config --global alias.changelog "!conventional-changelog -p angular -i CHANGELOG.md -s -r 0"');
  } else {
    await cmd('git config --global alias.cz \'!\'"npx cz"');
    await cmd('git config --global alias.changelog \'!\'"conventional-changelog -p angular -i CHANGELOG.md -s -r 0"');
  }

  // Environment variable configuration
  if (!process.env.LC_ALL) {
    if (os === 'win32') {
      await cmd('SETX LC_ALL C.UTF-8');
      console.log('請重新啟動應用程式或命令提示字元以讓環境變數生效！');
    } else {
      console.log('BE REMEMBER SETUP THE FOLLOWING ENVIRONMENT VARIABLE:');
      console.warn('export LC_ALL=C.UTF-8');
    }
  }

  if (!process.env.LANG) {
    if (os === 'win32') {
      await cmd('SETX LANG C.UTF-8');
      console.log('請重新啟動應用程式或命令提示字元以讓環境變數生效！');
    } else {
      console.log('BE REMEMBER SETUP THE FOLLOWING ENVIRONMENT VARIABLE:');
      console.warn('export LANG=C.UTF-8');
    }
  }

  readline.close();
})();

async function cmd(command) {
  console.log(command);
  const { stdout, stderr } = await exec(command);
  if (stderr) {
    console.debug(stderr);
    return;
  }
  if (stdout) {
    console.log(stdout);
  }
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
