import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
   card: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
   },
   cardContent: {
      flexGrow: 1,
   },
   cardGrid: {
      paddingBottom: theme.spacing(8),
      paddingTop: theme.spacing(8),
   },
   cardMedia: {
      paddingTop: '56.25%', // 16:9
   },
   footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
   },
   heroButtons: {
      marginTop: theme.spacing(4),
   },
   heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
   },
   icon: {
      marginRight: theme.spacing(2),
   },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
   const classes = useStyles({});

   return (
      <>
         <CssBaseline />
         <AppBar position="relative">
            <Toolbar>
               <Typography variant="h6" color="inherit" noWrap>
                  Album layout
           </Typography>
            </Toolbar>
         </AppBar>
         <main>
            <div className={classes.heroContent}>
               <Container maxWidth="sm">
                  <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                     Album layout
             </Typography>
                  <Typography variant="h5" align="center" color="textSecondary" paragraph>
                     Something short and leading about the collection below—its contents, the creator, etc.
                     Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                     entirely.
             </Typography>
                  <div className={classes.heroButtons}>
                     <Grid container spacing={2} justify="center">
                        <Grid item>
                           <Button variant="contained" color="primary">
                              Main call to action
                   </Button>
                        </Grid>
                        <Grid item>
                           <Button variant="outlined" color="primary">
                              Secondary action
                   </Button>
                        </Grid>
                     </Grid>
                  </div>
               </Container>
            </div>
            <Container className={classes.cardGrid} maxWidth="md">
               <Grid container spacing={4}>
                  {cards.map((card) => (
                     <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                           <CardMedia
                              className={classes.cardMedia}
                              image="https://source.unsplash.com/random"
                              title="Image title"
                           />
                           <CardContent className={classes.cardContent}>
                              <Typography gutterBottom variant="h5" component="h2">
                                 Heading
                     </Typography>
                              <Typography>
                                 This is a media card. You can use this section to describe the content.
                     </Typography>
                           </CardContent>
                           <CardActions>
                              <Button size="small" color="primary">
                                 View
                     </Button>
                              <Button size="small" color="primary">
                                 Edit
                     </Button>
                           </CardActions>
                        </Card>
                     </Grid>
                  ))}
               </Grid>
            </Container>
         </main>
      </>
   );
}
