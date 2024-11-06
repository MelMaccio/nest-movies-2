import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from './users.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() userData): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':username')
  findOne(@Param('username') username: string): Promise<User> {
    return this.usersService.findOne({ where: { username } });
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() userData): Promise<[number, User[]]> {
    return this.usersService.update(Number(id), userData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<number> {
    return this.usersService.remove(Number(id));
  }
}
