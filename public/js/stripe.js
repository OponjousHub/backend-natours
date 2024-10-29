import axios from 'axios';
const stripe = Stripe(
  'pk_test_51Q69jWLuxj0LewPQmIm1f6EEtSDQ9IBL671ziw6gsAdnCQzjJIrpnZVGyFHtaASuG9XMrjIBBcYByrU864yiljMb00MV84TZGo'
);

export const bookTour = async (tourId) => {
  try {
    console.log(tourId);
    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout form and charge credit card
  } catch (err) {
    console.log(err);
  }
};
