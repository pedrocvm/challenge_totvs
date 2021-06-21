import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString({message: 'Field must be a String.'})
  @IsNotEmpty({ message: 'Name cannot be void' })
  name: string;

  @IsString({message: 'Field must be a String.'})
  @IsNotEmpty({ message: 'CPF cannot be void' })
  cpf: string;

  @IsBoolean({message: 'Field must be a Boolean.'})
  isDefaulting: boolean;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsDate({message: 'Field must be a Date.'})
  since: Date;
}
