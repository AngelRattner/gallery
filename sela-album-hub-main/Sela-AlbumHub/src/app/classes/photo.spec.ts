import { Photo } from '../classes/photo';

describe('Photo', () => {
  it('should create an instance', () => {
    expect(new Photo("caption", "categories", "location", "favorite", "privateMode", "id")).toBeTruthy();
  });
});
