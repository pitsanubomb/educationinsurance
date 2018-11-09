import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { UserDTO } from '../userdto/user.dto'
import { UserGroup } from './usergroup'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number

  @Column()
  username: string

  @Column()
  password: string

  @ManyToOne(type => UserGroup, usergroup => usergroup.users)
  usergroup: UserGroup

  toDto(): UserDTO {
    return {
      username: this.username,
      usergroup: {
        name: this.usergroup.name,
      },
    }
  }
}
