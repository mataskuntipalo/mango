import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderDto } from 'src/firebase/dto/order.dto';
import { OrderCollectionService } from 'src/firebase/usecase/order-collection-service';
import { PlanService } from 'src/plan/plan.service';
import * as moment from 'moment';


@Controller('order')
export class OrderController {
    constructor(private orderCollectionService: OrderCollectionService, private planService: PlanService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() order: OrderDto): Promise<any> {
      let period
      if(moment(order.recevieDate).month() > 5){
        const year = moment().year()
        period = moment(order.recevieDate).isBetween(moment(`${year}-11-01`), moment(`${year}-12-30`))
      }else{
        const nextYear = moment().year() + 1
        period = moment(order.recevieDate).isBetween(moment(`${nextYear}-01-01`), moment(`${nextYear}-05-01`))
      }
      if(!period) throw new ConflictException("ไม่อยู่ในฤดูกาลออกผลมะม่วง")
      return this.orderCollectionService.create(order)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addSlip(@Body() orderDto: OrderDto): Promise<OrderDto> {
      return this.orderCollectionService.create(orderDto)
    }

    @Get("/test")
    @HttpCode(HttpStatus.CREATED)
    async test(@Body() orderDto: OrderDto): Promise<any> {
      return this.planService.createPlan()
    }
}
