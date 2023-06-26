import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { DoctorService } from 'src/doctor/doctor.service';
import { PatientService } from 'src/patient/patient.service';

@Injectable()
export class AppointmentService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    //@Inject(DoctorService) private doctorService : DoctorService,
    //@Inject(PatientService)private patientService : PatientService,
  ) {}

  /**
   * 
   * a check if the doctor exists and a check if the patient exists
   * 
   * @param appointment 
   * @returns 
   */
  async create(appointment: Appointment) : Promise<Appointment> {

    //check for the doctor

    //check for the patient

    //check if the are classhing appointsments at that time then create the service

    const newappointment = this.appointmentRepository.create(appointment);
    return this.appointmentRepository.save(newappointment);
  }

  async findAll() : Promise<Appointment[]> {
    return this.appointmentRepository.find();
  }

  async findOne(id: number) : Promise<Appointment> {
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async update(id: number, appointment: Appointment) : Promise<Appointment> {
    await this.appointmentRepository.update(id, appointment);
    return this.appointmentRepository.findOne({ where: { id } });
  }

  async remove(id: number) : Promise<void> {
    await this.appointmentRepository.delete(id);
  }

  /**
   * 
   * @param id - patient id
   * @returns 
   */
  async retrievePatientAppointmentHistory(id: number) : Promise<Appointment[]> {

    return await this.appointmentRepository.createQueryBuilder("appointment")
    .where("appointment.patientid = :id", { id }).getMany()

  }


  /**
   * 
   * @param id -> Doctor id
   * @returns 
   */
  async retrieveDoctorAppointmentHistory(id: number) : Promise<Appointment[]> {

    return await this.appointmentRepository.createQueryBuilder("appointment")
    .where("appointment.doctorid = :id", { id }).getMany()

  }
}
