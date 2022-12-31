import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {SigninDto, SignupDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt/dist';
import { BadRequestException, ForbiddenException } from '@nestjs/common/exceptions';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signupLocal(dto: SignupDto): Promise<any> {
    const isExist = await this.prisma.user.findUnique({
      where:{
        email:dto.email
      }
    })
    if(isExist) throw new BadRequestException({
      error:'validation valid',
      message:'email is already exist',
      path:'email'
    }) 
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    const token = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHast(newUser.id, token.refresh_token);
    return {
      message:'User create successfull'
    }
  }

  async signinLocal(dto: SigninDto): Promise<Tokens> {

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException({
      message:'user not found',
      path:'email'
    });
    const isMatch = await bcrypt.compare(dto.password, user.hash);
    if (!isMatch) throw new ForbiddenException({
      message:'password doesnt match',
      path:'password'
    });
    const token = await this.getTokens(user.id, user.email);
    await this.updateRtHast(user.id, token.refresh_token);
    return token;
  }
  async logout(userId: number) {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return 'logout sucessfull'
  }

  //all utility function 
  async refreshToken(userId:number,rt:string) {
    const user = await this.prisma.user.findUnique({
        where:{
            id:userId
        }
    })
    if(!user) throw new ForbiddenException('no user')
    const rtMatches = await bcrypt.compare(rt,user.hashedRt)
    if(!rtMatches) throw new ForbiddenException('access denied')
    const token = await this.getTokens(user.id, user.email);
    await this.updateRtHast(user.id, token.refresh_token);
    return token;
  }
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async updateRtHast(userId: number, rt: string) {
    const hast = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hast,
      },
    });
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 1,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
