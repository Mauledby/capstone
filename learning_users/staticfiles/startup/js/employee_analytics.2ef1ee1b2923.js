
   		function err_msg(inp, err) {
            if ($(inp).next(".validation").length == 0) { // only add if not added
                $(inp).css("background-color", "#FFBABA");
                    $(inp).after("<div class='validation' style='color:red;margin-bottom: 5px;'>" + err + "</div>");
            }
        }

$("input").click(function() {
  removeVal(this);
});
$("input").change(function() {
  removeVal(this);
});

function removeVal(inp) {
  $(inp).css("background-color", "");
    $(inp).next(".validation").remove();
}

$("#eng-book-venue").change(function() {
	alert($("#eng-book-venue option:selected").text());
});

		jQuery(document).ready(function() {
			jQuery('#example').DataTable({
				"searching": false,
				"paging": true,
				"info": false,
				"lengthChange":false
			});

		})

		$('#disablebuttone').click(function(){
			if($('#emp-email').prop('disabled')){
			 $('#emp-email').prop('disabled', false)
			}
			else{
			 $('#emp-email').prop('disabled', true)
			}
		});
		$('#disablebuttonp').click(function(){
			if($('#phone-number').prop('disabled')){
			 $('#phone-number').prop('disabled', false)
			}
			else{
			     $('#phone-number').prop('disabled', true)
			  }
		});

		$('#btn-save-profile').click(function(){
			var id = $("#employee_id").val();
			var emp_email = $("#emp-email").val();
			var phone_number = $("#phone-number").val();
			var len_phone = $("#phone-number").val().length;
			var err = false;
            if (phone_number.length < 11 || phone_number.length > 13) {
                err_mesg("#phone-number", "Enter a valid mobile phone");
                if (!err) {
                    err = true;
                    $("#phone-number").focus();
                }
            }
            var email_sp = $("#emp-email").val().split("@");
            if (email_sp.length !== 2 || email_sp[1].split(".").length < 2) {
                err_mesg("#emp-email", "Enter a valid email");
                if (!err) {
                    err = true;
                    $("#emp-email").focus();
                }
            }
			if (!err){
				$.ajax({
		               url: '/startup/employee/analytics/profile/ajax',
		               type: 'POST',
		               dataType: 'json',
		               data: {
		                  'id': id,
		                  'emp_email' : emp_email,
		                  'phone_number' : phone_number,
		                  'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
		               },
		               success: function(data){
		              if (data.form_is_valid){
		                console.log('Email and Phone Number updated.')		                
		              }else{
		                alert('Email and Phone Number updated.')
		              }
		            }            
		        })//end ajax	
			}//end if
		}) //save-btn-profile

		$('#btn-save-password').click(function(){			
			var id = $("#employee_id").val();			
			var old_pwd = $("#old-pwd").val();
			var new_pwd = $("#new-pwd").val();
			var con_pwd = $("#confirm-pwd").val();
			if (old_pwd == '')
				alert('Please enter old password')
			else
			{
				$.ajax({
		               url: '/startup/employee/analytics/password/ajax',
		               type: 'POST',
		               dataType: 'json',
		               data: {
		                  'id': id,
		                  'old_pwd' : old_pwd,
		                  'new_pwd' : new_pwd,
		                  'con_pwd' : con_pwd,
		                  'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
		               },
		               success: function(data){
		              if (data.error == ''){
		                alert('Password Changed Successfully');

						$("#old-pwd").val("");
						$("#new-pwd").val("");
						$("#confirm-pwd").val("");
		              }else{
		                alert(data.error);
		              }
		            }            
		        })//end ajax	
		    }
		}) //save-btn-password

	
		function Ajax(){
			var $populationChart = $("#myChart");
			var employee_id = $('#employee_id').val();
	      	var chkCoins =$('#id_coins').prop("checked");
	      	var chkPoints = $('#id_points').prop("checked");
	      	var fromDate =$('#id_fromDateP').val();
	      	var toDate =$('#id_toDateP').val();      	
	      	$.ajax({
	        	url: '/startup/employee/chart',
	        	data: {
	        		'teamID': employee_id,
	        	 	'chkCoins' : chkCoins,
	        	 	'chkPoints' : chkPoints,
	        	 	'fromDate': fromDate,
	        	 	'toDate': toDate,
	        	 	'type': type
	        	 },
	        	success: function (data) {
	          		var ctx = $populationChart[0].getContext("2d");
	          		new Chart(ctx, {
	            		type: 'line',
	            		data: data,
	            		options: {
	              			responsive: true,
	              			legend: {
	                			position: 'top',
	              			},
	              			title: {
	                			display: false,
	                			text: ''
	              			},
	            		}
	         		 }); //end new chart
        		} //end success
      		}); //end ajax
		} //end Ajax()

    $(document).on('click', '#id_coins', function(){
      	Ajax();
    });
    $(document).on('click', '#id_points', function(){
      	Ajax();
    });

	$(document).on('change', '#id_toDateP', function(){
         Ajax();
    });

	$(document).on('change', '#id_fromDateP', function(){
         Ajax();
    });
	$(document).on('click', '#id_month', function(){
		type='month';		
      	Ajax();
    });

    $(document).on('click', '#id_week', function(){
    	type='week';    	
      	Ajax();
    });

	$(document).on('click', '#id_day', function(){
		type='day';		
      	Ajax();
    });
	