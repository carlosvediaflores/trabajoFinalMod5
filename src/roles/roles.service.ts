import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly rolRepository: Repository<Role>,
  ){}

  createRol(createRoleDto: CreateRoleDto) {
    const role = this.rolRepository.create(createRoleDto);
    return this.rolRepository.save(role);

  }

  findAll() {
    return this.rolRepository.find({})
  }

  async findOne(id: string) {
    let roles = await this.rolRepository.findOneBy({ id: id });
    return roles;
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
