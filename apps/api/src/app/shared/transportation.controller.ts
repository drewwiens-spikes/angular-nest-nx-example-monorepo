import { Post, Body, Get, Query, Param, Put, Controller } from '@nestjs/common';

import { TransportationService } from './transportation.service';
import type { CreateFareDto, Fare, ListAllEntities } from '@app/api-interfaces';

@Controller()
export abstract class TransportationController {

  constructor(private svc: TransportationService) { }

  @Post('create')
  create(@Body() fare: CreateFareDto): Fare {
    return this.svc.create(fare);
  }

  @Get('findAll')
  findAll(@Query() query: ListAllEntities): Fare[] {
    return this.svc.findAll(query);
  }

  @Get('findOne/:id')
  findOne(@Param('id') id: number): Fare {
    return this.svc.findOne(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateFareDto: Partial<CreateFareDto>): Fare {
    return this.svc.update(id, updateFareDto);
  }

  @Get('timeScale')
  timeScale(): number | undefined {
    return this.svc.timeScale;
  }

}
