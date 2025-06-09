from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.backend_fastapi_video import generate_video
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

# Criar pasta se não existir
os.makedirs("videos", exist_ok=True)

# Expor a pasta "videos" como rota pública
app.mount("/videos", StaticFiles(directory="videos"), name="videos")

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
        
        # BASE DO BACKEND NO RENDER
        base_url = "https://futnewsvideo.onrender.com"

        # Retorna o caminho completo
        full_video_url = f"{base_url}/{video_path}"
        return {
            "message": "Vídeo criado com sucesso!",
            "video_path": full_video_url
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
