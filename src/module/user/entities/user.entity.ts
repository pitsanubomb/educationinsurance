import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { UserDTO } from '../userdto/user.dto'
import { Usergroup } from './usergroup.entity'
import { Faculty } from '../../assessment/entities/faculty.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number

  @Column()
  username: string

  @Column()
  password: string

  @ManyToOne(type => Usergroup, usergroup => usergroup.users)
  usergroup: Usergroup

  @ManyToMany(type => Faculty)
  @JoinTable()
  faculty: Faculty[]

  toDto(): UserDTO {
    return {
      username: this.username,
      usergroup: {
        id: this.usergroup.id,
      },
    }
  }
}
