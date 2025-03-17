import os
import json
import sys

# RECEBENDO PARÂMETROS e RETORNANDO RESULTADOS

# Use print() antes de sys.exit(0) para retornar o resultado final do job.
# Use sys.exit(1) para indicar que houve um erro no job.
# Use sys.exit(0) para indicar que o job foi executado com sucesso.

def main():
    # Capturar os parâmetros passados via API (Variável de ambiente JSON_PARAMS)
    # Usar sempre o valor fixo JSON_PARAMS para receber os parâmetros vindos da API
    # Exemplo de JSON_PARAMS: {"valor": 10}
    params = os.getenv("JSON_PARAMS")
    if params:
        params = json.loads(params)
    else:
        params = {}

    # Garantir que o parâmetro 'valor' contido no JSON de exemplo foi recebido corretamente
    if not isinstance(params.get("valor"), (int, float)):
        print(json.dumps({"error": "Parâmetro 'valor' ausente ou inválido."}), file=sys.stderr)
        sys.exit(1)

    # Seu processamento aqui
    resultado = {"valor": params["valor"] * 2}

    # Retornar o resultado como JSON
    # Retorne sempre um objeto JSON no formato STRING
    print(json.dumps(resultado))

    # Sempre encerrar o job com sys.exit(0)
    sys.exit(0)

if __name__ == "__main__":
    main()
