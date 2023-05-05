import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useWorkflowContext } from '../../hooks/useWorkflowContext'
import WorkflowList from '../../components/Workflows/WorkflowList'
import AddIcon from '@mui/icons-material/Add'

const Workflows = () => {
    const [workflows, setWorkflows] = useState(null)
    const { dispatch } = useWorkflowContext()
    const { user } = useAuthContext()
    const { clientid, jobid } = useParams()

    useEffect(() => {
        const fetchWorkflows = async () => {
            const response = await fetch(
                'http://localhost:5000/api/v1/clients/' +
                    clientid +
                    '/jobs/' +
                    jobid +
                    '/workflows',
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
                setWorkflows(json)
                //dispatch({ type: "SET_PROCESSES", payload: json });
            }
        }

        if (user) {
            fetchWorkflows()
        }
    }, [dispatch, user]) //

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="Workflows" />
                {/* <Link to="/workflows/create" className="data-add-item">
                    <IconButton>
                        <AddIcon />
                    </IconButton>
                </Link> */}
            </Box>
            <div className="row data-col-header">
                <div className="col-lg-1">
                    <Link to="/workflows/create" className="data-add-item">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="clients">
                <div className="data-cards">
                    {workflows &&
                        workflows.Workflows.map((workflow) => (
                            <WorkflowList key={workflow.ID} workflow={workflow} />
                        ))}
                </div>
            </div>
        </Box>
    )
}

export default Workflows
