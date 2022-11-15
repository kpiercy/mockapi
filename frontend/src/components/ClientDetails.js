import { useState } from 'react'
import { useAuthContext } from "../hooks/useAuthContext"
import { useDashboardContext } from '../hooks/useDashboardContext'
import { Link } from "react-router-dom";

const ClientDetails = ({ client }) => {
  const [jobs, setJobs] = useState(null);
    const { dispatch } = useDashboardContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }
        if (user.parent !== null) {
          var clientid = user.parent.toLowerCase();
        } else {
          var clientid = user.client.toLowerCase();
        }
        
        const response = await fetch(
          "http://localhost:5000/api/v1/clients/" +
            client.GUID +
            "/jobs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "application/json",
            },
          }
        );

          const json = await response.json()

          if (response.ok) {
            setJobs(json)
            //dispatch({type: 'SET_JOBS', payload: json})
          }
   }

    return (
      <div className="workout-details">
        <h4>{client.Name}</h4>
        <p>
          <strong>Client_GUID: </strong>
          {client.GUID}
        </p>
        <p>
          <strong>Status: </strong>
          {client.Status}
        </p>
        <p>
          <strong>ERP ID: </strong>
          {client.ERP_GUID}
        </p>
        <p>
          <strong>ERP Parent ID: </strong>
          {client.ERP_Parent_GUID}
        </p>
        <Link className="cardLink" onClick={handleClick}>
          <h6>Jobs</h6>
        </Link>
        {/* <span className="material-symbols-outlined" onClick={handleClick}>
          delete
        </span> */}
      </div>
    );
}

export default ClientDetails