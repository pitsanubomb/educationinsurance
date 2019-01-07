import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { FacultyDTO } from "../assessmentdto/faculty.dto"
import { Course } from "./course.entity";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    fid: number
    
    @Column()
    falcultyname: string

    @OneToMany(type => Course, course => course.faculty)
    course: Course[]

    constructor(fid?: number) {
        this.fid = fid
    }

    toDTO(): FacultyDTO{
        return {
            falcultyname: this.falcultyname,
        }
    }
}

