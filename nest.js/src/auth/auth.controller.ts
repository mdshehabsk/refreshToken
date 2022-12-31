import { Controller,Post ,Body, UsePipes, ValidationPipe} from '@nestjs/common';
import { Get, HttpCode, Req, UseGuards } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { JoiValidationPipe } from './joi.validation.pipe';
import { AuthService } from './auth.service';
import { SigninDto,SignupDto } from './dto';
import { Tokens } from './types';
import { SignupSchema } from './validation/signup.schema';
import { SigninSchema } from './validation/signin.schema';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService) {}
    @Post('local/signup')
    @HttpCode(HttpStatus.CREATED)
    signupLocal (@Body(new JoiValidationPipe(SignupSchema)) dto:SignupDto ) : Promise<Tokens> {
        return this.authService.signupLocal(dto)
    }
    @Post('local/signin')
    @HttpCode(HttpStatus.OK)
    signinLocal (@Body(new JoiValidationPipe(SigninSchema)) dto:SigninDto ) {
        return this.authService.signinLocal(dto)
    }
    @UseGuards(AuthGuard('jwt'))
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout (@Req() req:Request ) {
        const user = req.user
        return this.authService.logout(user['sub'])
    }
    @UseGuards(AuthGuard('jwt-refresh'))
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken (@Req() req : Request ) {
        const user = req.user
        return this.authService.refreshToken(user['sub'],user['refreshToken'])
    }
    @Post('/local')
    getlocal(){
        return 'nice'
    }
}
