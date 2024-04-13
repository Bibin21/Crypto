import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import {Web3} from 'web3';
import DashboardHeader from '../components/DashboardHeader';
import Categories from '../components/statistics/Categories';
import Exchanges from '../components/statistics/Exchanges';
import AssetPlatforms from '../components/statistics/AssetPlatforms';
import MarketIndexes from '../components/statistics/MarketIndexes';
import CoinMarkets from '../components/tables/CoinMarkets';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import DoughnutChart from '../components/charts/DoughnutChart';
import PolarAreaChart from '../components/charts/PolarAreaChart';
import LineChart from '../components/charts/LineChart';
import AreaChart from '../components/charts/AreaChart';
import Spacer from '../components/Spacer';
import Transactions from '../components/transactions';
import toast, { Toaster } from 'react-hot-toast';





const Api = () => {
  const ABI =[{
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "type": "function"
  }];
  const web3 = new Web3(window.ethereum);
  const [count,setCount]=useState(0);

  const [address,setAddress]=useState('');
  const [transaction,setTransaction]=useState({});
  const [balance,setBalance]=useState(0);
  const [fetchstatus,setFetchstatus]=useState(false);
  const connectToMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access if needed
       const account= await window.ethereum.request({ method: 'eth_requestAccounts' });
       setAddress(account);
        console.log(account);
        if(account)
        {
          if(count==0)
          toast.success('Wallet Connected..')
      //  const balance= await window.ethereum.request({
      //     "method": "eth_getBalance",
      //     "params": [
      //      account[0],
      //      "latest"
      //     ]
      //   });

      const balance = await web3.eth.getBalance(account[0]);
      setBalance(web3.utils.fromWei(balance, 'ether'));
   
  
        }
    } } catch (error) {
      toast.error(error.message);
    }
  };

const Loadkey = () => {

                document.getElementById('div_key').style.display = 'block';
           
    
}

const LoadBalance = () => {
  document.getElementById('div_balance').style.display = 'block';
}
const Loadtrans = () => {
  fetch("https://api-sepolia.etherscan.io/api?module=account&action=txlist&address="+address+"&page=1&offset=100&startblock=0&endblock=99999999&sort=asc&apikey=NFE4WDDGG3CS7NQAS5XKIY9U2VFJWE5NWM", {
    method :"GET",
}).then((res) => res.json())
            .then((json) => {
              setTransaction(json.result);
              setFetchstatus(true);
      });
}

const Loadblocks = () => {
   fetch("http://localhost:4000/blocks")
      .then((res) => res.json())
            .then((json) => {
                document.getElementById('div_blocks').innerHTML = '<font color="White">'+JSON.stringify(json)+'</font>';
      });
}

const Loadbroadcast = () => {
   fetch("http://localhost:4000/mine-transactions")
      .then((res) => res.json())
            .then((json) => {
                document.getElementById('div_broadcast').innerHTML = '<font color="White">'+JSON.stringify(json)+'</font>';
      });
}
const refreshpage = async()=>{
setCount(count=>count+1)
  connectToMetaMask();
  Loadtrans();
} 
const Loadmine = () => {
   fetch("http://localhost:4000/mine", {
     
    // Adding method type
    method: "POST",
     
    // Adding body or contents to send
    body: JSON.stringify({
        data: "foo-bar"
    }),
     
    // Adding headers to the request
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
      .then((res) => res.json())
            .then((json) => {
                fetch("http://localhost:4000/blocks")
                  .then((response) => response.json())
                    .then((msg) => {
                      document.getElementById('div_mine').innerHTML = '<font color="White">'+JSON.stringify(msg)+'</font>';
                    });
      });
}

const handleSubmit = async(e) => {
  try{
        e.preventDefault();
        const receipient = e.target.receipient.value;
        const amount = e.target.amount.value;
 if(receipient =='' || amount=='')
 {
  toast.error("Missing Details")
  return;
 }
 
console.log(address[0])
console.log(receipient)
const hexamount=amount.toString(16)
console.log(hexamount)

//convert the integer into Ehter standard
const ethValue = Web3.utils.toWei(
amount.toString(),"ether"); 


const receipt =  web3.eth.sendTransaction({
  from: address[0],
  to: receipient,
  value: String(amount*1000000000000000000),
  gas: '100000',
  // other transaction's params
}).then(()=>{setCount(count=>count+1)})
toast.promise(receipt, {
  loading: 'Transferring.....',
  success: 'Transfer Successfull',
  error: 'Error during transaction or user cancelled the request',
});

}

catch(error)
{
  console.log(error)
  toast.error(error.message);
}

      
    }
 
  useEffect(()=>{
    connectToMetaMask();
  },[])
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Cryptocurrency Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: '100%',
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          
       		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" />               
                <div>
        	    	<button onClick={Loadkey} type="button" id="btn_key" class="btn btn-primary">Get your Wallet Address</button>
        	    	</div>
        	    	<div id="div_key" style={{display:"none",color:"white"}}>{address!='' ? address : "Wallet Not Connected"}</div>
        	    	<br />
                <div>
        	    	<button onClick={LoadBalance} type="button" class="btn btn-primary">Get Balance</button>
        	    	</div>
        	    	<div id="div_balance" style={{display:"none",color:"white"}}>{balance}</div>
        	    	<div>
                <br />
<button onClick={Loadtrans} type="button" id="btn_trans" class="btn btn-primary">Get Transactions List</button>
</div>
<div id="div_trans">{ fetchstatus && <Transactions transactions={transaction} address={address} />}</div>
<br />

{/* <div>
<button onClick={Loadblocks} type="button" id="btn_blocks" class="btn btn-primary">Get Blocks Info</button>
</div> */}
{/* <div id="div_blocks"></div>
<br />

<div>
<button onClick={Loadbroadcast} type="button" id="btn_broadcast" class="btn btn-primary">Mine blockchain and clears old transaction pool then broadcast new chain</button>
</div>
<div id="div_broadcast"></div>
<br />

<div>
<button onClick={Loadmine} type="button" id="btn_mine" class="btn btn-primary">Mine (Add blocks to blockchain) </button>
</div> */}
<div id="div_mine"></div>
<br /><br /><br />
<h4><font color="White">Transfer Coins</font></h4>
<form id="frmtransact" method="post" onSubmit={handleSubmit}>
  <div class="mb-3 mt-3">
    <label for="receipient" class="form-label">Receipient:</label>
    <input class="form-control" id="receipient" placeholder="Enter recipient wallet address" name="receipient" />
  </div>
  <div class="mb-3">
    <label for="pwd" class="form-label">Amount:</label>
    <input class="form-control" id="amount" placeholder="Enter amount" name="amount" />
  </div><br />
  <button type="submit" class="btn btn-primary">Transfer</button>
</form>
<div id="div_transact"></div>
<br />
<div class="mb-3">
      <button class="btn btn-primary" id="connectButton" onClick={connectToMetaMask}>
        Connect wallet
      </button>

 </div>

 <div class="mb-3">
      <button class="btn btn-primary" id="connectButton" onClick={refreshpage}>
        Refresh
      </button>

 </div>

        </Container>
      </Box>
      <Spacer sx={{ pt: 7 }} />
      <Toaster style={{}}   position="bottom-center" />
    </>
  );
};

export default Api;