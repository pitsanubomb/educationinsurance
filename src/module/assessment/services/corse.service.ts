import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Course } from '../entities/course.entity';
import { CreatNewCourseDTO } from '../assessmentdto/course.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async addCourse(body:CreatNewCourseDTO) {
    const course = new Course
    course.coursename = body.coursename
    try {
      return await this.courseRepo.save(course)
    } catch (error) {
      throw new HttpException('ไม่สามารถบันทึกหลักสูตรได้กรุณาลองใหม่อีกครั้งคะ', HttpStatus.BAD_REQUEST)
    }
  }
}
