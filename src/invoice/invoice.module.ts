import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
