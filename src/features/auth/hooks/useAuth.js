// src/hooks/useAuth.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

export const useRegister = () =>
  useMutation({
    mutationFn: authApi.register,
  });

export const useLogin = () =>
  useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem("access_token", data.token);
    },
  });

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: authApi.getProfile,
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authApi.updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });
};
