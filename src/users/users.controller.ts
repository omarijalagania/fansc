import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  insertUser(@Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }

  @Get('get-user/:id')
  getUser(@Param() { id }: { id: string }) {
    return this.usersService.getUser(id);
  }
}
