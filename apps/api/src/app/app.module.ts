import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlightsModule } from './flights/flights.module';
import { BusesModule } from './buses/buses.module';
import { TrainsModule } from './trains/trains.module';
import { FaresModule } from './fares/fares.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    FlightsModule,
    BusesModule,
    TrainsModule,
    FaresModule,
  ],
})
export class AppModule { }
