import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
//import { useTheme } from '@mui/material/styles';
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

const Nft = () => {
  //const theme = useTheme();

  return (
    <>
      <Helmet>
        <title>Cryptocurrency Dashboard</title>
      </Helmet>
      
      <iframe width="100%" height="1000px" src="https://www.pokemonmarket.com/" title="External Website"></iframe>

         
    </>
  );
};

export default Nft;
