import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContextProvider";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { Registration } from "../../pages/Registration/Registration";
import { MY_PROFILE, SIGN_IN, REGISTER } from "../../utils/routes";
import { useSelector } from "react-redux";
import { PendingView } from "../PendingView/PendingView";
import { loadingState } from "../../reduxFeatures/reducers/loading";
import Modal from "../Modal/Modal";

const MyRouter = () => {
  const { user } = useContext(AuthContext);

  const loading = useSelector<loadingState>((state) => state.loading);
  const error = useSelector<loadingState>((state) => state.error);

  return (
    <>
      {error ? (
        <>
          <Modal mes={error} />
        </>
      ) : loading ? (
        <>
          <PendingView />
        </>
      ) : (
        <>
          {user ? (
            <main className="main">
              <Routes>
                <Route path={MY_PROFILE} element={<ProfilePage />} />
                <Route
                  path="/*"
                  element={<Navigate replace to={MY_PROFILE} />}
                />
              </Routes>
            </main>
          ) : (
            <main className="main">
              <Routes>
                <Route path={SIGN_IN} element={<LoginPage />} />
                <Route path={REGISTER} element={<Registration />} />
                <Route path="/*" element={<Navigate replace to={SIGN_IN} />} />
              </Routes>
            </main>
          )}
        </>
      )}
    </>
  );
};

export default MyRouter;
