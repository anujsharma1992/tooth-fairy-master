<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</head>
<body>
<div class='header'></div>
<div style='text-align:center' id="updateErrormsg"></div>
<div style='display:none;text-align: center;' id='passwordResetForm'>
	<div class="login_wrap">
	<h3>Reset Password</h3>
	<div class="inputrw">
	<label>Password :</label>
	<input id='password' type='password' value=""></input>
	</div>
	<div 
	class="inputrw"><label>Confirm Password :</label>
	<input id='confirm_password' type='password' value=""></input>
	</div>
	<input id='setPasswordBTN' type='submit' value="Submit"></input>
	</div>
</div>
<style>
html, body{
	font-family: 'Roboto', sans-serif;
	margin:0;
	padding:0;
	position:relative;
	height:100%;
	min-height:100%;
	background: #1e5799;
	background: -moz-linear-gradient(top, #1e5799 0%, #2989d8 51%, #7db9e8 100%);
	background: -webkit-linear-gradient(top, #1e5799 0%,#2989d8 51%,#7db9e8 100%);
	background: linear-gradient(to bottom, #1e5799 0%,#2989d8 51%,#7db9e8 100%);
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 );
	
}
.login_wrap{
	position:absolute;
	width:300px;
	top:50%;
	left:50%;
	padding:20px;
	transform:translate(-50%, -50%);
	background:rgba(255,255,255,0.3);
	border-radius:8px;
}
.login_wrap h3{font-size:20px;
color:#000;
text-transform:uppercase;
}
.inputrw{
	margin-bottom:20px;
}
.inputrw label{
	display:block;
	margin-bottom:5px;
	text-align:left;
	color:#282828;
}
.inputrw input{
	width:280px;
	padding:10px;
	border:0px;
	border-radius:8px;
	outline:none;
}
label{
	display:block;
}
#setPasswordBTN{
	background-color:#0567b7;
	font-size:18px;
	color:#fff;
	padding:10px;
	margin:5px;
	border:0;
	width:280px;
	border-radius:8px;
	outline:none;
	
}
</style>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script>
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};
var url_forgotToken = getUrlParameter('forgotToken');
var url_email = getUrlParameter('email');
	$(document).ready(function(){
		$.get("https://www.myperformanceapp.com:5001/api/user/verifyForgotLink?email="+url_email+"&forgotToken="+url_forgotToken, function(data, status){
			console.log(data);
			if(data.code==200 && status=='success'){
				$("#passwordResetForm").show();
			}
			else{
				$('#passwordResetForm').remove();
				$('body').append('<div style="color:red;text-align: center;">link expired!!!</div>');
			}
		});	
	});
$('#setPasswordBTN').click(function () {
 $("#updateErrormsg").html("");
 		var user_email = getUrlParameter('email');
	    var password = $('#password').val();
	    var confirm_password = $('#confirm_password').val();
	    if(password != confirm_password){
            $("#updateErrormsg").html("<font style='font-size:14px;margin-top:-15px;' color='red'>&nbsp&nbsp;Password and Confirm Password not matching.<br></font>"); //error message..
	    }
	    else if(password.length<6){
            $("#updateErrormsg").html("<font style='font-size:14px;margin-top:-15px;' color='red'>&nbsp&nbsp;Please set password of minimum 6 character length.<br></font>"); //error message..
	    }
	    else{
	  		$.ajax({
	          type:"POST",
	          url:"https://www.myperformanceapp.com:5001/api/user/updateForgotPassword",
	          data:{email:user_email,password:password},
	          success: function(response){
				  console.log(response);
	            if(response.code == 200){
	                $("#updateErrormsg").html("<font style='font-size:14px;margin-top:-15px;text-align:center;color:green'>Congratulations ! Password updated successfully.</font>");
					$('#passwordResetForm').hide();
	            } else {
	                $("#updateErrormsg").html("<font style='font-size:14px;margin-top:-15px;' color='black'>Some error occured. Please try again later.</font>");
	            }
	          }
	      	});
	    }
  	});
</script>

</body>
</html>