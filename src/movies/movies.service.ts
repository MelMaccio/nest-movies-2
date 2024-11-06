import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { firstValueFrom } from 'rxjs';
import { Movie } from './movies.model';
import { CreateMovieDto } from 'src/common/dtos/create-movie.dto';

@Injectable()
export class MoviesService {
    constructor(
        @InjectModel(Movie)
        private readonly movieModel: typeof Movie,
        private readonly httpService: HttpService
    ) { }

    async fetch(): Promise<Movie[]> {
        const response = await firstValueFrom(this.httpService.get('https://swapi.dev/api/films'));
        const moviesRaw = response.data.results;
        const moviesFiltered = moviesRaw.map(movie => ({
            //id: movie.episode_id,
            title: movie.title,
            director: movie.director,
            releaseDate: movie.release_date,
            url: movie.url,
        }));
        const createdMovies = await this.movieModel.bulkCreate(moviesFiltered, { returning: true });
        if (!createdMovies) {
            throw new NotFoundException('something went wrong');
        }
        return createdMovies;
    }

    async findAll(): Promise<Movie[]> {
        const movies = await this.movieModel.findAll();
        if (!movies) {
            throw new NotFoundException('Movies not found');
        }
        return movies;
    }

    async findOneById(id: number): Promise<Movie> {
        const movie = await this.movieModel.findByPk(id);
        if (!movie) {
            throw new NotFoundException('Movie not found');
        }
        return movie;
    }

    async create(movie: CreateMovieDto): Promise<Movie> {
        const result = await this.movieModel.create(movie);
        if (!result) {
            throw new NotFoundException('something went wrong');
        }
        return result;
    }

    async update(id: number, movieData: Partial<Movie>): Promise<Movie> {
        await this.movieModel.update(movieData, {
            where: { id },
        });
        const updatedMovie = await this.movieModel.findOne({ where: { id } });
        if (!updatedMovie) {
            throw new NotFoundException('Movie not found');
        }
        return updatedMovie;
    }

    async remove(id: number): Promise<number> {
        return this.movieModel.destroy({ where: { id } });
    }
}
