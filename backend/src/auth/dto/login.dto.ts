import { MinLength, IsString, IsMobilePhone, Matches, IsNumber } from 'class-validator';

export class LoginDto {
  @IsMobilePhone('ru-RU')
  @Matches(/^\+7\d{10}$/, {
    message: 'Номер телефона должен начинаться с +7 и состоять из 11 цифр',
  })
  phone: string;

  @MinLength(6, { message: 'Пароль должен быть больше 6 символов' })
  @IsString()
  password: string;

}
