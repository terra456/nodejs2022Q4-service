import { IsUUID } from 'class-validator';

export class UuidValidator {
  @IsUUID()
  id: string;
}
