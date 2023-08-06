import { Injectable } from '@nestjs/common';
import db from '../DB';
import type DB from '../DB';

@Injectable()
export class FavsService {
  db: typeof DB;
  constructor() {
    this.db = db;
  }

  findAll() {
    return db.getAllFavorites();
  }

  findTrack(id: string) {
    return db.track.getTrackById(id);
  }
  findAlbum(id: string) {
    return db.album.getAlbumById(id);
  }
  findArtist(id: string) {
    return db.artist.getArtistById(id);
  }

  addTrack(id: string) {
    return db.favs.addTrack(id);
  }
  addAlbum(id: string) {
    return db.favs.addAlbum(id);
  }
  addArtist(id: string) {
    return db.favs.addArtist(id);
  }

  removeTrack(id: string) {
    return db.favs.deleteTrack(id);
  }
  removeArtist(id: string) {
    return db.favs.deleteArtist(id);
  }
  removeAlbum(id: string) {
    return db.favs.deleteAlbum(id);
  }
}
