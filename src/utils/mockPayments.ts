import nock from 'nock';

const setupMocks = () => {
  nock('https://api.stripe.com')
    .post('/v1/charges')
    .reply(200, { id: 'ch_1JH2Yc2eZvKYlo2Cf5uNAd7v' });

  nock('https://api.paypal.com')
    .post('/v1/payments/payment')
    .reply(200, { id: 'PAY-123456789012' });
};

export default setupMocks;
