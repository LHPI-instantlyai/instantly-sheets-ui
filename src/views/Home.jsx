import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "./../components/layout/NavBar";
import { LoginForm } from "./../components/login-form";
import { InstantlyFilterForm } from "../components/InstantlyFilterForm";
import { getExistingSheets, messageClear } from "@/store/reducers/sheetReducer";
import toast from "react-hot-toast";
import { getExistingCampaigns } from "@/store/reducers/instantlyAiReducer";
import { ColumnKanban } from "./../components/custom/ColumnKanban";

const Home = () => {
  const dispatch = useDispatch();
  const { existingSheets, successMessage, errorMessage } = useSelector(
    (state) => state.sheet
  );
  const { existingCampaigns, instantlyloader } = useSelector(
    (state) => state.instantlyAi
  );

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    } else if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  useEffect(() => {
    dispatch(getExistingSheets(import.meta.env.VITE_SHEET_ID));
    dispatch(getExistingCampaigns());
  }, []);

  return (
    <div className="relative h-full p-0 flex justify-center items-center">
      <div className="absolute inset-0 z-10">
        <NavBar />
      </div>  
      <div className="flex pt-35 pb-10 px-10 z-40">
        <InstantlyFilterForm
            existingSheets={existingSheets}
            existingCampaigns={existingCampaigns}
            instantlyloader={Boolean(instantlyloader)}
          />
      </div>
    </div>
  );
};

export default Home;
