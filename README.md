# git-setup

本工具是基於 [@willh/git-setup](https://www.npmjs.com/package/@willh/git-setup) 的開源專案，添加修改成符合個人的使用習慣。
主要功能為全自動設定 Git 版控環境，並且跨平台支援 Windows, Linux, macOS 等作業系統的命令列環境，尤其針對中文環境經常會出現亂碼的問題都會完整的解決。

## 先決條件

- [Node.js](https://nodejs.org/en/) 10.13.0 以上版本
- [Git](https://git-scm.com/) 任意版本 (建議升級到最新版)

## 使用方式

```sh
npx @leoli0605/git-setup
```

- 設定過程會詢問你的 `user.name` 與 `user.email` 資訊
  - Email 會進行格式驗證，格式錯誤會拒絕設定下去
- 所有 Git 設定都會以 `--global` 為主 (`~/.gitconfig`)
- Windows 平台會自動設定 `LC_ALL` 與 `LANG` 使用者環境變數
  - Linux, macOS 平台會提醒進行設定

## 設定內容

```sh
git config --global user.name  "${name}"
git config --global user.email  "${email}"

git config --global core.autocrlf false
git config --global core.quotepath false
git config --global core.longpaths true
git config --global svn.rmdir true

git config --global help.autocorrect 30

git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto

git config --global pull.rebase true
git config --global push.followTags true

git config --global alias.list '!'"git --no-pager config --global --list"
git config --global alias.co   checkout
git config --global alias.ss   status
git config --global alias.br   branch
git config --global alias.re   remote
git config --global alias.pf "push --force-with-lease"
git config --global alias.di   diff

git config --global alias.ci   "commit --allow-empty-message"
git config --global alias.cm   "commit --amend -C HEAD"

git config --global alias.lo   "log --oneline"
git config --global alias.ls   "log --show-signature"
git config --global alias.ll   "log --pretty='%C(Yellow)%h%x09%C(reset)(%ci) %C(Cyan)%an: %C(reset)%s' --date=short"
git config --global alias.lg   "log --graph --pretty=format:'%Cred%h%Creset %ad |%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset [%Cgreen%an%Creset]' --abbrev-commit --date=short"

git config --global alias.sts  "status -s"
git config --global alias.type "cat-file -t"
git config --global alias.dump "cat-file -p"

git config --global alias.alias "config --get-regexp ^alias\."

# 跨平台的 .gitignore 快速設定指令
git config --global alias.ignore '!'"gi() { curl -sL https://www.gitignore.io/api/\$@ ;}; gi"

# 快速初始化 Git 庫並做第一次提交的指令
git config --global alias.iac '!'"giac() { git init -b main && git add . && git commit -m 'Initial commit' ;}; giac"

# 快速清理工作目錄並復原已追蹤的檔案的指令
git config --global alias.cc '!'"gcc() { git checkout -- . && git clean -df ;}; gcc"

# 快速新增標籤的指令
git config --global alias.tg '!'"gtg() { git tag -a \"\$1\" -m \"\$1\" ;}; gtg"

# Windows 平台專用 TortoiseGit 日誌指令
git config --global alias.tlog "!start 'C:\\PROGRA~1\\TortoiseGit\\bin\\TortoiseGitProc.exe' /command:log /path:."

# 快速使用 Commitizen 進行提交的指令
git config --global alias.cz '!'"npx cz"

# 快速產生 CHANGELOG.md 檔案的指令
git config --global alias.changelog '!'"conventional-changelog -p angular -i CHANGELOG.md -s"

```

## 提供建議

如果您對本工具有任何想法，歡迎到[這裡](https://github.com/leoli0605/npm-git-setup/issues)留言討論！

## 作者資訊

- **LeoLi**
- 部落格：https://leo.dinosauria.club/

## 相關連結

- [2.7 Git 基礎 - Git Aliases](https://git-scm.com/book/zh-tw/v2/Git-%E5%9F%BA%E7%A4%8E-Git-Aliases)
- [Creating CLI Executable global npm module](https://medium.com/@thatisuday/creating-cli-executable-global-npm-module-5ef734febe32)
