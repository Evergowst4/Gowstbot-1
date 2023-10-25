function getChannelName() {
 fetch('https://api.twitch.tv/helix/users', {
   headers: {
     'Authorization': 'Bearer ' + accessToken,
     'Client-ID': clientId
   }
 })
 .then(response => response.json())
 .then(data => {
   const channelName = data.data[0].login;
   const twitchLoginButton = document.getElementById('twitch-login');
   const greeting = document.getElementById('greeting-message');
   
   // Mostra il messaggio
   twitchLoginButton.style.display = 'none';
   greeting.textContent = 'Hey ' + channelName;
 })
 .catch(error => {
   console.error(error);
   twitchLoginButton.style.display = 'none';
   greeting.textContent = 'Oops, qualcosa è andato storto! Riprova piú tardi.';
 });
}