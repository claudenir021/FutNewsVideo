from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from moviepy.editor import TextClip, CompositeVideoClip
import datetime
import base64
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

    return caminho_arquivo  # retorna o caminho completo

@app.get("/")
def root():
    return {"message": "API FutNewsVideo funcionando"}

@app.post("/generate-video")
def gerar_video_endpoint(request: VideoRequest):
    try:
        caminho_arquivo = generate_video(request.team, request.title, request.text)

        # Lê o conteúdo do vídeo como base64
        with open(caminho_arquivo, "rb") as f:
            video_bytes = f.read()
            video_base64 = base64.b64encode(video_bytes).decode("utf-8")

        return JSONResponse(content={"video_base64": video_base64})
    
    except Exception as e:
        return JSONResponse(content={"detail": str(e)}, status_code=500)
