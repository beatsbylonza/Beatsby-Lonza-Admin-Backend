const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const stripe = require('stripe')(process.env.STRIPE_API_KEY,{
  apiVersion: '2020-08-27',
  appInfo: { // For sample support and debugging, not required for production:
    name: "stripe-samples/accept-a-payment/custom-payment-flow",
    version: "0.0.2",
    url: "https://github.com/stripe-samples"
  }
});

const router = express.Router();

router.post('/create-payment-intent',


async (req, res) => {
  const {paymentMethodType, currency, paymentMethodOptions} = req.body;

  const params = {
    payment_method_types: [paymentMethodType],
    amount: 1999,
    currency: currency,
  }


  if(paymentMethodType === 'acss_debit') {
    params.payment_method_options = {
      acss_debit: {
        mandate_options: {
          payment_schedule: 'sporadic',
          transaction_type: 'personal',
        },
      },
    }
  } else if (paymentMethodType === 'konbini') {

    params.payment_method_options = {
      konbini: {
        product_description: 'Tシャツ',
        expires_after_days: 3,
      },
    }

  }
  
  if (paymentMethodOptions) {
    params.payment_method_options = paymentMethodOptions
  }


  try {

    const paymentIntent = await stripe.paymentIntents.create(params);
    
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
}

);

module.exports = router;