// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import {
  TextDecoder as NodeTextDecoder,
  TextEncoder as NodeTextEncoder,
} from "node:util";

global.TextEncoder = NodeTextEncoder as typeof TextEncoder;
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;

if (typeof global.structuredClone !== "function") {
  global.structuredClone = function structuredClone(value) {
    if (value === null || value === undefined) {
      return value;
    }

    try {
      // For objects and arrays, use JSON methods
      if (typeof value === "object") {
        return JSON.parse(JSON.stringify(value));
      }

      // For primitive values, return directly
      return value;
    } catch (error) {
      console.warn("structuredClone polyfill failed:", error);

      // Returns a shallow copy as fallback
      return Array.isArray(value) ? [...value] : { ...value };
    }
  };
}
