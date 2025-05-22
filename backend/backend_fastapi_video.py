from fastapi import FastAPI
from fastapi.responses import JSONResponse
from pydantic import BaseModel  # ✅ Esta linha aqui resolve o erro
from moviepy.editor import TextClip, CompositeVideoClip
import datetime
import os


app = FastAPI()

# ⬅️ Esta é a parte que estava faltando ou fora do lugar:
class VideoRequest(BaseModel):
    texto: str

@app.get("/")
def root():
    return {"message": "API FutNewsVideo funcionando"}

@app.post("/gerar_video")
def gerar_video(request: VideoRequest):
    texto = request.texto

    # Criar nome do arquivo com timestamp
    timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
    nome_arquivo = f"video_{timestamp}.mp4"
    caminho_arquivo = os.path.join("videos", nome_arquivo)

    # Criar pasta "videos" se não existir
    os.makedirs("videos", exist_ok=True)

    # Criar o vídeo (texto centralizado por 5 segundos)
    try:
        clip_texto = TextClip("Notícia de Futebol", fontsize=70, color='white', size=(720, 480))
        clip_texto = clip_texto.set_duration(5)

        video = CompositeVideoClip([clip_texto])
        video.write_videofile(caminho_arquivo, fps=24)

        return JSONResponse(content={"arquivo": nome_arquivo})

    except Exception as e:
        return JSONResponse(content={"erro": str(e)}, status_code=500)
