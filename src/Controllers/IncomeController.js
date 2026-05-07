const {incomeService} = require('../Services/IncomeService');

const incomeController = async (req,res) =>{
    try{
        const result = await incomeService();

        if(!result.result) return res.status(400).json({result:false, message:result.message});

        return res.status(200).json({result:true, message:result.message, data:result.data});
    } catch(err){
        console.error('[ERROR] ',err.message);
        return res.status(500).json({result:false, message:err.message});
    }
}

module.exports = {incomeController}