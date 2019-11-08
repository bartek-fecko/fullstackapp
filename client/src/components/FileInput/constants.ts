// tslint:disable: object-literal-sort-keys
// tslint:disable: object-literal-key-quotes
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      imageFile: {
         height: '0.1px',
         width: '0.1px',
         position: 'absolute',
         opacity: 0,
         overflow: 'hidden',
         zIndex: -1,
         '& + label': {
            backgroundColor: 'black',
            color: 'white',
            cursor: 'pointer',
            display: 'inline-block',
            fontSize: '1.25em',
            fontWeight: 700,
         },
         '&:focus + label': {
            backgroundColor: 'red',
            outline: '1px dotted #000; -webkit - focus - ring - color auto 5px',
         },
         '& + label:hover': {
            backgroundColor: 'red',
         },
      },
      label: (props) => ({
         ...props,
      }),
      root: {
         flexGrow: 1,
      },
   }),
);
