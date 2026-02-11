import requests
import time

url = "http://127.0.0.1:5000/api/sensor"

shipments = [
    {
        "shipment_id": "SHP1",
        "location": "Rajahmundry",
        "temperature": 32,
        "humidity": 70,
        "delay_hours": 1
    },
    {
        "shipment_id": "SHP2",
        "location": "Kakinada",
        "temperature": 36,
        "humidity": 82,
        "delay_hours": 3
    },
    {
        "shipment_id": "SHP3",
        "location": "Vijayawada",
        "temperature": 28,
        "humidity": 60,
        "delay_hours": 0
    }
]

for data in shipments:
    response = requests.post(url, json=data)

    print("Shipment:", data["shipment_id"])
    print("Status Code:", response.status_code)
    print("Response:", response.json())
    print("-" * 40)

    time.sleep(2)  # simulate real-time IoT delay
