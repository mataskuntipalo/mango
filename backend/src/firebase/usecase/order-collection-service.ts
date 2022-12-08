import { Inject, Injectable } from '@nestjs/common';
import { CollectionReference } from '@google-cloud/firestore';
import { OrderCollectionName } from '../firestore.providers';
import { OrderDto, OrderStatus } from '../dto/order.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class OrderCollectionService {
  // private logger: Logger = new Logger(RawReadingsService.name);

  constructor(
    @Inject(OrderCollectionName)
    private orderCollection: CollectionReference<OrderDto>,
  ) {}

  async create(order: OrderDto): Promise<OrderDto> {
    const orderId = nanoid(6);
    const orderRef = this.orderCollection.doc(orderId);
    order.orderId = orderId;
    order.orderStatus = OrderStatus.WAIT_PAY
    order.isProblem = false;
    order.problem = null;
    await orderRef.set(order);
    return order;
  }

  async update(order: OrderDto): Promise<OrderDto> {
    const orderRef = this.orderCollection.doc(order.orderId);
    await orderRef.set(order);
    return order;
  }

  async getOrderByUser(userId: string): Promise<OrderDto[]> {
    const orders = await this.orderCollection.where('userId', '==', userId).get();
    if (orders.empty) {
      console.log('No matching documents.');
      return;
    }  
    let result = []
    orders.forEach(doc => {
      result.push(doc.data());
    });
    return result;
  }
}
