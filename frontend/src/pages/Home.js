import { useEffect, useState } from "react";
import { useDashboardContext } from "../hooks/useDashboardContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import ClientDetails from "../components/ClientDetails";
//import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const [clients, setClients] = useState(null);
  const { dispatch } = useDashboardContext();
  const { user } = useAuthContext();

    useEffect(() => {
    const fetchClients = async () => {
        if (user.permissions.toLowerCase() === 'standard') {
          var clientid = user.client.toLowerCase()
        } 
        else if (user.permissions.toLowerCase() === 'parent') {
          var clientid = user.parent.toLowerCase();
        } 
        // else if (user.permissions.toLowerCase() === 'admin') {
        //   var clientid = '6a0ad3cb-d41e-492c-8b48-970060a22136'
        // } 
        else {
          var clientid = null;
        }

      const response = await fetch(
        "http://localhost:5000/api/v1/clients/" +
          clientid,
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
        setClients(json);
        //dispatch({ type: "SET_CLIENTS", payload: json });
      }
    };

    if (user) {
      fetchClients();
    }
  }, [dispatch, user]); //

  return (
    <div className="home">
      <div className="workouts">
        {clients &&
          clients.Clients.map((client) => (
            <ClientDetails key={client.GUID} client={client} />
          ))}
      </div>
    </div>
  );
}


export default Home;
