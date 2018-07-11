function func() {
  var w, wx;
  w = $($(".fon1-0")).width();
  wx = w / 10950;
  positions(wx, "fon1-1", 0, 2514, 1195, 0);
  positions(wx, "fon1-2", 0, 231, 1163, 2514);
  positions(wx, "fon1-3", 0, 8205, 1256, 2745);
  positions(wx, "fon1-4", 0, 407, 911, 6675);
  positions(wx, "fon1-5", 0, 628, 1046, 7884);
  positions(wx, "fon1-6", 0, 471, 911, 4315);
  positions(wx, "fon1-7", 0, 320, 1349, 5444);
  positions(wx, "fon1-8", 0, 3657, 0, 936);
  positions(wx, "fon1-10", 0, 227, 1316, 4974);
  positions(wx, "fon1-11", 0, 354, 19, 1014);
  positions(wx, "fon1-12", 128, 149, 743, 7209);
  positions(wx, "fon1-13", 144, 128, 408, 5418);
  positions(wx, "fon1-14", 181, 444, 600, 10464);
  positions(wx, "block1-1", 613, 0, 699, 2655);
  positions(wx, "block1-2", 723, 0, 299, 2879);
  positions(wx, "block1-3", 1226, 0, 42, 4059);
  positions(wx, "block1-4", 536, 0, 615, 5841);
  positions(wx, "block1-5", 703, 0, 563, 6286);
  positions(wx, "block1-6", 621, 0, 646, 6997);
  positions(wx, "block1-7", 1231, 0, 8, 7111);
  positions(wx, "block1-8", 54, 0, 1215, 5922);
  positions(wx, "block1-9", 197, 0, 1075, 4899);
  positions(wx, "block1-10", 1239, 0, 0, 8045);
}
$(document).ready(function() {
  var tr, tr1, tr2;
  var image = new Image();
  var ptica = new Image();
  var glas = new Image();
  var shek = new Image();
  tr = false;
  tr1 = false;
  tr2 = false;
  image.src = "data/gif-1.10.gif";
  ptica.src = "data/fon-1.8.gif";
  glas.src = "data/fon-1.12.gif";
  shek.src = "data/fon-1.13.gif";
  setTimeout(function() {
    $(".fon1-8").attr("src", ptica.src);
  }, 4600);
  $(".popup_x_img").attr("src", image.src);
  $(".fon1-0").each(func);
  $(window).resize(func);
  $(".popup_x_img").load(function() {
    var w, wx, tpx, lfx, imx, imy;
    if ($("body").innerHeight() == 0) {
      hb = $(window).height();
      wb = $(window).width();
    } else {
      hb = $("body").innerHeight();
      wb = $("body").innerWidth();
    }
    w = $($(".popup_x_img")).width();
    $(".popup_x_img").css("left", (wb - $(".popup_x_img").width()) / 2 + "px");
    $(".popup_x_img").css("top", (hb - $(".popup_x_img").height()) / 2 + "px");
    tpx = $(".popup_x_img").position().top;
    lfx = $(".popup_x_img").position().left;
    wx = w / 1067;
    imx = wx * 267;
    imy = wx * 150;
    positionsx("info1-1", 150 * wx, 0, tpx + imy * 1, lfx + imx * 3);
    positionsx("info1-2", 150 * wx, 0, tpx + imy * 2, lfx + imx * 3);
    positionsx("info1-3", 150 * wx, 0, tpx + imy * 2, lfx + imx * 2);
    positionsx("info1-4", 150 * wx, 0, tpx + imy * 3, lfx + imx * 0);
    positionsx("info1-5", 150 * wx, 0, tpx + imy * 1, lfx + imx * 2);
    positionsx("info1-6", 150 * wx, 0, tpx + imy * 0, lfx + imx * 1);
    positionsx("info1-7", 150 * wx, 0, tpx + imy * 1, lfx + imx * 1);
    positionsx("info1-8", 150 * wx, 0, tpx + imy * 1, lfx + imx * 0);
    positionsx("info1-9", 150 * wx, 0, tpx + imy * 3, lfx + imx * 2);
    positionsx("info1-10", 150 * wx, 0, tpx + imy * 3, lfx + imx * 3);
    positionsx("info1-11", 150 * wx, 0, tpx + imy * 2, lfx + imx * 1);
  });
  $(document).mousemove(function(e) {
    var x = e.pageX;
    var w, wx, x0, x1;
    w = $($(".fon1-0")).width();
    if (tr == false) {
      wx = ((10928 - 227 - 4974) * w) / 10950;
      x0 = (4974 * w) / 10950;
      if (x > x0) {
        $(".fon1-10").animate({ left: "+=" + wx }, 18998);
        tr = true;
      }
    }
    if (tr1 == false) {
      x0 = (6820 * w) / 10950;
      x1 = (7875 * w) / 10950;
      if (x > x0 && x < x1 && $(".fon1-6").is(":animated") == false) {
        tr1 = true;
        $(".fon1-12").css("z-index", "100");
        $(".fon1-12").attr(
          "src",
          glas.src
        ); /*setTimeout(function() {$('.fon1-12').css("z-index", '0');}, 1000);*/
      }
    }
    if (tr2 == false) {
      x0 = (4800 * w) / 10950;
      x1 = (5846 * w) / 10950;
      if (x > x0 && x < x1) {
        tr2 = true;
        $(".fon1-13").css("z-index", "100");
        $(".fon1-13").attr(
          "src",
          shek.src
        ); /*setTimeout(function() {$('.fon1-13').css("z-index", '0');}, 15000);*/
      }
    }
  });

  $(".block1-6").hover(
    function() {
      $(".fon1-12").css("z-index", "0");
    },
    function() {
      setTimeout(function() {
        $(".fon1-12").css("z-index", "100");
      }, 500);
    }
  );

  $(".fon1-10").load(function() {
    var w, wx;
    w = $($(".fon1-0")).width();
    wx = (4974 * w) / 10950;
    $(".fon1-0").css("left", wx + "px");
  });

  document.getElementById("go").addEventListener("click", function() {
    window.parent.postMessage("go", "*");
  });
});

setInterval(function() {
  func();
}, 500);
