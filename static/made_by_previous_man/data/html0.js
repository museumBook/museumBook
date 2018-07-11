function positions(wx,nm,hg, wd, tp , lf) {
	if (hg!=0){$("."+nm).css("height", hg * wx+ "px")};
	if (wd!=0){$("."+nm).css("width", wd * wx+ "px")};
	$("."+nm).css("top", tp * wx  + "px"); 
	$("."+nm).css("left", lf * wx + "px");
}
function positionsx(nm,hg, wd, tp , lf) {
	if (hg!=0){$("."+nm).css("height", hg + "px")};
	if (wd!=0){$("."+nm).css("width", wd + "px")};
	$("."+nm).css("top", tp   + "px"); 
	$("."+nm).css("left", lf  + "px");
}
$(document).ready(function() {
	var h0, h1, w0, w1, l0, t0, attr;
	$(".image , .imageonly, .go").hover(function() {
	if( $(this).is(':animated') ) {$(this).stop(false, true);$(this).stop(false, true);};
		if (attr == $(this).attr('alt')) {
			$(this).css("height", h0 + "px");
			$(this).css("width", w0 + "px");
			$(this).css("left", l0 + "px");
			$(this).css("top", t0 + "px");
		} else {
			attr=$(this).attr('alt');
			h0 = $(this).height();
			w0 = $(this).width();
			l0 =  ($(this).offset().left);
			t0 =  ($(this).offset().top);
		}
		h1 = 0.025 * h0;
		w1 = 0.025 * w0;
		$(this).animate({height  : h0+h1,width   : w0+w1,left            : "-="+(w1/4),top             : "-="+h1}, 500);
	}, 
	function() {$(this).animate({height  : h0,width   : w0,left            : "+="+(w1/4),top             : "+="+h1}, 500);});
	$(".image").click(function(){
	  	var img = $(this);		
		var wb,hb;
		$(".popup").fadeTo(0, 0);
		$('.popup').clearQueue();
		$('.popup_text').append(img.attr('info'));
		$(".popup_img").attr("src",img.attr('alt'));
		$(".popup_text").css("top","auto"); 
	});
	$(".popup_img").load(function() {
		if ($("body").innerHeight() == 0) {
			hb = $(window).height();
			wb = $(window).width();
		} else {
			hb =  $("body").innerHeight();
			wb = $("body").innerWidth();
		};
		$(".popup_bg").css("height", hb + "px"); 
		$(".popup_img").css("left", (wb - $('.popup_img').width()*1067/600)/2 + "px");
		$(".popup_img").css("top", (hb - $('.popup_img').height())/2 + "px");
		$(".popup_info").css("height", $('.popup_img').height()+ "px"); 
		$(".popup_info").css("width", wb - $('.popup_img').width()-2*$('.popup_img').position().left+ "px");
		$(".popup_info").css("top",$('.popup_img').position().top+ "px"); 
		$(".popup_info").css("left",$('.popup_img').position().left + $('.popup_img').width() + "px");
		$(".popup_text").css("width",$('.popup_info').width()-60 + "px"); 
		$('.popup').css("z-index", '100');
		$(".popup_text").css("top",(hb-$('.popup_text').height())/2 - $('.popup_img').position().top-3 + "px"); 
		$(".popup").fadeTo(900, 1);
	});
	$(".popup_bg").click(function(){
		$('.popup').css("z-index", '-10');
		$(".popup_img").attr("src",'');
		$(".popup_text").empty();
	});
	$(".imageonly").click(function(){
		$(".popup_x").fadeTo(0, 0);
		$(".popup_x_img").attr('src', image.src);
		$('.popup_x').css("z-index", '100');
		$(".popup_x").fadeTo(900, 1);
	$(".popup_x_bg").click(function(){	  
		$(".popup_x").fadeOut(800);	
		$('.popup_x').css("z-index", '-10');
		});
	});	
	$(".info").click(function(){
	  	var img = $(this);
		var src = img.attr('src');
		$("body").append("<div class='popup_only'><div class='popup_only_bg'></div><img src="+src+" class='popup_only_img' /></div>"); 
		$(".popup_only").fadeIn(800);
		$(".popup_only_bg").click(function(){
			$(".popup_only").fadeOut(800);
			setTimeout(function() {
			$(".popup_only").remove();
			}, 800);
		});
	});
});