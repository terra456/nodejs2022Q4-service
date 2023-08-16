export interface UserI {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: string; // timestamp of creation
  updatedAt: string; // timestamp of last update
}

export interface UserSequreI {
  id: string; // uuid v4
  login: string;
  version: number; // integer number, increments on update
  createdAt: number | Date; // timestamp of creation
  updatedAt: number | Date; // timestamp of last update
}

export interface ArtistI {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface TrackI {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface AlbumI {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export interface FavoritesI {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export interface FavoritesResponseI {
  artists: ArtistI[];
  albums: AlbumI[];
  tracks: TrackI[];
}
