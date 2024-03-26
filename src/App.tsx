import {
  addUserMutation,
  deleteUserMutation,
  editUserMutation,
  getUsersQuery,
} from "./users/dataQueries";
import "./App.css";

export interface User {
  id: number;
  userName: string;
  userCountry: string;
}

function App() {
  const { isPending, error, data, isFetching } = getUsersQuery();
  const addUser = addUserMutation();
  const editUser = editUserMutation();
  const deleteUser = deleteUserMutation();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <button
        onClick={() =>
          addUser.mutate({ userName: "new", userCountry: "Canada" })
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

            <button
              onClick={() =>
                editUser.mutate({
                  id: u.id,
                  userCountry: "New Zealand",
                  userName: "Edited Name",
                })
              }
            >
              Edit
            </button>
            <button onClick={() => deleteUser.mutate(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
