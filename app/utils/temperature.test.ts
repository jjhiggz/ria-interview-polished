import { expect, it } from "vitest";
import { kelvinToFarenheight } from "./temperature";

it("should give me the right value for 200K", () => {
  expect(kelvinToFarenheight(200)).toBeCloseTo(-99.67);
});

it("should give me the right value for 300K", () => {
  expect(kelvinToFarenheight(300)).toBeCloseTo(80.33);
});
