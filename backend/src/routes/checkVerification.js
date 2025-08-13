import express from "express"
import checkVerification from "../controllers/checkVerificationControllers.js"

const router = express.Router()

router.route('/').get(checkVerification.checkPendingVerification)

export default router