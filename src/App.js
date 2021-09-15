import './App.css';
import meta from './meta.png';
import Button from '@material-ui/core/Button';
import Web3 from 'web3';
import React, {Compenent} from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



let web3 = new Web3;




  let accounts=[];  


function Nav (props) {
return(
  <div >
      <AppBar position="fixed">
        <Toolbar>
         
          <Typography variant="h6" >
            Address:
          </Typography>
          <Button color="inherit" id="address"></Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}


function App() {
  
  
 

  const [disable, setDisable] = React.useState(false);
  

 
  
function isNumeric(num){
  return !isNaN(num)
}

async function SendEth () {
let reciever = document.getElementById('account').value;
let value = document.getElementById('value').value;
console.log(Number('salah'));
  if(web3.utils.isAddress(reciever) && isNumeric(value)  ) {
const p2 =  new  Promise(async (resolve,reject) => {setDisable(true);
  
  
  

  const transactionParameters = {
    nonce :'0x00',
    gasPrice:web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
    gas:web3.utils.toHex(31000),
    to:web3.utils.toHex(reciever),
    from:web3.utils.toHex(accounts[0]),
    value:web3.utils.toHex(web3.utils.toWei(value)),
    data:'0x00',
    chainId :'0x3',
    
  }
  const txHash = await window.ethereum.request({
  method: 'eth_sendTransaction',
  params: [transactionParameters],});
  resolve(txHash);
})
  p2.then((value)=>{
    console.log(value);
    setDisable(false);
    document.getElementById('account').value = '';
    document.getElementById('value').value = '';
    document.getElementById('txHash').innerHTML='Transaction has been fulfiled you can view it on etherscan using this hash:'+value;



  })}
  else {
    window.alert('the reciever should be an ethereum address while the value should be an integer representing the ether value you want to send!')
  }
}
function enableEth() {
  
  
  const p = new Promise(async (resolve,reject)=>{
    setDisable(true);
    
  accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  resolve(accounts)
  })
  p.then((value) =>{
    console.log(value[0]);

    document.getElementById('home').style.visibility='hidden';
  const el = document.getElementById('send');
el.style.visibility = 'visible';
document.getElementById('address').innerHTML=value[0];
setDisable(false);

  })
}



  if (typeof window.ethereum !== 'undefined') {
     web3 = new Web3(window.web3.currentProvider);
    
    
  return (

    <div className="App">

      <header className="App-header">
      <div id='home'>
      
        <img src={meta} className="App-logo" alt="logo" />
        <p>
          
          Great! Metamask is installed.
        </p>
       <Button variant="contained" color="primary" id='EthEnable' onClick={enableEth} disabled={disable}>
  Enable Metamask!
</Button></div>
<div id='send'>
<Nav address={accounts[0]}/>
<form  noValidate autoComplete="off"> 
<Grid item xs={12}>
 <div className='paper'>

  <TextField  id="account" label="Reciever"  variant="outlined" />
  
  </div>
  </Grid>
  
  
  <Grid item xs={12}>
  <div className='paper'>
  <TextField id="value" label="Ether's Value" variant="outlined" />
  </div>
  </Grid>
  <Button variant="contained" color="primary" id='EthSend' onClick={SendEth} disabled={disable}>
  Send
</Button>
  
</form>
<p id='txHash'></p>
</div>

      </header>
      </div>
      
  );}
  else {
    return (
  <div className="App">
      <header className="App-header">
        <img src={meta} className="App-logo" alt="logo" />
        <p>
          Metamask is Not installed on your Browser.
        </p>
        <a
          className="App-link"
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Install Metamask
        </a>
      </header>
    </div>
  );
}
  }



export default  App;

