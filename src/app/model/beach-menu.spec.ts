import { BeachMenu } from './beach-menu';

describe('BeachMenu', () => {
  it('should create an instance', () => {
    expect(new BeachMenu('Burger', 'Delicious burger', 10, 'Burgers')).toBeTruthy();
  });
});