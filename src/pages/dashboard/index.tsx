import React from 'react';
import TabPanel, { Tab } from 'components/TabPanel';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './Home';
import LiveChart from './LiveChart';
import './index.css';

const Dashboard: React.FC<any> = () => {
  return (
    <div className="flex column flex-1">
      <TabPanel>
        <Tab name="Home" route="/dashboard/home" />
        <Tab name="Live Chart" route="/dashboard/live-chart" />
      </TabPanel>
      <Switch>
        <Route path="/dashboard/home" component={Home} />
        <Route path="/dashboard/live-chart" component={LiveChart} />
        <Redirect to="/dashboard/home" />
      </Switch>
    </div>
  );
};

export default Dashboard;
