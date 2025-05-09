Objetivo:

    Implementar rotinas que atualizam o status de tratativas (close the loop) de acordo com as datas de última mensagem.

Observações:

    - As rotinas devem ser implementadas em TypeScript.
    - As rotinas devem ser implementadas em Node.js.
    - As rotinas devem ser implementadas em TypeScript.

Rotinas implementadas:

    1) LISTA_NOVOS_PARA_ATRASADOS -> database_id: 681e236519355b79153c6d8c, query_id: 681e4be62354bff15540ad6b

        Parametro exigido pelo filtro: D_MENOS_X = D-7 (Data atual -7 dias)

        Ao retornar registros: Todas as tratativas (id_tratativa) da lista precisarão ser alteradas para o status = 3 (ATRASADO)


    2) LISTA_ANDAMENTOS_PARA_ATRASADOS -> database_id: 681e27b519355b79153c6eb4, query_id: 681e4d442354bff15540ad9c

        Ao retornar registros: Fazer um filtro selecionando (id_tratativa) daqueles cujo o valor de (dt_ultima_msg) seja mais antigo que 7 dias (comparar pela data atual)

        Aquelas que atenderem o filtro acima: Precisarão ser alteradas para o status = 3 (ATRASADO)
        

Referência para contexto:

    1) Possíveis STATUS:

        1 = Novo
        2 = Andamento
        3 = Atrasado
        4 = Concluído


    2) Para a alteração do status de ambas as rotinas -> 


        .env vars: database_id: 681e236519355b79153c6d8c, modelo_id: 681e53d72354bff15540b27e

        api-key: ey9evwukt64ufqlowb5p4

        HOST SWAGGER: http://backend.local.teste/clidb/api

        PATCH ENDPOINT: /clidb/api/record/sync-single-update/{database_id}/{model_id}

            Json Body model:

                {
                    "record": {
                        "id_tratativa": "?",
                        "id_status": "(1 - 4)"
                    }
                }

    3) Para listar registros de ambas as rotinas -> 

    api-key: ey9evwukt64ufqlowb5p4

    HOST SWAGGER: http://backend.local.teste/clidb/api
            
    GET ENDPOINT: /clidb/api/record/sync-list-many/{database_id}/query-id/{query_id}

        examplo de passagem de parametro exigido pelo filtro:

            query param name: dynamic_filters
            usage: D_MENOS_X:2025-05-09T16:00:00
            