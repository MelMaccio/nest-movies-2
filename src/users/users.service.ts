import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
      ) {}
    
      async create(userData: Partial<User>): Promise<User> {
        const user = this.userModel.create(userData);
        return user;
      }

      async findOne(query: number | { where: { username: string } }): Promise<User | null> {
        if (typeof query === 'number') {
          return this.userModel.findOne({ where: { id: query } });
        }
        return this.userModel.findOne(query);
      }

}
