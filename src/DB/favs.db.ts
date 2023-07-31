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
      return 'created';
    } else {
      return null;
    }
  }

  deleteArtist(id: string) {
    const ind = this.artists.findIndex((el) => el === id);
    if (ind < 0) {
      return null;
    } else {
      this.artists.splice(ind, 1);
      return 'deleted';
    }
  }
  addAlbum(id: string) {
    const ind = this.albums.findIndex((el) => el === id);
    if (ind < 0) {
      this.albums.push(id);
      return 'created';
    } else {
      return null;
    }
  }

  deleteAlbum(id: string) {
    const ind = this.albums.findIndex((el) => el === id);
    if (ind < 0) {
      return null;
    } else {
      this.albums.splice(ind, 1);
      return 'deleted';
    }
  }
  addTrack(id: string) {
    const ind = this.tracks.findIndex((el) => el === id);
    if (ind < 0) {
      this.tracks.push(id);
      return 'created';
    } else {
      return null;
    }
  }

  deleteTrack(id: string) {
    const ind = this.tracks.findIndex((el) => el === id);
    if (ind < 0) {
      return null;
    } else {
      this.tracks.splice(ind, 1);
      return 'deleted';
    }
  }
}

export default FavsDB;
