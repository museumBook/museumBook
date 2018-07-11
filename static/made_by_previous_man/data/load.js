$(function(){
 $('.hidescreen, .load_page').fadeIn(10); //показывает фон и индикатор
 $(window).load(function() {
  $('.hidescreen,.load_page').fadeOut(600); //скрывает, после загрузки страницы
 });
 $('.close').click(function(){ //для тех кому невтерпеж
  $('.hidescreen,.load_page').fadeOut(300); 
 });
});