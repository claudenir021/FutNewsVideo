from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from backend_fastapi_video import generate_video

  # ajuste aqui se o nome da pasta for diferente

app = FastAPI()

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
