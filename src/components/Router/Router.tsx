import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { Registration } from "../../pages/Registration/Registration";
import { MY_PROFILE, SIGN_IN, REGISTER } from "../../utils/routes";
import { useSelector } from "react-redux";
import { PendingView } from "../PendingView/PendingView";
import Modal from "../../components/common/Modal/Modal";
import { ONE_LOAD } from "../../utils/routes";
import LoadsView from "../../pages/Loads/LoadsView/LoadsView";
import SingleLoad from "../../pages/SingleLoadPage/SingleLoad/SingleLoad";
import { State } from "../../reduxFeatures/request/requestReducer";
import ColorDetails from "../ColorDetails";

const Router: React.FC = () => {
  const { message, status } = useSelector((state: State) => state.request);
  const user = useSelector((state: State) => state.auth.user);

  if (status === "error") {
    return (
      <main>
        <Routes>
          <Route path="/*" element={<Modal mes={message} />} />
        </Routes>
      </main>
    );
  }

  return (
    <main>
      <Suspense fallback={<PendingView />}>
        <Routes>
          <Route path="/col" element={<ColorDetails />} />

          {user ? (
            <>
              <Route path={MY_PROFILE} element={<ProfilePage />} />
              <Route path={"/loads/:status"} element={<LoadsView />} />
              <Route path={`${ONE_LOAD}/:id`} element={<SingleLoad />} />
              <Route path="/*" element={<Navigate replace to={MY_PROFILE} />} />
            </>
          ) : (
            <>
              <Route path={SIGN_IN} element={<LoginPage />} />
              <Route path={REGISTER} element={<Registration />} />
              <Route path="/*" element={<Navigate replace to={SIGN_IN} />} />
            </>
          )}
        </Routes>
      </Suspense>
    </main>
  );
};

export default Router;
