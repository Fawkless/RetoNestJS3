import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions';
import { PostCustomerDto } from 'src/customer/dto/postCustomer.dto';
import { Customer } from 'src/customer/entities/customer.entity';
import { PatchCustomerDto } from '../dto/patchCustomer.dto';

@Injectable()
export class CustomerService {
  customers: Customer[] = [
    {
      rut: 120120120120,
      nombre: 'Guille SA',
      telefono: 59899999999,
      mail: 'guilleSA@mail.com',
      direccion: 'mi casa 1234',
    },
    {
      rut: 121121121121,
      nombre: 'Santi SA',
      telefono: 59898888888,
      mail: 'santiSA@mail.com',
      direccion: 'casa de santi 1234',
    },
  ];

  listOfCustomers() {
    return this.customers;
  }

  listCustomerByRut(rut: number) {
    const customer = this.customers.find((customers) => customers.rut === rut);
    return customer;
  }

  postCustomer(newCustomer: PostCustomerDto) {
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(rut: number, postCustomer: PostCustomerDto) {
    const updateCustomer = this.listCustomerByRut(rut);
    const index = this.customers.indexOf(updateCustomer);
    this.customers.splice(index, 1, postCustomer);
    return postCustomer;
  }

  modifyCustomer(rut: number, patchCustomer: PatchCustomerDto) {
    const oldCustomer = this.listCustomerByRut(rut);
    const index = this.customers.indexOf(oldCustomer);
    const modifyCustomer = { ...oldCustomer, ...patchCustomer };
    this.customers.splice(index, 1, modifyCustomer);
    return modifyCustomer;
  }

  deleteCustomer(rut: number) {
    const customer = this.listCustomerByRut(rut);
    const index = this.customers.indexOf(customer);
    if (customer) {
      this.customers.splice(index, 1);
      return 'Customer eliminado';
    } else {
      return 'Customer inexistente';
    }
  }


  


}

