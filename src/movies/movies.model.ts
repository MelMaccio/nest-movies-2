import { Table, Column, Model, AutoIncrement, PrimaryKey } from 'sequelize-typescript';

@Table
export class Movie extends Model<Movie> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    title: string;

    @Column
    director: string;

    @Column
    releaseDate: string;

    @Column
    url: string;
}