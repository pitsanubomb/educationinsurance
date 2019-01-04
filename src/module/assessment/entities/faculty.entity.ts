import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm"
import { FacultyDTO } from "../assessmentdto/faculty.dto"
import { User } from "../../user/entities/user.entity";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    fid: number
    
    @Column()
    falcultyname: string

    @ManyToMany(type => User)
    @JoinTable()
    users: User[]

    toDTO(): FacultyDTO{
        return {
            falcultyname: this.falcultyname,
        }
    }
}

