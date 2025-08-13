export function notFound(req, res) {
    res.status(404).json({ error: true, message: 'Ruta no encontrada' });
}