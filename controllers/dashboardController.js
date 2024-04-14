import { Mood } from "../models/Mood.js";

const title = 'Dashboard';

export const dashboardView = (req, res) => {
  const hasPostedToday = false;
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
    title,
    timeOfDay,
    user: req.user,
    messages: req.flash('failure'),
    hasPostedToday
  });
};

export const postMood = (req, res) => {
  const { rating, description } = req.body;
  //Required
  if (!rating) {
    req.flash('failure', 'Please select mood rating');
    return res.redirect('/dashboard');
  } else if (!description) {
    req.flash('failure', 'Please write something about your day');
    return res.redirect('/dashboard');
  } else {
    const newMood = new Mood({
      rating,
      description,
      author: req.user._id,
    });
    newMood.save()
      .then(() => res.redirect('/dashboard'))
      .catch((err) => console.log(err));
  }
}