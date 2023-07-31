import { randomUUID } from 'crypto';
import { CreateArtistDto } from '../artist/dto/create-artist.dto';
import { ArtistI } from 'src/types';
import { UpdateArtistDto } from '../artist/dto/update-artist.dto';

class ArtistRecord implements ArtistI {
  id: string; // uuid v4
  name: string;
  grammy: boolean;

  constructor(createArtistDto: CreateArtistDto) {
    this.id = randomUUID();
    this.name = createArtistDto.name;
    this.grammy = createArtistDto.grammy;
  }

  getArtist(): ArtistI {
    return {
      id: this.id,
      name: this.name,
      grammy: this.grammy,
    };
  }

  updateArtistData(updateArtistDto: UpdateArtistDto): ArtistI {
    this.name = updateArtistDto.name;
    this.grammy = updateArtistDto.grammy;
    return this.getArtist();
  }
}

class ArtistDB {
  artists: ArtistRecord[];
  constructor() {
    this.artists = [];
  }

  public addArtist(createArtistDto: CreateArtistDto) {
    const artist = new ArtistRecord(createArtistDto);
    this.artists.push(artist);
    return artist.getArtist();
  }

  public updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    const ind = this.artists.findIndex((artist) => artist.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.artists[ind].updateArtistData(updateArtistDto);
      return this.artists[ind].getArtist();
    }
  }

  public deleteArtist(id: string) {
    const ind = this.artists.findIndex((artist) => artist.id === id);
    if (ind < 0) {
      return null;
    } else {
      this.artists.splice(ind, 1);
      return 'deleted';
    }
  }

  public getArtistById(id: string) {
    const ind = this.artists.findIndex((artist) => artist.id === id);
    if (ind < 0) {
      return null;
    } else {
      return this.artists[ind].getArtist();
    }
  }

  public getAllArtists() {
    return this.artists.map((artist) => artist.getArtist());
  }

  public getAllArtistsIds(): string[] {
    return this.artists.map(({ id }) => id);
  }
}

export default ArtistDB;
