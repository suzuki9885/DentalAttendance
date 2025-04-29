from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from testapp.config import SQLALCHEMY_DATABASE_URI, SQLALCHEMY_TRACK_MODIFICATIONS, SECRET_KEY

#Flaskのオブジェクトを作成
app = Flask(__name__)

# 設定の読み込み
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = SQLALCHEMY_TRACK_MODIFICATIONS
app.config['SECRET_KEY'] = SECRET_KEY

# データベースの初期化
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# テーブルを作成
with app.app_context():
    db.create_all()

import testapp.main
