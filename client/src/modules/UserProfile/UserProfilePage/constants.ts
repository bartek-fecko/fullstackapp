import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
createStyles({
   avatar: {
      margin: 10,
   },
   bigAvatar: {
      height: 120,
      margin: 10,
      width: 120,
   },
   root: {
      flexGrow: 1,
   },
}),
);
