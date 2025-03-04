import { IsOptional, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  chatId: string;

  @IsString()
  @IsOptional()
  chatName?: string;

  @IsString()
  userId: string;

  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  userImgUrl?: string;

  @IsString()
  message: string;
}
