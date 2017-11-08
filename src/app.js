export class AppComponent {
  configureRouter(config, router) {
    this.router = router;
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'],        name: 'home',            moduleId: 'chat' },
      { route: 'test/:id',              name: 'justatest',       moduleId: 'test' }
    ]);
  }
}
