import ICartItem from "../../features/cart/types/ICartItem"

interface IRootState {
  cartProducts: ICartItem[];
  cartQuantity: number;
  deliveryCost: string;
}

export type { IRootState };
