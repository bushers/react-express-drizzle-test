import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../main";
import type { User } from "../App";

const USER_QUERY_KEY = "users";
const API_ENDPOINT = "http://localhost:3005/users";
const API_ENDPOINT_WITH_ID = "http://localhost:3005/user/";

export const getUsersQuery = () =>
  useQuery<Array<User>>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => axios.get(API_ENDPOINT).then((res) => res.data.data),
  });

export const addUserMutation = () =>
  useMutation({
    mutationFn: (newUser: Omit<User, "id">) => {
      return axios.post(API_ENDPOINT, newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });

export const editUserMutation = () =>
  useMutation({
    mutationFn: (user: User) => {
      return axios.put(API_ENDPOINT_WITH_ID + user.id, {
        userName: user.userName,
        userCountry: user.userCountry,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });

export const deleteUserMutation = () =>
  useMutation({
    mutationFn: (id: number) => {
      return axios.delete(API_ENDPOINT_WITH_ID + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });
