import { Response, Request, Router, NextFunction } from "express";
import { json } from "stream/consumers";
import { Job } from "../models/Job";
<<<<<<< HEAD
import { User } from "../models/User";

const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
=======
const router = Router();

router.post("/", (req: Request, res: Response, next: NextFunction) => {
  console.log("body", req.body);
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
  const job = req.body;
  Job.create(job)
    .then((createdJob) => {
      return res.send(createdJob);
    })
    .catch((error) => {
      return res.status(424).send(error);
    });
});

<<<<<<< HEAD
router.put("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { userCuil, jobID } = req.body;
    let userToAdd = await User.findByPk(userCuil);
    let jobToAdd = await Job.findByPk(jobID);
    await userToAdd?.$add("jobs", jobID);
    await jobToAdd?.$add("users", userCuil);
    let returnedUser = await User.findByPk(userCuil, {
      include: [Job],
    });
    return res.status(200).send(returnedUser); //Devuelve el usuario junto con el trabajo agregado
  } catch (err) {
    return res.status(404).send(err);
  }
});

=======
>>>>>>> 6df985113509dd7c036d011c7a890e4b4449d345
export default router;
