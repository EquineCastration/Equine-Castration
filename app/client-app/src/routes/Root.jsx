import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { DefaultLayout } from "layouts/DefaultLayout";
import { ContentPage } from "pages/ContentPage";
import { NotFound } from "pages/error/NotFound";
import { Account } from "./Account";

const IndexRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/about", { replace: true });
  }, []);
  return null;
};

export const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<IndexRedirect />} />
        <Route path="about" element={<ContentPage contentKey={"about"} />} />
        <Route path="account/*" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
