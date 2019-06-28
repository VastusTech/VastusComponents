import {expect} from 'chai';
import {
  getObjectFromCache,
  getAttributeFromObject,
  getObjectAttributeWithItemType,
  getObjectAttribute
} from "../CacheRetrievalHelper";

describe("CacheRetrievalHelper.js", function () {
  it('Gets an object attribute correctly', () => {
    const reducer = {
      clients: {
        CL0000001: {
          attribute1: "value",
          attribute2: "value",
          attribute3: ["value", "value", "value"]
        }
      }
    };
    expect(getObjectAttribute("CL0000001", "attribute1", reducer)).to.be.equal("value");
    expect(getObjectAttribute("CL0000001", "attribute2", reducer)).to.be.equal("value");
    expect(getObjectAttribute("CL0000001", "attribute3", reducer)).to.eql(["value", "value", "value"]);
    expect(getObjectAttribute("CL0000001", "attribute3Length", reducer)).to.be.equal(3);
    expect(getObjectAttributeWithItemType("CL0000001", "Client", "attribute1", reducer)).to.be.equal("value");
    expect(getObjectAttributeWithItemType("CL0000001", "Client", "attribute2", reducer)).to.be.equal("value");
    expect(getObjectAttributeWithItemType("CL0000001", "Client", "attribute3", reducer)).to.eql(["value", "value", "value"]);
    expect(getObjectAttributeWithItemType("CL0000001", "Client", "attribute3Length", reducer)).to.be.equal(3);

  });

  it('Gets attribute from object successfully', () => {
    const object = {
      attribute1: "value",
      attribute2: "value",
      attribute3: ["value", "value", "value"]
    };
    expect(getAttributeFromObject(object, "attribute1")).to.be.equal("value");
    expect(getAttributeFromObject(object, "attribute2")).to.be.equal("value");
    expect(getAttributeFromObject(object, "attribute3")).to.eql(["value", "value", "value"]);
    expect(getAttributeFromObject(object, "attribute3Length")).to.be.equal(3);
  });

  it('Gets the object from the reducer correctly', () => {
    const reducer = {
      clients: {
        CL0001: "id1",
        CL0002: "id2",
      }
    };
    expect(getObjectFromCache("CL0001", reducer)).to.be.equal("id1");
    expect(getObjectFromCache("CL0002", reducer)).to.be.equal("id2");
  });
});