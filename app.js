import express from "express";
import cors from "cors";
import {db, admin} from "./firebase.js";

const app = express();
const APP_PORT = 4000;

app.use(cors({ origin: true }));
app.use(express.json());

//right when you load the page, this pops up
app.get("/", (req, res) => {
  res.send("Bits of Good API TESTING");
});

//level 0: setup, /api/health
app.get("/api/health", (req, res) => {
  res.json({ healthy: true });
});

//level 1: easy, user
app.post("/api/user", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    console.log("Creating user with:", name, email);

    const userRef = db.collection("users").doc();
    await userRef.set({
      name: name,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("User created with ID:", userRef.id);

    res.status(200).json({ id: userRef.id, name, email });
  } catch (error) {
    console.error("Error interacting with Firestore:", error);
    res.status(500).json({ error: "Server Error" });
  }
});

///api/animal
app.post("/api/animal", async (req, res) => {
  try {
    const { name, species } = req.body;

    if (!name || !species) {
      return res
        .status(400)
        .json({ error: "Name and species must be required" });
    }

    const animalRef = db.collection("animals").doc();
    await animalRef.set({
      name: name,
      species: species,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ id: animalRef.id, name, species });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

//api/training
app.post("/api/training", async (req, res) => {
  try {
    const { userId, animalId, description } = req.body;

    if (!userId || !animalId || !description) {
      return res.status(400).json({
        error: "User ID, animal ID, and description must be required",
      });
    }

    const trainingRef = db.collection("trainingLogs").doc();
    await trainingRef.set({
      userId: userId,
      animalId: animalId,
      description: description,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(200).json({ id: trainingRef.id, userId, animalId, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

app.listen(APP_PORT, () => {
  console.log(`API listening at http://localhost:${APP_PORT}`);
});
