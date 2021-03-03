import { Module } from '@nestjs/common';

import { FaresController } from './fares.controller';
import { BusesModule } from '../buses/buses.module';
import { FlightsModule } from '../flights/flights.module';
import { TrainsModule } from '../trains/trains.module';
import { FaresService } from './fares.service';

@Module({
  controllers: [FaresController],
  imports: [
    BusesModule,
    FlightsModule,
    TrainsModule,
  ],
  providers: [FaresService],
})
export class FaresModule {}
