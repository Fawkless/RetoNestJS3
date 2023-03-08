import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerModule } from './customer/customer.module';
import { customerMiddleware } from './customer/middlewares/customer.middleware';
import { customerMiddlewarePut } from './customer/middlewares/customer.middleware.put';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceMiddlewarePut } from './invoice/middlewares/invoice.middleware.put';


@Module({
  imports: [CustomerModule, InvoiceModule],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
       .apply(customerMiddlewarePut)
       .forRoutes({ path: 'customer/:rut', method: RequestMethod.PUT});
    consumer
       .apply(customerMiddleware)
       .exclude({ path: 'customer/:rut', method: RequestMethod.PUT}, { path: 'invoice/:id', method: RequestMethod.PUT})
       .forRoutes('*')
    consumer
       .apply(InvoiceMiddlewarePut)
       .forRoutes({ path: 'customer/:rut', method: RequestMethod.PUT});
       
      }

}
