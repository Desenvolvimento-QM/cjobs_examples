Objetivo:

    Implementar rotinas que atualizam o status de tratativas (close the loop) de acordo com as datas de última mensagem.

Observações:

    - As rotinas devem ser implementadas em TypeScript.
    - As rotinas devem ser implementadas em Node.js.

Rotinas implementadas:

    1) LISTA_NOVOS_PARA_ATRASADOS

        Parametro exigido pelo filtro: D_MENOS_X = D-7 (Data atual -7 dias)

        Ao retornar registros: Todas as tratativas (id_tratativa) da lista precisarão ser alteradas para o status = 3 (ATRASADO)


    2) LISTA_ANDAMENTOS_PARA_ATRASADOS

        Ao retornar registros: Fazer um filtro selecionando (id_tratativa) daqueles cujo o valor de (dt_ultima_msg) ou (dt_criacao) seja mais antigo que 7 dias (comparar pela data atual)

        Aquelas que atenderem o filtro acima: Precisarão ser alteradas para o status = 3 (ATRASADO)
        

Referência para contexto:

    1) Possíveis STATUS:

        1 = Novo
        2 = Andamento
        3 = Atrasado
        4 = Concluído


    2) Para a alteração do status de ambas as rotinas:

        Variáveis de ambiente necessárias: DATABASE_ID_TRATATIVA, MODELO_ID

        PATCH ENDPOINT: /record/sync-single-update/{database_id}/{model_id}

            Json Body model:

                {
                    "record": {
                        "id_tratativa": "?",
                        "id_status": "(1 - 4)"
                    }
                }

    3) Para listar registros de ambas as rotinas:

        Variáveis de ambiente necessárias: DATABASE_ID_TRATATIVA, QUERY_ID_NOVOS, QUERY_ID_ANDAMENTOS
            
        GET ENDPOINT: /record/sync-list-many/{database_id}/query-id/{query_id}

        Exemplo de passagem de parametro exigido pelo filtro:

            query param name: dynamic_filters
            usage: D_MENOS_X:2023-01-01T00:00:00
            