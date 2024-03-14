import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { User } from './user.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    UsersService,
    {
      provide: 'USERS_REPOSITORY',
      useValue: User,
    },
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
