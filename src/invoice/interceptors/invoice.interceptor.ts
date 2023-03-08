import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { PostInvoiceDto } from '../dto/postInvoice.dto';



export class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
        .handle()
        .pipe(map((invoice: PostInvoiceDto) => {
          if(!invoice.hasOwnProperty('detalle')){
              invoice.detalle = 'null';
          }
          return invoice; 
          }
      )
     
    );
    }
    }