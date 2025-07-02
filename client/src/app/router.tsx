import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "@/widgets/layout";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<></>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
