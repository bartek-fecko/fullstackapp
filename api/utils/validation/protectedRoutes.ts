import expressJwt from 'express-jwt';
require('dotenv').config();

export const protectRoutes = expressJwt({
   secret: process.env.JWT_SECRET,
});
