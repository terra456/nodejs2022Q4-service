import { randomUUID } from 'crypto';
import { CreateTrackDto } from '../track/dto/create-track.dto';
import { TrackI } from 'src/types';
import { UpdateTrackDto } from '../track/dto/update-track.dto';

class TrackRecord implements TrackI {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number

  constructor(createTrackDto: CreateTrackDto) {
    this.id = randomUUID();
    this.name = createTrackDto.name;
    this.artistId = createTrackDto.artistId;
    this.albumId = createTrackDto.albumId;
    this.duration = createTrackDto.duration;
  }

  getTrack() {
    return {
      id: this.id,
      name: this.name,
      artistId: this.artistId,
      albumId: this.albumId,
      duration: this.duration,
    };
  }

  updateTrackData(updateTrackDto: UpdateTrackDto): TrackI {
    this.name = updateTrackDto.name;
    this.artistId = updateTrackDto.artistId;
    this.albumId = updateTrackDto.albumId;
    this.duration = updateTrackDto.duration;
    return this.getTrack();
  }

  removeAlbumId() {
    this.albumId = null;
  }

  removeArtistId() {
    this.artistId = null;
  }
}

class TrackDB {
  tracks: TrackRecord[];
  constructor() {
    this.tracks = [];
  }

  public addTrack(createTrackDto: CreateTrackDto) {
    const track = new TrackRecord(createTrackDto);
    console.log(createTrackDto);
    this.tracks.push(track);
    return track.getTrack();
  }

  public updateTrack(id: string, updateTrackDto: UpdateTrackDto) {
    const ind = this.tracks.findIndex((track) => track.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.tracks[ind].updateTrackData(updateTrackDto);
      return this.tracks[ind].getTrack();
    }
  }

  public deleteTrack(id: string) {
    const ind = this.tracks.findIndex((track) => track.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.tracks.splice(ind, 1);
      return 'deleted';
    }
  }

  public getTrackById(id: string) {
    const ind = this.tracks.findIndex((track) => track.id === id);
    if (ind < 0) {
      return null;
    } else {
      return this.tracks[ind].getTrack();
    }
  }

  public getAllTracks() {
    return this.tracks.map((el) => el.getTrack());
  }

  public getAllTracksIds(): string[] {
    return this.tracks.map(({ id }) => id);
  }
}

export default TrackDB;
