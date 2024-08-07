import mongoose, {Schema} from "mongoose";

const OrderSchema = new Schema(
    {
      userId:{
        type: String,
        required: true,
      },
      products: [
        {
            productId:{
                type: String,

            },
            quantity:{
                type: Number,
                default: 1
            }

        }
      ],
      amount:{
        type: Number,
        required: true,
      },
      address:{
        type:Object,
        required:true
      },
      status:{
        type: String,
        required:true,
        default: "pending",
      },

    },{timestamps: true}
)


export const Order = mongoose.model("Order",OrderSchema)