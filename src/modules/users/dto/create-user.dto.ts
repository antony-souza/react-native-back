import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  name: string;

  @IsOptional()
  imgUrl?: Express.Multer.File;

  @IsString()
  email: string;

  @IsString()
  @IsString()
  password: string;

  @IsString()
  @IsOptional()
  group?: string;
}
