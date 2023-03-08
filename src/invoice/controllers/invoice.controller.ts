import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PatchInvoiceDto } from '../dto/patchInvoice.dto';
import { PostInvoiceDto } from '../dto/postInvoice.dto';
import { AuthGuard } from '../guards/guard';
import { Interceptor } from '../interceptors/invoice.interceptor';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  listInvoices() {
    return this.invoiceService.listOfInvoices();
  }

  @Get(':id')
  @UseInterceptors(Interceptor)
  listInvoiceById(@Param('id', ParseIntPipe) id: number) {
    const list = this.invoiceService.listInvoiceById(id);
    if (!list) throw new HttpException ("La factura no existe", HttpStatus.NOT_FOUND)
    return this.invoiceService.listInvoiceById(id);
  }

  @Post()
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  postInvoice(@Body() newInvoice: PostInvoiceDto) {
    return this.invoiceService.postInvoice(newInvoice);
  }

  @Put(':id')
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  updateInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() postInvoice: PostInvoiceDto,
  ) {
    const list = this.invoiceService.listInvoiceById(id);
    if (!list) throw new HttpException ("La factura no existe", HttpStatus.NOT_FOUND)
    return this.invoiceService.updateInvoice(id, postInvoice);
  }

  @Patch(':id')
  @UseInterceptors(Interceptor)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  modifyInvoice(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchInvoice: PatchInvoiceDto,
  ) {
    const list = this.invoiceService.listInvoiceById(id);
    if (!list) throw new HttpException ("La factura no existe", HttpStatus.NOT_FOUND)
    return this.invoiceService.modifyInvoice(id, patchInvoice);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteInvoice(@Param('id', ParseIntPipe) id: number) {
    const list = this.invoiceService.listInvoiceById(id);
    if (!list) throw new HttpException ("La factura no existe", HttpStatus.NOT_FOUND)
    return this.invoiceService.deleteInvoice(id);
  }
}
