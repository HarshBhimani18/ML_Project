from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import joblib

app = FastAPI(title="Loan Default Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
scaler = None
feature_columns = None
numeric_columns = None


def load_artifacts():
    """
    Load model and preprocessing objects only once.
    Prevents unnecessary memory usage on startup.
    """
    global model, scaler, feature_columns, numeric_columns

    if model is None:
        model = joblib.load("rf_model_test.pkl")
        scaler = joblib.load("scaler.pkl")
        feature_columns = joblib.load("feature_columns.pkl")
        numeric_columns = joblib.load("numeric_columns.pkl")


class LoanInput(BaseModel):
    data: dict

@app.get("/")
def home():
    return {"message": "Loan Default Prediction API running"}

@app.post("/predict")
def predict(input_data: LoanInput):
    try:
        load_artifacts()
        df = pd.DataFrame([input_data.data])
        df = pd.get_dummies(df)

        df = df.reindex(columns=feature_columns, fill_value=0)

        df[numeric_columns] = scaler.transform(df[numeric_columns])

        prediction = model.predict(df)[0]
        probability = model.predict_proba(df)[0][1]

        return {
            "prediction": int(prediction),
            "probability": float(probability)
        }

    except Exception as e:
        return {"error": str(e)}