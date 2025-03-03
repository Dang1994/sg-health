import pandas as pd
from sklearn.ensemble import AdaBoostClassifier
from sklearn.preprocessing import StandardScaler
import joblib

# Step 1: Load the dataset
dataset = pd.read_csv('diabetes_normal_data.csv')  # Replace with the actual path to your dataset

# Step 2: Prepare the dataset (features and target)
X = dataset.drop(columns=['diabetes'])  # Replace 'diabetes' with the actual target column name if different
y = dataset['diabetes']

# Step 3: Standardize the features for better model performance
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 4: Initialize and train the AdaBoostClassifier
model = AdaBoostClassifier(random_state=42)
model.fit(X_scaled, y)

# Step 5: Save the trained model and scaler using joblib
model_path = 'ada_boost_model.joblib'  # Save in your desired directory
scaler_path = 'scaler.joblib'
joblib.dump(model, model_path)
joblib.dump(scaler, scaler_path)

# Print confirmation
print(f"Model saved to {model_path}")
print(f"Scaler saved to {scaler_path}")

