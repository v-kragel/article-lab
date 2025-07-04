import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FieldsPage } from "@/pages/fields";
import { HomePage } from "@/pages/home";
import { TemplatesPage } from "@/pages/templates";
import { navigationMap } from "@/shared/model";
import { Layout } from "@/widgets/layout";

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path={navigationMap.home} element={<HomePage />} />
        <Route path={navigationMap.fields} element={<FieldsPage />} />
        <Route path={navigationMap.templates} element={<TemplatesPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
