const Job = require('../model/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../model/Profile');

module.exports = {
    create(request, response){
        return response.render("job")
    },
    save(request, response){
        const jobs = Job.get();
        const lastJobId = jobs[jobs.length - 1]?.id || 0;
    
        jobs.push({
            id: lastJobId + 1,
            name: request.body.name,
            "daily-hours": request.body["daily-hours"],
            "total-hours": request.body["total-hours"],
            createdAt: Date.now()
        });

        return response.redirect('/');
    },
    show(request, response){
        const jobs = Job.get();
        const profile = Profile.get();

        const jobId = request.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if(!job){
            return response.send('job not Found');
        }
        
        job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);
        
        return response.render("job-edit",{ job })
    },
    update(request, response){
        const jobs = Job.get();

        const jobId = request.params.id;

        const job = jobs.find(job => Number(job.id) === Number(jobId));

        if(!job){
            return response.send('job not Found');
        }
        const updateJob = {
            ...job,
            name:request.body.name,
            "total-hours": request.body["total-hours"],
            "daily-hours": request.body["daily-hours"],
        }
        
        const newJobs = jobs.map(job =>{
            if(Number(job.id) === Number(jobId)){
                job = updateJob;
            }
            return job
        });

        Job.update(newJobs);

        response.redirect('/job/' + jobId);
    },
    delete(request, response){

        const jobId = request.params.id;
        Job.delete(jobId);

        return response.redirect('/');
    },
    edit(request, response){
        return response.render("job-edit")
    }
}