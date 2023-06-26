import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from './entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() patient: Patient) : Promise<Patient> {
    return this.patientService.create(patient);
  }

  @Get()
  async findAll() : Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Patient> {
    const patient = await this.patientService.findOne(id);
    if (!patient) {
      throw new NotFoundException('Patient record does not exist!');
    } else {
      return patient;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() patient: Patient) : Promise<Patient> {
    return this.patientService.update(id, patient);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) : Promise<void> {
     //handle error if patient does not exist
     const patient = await this.patientService.findOne(id);
     if (!patient) {
       throw new NotFoundException('Patient record does not exist!');
     }
     return this.patientService.remove(id);
  }
}
