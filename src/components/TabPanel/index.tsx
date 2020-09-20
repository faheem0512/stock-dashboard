import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export interface ITabPanel {
  testId?: string;
  children: any;
}
export interface ITab {
  route: string;
  name: string;
}

export const Tab: React.FC<ITab> = ({ route, name }) => {
  return (
    <NavLink
      to={route}
      className="tab"
      activeStyle={{
        fontWeight: 'bold',
        backgroundColor: '#797979',
      }}
    >
      {name}
    </NavLink>
  );
};

const TabPanel: React.FC<ITabPanel> = ({ children, testId }) => {
  return (
    <div className="tab-panel" data-testid={testId}>
      <div className="tab-container">
        {React.Children.map(children, (child) => {
          const { props, type } = child;
          if (type === Tab) {
            return <Tab {...props} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default TabPanel;
