import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import db from '../DB';
import type DB from '../DB';

@Injectable()
export class TrackService {
  db: typeof DB;
  constructor() {
    this.db = db;
  }
  create(createTrackDto: CreateTrackDto) {
    return db.track.addTrack(createTrackDto);
  }

  findAll() {
    return db.track.getAllTracks();
  }

  findOne(id: string) {
    return db.track.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return db.track.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    const del = db.track.deleteTrack(id);
    return del;
  }
}
