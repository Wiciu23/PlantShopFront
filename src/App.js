import './App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import PlantList from './components/Plantlist';
import pic from "./images/logo192.png"
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <AppBar position="static" color="default">
        <Toolbar>
          <img src={pic} width={70} height={50} alt='PlantShop logo' />
          <Typography variant='h6' color="inherit">
            PlantList
          </Typography>
        </Toolbar>
      </AppBar>
      <Login/>
    </div>
  );
}

export default App;
