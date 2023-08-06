import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import db from '../DB';
import type DB from '../DB';

@Injectable()
export class AlbumService {
  db: typeof DB;
  constructor() {
    this.db = db;
  }
  create(createAlbumDto: CreateAlbumDto) {
    return db.album.addAlbum(createAlbumDto);
  }

  findAll() {
    return db.album.getAllAlbums();
  }

  findOne(id: string) {
    return db.album.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return db.album.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    const del = db.album.deleteAlbum(id);
    if (del !== null) {
      db.track.tracks.forEach((track) => {
        if (track.albumId === id) {
          track.removeAlbumId();
        }
      });
      db.favs.deleteAlbum(id);
    }
    return del;
  }
}
