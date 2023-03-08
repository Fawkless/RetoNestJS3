import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";
import { CustomerInterface } from "../interface/customer.interface";

export class PatchCustomerDto implements CustomerInterface {
  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  @IsOptional()
  rut: number;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  @IsOptional()
  nombre: string;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsNumber()
  telefono: number;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  @IsOptional()
  mail: string;

  @IsNotEmpty({message: 'No puede ser un campo vacio'})
  @IsString({message: 'No es un string'})
  direccion: string;
}
