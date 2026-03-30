from fastapi import FastAPI, Query, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List, Dict
import httpx

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    # You can add more origins here as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all origins (not recommended for production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db_connection():
    conn = sqlite3.connect("manga.db")
    conn.row_factory = sqlite3.Row  # allows dict-like access
    return conn

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.get("/manga/{page}", response_model=List[Dict])
def get_manga_page(page: int):
    if page < 0:
        raise HTTPException(status_code=400, detail="Page number must be 0 or higher.")
    
    offset = page * 24

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM manga
        ORDER BY updated_at DESC
        LIMIT 24 OFFSET ?
    """, (offset,))
    
    rows = cursor.fetchall()
    conn.close()

    return [dict(row) for row in rows]

@app.get("/image-proxy")
async def image_proxy(url: str = Query(..., description="URL of the image to proxy")):
    # Basic validation (make sure it's a full URL)
    if not (url.startswith("http://") or url.startswith("https://")):
        raise HTTPException(status_code=400, detail="Invalid URL")

    # Use httpx to fetch the image asynchronously
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(url, timeout=10)
            r.raise_for_status()
        except httpx.HTTPError:
            raise HTTPException(status_code=502, detail="Error fetching image")

    # Return the image content with correct content-type
    return Response(content=r.content, media_type=r.headers.get("content-type", "application/octet-stream"))