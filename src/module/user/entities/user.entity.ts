import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserDTO } from '../userdto/user.dto'
import { Usergroup } from './usergroup.entity'

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

  toDto(): UserDTO {
    return {
      username: this.username,
      usergroup: {
        id: this.usergroup.id,
      },
    }
  }
}
