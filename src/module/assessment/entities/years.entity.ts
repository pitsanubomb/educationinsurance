import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { YearDTO } from '../assessmentdto/year.sdto';

@Entity()
export class Year {
    @PrimaryGeneratedColumn()
    yid: number

    @Column()
    year: number

    toDto(): YearDTO{
        return {
            year: this.year,
        }
    }
}