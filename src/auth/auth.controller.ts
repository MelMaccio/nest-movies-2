import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/users/users.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string }): Promise<User> {
    return this.authService.signup(body.username, body.password);
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return this.authService.login(user);
  }
}
