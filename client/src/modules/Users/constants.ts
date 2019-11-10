// tslint:disable: object-literal-sort-keys
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      header: {
         margin: `${theme.spacing(1)}px 0`,
      },
      secendaryText: {
         display: 'inline',
         marginTop: '20px',
      },
      paper: {
         margin: `${theme.spacing(1) / 2}px auto`,
         padding: theme.spacing(1, 1),
         position: 'relative',
         minWidth: '322px',
      },
      userElementRoot: {
         overflow: 'hidden',
         width: '322px',
      },
      root: {
         '&:hover': {
            background: '#eee',
            cursor: 'pointer',
         },
         'backgroundColor': theme.palette.background.paper,
         'width': '100%',
      },
      link: {
         '&:hover': {
            textDecoration: 'none',
         },
      },
      listItem: {
         width: '100%',
      },
   }),
);