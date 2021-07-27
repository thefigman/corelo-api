import admin from "firebase-admin";
import "reflect-metadata";
require("dotenv").config();
import { TokenModel } from "../entities/Token";
const serviceAccount = require("../../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://phoenix-coin-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();

const ENVIRONMENT = process.env.ENVIRONMENT;

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
    .connect("mongodb+srv://quavimartdbprodadmin:gLHGrJy25qWwtTf6211814@cluster0.lekor.mongodb.net/corelo?authSource=admin&replicaSet=atlas-y2myxm-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
    .then(() => {
      console.log("Connected");
      mongoose.set("useFindAndModify", false);
      migrate();
    })
    .catch((err) => console.log(err));
};

async function migrate() {
  let ref = firestore.collection("tokens");

  await ref.get().then(async (querySnapshot) => {
    querySnapshot.forEach(async (doc) => {
      let token = doc.data();
      token.isValidated = true
      console.log(token);
      await new TokenModel(token).save();
    });
  });
}

connectToDatabase();
