def analyze_data(temp, humidity, delay):
    if temp > 30 or humidity > 75 or delay > 2:
        return {"status": "ABNORMAL", "risk": "HIGH"}
    return {"status": "NORMAL", "risk": "LOW"}
