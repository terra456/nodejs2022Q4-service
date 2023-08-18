import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  Req,
  Request,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { Response } from 'express';
import { Album, Artist, Track } from '@prisma/client';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(@Request() req, @Res() res: Response) {
    const { userId } = req.user;
    try {
      const favs = await this.favsService.findAll(userId);
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

  @Get(':id')
  async findUniq(
    @Request() req,
    @Res() res: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const userId = id;
    try {
      const favs = await this.favsService.findAll(userId);
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

  @Get('artist')
  async findArtists(@Request() req, @Res() res: Response) {
    const { userId } = req.user;
    const result = await this.favsService.findAll(userId);
    res.status(HttpStatus.OK).json(result.artists);
  }

  @Post('track/:id')
  async addTrack(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    if (!userId) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      return;
    }
    const track = await this.favsService.findTrack(id);
    if (track === null) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track ${id} not found`);
    } else {
      const newFawTrack = await this.favsService.addTrack(id, userId);
      if (newFawTrack.tracks.includes(id)) {
        res.status(HttpStatus.CREATED).json(track);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Track not add`);
      }
    }
  }
  @Post('album/:id')
  async addAlbum(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    const album = await this.favsService.findAlbum(id);
    if (album === null) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Album ${id} not found`);
    } else {
      const newFawAlbum = await this.favsService.addAlbum(id, userId);
      if (newFawAlbum.albums.includes(id)) {
        res.status(HttpStatus.CREATED).json(album);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Album not add`);
      }
    }
  }
  @Post('artist/:id')
  async addArtist(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    const artist = await this.favsService.findArtist(id);
    if (artist === null) {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .send(`Artist ${id} not found`);
    } else {
      const newFawArtist = await this.favsService.addArtist(id, userId);
      if (newFawArtist.artists.includes(id)) {
        res.status(HttpStatus.CREATED).json(artist);
      } else {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).send(`Artist not add`);
      }
    }
  }

  @Delete('track/:id')
  async removeTrack(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    try {
      await this.favsService.removeTrack(id, userId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Track ${id} was not in favorites`);
    }
  }
  @Delete('artist/:id')
  async removeArtist(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    try {
      await this.favsService.removeArtist(id, userId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res
        .status(HttpStatus.NOT_FOUND)
        .send(`Artist ${id} was not in favorites`);
    }
  }
  @Delete('album/:id')
  async removeAlbum(
    @Request() req,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: Response,
  ) {
    const { userId } = req.user;
    try {
      await this.favsService.removeAlbum(id, userId);
      res.status(HttpStatus.NO_CONTENT).send();
    } catch {
      res.status(HttpStatus.NOT_FOUND).send(`Album ${id} was not in favorites`);
    }
  }
}
