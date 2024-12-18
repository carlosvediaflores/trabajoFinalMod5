import { Injectable, NotFoundException } from '@nestjs/common';
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

 async update(id: string, updateRoleDto: UpdateRoleDto) {
    const rol = await this.rolRepository.preload({
      id: id,
      ...updateRoleDto
    });

    if ( !rol ) throw new NotFoundException(`Rol with id: ${ id } not found`);

    try {
      await this.rolRepository.save( rol );
      return rol;
      
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }
  handleDBExceptions(error: any) {
    throw new Error('Method not implemented.');
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
