import { buildSchema } from "type-graphql";
import "reflect-metadata";
require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import cookieparser from "cookieparser";
import cors from "cors";
import TokenResolver from "./resolvers/TokenResolver";

const ENVIRONMENT = process.env.ENVIRONMENT;
const MACHINE = process.env.MACHINE;

console.log(process.env.DB_ADDRESS);

const connectToDatabase = async () => {
  const mongoose = require("mongoose");

  let dbAddress;

  if (ENVIRONMENT == "production") {
    dbAddress = process.env.DB_ADDRESS;
  } else {
    dbAddress = process.env.STAGING_DB_ADDRESS;
  }

  console.log(dbAddress);

  await mongoose
    .connect(
      dbAddress
    )
    .then(() => {
      console.log("Connected");
      mongoose.set("useFindAndModify", false);
      initServer();
    })
    .catch((err) => console.log(err));
};

const initServer = async () => {
  try {
    const apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [TokenResolver],
        validate: true,
      }),
      // context: ({ req, res, connection }) => {
      //   return { req, res, connection };
      // },
      debug: true,
    });
  
    const app = express();
    app.use(
      cors({
        credentials: true,
        origin: process.env.CLIENT?.split(" "),
      })
    );
    app.use(function (req, res, next) {
      let originalSend = res.send;
      // @ts-ignore
      res.send = function (data) {
        originalSend.apply(res, Array.from(arguments));
      };
      next();
    });
  
    apolloServer.applyMiddleware({ app, cors: false, path: "/" });
    const port = process.env.PORT;
  
    const httpServer = http.createServer(app);
    // set a 10-second timeout for requests
    httpServer.setTimeout(10 * 1000);
    apolloServer.installSubscriptionHandlers(httpServer);
  
    httpServer.listen(port, () => {
      console.log(`server started at port http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error)
  }

  // store company data in the redis cache
};

connectToDatabase();
