import { ApiModelProperty } from '@nestjs/swagger'

export class UsersDTO {
  @ApiModelProperty()
  uid: number

  @ApiModelProperty()
  username: string
}

export class CreateUserBody {
  @ApiModelProperty()
  username: string

  @ApiModelProperty()
  password: string
}
