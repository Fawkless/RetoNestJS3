import { Injectable } from '@nestjs/common';
import { Invoice } from '../entities/invoice.entity';
import { PostInvoiceDto } from '../dto/postInvoice.dto';
import { PatchInvoiceDto } from '../dto/patchInvoice.dto';

@Injectable()
export class InvoiceService {
  invoices: Invoice[] = [];

  listOfInvoices() {
    return this.invoices;
  }

  listInvoiceById(id: number) {
    const invoice = this.invoices.find((invoices) => invoices.id === id);
    return invoice;
  }

  postInvoice(newInvoice: PostInvoiceDto) {
    const id = this.generateId();
    const invoice = { id, ...newInvoice };
    this.invoices.push(invoice);
    return invoice;
  }

  updateInvoice(id: number, postInvoice: PostInvoiceDto) {
    const updateInvoice = this.listInvoiceById(id);
    const index = this.invoices.indexOf(updateInvoice);
    postInvoice = { id, ...postInvoice };
    this.invoices.splice(index, 1, postInvoice);
    return postInvoice;
  }

  modifyInvoice(id: number, patchInvoice: PatchInvoiceDto) {
    const oldInvoice = this.listInvoiceById(id);
    const index = this.invoices.indexOf(oldInvoice);
    const modifyInvoice = { ...oldInvoice, ...patchInvoice };
    this.invoices.splice(index, 1, modifyInvoice);
    return modifyInvoice;
  }

  deleteInvoice(id: number) {
    const invoice = this.listInvoiceById(id);
    const index = this.invoices.indexOf(invoice);
    if (invoice) {
      this.invoices.splice(index, 1);
      return 'Invoice eliminado';
    } else {
      return 'Invoice inexistente';
    }
  }

  generateId() {
    const lastIndex = this.invoices.length;
    if (lastIndex != 0) {
      const lastId = this.invoices[lastIndex - 1].id;
      const id = lastId + 1;
      return id;
    } else {
      return 1;
    }
  }
}
