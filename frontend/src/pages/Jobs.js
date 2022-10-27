import { useEffect, useState } from "react";
import { useJobContext } from "../hooks/useJobContext";
import { useDashboardContext } from "../hooks/useDashboardContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import JobDetails from "../components/JobDetails";
//import JobForm from "../components/JobForm";

const Jobs = () => {
  const [jobs, setJobs] = useState(null);
  const { dispatch } = useJobContext();
  const { client } = useDashboardContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchJobs = async () => {
      if (user.parent !== null) {
        var clientid = user.parent.toLowerCase();
      } else {
        var clientid = user.client.toLowerCase();
      }
      const response = await fetch(
        "http://localhost:5000/api/v1/clients/" + clientid + "/jobs",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        setJobs(json);
        //dispatch({ type: "SET_JOBS", payload: json });
      }
    };

    if (user) {
      fetchJobs();
    }
  }, [dispatch, user]); //

  return (
    <div className="home">
      <div className="workouts">
        {jobs && 
          jobs.Jobs.map((job) => (
            <JobDetails key={job.GUID} job={job} />
          ))}
      </div>
    </div>
  );
};

export default Jobs;
