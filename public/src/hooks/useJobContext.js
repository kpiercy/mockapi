import { JobContext } from "../contexts/JobContext";
import { useContext } from "react";

export const useJobContext = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw Error(
      "useJobContext must be used inside an JobContextProvider"
    );
  }

  return context;
};
