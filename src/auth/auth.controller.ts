import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/common/dtos/create-user.dto';
import { ValidateUserDto } from 'src/common/dtos/validate-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Public()
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto): Promise<User> {
    return this.authService.signup(body.username, body.password, body.isAdmin);
  }

  @Post('login')
  async login(@Body() body: ValidateUserDto) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return this.authService.login(user);
  }
}
