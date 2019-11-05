import { Chip, Theme } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

interface ErrorChipProps {
   text?: string | boolean;
   displayTime?: number;
}

const ErrorChip: React.FC<ErrorChipProps> = ({
   text = 'Something went wrong. Try again.',
   displayTime = 10000,
}) => {
   const [display, setDisplay] = React.useState(true);

   const useStyles = makeStyles((theme: Theme) =>
      createStyles({
         chip: {
            bottom: theme.spacing(2),
            left: theme.spacing(1),
            position: 'fixed',
         },
      }),
   );

   React.useEffect(() => {
      setTimeout(() => {
         setDisplay(false);
      }, displayTime);
   }, []);

   const handleDelete = () => {
      setDisplay(false);
   };

   const classes = useStyles({});

   return (
      <>
         {display && (
            <Chip
               label={text}
               onDelete={handleDelete}
               color="secondary"
               variant="outlined"
               className={classes.chip}
            />
         )}
      </>
   );
};

export default ErrorChip;
