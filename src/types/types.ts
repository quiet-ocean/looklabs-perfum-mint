import { BigNumber } from 'ethers'

declare global {
  interface Window {
    ethereum: any;
  }
}

declare const ethereum: any;

export type ContractPropsDetails = {
  name?: string;
  symbol?: string;
  address?: string;
};

export type UserProps = {
  address: string;
  balance: BigNumber;
};

export type TokenProps = {
  id: string;
  uri: string;
  price: number;
  name: string;
  supply: number;
  maxUnits: number;
  media: string;
};
export type ProductProps = {
  id: string;
  uri: string;
  price: number;
  name: string;
  supply: number;
  maxUnits: number;
  media: string;
};

export type TokenCompProps = {
  token: TokenProps;
  isOnSale?: boolean;
  onTransfer?: boolean;
  onBuy?: boolean;
  onSale?: boolean;
};

export interface OrderProps {
  qty: number;
  productPrice: number;
}

export interface windowSize {
  width: number | string;
  height: number | string;
}

export type ActionProps = {
  type: string;
  payload: any;
};
export type CartItemProps = {
  // token: TokenProps,
  product: any;
  quantity: number;
};
export type CartProps = {
  nav: string
  total: BigNumber
  items: any
  ids: any
  discount: BigNumber
  cyberProductId: number
}
// export interface CartProps {
//   nav: string;
//   total: BigNumber;
//   items: any;
//   ids: any;
// }
export interface GlobalStateInterface {
  cart: CartItemProps[];
}
