import AlbumDB from './album.db';
import ArtistDB from './artist.db';
import FavsDB from './favs.db';
import TrackDB from './track.db';

class DB {
  artist: ArtistDB;
  album: AlbumDB;
  track: TrackDB;
  favs: FavsDB;

  constructor() {
    this.artist = new ArtistDB();
    this.album = new AlbumDB();
    this.track = new TrackDB();
    this.favs = new FavsDB();
  }
  getAllFavorites() {
    const favsTracks =
      this.favs.tracks.length > 0
        ? this.favs.tracks.map((id) => {
            return this.track.getTrackById(id);
          })
        : [];
    const favsArtists =
      this.favs.artists.length > 0
        ? this.favs.artists.map((id) => {
            return this.artist.getArtistById(id);
          })
        : [];
    const favsAlbums =
      this.favs.albums.length > 0
        ? this.favs.albums.map((id) => {
            return this.album.getAlbumById(id);
          })
        : [];
    return {
      artists: favsArtists,
      albums: favsAlbums,
      tracks: favsTracks,
    };
  }
}

export default new DB();
