import { useAuthContext } from "../hooks/useAuthContext";
import { useJobContext } from "../hooks/useJobContext";
import { Link } from "react-router-dom";

const JobDetails = ({ job }) => {
  const { dispatch } = useJobContext();
  const { user } = useAuthContext();

  // const handleClick = async () => {
  //     if (!user) {
  //         return
  //     }

  // const response = await fetch(
  //   "http://localhost:5000/api/v1/client/" +
  //     user.client +
  //     "paginate=false&page=1&limit=5",
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })

  //   const json = await response.json()

  //   if (response.ok) {
  //     dispatch({type: 'DELETE_CLIENT', payload: json})
  //   }
  // }

  return (
    <div className="workout-details">
      <Link className="cardLink" to={`/jobs/${job.GUID}`}>
        <h4>{job.Name}</h4>
      </Link>
      <p>
        <strong>GUID: </strong>
        {job.GUID}
      </p>
      <p>
        <strong>Status: </strong>
        Active
      </p>
      <Link className="cardLink" to={`/contracts`}>
        <h5>Contracts</h5>
      </Link>
      <Link className="cardLink" to={`/orders`}>
        <h5>Orders</h5>
      </Link>
      <Link className="cardLink" to={`/invoices`}>
        <h5>Invoices</h5>
      </Link>
      <Link className="cardLink" to={`/facilities`}>
        <h5>Facilities</h5>
      </Link>
      <Link className="cardLink" to={`/specs`}>
        <h5>Specs</h5>
      </Link>
      <Link className="cardLink" to={`/processes`}>
        <h5>Processes</h5>
      </Link>
      <Link className="cardLink" to={`/workflows`}>
        <h5>Workflows</h5>
      </Link>
      <Link className="cardLink" to={`/downloads`}>
        <h5>Downloads</h5>
      </Link>
      {/* <p>
        <strong>GUID: </strong>
        {job.Downloads[0].GUID}
      </p>
      <p>
        <strong>Mask: </strong>
        {job.Downloads[0].Mask}
      </p>
      <p>
        <strong>RemoteDirectory: </strong>
        {job.Downloads[0].RemoteDirectory}
      </p>
      <p>
        <strong>Needs Conversion: </strong>
        {job.Downloads[0].Convert}
      </p> */}
      {/* <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span> */}
    </div>
  );
};

export default JobDetails;
