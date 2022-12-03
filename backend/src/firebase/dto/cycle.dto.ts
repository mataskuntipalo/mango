import { IsNotEmpty } from "class-validator"

export class CycleDto {
    @IsNotEmpty()
    cycle: number
    @IsNotEmpty()
    rai: number
    actualMango: number
    startDate: Date
    endDate: Date
    totalIncome: number
    weekCounter: number
    orderWeight: number
    cycleNumber: number
    timeStamp: number
  }