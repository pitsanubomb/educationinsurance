import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class UserGroup {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => User, user => user.usergroup)
  users: User[]
}
