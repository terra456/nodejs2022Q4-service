import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ValidationPipe,
  HttpCode,
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
  create(
    @Body(new ValidationPipe()) createArtistDto: CreateArtistDto,
    @Res() res: Response,
  ) {
    const newArtist = this.artistService.create(createArtistDto);
    res.status(HttpStatus.CREATED).json(newArtist);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const artist = this.artistService.findOne(id);
    if (artist === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(artist);
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    const artist = this.artistService.update(id, updateArtistDto);
    if (artist === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(artist);
    }
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response,) {
    const deleted = this.artistService.remove(id);
    if (deleted === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Artist ${id} not found`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
