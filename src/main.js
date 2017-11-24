import environment from './environment';

//Configure Bluebird Promises.
Promise.config({
  longStackTraces: environment.debug,
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources')

    .plugin('aurelia-api', configure => {
      configure
        .registerEndpoint('auth', 'http://localhost:3000')
        .registerEndpoint('login', '/login')
        .registerEndpoint('register', '/register')
        .registerEndpoint('chat', '/chat');
    })

  .plugin('aurelia-authentication', baseConfig => {
    baseConfig.configure({
      endpoint: 'auth',                   // '' for the default endpoint
      configureEndpoints: ['auth', 'login', 'register', 'chat'], // '' for the default endpoint});
      loginRoute: 'login',
      signupUrl: 'register',
      logoutRedirect: 'login',
      refreshTokenUrl: null,
      useRefreshToken: false,
    });
  });

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => aurelia.setRoot());
}
