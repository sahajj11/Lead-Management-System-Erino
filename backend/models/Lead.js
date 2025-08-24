import mongoose from "mongoose";

const leadSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },

    last_name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
        
    },

    phone:{
        type:String,
        required:true
    },

    company:{
        type:String,
        required:true
    },

    city:{
        type:String,
        required:true
    },

    state:{
        type:String,
        required:true
    },

    source:{
        type:String,
        required:true,
        enum: ["website","facebook_ads","google_ads","referral","events","other"],
        default:"other"
    },

    status:{
        type:String,
        required:true,
        enum: ["new","contacted","qualified","lost","won"],
        default: "new"
    },

    score:{
        type:Number,
        default:0
    },

    lead_value:{
        type:Number,
        default:0
    },

    last_activity_at:{
        type:Date,
        default:null
    },

    is_qualified:{
        type:Boolean,
        default:false
    }

    

},{timestamps:true})

const Lead=new mongoose.model("Lead",leadSchema)
export default Lead