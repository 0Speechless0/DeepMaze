
#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
# 建立輸出檔案
npm run build
# 先刪除遠端分支解決快取問題
git push origin --delete gh-pages
# 移動至到打包後的dist目錄
cd dist

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init
git add -A
git commit -m 'deploy'

# 將 dist資料夾中的內容推送至遠端 hexWeek6Demo的 gh-pages分支中，並強制無條件將舊有的內容取代成目前的內容（指令 git push -f)
git push -f https://github.com/0Speechless0/DeepMaze.git

cd -
