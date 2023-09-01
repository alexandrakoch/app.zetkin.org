import { stringToBool } from './stringUtils';
import { truncateOnMiddle } from './stringUtils';

describe('stringToBool()', () => {
  // Returns false
  it('Returns false if passed undefined value ', () => {
    const value = undefined;
    expect(stringToBool(value)).toEqual(false);
  });
  it('Returns false if passed empty string', () => {
    expect(stringToBool('')).toEqual(false);
  });
  it('Returns false if passed string "0"', () => {
    expect(stringToBool('0')).toEqual(false);
  });
  it('Returns false if passed a string other than the word "true"', () => {
    expect(stringToBool('false')).toEqual(false);
    expect(stringToBool('Cosmo Kramer')).toEqual(false);
  });

  // Return true
  it('Returns true if passed a non-zero number as string', () => {
    expect(stringToBool('1')).toEqual(true);
    expect(stringToBool('999')).toEqual(true);
    expect(stringToBool('-1')).toEqual(true);
  });
  it('Returns true if passed the word "true" with any capitalisation', () => {
    expect(stringToBool('true')).toEqual(true);
    expect(stringToBool('TRUE')).toEqual(true);
    expect(stringToBool('TrUe')).toEqual(true);
  });
});

describe('truncateOnMiddle()', () => {
  it('Truncates a string on whitespaces if possible, making a string shorter than a given maxLength', () => {
    const maxLength = 40;
    const string = truncateOnMiddle(
      'Do you have fascinating facts about feminist political beliefs?',
      40
    );
    expect(string).toEqual('Do you have...beliefs?');
    expect(string.length).toBeLessThanOrEqual(maxLength);
  });
  it("Doesn't truncate if the string is below the length", () => {
    expect(
      truncateOnMiddle(
        'Do you have fascinating facts about feminist political beliefs?',
        500
      )
    ).toEqual(
      'Do you have fascinating facts about feminist political beliefs?'
    );
  });
  it('Falls back to old behaviour if no whitespaces are found, plain truncation to a length shorter than given maxLength, including elipsis', () => {
    const maxLength = 20;
    const string = truncateOnMiddle(
      'Supercalifragilisticexpialidocious',
      maxLength
    );
    expect(string).toEqual('Supercal...idocious');
    expect(string.length).toBeLessThanOrEqual(maxLength);
  });
});
