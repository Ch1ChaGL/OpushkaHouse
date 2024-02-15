import { MinLength, IsString, IsMobilePhone, Matches, IsNumber } from 'class-validator';

export class AuthDto {
  @IsMobilePhone('ru-RU')
  @Matches(/^\+7\d{10}$/, {
    message: 'Номер телефона должен начинаться с +7 и состоять из 11 цифр',
  })
  phone: string;

  @MinLength(5, { message: 'Пароль должен быть больше 5 символов' })
  @IsString()
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  roleId: number;
}
