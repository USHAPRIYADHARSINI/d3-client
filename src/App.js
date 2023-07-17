import "./App.css";
import "./Comonents/style/BarChart.css";
import "./Comonents/style/Dashboard.css";
import ChartPage from "./Comonents/ChartPage";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./Comonents/Login";
import Signup from "./Comonents/Signup";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("Authorization");
    if (item) {
      setToken(item);
    } else return;
  }, [token]);

  const navigate = useNavigate();
  const [val, setVal] = useState("");
  const [filter, setFilter] = useState("");
  const value = [
    {
      val: "intensity",
      search: ["topic", "sector", "start_year"],
    },
    {
      val: "likelihood",
      search: ["topic", "sector", "start_year"],
    },
    {
      val: "relevance",
      search: ["topic", "sector", "start_year"],
    },
  ];

  const setValues = (v, s) => {
    console.log(v, s);
    setVal(v);
    setFilter(s);
    navigate("/chart");
  };
  const handleLogout = (e) => {
    setToken(null);
    localStorage.removeItem("Authorization");
    localStorage.clear();
  };

  return (
    <div className="App">
      {!token ? (
        <div className="homepage">
          <img
            src={
              "https://cdni.iconscout.com/illustration/premium/thumb/welcome-typography-with-business-people-characters-2710146-2263951.png"
            }
          />
          <div style={{color:"dodgerblue"}}>Login or Signup to view the dashboard</div>
          <p>Login with demo credentials provided in the login tab</p>
          <div className="log">
            <Login setToken={setToken} />
            <Signup />
          </div>
        </div>
      ) : (
        <>
          <div className="dheader">
            <h1>Dashboard</h1>
            {value.map((v, i) => (
              <div className="filterpage" key={i}>
                <h2 className="topic">
                  Find the {v.val} for each country based on:
                </h2>
                {v.search.map((s, j) => (
                  <button
                    className="dropbtn"
                    key={j}
                    onClick={() => setValues(v.val, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            ))}
            <button className="dropbtn" onClick={(e) => handleLogout(e)}>
              Logout
            </button>
          </div>

          <Routes>
            <Route
              path="/chart"
              element={
                <ChartPage
                  val={val}
                  setVal={setVal}
                  filter={filter}
                  setFilter={setFilter}
                />
              }
            />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
