import express from 'express';
import path from 'path';
import morgan from 'morgan';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import graphqlHTTP from 'express-graphql';
import indexRoutes from './routes';
import schema from './schema';
import root from './resolvers';

const app = express();
const isDev = process.env.NODE_ENV === 'development';

// All environments
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRoutes);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: isDev,
  }),
);

if (isDev) {
  app.use(errorHandler());
}

export default app;
