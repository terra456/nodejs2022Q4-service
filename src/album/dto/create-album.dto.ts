import { IsDefined, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsNumber()
  @IsDefined()
  year: number;
  @IsUUID()
  artistId?: string | null;
}
