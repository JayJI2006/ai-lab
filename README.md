# AI Lab

AI Lab 是一個繁體中文的個人 AI 學習與作品網站。網站使用原生 HTML、CSS、JavaScript，含首頁、技能、作品與聯絡四個區塊。它不需要安裝套件、執行建置或架設後端。

## 本機預覽

最簡單的方式是在檔案總管開啟 `ai-lab` 資料夾，雙擊 `index.html`。請保留 `assets` 資料夾與 `index.html` 的相對位置，圖片、樣式與互動才能正常載入。

如果已安裝 Python 3，也可以在專案資料夾開啟終端機，執行以下指令。

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

如果系統使用 `python3` 指令，請將上方的 `py` 改成 `python3`。在瀏覽器開啟 [本機預覽](http://127.0.0.1:8000/)。修改後重新整理頁面，按 `Ctrl+C` 停止伺服器。

## 檔案結構

```text
ai-lab/
├── index.html                # 內容、導覽與作品卡片
├── assets/
│   ├── styles.css            # 色彩、版面、動畫與響應式設定
│   ├── main.js               # 手機選單、區段導覽狀態及作品篩選
│   └── particle-torus.jpg    # 首頁插圖
├── .nojekyll                 # 讓 GitHub Pages 直接提供靜態檔案
└── README.md
```

## 更新網站內容

- 在 `index.html` 的 `#skills` 修改技能與學習方向，依實際進度更新敘述。
- 在 `#project-grid` 複製一張作品卡片並調整內容。開發中的作品沿用 `data-status="in-progress"` 和「開發中」標籤。完成後將狀態改為 `data-status="complete"`，並將標籤樣式改為 `status status-complete`。
- 在 `#contact` 將暫留文字改成你願意公開的聯絡方式，例如連往你的 GitHub 個人頁面。
- 在 `assets/styles.css` 的 `:root` 調整全站配色。站內檔案使用相對路徑，適用於本機及 GitHub Pages 的專案子路徑。

## 確認後部署到 GitHub Pages

確認公開版的作品文字與聯絡方式後，再進行下面的步驟。使用 GitHub Free 時，這個部署方式需要公開儲存庫，訪客可看到原始碼。網站檔案只應包含你願意公開的資訊。 [建立 GitHub Pages 網站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

1. 登入 GitHub，在你的帳號下建立名為 `ai-lab` 的儲存庫。
2. 在 **Code** 頁籤選擇 **Add file** → **Upload files**。如果儲存庫是空的，選擇頁面上的 **uploading an existing file**。上傳本資料夾內的 `index.html`、`README.md`、`.nojekyll` 與整個 `assets/`，保留原本的檔案結構，提交到 `main`。Git 使用者也可直接推送同一組檔案。
3. 確認 `index.html`、`.nojekyll` 與 `assets/` 都在儲存庫根目錄。網頁用到的 CSS、JavaScript 與圖片均在 `assets/`，可直接由 GitHub Pages 提供。
4. 進入 **Settings** → **Pages**。在 **Build and deployment** 下，將 **Source** 設為 **Deploy from a branch**，選擇 `main` 和 `/(root)`，再按 **Save**。按下後便會開始部署。
5. 在 **Actions** 查看部署結果，成功後回到 **Settings** → **Pages** 開啟網站。一般專案網址為 `https://你的帳號.github.io/ai-lab/`。用手機開啟線上頁面，確認主圖、導覽與作品篩選正常。

啟用後，每次將修改提交到發佈來源 `main`，GitHub Pages 都會重新部署。 [設定發佈來源](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 首頁插圖

`assets/particle-torus.jpg` 由內建 ImageGen 生成。生成提示詞如下。

> Create a 3:2 landscape hero illustration for a dark personal AI development portfolio. A single centered, tilted torus made of thousands of fine luminous lavender, violet and icy-blue particles and flowing fiber-optic strands, twisting in three dimensions around a dark center. A few fine orbital ellipses and a faint technical coordinate grid sit behind it in a near-black navy void. Camera looks slightly down on the form, with violet light strongest at upper right and blue at lower left. The entire torus fits within the middle 82% with ample breathing room at the edges. Make the silhouette and particle texture precise, dimensional and crisply rendered, with restrained glow. Use near-black ink, blue-violet and lavender only. No words, logos, labels, UI elements, frames, people or watermarks. Premium contemporary editorial 3D still, polished and striking on a compact right-hand website panel.
