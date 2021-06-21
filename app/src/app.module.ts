import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { Module } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { CustomerController } from 'customer/customer.controller';

const controllers = [CustomerController];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    CustomerModule,
  ],
  controllers: controllers,
})
export class AppModule {}
