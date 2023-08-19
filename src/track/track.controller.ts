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
  NotFoundException,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Response } from 'express';
import { UuidValidator } from 'src/validator/uuid.validator';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  async create(
    @Body()
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
  async findOne(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      const track = await this.trackService.findOne(id);
      if (track) {
        res.status(HttpStatus.OK).json(track);
      } else {
        throw new Error();
      }
    } catch {
      throw new NotFoundException(`Track ${id} not found`);
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidValidator,
    @Body() updateTrackDto: UpdateTrackDto,
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
      throw new NotFoundException(`Track ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      await this.trackService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      throw new NotFoundException(`Track ${id} not found`);
    }
  }
}
