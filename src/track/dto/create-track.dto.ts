import { IsDefined, IsInt, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsDefined()
  name: string;
  @IsUUID()
  artistId: string | null;
  @IsUUID()
  albumId: string | null;
  @IsInt()
  @IsDefined()
  duration: number;
}
