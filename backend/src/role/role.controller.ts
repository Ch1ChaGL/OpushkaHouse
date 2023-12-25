import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {
    // В данный момент не имеет смысла
  }
}
