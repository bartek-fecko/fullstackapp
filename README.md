# FullStackAPP
![Images](https://github.com/bartek-fecko/fullstackapp/master/fulstackapp.png)

features:
register + login system with jwt: 
register: 
   - checking for correct values
   - checking for email exists

login:
   - checking email and password match
   - displays errors, and sucessful messages
   - logout system

user sytem:
   - adding and updating user profile
   - image or user first letter as placeholder if img not 
   - skeleton lodaer when waiting for users

Displaying errors, and sucessful messages 

Preview: https://herokusadfdsf.herokuapp.com/

You can log in with this login and password, or create your own:
login: bartlomiej.fecko@gmail.com password: bartek

project uses final-form, material-ui, express, ts, react, redux, 


project uses enviroment variables:
`MONGO_DB_URI(mongodb database adress), PORT(port to listen), JWT_SECRET(any secret key)`
that mus be supplied when you want to use app.

For some reason heroku can't build backend server(for now) so in order to publish app, it's needed to build it locally, using  `build:local` script before you push it to heroku.

to run development server use `dev` script.

