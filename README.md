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
git config --global user.name  ${name}
git config --global user.email  ${email}

# 設定打錯命令時 3 秒內會自動做出判斷
git config --global help.autocorrect 30

# 現在大多編輯器都已經能正確處理 CRLF 字元，不再需要自動轉換了！
git config --global core.autocrlf false

# 為了能正確顯示 UTF-8 中文字
git config --global core.quotepath false

# 避免 Windows 平台的檔案路徑長度問題
git config --global core.longpaths true

# git svn dcommit 時會自動刪除 SVN 庫空白的資料夾 (但是不會刪除非空白的資料夾)
git config --global svn.rmdir true

# 在命令列環境下自動標示顏色
git config --global color.diff auto
git config --global color.status auto
git config --global color.branch auto

# 常用的 Git Alias 命令
git config --global alias.ci   "commit --allow-empty-message"
git config --global alias.cm   "commit --amend -C HEAD"
git config --global alias.co   checkout
git config --global alias.ss   status
git config --global alias.sts  "status -s"
git config --global alias.br   branch
git config --global alias.re   remote
git config --global alias.di   diff
git config --global alias.type "cat-file -t"
git config --global alias.dump "cat-file -p"
git config --global alias.lo   "log --oneline"
git config --global alias.ls   "log --show-signature"
git config --global alias.ll   "log --pretty='%C(Yellow)%h%x09%C(reset)(%ci) %C(Cyan)%an: %C(reset)%s' --date=short"
git config --global alias.lg   "log --graph --pretty=format:'%Cred%h%Creset %ad |%C(yellow)%d%Creset %s %Cgreen(%cr)%Creset [%Cgreen%an%Creset]' --abbrev-commit --date=short"
git config --global alias.alias "config --get-regexp ^alias\."

# Link: https://blog.miniasp.com/post/2020/05/24/Setup-git-ignore-alias-to-download-gitignore-templates
# 可以使用 git ignore list 來查看可以下載的 .gitignore 檔案
# 可以使用 git ignore <templates> >> .gitignore 來下載 .gitignore 檔案
# 可以用 git changelog 來產生 CHANGELOG.md 檔案，需搭配 npm commitizen, cz-conventional-changelog, conventional-changelog-cli 等套件

# 必須是 Windows 平台才會執行以下設定
git config --global alias.ignore '!gi() { curl -sL https://www.gitignore.io/api/$@ ;}; gi'
git config --global alias.iac '!giac() { git init -b main && git add . && git commit -m 'Initial commit' ;}; giac'
git config --global alias.changelog "!conventional-changelog -p angular -i CHANGELOG.md -s"

# 必須是 Linux/macOS 平台才會執行以下設定
git config --global alias.ignore '!'"gi() { curl -sL https://www.gitignore.io/api/\$@ ;}; gi"
git config --global alias.iac '!'"giac() { git init -b main && git add . && git commit -m 'Initial commit' ;}; giac"
git config --global alias.changelog '!'"conventional-changelog -p angular -i CHANGELOG.md -s"


# 必須是 Windows 平台且有安裝 TortoiseGit 才會設定 tlog 這個 alias
git config --global alias.tlog "!start 'C:\\PROGRA~1\\TortoiseGit\\bin\\TortoiseGitProc.exe' /command:log /path:."
```

## 提供建議

如果您對本工具有任何想法，歡迎到[這裡](https://github.com/leoli0605/npm-git-setup/issues)留言討論！

## 作者資訊

- **LeoLi**
- 部落格：https://leo.dinosauria.club/

## 相關連結

- [2.7 Git 基礎 - Git Aliases](https://git-scm.com/book/zh-tw/v2/Git-%E5%9F%BA%E7%A4%8E-Git-Aliases)
- [Creating CLI Executable global npm module](https://medium.com/@thatisuday/creating-cli-executable-global-npm-module-5ef734febe32)
