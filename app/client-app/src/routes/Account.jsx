import { Route, Routes } from "react-router-dom";
import { Confirm } from "pages/account/Confirm";
import { ResendConfirm } from "pages/account/ResendConfirm";
import { NotFound } from "pages/error/NotFound";
import { ResendPasswordReset } from "pages/account/ResendPasswordReset";
import { ResetPassword } from "pages/account/ResetPassword";
import { RequestDelete } from "pages/account/RequestDelete";
import { ConfirmDelete } from "pages/account/ConfirmDelete";

export const Account = () => {
  return (
    <Routes>
      <Route path="confirm" element={<Confirm />} />
      <Route path="confirm/delete" element={<ConfirmDelete />} />
      <Route path="confirm/resend" element={<ResendConfirm />} />
      <Route path="password/resend" element={<ResendPasswordReset />} />
      <Route path="password" element={<ResetPassword />} />
      <Route path="delete" element={<RequestDelete />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
