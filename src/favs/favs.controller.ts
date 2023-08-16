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
import { Album, Artist, Track } from '@prisma/client';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const favs = await this.favsService.findAll();
      const artists = favs.artists.map(async (el) => {
        return await this.favsService.findArtist(el);
      });
      const albums = favs.albums.map(async (el) => {
        return await this.favsService.findAlbum(el);
      });
      const tracks = favs.tracks.map(async (el) => {
        return await this.favsService.findTrack(el);
      });
      const favsResult: {
        artists: Artist[];
        albums: Album[];
        tracks: Track[];
      } = {
        artists: [],
        albums: [],
        tracks: [],
      };
      Promise.allSettled([
        Promise.allSettled(artists).then((results) => {
          favsResult.artists = results
            .map((el) => {
              return el.status === 'fulfilled' ? el.value : null;
            })
            .filter((el) => el !== null);
        }),
        Promise.allSettled(albums).then((results) => {
          favsResult.albums = results
            .map((el) => {
              return el.status === 'fulfilled' ? el.value : null;
            })
            .filter((el) => el !== null);
        }),
        Promise.allSettled(tracks).then((results) => {
          favsResult.tracks = results
            .map((el) => {
              return el.status === 'fulfilled' ? el.value : null;
            })
            .filter((el) => el !== null);
        }),
      ]).then(() => res.status(HttpStatus.OK).json(favsResult));
    } catch {
      res.status(HttpStatus.FORBIDDEN).send(`Mistake`);
      return;
    }
  }

  @Post('track/:id')
  async addTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const track = await this.favsService.findTrack(id);
    if (track === null) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track ${id} not found`);
    } else {
      const newFawTrack = await this.favsService.addTrack(id);
      if (newFawTrack.tracks.includes(id)) {
        res.status(HttpStatus.CREATED).json(track);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      }
    }
  }
  @Post('album/:id')
  async addAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const album = await this.favsService.findAlbum(id);
    if (album === null) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Album ${id} not found`);
    } else {
      const newFawAlbum = await this.favsService.addAlbum(id);
      if (newFawAlbum.albums.includes(id)) {
        res.status(HttpStatus.CREATED).json(album);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Album not add`);
      }
    }
  }
  @Post('artist/:id')
  async addArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const artist = await this.favsService.findArtist(id);
    if (artist === null) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(`Artist ${id} not found`);
    } else {
      const newFawArtist = await this.favsService.addArtist(id);
      if (newFawArtist.artists.includes(id)) {
        res.status(HttpStatus.CREATED).json(artist);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Artist not add`);
      }
    }
  }

  @Delete('track/:id')
  async removeTrack(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      await this.favsService.removeTrack(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} was not in favorites`);
    }
  }
  @Delete('artist/:id')
  async removeArtist(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      await this.favsService.removeArtist(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`Artist ${id} was not in favorites`);
    }
  }
  @Delete('album/:id')
  async removeAlbum(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    try {
      await this.favsService.removeAlbum(id);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} was not in favorites`);
    }
  }
}
