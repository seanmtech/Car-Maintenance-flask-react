import os 
import datetime
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

db_password = os.environ.get('DB_PASSWORD')

app = Flask(__name__)

# TODO: configure connection string
    # get formatting from https://flask-sqlalchemy.palletsprojects.com/en/3.1.x/config/ 

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:{db_password}@localhost/flaskCarDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class CarsTable(db.Model):
    carID = db.Column(db.Integer, primary_key=True)
    carModel = db.Column(db.String(100))
    dateMilesEntered = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, title, body):
        self.title = title
        self.body = body

@app.route('/', methods = ['GET'])
def get_articles():
    return jsonify({"Hello": "World"})

if __name__=="__main__":
    app.run(debug=True)
