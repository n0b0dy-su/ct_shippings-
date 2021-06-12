const Shipping = require('../models/Shipping');
const calcDistance = require('../libs/distance');

class ShippingService{
    async create(data){
        const aproxDistance = calcDistance(data.origin_lat,data.origin_long,
        data.end_lat,data.end_long);

        const newShipping = {...data,
            current_lat: data.origin_lat,
            current_long: data.origin_long,
            status: 'Pendiente',
            aprox_distance: aproxDistance
        };

        const newShippingId = await Shipping.create(newShipping).
        then(shipping => { return shipping.id }).
        catch(err => {
            return false;
        });
        return newShippingId;
    }

    async view(id){
        const attributes = [
            'customer',
            'descrip',
            'status',
            'aprox_distance'
        ];

        const shipping = await Shipping.findByPk(id, {attributes: attributes}).
        then(shipping => {
            return shipping;
        }).
        catch(err => {
            return false;
        });

        return shipping ? shipping.dataValues : shipping;
    }

    async update(id,data){    
        const permitUpdate = ['current_lat','current_long','status'];
        const dataCleaned = this.excludeKeys(data,permitUpdate);

        if(dataCleaned.hasOwnProperty('current_lat') || 
           dataCleaned.hasOwnProperty('current_long')){

            const end = await Shipping.findByPk(id,
            {attributes: ['end_lat','end_long']}).then(Shipping => {
                console.log(`Shipping: ${Shipping}`);
                return Shipping.dataValues != null ? Shipping.dataValues: null;
            }).
            catch(err => {
                console.log(err);
                return {};
            });

        dataCleaned.aprox_distance = end != null ? 
            calcDistance(dataCleaned.current_lat, 
                dataCleaned.current_long,
                end.end_lat, 
                end.end_long
            ) : 0;
        }

		if(dataCleaned.status == 'Entregado'){
			dataCleaned.finish_at = new Date(Date.now()).toUTCString();
		}

        const shippingUpdated = await Shipping.update(dataCleaned,{
            where: { id: id}
        }).
        then(shipping => {
            return shipping;
        }).
        catch(err => {
            console.log(err);
            return false;
        });
        
        return shippingUpdated;
    }

    excludeKeys(shippingData,permitFields){
        Object.keys(shippingData).forEach(key =>{
            if(!permitFields.includes(key))
                delete shippingData[key];
        });
        return shippingData;
    }

}

module.exports = ShippingService;
