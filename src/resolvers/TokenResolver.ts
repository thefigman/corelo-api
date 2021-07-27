import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Token, TokenInput, TokenModel, TokenQuery } from "../entities/Token";
import Itoken from "../interfaces/Itoken";
import { Mongoose } from "mongoose";
const mongoose = require("mongoose") as Mongoose;

@Resolver()
export default class TokenResolver {
  @Mutation(() => Boolean)
  async addToken(@Arg("token") token: TokenInput) {
    let newToken = token as Itoken;
    newToken.timeAdded = new Date().getTime();
    await new TokenModel(newToken).save();
    return true;
  }

  @Query(() => [Token], { nullable: true })
  async tokens(@Arg("where", { nullable: true }) where: TokenQuery) {
    let query = {};
    let orderby = {};

    if (where.regex) {
      query = {
        $or: [{ name: new RegExp(where.regex) }, { symbol: new RegExp(where.regex) }],
      };
    } else if (where.group == "most-popular") {
      orderby["votes"] = -1;
    } else if (where.group == "latest") {
      orderby["timeAdded"] = -1;
    } else if (where.group == "launching") {
      orderby["launchDate"] = 1;
      query = {
        launchDate: {
          $gt: new Date().getTime(),
        },
      };
    } else if (where.group == "launched") {
      orderby["launchDate"] = 1;
      query = {
        launchDate: {
          $lt: new Date().getTime(),
        },
      };
    } else if (where.group == "presale-ongoing") {
      // start from the oness about to end
      orderby["presaleEndDate"] = 1;
      query = {
        $and: [
          {
            // already started
            presaleStartDate: { $lt: new Date().getTime() },
          },
          {
            // but not yet ended
            presaleEndDate: { $gt: new Date().getTime() },
          },
        ],
      };
    } else if (where.group == "presale-ongoing") {
      // start from the ones about to start
      orderby["presaleStartDate"] = 1;
      query = {
        $and: [
          {
            // not yet started
            presaleStartDate: { $gt: new Date().getTime() },
          },
          {
            // but not yet ended
            presaleEndDate: { $gt: new Date().getTime() },
          },
        ],
      };
    } else if (where.group == "presale-ended") {
      // start from the ones that just ended
      orderby["presaleEndDate"] = 1;
      query = {
        $and: [
          {
            // already started
            presaleStartDate: { $lt: new Date().getTime() },
          },
          {
            // already ended
            presaleEndDate: { $gt: new Date().getTime() },
          },
        ],
      };
    }

    if (where.categories) {
      if (query["$and"]) {
        query["$and"].push({
          categories: {
            $in: where.categories,
          },
        });
      } else {
        query = {
          categories: {
            $in: where.categories,
          },
        };
      }
    }

    let tokens = TokenModel.find(query).sort(orderby).limit(18);

    if (where.page) {
      tokens.skip(where.page * 18);
    }

    return await tokens;
  }

  @Query(() => Boolean)
  async test() {
    return true;
  }
}
