import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateResumeDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  company: number;

  @IsNotEmpty()
  jobId: string;
}

export class CreateUserCvDto {
  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  @IsMongoId()
  company: number;

  @IsNotEmpty()
  @IsMongoId()
  jobId: string;
}
