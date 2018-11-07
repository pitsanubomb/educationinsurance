import { ApiModelProperty } from '@nestjs/swagger'

export class UsersDTO {
  @ApiModelProperty()
  uid: number

  @ApiModelProperty()
  username: string

  @ApiModelProperty()
  password: string
}

export class CreateUsersDTO {
  @ApiModelProperty()
  username: string

  @ApiModelProperty()
  password: string
}
