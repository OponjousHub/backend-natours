const login = async (email, password) => {
  console.log(email, password);

  try {
    const ress = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (ress.data.status === 'success') {
      alert('Successfully logged in');
      window.setTimeout(() => {
        location.assign('/');
      });
    }
    console.log(ress);
  } catch (err) {
    alert(err.response.data.message);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
