import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
      ) {}
    
      async create(userData): Promise<User> {
        const user = new User(userData);
        return await user.save();
      }
    
      async findAll(): Promise<User[]> {
        return this.userModel.findAll();
      }
    
      async findOne(query: number | { where: { username: string } }): Promise<User | null> {
        if (typeof query === 'number') {
          return this.userModel.findOne({ where: { id: query } });
        }
        return this.userModel.findOne(query);
      }
    
      async update(id: number, userData): Promise<[number, User[]]> {
        const [affectedCount, affectedRows] = await this.userModel.update(userData, {
          where: { id },
          returning: true, 
        });
        return [affectedCount, affectedRows as User[]];
      }
    
      async remove(id: number): Promise<number> {
        return this.userModel.destroy({ where: { id } });
      }
}
