import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './doctor/doctor.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/config/ormconfig';
import { PatientModule } from './patient/patient.module';
import { AppointmentModule } from './appointment/appointment.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}), 
    TypeOrmModule.forRoot(ormConfig()), 
    DoctorModule, PatientModule, AppointmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
