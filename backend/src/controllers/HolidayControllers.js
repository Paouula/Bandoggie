const HolidayControllers = {};

import HolidayModels from "../models/Holiday.js";

HolidayControllers.getAllHoliday = async (req, res) => {
    const Holiday = await HolidayModels.find();
    res.json(Holiday);
}

HolidayControllers.insertHoliday = async (req, res) => {
    const {nameCategory} = req.body;
    const newHoliday = new HolidayModels({nameCategory}); 
    await newHoliday.save();
    res.json({message: "Holiday inserted"});
}

HolidayControllers.updateHoliday= async (req, res) => {
    const {nameCategory} = req.body;
    const updatedHoliday = await HolidayModels.findByIdAndUpdate(req.params.id, {nameCategory}, {new: true});
    res.json({message: "Holiday updated"});
}

HolidayControllers.deleteHoliday = async (req, res) => {
    await HolidayModels.findByIdAndDelete(req.params.id);
    res.json({message: "Holiday deleted"});
}                

export default HolidayControllers;