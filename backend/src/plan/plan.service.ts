import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  OrderDto,
  OrderProblem,
  OrderRais,
  OrderStatus,
} from 'src/firebase/dto/order.dto';
import { RaiDto } from 'src/firebase/dto/rai.dto';
import { PlanCollectionService } from 'src/firebase/usecase/plan-collection-service';
import { RaiCollectionService } from 'src/firebase/usecase/rai-collection-service';

@Injectable()
export class PlanService {
  // private logger: Logger = new Logger(RawReadingsService.name);

  constructor(private raiCollectionService: RaiCollectionService, private planCollectionService: PlanCollectionService) {}
  private today = moment();
  async findRai(order: OrderDto, isConfirm: boolean): Promise<OrderDto> {
    const rais: RaiDto[] = await this.raiCollectionService.getAll();
    console.log('rais: ', rais);

    // let totalCapacity = 0;
    // rais.forEach((rai) => {
    //   totalCapacity = totalCapacity + rai.remainingWeight;
    // });
    // if (totalCapacity < order.weight) {
    //   order.isProblem = true;
    //   order.problem =
    //     OrderProblem.OUT_OF_MANGO_PROBLEM +
    //     `/ หามะม่วงมาเพิ่ม ${order.weight} kg`;
    //   order.orderStatus = OrderStatus.WAIT_CONFIRM;
    //   return order;
    // }

    let updatedRais = [];
    order.rais = []
    let freeRaisWithStartPlanting = rais.filter(
      (rai) => rai.isFull === false && rai.startDate != null,
    );
    console.log('freeRaisWithStartPlanting: ', freeRaisWithStartPlanting);
    const filterRaiByEndDate = freeRaisWithStartPlanting.filter((rai) =>
      moment(order.recevieDate)
        .subtract(2, 'days')
        .isBetween(rai.endDate.start, rai.endDate.end),
    );
    console.log('filterRaiByEndDate: ', filterRaiByEndDate);
    let remainingOrderWeight = order.weight;
    // step 1 ใส่ในไร่ที่มีเริ่มแล้วและวันที่ออกผลตรงกันให้หมดก่อน
    console.log()
    filterRaiByEndDate
      .sort((a, b) => a.remainingWeight - b.remainingWeight)
      .every((rai) => {
        if (remainingOrderWeight === 0) return false;
        let sum = rai.orderWeight + remainingOrderWeight;
        if (remainingOrderWeight > rai.remainingWeight) { //ไร่นี้ใส่ไม่พอทั้ง order
          order.rais.push({
            raiId: rai.id,
            raiName: rai.name,
            weight: rai.remainingWeight,
          } as OrderRais);
          rai.orderWeight = rai.estimateWeight;
          remainingOrderWeight = remainingOrderWeight - rai.remainingWeight;
          rai.remainingWeight = 0;
        } else {
          rai.orderWeight = rai.orderWeight + remainingOrderWeight;
          rai.remainingWeight = rai.estimateWeight - rai.orderWeight;
          remainingOrderWeight = 0;
          order.rais.push({
            raiId: rai.id,
            raiName: rai.name,
            weight: rai.orderWeight,
          } as OrderRais);
        }
        if (rai.remainingWeight === 0) rai.isFull = true;
        updatedRais.push(rai);
        return true;
      });

    if (remainingOrderWeight === 0) {
      //await this.raiCollectionService.updateBatch(updatedRais);
      this.updateRai(updatedRais)
      order.orderStatus = OrderStatus.CONFIRMED;
      return order;
    }
    // step 2 เปิดไร่ใหม่
    let freeRais = rais.filter(
      (rai) => rai.isFull == false && rai.startDate == null,
    );

    const compareMonth = moment(order.recevieDate).diff(this.today, 'months');
    if (compareMonth >= 7 || isConfirm === true) {
      freeRais.every(async (rai) => {
        if (remainingOrderWeight === 0) return false;
        if (remainingOrderWeight > rai.estimateWeight) {
          //ไร่นี้ใส่ไม่พอทั้ง order
          order.rais.push({
            raiId: rai.id,
            raiName: rai.name,
            weight: rai.remainingWeight,
          } as OrderRais);
          rai.orderWeight = rai.estimateWeight;
          remainingOrderWeight = remainingOrderWeight - rai.remainingWeight;
          rai.remainingWeight = 0;
        } else {
          rai.orderWeight = remainingOrderWeight;
          rai.remainingWeight = rai.estimateWeight - remainingOrderWeight;
          remainingOrderWeight = 0;
          order.rais.push({
            raiId: rai.id,
            raiName: rai.name,
            weight: order.weight,
          } as OrderRais);
          await this.createPlan(order,rai)
        }
        if (rai.remainingWeight === 0) rai.isFull = true;
        updatedRais.push(rai);
        return true;
      });
    } else {
      order.isProblem = true;
      order.orderStatus = OrderStatus.WAIT_CONFIRM;
      order.problem = OrderProblem.LESS_THAN_7_MONTH_PROBLEM;
      return order;
    }
    if (remainingOrderWeight != 0) {
      order.isProblem = true;
      order.problem = `หามะม่วงมาเพิ่ม ${remainingOrderWeight} kg`;
    }
    order.orderStatus = OrderStatus.CONFIRMED;
    //await this.raiCollectionService.updateBatch(updatedRais);
    this.updateRai(updatedRais)
    if(updatedRais.length == 0){
      order.isProblem = true;
      order.orderStatus = OrderStatus.WAIT_CONFIRM;
      order.problem = OrderProblem.NO_RAI_PROBLEM;
    } 
    return order;
  }

