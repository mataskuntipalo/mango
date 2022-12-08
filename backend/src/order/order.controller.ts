import { Body, ConflictException, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderDto } from 'src/firebase/dto/order.dto';
import { OrderCollectionService } from 'src/firebase/usecase/order-collection-service';
import { PlanService } from 'src/plan/plan.service';
import * as moment from 'moment';
import { OrderService } from './order.service';


@Controller('order')
export class OrderController {
    constructor(private orderCollectionService: OrderCollectionService, private planService: PlanService, private orderService: OrderService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() order: OrderDto): Promise<any> {
      let period
      console.log("order", order)

      //console.log("moment(order.recevieDate).month(): ", moment(order.recevieDate).month())
      // if((moment(order.recevieDate).month())+1 > 5){
      //   const year = moment().year()
      //   period = moment(order.recevieDate).isBetween(moment(`${year}-11-01`), moment(`${year}-12-30`)) || order.recevieDate === `${year}-11-01` || order.recevieDate === `${year}-12-30`
      // }else{
      //   const nextYear = moment().year() + 1
      //   period = moment(order.recevieDate).isBetween(moment(`${nextYear}-01-01`), moment(`${nextYear}-05-01`)) || order.recevieDate === `${nextYear}-01-01` || order.recevieDate === `${nextYear}-05-01`
      // }
      // if(!period) throw new ConflictException("ไม่อยู่ในฤดูกาลออกผลมะม่วง")
      const newOrder = await this.orderCollectionService.create(order)
      return await this.orderService.findRaiForOrder(newOrder)
    }

    @Post("/confirm")
    @HttpCode(HttpStatus.CREATED)
    async createOrderWithConfirm(@Body() order: OrderDto): Promise<any> {
      let period
      console.log("order", order)

      //console.log("moment(order.recevieDate).month(): ", moment(order.recevieDate).month())
      // if((moment(order.recevieDate).month())+1 > 5){
      //   const year = moment().year()
      //   period = moment(order.recevieDate).isBetween(moment(`${year}-11-01`), moment(`${year}-12-30`)) || order.recevieDate === `${year}-11-01` || order.recevieDate === `${year}-12-30`
      // }else{
      //   const nextYear = moment().year() + 1
      //   period = moment(order.recevieDate).isBetween(moment(`${nextYear}-01-01`), moment(`${nextYear}-05-01`)) || order.recevieDate === `${nextYear}-01-01` || order.recevieDate === `${nextYear}-05-01`
      // }
      // if(!period) throw new ConflictException("ไม่อยู่ในฤดูกาลออกผลมะม่วง")
      const newOrder = await this.orderCollectionService.create(order)
      return await this.orderService.findRaiForOrderWithConfirm(newOrder)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addSlip(@Body() orderDto: OrderDto): Promise<OrderDto> {
      return this.orderCollectionService.create(orderDto)
    }

    @Get("/test")
    @HttpCode(HttpStatus.CREATED)
    async test(@Body() orderDto: OrderDto): Promise<any> {
      //return this.planService.createPlan()
    }
}
