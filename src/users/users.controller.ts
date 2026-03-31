import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserdto: CreateUserDto, @User() user: IUser) {
    const newUser = await this.usersService.create(createUserdto, user);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  @ResponseMessage('Fetch user with paginate')
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }

  @Public()
  @ResponseMessage('Fetch user by Id')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ResponseMessage('Update a User')
  @Patch(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
    @Param('id') id: string,
  ) {
    const updatedUser = await this.usersService.update(updateUserDto, user, id);
    return updatedUser;
  }

  @ResponseMessage('Delete a User')
  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }
}
