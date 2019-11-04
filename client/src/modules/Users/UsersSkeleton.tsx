import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme: Theme) =>
   createStyles({
      card: {
         margin: `${theme.spacing(2)}px auto`,
         maxWidth: 380,
      },
      media: {
         height: 20,
      },
   }),
);

const UsersSkeleton: React.FC = () => {
   const classes = useStyles({});
   const amount = [0, 1, 2];

   return (
      <>
         {amount.map((elem) => (
            <Card className={classes.card} key={elem}>
               <CardHeader
                  avatar={<Skeleton variant="circle" width={40} height={40} />}
                  title={<Skeleton height={6} width="80%" />}
                  subheader={<Skeleton height={6} width="40%" />}
               />
               <CardContent>

                  <React.Fragment>
                     <Skeleton height={6} />
                     <Skeleton height={6} width="80%" />
                  </React.Fragment>

               </CardContent>
               <Skeleton variant="rect" className={classes.media} />
            </Card>
         ))}
      </>
   );
};

export default UsersSkeleton;
