const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/";

const profile ={
    name: "Valirio",
    avatar: "https://github.com/valirio.png",
    "monthly-budget":3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "value-hour": 75,

}

const jobs = [
    {
        id: 1,
        name: "Projeto da Pizzaria",
        "daily-hours": 10,
        "total-hours": 5,
        createdAt: Date.now(),
    },{
        id: 2,
        name: "Projeto da hanburgueria",
        "daily-hours": 15,
        "total-hours": 8,
        createdAt: Date.now(),
    },{
        id: 3,
        name: "Projeto da livraria",
        "daily-hours": 10,
        "total-hours": 4,
        createdAt: Date.now(),
    },{
        id: 4,
        name: "Projeto da lojinha",
        "daily-hours": 10,
        "total-hours": 0,
        createdAt: Date.now(),
    }
];



function remainingDays(job){
        
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    
    const createdDate = new Date(job.createdAt);

    const dueDay = createdDate.getDate() + remainingDays;

    const dueDateInMs = createdDate.setDate(dueDay);

    const timeDiffInMs = dueDateInMs - Date.now();
    const dayInMs = 1000 * 60 * 60 * 24;
    const dayDiff = Math.floor(timeDiffInMs/dayInMs);

    return dayDiff;
}

const lastJobId = jobs[jobs.length - 1]?.id || 1;

routes.get('/', (request, response) => {


    const updateJobs = jobs.map((job) =>{

        const remaining = remainingDays(job);
        console.log(remaining)
        const status = remaining <= 0 ? 'done': 'progress';

        return {
            ...job,
            remaining,
            status,
            budget: profile["value-hour"] * job["total-hours"]
        };
    });
    
    response.render(views + "index", {jobs: updateJobs})

});
routes.get('/job', (request, response) => response.render(views + "job"));
routes.post('/job', (request, response) => {

    const job = req.body;
    job.createdAt = Date.now();

    jobs.push({
        id: lastJobId + 1,
        name: request.body.name,
        "daily-hours": request.body["daily-hours"],
        "total-hours": request.body["total-hours"],
        createdAt: Date.now()
    });
    return response.redirect('/');
});
routes.get('/job/edit', (request, response) => response.render(views + "job-edit"));
routes.get('/profile', (request, response) => response.render(views + "profile", {profile}));




module.exports = routes;
