import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import db, User, IoTData

# ---------------- CREATE APP ----------------
app = Flask(__name__)
CORS(app)
# ABSOLUTE PATH FIX
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, "instance")
os.makedirs(INSTANCE_DIR, exist_ok=True)

DB_PATH = os.path.join(BASE_DIR, "instance", "intellichain.db")

# ---------------- DATABASE CONFIG ----------------
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_PATH}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

with app.app_context():
    db.create_all()

# ---------------- BASIC ROUTES ----------------
@app.route("/")
def home():
    return jsonify({"message": "Intelli-Chain Backend Running"})

@app.route("/ping", methods=["GET", "POST"])
def ping():
    return jsonify({"message": "PING WORKING"})

@app.route("/api/health")
def health():
    return jsonify({"status": "Backend running"})

# ---------------- AUTH ROUTES ----------------
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    fullname = data.get("fullname")
    email = data.get("email")
    password = data.get("password")
    phone = data.get("phone")

    if not fullname or not email or not password or not phone:
        return jsonify({"error": "All fields are required"}), 400

    email = email.strip().lower()

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    user = User(
        fullname=fullname,
        email=email,
        password=password,
        phone=phone
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registration successful"})

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password required"}), 400

    email = email.strip().lower()
    user = User.query.filter_by(email=email).first()

    if not user or user.password != password:
        return jsonify({"error": "Invalid email or password"}), 401

    return jsonify({
        "message": "Login successful",
        "user": user.to_dict()
    })

@app.route("/api/users")
def get_users():
    users = User.query.all()
    return jsonify([u.to_dict() for u in users])

# ---------------- IOT ROUTES ----------------
@app.route("/api/sensor", methods=["POST"])
def receive_sensor_data():
    data = request.get_json()
    print(">>> /api/sensor CALLED <<<")
    print("DATA RECEIVED:", data)

    shipment_id = data.get("shipment_id")
    location = data.get("location")
    temperature = data.get("temperature")
    humidity = data.get("humidity")
    delay_hours = data.get("delay_hours")

    if temperature > 30 or humidity > 75 or delay_hours > 2:
        status = "ABNORMAL"
        risk = "HIGH"
    else:
        status = "NORMAL"
        risk = "LOW"

    report = f"""
Shipment ID: {shipment_id}
Location: {location}
Temperature: {temperature} °C
Humidity: {humidity} %
Delay Hours: {delay_hours}

Status: {status}
Risk Level: {risk}

Recommendation:
Monitor shipment conditions closely.
"""

    entry = IoTData(
        shipment_id=shipment_id,
        location=location,
        temperature=temperature,
        humidity=humidity,
        delay_hours=delay_hours,
        status=status,
        risk=risk,
        report=report
    )

    db.session.add(entry)
    db.session.commit()

    return jsonify({
        "message": "IoT data stored successfully",
        "analysis": {"status": status, "risk": risk},
        "genai_report": report
    })

@app.route("/api/dashboard", methods=["GET"])
def dashboard():
    records = IoTData.query.all()
    return jsonify([r.to_dict() for r in records])

# ---------------- RUN ----------------
if __name__ == "__main__":
    app.run(debug=False)
