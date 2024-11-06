import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  releaseDate: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}