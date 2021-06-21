import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  id?: string;
}
