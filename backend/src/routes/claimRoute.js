import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {createClaim, getNewClaimId, getAllClaims} from "../controllers/claimController.js";

const router = express.Router();

router.get("/generate-id", getNewClaimId);
router.post("/create", protectRoute, createClaim);
router.get("/all", protectRoute, getAllClaims)

export default router;