import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async create(@Body() appointment: Appointment) : Promise<Appointment> {
    return this.appointmentService.create(appointment);
  }

  @Get()
  async findAll() : Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) : Promise<Appointment> {
    const appointment = await this.appointmentService.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Appointment record does not exist!');
    } else {
      return appointment;
    }
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() appointment: Appointment) : Promise<Appointment> {

    const appointmnt = await this.appointmentService.findOne(id);
    if (!appointmnt) {
      throw new NotFoundException('Appointment record does not exist!');
    } else {
      return this.appointmentService.update(+id, appointment);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) : Promise<void> {
    //handle error if appointment record does not exist
    const appointment = await this.appointmentService.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Appointment record does not exist!');
    }
    return this.appointmentService.remove(id);
  }
}
