import { ApiModelProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiModelProperty()
    readonly username: string
}

export class CreateUserDTO {
    @ApiModelProperty()
    readonly username: string

    @ApiModelProperty()
    readonly password: string
}