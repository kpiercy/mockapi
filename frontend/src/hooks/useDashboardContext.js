import { DashboardContext } from "../contexts/DashboardContext";
import { useContext } from "react";

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw Error(
      "useDashboardContext must be used inside an DashboardContextProvider"
    );
  }

  return context;
};
