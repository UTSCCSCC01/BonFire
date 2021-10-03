import { User } from '.prisma/client';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';
import {
  RegistrationStatus,
  LoginInfoDto,
  LoginResultDto,
  TokenDto,
} from 'src/constants/auth';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /** Create user with user data
   * @param  {User} userData
   * @returns Promise
   */
  async register(userData: User): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: 'user registered',
    };

    try {
      await this.userService.create(userData);
    } catch (e) {
      status = {
        success: false,
        message: e.message,
      };

      if (e instanceof PrismaClientValidationError) {
        if ((e as any).code == 'P1012')
          status = {
            success: false,
            message: 'Missing required fields',
          };
        else if ((e as any).code == 'P2002')
          status = {
            success: false,
            message: 'Unique constraint violation',
          };
      }
    }

    return status;
  }


  /** Sign token for user
   * @param  {LoginInfoDto} userData
   * @returns Promise
   */
  async login(userData: LoginInfoDto): Promise<LoginResultDto> {
    const user = await this.getAuthenticatedUser(
      userData.email,
      userData.password,
    );
    const token = this._createToken(user);

    return {
      ...user,
      token,
    };
  }

  /** Ensure user is authenticated.
   * @param  {string} email
   * @param  {string} password
   */
  public async getAuthenticatedUser(email: string, password: string) {
    try {
      const user = await this.userService.find({ email });
      await this.verifyPassword(password, user.password);
      delete user.password;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** Compare passwords
   * @param  {string} plainTextPassword
   * @param  {string} hashedPassword
   */
  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /** Validates user is valid with token
   * @param  {JwtPayload} payload
   * @returns Promise
   */
  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userService.find({ email: payload.email });
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  /** creates token for user
   * @param  {User} {email}
   * @returns any
   */
  private _createToken({ email }: User): TokenDto {
    const expiresIn = process.env.EXPIRESIN;

    const user = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }
}
