
from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def root():
    return {'message': 'API FutNewsVideo funcionando'}

# Nova rota para gerar o vídeo
@app.post('/gerar_video')
def gerar_video():
    return {'mensagem': 'Vídeo gerado com sucesso!'}
