import { Controller, Get, Post, Body } from '@nestjs/common';
import { PraticaService } from './pratica.service';

@Controller()
export class PraticaController {
  constructor(private readonly praticaService: PraticaService) {}

  @Post('pratica')
  async criar(
    @Body('nomeUsuario') nomeUsuario: string,
    @Body('tipo') tipo: string,
    @Body('data') data: string,
    @Body('descricao') descricao?: string,
  ) {
    return this.praticaService.criar(nomeUsuario, tipo, data, descricao);
  }

  @Get('historico')
  async buscarTodas() {
    return this.praticaService.buscarTodas();
  }

  @Get('estatisticas')
  async calcularEstatististicas() {
    return this.praticaService.calcularEstatististicas();
  }
}