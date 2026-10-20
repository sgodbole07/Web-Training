import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUsers, createUser, deleteUser } from './api.js';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onMutate: async (userId) => {
  
      await queryClient.cancelQueries({ queryKey: ['users'] });


      const previousUsers = queryClient.getQueryData(['users']);


      queryClient.setQueryData(['users'], (old = []) =>
        old.filter((user) => user.id !== userId)
      );

      return { previousUsers };
    },
    onError: (error, userId, context) => {

      queryClient.setQueryData(['users'], context.previousUsers);
    },
    onSettled: () => {

      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}