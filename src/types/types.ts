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
  name: string;
  imageUri: string;
  animationUri: string;
  selected: boolean;
}
export interface StyleListProps {
  [key: number]: StyleProps;
}
export type ProductProps = {
  id: BigNumber;
  name: string;
  price: BigNumber;
  qty: number;
  contractType: BigNumber;
  category: BigNumber;  
  sale: boolean;
  url: string;

  type: BigNumber;
  supply: number;
  maxUnits: number;
  mediaUrl: string;
  description: string;

  ids: BigNumber[]
  styleId: BigNumber  
};
export type ProductStateProps = {
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
export interface CartItemProps {
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
  pendingItem: CartItemProps
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

export interface RefObject {
  uploadImage: (fileName: string) => void
}