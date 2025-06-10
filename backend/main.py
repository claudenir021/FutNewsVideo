from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.backend_fastapi_video import generate_video
from fastapi.staticfiles import StaticFiles
import os
import base64  # ✅ Importação necessária

app = FastAPI()

# Criar pasta se não existir
os.makedirs("videos", exist_ok=True)

# Expor a pasta "videos" como rota pública (ainda útil se quiser acessar diretamente no navegador)
app.mount("/videos", StaticFiles(directory="videos"), name="videos")

# Habilita o CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Em produção, troque por ["https://seusite.com"]
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
        # Gera o vídeo
        video_path = generate_video(news.team, news.title, news.text)

        # ✅ Lê o vídeo em binário e converte para base64
        with open(video_path, "rb") as video_file:
            video_bytes = video_file.read()
            video_base64 = base64.b64encode(video_bytes).decode("utf-8")

        return {
            "message": "Vídeo criado com sucesso!",
            "video_base64": video_base64  # ✅ É isso que o frontend usa
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
