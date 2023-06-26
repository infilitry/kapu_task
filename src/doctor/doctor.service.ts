import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DoctorService {

  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  create(doctor: Doctor) {
    const newdoctor = this.doctorRepository.create(doctor);
    return this.doctorRepository.save(newdoctor);
  }

  async findAll() : Promise<Doctor[]> {
    return this.doctorRepository.find();
  }

  async findOne(id: number) :  Promise<Doctor>{
    return this.doctorRepository.findOne({ where: { id } });
  }

  async update(id: number, doctor: Doctor) : Promise<Doctor>{
    await this.doctorRepository.update(id, doctor);
    return this.doctorRepository.findOne({ where: { id } });
  }

  async remove(id: number) : Promise<void> {
    await this.doctorRepository.delete(id);
  }
}
