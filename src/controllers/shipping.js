//missing import shipping service

function create(req,res){
	res.status(201).json( { response: 'Shipping created' } );	
}

function update(req,res){
	const id = req.params.id;
	res.status(200).json( { response: `Shipping ${id} udated` } );
}

function get(req,res){
	const id = req.params.id;
	res.status(200).json( { response: `Shipping ${id}` } );
}

module.exports = {
	create,
	update,
	get
}
