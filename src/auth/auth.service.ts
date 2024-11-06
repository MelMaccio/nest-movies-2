import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(username: string, password: string, isAdmin: boolean) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.create({
      username,
      password: hashedPassword,
      isAdmin
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
