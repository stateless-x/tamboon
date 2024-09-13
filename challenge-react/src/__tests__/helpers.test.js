import { summaryDonations, formatCurrency } from '../helpers';

describe('helpers', function () {
  test('`summaryDonations` should calculate donations correctly', function () {
    expect(summaryDonations([1, 2, 3, 4])).toEqual(10);
  });

  test('correctly formats amount with comma', () => {
    const result = formatCurrency('1000');
    expect(result).toBe('1,000');
  });

  test('correctly return empty string', () => {
    const result = formatCurrency('');
    expect(result).toBe('');
  });
});
