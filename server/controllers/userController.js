const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var kue = require('kue')
  , queue = kue.createQueue();

class UserController {
	static getUser(req, res){
		User.find()
		.then(data => {
			res.status(200).json({
					message: 'Users summoned',
					data: data,
				})
		})
		.catch(error => {
			res.status(400).json({
					message: 'Error occured',
					error: error
				})
		})
	}
	static getUserId(req,res){
		User.find({'_id': req.params.id})
		.then( user => {
			res.status(200).json({
					message: 'Users summoned',
					data: user,
				})
		})
		.catch(error => {
			res.status(400).json({
					message: 'Error occured',
					error: error
				})
		})
	}
	static signIn(req, res){
		User.find({'username': req.body.username})
		.then(user => {
			if (user.length == 0) {
				res.status(404).json({
					message: 'User not found',
				})
			}
			if (bcrypt.compareSync(req.body.password, user[0].password)) {
				let payload = {
					userId: user[0]._id,
					username : user[0].username,
					email : user[0].email
				}
				jwt.sign(payload, process.env.SECRET_KEY, (error, token)=>{
					if (error) {
						res.status(403).json({message: 'User and password wrong', error: error})
					} else {
						req.headers.token = token;
						res.status(200).json({
							message: 'User signed in successfully',
							data: token,
							userId : user[0]._id
						})
					}
				})
			}
		})
	}
	static createUser(req,res){
		let data = {
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
		}
		User.create(data)
		.then(user => {
			var job = queue.create('email', {
			    title: 'Welcome Email',
			    from: 'Admin <hello@dhnlr.com>', // sender address
			    to: req.body.email, // list of receivers
			    subject: 'Welome to QnA', // Subject line
			    text: "It's nice to having you in. Hope you can get benfit from this shit.", // plain text body
			    html: `
			    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"> 
						<html xmlns="http://www.w3.org/1999/xhtml">
						 <head>
						  <title>Passion - Responsive Email Template</title>
						  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
						  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
						  
						  <link href='http://fonts.googleapis.com/css?family=Raleway:600,700,400' rel='stylesheet' type='text/css'>
						  
						  <!--
						    **********************************************
						         Template by => http://pixelhint.com
						    **********************************************
						  -->
						  
						  <!--  General CSS  -->
						  <style type="text/css">
						    html{
						        width: 100%; 
						    }

						    body{
						      width: 100%;  
						      margin:0; 
						      padding:0; 
						      -webkit-font-smoothing: antialiased;
						      mso-margin-top-alt:0px; 
						      mso-margin-bottom-alt:0px; 
						      mso-padding-alt: 0px 0px 0px 0px;
						      background: #E7E7E7;
						    }

						    p,h1,h2,h3,h4{
						      margin-top:0;
						      margin-bottom:0;
						      padding-top:0;
						      padding-bottom:0;
						    }

						    table{
						      font-size: 14px;
						      border: 0;
						    }

						    img{
						      border: none!important;
						    }
						  </style>

						  <!--  Responsive CSS  -->
						  <style type="text/css">
						    @media only screen and (max-width: 800px) {
						      body[yahoo] .quote_full_width {width:100% !important;}
						      body[yahoo] .quote_content_width {width:90% !important;}
						    }

						    @media only screen and (max-width: 640px) {
						      body[yahoo] .full_width {width:100% !important;}
						      body[yahoo] .content_width{width:80% !important;}
						      body[yahoo] .center_txt {text-align: center!important;}
						      body[yahoo] .post_sep {width:100% !important; height:60px !important;}
						      body[yahoo] .gal_sep {width:100% !important; height:40px !important;}
						      body[yahoo] .gal_img {width:100% !important;}
						      body[yahoo] .bb_space {height:90px !important;}
						    
						    }  
						  </style>
						</head>
						<body style="margin: 0; padding: 0;" yahoo="fix">

						  <!--  billboard  -->
						  <table border="0" cellpadding="0" cellspacing="0" width="100%" background="img/billboard.jpg" bgcolor="#2a3647" style="background-image:url('http://pixelhint.com/demo/passion/img/billboard.jpg'); background-size: cover; -webkit-background-size: cover; -moz-background-size: cover -o-background-size: cover; background-position: bottom center; background-repeat: no-repeat; background-color:#2a3647;">

						    <!--  header  -->
						    <tr>
						      <td>
						          <table width="600" cellpadding="0" cellspacing="0" align="center" border="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; border:0; text-align:center;" class="content_width">    
						            <!--  spacing  -->
						            <tr>
						              <td width="100%" height="40">&nbsp;</td>
						            </tr>
						            <!--  end spacing  -->

						            <!--  Logo  -->
						            <tr> 
						              <td>
						                <img src="https://pbs.twimg.com/profile_images/697078471973953537/71CRXN7S_400x400.png" width="105" height="auto" alt="" title="" border="0" style="border:0; display:inline_block;"/>
						              </td>
						            </tr>
						            <!--  end logo  -->

						            <!--  spacing  -->
						            <tr>
						              <td width="100%" height="40">&nbsp;</td>
						            </tr>
						            <!--  end spacing  -->

						            <!--  vertical separator  -->
						            <tr>
						              <td>
						                <table width="600" height="1" align="center" bgcolor="#343f53" border="0"  cellpadding="0" cellspacing="0"style="height:1px!important; width:600px; background-color:#343f53; padding:0; border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
						                  <tr>
						                    <td></td>
						                  </tr>
						                </table>
						              </td>
						            </tr>
						            <!--  end vertical separator  -->
						          </table>
						      </td>
						    </tr>
						    <!--  end header  -->
						    
						    <!--  spacing  -->    
						      <tr>
						        <td height="80">&nbsp;</td>
						      </tr>
						    <!--  end spacing  -->

						    <!--  caption  -->
						    <tr>
						      <td>
						        <table width="600" cellpadding="0" cellspacing="0" align="center" class="content_width" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"> 
						          <tr>
						            <td>
						              <table width="450" cellpadding="0" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="content_width" align="left">
						                <tr>
						                  <td style="color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 34px; font-weight: 700; text-transform: uppercase; line-height:50px; letter-spacing:1px;">Howdy, ${req.body.username}! It's nice to having you in.</td>
						                </tr>
						              </table>
						            </td>
						          </tr>
						        </table>          
						      </td>
						    </tr>
						    <!--  end caption  -->
						    
						    <!--  spacing  -->    
						      <tr>
						        <td height="40">&nbsp;</td>
						      </tr>
						    <!--  end spacing  -->

						    <!--  download btn  -->
						    <tr>
						      <td>
						        <table width="600" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;" class="content_width">
						          <tr>
						            <td>
						              <table width="200" cellpadding="0" cellspacing="0" align="left" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; background: #f5a65b;" class="center">
						                <tr>
						                  <td width="100%" height="20"></td>
						                </tr>
						                <tr>
						                  <td>               

						                    <table width="100%" cellpadding="0" cellspacing="0" align="center" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; text-align:center;">
						                      <tr>
						                        <td align="center" style="text-align:center;">
						                          <a href="qna.dhnlr.com" style="display: block; width: 100%; color: #fff; font-family: 'Raleway', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; text-decoration:none; letter-spacing:1px; text-transform:uppercase;">Ask Now!</a>
						                        </td>
						                      </tr>
						                    </table>

						                  </td>
						                </tr>
						                <tr>
						                  <td width="100%" height="20"></td>
						                </tr>
						              </table>
						            </td>
						          </tr>
						        </table>
						      </td>
						    </tr>
						    <!--  end download btn  -->   
						    
						    <!--  spacing  -->    
						    <tr>
						      <td height="200" width="100%">&nbsp;</td>
						    </tr>
						    <!--  end spacing  -->
						  </table>
						</body>
			`
			}).priority('normal').attempts(5).save( function(err){
			   if( !err ) {
			    console.log( job.id )
			  } else {
			    console.log(err)
			  };
			});
			res.status(200).json({
					message: 'Users created',
					data: data,
				})
		})
		.catch(error => {
			console.log(error)
			res.status(400).json({
					message: 'Error occured',
					error: error
				})
		})
	}
	static updateUser(req,res){
		User.find({'_id': req.params.id})
		.then(user => {
			let data = {
				username: req.body.username || user[0].username,
				password: req.body.password || user[0].password,
			}
			User.findOneAndUpdate({'_id': req.params.id}, {$set: data}, {upsert: true, new : true})
			.then(()=>{
				res.status(200).json({
						message: 'Users updated',
						data: data,
					})
			})
			.catch(error=> {
				res.status(400).json({
						message: 'Error occured',
						data: error
					})
			})
		})
	}
	static deleteUser(req,res){
		User.remove({'_id': req.params.id})
		.then(data => {
			res.status(200).json({
					message: 'Users delete',
					data: data
				})
		})
		.catch(error => {
			res.status(400).json({
					message: 'Error occured',
					data: error
				})
		})
	}
}

module.exports = UserController;