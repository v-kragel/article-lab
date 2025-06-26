import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<></>}>
        <Route path="/home" element={<></>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
