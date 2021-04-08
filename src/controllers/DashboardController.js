const Job = require('../model/Job');
const JobUtils = require('../utils/JobUtils');
const Profile = require('../model/Profile')

module.exports = {
    async index(request, response) {
        const jobs = await Job.get();
        const profile = await Profile.get();

        let statusCount = {
            progress:0,
            done:0,
            total:jobs.length,
        }

        let jobTotalHours = 0;

        const freeHours = profile["hours-per-day"] - jobTotalHours;

        const updateJobs = jobs.map((job) =>{        
            const remaining = JobUtils.remainingDays(job);
            const status = remaining >= 1 ? 'progress': 'done';

            statusCount[status] +=1;

            jobTotalHours = status == 'progress'? jobTotalHours += Number(job['daily-hours']): jobTotalHours;          
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
        

        return response.render("index", {jobs: updateJobs, profile: Profile, statusCount: statusCount, freeHours: freeHours}) 
    }
}

