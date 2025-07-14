const HolidayControllers = {};
import Holiday from "../models/holiday.js";
import HolidayModels from "../models/holiday.js";

//Select
HolidayControllers.getAllHoliday = async (req, res) => {
    try {
        const holidays = await HolidayModels.find();
        res.status(200).json(holidays);

        
       if (!Holiday) {
        return res.status(404).json({ message: "Product not found" })
    }
    } catch (error) {
        console.error("Error fetching holidays:", error);
        res.status(500).json({ message: "Error fetching holidays", error });
    } 
};

//Insert
HolidayControllers.insertHoliday = async (req, res) => {
    try {
        const {nameCategory} = req.body;
        if (!product) {
            return res.status(404).json({ message: "Product not found" })
        }

         
       if (!product) {
        return res.status(404).json({ message: "Product not found" })
    }
        
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    
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