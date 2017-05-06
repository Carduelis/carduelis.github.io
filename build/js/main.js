data = {
	contacts: [{
		title: 'Вконтакте',
		url: 'https://vk.com/pavepy'
	}, {
		title: 'Facebook',
		url: 'https://facebook.com/p.shchegolev'
	}, {
		title: 'GitHub',
		url: 'https://github.com/carduelis'
	}, {
		title: 'GitHub pages',
		url: 'http://carduelis.github.io'
	}, {
		title: 'Twitter',
		url: 'http://carduelis.github.io'
	}, {
		title: '+79055332433',
		icon: 'phone',
		url: 'tel:+79055332433'
	}, {
		title: 'pavepy@gmail.com',
		icon: 'pencil',
		url: 'mailto:pavepy@gmail.com'
	}],
	users: [{
		id: 1,
		userName: 'Иван Иванов',
		userPic: 'http://placecage.com/100/100',
		balance: 200,
		totalOrders: 5
	}, {
		id: 2,
		userName: 'Петр Кузнецов',
		userPic: 'http://placecage.com/101/101',
		balance: 1200,
		totalOrders: 3
	}, {
		id: 3,
		userName: 'Константин Константинопольский',
		userPic: 'http://placecage.com/99/99',
		balance: -575,
		totalOrders: 4
	}]
};
var History = History || {};
History.View = History.View || {};
History.Data = History.Data || {};

var Orders = Orders || {};
Orders.View = Orders.View || {};
Orders.Data = Orders.Data || {};

var App = Marionette.Application.extend({
	region: '#app',
	initialize: function initialize(options) {
		console.log('My options:', options);
	},
	onStart: function onStart() {
		console.log(this.getRegion());
		this.getRegion().show(new RootView());
		// this.showView(new RootView()); // are the same
	}

});
app = new App();
app.on('start', function (e) {
	return console.log(e);
});
app.on('before:start', function (e) {
	return console.log(e);
});
RootView = Marionette.View.extend({
	template: '#t-root',
	regions: {
		'users': '.users',
		'newOrder': '.new',
		'orders': '.orders',
		'about': '.about'
	},
	onRender: function onRender() {
		this.getRegion('users').show(new History.View.HistoryCollection());
		this.getRegion('about').show(new AboutMeView());
	}
});
var ContactsModel = Backbone.Model.extend({
	defaults: function defaults() {
		return {
			icon: 'ok',
			title: 'Связаться',
			url: null
		};
	}
});
var ContactsCollection = Backbone.Collection.extend({
	model: ContactsModel
});
var ContactsItem = Marionette.View.extend({
	template: '#t-me-contacts-item',
	tag: 'li',
	className: 'contact-item',
	triggers: {
		'click': 'contact:me'
	},
	onContactMe: function onContactMe() {}
});
var Contacts = Marionette.CollectionView.extend({
	childView: ContactsItem,
	collection: new ContactsCollection(data.contacts)
});

var AboutMe = Backbone.Model.extend({
	defaults: function defaults() {
		return {
			firstName: 'Pavel',
			lastName: 'Shchegolev',
			avatar: '//placecage.com/150/150',
			profession: 'Front-end web developer'
		};
	}
});

var AboutMeView = Marionette.View.extend({
	_name: 'AboutMeView',
	template: '#t-me',
	className: 'about',
	model: new AboutMe(),
	initialize: function initialize(options) {
		console.debug(this._name);
		console.debug(this.model);
		_.extend(this, options);
	},
	regions: {
		contacts: '.contacts'
	},

	onRender: function onRender() {
		this.getRegion('contacts').show(new Contacts());
	}
});

History.Data.Model = Backbone.Model.extend({
	_name: 'User model',
	defaults: function defaults() {
		return {
			id: this.id,
			userName: 'Иванов Иван',
			userPic: 'http://placecage.com/200/200',
			balance: 200,
			totalOrders: 5
		};
	},
	initialize: function initialize() {
		console.log(this.url());
	}

});

History.Data.Collection = Backbone.Collection.extend({
	model: History.Data.Model,
	urlRoot: '/',
	initialize: function initialize(options) {
		this.url = this.urlRoot + options.url;
	}
});
History.View.User = Marionette.View.extend({
	_name: 'History.View',
	className: 'user',
	template: '#t-user-snippet',
	initialize: function initialize(options) {
		console.debug(this._name);
		_.extend(this, options);
	},
	onRender: function onRender() {
		// this.getRegion('input').show(this.input(this.model))
	}
});
History.View.HistoryCollection = Marionette.CollectionView.extend({
	childView: History.View.User,
	collection: new History.Data.Collection(data.users),
	initialize: function initialize(options) {
		console.log(options);
		console.log(this.childView);
		this.render();
	}
});

// Orders.View.Order = Marionette.View.extend({
// 	_name: 'Users.View',
// 	className: 'user',
// 	template: '#t-user-snippet',
//  	initialize: function(options) {
//  		console.debug(this._name);
//  		_.extend(this,options);
//  	},
// 	onRender: function() {
// 		// this.getRegion('input').show(this.input(this.model))
// 	}
// });
// Orders.View.OrderCollection = Marionette.CollectionView.extend({
// 	childView: Orders.View.Order,
// 	collection: new Orders.Data.Collection([{
// 		id: 1,
// 		userName: 'Иван Иванов',
// 		userPic: 'http://placecage.com/100/100',
// 		balance: 200,
// 		totalOrders: 5
// 	},{
// 		id: 2,
// 		userName: 'Петр Кузнецов',
// 		userPic: 'http://placecage.com/101/101',
// 		balance: 1200,
// 		totalOrders: 3
// 	},{
// 		id: 3,
// 		userName: 'Константин Константинопольский',
// 		userPic: 'http://placecage.com/99/99',
// 		balance: -575,
// 		totalOrders: 4
// 	}]),
// 	initialize: function (options) {
// 		console.log(options);
// 		console.log(this.childView);
// 		this.render();
// 	}
// });


$(document).ready(function () {
	app.start();
});

function kek(height, width, left, top) {
	var height = _.random(200, 400);
	var width = _.random(200, 400);
	var left = _.random(20, 70);
	var top = _.random(20, 70);
	_.delay(function () {
		// if (_.random(228, 420) === 420) {
		$('body').append('<div class="kek' + height + '"></div>');
		$el = $('body').children('.kek' + height);
		var url = 'http://placecage.com/' + width + '/' + height;
		$el.append('<img src="' + url + '">');
		var css = function css() {
			return {
				position: 'fixed',
				width: width + 'px',
				height: height + 'px',
				left: left + '%',
				'margin-left': '-' + width / 2 + 'px',
				'margin-top': '-' + height / 2 + 'px',
				top: top + '%',
				'z-index': 999
			};
		};
		$el.find('img').css(css());
		_.delay(function () {
			$el.remove();
		}, 2000);
		kek();
	}, 3000);
};

// kek();