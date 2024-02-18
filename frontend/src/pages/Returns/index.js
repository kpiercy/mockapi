import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { useAuthContext } from '../../hooks/useAuthContext'
import Header from '../../components/ui/global/Header'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useReturnContext } from '../../hooks/useReturnContext'
import ReturnList from '../../components/Returns/ReturnList'
import AddIcon from '@mui/icons-material/Add'

const Returns = () => {
    const [returns, setReturns] = useState(null)
    const { dispatch } = useReturnContext()
    const { user } = useAuthContext()
    const { clientid, jobid } = useParams()

    useEffect(() => {
        const fetchReturns = async () => {
            const response = await fetch(
                'http://localhost:5000/api/v1/clients/' +
                    clientid +
                    '/jobs/' +
                    jobid +
                    '/returns',
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
                setReturns(json)
                //dispatch({ type: "SET_RETURNS", payload: json });
            }
        }

        if (user) {
            fetchReturns()
        }
    }, [dispatch, user]) //

    return (
        <Box m="20px">
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header title="Returns" />
                {/* <Box display="flex" justifyContent="end" mt="20px">
                  <Button
                      href="/returns/create"
                      color="secondary"
                      variant="contained"
                  >
                      Create Return
                  </Button>
              </Box> */}
            </Box>
            <div className="row data-col-header">
                <div className="col-lg-1">ID</div>
                <div className="col-lg-2">RemoteDir</div>
                <div className="col-lg-1">Mask</div>
                <div className="col-lg-2">LocalDir</div>
                <div className="col-lg-1">Server</div>
                <div className="col-lg-1">Type</div>
                <div className="col-lg-1">ZipName</div>
                <div className="col-lg-1">Links</div>
                <div className="col-lg-1">
                    <Link to="/returns/create" className="data-add-item">
                        <IconButton>
                            <AddIcon />
                        </IconButton>
                    </Link>
                </div>
            </div>
            <div className="clients">
                <div className="data-cards">
                    {returns &&
                        returns.Returns.map((upload) => (
                            <ReturnList key={upload.ID} upload={upload} />
                        ))}
                </div>
            </div>
        </Box>
    )
}

export default Returns
