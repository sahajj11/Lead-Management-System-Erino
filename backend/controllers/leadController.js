import Lead from "../models/Lead.js";

//CREATE NEW LEAD CONTROLLER
export const createLead=async(req,res)=>{
    try{
        const {first_name, last_name, email,phone,company,city,state,source,status,score,lead_value,last_activity_at,is_qualifies}=req.body

        const lead=new Lead({...req.body})
        await lead.save()
        res.status(201).json({ message: 'Lead created successfully',lead })
    }catch(err){
        res.status(500).json({ message: 'Server error',error: err.message })
    }

}

//FETCH ALL LEADS CONTOLLER
export const fetchLeads=async(req,res)=>{
    try{
        const leads=await Lead.find()
        res.status(200).json(leads)
    }catch(err){
        res.status(500).json({ message: 'Server error',error: err.message })
    }
}

//LEAD BY ID
export const fetchLeadById=async(req,res)=>{
    try{
        const lead=await Lead.findById(req.params.id)
        if (!lead){
            return res.status(404).json({ message: "Lead not found" })
        }

        res.status(200).json(lead);
    }catch(err){
        res.status(500).json({ message: 'Server error',error: err.message })
    }
}

//UPDATE A LEAD 
export const updateLead=async(req,res)=>{
    try{
        const lead=await Lead.findByIdAndUpdate(req.params.id,req.body, { new: true })
        if (!lead){
            return res.status(404).json({ message: "Lead not found" })
        }

        res.status(200).json({message:"Lead Updated Successfully.",lead})
    }catch(err){
        res.status(500).json({ message: 'Server error',error: err.message })
    }
}

//DELETE A LEAD
export const deleteLead=async(req,res)=>{
    try{
        const lead=await Lead.findByIdAndDelete(req.params.id)
        if (!lead){
            return res.status(404).json({ message: "Lead not found" })
        }

        res.status(200).json({message:"Lead Deleted Successfully."})
    }catch(err){
        res.status(500).json({ message: 'Server error',error: err.message })
    }
}
