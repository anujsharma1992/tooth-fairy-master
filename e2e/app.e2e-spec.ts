import { SocialAppPage } from './app.po';

describe('social-app App', () => {
  let page: SocialAppPage;

  beforeEach(() => {
    page = new SocialAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
