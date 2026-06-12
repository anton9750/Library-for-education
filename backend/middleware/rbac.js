module.exports = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ error: "Forbidden. Access permissions matrix evaluation mapping could not identify user payload context." });
    }

    const hasPermission = allowedRoles.includes(req.user.role.toUpperCase());
    if (!hasPermission) {
      return res.status(403).json({ error: `Forbidden. Your current role context assignment (${req.user.role}) does not maintain authorization grants to access this asset layer.` });
    }
    next();
  };
};