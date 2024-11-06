import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Movie } from './movies.model';
import { MoviesService } from './movies.service';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RegularUserGuard } from 'src/auth/guards/regularuser.guard';
import { CreateMovieDto } from 'src/common/dtos/create-movie.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @UseGuards(AdminGuard)
    @Get('fetch')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'This endpoint retrieves the films from the SWAPI public API. Auth token and Admin role is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Success',
        isArray: false,
    })
    async fetchMovies(): Promise<Movie[]> {
        return this.moviesService.fetch();
    }

    @Get()
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Auth token is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Success',
        isArray: false,
    })
    async getMovies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @UseGuards(RegularUserGuard)
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Auth token and Regular User role is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Success',
        isArray: false,
    })
    async getMovieDetails(@Param('id') id: string): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.findOneById(movieId);
    }

    @UseGuards(AdminGuard)
    @Post()
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Auth token and Admin role is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Created Succesfully',
        type: CreateMovieDto,
        isArray: false,
    })
    async createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(movieData);
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Auth token and Admin role is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Updated Succesfully',
        isArray: false,
    })
    async update(@Param('id') id: string, @Body() movieData: Partial<Movie>): Promise<Movie> {
        const movieId = parseInt(id);
        return this.moviesService.update(movieId, movieData);
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    @ApiBearerAuth()
    @ApiOperation({
        description: 'Auth token and Admin role is required to access this resource.',
    })
    @ApiCreatedResponse({
        description: 'Deleted Succesfully',
        isArray: false,
    })
    remove(@Param('id') id: string): Promise<string> {
        const movieId = parseInt(id);
        return this.moviesService.remove(movieId);
    }
}
