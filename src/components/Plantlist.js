import React, { Component } from "react";
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddPlant from "./AddPlant";
import EditPlant from "./EditPlant";
import { CSVLink } from "react-csv";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

class PlantList extends Component{
    constructor(props){
        super(props);
        this.state = { plants: [] };
    }

    fetchPlants = () => {
        const token = sessionStorage.getItem("jwt");
        fetch('api/plants',{
            headers:{
                'Authorization': "Bearer " + token
            }
        })
        .then((response)=>response.json())
        .then((responseData) => {
            this.setState({
                plants: responseData
            });
        })
        .catch(err => console.error(err));
    }

    onDelClick = (link) => {
        if(window.confirm('Are you sure to delete?')){
            const token = sessionStorage.getItem("jwt");
            fetch(link, {method:'DELETE',
                headers:{
                    'Authorization': "Bearer " + token,
                }
            })
            .then(response => {
                toast.success("Plant deleted", {
                    position: toast.POSITION.BOTTOM_LEFT
                });
                this.fetchPlants();
            })
            .catch(err => {
                toast.error("Error when deleting",{
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err)
        })  
    }}

    addPlant(plant){
        const token = sessionStorage.getItem("jwt");
        fetch('api/plants',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
             },
            body: JSON.stringify(plant)
        })
        .then(res => {
                toast.success("Plant added",{
                position: toast.POSITION.BOTTOM_LEFT
            })
            this.fetchPlants()
        }) 
        .catch(err => {
                toast.error("Error when adding",{
                position: toast.POSITION.BOTTOM_LEFT
            });
            console.error(err) 
        })
    }

    updatePlant(plant, link){
        const token = sessionStorage.getItem("jwt");
        fetch(link,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,   
            },
            body: JSON.stringify(plant)
        })
        .then(res => {
                toast.success("Change saved",{
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.fetchPlants();
        })
        
    }

    componentDidMount(){
        const token = sessionStorage.getItem("jwt");
        fetch('api/plants',{
            headers:{
                'Authorization': "Bearer " + token
            }
        })
        .then((response)=>response.json())
        .then((responseData) => {
            this.setState({
                plants: responseData
            });
        }).catch(err => console.error(err));
    }


    render(){
        const columns = [
        {
            Header: 'Id',
            accessor: 'id',
            show: false
        },{
            Header: 'Name',
            accessor: 'name'
        },{
            Header: 'Category',
            accessor: 'category'
        },{
            Header: 'Quanity',
            accessor: 'quantity'
        },{
            Header: 'Price zł',
            accessor: 'prize'
        },{
            id: 'delbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value}) => (<Button color="secondary" onClick={() => {
                value = "api/plants/" + value;
                this.onDelClick(value)
            }}>Delete</Button>)
        },{
            id: 'editbutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({row}) => (<EditPlant plant={row} link={"api/plants/"} updatePlant={this.updatePlant} fetchPlants={this.fetchPlants} />)
        }
    ]

    
        return(
            <div className="App">
                <Grid container>
                    <Grid item>
                        <AddPlant addPlant={this.addPlant} fetchPlants={this.fetchPlants}/>
                    </Grid>
                    <Grid item style={{padding: 15}}>
                    <CSVLink data={this.state.plants} separator=";">Export CSV</CSVLink>
                    </Grid>
                </Grid>
                <ReactTable data={this.state.plants}
                columns={columns}
                filterable={true}/>
                <ToastContainer autoClose={1500}/>
            </div>
        )
    }

    /*
    render() {
        const tableRows = this.state.plants.map((plant,index)=>
        <tr key={index}>
            <td>{plant.name}</td>
            <td>{plant.category}</td>
        </tr>
        );
        return(
            <div className="App">
                <table>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    }
    */

}

export default PlantList;