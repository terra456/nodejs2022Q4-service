import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import db from '../DB';
import type DB from '../DB';

@Injectable()
export class ArtistService {
  db: typeof DB;
  constructor() {
    this.db = db;
  }
  create(createArtistDto: CreateArtistDto) {
    return db.artist.addArtist(createArtistDto);
  }

  findAll() {
    return db.artist.getAllArtists();
  }

  findOne(id: string) {
    return db.artist.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return db.artist.updateArtist(id, updateArtistDto);
  }

  remove(id: string) {
    const delArtist = db.artist.deleteArtist(id);
    if (delArtist === 'deleted') {
      db.album.albums.forEach((el) => {
        if (el.artistId === id) {
          el.removeArtistId();
        }
      });
      db.track.tracks.forEach((track) => {
        if (track.artistId === id) {
          track.removeArtistId();
        }
      });
    }
    return delArtist;
  }
}
