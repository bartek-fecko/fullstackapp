import { CardActions, Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';
import * as C from './constants';

const PostsSkeleton: React.FC = () => {
   const classes = C.useStyles({});
   const amount = [0, 1, 2, 3, 4, 5];

   return (
      <>
         {
            amount.map((elem) => (
               <Grid item key={elem} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                     <Skeleton variant="rect" className={classes.cardMedia} />
                     <CardContent className={classes.cardContent}>
                        <Typography gutterBottom >
                           <Skeleton variant="rect" height={6}/>
                        </Typography>
                        <Typography gutterBottom >
                           <Skeleton variant="rect" height={6}/>
                        </Typography>
                        <Typography gutterBottom >
                           <Skeleton variant="rect" height={6}/>
                        </Typography>
                        <Typography gutterBottom>
                           <Skeleton variant="rect" width="15%" height={12} />
                        </Typography>
                     </CardContent>
                  </Card>
               </Grid>
            ))
         }
      </>
   );
};

export default PostsSkeleton;
