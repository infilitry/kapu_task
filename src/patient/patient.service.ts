import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  async create(patient: Patient) : Promise<Patient> {
    const newpatient = this.patientRepository.create(patient);
    return this.patientRepository.save(newpatient);
  }
  

  async findAll() : Promise<Patient[]> {
    return this.patientRepository.find();
  }

  async findOne(id: number) :  Promise<Patient>{
    return this.patientRepository.findOne({ where: { id } });
  }

  async update(id: number, doctor: Patient) : Promise<Patient>{
    await this.patientRepository.update(id, doctor);
    return this.patientRepository.findOne({ where: { id } });
  }


  async remove(id: number) : Promise<void> {
    await this.patientRepository.delete(id);
  }
}
