import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, makeStyles, Tooltip, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import GitHubIcon from '@material-ui/icons/GitHub';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/Inbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link as RouterLink } from 'react-router-dom'; 
import clsx from 'clsx'; 

const isExternal = url => /^https?\:\/\//.test(url);

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex', 
  }, 
  grow: {
    flexGrow: 1, 
  }, 
  appBar: {
    width: `calc(100% - ${theme.spacing(7) + 1}px)`, 
  }, 
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`, 
  }, 
  drawer: {
    width: drawerWidth, 
    whiteSpace: 'nowrap', 
  }, 
  drawerOpen: {
    width: drawerWidth, 
  }, 
  drawerClose: {
    width: theme.spacing(7) + 1, 
    overflowX: 'hidden', 
  }, 
  toolbar: {
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-end', 
    padding: theme.spacing(0, 1), 
    ...theme.mixins.toolbar, 
  }, 
  content: {
    flexGrow: 1, 
    padding: theme.spacing(3), 
  }, 
}));

const MainBar = ({
  title = '株式会社ショクリュー', 
  children, 
  repositoryUrl = 'https://github.com/aki323buri2/daieii-menu.git', 
  menuList = [
    [<InboxIcon />, 'inbox', 'インボックス', ], 
    [<MailIcon />, 'mail', 'メール'], 
  ].map(([
    icon, name, title, 
  ]) => ({ 
    icon, name, title, to: name })), 
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  }; 
  return (
    <div className={classes.root}>
      <AppBar className={clsx({
        [classes.appBar]: !open, 
        [classes.appBarShift]: open, 
      })}>
        <Toolbar>
          <IconButton color="inherit" onClick={toggleOpen} edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">
            {title}
          </Typography>
          <div className={classes.grow}/>
          {[
            [<GitHubIcon/>, 'github', 'GitHubリポジトリ', repositoryUrl], 
            [<HomeIcon/>, 'home', 'ロゴ画面へ', '/'], 
          ].map(([
            icon, 
            name, 
            title, 
            to, 
          ]) => {
            const external = isExternal(to);
            

            return (
              <Tooltip key={name} title={title}>
                <IconButton color="inherit" 
                  to={!external ? to : undefined}
                  component={!external ? RouterLink : undefined}
                  href={external ? to : undefined }
                  >
                  {icon}
                </IconButton>
              </Tooltip>
            );
          })}
        </Toolbar>
      </AppBar>
      <Drawer
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open, 
          [classes.drawerClose]: !open, 
        })}
        classes={{
          paper: clsx(classes.drawer, {
            [classes.drawerOpen]: open, 
            [classes.drawerClose]: !open, 
          }), 
        }}
        variant="permanent"
        anchor="left" 
      >
        <div className={classes.toolbar}>
          <IconButton onClick={toggleOpen}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {menuList.map(({
            icon, 
            name, 
            title,
            to,  
          }) => {
            const external = isExternal(to);
            return (
              <Tooltip key={name} title={title}>
                <ListItem
                  button 
                  to={!external ? to : undefined}
                  href={external ? to : undefined}
                  component={!external ? RouterLink : undefined}
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItem>
              </Tooltip>
            );
          })}
        </List>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}

export default MainBar;
