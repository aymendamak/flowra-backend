import request from "supertest";
import app from "../../app";
import { prisma } from "../../config/database";

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /api/users", () => {
  it("devrait créer un user avec succès", async () => {
    const newUser = {
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.email).toBe(newUser.email);
    expect(response.body.name).toBe(newUser.name);
    expect(response.body.passwordHash).toBeUndefined();
  });

  it("devrait retourner 400 si email dèjà utilisé", async () => {
    const user = {
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    };

    await request(app).post("/api/users").send(user);

    const response = await request(app).post("/api/users").send(user);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email already in use");
  });
});

describe("GET /api/users", () => {
  it("retourner la liste", async () => {
    await request(app).post("/api/users").send({
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    });

    const response = await request(app).get("/api/users");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].email).toBe("aymen@flowra.com");
  });
});

describe("GET /api/users/:id", () => {
  it("retourne le bon utilisateur", async () => {
    const createResponse = await request(app).post("/api/users").send({
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    });

    const userId = createResponse.body.id;
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
    expect(response.body.email).toBe("aymen@flowra.com");
  });

  it("retourne 400 si id invalide", async () => {
    await request(app).post("/api/users").send({
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    });

    const response = await request(app).get("/api/users/abc");

    expect(response.status).toBe(400);
  });

  it("retourne 404 si user inexistant", async () => {
    await request(app).post("/api/users").send({
      email: "aymen@flowra.com",
      name: "Aymen",
      password: "123456",
    });

    const response = await request(app).get("/api/users/2");

    expect(response.status).toBe(404);
  });
});
