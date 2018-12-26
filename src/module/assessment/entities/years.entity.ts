import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { YearDTO } from '../assessmentdto/years.dto';

@Entity()
export class Year {
    @PrimaryGeneratedColumn()
    yid: number

    @Column()
    year: number

    toDTO(): YearDTO{
        return {
            year: this.year,
        }
    }
}