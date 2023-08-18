import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FavsService {
  favsId: string;
  userId: string;
  constructor(private prisma: PrismaService) {}

  async start() {
    try {
      let user = await this.prisma.user.findFirst({
        where: { login: 'FavUser' },
      });
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            login: 'FavUser',
            password: 'ierjower',
            version: 1,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
          },
        });
        this.userId = user.id;
        const favs = await this.prisma.favorites.create({
          data: {
            userId: this.userId,
            artists: [],
            albums: [],
            tracks: [],
          },
        });
        this.favsId = favs.userId;
      } else {
        const favs = await this.prisma.favorites.findFirst({
          where: { userId: this.userId },
        });
        this.favsId = favs.userId;
      }
    } catch {
      return;
    }
  }

  async findAll(userId = this.userId) {
    return await this.prisma.favorites.findFirst({
      where: { userId },
    });
  }

  async findTrack(id: string) {
    return this.prisma.track.findUnique({
      where: { id },
    });
  }
  async findAlbum(id: string) {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }
  async findArtist(id: string) {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async addTrack(id: string, userId = this.userId) {
    return this.prisma.favorites.update({
      where: { userId },
      data: {
        tracks: { push: id },
      },
    });
  }
  async addAlbum(id: string, userId = this.userId) {
    return this.prisma.favorites.update({
      where: { userId },
      data: {
        albums: { push: id },
      },
    });
  }
  async addArtist(id: string, userId = this.userId) {
    return this.prisma.favorites.update({
      where: { userId },
      data: {
        artists: { push: id },
      },
    });
  }

  async removeTrack(idToDel: string, userId = this.userId) {
    const favs = await this.prisma.favorites.findFirst({
      where: { userId },
    });
    const ind = favs.tracks.findIndex((el) => el === idToDel);
    if (ind > 0) {
      favs.tracks.splice(ind, 1);
      const newTracsArr = favs.tracks;
      return this.prisma.favorites.update({
        where: { userId },
        data: {
          tracks: {
            set: newTracsArr,
          },
        },
      });
    } else {
      throw new Error();
    }
  }

  async removeAlbum(idToDel: string, userId = this.userId) {
    const favs = await this.prisma.favorites.findFirst({
      where: { userId },
    });
    const ind = favs.albums.findIndex((el) => el === idToDel);
    if (ind > 0) {
      favs.albums.splice(ind, 1);
      const newAlbumsArr = favs.albums;
      return this.prisma.favorites.update({
        where: { userId },
        data: {
          albums: {
            set: newAlbumsArr,
          },
        },
      });
    } else {
      throw new Error();
    }
  }

  async removeArtist(idToDel: string, userId = this.userId) {
    const favs = await this.prisma.favorites.findFirst({
      where: { userId },
    });
    const ind = favs.artists.findIndex((el) => el === idToDel);
    if (ind > 0) {
      favs.artists.splice(ind, 1);
      const newArtistsArr = favs.artists;
      return this.prisma.favorites.update({
        where: { userId },
        data: {
          artists: {
            set: newArtistsArr,
          },
        },
      });
    } else {
      throw new Error();
    }
  }
}
