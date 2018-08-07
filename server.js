let fs = require("fs");
var options = {
	key: fs.readFileSync('/etc/pki/tls/private/myperformance.key').toString(),
	cert: fs.readFileSync('/etc/pki/tls/private/e34873f75a03d18f.crt').toString()
};	
require('events').EventEmitter.defaultMaxListeners = Infinity;
let app = require('express')(),
	express = require('express'),
	server = require('https').Server(options, app),
	mustache = require('mustache')
	bodyParser = require('body-parser'),
	path = require("path");

var request = require('request');
var cors = require('cors');	
var dbConfig = require("./Utilities/dbConfig");
var denDAO = require('./DAO/denDAO');
var userDAO = require('./DAO/userDAO');

function twoDigits(d) {
	if(0 <= d && d < 10) return "0" + d.toString();
	if(-10 < d && d < 0) return "-0" + (-1*d).toString();
	return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};	
    let userRoute = require('./Routes/user'),
		adminRoute = require('./Routes/admin'),
		compRoute = require('./Routes/competition'),
		capRoute = require('./Routes/capsule'),
		denRoute = require('./Routes/dentist'),
		bookRoute = require('./Routes/booking'),
        util = require('./Utilities/util'),
        config = require("./Utilities/config").config;

    app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));    
	app.use(cors());
	app.use(function (req, res, next) {
	  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200')
	  
	  res.header("Access-Control-Allow-Origin", "*");
	  
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		 
	  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	  res.setHeader('Access-Control-Allow-Credentials', true);
	  
	  next()
	});
	

    app.use(function(err, req, res, next) {
        return res.send({ "errorCode": util.statusCode.FOUR_ZERO_ZERO, "errorMessage": util.statusMessage.SOMETHING_WENT_WRONG });
    });

    app.use('/api/user', userRoute);
    app.use('/api/admin', adminRoute);
    app.use('/api/competition', compRoute);
	app.use('/api/capsule', capRoute);
	app.use('/api/dentist', denRoute);
	app.use('/api/booking', bookRoute);
	
	app.use(express.static(path.join(__dirname, '/dist')))
	app.use(express.static(path.join(__dirname, '/src')))
	app.use(express.static(path.join(__dirname, '/public')))
	


app.use("/static", express.static(path.join(__dirname, 'uploads')));
		app.get('*', (req, res) => {
		  res.sendFile(path.join(__dirname, '/dist/index.html'));
		})	

//socket implementation


var io = require('socket.io')(server);

var clientsDetailArr=[];
var clients = 0;

