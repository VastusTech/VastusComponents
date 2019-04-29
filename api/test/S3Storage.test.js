import "../../testing/SetTesting";
import S3 from "../S3Storage";
import {expect} from "chai";

describe("high level functions", () => {
    // static putImage(path, image, successHandler, failureHandler) {
    it("Should put image correctly", () => {
        expect(S3.putImage("PATH", "IMAGE")).to.be.equal("PATH");
    });
    // static putVideo(path, video, successHandler, failureHandler) {
    it("Should put video correctly", () => {
        expect(S3.putVideo("PATH", "VIDEO")).to.be.equal("PATH");
    });
    // static putVideoOrImage(path, media, successHandler, failureHandler) {
    it("Should put video or image correctly", () => {
        expect(S3.putVideoOrImage("PATH", "MEDIUM")).to.be.equal("PATH");
    });
    // static ifExists(path, successHandler, failureHandler) {
    it("Should check if path exists correctly", () => {
        expect(S3.ifExists("PATH")).to.be.equal("PATH");
    });
});

describe("low level functions", () => {
    // static get(path, successHandler, failureHandler) {
    it("Should get file correctly", () => {
        expect(S3.get("PATH")).to.be.equal("PATH");
    });
    // static put(path, file, contentType, progressHandler, successHandler, failureHandler) {
    it("Should put file correctly", () => {
        expect(S3.put("PATH", "FILE", "CONTENTTYPE")).to.be.equal("PATH");
    });
    // static multipartPut(path, file, contentType, progressHandler, successHandler, failureHandler) {
    it("Should multipart put file correctly", () => {
        expect(S3.multipartPut("PATH", "FILE", "CONTENTTYPE")).to.be.equal("PATH");
    });
    // static delete(path, successHandler, failureHandler) {
    it("Should delete file correctly", () => {
        expect(S3.delete("PATH")).to.be.equal("PATH");
    });
});
