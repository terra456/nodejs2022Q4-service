class FavsDB {
  artists: string[];
  albums: string[];
  tracks: string[];

  constructor() {
    this.artists = [];
    this.albums = [];
    this.tracks = [];
  }

  addArtist(id: string) {
    const ind = this.artists.findIndex((el) => el === id);
    if (ind < 0) {
      this.artists.push(id);
    } else {
      throw new Error('Allready is in favorites');
    }
  }

  deleteArtist(id: string) {
    const ind = this.artists.findIndex((el) => el === id);
    if (ind < 0) {
      throw new Error('Not such artist in favs');
    } else {
      this.artists.splice(ind, 1);
    }
  }
  addAlbum(id: string) {
    const ind = this.albums.findIndex((el) => el === id);
    if (ind < 0) {
      this.albums.push(id);
    } else {
      throw new Error('Allready is in favorites');
    }
  }

  deleteAlbum(id: string) {
    const ind = this.albums.findIndex((el) => el === id);
    if (ind < 0) {
      throw new Error('Not such artist in favs');
    } else {
      this.albums.splice(ind, 1);
    }
  }
  addTrack(id: string) {
    const ind = this.tracks.findIndex((el) => el === id);
    if (ind < 0) {
      this.tracks.push(id);
    } else {
      throw new Error('Allready is in favorites');
    }
  }

  deleteTrack(id: string) {
    const ind = this.tracks.findIndex((el) => el === id);
    if (ind < 0) {
      throw new Error('Not such artist in favs');
    } else {
      this.tracks.splice(ind, 1);
    }
  }
}

export default FavsDB;
