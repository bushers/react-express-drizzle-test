import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import "./App.css";
import { queryClient } from "./main";

interface User {
  id: number;
  userName: string;
  userCountry: string;
}

const USER_QUERY_KEY = "users";
const API_ENDPOINT = "http://localhost:3005/users";

function App() {
  const { isPending, error, data, isFetching } = useQuery<Array<User>>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => axios.get(API_ENDPOINT).then((res) => res.data.data),
  });

  const mutation = useMutation({
    mutationFn: (newUser: Omit<User, "id">) => {
      return axios.post(API_ENDPOINT, newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <button
        onClick={() =>
          mutation.mutate({ userName: "new", userCountry: "Canada" })
        }
      >
        Add User
      </button>
      <div>{isFetching ? "Updating..." : ""}</div>
      <ul style={{ minWidth: 300 }}>
        {data.map((u) => (
          <li
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginRight: 10 }}>{u.id}</span>
            <span>{u.userName}</span>
            <span style={{ marginLeft: "auto" }}>{u.userCountry}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
