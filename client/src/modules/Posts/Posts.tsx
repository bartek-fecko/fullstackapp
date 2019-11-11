import ErrorChip from '#/components/ErrorChip/ErrorChip';
import WithRouterLink from '#/components/WithRouterLink/WithRouterLink';
import AppState from '#/config/appState';
import { requestPosts } from '#/store/PostsStore/actions';
import {
   Button,
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Grid,
   Typography,
} from '@material-ui/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isArray } from 'util';
import * as C from './constants';

const Posts: React.FC = () => {
   const dispatch = useDispatch();
   const posts = useSelector((state: AppState) => state.posts.data);
   const isLoading = useSelector((state: AppState) => state.posts.isLoading);
   const error = useSelector((state: AppState) => state.posts.error);

   React.useEffect(() => {
      dispatch(requestPosts());
   }, []);

   const classes = C.useStyles({});

   return (
      <>
         {error ? <ErrorChip />
            : isLoading ? 'loading...'
               :
               <Grid container spacing={4}>
                  {isArray(posts) && posts.map(({
                     _id, title, body, hasPhoto,
                  }) => (
                        <Grid item key={_id} xs={12} sm={6} md={4}>
                           <Card className={classes.card}>
                              <CardMedia
                                 className={classes.cardMedia}
                                 image={`/api/posts/photo/${_id}`}
                                 title="Image title"
                              />
                              <CardContent className={classes.cardContent}>
                                 <Typography gutterBottom variant="h5" component="h2">
                                    {title}
                                 </Typography>
                                 <Typography className={classes.body}>
                                    {body}
                                 </Typography>
                              </CardContent>
                              <CardActions className={classes.fadeButtonWrapper}>
                                 <Button size="small" color="primary">
                                    View
                                 </Button>
                              </CardActions>
                           </Card>
                        </Grid>
                     ))}
               </Grid>
         }
      </>
   );
};

export default Posts;
