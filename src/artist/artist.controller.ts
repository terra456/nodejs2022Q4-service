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
  NotFoundException,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Response } from 'express';
import { UuidValidator } from 'src/validator/uuid.validator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto, @Res() res: Response) {
    const newArtist = await this.artistService.create(createArtistDto);
    res.status(HttpStatus.CREATED).json(newArtist);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UuidValidator, @Res() res: Response) {
    const artist = await this.artistService.findOne(id);
    if (artist === null) {
      throw new NotFoundException(`Artist ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(artist);
    }
    // try {
    // } catch {
    //   res.status(HttpStatus.FORBIDDEN).send();
    // }
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidValidator,
    @Body() updateArtistDto: UpdateArtistDto,
    @Res() res: Response,
  ) {
    try {
      const artist = await this.artistService.update(id, updateArtistDto);
      res.status(HttpStatus.OK).json(artist);
    } catch {
      throw new NotFoundException(`Artist ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      await this.artistService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      throw new NotFoundException(`Artist ${id} not found`);
    }
  }
}
