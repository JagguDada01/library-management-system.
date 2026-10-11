import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { getBooks } from "../src/services/bookService.js";

// Mock localStorage for testing
globalThis.localStorage = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  clear() {
    this.store = {};
  }
};

describe("Book Service Unit Tests (PR #14)", () => {
  let lastFetchCall = null;

  beforeEach(() => {
    localStorage.clear();
    lastFetchCall = null;
    globalThis.fetch = async (url, options = {}) => {
      lastFetchCall = { url, options };
      return {
        ok: true,
        json: async () => ({ status: "ok", count: 2, books: [{ _id: "1", title: "Book 1" }] })
      };
    };
  });

  it("getBooks: should successfully call /books without query when no filters are provided", async () => {
    const res = await getBooks();
    assert.ok(lastFetchCall.url.endsWith("/books"));
    assert.equal(res.count, 2);
    assert.equal(res.books[0].title, "Book 1");
  });

  it("getBooks: should successfully handle empty filters object", async () => {
    const res = await getBooks({});
    assert.ok(lastFetchCall.url.endsWith("/books"));
    assert.equal(res.count, 2);
  });

  it("getBooks: should attach Bearer token when token is stored in localStorage", async () => {
    localStorage.setItem("token", "valid_jwt_token_sample");
    await getBooks();
    assert.equal(lastFetchCall.options.headers.Authorization, "Bearer valid_jwt_token_sample");
  });

  it("getBooks: should handle search and category filters safely if provided", async () => {
    await getBooks({ search: "  Clean Code  ", category: "Programming" });
    assert.ok(lastFetchCall.url.includes("search=Clean+Code"));
    assert.ok(lastFetchCall.url.includes("category=Programming"));
  });

  it("getBooks: should throw error when API response is not ok", async () => {
    globalThis.fetch = async () => ({
      ok: false,
      json: async () => ({ message: "Failed to fetch books from server" })
    });

    await assert.rejects(
      async () => {
        await getBooks();
      },
      {
        name: "Error",
        message: "Failed to fetch books from server"
      }
    );
  });
});
