import mongoose, { Document, Schema } from 'mongoose';
import { IOrder } from './order';

export interface IPayment extends Document {
  order: IOrder['_id'];
  amount: number;
  paymentMethod: string;
  status: string;
}

const PaymentSchema: Schema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

const Payment = mongoose.model<IPayment>('Payment', PaymentSchema);
export default Payment;