import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { Faculty } from "./faculty.entity";

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    cid: number
    
    @Column()
    coursename: string  
    
    @ManyToOne(type => Faculty, faculty => faculty.course)
    faculty: Faculty
}
