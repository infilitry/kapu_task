import { BeforeInsert, Column, CreateDateColumn, Entity, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({name: 'appointment'})
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({type: 'timestamp', precision: 3})
    createdAt: Date;

    @UpdateDateColumn({type: 'timestamp', nullable: true, precision: 3})
    updatedAt: Date;

    /**
     * loosely coupling between patient and doctor as the assumption is that you will not always be seeing the same doctor
     * 
     * apprehensive about trying one to many relationships, since this this table is bound to have 
     * many records so overtime write and read performance will be greatly impacted if its tightly coupled
     * 
     * assumpiton : we are not tying doctor/patient to their respective relationships since we cant say for sure that
     * the patient will always use the same doctor. He/she may choose to go to a diffrent health facility.
     */

    doctorid : number;

    patientid : number;

    /**
     * reason for the appointment. ideally this would be tied to a Health Medical Record, detailing the patients medical history
     * Health Medical Record management is a whole different beast that is currently outside the scope of this task.
     */
    description : string;
}
