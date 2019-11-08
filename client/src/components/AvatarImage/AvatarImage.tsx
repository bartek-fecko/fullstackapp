import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ObjectFitProperty } from 'csstype';
import * as React from 'react';

export const useStyles = makeStyles(() =>
   createStyles({
      image: ({ borderRadius, width, objectFit }: Partial<AvatarImageProps>) => ({
         borderRadius,
         height: width,
         objectFit,
         verticalAlign: 'middle',
         width,
      }),
      root: {
         position: 'relative',
      },
   }),
);

export interface AvatarImageProps {
   width?: string;
   borderRadius?: string;
   objectFit?: ObjectFitProperty;
   src: string;
   alt: string;
}

const AvatarImage: React.FC<AvatarImageProps> = ({
   borderRadius = '50%', width = '50px', objectFit = 'cover', children, src, alt,
}) => {

   const classes = useStyles({ borderRadius, width, objectFit });

   return (
      <div className={classes.root}>
         <img
            src={src}
            alt={alt}
            className={classes.image}
         />
         {children}
      </div>
   );
};

export default AvatarImage;
