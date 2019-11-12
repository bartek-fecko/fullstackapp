import { makeStyles, Theme } from '@material-ui/core/styles';

export interface PostCreateData {
   name: string;
   body: string;
   title: string;
   photo?: Buffer;
}

export type PostCreateDataErrors = {
   [key in keyof Partial<PostCreateData>]: string;
};

export type ServerResponse = PostCreateData & { error: string } & { message: string };

export const requiedFields = ['title', 'body'];

export const notAuthorizedError = 'To create post you must sign in.';

export enum MaxLength {
   Body = 800,
   Title = 150,
}

export const PostCreateErrors = {
   bodyTooLong: `Body must have less then ${MaxLength.Body} characters.`,
   titleTooLong: `Title must have less then ${MaxLength.Title} characters.`,
};

export enum PostCreateMessages {
   PostCreatedSuccessfully = 'Post created successfully.',
}

export const useStyles = makeStyles((theme: Theme) => ({
   imageWrapper: {
      alignSelf: 'flex-start',
      display: 'flex',
      alignItems: 'center',
   },
   form: {
      marginTop: theme.spacing(1),
      width: '100%',
   },
   paper: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(8),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));
