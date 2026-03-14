# 楽天イーグルス 2026 試合結果まとめ

楽天イーグルスの2026年オープン戦を見やすく一覧表示するための React + Vite + TypeScript 製Webアプリです。  
ローカルJSONを読む構成から始めつつ、現在は GitHub Actions で無料の定期更新ができるようにしています。

## 主な機能

- 最終更新日時つきのヘッダー表示
- 総試合数、勝数、敗数、引き分け数、勝率のサマリー
- 月、相手球団、ホーム/ビジター、試合状態による絞り込み
- 直近の試合結果をハイライト表示
- 過去の試合結果と今後の試合予定を分離表示
- 試合クリックで詳細モーダル表示
- URLベースのQRコード表示

## ディレクトリ構成

```text
public/data/games-2026-preseason.json
scripts/update-preseason-data.mjs
.github/workflows/update-preseason-data.yml
src/components/
src/services/gameService.ts
src/types/game.ts
src/utils/
```

## ローカル起動手順

```bash
npm install
npm run dev
```

スマホから確認したい場合は、LAN内で開けるように次を使ってください。

```bash
npm run dev:host
```

Windows では `start-dev.bat` をダブルクリックして起動することもできます。

## ビルド

```bash
npm run build
```

ビルド成果物は `dist` に出力されます。

## GitHub Pages

- `vite.config.ts` で `base: './'` を設定済みです
- `main` ブランチのソースをそのまま公開すると空白ページになるため、`gh-pages` ブランチを公開元にしてください
- 公開URLでアクセスすると、画面右上にそのURLを元にしたQRコードが表示されます

### 手動デプロイ

```bash
npm run deploy
```

このコマンドで `dist` が生成され、`gh-pages` ブランチへ公開用ファイルが push されます。  
GitHub 側の Pages 設定では、公開元を `gh-pages` ブランチの `/ (root)` にしてください。

## 無料での定期更新

GitHub Actions を使って、`public/data/games-2026-preseason.json` を無料で定期更新する構成を入れています。

- ワークフロー: `.github/workflows/update-preseason-data.yml`
- 更新元: [NPB公式 2026年度 春季非公式試合（オープン戦）](https://npb.jp/preseason/2026/schedule_detail.html)
- 更新スクリプト: `scripts/update-preseason-data.mjs`
- 実行タイミング: 3時間ごとと、Actions の手動実行

GitHub Actions の cron は UTC です。  
現在の設定 `5 */3 * * *` は、日本時間では毎日おおむね `00:05 / 03:05 / 06:05 / 09:05 / 12:05 / 15:05 / 18:05 / 21:05` 頃の更新です。

### ローカルで更新を試す

```bash
npm run update:data
```

## GitHub へ push する手順

```bash
git init
git branch -M main
git remote add origin https://github.com/mura5516k/rakuten_results.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

## データ追加方針

- 現在は `public/data/games-2026-preseason.json` を `gameService.ts` から取得しています
- 将来的に 2026 公式戦を追加する場合は、JSONを増やして service 層を差し替えやすい構成です
- 型定義は `src/types/game.ts` に集約しています
