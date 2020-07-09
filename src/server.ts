import { Request, Response, NextFunction } from "express";
import * as express from "express";
import * as passport from "passport";
import { Strategy } from "passport-github2";
import * as session from "express-session";
import * as morgan from "morgan";

export interface GitHubAuthOptions {
  allowedUsernames?: string[],
  clientID: string,
  clientSecret: string,
  callbackURL: string
}

export interface ExpressServeOptions {
  sessionSecret: string
}

export function createExpressApp({ allowedUsernames, clientID, clientSecret, callbackURL }: GitHubAuthOptions, { sessionSecret }: ExpressServeOptions) {
  passport.use('github', new Strategy({
    clientID,
    clientSecret,
    callbackURL,
  },
    function (accessToken: any, refreshToken: any, profile: any, cb: any) {
      if (allowedUsernames && allowedUsernames.indexOf(profile.username) > -1) {
        return cb(null, profile);
      }
      return cb("User does not have access", null);
    }));


  passport.serializeUser(function (user: any, cb: any) {
    cb(null, user);
  });

  passport.deserializeUser(function (obj: any, cb: any) {
    cb(null, obj);
  });

  // Create a new Express application.
  var app = express();
  app.use(morgan('combined'));
  app.use(session({ secret: sessionSecret, resave: false, saveUninitialized: false }));

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/login/github', passport.authenticate('github'))

  app.get('/login/github/callback',
    passport.authenticate('github', { failureRedirect: '/login/github' }),
    (req: Request, res: Response) => res.redirect('/')
  );

  app.get('/logout', (req: Request, res: Response) => {
    req.logOut();
    res.redirect('/');
  });

  const router = express.Router();

  app.use('/', router);

  router.use("", (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login/github');
    }
  });
  
  router.use('/', express.static('site'));

  return app;
}