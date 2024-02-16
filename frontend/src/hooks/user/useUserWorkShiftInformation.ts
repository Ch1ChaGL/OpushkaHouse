import { IUserState } from '../../store/user/user.interface';
import { UserRole } from '../../types/user/user.interaface';

export const useUserWorkShiftInformation = (
  user: IUserState | null,
): string | undefined => {
  let name: string | undefined;
  if (!user) return;
  switch (user.roleId) {
    case UserRole.ADMIN:
      name = `Администратор: ${user.firstName} ${user.lastName}`;
      break;
    case UserRole.Housemaid:
      name = `Горничная: ${user.firstName} ${user.lastName}`;
      break;
    case UserRole.Houseman:
      name = `Хаусмен: ${user.firstName} ${user.lastName}`;
      break;
    default:
      name = undefined;
      break;
  }
  return name;
};
