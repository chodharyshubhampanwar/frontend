import { useQuery, useMutation, useQueryClient } from "react-query";
import { userService } from "../services/userService";
import { User } from "../types/auth";

export const useUser = (userId: string | null) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["user", userId],
    queryFn: () => (userId ? userService.getUser(userId) : Promise.resolve(null)),
    enabled: !!userId,
  });

  const createUser = useMutation({
    mutationFn: userService.createUser,
    onSuccess: (newUser) => {
      queryClient.setQueryData(["user", newUser.uid], newUser);
    },
  });

  return {
    user,
    isLoading,
    createUser,
  };
};
