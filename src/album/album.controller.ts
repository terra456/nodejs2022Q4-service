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
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Response } from 'express';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(
    @Body(new ValidationPipe({ skipMissingProperties: true }))
    createAlbumDto: CreateAlbumDto,
    @Res() res: Response,
  ) {
    const newAlbum = this.albumService.create(createAlbumDto);
    res.status(HttpStatus.CREATED).json(newAlbum);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const album = this.albumService.findOne(id);
    if (album === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(album);
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
    @Res() res: Response,
  ) {
    const album = this.albumService.update(id, updateAlbumDto);
    if (album === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} not found`);
    } else {
      res.status(HttpStatus.OK).json(album);
    }
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const deleted = this.albumService.remove(id);
    if (deleted === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} not found`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
