// DonationForm.jsx

import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleNameChange = (event) => {
    setDonorName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      // Call your server to create a Checkout Session
      const response = await fetch('http://localhost:4000/medicinereminder/create-checkout-session', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: donationAmount,
          currency: 'cad',
          donorName: donorName,
        }),
      });

      if (!response.ok) {
        console.error('Error fetching payment intent');
        return;
      }

      const { clientSecret, error } = await response.json();

      if (error) {
        setPaymentError(error.message);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: donorName,
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          console.log('Payment succeeded!');
          setIsPaymentSuccessful(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Donate Now
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Enter Donation Amount"
              type="number"
              step="0.01"
              value={donationAmount}
              onChange={handleAmountChange}
              fullWidth
              variant="outlined"
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Donor Name"
              value={donorName}
              onChange={handleNameChange}
              fullWidth
              variant="outlined"
              style={{ marginBottom: '20px' }}
            />
            <br />
            <Typography variant="subtitle1" gutterBottom>
              Card Details:
            </Typography>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!stripe}
              style={{ marginTop: '20px' }}
            >
              Submit Donation
            </Button>
          </form>
          {paymentError && (
            <Typography variant="body1" color="error" style={{ marginTop: '20px' }}>
              Payment Error: {paymentError}
            </Typography>
          )}
          {isPaymentSuccessful && (
            <Typography variant="h6" color="primary" style={{ marginTop: '20px' }}>
              Thank you, {donorName}, for your donation!
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default DonationForm;
