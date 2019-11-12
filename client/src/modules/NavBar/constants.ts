import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
   buttonWithMarginRight: {
      marginRight: theme.spacing(1),
   },
   list: {
      width: 250,
   },
   noUnderscore: {
      textDecoration: 'none',
   },
   sideListMenuOpenButton: {
      border: '1px solid rgba(0, 0, 0, 0.23)',
      color: 'white',
      marginLeft: theme.spacing(1),
      padding: '3px 9px',
   },
   sideNavigationButton: {
      color: 'black',
      marginLeft: theme.spacing(1),
   },
}));

export type DrawerSide = 'top' | 'left' | 'bottom' | 'right';
