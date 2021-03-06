import { makeStyles } from '@material-ui/styles';

export interface UserProfileData {
   _id: string;
   name: string;
   email: string;
   updated?: string;
   userDescription?: string;
   avatarColor: string;
   joined: string;
   followers: Partial<UserProfileData>[];
   following: Partial<UserProfileData>[];
   hasPhoto: boolean;
}

export type ServerResponse = UserProfileData & { error: string };

export const useStyles = makeStyles({
   root: {
      minHeight: `calc(100vh - ${65}px)`,
      overflow: 'hidden',
   },
});

export const a11yProps = (index: any) => ({
   'aria-controls': `simple-tabpanel-${index}`,
   'id': `simple-tab-${index}`,
});
