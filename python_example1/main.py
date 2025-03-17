import requests
import sys
import json

# LIDANDO COM API EXTERNA e RETORNANDO RESULTADOS

# Use print() antes de sys.exit(0) para retornar o resultado final do job.
# Use sys.exit(1) para indicar que houve um erro no job.
# Use sys.exit(0) para indicar que o job foi executado com sucesso.

def main():
    try:
        # Consumir API externa
        response = requests.get("https://jsonplaceholder.typicode.com/todos/1")
        response.raise_for_status()
        # Retornar o resultado como JSON
        # Retorne sempre um objeto JSON no formato STRING
        print(json.dumps(response.json()))
    except requests.RequestException as error:
        # Tratar erro ao consumir API
        print(f"Erro ao consumir API: {error}", file=sys.stderr)
        # Indicar que houve um erro no job
        sys.exit(1)

    # Sempre encerrar o job com sys.exit(0)
    sys.exit(0)

if __name__ == "__main__":
    main()
