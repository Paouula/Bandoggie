import express from 'express';
import HolidayControllers from '../controllers/holidayControllers.js';

const router = express.Router();

router.route('/').get(HolidayControllers.getAllHoliday)
.post(HolidayControllers.insertHoliday);

router.route('/:id')
.put(HolidayControllers.updateHoliday)
.delete(HolidayControllers.deleteHoliday)

export default router;      