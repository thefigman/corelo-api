import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { TokenInput, TokenModel } from "../entities/Token";
import Itoken from "../interfaces/Itoken";

@Resolver()
export default class TokenResolver {
  @Mutation(() => Boolean)
  async addToken(@Arg("token") token: TokenInput) {
    let newToken = token as Itoken;
    newToken.timeAdded = new Date().getTime();
    await new TokenModel(newToken).save();
    return true;
  }

  @Query(()=> Boolean)
  async test() {
    return true;
  }
}
