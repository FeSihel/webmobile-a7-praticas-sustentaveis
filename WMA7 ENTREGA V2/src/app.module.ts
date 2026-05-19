import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PraticaModule } from './pratica/pratica.module';

@Module({
  imports: [
    // Conecta direto no MongoDB instalado no seu próprio computador
    // O banco 'sustentabilidade' será criado automaticamente assim que salvar o primeiro dado
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sustentabilidade'),
    PraticaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}