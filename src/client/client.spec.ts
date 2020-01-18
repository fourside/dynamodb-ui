import { Client } from "./client";

describe("client", () => {
  beforeEach(() => {});

  it("listTable return table names", async () => {
    const client = new Client();
    const tables = await client.listTablesByEnv();
    //console.log(tables);
    expect(tables.develop.length).not.toBe(0);
  });
});
