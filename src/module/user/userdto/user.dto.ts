import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger'
import { UsergroupIdDTO } from './usergroup.dto'

export class UserDTO {
  @ApiModelProperty()
  readonly username: string

  @ApiModelProperty({ type: UsergroupIdDTO })
  usergroup: UsergroupIdDTO
}

export class CreateUserDTO {
  @ApiModelProperty({
    description: 'ชื่อผู้ใช้งาน',
    example: 'admin',
    minimum: 4,
  })
  username: string

  @ApiModelProperty()
  password: string

  @ApiModelPropertyOptional()
  groupId: number
}

export class AddfacultyDTO{
  @ApiModelProperty({
    description: 'username',
    example: 'admin',
  })
  username: string

  @ApiModelProperty({
    description: 'list facultyname',
    example: ["คณะวิทยาศาสตร์และเทคโนโลยี","คณะเทคโนโลยีอุตสาหกรรม"],
  })
  facultyname: Array<string>
}
