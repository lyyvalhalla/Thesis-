
API = Instajam.init({
    clientId: '34702611',
    redirectUri: 'http://yiyang-liang.com/web/insta/',
    scope: ['basic', 'comments']
});

// Get the profile of the authenticated user.
API.user.self.profile(function(response) {


	var results = JSON.stringify(response, null, '  ');
    console.log(results);
});
