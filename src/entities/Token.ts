import { Field, InputType, ObjectType } from "type-graphql";
import Itoken from "../interfaces/Itoken";
import ItokenSocial from "../interfaces/ITokenSocial";
import { TokenSocial, TokenSocialInput, TokenSocialSchema } from "./TokenSocial";
import { Mongoose } from "mongoose";
const mongoose = require("mongoose") as Mongoose;

@ObjectType()
export class Token extends mongoose.Document implements Itoken {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  timeAdded: number;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  // token info
  @Field({ nullable: true })
  network?: string;

  @Field({ nullable: true })
  contractAddress?: string;

  @Field({ nullable: true })
  symbol?: string;

  @Field({ nullable: true })
  decimals?: number;

  // some dynamic token info
  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  marketCap?: number;

  @Field({ nullable: true })
  votes?: number;

  @Field({ nullable: true })
  totalSupply?: string;

  @Field({ nullable: true })
  priceMovementFull?: number;

  @Field({ nullable: true })
  priceMovementPart?: number;

  // socials and about
  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field(() => [TokenSocial], { nullable: true })
  socials?: ItokenSocial[];

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  chartUrl?: string;

  // dates
  @Field({ nullable: true })
  launchDate?: number;

  @Field({ nullable: true })
  presaleStartDate?: number;

  @Field({ nullable: true })
  presaleEndDate?: number;

  @Field({ nullable: true })
  presaleClaimDate?: number;

  // status
  @Field({ nullable: true })
  isValidated?: boolean;

  @Field({ nullable: true })
  isHidden?: boolean;

  @Field({ nullable: true })
  status?: number;
}

@InputType()
export class TokenInput implements Itoken {
  @Field()
  name: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  // token info
  @Field({ nullable: true })
  network?: string;

  @Field({ nullable: true })
  contractAddress?: string;

  @Field({ nullable: true })
  symbol?: string;

  @Field({ nullable: true })
  decimals?: number;

  // some dynamic token info
  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  totalSupply?: string;

  // socials and about
  @Field({ nullable: true })
  website?: string;

  @Field({ nullable: true })
  logoUrl?: string;

  @Field(() => [TokenSocialInput], { nullable: true })
  socials?: ItokenSocial[];

  @Field({ nullable: true })
  about?: string;

  @Field({ nullable: true })
  chartUrl?: string;

  // dates
  @Field({ nullable: true })
  launchDate?: number;

  @Field({ nullable: true })
  presaleStartDate?: number;

  @Field({ nullable: true })
  presaleEndDate?: number;

  @Field({ nullable: true })
  presaleClaimDate?: number;
}

@InputType()
export class TokenQuery {
  @Field({ nullable: true })
  group?: string;

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  regex?: string;
}

export const TokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  categories: [
    {
      type: String, 
      required: false
    }
  ],
  timeAdded: {
    type: Number,
    required: false,
  },
  network: {
    type: String,
    required: false,
  },
  contractAddress: {
    type: String,
    required: false,
  },
  symbol: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  logoUrl: {
    type: String,
    required: false,
  },
  socials: [
    {
      type: TokenSocialSchema,
      required: false,
    },
  ],
  about: {
    type: String,
    required: false,
  },
  chartUrl: {
    type: String,
    required: false,
  },
  launchDate: {
    type: Number,
    required: false,
  },
  presaleStartDate: {
    type: Number,
    required: false,
  },
  presaleEndDate: {
    type: Number,
    required: false,
  },
  presaleClaimDate: {
    type: Number,
    required: false,
  },
  price: {
    type: Number,
    required: false,
  },
  decimals: {
    type: Number,
    required: false,
  },
  marketCap: {
    type: Number,
    required: false,
  },
  votes: {
    type: Number,
    required: false,
  },
  totalSupply: {
    type: Number,
    required: false,
  },
  priceMovementFull: {
    type: Number,
    required: false,
  },
  priceMovementPart: {
    type: Number,
    required: false,
  },
  isValidated: {
    type: Boolean,
    required: false,
  },
  isHidden: {
    type: Boolean,
    required: false,
  },
  status: {
    type: Boolean,
    required: false,
  },
});

export const TokenModel = mongoose.model<Token>("Token", TokenSchema);
