import joblib

MODEL_PATH = r"C:\Users\User\sg_health\ML\ada_boost_model.joblib"

try:
    model = joblib.load(MODEL_PATH)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
