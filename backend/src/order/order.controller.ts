import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { OrderDto } from 'src/firebase/dto/order.dto';
import { OrderCollectionService } from 'src/firebase/usecase/order-collection-service';

@Controller('order')
export class OrderController {
    constructor(private orderCollectionService: OrderCollectionService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createOrder(@Body() orderDto: OrderDto): Promise<OrderDto> {
      return this.orderCollectionService.create(orderDto)
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addSlip(@Body() orderDto: OrderDto): Promise<OrderDto> {
      return this.orderCollectionService.create(orderDto)
    }
}
