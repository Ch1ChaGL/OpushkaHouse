import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UserService } from '../../services/user/user.service';
import { IRegisterData } from '../../store/user/user.interface';

export const useUser = (
  onErrorCallback?: (error: any) => void,
  onSuccessCallback?: () => void,
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: IRegisterData) => UserService.registrationUser(data),
    onSuccess: () => {
      onSuccessCallback && onSuccessCallback();
      queryClient.invalidateQueries({
        queryKey: ['get users'],
      });
    },
    onError: (error: any) => {
      console.error('An error occurred while deleting user:', error);
      if (onErrorCallback) {
        onErrorCallback(error.response.data); // Вызываем функцию обратного вызова с переданной ошибкой
      }
    },
  });

  return mutation;
};

export const useUserDelete = (onErrorCallback?: (error: any) => void) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (userId: number) => UserService.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get users'],
      });
    },
    onError: (error: any) => {
      console.error('An error occurred while deleting user:', error);
      if (onErrorCallback) {
        onErrorCallback(error); // Вызываем функцию обратного вызова с переданной ошибкой
      }
    },
  });

  return mutation;
};
