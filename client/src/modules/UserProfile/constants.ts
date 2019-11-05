import { makeStyles } from "@material-ui/styles";

export  interface IUserProfile {
   name: string;
   email: string;
   updated?: string;
   avatarColor: string;
   image?: string;
}

export const useStyles = makeStyles({
   root: {
      height: `calc(100vh - ${65}px)`,
      overflow: 'hidden',
   },
});

export  const a11yProps = (index: any) => ({
   'aria-controls': `simple-tabpanel-${index}`,
   'id': `simple-tab-${index}`,
});
