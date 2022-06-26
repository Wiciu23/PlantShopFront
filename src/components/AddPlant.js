import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import pic from "../images/logo192.png"
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const AddPlant = (props) => {
    const [open, setOpen] = useState(false);
    const [plant,setPlant] = useState({
        name: '', category: '',  quantity: '', prize: ''
    });

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
}; 

const handleSave = () => {
    props.addPlant(plant);
    handleClose();
}

const handleChange = (event) => {
    setPlant({...plant, [event.target.name]: event.target.value})
}


    return(
        <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={handleClickOpen}>New Plant</Button>
            <Dialog open={open} onClose={handleClose}>
                <div>
                    
                    <DialogTitle>
                        <img src={pic} width={40} height={30} alt='PlantShop logo'/>
                        New Plant    
                    </DialogTitle>      
                </div>
                <DialogContent>
                    <TextField fullWidth label="Name" name ="name" value={plant.name} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Category" name ="category" value={plant.category} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Quantity" name ="quantity" value={plant.quantity} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Price" name ="prize" value={plant.prize} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddPlant;