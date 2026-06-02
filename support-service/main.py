from fastapi import FastAPI
import hashlib
import json

app = FastAPI()

@app.get("/")
def root():
    return {
        "service": "Support Service",
        "status": "running"
    }

@app.get("/health")
def health():
    return {
        "status": "ok"
    }

@app.get("/api/hash/{text}")
def get_hash(text: str):

    result = hashlib.sha256(
        text.encode()
    ).hexdigest()

    return {
        "request": text,
        "result": result
    }

@app.get("/about")
def about():

    return {
        "project": "Medical College",
        "version": "1.0",
        "framework": "FastAPI"
    }