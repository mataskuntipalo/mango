import { IsNotEmpty } from 'class-validator';

export enum OrderProblem {
  OUT_OF_MANGO_PROBLEM = "มีมะม่วงไม่เพียงพอ",
  LESS_THAN_7_MONTH_PROBLEM = "ระยะเวลาปลูกไม่เพียงพอ",
  NO_RAI_PROBLEM = "ไม่มีผลผลิตในช่วงเวลาที่สั่ง"
}

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
  orderDate: string;
  recevieDate?: string;
  weight: number;
  totalPrice?: number;
  rais?: OrderRais[];
  isProblem?: boolean;
  problem?: string;
}
