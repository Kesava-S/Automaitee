export default function handler(req, res) {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.url} does not exist.`
  });
}
