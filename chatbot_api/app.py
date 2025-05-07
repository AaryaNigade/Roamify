from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)  # ✅ Define Flask app here

# Load the CSV once when the app starts
df = pd.read_csv("enriched_itinerary_data_expanded.csv")

@app.route("/search", methods=["GET"])
def search():
    destination = request.args.get("destination", "").lower()
    budget = request.args.get("budget", "")
    spot_type = request.args.get("type", "").lower()

    results = df.copy()

    if destination:
        results = results[results["Destination"].str.lower().str.contains(destination)]
    if budget:
        results = results[results["Estimated Cost (INR)"] <= int(budget)]
    if spot_type:
        results = results[results["Spot Type"].str.lower().str.contains(spot_type)]

    selected = results[[
        "Destination",
        "Spot",
        "Description",
        "Estimated Cost (INR)",
        "Visit Duration (hrs)",
        "Best Time to Visit",
        "Rating"
    ]]

    return jsonify(selected.to_dict(orient="records"))

if __name__ == "__main__":
    app.run(debug=True)
