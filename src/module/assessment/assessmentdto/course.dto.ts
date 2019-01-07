import { ApiModelProperty } from '@nestjs/swagger'

export class CrouseDTO {
    @ApiModelProperty()
    readonly coursename: string
}

export class CreatNewCourseDTO {
    @ApiModelProperty({ description: 'ชื่อคณะ', example: 'คณะวิทยาศาสต์และเทคโนโลยี' })
    readonly coursename: string
}