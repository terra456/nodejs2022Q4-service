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
  async create(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    createTrackDto: CreateTrackDto,
    @Res() res: Response,
  ) {
    try {
      const newTrack = await this.trackService.create(createTrackDto);
      if (newTrack) {
        res.status(HttpStatus.CREATED).json(newTrack);
      } else {
        throw new Error();
      }
    } catch {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Get()
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      const track = await this.trackService.findOne(id);
      if (track) {
        res.status(HttpStatus.OK).json(track);
      } else {
        throw new Error();
      }
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateTrackDto: UpdateTrackDto,
    @Res() res: Response,
  ) {
    try {
      const track = await this.trackService.update(id, updateTrackDto);
      if (track) {
        res.status(HttpStatus.OK).json(track);
      } else {
        throw new Error();
      }
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      await this.trackService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} not found`);
    }
  }
}
