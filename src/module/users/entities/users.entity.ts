import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { UsersDTO } from '../dtos/users.dto';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  uid: number

  @Column()
  username: string

  @Column()
  password: string

  toDTO(): UsersDTO{
    const data = this
    return {
      uid : this.uid,
      username: this.username,
    }
  }
}
