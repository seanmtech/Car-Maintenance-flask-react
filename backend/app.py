import os 
import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from dotenv import load_dotenv
from flask_cors import CORS
from flask_mail import Mail, Message

load_dotenv()

db_password = os.environ.get('DB_PASSWORD')

app = Flask(__name__)
CORS(app)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = os.environ.get('GMAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('GOOGLE_APP_PASS')
app.config['MAIL_DEFAULT_SENDER'] = (os.environ.get('SENDER_NAME'), os.environ.get('DEFAULT_SENDER_EMAIL'))
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://root:{db_password}@localhost/flaskCarDB'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
marsh = Marshmallow(app)
mail = Mail(app)

class CarsTable(db.Model):
    carID = db.Column(db.Integer, primary_key=True)
    carModel = db.Column(db.String(100))
    mileage = db.Column(db.Integer)
    dateMilesEntered = db.Column(db.DateTime, default = datetime.datetime.now)

    def __init__(self, carModel, mileage):
        self.carModel = carModel
        self.mileage = mileage

class CarsSchema(marsh.Schema):
    class Meta:
        fields = ('carID', 'carModel', 'dateMilesEntered', 'mileage')

car_schema = CarsSchema()
carQuerySet_Schema = CarsSchema(many=True)

@app.route('/get', methods = ['GET'])
def get_cars():
    allCarsInDB = CarsTable.query.all()
    results = carQuerySet_Schema.dump(allCarsInDB)
    return jsonify(results)

@app.route('/get/<id>/', methods = ['GET'])
def get_car_by_id(id):
    car = CarsTable.query.get(id)
    return car_schema.jsonify(car)

@app.route('/update/<id>/', methods = ['POST'])
def update_car_by_id(id):
    car = CarsTable.query.get(id)
    newCarModel = request.json['carModel']
    newMileage = request.json['mileage']

    car.carModel = newCarModel
    car.mileage = newMileage

    db.session.commit()
    
    return car_schema.jsonify(car)


@app.route('/add', methods = ['POST'])
def add_car():
    carModel = request.json['carModel']
    mileage = request.json['mileage']

    carListForDB = CarsTable(carModel, mileage)
    db.session.add(carListForDB)
    db.session.commit()
    return car_schema.jsonify(carListForDB)

@app.route('/delete/<id>/', methods = ['DELETE'])
def car_delete(id):
    car = CarsTable.query.get(id)
    db.session.delete(car)
    db.session.commit()

    return car_schema.jsonify(car)

@app.route('/sendEmail', methods = ['POST'])
def send_email():
    emailAddress = request.json.get('email')
    print(f"Email: {emailAddress}")
    msg = Message('Hello', recipients=[emailAddress])
    msg.body = 'This is a test email.'
    mail.send(msg)
    return 'Email sent!'

if __name__=="__main__":
    app.run(debug=True)
