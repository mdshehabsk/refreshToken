import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {
    constructor(private homeService:HomeService){}
    @UseGuards(AuthGuard('jwt'))
    @Get('/')
    @HttpCode(HttpStatus.OK)
    getHome () {
        return this.homeService.getHome()
    }
}
