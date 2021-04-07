const express = require('express');
const routes = express.Router();

const views = __dirname + "/views/";

const Profile ={
    data: {
        name: "Valirio",
        avatar: "https://github.com/valirio.png",
        "monthly-budget":3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75,
    },
    constrollers:{
        index(request, response){
            return response.render(views + "profile", {profile: Profile.data})
        },
        update(request, response){
            const data = request.body;

            const weekPerYear = 52;

            const weeksPerMonth = (weekPerYear - data )/ 12;

            const weekTotalhours = data["hours-per-day"] * data["days-per-week"];

            const monthlyTotalHours = weekTotalhours * weekPerYear;

            const valueHour = data["monthly-budget"] / monthlyTotalHours;

            Profile.data = {
                ...Profile.data,
                ...request.body,
                "value-hour": valueHour
            }

            return response.redirect('/profile');
        },
    }

}

const Job = {
    data: [
        {
            id: 1,
            name: "Projeto da Pizzaria",
            "daily-hours": 10,
            "total-hours": 25,
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
            "daily-hours": 2,
            "total-hours": 4,
            createdAt: Date.now(),
        },{
            id: 4,
            name: "Projeto da lojinha",
            "daily-hours": 2,
            "total-hours": 1,
            createdAt: Date.now(),
        }
    ],
    constrollers:{
        index(request, response) {
            const updateJobs = Job.data.map((job) =>{        
                //const remaining = Job.services.remainingDays(job);
                const remaining = Job.services.remainingDays(job);
                const status = remaining >= 1 ? 'progress': 'done';
        
                return {
                    ...job,
                    remaining,
                    status,
                    budget: Job.services.calculateBudget(job, Profile.data["value-hour"]),
                };
            });
            
            return response.render(views + "index", {jobs: updateJobs}) 
        },
        create(request, response){
            return response.render(views + "job")
        },
        save(request, response){
            const lastJobId = Job.data[Job.data.length - 1]?.id || 0;
        
            Job.data.push({
                id: lastJobId + 1,
                name: request.body.name,
                "daily-hours": request.body["daily-hours"],
                "total-hours": request.body["total-hours"],
                createdAt: Date.now()
            });
            return response.redirect('/');
        },
        edit(request, response){
            return response.render(views + "job-edit")
        },
        show(request, response){

            const jobId = request.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if(!job){
                return response.send('job not Found');
            }
            
            Job.services.calculateBudget(job, Profile.data["value-hour"]);
            return response.render(views + "job-edit",{ job })
        },
        update(request, response){

            const jobId = request.params.id;

            const job = Job.data.find(job => Number(job.id) === Number(jobId));

            if(!job){
                return response.send('job not Found');
            }
            const updateJob = {
                ...job,
                name:request.body.name,
                "total-hours": request.body["total-hours"],
                "daily-hours": request.body["daily-hours"],
            }
            
            Job.data = Job.data.map(job =>{
                if(Number(job.id) === Number(jobId)){
                    job = updateJob;
                }
                return job
            });
            response.redirect('/job/' + jobId);
        },
        delete(request, response){

            const jobId = request.params.id;

            Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))

            return response.redirect('/');
        },
    },
    services: {
        remainingDays(job){
   
           const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
           
           const createdDate = new Date(job.createdAt);
       
           const dueDay = createdDate.getDate() + + remainingDays ;
       
           const dueDateInMs = createdDate.setDate(dueDay);
       
           const timeDiffInMs = dueDateInMs - Date.now();
       
           const dayInMs = 1000 * 60 * 60 * 24;
       
           const dayDiff = Math.floor(timeDiffInMs/dayInMs);
       
           if(dayDiff <=0){
               return 0;
           }else{
            return dayDiff;  
           }
           
       },
       calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
   }
}


routes.get('/', Job.constrollers.index);

routes.get('/job',Job.constrollers.create);

routes.post('/job',Job.constrollers.save);

routes.get('/job/:id', Job.constrollers.show);

routes.post('/job/:id', Job.constrollers.update);

routes.get('/job/delete/:id', Job.constrollers.delete);

routes.get('/profile', Profile.constrollers.index);


routes.post('/profile', Profile.constrollers.update);




module.exports = routes;
