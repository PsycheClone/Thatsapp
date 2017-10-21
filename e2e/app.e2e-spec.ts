import { ThatsappPage } from './app.po';

describe('thatsapp App', function() {
  let page: ThatsappPage;

  beforeEach(() => {
    page = new ThatsappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
