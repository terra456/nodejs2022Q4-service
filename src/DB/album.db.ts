import { randomUUID } from "crypto";
import { CreateAlbumDto } from "../album/dto/create-album.dto";
import { AlbumI } from "src/types";
import { UpdateAlbumDto } from "../album/dto/update-album.dto";

class AlbumRecord implements AlbumI {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;

  constructor(createAlbumDto: CreateAlbumDto) {
    this.id = randomUUID();
    this.name = createAlbumDto.name;
    this.year = createAlbumDto.year;
    this.artistId = createAlbumDto.artistId;
  }

  getAlbum(): AlbumI {
    return {
      id: this.id, 
      name: this.name,
      year: this.year,
      artistId: this.artistId,
    }
  }

  updateAlbumData(updateAlbumDto: UpdateAlbumDto): AlbumI {
    this.name = updateAlbumDto.name;
    this.year = updateAlbumDto.year;
    this.artistId = updateAlbumDto.artistId;
    return this.getAlbum();
  }
}

class AlbumDB {
  albums: AlbumRecord[];
  constructor() {
    this.albums = [];
  }

  public addAlbum(createAlbumDto: CreateAlbumDto) {
    const album = new AlbumRecord(createAlbumDto);
    this.albums.push(album);
    return album.getAlbum();
  }

  public updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const ind = this.albums.findIndex((album) => album.id === id);
    if (ind < 0) {
      throw new Error(`Album ${id} not found`);
    } else {
      this.albums[ind].updateAlbumData(updateAlbumDto);
    }
    return this.albums[ind];
  }

  public deleteAlbum(id: string) {
    const ind = this.albums.findIndex((album) => album.id === id);
    if (ind < 0) {
      throw new Error(`Album ${id} not found`);
    } else {
      this.albums.splice(ind, 1);
    }
  }

  public getAlbumById(id: string) {
    const ind = this.albums.findIndex((album) => album.id === id);
    if (ind < 0) {
      throw new Error(`Album ${id} not found`);
    } else {
      return this.albums[ind];
    }
  }

  public getAllAlbums() {
    return this.albums;
  }

  public getAllAlbumsIds(): string[] {
    return this.albums.map(({ id }) => id);
  }
}

export default AlbumDB;