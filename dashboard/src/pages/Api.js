import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';

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

  const connectToMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access if needed
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('MetaMask is connected!');
      } else {
        console.log('MetaMask not detected. Please install MetaMask.');
      }
    } catch (error) {
      console.error(error);
    }
  };

const Loadkey = () => {
   fetch("http://localhost:4000/publicKey")
      .then((res) => res.json())
            .then((json) => {
                document.getElementById('div_key').innerHTML = '<font color="White">'+json.PublicKey+'</font>';
      });
}

const Loadtrans = () => {
   fetch("http://localhost:4000/transactions")
      .then((res) => res.json())
            .then((json) => {
                document.getElementById('div_trans').innerHTML = '<font color="White">'+JSON.stringify(json)+'</font>';
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

const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted");
        const receipient = e.target.receipient.value;
        const amount = e.target.amount.value;

        var data = {
            receipient : receipient,
            amount : amount
        }
        /*var data = JSON.stringify({
            receipient : receipient,
            amount : amount
        });*/
        console.log(data);
        
        fetch("http://localhost:4000/transact", {
            method :"POST",
            mode :"cors",
            body : data,
            /*headers: {
              "Content-type": "application/json; charset=UTF-8"
            }*/
        }).then((response) => {
            console.log(response);
            fetch("http://localhost:4000/transactions")
              .then((res) => res.json())
                .then((json) => {
                  document.getElementById('div_transact').innerHTML = '<font color="White">'+JSON.stringify(json)+'</font>';
            });
            
            return response.json();
        })
    }

const Api = () => {
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
        	    	<button onClick={Loadkey} type="button" id="btn_key" class="btn btn-primary">Get your Public key</button>
        	    	</div>
        	    	<div id="div_key"></div>
        	    	<br />
        	    	<div>
<button onClick={Loadtrans} type="button" id="btn_trans" class="btn btn-primary">Get Transactions List</button>
</div>
<div id="div_trans"></div>
<br />

<div>
<button onClick={Loadblocks} type="button" id="btn_blocks" class="btn btn-primary">Get Blocks Info</button>
</div>
<div id="div_blocks"></div>
<br />

<div>
<button onClick={Loadbroadcast} type="button" id="btn_broadcast" class="btn btn-primary">Mine blockchain and clears old transaction pool then broadcast new chain</button>
</div>
<div id="div_broadcast"></div>
<br />

<div>
<button onClick={Loadmine} type="button" id="btn_mine" class="btn btn-primary">Mine (Add blocks to blockchain) </button>
</div>
<div id="div_mine"></div>
<br /><br /><br />
<h4><font color="White">Transact online</font></h4>
<form id="frmtransact" method="post" onSubmit={handleSubmit}>
  <div class="mb-3 mt-3">
    <label for="receipient" class="form-label">Receipient:</label>
    <input class="form-control" id="receipient" placeholder="Enter receipient public address" name="receipient" />
  </div>
  <div class="mb-3">
    <label for="pwd" class="form-label">Amount:</label>
    <input class="form-control" id="amount" placeholder="Enter amount" name="amount" />
  </div><br />
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
<div id="div_transact"></div>
<br />
<div class="mb-3">
      <button class="btn btn-primary" id="connectButton" onClick={connectToMetaMask}>
        Connect wallet
      </button>

 </div>

        </Container>
      </Box>
      <Spacer sx={{ pt: 7 }} />
    </>
  );
};

export default Api;