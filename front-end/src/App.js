import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import Welcome from "./components/Welcome";
import Board from "./components/Board";
import { useAuth } from "@clerk/clerk-react";

function App() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Board nav="tasks" />} />
          <Route path="/statistics/:userId" element={<Board nav="stats" />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </div>
    );
  }
}

export default App;
