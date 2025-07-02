import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomePage } from "@/pages/home";
import { navigationMap } from "@/shared/model";
import { Layout } from "@/widgets/layout";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path={navigationMap.home} element={<HomePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
