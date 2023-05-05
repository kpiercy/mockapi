import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useProcessContext } from '../../hooks/useProcessContext'
import ProcessList from '../../components/Processes/ProcessList'
import AddIcon from '@mui/icons-material/Add'

const Processes = () => {
    const [processes, setProcesses] = useState(null)
    const { dispatch } = useProcessContext()
    const { user } = useAuthContext()
    const { clientid, jobid } = useParams()

    useEffect(() => {
        const fetchProcesses = async () => {

            const response = await fetch(
                'http://localhost:5000/api/v1/clients/' +
                    clientid +
                    '/jobs/' +
                    jobid +
                    '/processes',
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
                setProcesses(json)
                //dispatch({ type: "SET_PROCESSES", payload: json });
            }
        }

        if (user) {
            fetchProcesses()
        }
    }, [dispatch, user]) //

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="Processes" />
                {/* <Link to="/processes/create" className="data-add-item">
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </Link> */}
            </Box>
            <div className="row data-col-header">
                <div className="col-lg-1">
                    <Link to="/processes/create" className="data-add-item">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="clients">
                <div className="data-cards">
                    {processes &&
                        processes.Processes.map((process) => (
                            <ProcessList key={process.ID} process={process} />
                        ))}
                </div>
            </div>
        </Box>
    )
}

export default Processes
