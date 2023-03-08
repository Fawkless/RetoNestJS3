import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { invoiceInterface } from "../interfaces/invoice.interface";

export class PostInvoiceDto implements invoiceInterface{
  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  @IsOptional()
  id: number;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  fecha: string;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  monto: number;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  detalle: string;
}
