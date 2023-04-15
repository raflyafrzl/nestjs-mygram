import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsUrl,
} from 'class-validator';

export class UserDTO {
  @IsNotEmpty()
  full_name: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsUrl()
  profile_img_url: string;
  @IsNumber()
  age: number;
  @IsPhoneNumber()
  phone_number: string;
}
