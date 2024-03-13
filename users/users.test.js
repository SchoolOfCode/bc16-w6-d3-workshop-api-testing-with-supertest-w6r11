import { test, expect, describe, it, expectTypeOf } from "vitest";
import request from "supertest";
import app from "../app.js";
import { resetUsersTable } from "../db/helpers.js";

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

describe("GET /api/users", function () {
  it("get all users with assertion", async function () {
    await resetUsersTable();
    const response = await request(app).get("/api/users");
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toEqual(200);

    expect(typeof response.body).toBe("object");
    expect(response.body.success).toBe(true);
    // Array.isArray
    expectTypeOf(response.body.payload).toBeArray();

    response.body.payload.forEach((user) => {
      expect(typeof user.id).toBe("number");
      expect(user.username).toBeTypeOf("string");
    });
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
