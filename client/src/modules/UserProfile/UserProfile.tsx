import { Card } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import React = require('react');

const UserProfile = () => {
   const useStyles = makeStyles({
      card: {
         margin: '0 auto',
         maxWidth: '70vw',
      },
   });
   const classes = useStyles({});

   return (
      <Card className={classes.card}>
         <CardActionArea>
            <CardContent>
               <Typography gutterBottom variant="h5" component="h2">
                  Lizard
               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
               </Typography>
            </CardContent>
         </CardActionArea>
         <CardActions>
            <Button size="small" color="primary">
               Share
        </Button>
            <Button size="small" color="primary">
               Learn More
        </Button>
         </CardActions>
      </Card>
   );
};

export default UserProfile;
