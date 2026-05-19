import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PraticaService } from './pratica.service';
import { PraticaController } from './pratica.controller';
import { Pratica, PraticaSchema } from './pratica.model';

@Module({
  imports: [
    // Isso aqui registra o Schema do banco de dados para este módulo
    MongooseModule.forFeature([{ name: Pratica.name, schema: PraticaSchema }]),
  ],
  controllers: [PraticaController],
  providers: [PraticaService],
})
export class PraticaModule {}