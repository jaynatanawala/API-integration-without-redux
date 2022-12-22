import Tutorial from "./pages/Tutorial";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SingleTutorial from "./pages/SingleTutorial";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Tutorial />} exact></Route>
          <Route path="/:id" element={<SingleTutorial />} exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
