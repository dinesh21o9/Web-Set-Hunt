import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Landing } from "./components/Landing";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Lobby } from "./components/Lobby";
import { Dashboard } from "./components/lobby/Dashboard";
import { Leaderboard } from "./components/lobby/Leaderboard";
import { Team } from "./components/lobby/Team";
import { Profile } from "./components/lobby/Profile";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function App() {
  const { isLoading } = useSelector((state) => state.loader);
  const { users } = useSelector((state) => state.authUser);
  const userName = localStorage.getItem("teamCode");

  // console.log(users);
  const time = new Date();
  let hours = 21 - time.getHours();
  let minutes;
  let seconds;
  if (time.getMinutes() > 50) {
    hours = hours - 1;
    minutes = 110 - time.getMinutes();
  } else {
    minutes = 50 - time.getMinutes();
  }
  if (time.getSeconds() > 0) {
    minutes = minutes - 1;
    seconds = 60 - time.getSeconds();
  }

  const initialTime = (hours * 60 + minutes) * 60 + seconds + 10;
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/lobby" element={<Lobby />}>
            <Route index element={<Dashboard initialTime={initialTime} />} />
            <Route path="leaderboard" element={<Leaderboard />} />
            <Route path="team" element={<Team />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </div>
  );
}

export default App;
