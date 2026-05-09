const {todayTickets} = require('../Services/TodayTicketsService');

const todayTicketsController = async (req,res)=>{
    try{
        const userId = req.user.userId;
        const ip = req.ip;

        const result = await todayTickets(userId, ip);

        if(!result.result) return res.status(401).json({result:false, message:result.message});

        return res.status(200).json({result:true, data:result.data});
    } catch(error){
        console.error('[ERROR] ',error.message);
        return res.status(500).json({result:false, message: error.message});
    }
}

module.exports = {todayTicketsController}