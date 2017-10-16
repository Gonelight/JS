    $(document).ready(function(){
      var basket = new Basket();
      $("#buy1").on("click", function() {
        basket.add(111, 1);
      });
      $("#buy2").on("click", function() {
        basket.add(222, 1);
      });
      $("#buy3").on("click", function() {
        basket.add(333, 1);
      });
      $("#buy4").on("click", function() {
        basket.add(444, 1);
      });

      $("#cancel1").on("click", function() {
        basket.delete(111, 1);
      });
      $("#cancel2").on("click", function() {
        basket.delete(222, 1);
      });
      $("#cancel3").on("click", function() {
        basket.delete(333, 1);
      });
      $("#cancel4").on("click", function() {
        basket.delete(444, 1);
      });
    });