io.on('connection', function(socket) {
   clients++;
	console.log('connected with socket id '+socket.id);
   socket.on('savesocket', function(data){
	   console.log('dentist socket saved');
	   var criteria={
			uid:data.uid , 
		   };
		   
		var dataToSet={
			socketId:socket.id
		}
		
		denDAO.updateUser(criteria,dataToSet, (err, dbData) => {
			if (err) {
				return;
			}	
			console.log('socket of connected dentist saved in db');
		});
		
   });
   
   socket.on('save_socket_user', function(data){
	   console.log('user socket save initialized');
	   var criteria={
			uid:data.uid , 
		   };
		   
		var dataToSet={
			socketId:socket.id
		}

		userDAO.updateUser(criteria,dataToSet,{}, (err, dbData) => {
			if (err) {
				// console.log(err);
				return;
			}	
			if(socket.id){
				console.log('user socket saved in db and saved_socket emitted');
				io.sockets.to(socket.id).emit('saved_socket',{"socket_id":socket.id});   
			}
		});
		
   });
   
   
   socket.on('search_dentist', function(data){
	   console.log('search dentist');
		var criteria={uid:data.uid, booking_id:data.booking_id, socket_id:data.socket_id };
		denDAO.searchNearestOnlineIdleDentist(criteria, (err, dbData) => {
			if (err) {
				console.log(err);
				return;
			}
			if(dbData[0]){ 
				console.log('sending request to dentist with email id '+ dbData[0].email);
				io.sockets.to(dbData[0].socketId).emit('appointment_request',criteria);   
			}
			else{
				console.log('there is not dentist available ');
				io.sockets.to(data.socket_id).emit('no_dentist',{msg:"no dentist available please try again later."});   
			}
		});
   })
	socket.on('payment_received', (data) => {
		if(data){
			var criteria={
				uid:data.uid,
			}
			userDAO.getUsers(criteria, (err, dbData)=>{
				if(err){
					// console.log(err);
				}
				var dataToSet={
					userType:data.payment_type,
					credit:data.payment_type=='free'?dbData[0].credit:(dbData[0].credit==0?dbData[0].credit:parseInt(dbData[0].credit)-1)
				}
				if(dbData[0].socketId){
					userDAO.updateUser(criteria, dataToSet, {}, (err, dbDataFinalSetCredit)=>{
						if(err){
							console.log(err);
						}
						else{
							if(dbData[0].socketId){
								io.sockets.to(dbData[0].socketId).emit('initiate_call', {credit:parseInt(dbData[0].credit)-1,renewable_date:dbData[0].renewable_date});
								io.sockets.to(data.socket_id).emit('user_payment_received',{ data: data});
							}
						}
					});
				}
			});	
		}
	});
	
	
	socket.on('call_ended', (data) => {
		if(data){			
			if(data.socket_id){
				io.sockets.to(data.socketId).emit('call_end', {"msg":"call ended by dentist"});
			}
		}
	});
   
   socket.on('accepted_call', function(data){
	   var criteria={uid:data.uid};
		denDAO.accepted_call(criteria, (err, dbData) => {
			if (err) {
				return;
			}
			var criteria2={did:data.uid,id:data.booking_id};			
			denDAO.dentist_booking(criteria2, (err, dbData6) => {
				if (err) {
					return;
				}
				var criteria5={
					uid:data.uid
				};
				denDAO.getUserDoctor(criteria5, (err, dbData5) => {
					if (err) {
						return;
					}
					console.log('booking_confirmed');
					io.sockets.to(data.socket_id).emit('booking_confirmed',{ result: {uid:dbData5[0].uid, photo_url:dbData5[0].photo_url, email:dbData5[0].email, name:dbData5[0].firstName+dbData5[0].lastName, gender:dbData5[0].gender, regNumber:dbData5[0].regNumber, socketId:dbData5[0].socketId}});
					
				});
			});
		});
	});
	socket.on('declined_call', function(data){
		var criteria5={
			uid:data.did
		};
		denDAO.getUserDoctor(criteria5, (err, dbData5) => {
			if (err) {
				return;
			}

			var criteria={
			   uid:data.did
			};
			var dataToSet={
				booked:'0'.toString(),
				declined_calls:dbData5[0].declined_calls+1,
				last_declined_call_time:new Date().toMysqlFormat(),
				total_declined_calls:dbData5[0].declined_calls+1,
			};
			denDAO.declined_call(criteria, dataToSet,(err, dbData) => {
				if (err) {
					console.log('err', err);
					return;
				}
				console.log('Redirect to another doctor');			
				var criteria7={uid:data.uid, booking_id:data.booking_id};
				denDAO.searchNearestOnlineIdleDentist(criteria7, (err, dbData7) => {
					if (err) {
						return;
					}
					if(dbData7[0]){
						console.log("lets Declined call"); 
						var criteria= {
							uid:data.did
						}
						var dataToSet={
							declined_calls:"0".toString()
						}
						userDAO.updateUser(criteria,dataToSet, {}, (err, updatedDeclinedFlags)=>{
							if(err){
								io.sockets.to(data.socket_id).emit('no_dentist',{msg:"database related error in update declined_call flag"});
							}
							io.sockets.to(dbData7[0].socketId).emit('appointment_request',data);   
						})
						
					}else{
						io.sockets.to(data.socket_id).emit('no_dentist',{msg:"no dentist available please try again later."});
						console.log('no dentist is availble');
					}
				});
			});
		});
	});
   socket.on('disconnect', function () {
	  	console.log('disconnected with socket id '+socket.id);
		// var criteria={
			// socketId:socket.id
		// };
		// denDAO.getUserDoctor(criteria, (err, dbData5) => {
			// if (err) {
				// console.log(err);
				// return;
			// }
			// console.log(socket.id);
			// if(dbData5[0]){
				// if(dbData5[0].uid){
					// var criteria={
						// socketId:socket.id
					   // };
					   
					// var dataToSet={
						// online:"0".toString()
					// }
					// denDAO.updateUser(criteria, dataToSet, (err, dbData) => {
						// if (err) {
							// return;
						// }	
						// console.log('disconnect a dentist make him offline');
					// });
				// }
			// }
			// else{
				// console.log('user is in this scope dont we cant make offline');
			// }
		// });
   });
});


		
    server.listen(config.NODE_SERVER_PORT.port,function(){
    	console.log('Server running on port '+config.NODE_SERVER_PORT.port);
    });
