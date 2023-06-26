import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({name: 'doctor'})
export class Doctor {

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

    /**
     * this should be its own class or at the least an enum
     */
    @Column()
    speciality: string;

}
