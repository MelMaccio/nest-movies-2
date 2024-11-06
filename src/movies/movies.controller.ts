import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Get('fetch')
    async fetchMovies(): Promise<Movie[]> {
        return this.moviesService.fetch();
    }

    @Get()
    async getMovies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    async getMovieDetails(@Param('id') id: string): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.findOneById(movieId);
    }

    @Post()
    async createMovie(@Body() userData): Promise<Movie> {
        return this.moviesService.create(userData);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() movieData: Partial<Movie>): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.update(movieId, movieData);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        const movieId = parseInt(id);
        return this.moviesService.remove(movieId);
    }

}
