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

// export type TokenProps = {
// export type ProductProps ={
//   // id: string;
//   id: BigNumber;
//   // uri: string;
//   price: BigNumber;
//   name: string;
//   qty: BigNumber;
//   // supply: number;
//   // maxUnits: number;
//   // media: string;
//   contractType: BigNumber;
//   category: BigNumber;
//   sale: boolean;
//   url: string;
// };
export type StyleProps = {
  id: number;
  imageUri: string;
  animationUri: string;
  selected: boolean;
}
export interface StyleListProps {
  [key: number]: StyleProps;
}
export type ProductProps = {
  id: BigNumber;
  // url: string;
  price: BigNumber;
  name: string;
  type: number;
  supply: number;
  maxUnits: number;
  // media: string;
  mediaUrl: string;
  qty: number;
  description: string;
  sale: boolean;
};
export type ProductListProps = {
  loaded: boolean;
  products: ProductProps[];
}

export type TokenCompProps = {
  // token: TokenProps;
  product: ProductProps;
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
  currentPage: string
  total: BigNumber
  items: any
  ids: any
  discount: BigNumber
  cyberProductId: number
  hoodieStyle: string
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
