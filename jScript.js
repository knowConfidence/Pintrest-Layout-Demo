$(document).ready(function(){

	getData("data.json");

	$(window).resize(function(){

		getData("data.json");

	});

});


function getData(file){

	$.ajax({
		type: 'GET',
		url: file,
		contentType: 'application/json',
		dataType: 'json',
		success: function(json){
			make(json);
		},
		error: function(e){
			alert('error');
		}
	});
}

function addColumn(column, columnContainer, colCount){

	for (i = 0; i < colCount; i++){
		var c;

		c = column.clone();
		c.css("display", "inline");
		c.addClass("c"+ i);
		c.addClass("made");
		c.removeClass("col");
		columnContainer.append(c);
	}
}

function addCard(cardCount, noCols, jsonData){

	var colCount = 0;
	for (i = 0; i < cardCount; i++){

		if(colCount > noCols-1){
			colCount = 0;	
		}

		var card = $(".c");

		var cl = card.clone();
		//cl.css("display", "inline");
		cl.removeClass("c");

		addContent(jsonData, cl, i);

		$(".c"+colCount).append(cl);

		colCount++;
	}
}

function addContent(jsonData, card, cardID){

	var img = card.find(".card_main_image").find("#mi");
	var name = card.find(".card_name");
	var source = card.find(".card_source");
	var author = card.find(".card_profile_author");
	var category = card.find(".card_profile_category");
	var pins = card.find(".card_stats_pins");
	var likes = card.find(".card_stats_likes");

	img.attr("src", jsonData[cardID].mainImg);
	name.append(jsonData[cardID].cardName);
	source.append(jsonData[cardID].source);
	author.append(jsonData[cardID].author);
	category.append(jsonData[cardID].category);
	pins.append(jsonData[cardID].pins);
	likes.append(jsonData[cardID].likes);
}

function make(jsonData){

	$(".made").remove();

	var colsWrapper = $(".columns_wrapper");
	var col = $(".col");
	var length = jsonData.length;

	var s_width = $(window).width();

	$(".logo_text").css("display", "inline");

	if(s_width < 450){

		addColumn(col, colsWrapper, 2);

		addCard(length, 2, jsonData);

		$(".logo_text").css("display", "none");
	}
	else if (s_width < 800){

		addColumn(col, colsWrapper, 4);		

		addCard(length, 4, jsonData);
	}
	else{

		addColumn(col, colsWrapper, 6);

		addCard(length, 6, jsonData);
	}

	var el = $('.card');

	el.mouseenter(function(){
		showOverlay($(this));
	}).mouseleave(function(){
		hideOverlay($(this))
	});
}

function showOverlay(card){
	card.css('background-color', 'rgba(220, 220, 220, 1)');
	card.find(".download_save").css("display", "inline");
	card.find(".source_more").css("display", "inline");

	console.log(card.find(".card_source").html());
}

function hideOverlay(card){
	card.css("background-color", "white");
	card.find(".download_save").css("display", "none");
	card.find(".source_more").css("display", "none");
}