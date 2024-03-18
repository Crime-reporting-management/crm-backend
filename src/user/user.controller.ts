import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly usersService: UserService,
    private prisma: PrismaService,
  ) {}

  @Post('create')
  async createUser(@Res() response: Response, @Body() userDto: UserDto) {
    try {
      const userdata = await this.usersService.createUser(userDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        userdata,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error User not created',
        error: 'Bad Request',
      });
    }
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') user_id: string,
    @Res() response: Response,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const userdata = await this.usersService.updateUser(
        updateUserDto,
        user_id,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been updated successfully',
        userdata,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error User not updated',
        error: 'Bad Request',
      });
    }
  }

  @Get('get/:id')
  async getUser(@Param('id') user_id: string, @Res() response: Response) {
    try {
      const userdata = await this.usersService.getUser(user_id);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been get successfully',
        userdata,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error User not found',
        error: 'Bad Request',
      });
    }
  }
  @Get('getalluser/:ap-southeast-1:adb2fdbd-3e78-4ece-b042-1ca0f4c3090f')
  async getAllUserById(
    @Param('id') user_id: string,
    @Res() response: Response,
  ) {
    try {
      const userdata = await this.usersService.getAllUserById(user_id);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been get successfully',
        userdata,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error User not found',
        error: 'Bad Request',
      });
    }
  }
  @Delete('delete/:id')
  async deleteUser(@Param('id') user_id: string, @Res() response: Response) {
    try {
      // Call your service method to delete the user by ID
      await this.usersService.deleteUser(user_id);
      return response.status(HttpStatus.OK).json({
        message: 'User has been deleted successfully',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error deleting user',
        error: 'Bad Request',
      });
    }
  }
}
