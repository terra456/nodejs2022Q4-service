import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  HttpStatus,
  Put,
  Res,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    createTrackDto: CreateTrackDto,
    @Res() res: Response,
  ) {
    const newTrack = this.trackService.create(createTrackDto);
    console.log('new');
    res.status(HttpStatus.CREATED).json(newTrack);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const track = this.trackService.findOne(id);
    console.log(track);
    if (track === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(track);
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    const track = this.trackService.update(id, updateTrackDto);
    if (track === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(track);
    }
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const deleted = this.trackService.remove(id);
    if (deleted === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
