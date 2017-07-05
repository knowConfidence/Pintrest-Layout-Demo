$(document).ready(function(){

	var card = "<div class='col-xs-4 col-sm-2 frame card_con'>"+
			   		"<div class='col-xs-12 clamp cards'></div>"+
			   "</div>";

	$(".card_con").remove();
	makeColumns(card, $(window).width());


	$(window).resize(function(){

		$(".card_con").remove();

		makeColumns(card, $(window).width());
	});
});

function makeColumns(card, sWidth){

	loadJSON(function(response) {
	    // Parse JSON string into object
		actual_JSON = JSON.parse(response);
		var count = actual_JSON.length;

		var colCount = 0;
	
		if(sWidth < 450){
			for(i = 0; i < 3; i++){
				$(".columns_container").append(card);
				$(".card_con").find(".cards").eq(i).addClass("column_"+i);
			}
			for(j = 0; j < count; j++){

				$(".column_"+colCount).append(makeCard(actual_JSON[j].mainImg));

				colCount+=1;
				if(colCount >= 3){ colCount = 0; }
			}
		}
		else{
			for(i = 0; i < 5; i++){
				$(".columns_container").append(card);
				$(".card_con").find(".cards").eq(i).addClass("column_"+i);
			}
			for(j = 0; j < count; j++){

				$(".column_"+colCount).append(makeCard(actual_JSON[j].mainImg));

				colCount+=1;
				if(colCount >= 5){ colCount = 0; }
			}
		}

	});
}

function makeCard(mainImage){

	var content = 	'<div class="col-xs-12 clamp card">' +

					'<div class="col-xs-12 frame">' +
						'<img class="img-responsive" width="100%" src="'+ mainImage +'">' + 
					'</div>' +
					'<div class="col-xs-8 card_info frame text">' +  
						'<div class="card_title"> card name </div>' +
						'<div class="card_source"> source </div>' +
					'</div>' + 

					'<div class="col-xs-4 frame text">' +   
						'<div class="stats likes">l</div>' +  
						'<div class="stats pins">p</div>' +
					'</div>' +

					'<div class="col-xs-12 frame card_profile">' +
						'<div class="col-xs-2 clamp">' +
							'<img class="profile_pic" src="http://via.placeholder.com/50x50" width="100%">' +
						'</div>' +

						'<div class="col-xs-10 frame author">' +
							'<div class="text"> author </div>' +
							'<div class="text"> category </div>' + 
						'</div>' +
					'</div>' +

					'</div>';

	return content;
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }