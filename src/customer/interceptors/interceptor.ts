import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { PostCustomerDto } from "../dto/postCustomer.dto";



export class Interceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next
        .handle()
        .pipe(map((customer: PostCustomerDto) => {
          if(!customer.hasOwnProperty('direccion')){
              customer.direccion = 'null';
          }
          return customer; 
          }
      )
     
    );
    }
    }