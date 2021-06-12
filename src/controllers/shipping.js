const Shipping = require('../models/Shipping');
const calcDistance = require('../libs/distance');

function create(req,res){
    const body = req.body;
    
    const aproxDistance = calcDistance(body.origin_lat,body.origin_long,
        body.end_lat,body.end_long);

    const newShipping = {...body,
        status: 'Pendiente',
        current_lat: body.origin_lat,
        current_long: body.origin_long,
        aprox_distance: aproxDistance
    };

    Shipping.create(newShipping).then(shipping => {
	    res.status(201).
        json( { response: `Shipping ${shipping.id} created` } );	
    }).
    catch(err => {
        console.log(err);
	    res.status(400).
        json( { response: `Error to create Shipping` } );
    });

}

async function update(req,res){
    const permitUpdate = ['current_lat','current_long','status'];
	const id = req.params.id;
    const body = excludeKeys(req.body,permitUpdate);

    if(body.hasOwnProperty('current_lat') || body.hasOwnProperty('current_long')){
        const end = await Shipping.findByPk(id,
        {attributes: ['end_lat','end_long']}).
        then(Shipping => {
            return Shipping.dataValues;
        }).
        catch(err => {
            console.log(err);
        });

        console.log(end);

        body.aprox_distance = calcDistance(body.current_lat, body.current_long,
            end.end_lat, end.end_long
        );
    }

    console.log(body);

    Shipping.update(body,{
        where: { id: id}
    }).
    then(shipping => {
	    res.status(200).json( { response: `Shipping ${id} updated` } );
    }).
    catch(err => {
	    res.status(400).json( { response: `Error to Update Shipping ${id}` } );
    });


	//res.status(200).json( { response: `Shipping ${id} udated` } );
}

function get(req,res){
    // cliente
    // descripción 
    // estatus
    // distancia aproximada de entrega.
	const id = req.params.id;
    const attributes = [
        'customer',
        'descrip',
        'status',
        'aprox_distance'
    ];

    Shipping.findByPk(id, {attributes: attributes}).
    then(shipping => {
        console.log(shipping);
	    res.status(200).json( { response: 'OK', data: shipping.dataValues} );
    }).
    catch(err => {
        console.log(err);
        res.status(400).json( { response: `Shipping ${id} not valid`} );
    });
}

function excludeKeys(shippingData,permitFields){
    let dataCleaned = {};
    for(key in shippingData){
        if(!permitFields.includes(key))
            delete shippingData[key];
    }
    return shippingData;
}

module.exports = {
	create,
	update,
	get
}
