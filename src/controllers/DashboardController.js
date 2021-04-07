const Job = require('../model/Job');
const JobUtils = require('../utils/jobUtils');
const Profile = require('../model/Profile')

module.exports = {
    index(request, response) {
        const jobs = Job.get();
        const profile = Profile.get();
        const updateJobs = jobs.map((job) =>{        
            const remaining = JobUtils.remainingDays(job);
            const status = remaining >= 1 ? 'progress': 'done';
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"]),
            };
        });
        
        return response.render("index", {jobs: updateJobs, profile: Profile}) 
    }
}

