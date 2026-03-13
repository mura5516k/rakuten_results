# 楽天イーグルス 2026 試合結果まとめ

楽天イーグルスの2026年オープン戦を見やすく一覧表示するための React + Vite + TypeScript 製Webアプリです。  
ローカルJSONを読む構成にしているため、将来的に公式戦データやAPI連携へ拡張しやすくしています。

## 主な機能

- 最終更新日時つきのヘッダー表示
- 総試合数、勝数、敗数、引き分け数、勝率のサマリー
- 月、相手球団、ホーム/ビジター、試合状態による絞り込み
- スマホ対応のカード型一覧
- 試合クリックで詳細モーダル表示
- URLベースのQRコード表示

## ディレクトリ構成

```text
public/data/games-2026-preseason.json
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

Windows では [start-dev.bat](./start-dev.bat) をダブルクリックして起動することもできます。

## ビルド

```bash
npm run build
```

ビルド成果物は `dist` に出力されます。

## GitHub Pages で公開する前提のメモ

- `vite.config.ts` で `base: './'` を設定済みです
- GitHub Pages では `dist` を公開対象にしやすい構成です
- 公開URLでアクセスすると、画面右上にそのURLを元にしたQRコードが表示されます
- ローカル環境でQRコードを表示したい場合は `npm run dev:host` を使うか、`.env` に `VITE_PUBLIC_APP_URL=https://example.com` を設定してください
- `main` ブランチのソースをそのまま公開すると空白ページになるため、`dist` を `gh-pages` ブランチへデプロイしてください

### GitHub Pages 用デプロイ手順

```bash
npm install
npm run deploy
```

このコマンドで `dist` が生成され、`gh-pages` ブランチへ公開用ファイルが push されます。  
GitHub 側の Pages 設定では、公開元を `gh-pages` ブランチの `/ (root)` にしてください。

## GitHub へ push する手順

このプロジェクトを GitHub に反映する基本手順です。

```bash
git init
git branch -M main
git remote add origin https://github.com/mura5516k/rakuten_results.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

すでに remote がある場合は、次で確認できます。

```bash
git remote -v
```

## データ追加方針

- 現在は `public/data/games-2026-preseason.json` を `gameService.ts` から取得しています
- 2026公式戦を追加する場合は、JSONを増やして service 層を差し替えるだけで対応しやすい構成です
- 型定義は `src/types/game.ts` に集約しています
