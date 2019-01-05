import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Faculty } from '../entities/faculty.entity'
import { CreatNewFacultyDTO } from '../assessmentdto/faculty.dto'

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepo: Repository<Faculty>,
  ) {}

  async addFaculty(body: CreatNewFacultyDTO) {
    const faculty = new Faculty()
    faculty.falcultyname = body.falcultyname
    try {
      const res = await this.facultyRepo.save(faculty)
      return res
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getAllFaculty() {
    try {
      return this.facultyRepo.find()
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }

  async getFacultybyname(_facultyname: string) {
    try {
      return this.facultyRepo.findOne({ falcultyname: _facultyname })
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST)
    }
  }
}
