import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js"
import { createLead, createMultipleLeads, deleteLead, fetchLeadById, fetchLeads, getLeads, updateLead } from "../controllers/leadController.js"

const leadRouter=express.Router()

leadRouter.post("/create-lead",isLoggedIn,createLead)
leadRouter.get("/get-leads",isLoggedIn,getLeads)
leadRouter.get("/get-all-leads",fetchLeads)
leadRouter.get("/:id",isLoggedIn,fetchLeadById)
leadRouter.put("/:id",isLoggedIn,updateLead)
leadRouter.delete("/:id",isLoggedIn,deleteLead)

leadRouter.post("/create-multiple-leads",isLoggedIn,createMultipleLeads)



export default leadRouter