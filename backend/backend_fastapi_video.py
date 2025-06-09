from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from moviepy.editor import TextClip, CompositeVideoClip
import datetime
import os

app = FastAPI()

class VideoRequest(BaseModel):
    team: str
    title: str
    text: str

def generate_video(team: str, title: str, text: str) -> str:
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    nome_arquivo = f"{team}_{timestamp}.mp4"
    caminho_arquivo = os.path.join("videos", nome_arquivo)

    os.makedirs("videos", exist_ok=True)

    conteudo = f"{team.upper()}\n{title}\n{text}"
    clip_texto = TextClip(conteudo, fontsize=50, color='white', size=(720, 480), method='caption')
    clip_texto = clip_texto.set_duration(5)

    video = CompositeVideoClip([clip_texto])
    video.write_videofile(caminho_arquivo, fps=24)

    return nome_arquivo

@app.get("/")
def root():
    return {"message": "API FutNewsVideo funcionando"}

@app.post("/generate-video")
def gerar_video_endpoint(request: VideoRequest):
    try:
        nome_arquivo = generate_video(request.team, request.title, request.text)
        base_url = "https://futnewsvideo.onrender.com"
        return JSONResponse(content={"video_path": f"{base_url}/videos/{nome_arquivo}"})
    except Exception as e:
        return JSONResponse(content={"detail": str(e)}, status_code=500)
