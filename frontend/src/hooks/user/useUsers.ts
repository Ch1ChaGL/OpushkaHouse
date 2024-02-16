import { useQuery } from '@tanstack/react-query';
import { UserService } from '../../services/user/user.service';

export const useUsers = () => {
  const { data, isError, isSuccess, isFetching } = useQuery({
    queryKey: ['get users'],
    initialData: [],
    queryFn: () => UserService.getUsers(),
  });

  return { data, isFetching, isError, isSuccess };
};
