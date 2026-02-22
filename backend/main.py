from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
from fastapi.middleware.cors import CORSMiddleware

model = joblib.load("rf_model.pkl")
scaler = joblib.load("scaler.pkl")
feature_columns = joblib.load("feature_columns.pkl")
numeric_columns = joblib.load("numeric_columns.pkl")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class LoanInput(BaseModel):
    data: dict


@app.get("/")
def home():
    return {"message": "Loan Default Prediction API running"}


@app.post("/predict")
def predict(input_data: LoanInput):

    try:
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
        return {
            "error": str(e)
        }
