import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import JobList from "../../components/Jobs/JobList";
import { useJobContext } from "../../hooks/useJobContext";

const Jobs = () => {
  const [jobs, setJobs] = useState(null)
  const { dispatch } = useJobContext()
  const { user } = useAuthContext()
  const location = useLocation()
  const { clientid } = location.state

  useEffect(() => {
    const fetchJobs = async () => {
      // if (user.permissions.toLowerCase() === 'standard') {
      //   var clientid = user.client.toLowerCase()
      // } else if (user.permissions.toLowerCase() === 'parent') {
      //   var clientid = user.parent.toLowerCase()
      // }
      // else if (user.permissions.toLowerCase() === 'admin') {
      //   var clientid = '4'
      // }
      // else {
      //   var clientid = null
      // }

      const response = await fetch('http://localhost:5000/api/v1/clients/'+ clientid +'/jobs', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      })
      const json = await response.json()

      if (response.ok) {
        setJobs(json)
        //dispatch({ type: "SET_JOBS", payload: json });
      }
    }

    if (user) {
      fetchJobs()
    }
  }, [dispatch, user])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Jobs" />
      </Box>
      <div className="row data-col-header">
        <div className="col-lg-1">Name</div>
        <div className="col-lg-1">ID</div>
        <div className="col-lg-1">Active</div>
        <div className="col-lg-1">ParentID</div>
        <div className="col-lg-1">ClientID</div>
        <div className="col-lg-1">RootPath</div>
        <div className="col-lg-1">Links</div>
        <div className="col-lg-1">
          <Link to="/jobs/create" className="data-add-item">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Link>
        </div>
      </div>
      <div className="clients">
        <div className="data-cards">
          {jobs &&
            jobs.Jobs.map((job) => <JobList key={job.ID} job={job} />)}
        </div>
      </div>
    </Box>
  )
}

export default Jobs
