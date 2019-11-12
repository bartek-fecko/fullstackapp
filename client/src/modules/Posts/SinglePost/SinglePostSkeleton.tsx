import { Container, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import * as React from 'react';

const SinglePostSkeleton: React.FC = () => {

   return (
      <>
         <Container maxWidth="sm">
            <Skeleton variant="rect" />
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={120} />
            </Typography>
            <br></br>
            <Typography gutterBottom component="div">
               <Skeleton width="15%" variant="rect" height={12} />
            </Typography>
            <br></br>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
            <br></br>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
            <Typography gutterBottom component="div">
               <Skeleton variant="rect" height={6} />
            </Typography>
         </Container>
      </>
   );
};

export default SinglePostSkeleton;
