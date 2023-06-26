import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({name: 'patient'})
export class Patient {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp', precision: 3})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true, precision: 3})
    updatedAt: Date;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({type: 'date'})
    dateofbirth : Date;
}
