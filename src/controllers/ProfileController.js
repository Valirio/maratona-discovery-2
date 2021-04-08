const Profile = require('../model/Profile');

module.exports = {

    async index(req, res){
        return res.render("profile", {profile: await Profile.get()})
    },
    async update(req, res){
        const data = req.body;

        const weekPerYear = 52;

        const weeksPerMonth = (weekPerYear - data )/ 12;

        const weekTotalhours = data["hours-per-day"] * data["days-per-week"];

        const monthlyTotalHours = weekTotalhours * weeksPerMonth;

        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        const profile = await Profile.get();

        Profile.update({
            ...profile,
            ...req.body,
            "value-hour": valueHour
        })

        return res.redirect('/profile');
    },
}