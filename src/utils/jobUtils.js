module.exports  = {
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