from fastapi import FastAPI
import hashlib
import json
import json

app = FastAPI()

@app.get("/about")
def about():
    return {
        "project": "Medical College",
        "description": "Система управления медицинским колледжем",
        "version": "1.0",
        "core_service": "Node.js + Express",
        "support_service": "FastAPI"
    }


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

    with open("about.json", "r", encoding="utf-8") as file:
        data = json.load(file)

    return data