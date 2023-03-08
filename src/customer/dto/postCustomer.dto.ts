import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CustomerInterface } from '../interface/customer.interface';

export class PostCustomerDto implements CustomerInterface {

  @IsNotEmpty({message: 'Rut no puede ser un campo vacio'})
  @IsNumber()
  rut: number;

  @IsNotEmpty({message: 'Nombre no puede ser un campo vacio'})
  @IsString({message: 'Nombre no es valido'})
  nombre: string;

  @IsNotEmpty({message: 'Telefono no puede ser un campo vacio'})
  @IsNumber()
  telefono: number;

  @IsNotEmpty({message: 'Mail no puede ser un campo vacio'})
  @IsEmail()
  mail: string;

  @IsNotEmpty({message: 'Direccion no puede ser un campo vacio'})
  @IsString({message: 'Direccion no es un valido'})
  direccion: string;
}
