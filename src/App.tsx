import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  userName: string;
  userCountry: string;
}

function App() {
  const [data, setData] = useState<Array<User>>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:3005/users");
        const data = await res.json();

        setData(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <div>
      <ul>
        {data.map((u) => (
          <li key={u.id}>{u.userName}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
