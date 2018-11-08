import { ApiModelProperty } from '@nestjs/swagger'

export class UserDTO {
  @ApiModelProperty()
  readonly username: string
}

export class CreateUserDTO {
  @ApiModelProperty({
    description: 'ชื่อผู้ใช้งาน',
    example: 'admin',
    minimum: 4,
  })
  readonly username: string

  @ApiModelProperty()
  readonly password: string
}
