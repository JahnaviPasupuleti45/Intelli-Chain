def generate_report(data, analysis):
    return f"""
Shipment Report
Location: {data.get('location')}
Temperature: {data.get('temperature')}°C
Humidity: {data.get('humidity')}%
Delay: {data.get('delay')} hrs
Status: {analysis['status']}
Risk: {analysis['risk']}
"""
