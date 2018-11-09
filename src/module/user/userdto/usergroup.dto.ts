import { ApiModelProperty } from '@nestjs/swagger'

export class UsergroupDTO {
  @ApiModelProperty({ description: 'ชื่อกลุ่มผู้ใช้งาน', example: 'admin' })
  readonly name: string
}

export class UsergroupIdDTO {
  @ApiModelProperty()
  readonly id: number
}

export class IUsergroupDTO {
  @ApiModelProperty({ description: 'ชื่อกลุ่มผู้ใช้งาน', example: 'admin' })
  readonly name: string
  @ApiModelProperty()
  readonly id: number
}

export class CreateUsergroup {
  @ApiModelProperty({ description: 'ชื่อกลุ่มผู้ใช้งาน', example: 'admin' })
  readonly name: string
}
