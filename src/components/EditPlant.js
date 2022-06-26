import React from "react";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";

const EditPlant = (props) => {
    const [open, setOpen] = useState(false);
    const [plant, setPlant] = useState({
        id: '', name: '', category: '',  quantity: '', prize: ''
    });

    const handleClickOpen = () => {
        setPlant({
            id: props.plant.id,
            name: props.plant.name, 
            category: props.plant.category, 
            quantity: props.plant.quantity,
            prize: props.plant.prize
            
        })
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    }; 
    
    const handleSave = () => {
        props.updatePlant(plant, props.link)
        handleClose();
    }
    
    const handleChange = (event) => {
        setPlant({...plant, [event.target.name]: event.target.value})
    }

    return(
        <div>
            <Button color="primary" onClick={handleClickOpen}>Edit</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Plant</DialogTitle>
                <DialogContent>
                <TextField fullWidth label="Name" name ="name" value={plant.name} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Category" name ="category" value={plant.category} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Quantity" name ="quantity" value={plant.quantity} onChange={handleChange}/>
                    <br/>
                    <TextField fullWidth label="Price" name ="prize" value={plant.prize} onChange={handleChange}/>
                    <br/>
                    <input type={"hidden"} placeholder="Id" name="id" value={plant.id} onChange={handleChange}/>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancel</Button>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}


export default EditPlant;