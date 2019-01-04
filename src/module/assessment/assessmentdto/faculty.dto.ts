import { ApiModelProperty } from '@nestjs/swagger'

export class FacultyDTO {
    @ApiModelProperty()
    readonly falcultyname: string
}

export class CreatNewFacultyDTO {
    @ApiModelProperty({ description: 'ชื่อคณะ', example: 'คณะวิทยาศาสต์และเทคโนโลยี' })
    readonly falcultyname: string
}