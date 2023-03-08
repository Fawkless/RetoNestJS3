import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Delete,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
  UsePipes,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { NOTFOUND } from 'dns';
import { PatchCustomerDto } from 'src/customer/dto/patchCustomer.dto';
import { PostCustomerDto } from 'src/customer/dto/postCustomer.dto';
import { AuthGuard } from '../guard/guard';
import { Interceptor } from '../interceptors/interceptor';
import { CustomerService } from '../services/customer.service';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  listCustomers() {
    return this.customerService.listOfCustomers();
  }

  @Get(':rut')
  @UseInterceptors(Interceptor)
  listCustomerByRut(@Param('rut', ParseIntPipe) rut: number) {
    const list = this.customerService.listCustomerByRut(rut);
    if (!list) throw new HttpException ("El usuario no existe", HttpStatus.NOT_FOUND)
    return this.customerService.listCustomerByRut(rut);
  }

  @Post()
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  postCustomer(@Body() newCustomer: PostCustomerDto) {
    const list = this.customerService.listCustomerByRut(newCustomer.rut);
    if (list) { throw new HttpException ("El usuario ya existe", HttpStatus.FOUND)}
    return this.customerService.postCustomer(newCustomer);
  }

  @Put(':rut')
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateCustomer(
    @Param('rut', ParseIntPipe) rut: number,
    @Body() postCustomer: PostCustomerDto,
  ) {
    const list = this.customerService.listCustomerByRut(rut);
    if (!list) throw new HttpException ("El usuario no existe", HttpStatus.NOT_FOUND)
    return this.customerService.updateCustomer(rut, postCustomer);
  }

  @Patch(':rut')
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  modifyCustomer(
    @Param('rut', ParseIntPipe) rut: number,
    @Body() patchCustomer: PatchCustomerDto,
  ) {
    const list = this.customerService.listCustomerByRut(rut);
    if (!list) throw new HttpException ("El usuario no existe", HttpStatus.NOT_FOUND)
    return this.customerService.modifyCustomer(rut, patchCustomer);
  }

  @Delete(':rut')
  @UseGuards(AuthGuard)
  deleteCustomer(@Param('rut', ParseIntPipe) rut: number) {
    const list = this.customerService.listCustomerByRut(rut);
    if (!list) throw new HttpException ("El usuario no existe", HttpStatus.NOT_FOUND)
    return this.customerService.deleteCustomer(rut);
  }
}
