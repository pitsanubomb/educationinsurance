import { ApiModelProperty } from '@nestjs/swagger';

export class YearDTO {
    @ApiModelProperty()
    readonly year: number
}

export class CreateNewYear{
    @ApiModelProperty({ description: 'ปีการศึกษา', example: 2560 })
    readonly year: number
}