import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { firstValueFrom } from 'rxjs';
import { Movie } from './movies.model';
import { CreateMovieDto } from 'src/common/dtos/create-movie.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

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
            throw new NotFoundException('Something went wrong');
        }
        if (!movies.length) {
            throw new HttpException(
                'There are no movies in the record',
                HttpStatus.CONFLICT,
              );
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

    async remove(id: number): Promise<string> {
        
        const result = await this.movieModel.destroy({ where: { id } });
        if(!result){
            throw new NotFoundException('Something went wrong');
        }
        return 'Success! Number of rows affected: ' + result;
    }
}
