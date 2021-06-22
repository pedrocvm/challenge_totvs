import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateIf
} from 'class-validator';

export class CreateCustomerDto {
  @IsString({ message: 'Field must be a String.' })
  @IsNotEmpty({ message: 'Name cannot be void' })
  name: string;

  @IsString({ message: 'Field must be a String.' })
  @IsNotEmpty({ message: 'CPF cannot be void' })
  cpf: string;

  @IsBoolean({ message: 'Field must be a Boolean.' })
  isDefaulting: boolean;

  @ValidateIf(o => o.isDefaulting)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty({ message: 'Amount cannot be void' })
  amount: number;

  @ValidateIf(o => o.isDefaulting)
  @IsDate({ message: 'Field must be a Date.' })
  @IsNotEmpty({ message: 'Date cannot be void' })
  since: Date;
}
