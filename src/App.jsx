import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Settings from "./pages/Settings.jsx";
import SharedLayout from "./components/SharedLayout.jsx";
import Active from "./pages/Active.jsx";
import Draft from "./pages/Draft.jsx";
import Archived from "./pages/Archived.jsx";
import Login from "./pages/Login.jsx";
import NoteDetails from "./pages/NoteDetails.jsx"; // Add this import

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
          <Route path="/note/:id" element={<NoteDetails />} /> {/* Add this route */}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;