const Profile = require('../model/Profile');

module.exports = {

   index(request, response){
        return response.render("profile", {profile: Profile.get()})
    },
    update(request, response){
        const data = request.body;

        const weekPerYear = 52;

        const weeksPerMonth = (weekPerYear - data )/ 12;

        const weekTotalhours = data["hours-per-day"] * data["days-per-week"];

        const monthlyTotalHours = weekTotalhours * weekPerYear;

        const valueHour = data["monthly-budget"] / monthlyTotalHours;

        Profile.update({
            ...Profile.get(),
            ...request.body,
            "value-hour": valueHour
        })

        return response.redirect('/profile');
    },
}