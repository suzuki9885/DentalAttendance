import os

DEBUG = True

# 管理者ログインの認証情報
ADMIN_ID = os.environ.get('ADMIN_ID', 'suzuki')  # 環境変数から取得、なければデフォルト値
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', 'kamkam6')  # 環境変数から取得、なければデフォルト値
