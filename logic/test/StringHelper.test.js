import "../../testing/SetTesting";
import {removeWhiteSpace} from "../StringHelper";
import {expect} from "chai";

describe("remove whitespace function", function () {
    it("Does not edit the original string", () => {
        const str = "asdf asdf";
        const strCopy = "asdf asdf";
        removeWhiteSpace(str);
        expect(str).to.equal(strCopy);
    });
    it("Removes the spaces from the string", () => {
        expect(removeWhiteSpace("asdf asdf")).to.equal("asdfasdf");
    });
    it("Removes the tabs from the string", () => {
        expect(removeWhiteSpace("asdf\tasdf")).to.equal("asdfasdf");
    });
    it("Removes tabs and spaces from the string", () => {
        expect(removeWhiteSpace("asdf\t\t  \t asdf")).to.equal("asdfasdf");
    });
    it("Does not remove any end lines", () => {
        expect(removeWhiteSpace("asdf\n   \t  \tasdf")).to.equal("asdf\nasdf");
    });
});