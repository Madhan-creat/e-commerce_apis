import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './user';
import { IProduct } from './product';

export interface IOrder extends Document {
  user: IUser['_id'];
  products: { product: IProduct['_id']; quantity: number }[];
  totalAmount: number;
  status: string;
}

const OrderSchema: Schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;
