// Recupera l'ID dell'utente dalla URL
const userId = window.location.pathname.split('/')[1];

// Aggiorna il testo dell'elemento HTML con l'ID dell'utente
document.getElementById('user-id').textContent = userId;

// Funzione per scambiare il codice di autorizzazione con un token di accesso
async function exchangeCodeForToken(code) {
  const response = await fetch('/login/authorized', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      code: code
    })
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  const data = await response.json();
  return data.access_token;
}

// Funzione per recuperare l'ID dell'utente dal token di accesso
async function getUserIdFromToken(token) {
  const response = await fetch('https://api.twitch.tv/helix/users', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Client-ID': 'ph57stbdbis41hl9udmfdpkjjxyyp5'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get user ID from token');
  }

  const data = await response.json();
  return data.data[0].id;
}

// Gestore di eventi per il clic sul pulsante "Login with Twitch"
document.getElementById('twitch-login').addEventListener('click', async (event) => {
  event.preventDefault();

  try {
    // Effettua il login con Twitch
    const url = '/id.twitch.tv/oauth2/authorize?client_id=ph57stbdbis41hl9udmfdpkjjxyyp5&redirect_uri=https%3A%2F%2Fgowstbot.com%2Flogin%2Fauthorized&response_type=code&scope=&state=%7B%22force_verify=false';
    const windowName = 'twitchLogin';
    const windowOptions = 'width=500,height=800';
    const twitchWindow = window.open(url, windowName, windowOptions);

    // Attende il completamento del login
    const code = await new Promise((resolve, reject) => {
      const intervalId = setInterval(() => {
        if (twitchWindow.closed) {
          clearInterval(intervalId);
          reject(new Error('Twitch login window closed'));
        } else if (twitchWindow.location.href.startsWith('https://gowstbot.com/login/authorized')) {
          const urlParams = new URLSearchParams(twitchWindow.location.search);
          const code = urlParams.get('code');
          clearInterval(intervalId);
          twitchWindow.close();
          resolve(code);
        }
      }, 1000);
    });

    // Scambia il codice di autorizzazione con un token di accesso
    const token = await exchangeCodeForToken(code);

    // Recupera l'ID dell'utente dal token di accesso
    const userId = await getUserIdFromToken(token);

    // Reindirizza l'utente sulla pagina dashboard.html
    window.location.href = `/${userId}/dashboard`;
  } catch (error) {
    console.error(error);
    alert('Failed to login with Twitch');
  }
});

// Definizione delle rotte del server
const express = require('express');
const app = express();

app.post('/login/authorized', async (req, res) => {
  try {
    const code = req.body.code;

    // Scambia il codice di autorizzazione con un token di accesso
    const token = await exchangeCodeForToken(code);

    // Recupera l'ID dell'utente dal token di accesso
    const userId = await getUserIdFromToken(token);

    // Reindirizza l'utente sulla pagina dashboard.html
    res.redirect(`/${userId}/dashboard`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/:user_id/dashboard', async (req, res) => {
  try {
    const userId = req.params.user_id;

    // Verifica che l'utente sia autorizzato
    const authorized = await isUserAuthorized(userId, req.cookies.access_token);

    if (!authorized) {
      // Se l'utente non è autorizzato, reindirizza l'utente sulla pagina di login
      res.redirect('/');
      return;
    }

    // Renderizza la pagina dashboard.html
    res.render('dashboard', { user_id: userId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Avvia il server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});