import { expect } from 'chai';
import {convertToISOString} from '../TimeHelper';

it('Converts to ISO String Correctly', () => {
    const date = convertToISOString(new Date(2000, 3, 15));
    expect(date).to.be.equal("2000-03-15");
});
