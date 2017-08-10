const mongoose = require('mongoose')

const Store = mongoose.model('Store')

exports.homepage = (req, res) => {
	res.render('index')
}

exports.addStore = (req, res) => {
	res.render('editStore', { title: 'Add store' })
}

exports.getStores = async (req, res) => {
	// 1. query database for list of all stores
	const stores = await Store.find()
	res.render('stores', { title: 'Stores', stores })
}

exports.editStore = async (req, res) => {
	// find the store given the id
	const store = await Store.findOne({ _id: req.params.id })
	// confirm they are the owner of store
	// todo
	// render out the edit form so the user can update their store
	res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
	// set location data as a point - needs for searching later on
	// is not set when applying update. so we can manually force it (or any value)
	// in the req.body object to be the value we need before handing it onto mongoose
	req.body.location.type = 'Point'

	// find and update the store
	const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true, // returns the new/updated store instead of the old one
		runValidators: true,
	}).exec()
	req.flash('success', `Sucessfully updated ${store.name}, 
		<a href="/store/${store.slug}">View store →</a>`)
	res.redirect(`/store/${store._id}/edit`)
	// redirect to the store and tell them it worked
}

exports.createStore = async (req, res) => {
	// using a middleware to ahndle errors. 
	// otherwise need to wrap everything below in ```try {} catch(e) {}```
	// in order to havndle any errors or node could crash
	// more elegant way than using chained promises

	// to use the slug value generated into the database
	// call await on the whole new Store function AND the save
	// now all of hte data entered and anything we generate on saving 
	// is avaialbe to use; like the slug
	console.log(req.body)
	const store = await (new Store(req.body).save())
	res.redirect(`/store/${store.slug}`)
}
