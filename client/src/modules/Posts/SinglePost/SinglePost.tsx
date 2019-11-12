import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import { Post } from '#/store/PostsStore/constants';
import { CardMedia, Chip, Container, CssBaseline, Link, Typography } from '@material-ui/core';
import * as React from 'react';
import { Redirect, useParams } from 'react-router';
import useLocalStorage from 'react-use-localstorage';
import * as C from './constants';
import SinglePostSkeleton from './SinglePostSkeleton';

const SinglePost: React.FC = () => {
   const [loggedInUserAndtoken] = useLocalStorage('jwt-token');
   const [serverError, setServerError] = React.useState<string | boolean>(false);
   const [post, setPost] = React.useState<Post>();
   const [isLoading, setLoading] = React.useState(true);
   const params: { postId?: string } = useParams();

   React.useEffect(() => {
      getPost();
   }, []);

   const getPost = async () => {
      try {
         const response = await fetch(`/api/posts/${params.postId}`, {
            headers: {
               Accept: 'application/json',
               Authorization: `Bearer ${JSON.parse(loggedInUserAndtoken).token}`,
            },
         });
         const data: C.ServerResponse = await response.json();

         if (data.error) {
            return setServerError(data.error);
         }
         setPost(data);
         setLoading(false);
      } catch (err) {
         if (err.message) {
            setServerError(err.message);
         } else {
            setServerError(JSON.stringify(err));
         }
      }
   };

   const classes = C.useStyles({});

   return (
      <>
         {!loggedInUserAndtoken && (
            <Redirect to={{
               pathname: '/',
               state: {
                  error: C.notAuthorizedError,
               },
            }} />
         )}
         <CssBaseline />
         {serverError
            ? <Chip label={serverError} color="secondary" />
            : isLoading
               ? <SinglePostSkeleton />
               : post && (
                  <Container maxWidth="sm">
                     <div className={classes.mainImageWrapper}>
                        <CardMedia
                           component="img"
                           alt={post.title}
                           height="140"
                           image={`/api/posts/photo/${post._id}`}
                           title="Contemplative Reptile"
                           className={classes.mainImage}
                        />
                        <Link
                           className={classes.postedBy}
                           component={WithRouterLink}
                           to={`/users/${post.postedBy._id}`}
                        >
                           <i>posted by</i> {post.postedBy.name}
                        </Link>
                     </div>
                     <Typography
                        variant="h4"
                        gutterBottom
                        className={classes.title}
                     >
                        {post.title}
                     </Typography>
                     <Typography variant="body2" color="textSecondary">
                        created {new Date(post.created).toDateString()}
                     </Typography>
                     <Typography>
                        {post.body}
                     </Typography>
                  </Container>
               )}
      </>
   );
};

export default SinglePost;
