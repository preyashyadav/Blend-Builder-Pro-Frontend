import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Layout from "./pages/Layout";
import Home from "./pages/Home";
import FeatureSelection from "./pages/FeatureSelection";
import BoundSelection from "./pages/BoundSelection";
import DesiredOutputs from "./pages/DesiredOutput";
import Optimize from "./pages/Optimize";
import NoPage from "./pages/NoPage";
import DataExplore from "./pages/DataExplore";

import Sidebar from "./components/Sidebar";
import "./index.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Sidebar className="width-20" />
        <Routes>
          {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Home className="width-80" />} />
          <Route
            path="featureSelection"
            element={<FeatureSelection className="width-80" />}
          />
          <Route path="BoundSelection" element={<BoundSelection />} />
          <Route path="DesiredOutputs" element={<DesiredOutputs />} />
          <Route path="Optimize" element={<Optimize />} />
          <Route
            path="data_explore"
            element={<DataExplore className="width-80" />}
          />
          <Route path="*" element={<NoPage />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
