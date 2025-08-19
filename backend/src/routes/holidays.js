import express from 'express';
import holidayController from '../controllers/holidayController.js';

const router = express.Router();

router.route('/')
.get(holidayController.getHoliday)
.post(holidayController.createHoliday);

router.route('/:id')
.put(holidayController.updateHoliday)
.delete(holidayController.deleteHoliday);

export default router;      