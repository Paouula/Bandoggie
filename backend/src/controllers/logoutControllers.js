const logoutController = {};

//Este es para borrar la sesión del usuario

/*logoutController.logout = async (req, res) => {
    res.clearCookie("authToken");
    res.json({ message: "Logged out successfully" });
}*/
logoutController.logout = (req, res) => {
  res.clearCookie("authToken", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.status(200).json({ message: "Logout exitoso" });
};

export default logoutController;
