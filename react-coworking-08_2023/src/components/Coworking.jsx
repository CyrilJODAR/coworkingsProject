import { Card, CardActions, CardContent, Grid, IconButton } from "@mui/material"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import ConstructionIcon from '@mui/icons-material/Construction';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from "react";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';

const Coworking = ({ coworking, handleDeleteCoworking }) =>{

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleCloseValidate = (coworkingId) =>{
        handleDeleteCoworking(coworkingId)
        setOpen(false)
    }

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
                                    <FolderIcon />
                        </IconButton>
                        <IconButton size="small"
                                variant="outlined"
                                color="success">
                                    <Link to={`/admin/coworkings/${coworking.id}/update`}><ConstructionIcon /></Link>
                        </IconButton>
                        <IconButton  size="small"
                                variant="outlined"
                                color="error"
                                onClick={handleClickOpen}>
                                <DeleteIcon />
                        </IconButton >
                    </CardActions>
                </Card>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Voulez vous supprimer le coworking suivant ?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <CardContent>
                        <h3>{coworking.name}</h3>
                        <p>{coworking.address.number} {coworking.address.street}, {coworking.address.postCode} {coworking.address.city}</p>
                    </CardContent>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <IconButton size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={handleClose}>
                    <CancelIcon />
                </IconButton>
                <IconButton size="small"
                            variant="outlined"
                            color="success"
                            onClick={()=>handleCloseValidate(coworking.id)} autoFocus>
                    <DoneAllIcon />
                </IconButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Coworking