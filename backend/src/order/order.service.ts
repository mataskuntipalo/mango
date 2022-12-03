import { Injectable } from '@nestjs/common';
import { OrderDto, OrderStatus } from 'src/firebase/dto/order.dto';
import { OrderCollectionService } from 'src/firebase/usecase/order-collection-service';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class OrderService {
  constructor(private planService: PlanService, private orderCollectionService: OrderCollectionService) {}
  async findRaiForOrder(order: OrderDto): Promise<any> {
    const orderUpdated = await this.planService.findRai(order, false)
    return this.orderCollectionService.update(orderUpdated)
  }
}
