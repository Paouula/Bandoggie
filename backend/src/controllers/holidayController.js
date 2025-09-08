import holidayModel from "../models/holidays.js";

// Array de metodos
const holidayController = {};

// Select
holidayController.getHoliday = async (req, res) => {
  const holiday = await holidayModel.find();
  res.json(holiday);
};

// Insert
holidayController.createHoliday = async (req, res) => {
  const { nameHoliday } = req.body;

  const newHoliday = new holidayModel({ nameHoliday });
  await newHoliday.save();
  res.json({ message: "Holiday saved" });
};

// Delete
holidayController.deleteHoliday = async (req, res) => {
  const deletedHoliday = await holidayModel.findByIdAndDelete(req.params.id);
  if (!deletedHoliday) {
    return res.status(404).json({ message: "Holiday wasn't found" });
  }
  res.json({ message: "Holiday deleted" });
};

// Update
holidayController.updateHoliday = async (req, res) => {
  // Solicito todos los valores
  const { nameHoliday } = req.body;
  await holidayModel.findByIdAndUpdate(
    req.params.id,
    {
      nameHoliday
    },
    { new: true }
  );

  res.json({ message: "Holiday updated" });
};

export default holidayController;