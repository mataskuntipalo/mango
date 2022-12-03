import { IsNotEmpty } from "class-validator"

export class RaiDto {
  id: string
  name: string
  estimateWeight: number
  isFull: boolean
  orderWeight : number
  remainingWeight: number
  startDate: string
  endDate: {start: Date, end: Date}
  actualWeight: number
  cycle: number
}

export class RaiDto1 {
  @IsNotEmpty()
  age: number
  @IsNotEmpty()
  mango: number
}