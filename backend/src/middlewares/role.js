exports.isPartner = (req, res, next) => {
  if (req.user.role !== 'PARTNER')
    return res.status(403).json({ message: 'Partner access only' });
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN')
    return res.status(403).json({ message: 'Admin access only' });
  next();
};
