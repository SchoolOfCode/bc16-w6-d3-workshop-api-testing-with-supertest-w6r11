import { test, expect, describe, it } from "vitest";
import request from "supertest";
import app from "../app.js";

test("GET/api/health works", () => {});

describe("GET /api/health", function () {
  it("responds with json", async function () {
    const response = await request(app).get("/api/health");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.success).toBe(true);
    expect(response.body.payload).toEqual("API is running correctly");
  });
});

// describe("GET /api/health works", function () {
//     it("responds with json", async function () {
//       const response = await request(app).get("/api/health");

//       expect(response.headers["content-type"]).toMatch(/json/);
//       expect(response.status).toEqual(200);

//       expect(response.body.success).toBe(true);
//       expect(response.body.payload).toEqual("API is running correctly");
//     });
// });
