import axios from "axios";

//LIDANDO COM API EXTERNA e RETORNANDO RESULTADOS

//Use o console.log() antes do process.exit(0); para retornar o resultado final do job.
//Use process.exit(1) para indicar que houve um erro no job.
//Use process.exit(0) para indicar que o job foi executado com sucesso.

async function main() {
  
  try {
    // Consumir API externa
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    // Retornar o resultado como JSON
    // Retorne sempre um objeto JSON no formato STRING
    console.log(JSON.stringify(response.data));
  } catch (error) {
    // Tratar erro ao consumir API
    if (error instanceof Error) {
      console.error("Erro ao consumir API:", error.message);
    } else {
      console.error("Erro ao consumir API:", error);
    }
    // Indicar que houve um erro no job
    process.exit(1);
  }

  // Sempre encerrar o job com process.exit(0)
  process.exit(0);
}

main();
