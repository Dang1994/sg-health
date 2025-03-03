from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet
import joblib

# Load the saved machine learning model and scaler
MODEL_PATH = r"C:\Users\User\sg_health\ML\ada_boost_model.joblib"  # Update path if necessary
SCALER_PATH = r"C:\Users\User\sg_health\ML\scaler.joblib"

# Load the model and scaler
model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)

# Function to calculate BMI
def calculate_bmi(weight: float, height: float) -> float:
    height_m = height / 100  # Convert height from cm to meters
    return weight / (height_m ** 2)

class ActionPredictHealthRisk(Action):
    def name(self) -> Text:
        return "action_predict_health_risk"

    def run(
        self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[Text, Any]
    ) -> List[Dict[Text, Any]]:
        # Extract user-provided values from slots
        gender = tracker.get_slot("gender")
        age = float(tracker.get_slot("age"))
        hypertension = int(tracker.get_slot("hypertension"))
        heart_disease = int(tracker.get_slot("heart_disease"))
        smoking_history = tracker.get_slot("smoking_history")
        weight = float(tracker.get_slot("weight"))
        height = float(tracker.get_slot("height"))
        HbA1c_level = float(tracker.get_slot("HbA1c_level"))
        blood_glucose_level = float(tracker.get_slot("blood_glucose_level"))

        # Calculate BMI
        bmi = calculate_bmi(weight, height)

        # Prepare feature array for model
        features = [gender, age, hypertension, heart_disease, smoking_history, bmi, HbA1c_level, blood_glucose_level]

        # Transform features using the scaler
        features_scaled = scaler.transform([features])

        # Make prediction using the model
        prediction = model.predict(features_scaled)[0]  # 0 = No Diabetes, 1 = Diabetes

        # Generate response based on prediction
        if prediction == 1:
            response = (
                "Based on the information you provided, you are likely at risk for diabetes. "
                "Please consult a healthcare provider for a detailed diagnosis."
            )
        else:
            response = (
                "Based on the information you provided, you are unlikely to have diabetes. "
                "However, maintaining a healthy lifestyle is important."
            )

        # Send response back to the user
        dispatcher.utter_message(text=response)

        # Return BMI as a slot for potential further use
        return [SlotSet("bmi", bmi)]
