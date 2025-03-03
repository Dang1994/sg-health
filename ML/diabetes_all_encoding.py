import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load the dataset
data = pd.read_csv('diabetes_prediction_dataset.csv')

# Define categorical columns
categorical_columns = ['Gender', 'Smoking_History']

# Encode each categorical column
for column in categorical_columns:
    le = LabelEncoder()
    data[column] = le.fit_transform(data[column])

# Save the transformed dataset to a new file
output_file = 'diabetes_data_encoded.csv'
data.to_csv(output_file, index=False)