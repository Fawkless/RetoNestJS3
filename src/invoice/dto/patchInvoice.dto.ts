import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { invoiceInterface } from '../interfaces/invoice.interface';



export class PatchInvoiceDto implements invoiceInterface{
  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  @IsOptional()
  fecha: string;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  @IsOptional()
  monto: number;
  
  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  @IsOptional()
  detalle: string;
}
