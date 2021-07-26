import { Field, InputType, ObjectType } from "type-graphql";
import ItokenSocial from "../interfaces/ITokenSocial";
import { Mongoose } from "mongoose";
const mongoose = require("mongoose") as Mongoose;

@ObjectType()
export class TokenSocial extends mongoose.Document implements ItokenSocial {
  @Field()
  name: string;

  @Field()
  url: string;
}

@InputType()
export class TokenSocialInput implements ItokenSocial {
  @Field()
  name: string;

  @Field()
  url: string;
}

export const TokenSocialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});
