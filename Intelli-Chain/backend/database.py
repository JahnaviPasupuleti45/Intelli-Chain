from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "fullname": self.fullname,
            "email": self.email,
            "phone": self.phone
        }


class IoTData(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    # 🔑 LINK TO USER
    user_id = db.Column(db.Integer, nullable=False)

    shipment_id = db.Column(db.String(50), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    temperature = db.Column(db.Float, nullable=False)
    humidity = db.Column(db.Float, nullable=False)
    delay_hours = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False)
    risk = db.Column(db.String(20), nullable=False)
    report = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "shipment_id": self.shipment_id,
            "location": self.location,
            "temperature": self.temperature,
            "humidity": self.humidity,
            "delay_hours": self.delay_hours,
            "analysis": {
                "status": self.status,
                "risk": self.risk
            },
            "genai_report": self.report
        }
