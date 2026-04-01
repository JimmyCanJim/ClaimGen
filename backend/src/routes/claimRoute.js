import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createClaim, getNewClaimId} from "../controllers/claimController.js";

const router = express.Router();

router.get("/generate-id", getNewClaimId);
router.post("/create", protectRoute, createClaim);

export default router;