import { IsNotEmpty } from "class-validator"
import { type } from "os"
import { OrderDto } from "./order.dto"

export type process = {
  activities: string[]
  isWatering: boolean
  day: number
}

export class PlanDto {
  sss: string
}