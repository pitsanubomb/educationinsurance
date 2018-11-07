import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  uid: number

  @Column()
  username: string

  @Column()
  password: string
}
