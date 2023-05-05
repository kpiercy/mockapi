import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFacilityContext } from '../../hooks/useFacilityContext'
import FacilityList from '../../components/Facilities/FacilityList'
import AddIcon from '@mui/icons-material/Add'


const Facilities = () => {
    const [facilities, setFacilities] = useState(null)
    const { dispatch } = useFacilityContext()
    const { user } = useAuthContext()
    const { clientid, jobid } = useParams()

    useEffect(() => {
        const fetchFacilities = async () => {
            const response = await fetch(
                'http://localhost:5000/api/v1/clients/' +
                    clientid +
                    '/jobs/' +
                    jobid +
                    '/facilities',
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            const json = await response.json()

            if (response.ok) {
                setFacilities(json)
                //dispatch({ type: "SET_DOWNLOADS", payload: json });
            }
        }

        if (user) {
            fetchFacilities()
        }
    }, [dispatch, user]) //

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="Facilities" />
                {/* <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                      href="/facilities/create"
                      color="secondary"
                      variant="contained"
                  >
                      Create Facility
                  </Button>
              </Box> */}
            </Box>
            <div className="row data-col-header">
                <div className="col-lg-2">Facility</div>
                <div className="col-lg-1">ID</div>
                <div className="col-lg-1">Active</div>
                <div className="col-lg-1">MinBalance</div>
                <div className="col-lg-2">InsurancetransLang</div>
                <div className="col-lg-2">PatientTransLang</div>
                <div className="col-lg-1">Links</div>
                <div className="col-lg-1">
                    <Link to="/facilities/create" className="data-add-item">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="clients">
                <div className="data-cards">
                    {facilities &&
                        facilities.Facilities.map((facility) => (
                            <FacilityList
                                key={facility.ID}
                                facility={facility}
                            />
                        ))}
                </div>
            </div>
        </Box>
    )
}

export default Facilities
