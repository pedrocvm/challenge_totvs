import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerModel, CustomerSchema } from './customer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CustomerModel.name, schema: CustomerSchema }]),
  ],
  providers: [CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
