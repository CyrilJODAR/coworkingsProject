import { Card, CardActions, CardContent, Grid, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import FolderIcon from '@mui/icons-material/Folder';

const Coworking = ({ coworking }) =>{
    return(
        <>
            <Grid item key={coworking.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                        <h3>{coworking.name}</h3>
                        <p>{coworking.address.number} {coworking.address.street}, {coworking.address.postCode} {coworking.address.city}</p>
                    </CardContent>
                    <CardActions>
                        <IconButton size="small"
                                variant="outlined"
                                color="secondary">
                                <Link to={`/coworkings/${coworking.id}`}><FolderIcon /></Link>
                        </IconButton>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}

export default Coworking