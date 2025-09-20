import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from "./../components/layout/NavBar";
import { LoginForm } from "./../components/login-form";
import { InstantlyFilterForm } from "../components/InstantlyFilterForm";
import { getExistingSheets, messageClear } from "@/store/reducers/sheetReducer";
import toast from "react-hot-toast";

const Home = () => {
  const dispatch = useDispatch();
  const { existingSheets, successMessage, errorMessage } = useSelector(
    (state) => state.sheet
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

  console.log(existingSheets);
  useEffect(() => {
    dispatch(getExistingSheets(import.meta.env.VITE_SHEET_ID));
  }, []);

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0">
        <NavBar />
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <div className="w-full text-center">
          <InstantlyFilterForm existingSheets={existingSheets} />
        </div>
      </div>
    </div>
  );
};

export default Home;
