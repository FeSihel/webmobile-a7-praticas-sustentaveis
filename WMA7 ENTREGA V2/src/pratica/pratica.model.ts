import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PraticaDocument = Pratica & Document;

@Schema()
export class Pratica {
  @Prop({ required: true })
  nomeUsuario!: string; // Adicionado a '!' para corrigir o erro do TypeScript

  @Prop({ required: true })
  tipo!: string;

  @Prop({ required: true })
  data!: string; // Formato ISO - YYYY-MM-DD exigido no PDF

  @Prop()
  descricao?: string; // Campo opcional
}

export const PraticaSchema = SchemaFactory.createForClass(Pratica);