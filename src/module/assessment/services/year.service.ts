import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Year } from '../entities/years.entity'
import { Repository } from 'typeorm'
import { CreateNewYearDTO } from '../assessmentdto/years.dto'

@Injectable()
export class YearService {
  constructor(
    @InjectRepository(Year) private readonly yearRepo: Repository<Year>,
  ) {}

  async addYear(body: CreateNewYearDTO) {
    const year = new Year()
    year.year = body.year
    try {
      const res = await this.yearRepo.save(year)
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
