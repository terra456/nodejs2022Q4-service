import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsInt, IsString, IsUUID } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  name: string;
  @IsUUID()
  artistId?: string | null;
  @IsUUID()
  albumId?: string | null;
  @IsInt()
  duration: number;
}
