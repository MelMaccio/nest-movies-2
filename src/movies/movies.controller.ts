import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RegularUserGuard } from 'src/auth/guards/regularuser.guard';

@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @UseGuards(AdminGuard)
    @Get('fetch')
    async fetchMovies(): Promise<Movie[]> {
        return this.moviesService.fetch();
    }

    @Get()
    async getMovies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @UseGuards(RegularUserGuard)
    @Get(':id')
    async getMovieDetails(@Param('id') id: string): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.findOneById(movieId);
    }

    @UseGuards(AdminGuard)
    @Post()
    async createMovie(@Body() userData): Promise<Movie> {
        return this.moviesService.create(userData);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() movieData: Partial<Movie>): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.update(movieId, movieData);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<number> {
        const movieId = parseInt(id);
        return this.moviesService.remove(movieId);
    }
}
