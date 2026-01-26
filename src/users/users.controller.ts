import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Post('signUp')
  async postUser(@Body() createUserDto: CreateUserDto) {
    const token = await this.usersService.createUser(createUserDto);
    const user = await this.usersService.findUserById(createUserDto);

    return {
      token,
      lastMotivationId: user?.lastMotivationId
    };
  }

  @Post('login')
  async postLogin(
    @Body() loginUserDto: LoginUserDto
  ) {
    const token = await this.usersService.loginUser(loginUserDto);
    const user = await this.usersService.findUserById(loginUserDto);

    return {
      token,
      lastMotivationId: user?.lastMotivationId,
      user
    };
  }
}
