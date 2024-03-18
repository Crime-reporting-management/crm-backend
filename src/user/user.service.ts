import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(userDto: UserDto) {
    console.log(userDto);
    const createdUser = await this.prisma.user.create({
      data: {
        user_id: userDto.user_id,
        fir_id: userDto.fir_id,
        fir_content: userDto.fir_content,
        first_name: userDto.first_name ?? '',
        last_name: userDto.last_name ?? '',
        mobile_no: userDto.mobile_no,
        email_id: userDto.email_id,
      },
    });

    return createdUser;
  }

  async updateUser(updateUserDto: UpdateUserDto, user_id: string) {
    console.log(updateUserDto);
    const createdUser = await this.prisma.user.update({
      where: { user_id: user_id },
      data: {
        fir_id: updateUserDto.fir_id,
        fir_content: updateUserDto.fir_content,
        first_name: updateUserDto.first_name,
        last_name: updateUserDto.last_name,
        mobile_no: updateUserDto.mobile_no,
        email_id: updateUserDto.email_id,
        status: updateUserDto.status,
      },
    });

    return createdUser;
  }

  async getUser(user_id: string) {
    const getUser = await this.prisma.user.findMany({
      where: { user_id: user_id },
    });
    return getUser;
  }
  async getAllUserById(user_id: string) {
    const getAllUser = await this.prisma.user.findMany({
      where: { user_id: user_id },
    });
    return getAllUser;
  }
  async deleteUser(user_id: string) {
    try {
      // Use Prisma to delete the user by ID
      const deletedUser = await this.prisma.user.delete({
        where: { user_id },
      });

      return deletedUser;
    } catch (error) {
      // Handle any errors that occur during the deletion
      throw new Error('Error deleting user');
    }
  }
}
