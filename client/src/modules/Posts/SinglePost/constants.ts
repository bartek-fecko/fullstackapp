// tslint:disable: object-literal-key-quotes
import { Post } from '#/store/PostsStore/constants';
import { makeStyles, Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
   mainImageWrapper: {
      '&::after': {
         bottom: '1px',
         boxShadow: '0px 0px 8px 2px #000000',
         content: '""',
         position: 'absolute',
         transform: 'scale(.9)',
         width: '100%',
         zIndex: -1,
      },
      position: 'relative',
   },
   mainImage: {
      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 70%)',
   },
   postedBy: {
      bottom: theme.spacing(1),
      color: 'white',
      position: 'absolute',
      right: theme.spacing(1),
   },
   title: {
      margin: `${theme.spacing(3)}px 0`,
   },
}));

export type ServerResponse = Post & { error: string };
