import { Router, Request, Response } from "express";
import prisma from "./prisma"; // Hna 3yytna 3la s-sarout li sybna

const router = Router();

// Test Route: Jbed ga3 l-Users
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Chi haja machi hiya hadik" });
  }
});

// Test Route: Créer User jdid (Sri3a)
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await prisma.user.create({
      data: { name, email, password },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "User deja kayn aw error f database" });
  }
});
// Login Route
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 1. Qllb 3la l-user b l-email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // 2. Ila malqinach l-user
    if (!user) {
      return res.status(404).json({ error: "User ma kaynch" });
    }

    // 3. Vérifier password (Hna kanqarnoh nishan - mn b3d ghandiro cryptage)
    if (user.password !== password) {
      return res.status(401).json({ error: "Password ghalat" });
    }

    // 4. Kulchi mzyan
    res.json({ message: "Marhba!", user });
  } catch (error) {
    res.status(500).json({ error: "Chi haja machi hiya hadik" });
  }
});
// --- Partie Tâches ---

// 1. Jib Tâches dyal l-user
router.get("/tasks", async (req: Request, res: Response) => {
  const { userId } = req.query; // Ghandwzoh mn Frontend

  if (!userId) return res.status(400).json({ error: "User ID darori" });

  const tasks = await prisma.task.findMany({
    where: { userId: Number(userId) },
    orderBy: { id: 'desc' } // Jdad l-foq
  });
  res.json(tasks);
});

// 2. Zid Tâche jdida
router.post("/tasks", async (req: Request, res: Response) => {
  const { content, userId } = req.body;

  const newTask = await prisma.task.create({
    data: {
      content,
      userId: Number(userId),
    },
  });
  res.json(newTask);
});
// 3. Modifi Tâche (Cochiha / Décochiha)
router.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed } = req.body; // Wach kmmlat wala la

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) },
      data: { completed },
    });
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Mochkil f modification" });
  }
});

// 4. Mss7 Tâche (Delete)
router.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Tms7at b najah" });
  } catch (error) {
    res.status(500).json({ error: "Mochkil f mssi7" });
  }
});
export default router;