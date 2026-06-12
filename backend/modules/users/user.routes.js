const router = require("express").Router();
const userController = require("./user.controller");
const routeGuardMiddleware = require("../../middleware/auth");
const scopeRBACGuard = require("../../middleware/rbac");

router.get("/", routeGuardMiddleware, scopeRBACGuard(["ADMIN", "MODERATOR"]), userController.retrievePaginatedUserCollectionRegistry);
router.post("/", routeGuardMiddleware, scopeRBACGuard(["ADMIN"]), userController.injectNewManualUserNodeRecord);

module.exports = router;