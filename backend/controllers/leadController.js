import Lead from "../models/Lead.js";

//CREATE NEW LEAD CONTROLLER
export const createLead=async(req,res)=>{
    try{
        const {first_name, last_name, email,phone,company,city,state,source,status,score,lead_value,last_activity_at,is_qualified}=req.body

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




// GET /leads with pagination + filters
export const getLeads = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 20,
      ...filters
    } = req.query;

    page = parseInt(page);
    limit = Math.min(parseInt(limit), 100); // max 100

    const query = {};

    // --- FILTERING ---
    // String fields (email, company, city)
    if (filters.email) {
      if (filters.email_contains) {
        query.email = { $regex: filters.email_contains, $options: "i" };
      } else {
        query.email = filters.email;
      }
    }
    if (filters.company) {
      if (filters.company_contains) {
        query.company = { $regex: filters.company_contains, $options: "i" };
      } else {
        query.company = filters.company;
      }
    }
    if (filters.city) {
      if (filters.city_contains) {
        query.city = { $regex: filters.city_contains, $options: "i" };
      } else {
        query.city = filters.city;
      }
    }

    // Name search (either full name or part of first/last name)
if (filters.name) {
  query.$or = [
    { first_name: { $regex: filters.name, $options: "i" } },
    { last_name: { $regex: filters.name, $options: "i" } }
  ];
}

// Optional separate filters
if (filters.first_name) {
  query.first_name = { $regex: filters.first_name, $options: "i" };
}
if (filters.last_name) {
  query.last_name = { $regex: filters.last_name, $options: "i" };
}

    // Enum fields (status, source)
    if (filters.status) query.status = filters.status;
    if (filters.status_in) query.status = { $in: filters.status_in.split(",") };

    if (filters.source) query.source = filters.source;
    if (filters.source_in) query.source = { $in: filters.source_in.split(",") };

    


    // Number fields (score, lead_value)
    ["score", "lead_value"].forEach((field) => {
      if (filters[`${field}`]) query[field] = Number(filters[field]);
      if (filters[`${field}_gt`]) query[field] = { ...query[field], $gt: Number(filters[`${field}_gt`]) };
      if (filters[`${field}_lt`]) query[field] = { ...query[field], $lt: Number(filters[`${field}_lt`]) };
      if (filters[`${field}_between`]) {
        const [min, max] = filters[`${field}_between`].split(",").map(Number);
        query[field] = { $gte: min, $lte: max };
      }
    });

    // Date fields (created_at, last_activity_at)
    ["created_at", "last_activity_at"].forEach((field) => {
      if (filters[`${field}_on`]) {
        query[field] = { $eq: new Date(filters[`${field}_on`]) };
      }
      if (filters[`${field}_before`]) {
        query[field] = { ...query[field], $lt: new Date(filters[`${field}_before`]) };
      }
      if (filters[`${field}_after`]) {
        query[field] = { ...query[field], $gt: new Date(filters[`${field}_after`]) };
      }
      if (filters[`${field}_between`]) {
        const [start, end] = filters[`${field}_between`].split(",");
        query[field] = { $gte: new Date(start), $lte: new Date(end) };
      }
    });

    // Boolean field (is_qualified)
    if (filters.is_qualified !== undefined) {
      query.is_qualified = filters.is_qualified === "true";
    }

    // --- PAGINATION ---
    const total = await Lead.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    const leads = await Lead.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      data: leads,
      page,
      limit,
      total,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


//FOR CREATING MULTIPE LEADS
export const createMultipleLeads = async (req, res) => {
    try {
        const leads = await Lead.insertMany(req.body);
        res.status(201).json({ message: "Multiple leads created successfully", leads });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};