import { IsNotEmpty } from "class-validator"
import { OrderDto } from "./order.dto"

export class UserDto {
    @IsNotEmpty()
    telephone?: string
    @IsNotEmpty()
    password?: string
    name?: string
    address?: {[key:string]: string}
    orders?: {[key:string]: OrderDto}
  }