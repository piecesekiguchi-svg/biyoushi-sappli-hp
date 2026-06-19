#!/bin/bash

# 美容師サプリ ホームページ自動更新スクリプト

cd "/Users/sekiguchi/Desktop/biyoushi-sappli-hp"

# 変更があるか確認
if [ -z "$(git status --porcelain)" ]; then
  osascript -e 'display dialog "変更がありません。" buttons {"OK"} default button "OK" with icon note with title "美容師サプリ 更新"'
  exit 0
fi

# コミットメッセージをダイアログで入力
MESSAGE=$(osascript -e 'display dialog "更新内容を入力してください：" default answer "ホームページ更新" buttons {"キャンセル", "更新する"} default button "更新する" with title "美容師サプリ 更新"' -e 'text returned of result' 2>/dev/null)

# キャンセルされた場合
if [ $? -ne 0 ]; then
  exit 0
fi

# git add, commit, push
git add .
git commit -m "$MESSAGE"
git push origin main

# 結果を通知
if [ $? -eq 0 ]; then
  osascript -e 'display notification "GitHubへのpushが完了しました！" with title "美容師サプリ 更新完了" sound name "Glass"'
else
  osascript -e 'display dialog "エラーが発生しました。ターミナルを確認してください。" buttons {"OK"} default button "OK" with icon stop with title "エラー"'
fi
