import { Field, InputType, ObjectType } from "type-graphql";
import ItokenSocial from "../interfaces/ITokenSocial";
import { Mongoose } from "mongoose";
const mongoose = require("mongoose") as Mongoose;

@ObjectType()
export class TokenSocial extends mongoose.Document implements ItokenSocial {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  url?: string;
}

@InputType()
export class TokenSocialInput implements ItokenSocial {
  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  url?: string;
}

export const TokenSocialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: false,
  },
});
