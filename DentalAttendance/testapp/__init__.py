from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os

#Flaskのオブジェクトを作成
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'accounts.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-here'

# データベースの初期化
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# テーブルを作成
with app.app_context():
    db.create_all()

import testapp.main
