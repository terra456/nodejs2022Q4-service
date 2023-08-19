import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Res,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';
import { UuidValidator } from 'src/validator/uuid.validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto, @Res() res: Response) {
    const newAlbum = await this.albumService.create(createAlbumDto);
    res.status(HttpStatus.CREATED).json(newAlbum);
  }

  @Get()
  async findAll() {
    return await this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: UuidValidator, @Res() res: Response) {
    const album = await this.albumService.findOne(id);
    if (album === null) {
      throw new NotFoundException(`Album ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(album);
    }
  }

  @Put(':id')
  async update(
    @Param() { id }: UuidValidator,
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    try {
      const album = await this.albumService.update(id, updateAlbumDto);
      res.status(HttpStatus.OK).json(album);
    } catch {
      throw new NotFoundException(`Album ${id} not found`);
    }
  }

  @Delete(':id')
  async remove(@Param() { id }: UuidValidator, @Res() res: Response) {
    try {
      await this.albumService.remove(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      throw new NotFoundException(`Album ${id} not found`);
    }
  }
}
