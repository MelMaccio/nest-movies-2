import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';
import { ApiExcludeEndpoint} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiExcludeEndpoint()
  create(@Body() userData): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get(':username')
  @ApiExcludeEndpoint()
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({ where: { username } });
  }

}
