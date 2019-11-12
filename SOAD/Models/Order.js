const mongoose= require('mongoose');

const order = new mongoose.Schema({
	user_id:{
		type:String,
		required:true
	},

	professional:{
		_id:{
			type:String,
			required:false,
		}
	},

	slot:{
		_id:{
			type:String,
			required:false,
		}
	},
	services_chosen:mongoose.Schema.Types.Mixed,
	
	service_name:{
			type:String,
			required:true
	},
	
	total_cost:{
		type:Number,
		required:false,
	},

	address:{
		type:Array,
		required:false
	},
	order_date:{
		type:Date,
		default:Date.now()
	}

});

const Order = mongoose.model('Order', order)

exports.Order = Order