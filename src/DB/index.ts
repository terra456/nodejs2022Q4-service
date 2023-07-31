import AlbumDB from './album.db';
import ArtistDB from './artist.db';
import FavsDB from './favs.db';
import TracksDB from './track.db';
import UsersDB from './user.db';

class DB {
  user: UsersDB;
  artist: ArtistDB;
  album: AlbumDB;
  track: TracksDB;
  favs: FavsDB;

  constructor() {
    this.user = new UsersDB();
    this.artist = new ArtistDB();
    this.album = new AlbumDB();
    this.track = new TracksDB();
    this.favs = new FavsDB();

    const artist1 = this.artist.addArtist({ name: 'Artist1', grammy: true });
    const album1 = this.album.addAlbum({
      name: 'Album1',
      year: 1984,
      artistId: artist1.id,
    });
    const track1 = this.track.addTrack({
      name: 'Track1',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 54,
    });
    const track2 = this.track.addTrack({
      name: 'Track2',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 54,
    });
    const track3 = this.track.addTrack({
      name: 'Track3',
      artistId: artist1.id,
      albumId: album1.id,
      duration: 54,
    });
    this.favs.addTrack(track2.id);
    this.favs.addAlbum(album1.id);
  }

  addArtistInFavs(id: string) {
    const ind = this.artist.getAllArtistsIds().findIndex((el) => el === id);
    if (ind >= 0) {
      this.favs.addArtist(id);
    } else {
      throw new Error('No such artist');
    }
  }
  addAlbumInFavs(id: string) {
    const ind = this.album.getAllAlbumsIds().findIndex((el) => el === id);
    if (ind >= 0) {
      this.favs.addAlbum(id);
    } else {
      throw new Error('No such album');
    }
  }
  addTrackInFavs(id: string) {
    const ind = this.track.getAllTracksIds().findIndex((el) => el === id);
    if (ind >= 0) {
      this.favs.addTrack(id);
    } else {
      throw new Error('No such track');
    }
  }
}

export default new DB();
