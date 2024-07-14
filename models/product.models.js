import mongoose, {Schema} from "mongoose";

const ProductSchema = new Schema(
    {
      title:{
        type: String,
        required:true,
        unique:true,
      },
      description:{
        type:String,
        required:true,
      },
      img:{
        type:String,
        required:true,
      },
      categories:{
        type:Array,
      },
      size:{
        type:String,
      },
      colour:{
        type:String,
      },
      prices:{
        type:Number,
        required:true,
      },
    },{timestamps: true}
)

export const Product = mongoose.model("Product",ProductSchema)

