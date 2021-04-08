const Profile = require('../model/Profile');

module.exports = {

    async index(request, response){
        return response.render("profile", {profile: await Profile.get()})
    },
    async update(request, response){
        const data = request.body;

        const weekPerYear = 52;

        const weeksPerMonth = (weekPerYear - data )/ 12;

        const weekTotalhours = data["hours-per-day"] * data["days-per-week"];

        const monthlyTotalHours = weekTotalhours * weeksPerMonth;

        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        const profile = await Profile.get();

        Profile.update({
            ...profile,
            ...request.body,
            "value-hour": valueHour
        })

        return response.redirect('/profile', {profile: Profile.get()});
    },
}