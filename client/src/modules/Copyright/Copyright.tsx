import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';

export const Copyright: React.FC = () => {
   return (
      <Typography variant="body2" color="textSecondary" align="center">
         {'Copyright © '}
         <Link color="inherit" href="/">
            FullStackApp
      </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}
