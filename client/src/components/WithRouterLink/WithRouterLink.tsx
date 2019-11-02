import * as React from 'react';
import {
   Link as RouterLink,
   LinkProps as RouterLinkProps,
} from 'react-router-dom';

const WithRouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
   <RouterLink innerRef={ref} {...props} />
));

export default WithRouterLink;
