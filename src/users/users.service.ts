import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  async createUser(
    body: CreateUserDto,
  ): Promise<{ token: string; email: string; id: string }> {
    const user = await this.usersRepository.findOne({
      where: { email: body.email },
    });

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await this.usersRepository.create({
      email: body.email,
      password: hashedPassword,
    });

    const payload = { email: newUser.email, id: newUser.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('newUser', newUser, 'token', token);
    return {
      id: newUser.id,
      email: newUser.email,
      token,
    };
  }

  async getUser(@Param() id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new NotFoundException('user not found');
    }

    console.log(user);
    return user;
  }
}
