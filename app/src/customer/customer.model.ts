import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'customers',
  versionKey: false,
  toJSON: {
    transform: (doc: DocumentType, ret) => {
      ret.id = ret._id;
      delete ret._id;
    }
  },
  timestamps: true
})
export class CustomerModel extends Document {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true
  })
  cpf: string;

  @Prop({
    required: true,
    default: false
  })
  isDefaulting: boolean;

  @Prop()
  amount: number;

  @Prop()
  since: Date;
}

const CustomerSchema = SchemaFactory.createForClass(CustomerModel);

export { CustomerSchema };