"use strict";

const EventEmitter = require('events');
const util = require('util');

function ParsingEvent(options) {
    EventEmitter.call(this);
}
util.inherits(ParsingEvent, EventEmitter);

function Parser(options) {
    this.emitter = new ParsingEvent();
}

Parser.prototype.parseOperation = function(result) {
    const opType = result.content.opType;
    switch (opType) {
        case 4:
            this.emitter.emit("friendship", result);
            break;
        case 8:
            this.emitter.emit("block", result);
            break;
        default:
            this.emitter.emit("error", new Error("Unknown operation: opType = " + opType));
            break;
    }
};

Parser.prototype.parseMesage = function(result) {
    const contentType = result.content.contentType;
    switch (contentType) {
        case 1:
            this.emitter.emit("text", result);
            break;
        case 2:
            this.emitter.emit("image", result);
            break;
        case 3:
            this.emitter.emit("video", result);
            break;
        case 4:
            this.emitter.emit("audio", result);
            break;
        case 7:
            this.emitter.emit("location", result);
            break;
        case 8:
            this.emitter.emit("sticker", result);
            break;
        case 10:
            this.emitter.emit("contact", result);
            break;
        default:
            this.emitter.emit("error", new Error("Unknown message: contentType = " + contentType));
            break;
    }
};

Parser.prototype.parse = function(jsonObject) {
    const self = this;
    const result = jsonObject.result;
    result.forEach(function(res) {
        const eventType = res.eventType;
        switch (eventType) {
            case "138311609100106403":
                self.parseOperation(res);
                break;
            case "138311609000106303":
                self.parseMesage(res);
                break;
            default:
                self.emitter.emit("error", new Error("Unknown event: eventType = " + eventType));
        }
    });
};

Parser.prototype.on = function(eventName, cb) {
    this.emitter.on(eventName, cb);
};

module.exports = (options) => {
    return new Parser(options);
};
