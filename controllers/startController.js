export const startView = (req, res) => {
    res.render("start", {
        title: 'Daylogger',
    });
}