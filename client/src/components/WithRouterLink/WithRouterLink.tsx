import * as React from 'react';
import {
   Link as RouterLink,
   LinkProps as RouterLinkProps,
} from 'react-router-dom';

const WithRouterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
   <RouterLink to={props.to || '/'} innerRef={ref} {...props} />
));

export default WithRouterLink;
