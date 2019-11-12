# FullStackAPP
![Images](https://github.com/bartek-fecko/fullstackapp/blob/master/fulstackapp.png)
A fullstack app. It offers to send posts, edit them, create and manage profile. Sending messages with other users. Project is built with webpack express, and react. 

Preview: https://herokusadfdsf.herokuapp.com/

features:
register + login system with jwt: 
register: 
   - checking for correct values - client/backend
   - dynamic checking for email exists 

login:
   - dynamic checking email and password match
   - displays errors, and sucessful messages - client/backend
   - logout system

post system:
   - adding and updating, deleting posts

user sytem:
   - adding and updating user profile
   - image or user first letter as placeholder if img not added
   - uploading and changing user image
   - delete user profile


 *. skeleton loader for posts and users added
 *. authorization for all routes


project uses final-form, material-ui, express, ts, react, redux, saga


You can log in with this login and password, or create your own:
login: bartlomiej.fecko@gmail.com password: bartek



project uses enviroment variables:
`MONGO_DB_URI(mongodb database adress), PORT(port to listen), JWT_SECRET(any secret key)`
that mus be supplied when you want to use app.
in dev creating .env file, and with command line on the server.
in development it's recomended to use enviroment `HTTPS=false` variable.

For some reason heroku can't build backend server(for now) so in order to publish app, it's needed to build it locally, using  `build:local` script before you push it to heroku.

to run development server use `dev` script.
