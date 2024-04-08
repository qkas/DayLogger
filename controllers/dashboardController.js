export const dashboardView = (req, res) => {
    const username = req.username;
    const currentTime = new Date();
    let timeOfDay;
  
    if (currentTime.getHours() < 12) {
      timeOfDay = 'Morning';
    } else if (currentTime.getHours() < 17) {
      timeOfDay = 'Afternoon';
    } else {
      timeOfDay = 'Evening';
    }
    res.render('dashboard', {
      title: 'Todays mood',
      timeOfDay,
      user: req.user
    });
};