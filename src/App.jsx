import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Settings from "./pages/Settings.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import Active from "./pages/Active.jsx";
import Draft from "./pages/Draft.jsx";
import Archived from "./pages/Archived.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<SharedLayout />}>
          <Route exact path="/" element={<Index />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/active" element={<Active />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/archived" element={<Archived />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;