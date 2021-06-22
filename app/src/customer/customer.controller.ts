import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.customerService.findById(id);
  }

  @Post()
  async create(@Body() data: CreateCustomerDto) {
    return await this.customerService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateCustomerDto,
  ) {
    return await this.customerService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.customerService.delete(id);
  }

  @Delete()
  async clear() {
    return await this.customerService.clear();
  }
}
