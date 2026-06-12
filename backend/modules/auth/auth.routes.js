const router = require("express").Router();
const authService = require("./auth.service");
const validationEngine = require("../../lib/validate");

router.post("/register", validationEngine, async (req, res) => {
  try {
    const resultingUserNode = await authService.registerUserNode(req.body);
    res.status(201).json({ success: true, data: resultingUserNode });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: "Validation Failure. Mandatory security input parameter keys dropped." });
    }
    const executionContextTokenBundle = await authService.authenticateUserNode(email, password);
    res.status(200).json({ success: true, ...executionContextTokenBundle });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
});

module.exports = router;