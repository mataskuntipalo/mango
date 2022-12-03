import { IsNotEmpty } from 'class-validator';

export enum OrderStatus {
  WAIT_PAY = 'รอการชำระเงิน',
  WAIT_CONFIRM = 'รอการยืนยัน',
  CONFIRMED = 'ยืนยันคำสั่งซื้อ',
  PLANTING = 'กำลังเพาะปลูก',
  WAIT_DELIVERY = 'กำลังจัดส่ง',
  COMPLETE = 'สำเร็จ',
  FAIL = 'ยกเลิก',
}
export class OrderRais {
  raiId: string;
  raiName: string;
  weight: number;
}

export class OrderDto {
  orderId: string;
  @IsNotEmpty()
  name: string;
  orderStatus: OrderStatus;
  slipURL: string;
  //cycleID: string
  address: string;
  telephone: string;
  orderDate: Date;
  recevieDate: Date;
  weight: number;
  totalPrice: number;
  rais: OrderRais[];
  isProblem: boolean;
  problem: string;
}
