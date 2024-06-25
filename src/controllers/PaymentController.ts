import { Request, Response } from 'express';
import axios from 'axios';
import Payment from '../models/payment';
import Order from '../models/order';

const simulateStripePayment = async (amount: number) => {
  try {
    const response = await axios.post('https://api.stripe.com/v1/charges', {
      amount: amount * 100, // Stripe expects the amount in cents
      currency: 'usd',
      source: 'tok_visa', // This is a test token provided by Stripe for testing purposes
      description: 'Test charge'
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Stripe payment failed: ${"payment fail due to some issue"}`);
  }
};

const simulatePaypalPayment = async (amount: number) => {
  try {
    const response = await axios.post('https://api.paypal.com/v1/payments/payment', {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      transactions: [{
        amount: {
          total: amount.toFixed(2),
          currency: 'USD'
        },
        description: 'Test payment'
      }],
      redirect_urls: {
        return_url: 'http://localhost:3000/return',
        cancel_url: 'http://localhost:3000/cancel'
      }
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.PAYPAL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    return console.log(response.data);
  } catch (error) {
    throw new Error(`PayPal payment failed: ${"payment failed due some internal issue"}`);
  }
};

const createPayment = async (req: Request, res: Response) => {
  const { orderId, amount, paymentMethod } = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).send('Order not found');
    }

    // Simulate payment process with external API
    let paymentResponse;
    if (paymentMethod === 'stripe') {
      paymentResponse = await simulateStripePayment(amount);
    } else if (paymentMethod === 'paypal') {
      paymentResponse = await simulatePaypalPayment(amount);
    } else {
      return res.status(400).send('Invalid payment method');
    }

    // Create and save payment record
    const payment = new Payment({
      order: order._id,
      amount,
      paymentMethod,
      status: 'Completed'
    });

    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(500).send('internal error');
  }
};

export default createPayment ;
