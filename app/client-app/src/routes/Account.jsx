import { Route, Routes } from "react-router-dom";
import { Confirm } from "pages/account/Confirm";
import { ResendConfirm } from "pages/account/ResendConfirm";
import { NotFound } from "pages/error/NotFound";

export const Account = () => {
  return (
    <Routes>
      <Route path="confirm" element={<Confirm />} />
      <Route path="confirm/resend" element={<ResendConfirm />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
