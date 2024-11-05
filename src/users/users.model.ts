import { Table, Column, Model, AutoIncrement, PrimaryKey, Default, Unique } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Unique
    @Column
    username: string;

    @Column
    password: string;

    @Default(false)
    @Column
    isAdmin?: boolean;
}