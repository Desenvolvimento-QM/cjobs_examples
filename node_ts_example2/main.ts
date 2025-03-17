//RECEBENDO PARÂMETROS e RETORNANDO RESULTADOS

//Use o console.log() antes do process.exit(0); para retornar o resultado final do job.
//Use process.exit(1) para indicar que houve um erro no job.
//Use process.exit(0) para indicar que o job foi executado com sucesso.

async function main() {
  // Capturar os parâmetros passados via API (Variável de ambiente JSON_PARAMS)
  // Usar sempre o valor fixo JSON_PARAMS para receber os parâmetros vindos da API
  // Exemplo de JSON_PARAMS: {"valor": 10}
  const params = process.env.JSON_PARAMS
    ? JSON.parse(process.env.JSON_PARAMS)
    : {};

  // Garantir que o parâmetro 'valor' contido no JSON de exemplo foi recebido corretamente
  if (typeof params.valor !== "number") {
    console.error(
      JSON.stringify({ error: "Parâmetro 'valor' ausente ou inválido." })
    );
    process.exit(1);
  }

  // Seu processamento aqui
  const resultado = { valor: params.valor * 2 };

  // Retornar o resultado como JSON
  // Retorne sempre um objeto JSON no formato STRING
  console.log(JSON.stringify(resultado));

  // Sempre encerrar o job com process.exit(0)
  process.exit(0);
}

main();
