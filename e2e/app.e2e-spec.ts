import { SocketPage } from './app.po';

describe('socket App', () => {
  let page: SocketPage;

  beforeEach(() => {
    page = new SocketPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
