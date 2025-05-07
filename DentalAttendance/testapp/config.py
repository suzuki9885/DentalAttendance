import os

DEBUG = True

# 管理者ログインの認証情報
ADMIN_ID = os.environ.get('ADMIN_ID')  # 環境変数から取得
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')  # 環境変数から取得

# データベース設定
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')  # 環境変数から取得
SQLALCHEMY_TRACK_MODIFICATIONS = False

# セキュリティ設定
SECRET_KEY = os.environ.get('SECRET_KEY')  # 環境変数から取得



