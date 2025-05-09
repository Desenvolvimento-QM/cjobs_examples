import axios from "axios";
import * as dotenv from "dotenv";
import { format, subDays } from "date-fns";

// Carrega variáveis de ambiente do arquivo .env
dotenv.config();

// Tipos
interface Tratativa {
  id_tratativa: string;
  dt_ultima_msg?: string;
  [key: string]: any;
}

// Configurações a partir do arquivo .env
const API_KEY = process.env.API_KEY as string;
const HOST = process.env.HOST as string;
const DATABASE_ID_NOVOS = process.env.DATABASE_ID_NOVOS as string;
const QUERY_ID_NOVOS = process.env.QUERY_ID_NOVOS as string;
const DATABASE_ID_ANDAMENTOS = process.env.DATABASE_ID_ANDAMENTOS as string;
const QUERY_ID_ANDAMENTOS = process.env.QUERY_ID_ANDAMENTOS as string;
const DATABASE_ID_MODELO = process.env.DATABASE_ID_MODELO as string;
const MODELO_ID = process.env.MODELO_ID as string;
const DIAS_ATRASO = Number(process.env.DIAS_ATRASO);

// Cliente Axios com configurações padrão
const api = axios.create({
  baseURL: HOST,
  headers: {
    "api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

/**
 * Funções principais
 */
class Processador {
  /**
   * Obtém data formatada para D-X dias
   */
  getDataMenosX(dias: number): string {
    const data = subDays(new Date(), dias);
    return format(data, "yyyy-MM-dd'T'HH:mm:ss");
  }

  /**
   * Atualiza o status de uma tratativa
   */
  async atualizarStatusTratativa(
    tratativaId: string,
    novoStatus: number
  ): Promise<void> {
    try {
      await api.patch(
        `/record/sync-single-update/${DATABASE_ID_MODELO}/${MODELO_ID}`,
        {
          record: {
            id_tratativa: tratativaId,
            id_status: novoStatus,
          },
        }
      );
      console.log(
        `Tratativa ${tratativaId} atualizada para status ${novoStatus}`
      );
    } catch (error) {
      console.error(`Erro ao atualizar tratativa ${tratativaId}:`, error);
    }
  }

  /**
   * Rotina 1: LISTA_NOVOS_PARA_ATRASADOS
   */
  async processarNovosPendentes(): Promise<void> {
    try {
      console.log("Iniciando processamento de NOVOS para ATRASADOS...");

      const dataMenos7 = this.getDataMenosX(DIAS_ATRASO);
      const url = `/record/sync-list-many/${DATABASE_ID_NOVOS}/query-id/${QUERY_ID_NOVOS}`;

      const response = await api.get(url, {
        params: {
          dynamic_filters: `D_MENOS_X:${dataMenos7}`,
        },
      });

      const tratativas: Tratativa[] = response.data.records || [];
      console.log(
        `Encontradas ${tratativas.length} tratativas NOVAS atrasadas`
      );

      // Atualizar status para ATRASADO (3)
      for (const tratativa of tratativas) {
        await this.atualizarStatusTratativa(tratativa.id_tratativa, 3);
      }

      console.log("Processamento de NOVOS para ATRASADOS concluído");
    } catch (error) {
      console.error("Erro ao processar novos pendentes:", error);
    }
  }

  /**
   * Rotina 2: LISTA_ANDAMENTOS_PARA_ATRASADOS
   */
  async processarAndamentosPendentes(): Promise<void> {
    try {
      console.log("Iniciando processamento de ANDAMENTOS para ATRASADOS...");

      const url = `/record/sync-list-many/${DATABASE_ID_ANDAMENTOS}/query-id/${QUERY_ID_ANDAMENTOS}`;

      const response = await api.get(url);
      const tratativas: Tratativa[] = response.data.records || [];
      console.log(`Encontradas ${tratativas.length} tratativas em ANDAMENTO`);

      // Data limite (7 dias atrás)
      const dataLimite = subDays(new Date(), DIAS_ATRASO);

      // Filtrar tratativas com última mensagem mais antiga que 7 dias
      const tratativasAtrasadas = tratativas.filter((tratativa) => {
        if (!tratativa.dt_ultima_msg) return false;
        const dataUltimaMensagem = new Date(tratativa.dt_ultima_msg);
        return dataUltimaMensagem < dataLimite;
      });

      console.log(
        `${tratativasAtrasadas.length} tratativas em ANDAMENTO estão atrasadas`
      );

      // Atualizar status para ATRASADO (3)
      for (const tratativa of tratativasAtrasadas) {
        await this.atualizarStatusTratativa(tratativa.id_tratativa, 3);
      }

      console.log("Processamento de ANDAMENTOS para ATRASADOS concluído");
    } catch (error) {
      console.error("Erro ao processar andamentos pendentes:", error);
    }
  }

  /**
   * Função principal
   */
  async executar(): Promise<void> {
    try {
      console.log("Iniciando execução das rotinas...");

      // Executar as duas rotinas sequencialmente
      await this.processarNovosPendentes();
      await this.processarAndamentosPendentes();

      console.log("Todas as rotinas foram executadas com sucesso!");
    } catch (error) {
      console.error("Erro na execução das rotinas:", error);
    }
  }
}

// Executa o programa
const processador = new Processador();
processador.executar();
