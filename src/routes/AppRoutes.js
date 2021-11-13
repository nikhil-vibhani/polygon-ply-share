import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Home from '../pages/Home/Home';
import MysteryBoxes from '../pages/MysteryBoxes/MysteryBoxes';
import Staking from '../pages/Staking/Staking';
import StakingList from '../pages/StakingList/StakingList';
import TokenSales from '../pages/TokenSales/TokenSales';
import ScrollToTop from './ScrollToTop'

const AppRoutes = () => {

  return (
    <Router>
      <Header />
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Staking} />
          <Route exact path="/token-sales" component={TokenSales} />
          <Route exact path="/mystery boxes" component={MysteryBoxes} />
          <Route exact path="/staking" component={Staking} />
          <Route exact path="/staking-list" component={StakingList} />
        </Switch>
      </ScrollToTop>
      {/* <Footer /> */}
    </Router>

  )
}

export default AppRoutes;
