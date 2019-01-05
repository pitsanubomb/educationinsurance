import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import { FacultyDTO } from "../assessmentdto/faculty.dto"

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    fid: number
    
    @Column()
    falcultyname: string

    toDTO(): FacultyDTO{
        return {
            falcultyname: this.falcultyname,
        }
    }
}

