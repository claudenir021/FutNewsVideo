from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend_fastapi_video import generate_video

app = FastAPI()

# Habilita o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, substitua por ["https://seusite.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class NewsRequest(BaseModel):
    team: str
    title: str
    text: str

@app.post("/generate-video")
def create_news_video(news: NewsRequest):
    try:
        video_path = generate_video(news.team, news.title, news.text)
        return {"message": "Vídeo criado com sucesso!", "video_path": video_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
