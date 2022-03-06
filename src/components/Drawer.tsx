import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const SideDrawer = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <List>
          <ListItem
            button
            onClick={() => {
              navigate('/');
            }}
          >
            <ListItemText primary={'Data table'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate('/gallery');
            }}
          >
            <ListItemText primary={'Image gallery'} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              navigate('/todolist');
            }}
          >
            <ListItemText primary={'Todo list'} />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default SideDrawer;
