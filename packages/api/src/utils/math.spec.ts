import { math } from './math';

describe('math utility', () => {
  it('should evaluate a valid string expression', () => {
    expect(math('2 + 2')).toBe(4);
    expect(math('10 - 5')).toBe(5);
    expect(math('3 * 4')).toBe(12);
    expect(math('20 / 5')).toBe(4);
    expect(math('10 % 3')).toBe(1);
    expect(math('(2 + 3) * 4')).toBe(20);
    expect(math('2.5 * 2')).toBe(5);
  });

  it('should return the number if a number is passed', () => {
    expect(math(42)).toBe(42);
    expect(math(3.14)).toBe(3.14);
  });

  it('should return fallback if input is invalid type and fallback provided', () => {
    // @ts-ignore
    expect(math(true, 10)).toBe(10);
    // @ts-ignore
    expect(math({}, 20)).toBe(20);
    // @ts-ignore
    expect(math(null, 30)).toBe(30);
  });

  it('should throw if input is invalid type and no fallback provided', () => {
    // @ts-ignore
    expect(() => math(true)).toThrow(/should be a string/);
    // @ts-ignore
    expect(() => math({})).toThrow(/should be a string/);
    // @ts-ignore
    expect(() => math(null)).toThrow(/should be a string/);
  });

  it('should return fallback if string has invalid characters and fallback provided', () => {
    expect(math('2 + a', 10)).toBe(10);
    expect(math('eval(2+2)', 20)).toBe(20);
    expect(math('2 + 2; console.log("x")', 30)).toBe(30);
  });

  it('should throw if string has invalid characters and no fallback provided', () => {
    expect(() => math('2 + a')).toThrow(/Invalid characters/);
    expect(() => math('eval(2+2)')).toThrow(/Invalid characters/);
    expect(() => math('2 + 2;')).toThrow(/Invalid characters/);
  });

  it('should throw if string does not evaluate to a number and no fallback provided', () => {
    expect(() => math(' ')).toThrow(/did not evaluate to a number/);
  });

  it('should return fallback if string does not evaluate to a number and fallback provided', () => {
    expect(math(' ', 10)).toBe(10);
  });
});
