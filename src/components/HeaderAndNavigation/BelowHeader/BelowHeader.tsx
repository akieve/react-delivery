import React from "react";
import st from "./BelowHeader.module.css";
import SubNav from "../SubNav/SubNav";
import WidthWrapper from "../../WidthWrapper/WidthWrapper";
import NavLogo from "../NavLogo/NavLogo";
import { State } from "../../../reduxFeatures/reducers/requestReducer";
import { useSelector } from "react-redux";
import GreenHr from "../GreenHr/GreenHr";

const BelowHeader: React.FC = () => {
  const user = useSelector((state: State) => state.auth.user);

  return (
    <div className={st.white}>
      <div className={st.belowHeader}>
        <WidthWrapper>
          <div className={st.belowHeaderTop}>
            <NavLogo />
            <div>
              <span className={st.info}> 394034-4994-77</span>
            </div>
          </div>
        </WidthWrapper>
        <GreenHr />
        {user && <SubNav />}
      </div>
    </div>
  );
};

export default BelowHeader;