  async updateRai(rais: any){
    rais.forEach(async rai => {
      await this.raiCollectionService.update(rai);
    })
  }

  async createPlan(order: OrderDto, rai: RaiDto) {
    // const watering = 'รดน้ำ';
    const plan = [
      {
        activities: [
          'กำจัดวัชพืช โดยการทำโคนให้สะอาด ตัดหญ้าบริเวณแปลง ถากโคลนหญ้าใต้ต้น',
          'ใส่ปุ๋ยเคมี 15-15-15 1กก./ต้น ร่วมกับปุ๋ยอินทรีหรือใช้วัสดุปรัปรุงดินตามผลการวิเคราะห์ดิน',
        ],
        isWatering: true,
        day: 1,
      },
      {
        activities: [
          'ตัดแต่งกิ่งตามรูปแบบมาตรฐาน ให้ทรงพุ่มโปร่งแสงแดดส่องผ่านทรงพุ่มได้',
        ],
        isWatering: false,
        day: 2,
      },
      { activities: ['-'], isWatering: true, day: 7 },
      {
        activities: [
          'ดูแลใบอ่อนไม่ให้ถูกรบกวนทำลายโดยโรคหรือแมลง โดยเน้นการป้องกันกำจัดเชื้อราที่เป็นสาเหตุของโรคแอนแทรคโนสที่เกิดกับลำต้นและใบ ใบขิง เริ่มออกใบสีเหลือง',
          'ใช้สารไซเปอเมธิน 35% 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันแมลง) + คาเบนดาซิน 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันเชื้อรา) ฉีดพ่นได้ 250 ต้น',
        ],
        isWatering: true,
        day: 12,
      },
      {
        activities: [
          'ใช้สารไซเปอเมธิน 35% 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันแมลง) + คาเบนดาซิน 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันเชื้อรา) ฉีดพ่นได้ 250 ต้น',
        ],
        isWatering: true,
        day: 19,
      },
      {
        activities: [
          'ใช้สารไซเปอเมธิน 35% 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันแมลง) + คาเบนดาซิน 500 cc ต่อน้ำ 1000 ลิตร (ป้องกันเชื้อรา) ฉีดพ่นได้ 250 ต้น',
        ],
        isWatering: true,
        day: 24,
      },
      {
        activities: [
          'เร่งการสร้างตาดอก',
          'ฉีดพ่นปุ๋ยสารเคมีสูตร 0-52-34 อัตรา 3-5 กิโลกรัม ต่อ น้ำ 1000 ลิตร ฉีดพ่นทางใบในระยะเพสลาดฉีดพ่นอย่างน้อย 2-3 ครั้งห่างกัน 7 วัน',
        ],
        isWatering: true,
        day: 31,
      },
      {
        activities: [
          'เร่งการสร้างตาดอก',
          'ใส่ปุ๋ย 8-24-24',
          'โดยฉีดพ่นปุ๋ยสารเคมีสูตร 0-52-34 อัตรา 3-5 กิโลกรัม ต่อ น้ำ 1000 ลิตร',
        ],
        isWatering: true,
        day: 38,
      },
      {
        activities: [
          'เร่งการสร้างตาดอก',
          'โดยฉีดพ่นปุ๋ยสารเคมีสูตร 0-52-34 อัตรา 3-5 กิโลกรัม ต่อ น้ำ 1000 ลิตร',
        ],
        isWatering: true,
        day: 45,
      },
      { activities: ['-'], isWatering: true, day: 52 },
      { activities: ['-'], isWatering: true, day: 59 },
      {
        activities: [
          'เร่งการออกดอก',
          'ใช้สารโปแตสเซียมในเตรท 13-0-46 ฉีดพ่นทางใบ',
        ],
        isWatering: false,
        day: 85,
      },
      {
        activities: [
          'เร่งการออกดอก',
          'ใช้สารโปแตสเซียมในเตรท 13-0-46 ฉีดพ่นทางใบ',
        ],
        isWatering: false,
        day: 90,
      },
      {
        activities: [
          'รักษาช่อดอกโดยเน้นไปที่การป้องกันโรคแอนแทรคโนส ป้องกันแมลงและเชื้อรา ',
          'เดือยไก่ 10 วัน ใช้สารไซเปอเมธิน(ป้องกันและหนอนแมลง) 35% และ คาร์เบนดาซิน 500 cc ต่อ น้ำ 1000 ลิตร 250 ต้น',
        ],
        isWatering: true,
        day: 100,
      },
      { activities: ['-'], isWatering: true, day: 104 },
      {
        activities: [
          'ช่อดอกเริ่มกลาง',
          'อิมิดาคลอพิค 100 กรัม ต่อ น้ำ 1000 ลิตร ป้องกันเพลียไฟ และ เพลียจักจั้น + ยาป้องกันโพคอราชป้องกันโรคแอนแทรคโนส 500 cc น้ำ 1000 ลิตร 10 วัน',
        ],
        isWatering: true,
        day: 110,
      },
      { activities: ['-'], isWatering: true, day: 117 },
      { activities: ['ช่อดอกบาน', 'ใช้โพคอราช'], isWatering: true, day: 120 },
      { activities: ['-'], isWatering: true, day: 124 },
      {
        activities: [
          'เมื่อมีผลอ่อนให้ป้องกันเพลี้ยไฟและแอนแทรคโนส',
          'ใช้ยาป้องกันเพลียไฟ โดยใช้พิโพรนิ้ว 1000 cc น้ำ 1000 ลิตร + โพฟิเนต ป้องกันเชื้อรา 1000 กรัม น้ำ 1000 ลิตร 250 ต้น',
        ],
        isWatering: false,
        day: 130,
      },
      { activities: ['-'], isWatering: true, day: 131 },
      {
        activities: ['ใช้พิโพรนิ้ว 1000 cc น้ำ 1000 ลิตร + โพฟิเนต'],
        isWatering: false,
        day: 137,
      },
      { activities: ['-'], isWatering: true, day: 138 },
      {
        activities: [
          'ใช้อิมิตาโคพิคป้องกันเพลียไฟ และ เพลียจักจั้น + ยาป้องกันโพคอราชป้องกันโรคแอนแทรคโนส',
        ],
        isWatering: false,
        day: 144,
      },
      { activities: ['-'], isWatering: true, day: 145 },
      {
        activities: [
          'ลูกมะม่วงเริ่มโตเท่าหัวนิ้วโป้ง',
          'ใช้ พิโพรนิ้ว+โพคโคราช+บูลโฟเฟซิ้ว 1กก ต่อน้ำ 1000 ลิตร ป้องกันเพลียแป้ง',
        ],
        isWatering: false,
        day: 151,
      },
      { activities: ['-'], isWatering: true, day: 152 },
      { activities: ['-'], isWatering: true, day: 159 },
      {
        activities: [
          'ลูกโตประมาณไข่ไก่เริ่มทำการห่อผลเมื่อผลมะม่วงอายุ 30 วัน โดยก่อนห่อทำการชุบน้ำยาป้องกันเชื้อรา ชุ่บน้ำยาอะซอกซีสโตบิ้นเพื่อป้องกันแอนเทคโนส + บูลโฟเฟซิ้วป้องกันเพลียแป้ง',
          'ทำการห่อผลให้เด็ดผลที่ไม่สมบูรณ์และผิดรูปทรงออกให้เหลือผลอ่อนที่สมบูรณ์ดีจริงๆ เอาลูกที่สมบูรณ์ใน 1 ช่อ เก็บไว้ 1-2 ลูก ต่อ 1 ช่อดอก',
          'นับจำนวนถุงที่ห่อและทำสัญลักณ์รุ่นที่ห่อ เพื่อให้ทราบจำนวนผลผลิตและรุ่นที่จะเก็บเกี่ยว 500 ถุง ต่อ 1 วัน ต่อคน',
        ],
        isWatering: false,
        day: 160,
      },
      {
        activities: [
          'ลูกโตประมาณไข่ไก่เริ่มทำการห่อผลเมื่อผลมะม่วงอายุ 30 วัน โดยก่อนห่อทำการชุบน้ำยาป้องกันเชื้อรา ชุ่บน้ำยาอะซอกซีสโตบิ้นเพื่อป้องกันแอนเทคโนส + บูลโฟเฟซิ้วป้องกันเพลียแป้ง',
          'ทำการห่อผลให้เด็ดผลที่ไม่สมบูรณ์และผิดรูปทรงออกให้เหลือผลอ่อนที่สมบูรณ์ดีจริงๆ เอาลูกที่สมบูรณ์ใน 1 ช่อ เก็บไว้ 1-2 ลูก ต่อ 1 ช่อดอก',
          'นับจำนวนถุงที่ห่อและทำสัญลักณ์รุ่นที่ห่อ เพื่อให้ทราบจำนวนผลผลิตและรุ่นที่จะเก็บเกี่ยว 500 ถุง ต่อ 1 วัน ต่อคน',
        ],
        isWatering: false,
        day: 161,
      },
      {
        activities: [
          'ลูกโตประมาณไข่ไก่เริ่มทำการห่อผลเมื่อผลมะม่วงอายุ 30 วัน โดยก่อนห่อทำการชุบน้ำยาป้องกันเชื้อรา ชุ่บน้ำยาอะซอกซีสโตบิ้นเพื่อป้องกันแอนเทคโนส + บูลโฟเฟซิ้วป้องกันเพลียแป้ง',
          'ทำการห่อผลให้เด็ดผลที่ไม่สมบูรณ์และผิดรูปทรงออกให้เหลือผลอ่อนที่สมบูรณ์ดีจริงๆ เอาลูกที่สมบูรณ์ใน 1 ช่อ เก็บไว้ 1-2 ลูก ต่อ 1 ช่อดอก',
          'นับจำนวนถุงที่ห่อและทำสัญลักณ์รุ่นที่ห่อ เพื่อให้ทราบจำนวนผลผลิตและรุ่นที่จะเก็บเกี่ยว 500 ถุง ต่อ 1 วัน ต่อคน',
        ],
        isWatering: false,
        day: 162,
      },
      {
        activities: [
          'เพิ่มความหวานให้มะม่วง',
          'โดยใช้ปุย สูตร 13-13-21 อัตรา 1-2 กก./ต้น ให้ทางดิน หรือใช้ปุ๋ยสูตร 0-0-50 ฉีดพ่นใบ',
        ],
        isWatering: true,
        day: 164,
      },
      { activities: ['-'], isWatering: true, day: 169 },
      { activities: ['-'], isWatering: true, day: 175 },
      {
        activities: [
          'เปิดดูผลที่ห่อเพื่อดูความสุกของมะม่วง หรือ นำไปลอยน้ำเพื่อเช็คความสุก ถ้าจมแสดงว่าสุกพร้อมเก็บเกี่ยวแล้ว ถ้าลอยต้องรอไปอีก 10-15 วัน',
          'เก็บผลผลิต',
        ],
        isWatering: true,
        day: 195,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 205,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 206,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 207,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 208,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 209,
      },
      {
        activities: ['เก็บเกี่ยวแล้วต้องคัดเลือกมะม่วงที่มีคุณภาพ'],
        isWatering: false,
        day: 210,
      },
    ];
    const startDatePlan = moment(order.recevieDate).subtract(7, 'months').format('yyyy-MM-DD');
    let editPlan = plan;
    if (moment(order.recevieDate).subtract(2, 'days').diff(this.today, 'months') <7) {
      const dayInNomalPlan = this.today.diff(startDatePlan, 'days');
      editPlan = plan.filter((process) => process.day >= dayInNomalPlan);
    }
    let finalPlan = {};
    editPlan.forEach((process,index) => {
      const temp = startDatePlan
      const dayKey = moment(temp).add(process.day, 'days').format('yyyy-MM-DD');
      process["date"] = dayKey
      finalPlan[dayKey] = process;
      if(index === 0) rai.startDate = dayKey
      if(process.day === 210) rai.endDate = {start:moment(dayKey).subtract(5, "days").format('yyyy-MM-DD'), end:moment(dayKey).add(5, "days").format('yyyy-MM-DD')}
    });
    finalPlan["raiName"] = rai.name
    await this.raiCollectionService.update(rai)
    await this.planCollectionService.create(finalPlan)
    return finalPlan;
  }
}

// ลำดับ
// 1. จัดให้อยุ่ในไร่ที่มีวันออกตรงกันก่อน โดยดูจากน้ำหนัก ถ้าน้ำหนักรองรับได้หมดใส่ไร่เดียว ถ้ามีไร่อื่นที่ออกวันเดียวกันอีกจับใส่ให้เต็มทีละไร่
