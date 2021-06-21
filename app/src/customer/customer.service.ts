import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerModel } from './customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerModel.name)
    private readonly customerModel: Model<CustomerModel>,
  ) {}

  public async findAll(): Promise<CustomerModel[]> {
    try {
      const allCustomers = await this.customerModel.find();

      return allCustomers;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async findById(id: string): Promise<CustomerModel>{
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`${id} is not a valid _ID.`, 500);
      }

      const customer = await this.customerModel.findById(id);

      if (!customer) {
        throw new HttpException(`User not found`, 500);
      }

      return customer;
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async create(data: CreateCustomerDto): Promise<CreateCustomerDto>{
    try {
      const customer = await this.customerModel.findOne({cpf: data.cpf});

      if(!!customer){
        throw new HttpException('Customer already registered', 500);
      }

      const record = new this.customerModel();
      record.name = data.name;
      record.cpf = data.cpf;
      record.isDefaulting = data.isDefaulting;
      record.amount = data.amount;
      record.since = data.since;

      const newCustomer = await this.customerModel.create(record);

      return newCustomer.save();
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async update(id: string, data: UpdateCustomerDto): Promise<UpdateCustomerDto>{
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`ID #${id} is not a valid _ID.`, 400);
      }

      const customerToUpdate = await this.customerModel.findByIdAndUpdate(id, data);

      if (!customerToUpdate) {
        throw new HttpException(`Customer not found`, 500);
      }

      return await this.findById(id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  public async delete(id: string): Promise<{message: string}>{
    try {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new HttpException(`ID #${id} is not a valid _ID.`, 400);
      }

      const customerToDelete = await this.customerModel.findByIdAndRemove(id);

      if (!customerToDelete) {
        throw new HttpException(`Customer not found`, 400);
      }

      return {
        message: `Customer ${id} successfully deleted`
      };
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
