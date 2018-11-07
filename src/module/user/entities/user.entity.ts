import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserDTO } from '../userdto/user.dto';

@Entity('user')

export class User {
    @PrimaryGeneratedColumn()
    uid: number

    @Column()
    username: string

    @Column()
    password: string

    toDto(): UserDTO {
        const data = this
        return {
            username: data.username,
        }
    }
}