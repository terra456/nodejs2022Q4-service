import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const track = this.favsService.findTrack(id);
    if (track === null) {
      console.log('track', id);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track ${id} not found`);
    } else {
      const newFawTrack = this.favsService.addTrack(id);
      if (newFawTrack === 'created') {
        res.status(HttpStatus.CREATED).send(`Track ${id} added to favorites`);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      }
    }
  }
  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string, @Res() res: Response) {
    const album = this.favsService.findAlbum(id);
    if (album === null) {
      console.log('album', id);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track ${id} not found`);
    } else {
      const newFawAlbum = this.favsService.addAlbum(id);
      if (newFawAlbum === 'created') {
        res.status(HttpStatus.CREATED).send(`Track ${id} added to favorites`);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      }
    }
  }
  @Post('artist/:id')
  addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const artist = this.favsService.findArtist(id);
    if (artist === null) {
      console.log('artist', id);
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track ${id} not found`);
    } else {
      const newFawArtist = this.favsService.addArtist(id);
      if (newFawArtist === 'created') {
        res.status(HttpStatus.CREATED).send(`Track ${id} added to favorites`);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      }
    }
  }

  @Delete('track/:id')
  removeTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const del = this.favsService.removeTrack(id);
    if (del === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} was not in favorites`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
  @Delete('artist/:id')
  removeArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const del = this.favsService.removeArtist(id);
    if (del === null) {
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`Artist ${id} was not in favorites`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
  @Delete('album/:id')
  removeAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const del = this.favsService.removeAlbum(id);
    if (del === null) {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} was not in favorites`);
    } else {
      res.status(HttpStatus.NO_CONTENT).send();
    }
  }
}
