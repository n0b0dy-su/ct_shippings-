const ShippingService = require('../services/shipping');
const Shipping = new ShippingService();

async function create(req,res){
    const body = req.body;
    
    const newShippingId =  await Shipping.create(body);

    if(newShippingId){
        res.status(201).
        json( { response: `Shipping ${newShippingId} created`,
				id: newShippingId} );    
    }else{
        res.status(400).
        json( { response: `Error to create Shipping` } );
    }
}

async function update(req,res){
	const id = req.params.id;
    const body = req.body;

    const shippingUpdated = await Shipping.update(id,body); 

    if(shippingUpdated){
	    res.status(200).json( { response: `Shipping ${id} updated` } );
    }else{
	    res.status(400).json( { response: `Error to Update Shipping ${id}` } );
    }
}

async function get(req,res){
	const id = req.params.id;
    
    const shipping = await Shipping.view(id);

    if(shipping){
	    res.status(200).json( { response: 'OK', data: shipping} );
    }else{
        res.status(400).json( { response: `Shipping ${id} not valid`} );
    }
}

module.exports = {
	create,
    update,
	get
}
