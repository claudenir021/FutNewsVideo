from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get('/')
def root():
    return {'message': 'API FutNewsVideo funcionando'}

@app.post('/gerar_video')
def gerar_video():
    # Aqui você colocará o código que realmente gera o vídeo
    # Por enquanto, vamos simular que gerou um vídeo com o nome fictício:
    nome_arquivo = "video_gerado.mp4"
    
    # Retornamos uma resposta JSON com o nome do vídeo
    return JSONResponse(content={"arquivo": nome_arquivo})
