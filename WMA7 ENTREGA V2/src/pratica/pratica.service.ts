import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pratica, PraticaDocument } from './pratica.model';

@Injectable()
export class PraticaService {
  constructor(
    @InjectModel(Pratica.name) private praticaModel: Model<PraticaDocument>,
  ) {}

  // Cadastro de ações
  async criar(nomeUsuario: string, tipo: string, data: string, descricao?: string): Promise<Pratica> {
    const novaPratica = new this.praticaModel({ nomeUsuario, tipo, data, descricao });
    return novaPratica.save();
  }

  // Consulta de histórico
  async buscarTodas(): Promise<Pratica[]> {
    return this.praticaModel.find().exec();
  }

  // Relatório estatístico solicitado no PDF
  async calcularEstatististicas(): Promise<any> {
    const praticas = await this.buscarTodas();
    const totalGeral = praticas.length;

    if (totalGeral === 0) {
      return { totalgeral: 0, mensagem: 'Nenhuma prática registrada ainda.' };
    }

    // Contadores para mapear os mais comuns
    const contagemTipos: Record<string, number> = {};
    const contagemUsuarios: Record<string, number> = {};

    praticas.forEach((p) => {
      contagemTipos[p.tipo] = (contagemTipos[p.tipo] || 0) + 1;
      contagemUsuarios[p.nomeUsuario] = (contagemUsuarios[p.nomeUsuario] || 0) + 1;
    });

    // Descobrir o tipo mais registrado
    const tipoMaisRegistrado = Object.keys(contagemTipos).reduce((a, b) => 
      contagemTipos[a] > contagemTipos[b] ? a : b
    );

    // Descobrir o usuário mais ativo
    const usuarioMaisAtivo = Object.keys(contagemUsuarios).reduce((a, b) => 
      contagemUsuarios[a] > contagemUsuarios[b] ? a : b
    );

    return {
      totalGeralPraticas: totalGeral,
      tipoMaisRegistrado,
      usuarioMaisAtivo,
      totalPorTipo: contagemTipos,
    };
  }
}