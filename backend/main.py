from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend_fastapi_video import generate_video

app = FastAPI()

# ✅ Middleware CORS para permitir acesso do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Pode trocar por ['http://localhost:5173'] ou domínio do Netlify em produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Modelo de dados da requisição
class NewsRequest(BaseModel):
    team: str
    title: str
    text: str

# ✅ Rota de teste
@app.get("/")
def root():
    return {"message": "API FutNewsVideo está no ar!"}

# ✅ Rota principal de geração de vídeo
@app.post("/generate-video")
def create_news_video(news: NewsRequest):
    try:
        video_path = generate_video(news.team, news.title, news.text)
        return {"message": "Vídeo criado com sucesso!", "video_path": video_path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
