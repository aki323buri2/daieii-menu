import React from 'react';
import MainBar from './MainBar'; 
import { Switch, Route } from 'react-router-dom';
import GridOnIcon from '@material-ui/icons/GridOn';
import WebIcon from '@material-ui/icons/Web';
import Tables from './Tables'; 
import Sales from './Sales'; 

const root = '/main/'

const menuList = [
  [<GridOnIcon />, 'tables', 'テーブル定義書', `${root}tables`, Tables], 
  [<WebIcon />, 'sales', '売上入力', `${root}sales`, Sales], 
].map(([
  icon, name, title, to, component, 
]) => ({
  icon, name, title, to, component, 
}));

const Main = () => {
  return (
    <div>
      <MainBar menuList={menuList}>
        <Switch>
          {menuList.map(({ to, component }) => (
            <Route path={to} component={component} />
          ))}
        </Switch>
      </MainBar>
    </div>
  )
}

export default Main
