from flask import Flask, send_from_directory, request, jsonify
import os

app = Flask(__name__, static_folder="../", static_url_path="")

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def serve_page(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    elif os.path.exists(os.path.join(app.static_folder, f"{path}.html")):
        return send_from_directory(app.static_folder, f"{path}.html")
    return send_from_directory(app.static_folder, "index.html")

@app.route("/api/contact", methods=["POST"])
def handle_contact():
    data = request.get_json() or {}
    name = data.get("name", "")
    email = data.get("email", "")
    subject = data.get("subject", "")
    message = data.get("message", "")
    
    print(f"[CONTACT INQUIRY] From: {name} ({email}) | Subject: {subject} | Message: {message}")
    
    return jsonify({
        "status": "success",
        "message": "Thank you for contacting SIDRA Foundation. Your message has been received."
    }), 200

@app.route("/api/donate", methods=["POST"])
def handle_donate():
    data = request.get_json() or {}
    amount = data.get("amount", 1000)
    cause = data.get("cause", "General")
    
    print(f"[DONATION INTENT] Amount: ₹{amount} | Cause: {cause}")
    
    return jsonify({
        "status": "success",
        "message": f"Donation intent for ₹{amount} received successfully.",
        "whatsapp_contact": "+917624852616"
    }), 200

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting SIDRA Foundation Backend Server on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
