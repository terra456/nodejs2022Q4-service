import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  Res,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
    @Res() res: Response,
  ) {
    const newArtist = await this.artistService.create(createArtistDto);
    res.status(HttpStatus.CREATED).json(newArtist);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      const artist = await this.artistService.findOne(id);
      if (artist === null) {
        res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
      } else {
        res.status(HttpStatus.OK).json(artist);
      }
    } catch {
      res.status(HttpStatus.FORBIDDEN).send();
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    try {
      const artist = await this.artistService.update(id, updateArtistDto);
      res.status(HttpStatus.OK).json(artist);
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      await this.artistService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
    }
  }
}
