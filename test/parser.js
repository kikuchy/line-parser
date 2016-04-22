const assert = require("assert");
const clone = require("clone");

const Parser = require("..");
const OPERATION_FRIENDSHIP = {result: [{
    from: "u2ddf2eb3c959e561f6c9fa2ea732e7eb8",
    fromChannel: "1341301815",
    to: ["u0cc15697597f61dd8b01cea8b027050e"],
    toChannel: 1441301333,
    eventType: "138311609100106403",
    id: "ABCDEF-12345678901",
    content: {
        params: [
            "u0f3bfc598b061eba02183bfc5280886a",
            null,
            null
        ],
        revision: 2469,
        opType: 4
    }
}]};
const OPERATION_BLOCK = clone(OPERATION_FRIENDSHIP);
OPERATION_BLOCK.result[0].content.opType = 8;

const MESSAGE_TEXT = {result: [{
    from: "u2ddf2eb3c959e561f6c9fa2ea732e7eb8",
    fromChannel: "1341301815",
    to: ["u0cc15697597f61dd8b01cea8b027050e"],
    toChannel: 1441301333,
    eventType: "138311609000106303",
    id: "ABCDEF-12345678901",
    content: {
        location: null,
        id: "325708",
        contentType: 1,
        from: "uff2aec188e58752ee1fb0f9507c6529a",
        createdTime: 1332394961610,
        to: ["u0a556cffd4da0dd89c94fb36e36e1cdc"],
        toType: 1,
        contentMetadata: null,
        text: "Hello, BOT API Server!"
    }
}]};

describe("parse", () => {
    it("should fire 'friendship' event", (done) => {
        const ps = Parser();
        ps.on("friendship", (metadata) => {
            assert.equal(OPERATION_FRIENDSHIP.result[0].from, metadata.from);
            done();
        });
        ps.parse(OPERATION_FRIENDSHIP);
    });

    it("should fire 'block' event", (done) => {
        const ps = Parser();
        ps.on("block", (metadata) => {
            assert.equal(OPERATION_BLOCK.result[0].from, metadata.from);
            done();
        });
        ps.parse(OPERATION_BLOCK);
    });

    it("should fire 'text' event", (done) => {
        const ps = Parser();
        ps.on("text", (metadata) => {
            assert.equal(MESSAGE_TEXT.result[0].content.text, metadata.content.text);
            done();
        });
        ps.parse(MESSAGE_TEXT);
    });
});
