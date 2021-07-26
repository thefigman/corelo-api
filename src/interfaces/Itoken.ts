import ItokenSocial from "./ITokenSocial";

export default interface Itoken {
  _id?: string;
  name?: string;
  timeAdded?: number;

  network?: string;
  contractAddress?: string;
  symbol?: string;

  website?: string;
  logoUrl?: string;
  socials?: ItokenSocial[];
  about?: string;
  chartUrl?: string;

  launchDate?: number;
  presaleStartDate?: number;
  presaleEndDate?: number;
  presaleClaimDate?: number;

  price?: string;
  decimals?: number;
  marketCap?: number;
  votes?: number;
  totalSupply?: string;
  priceMovementFull?: number;
  priceMovementPart?: number;

  isValidated?: boolean;
  isHidden?: boolean;
  status?: number;
}
