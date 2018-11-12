import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm'
import { User } from './user.entity'
import { UsergroupDTO } from '../userdto/usergroup.dto'

@Entity()
export class Usergroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => User, user => user.usergroup)
  users: User[]

  constructor(id?: number) {
    this.id = id
  }

  toDto(): UsergroupDTO {
    return {
      name: this.name,
    }
  }
}
