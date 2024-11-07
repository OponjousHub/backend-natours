import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51Q69jWLuxj0LewPQmIm1f6EEtSDQ9IBL671ziw6gsAdnCQzjJIrpnZVGyFHtaASuG9XMrjIBBcYByrU864yiljMb00MV84TZGo'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    console.log(session);
    // 2) Create checkout form and charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
