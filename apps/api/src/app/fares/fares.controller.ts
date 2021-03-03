import { Controller, Post, Body, Get, Query } from '@nestjs/common';

import type { ListAllEntities, CreateFareDtoWithMode, FareWithMode } from '../shared/types';
import { FaresService } from './fares.service';

@Controller('fares')
export class FaresController {

  constructor(private svc: FaresService) { }

  @Post('create')
  create(@Body() fare: CreateFareDtoWithMode): FareWithMode {
    return this.svc.create(fare);
  }

  @Get('findAll')
  async findAll(@Query() query: ListAllEntities): Promise<FareWithMode[]> {
    console.warn('QUERY:', query);
    // Insert a delay to simulate database queries:
    await new Promise<void>(resolve => setTimeout(() => resolve(), 2000));
    // Return the results from the service:
    return this.svc.findAll(query);
  }

}
