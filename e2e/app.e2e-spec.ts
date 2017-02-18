import { TrkAppPage } from './app.po';

describe('trk-app App', function() {
  let page: TrkAppPage;

  beforeEach(() => {
    page = new TrkAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
