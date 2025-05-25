from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from moviepy.editor import TextClip, CompositeVideoClip
import datetime
import os

app = FastAPI()

class VideoRequest(BaseModel):
    texto: str

# ✅ EXTRAÍDO: Função reutilizável
def generate_video(texto: str) -> str:
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    nome_arquivo = f"video_{timestamp}.mp4"
    caminho_arquivo = os.path.join("videos", nome_arquivo)

    os.makedirs("videos", exist_ok=True)

    clip_texto = TextClip("Notícia de Futebol", fontsize=70, color='white', size=(720, 480))
    clip_texto = clip_texto.set_duration(5)

    video = CompositeVideoClip([clip_texto])
    video.write_videofile(caminho_arquivo, fps=24)

    return caminho_arquivo

@app.get("/")
def root():
    return {"message": "API FutNewsVideo funcionando"}

@app.post("/gerar_video")
def gerar_video_endpoint(request: VideoRequest):
    try:
        caminho = generate_video(request.texto)
        nome_arquivo = os.path.basename(caminho)
        return JSONResponse(content={"arquivo": nome_arquivo})
    except Exception as e:
        return JSONResponse(content={"erro": str(e)}, status_code=500)
