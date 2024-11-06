import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(username: string, password: string, isAdmin: boolean) {
    try {

      const hashedPassword = await bcrypt.hash(password, 10);
      return await this.usersService.create({
        username,
        password: hashedPassword,
        isAdmin,
      });

    } catch (error) {

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new HttpException(
          'Username already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    if (!user) {
      throw new HttpException(
        'Invalid username or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id, isAdmin: user.isAdmin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
