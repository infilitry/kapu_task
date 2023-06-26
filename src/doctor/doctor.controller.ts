import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() doctor: Doctor) : Promise<Doctor> {
    return this.doctorService.create(doctor);
  }

  @Get()
  async findAll() : Promise<Doctor[]> {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Doctor> {
    const doctor = await this.doctorService.findOne(id);
    if (!doctor) {
      throw new NotFoundException('Doctor does not exist!');
    } else {
      return doctor;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() doctor: Doctor) : Promise<Doctor> {
    return this.doctorService.update(id, doctor);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) : Promise<any> {
     //handle error if doctor does not exist
     const doctor = await this.doctorService.findOne(id);
     if (!doctor) {
       throw new NotFoundException('Doctor does not exist!');
     }
     return this.doctorService.remove(id);
  }
}
