$(document).ready(function(){
  $("#btn_key").click(function(){
    $("#div_key").load("http://localhost:3000/publicKey");
  });
  $("#btn_trans").click(function(){
    $("#div_trans").load("http://localhost:3000/transactions");
  });
  $("#btn_blocks").click(function(){
    $("#div_blocks").load("http://localhost:3000/blocks");
  });
  $("#btn_broadcast").click(function(){
    $("#div_broadcast").load("http://localhost:3000/mine-transactions");
  });
  $("#btn_mine").click(function(){
    $.post("http://localhost:3000/mine",{
  "data" : "foo-bar"
  },
    function(data, status){
       $("#div_mine").load("http://localhost:3000/blocks");
    });
  });


  $("form").submit(function (event) {
    var formData = {
      receipient: $("#receipient").val(),
      amount: $("#amount").val()
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:3000/transact",
      data: formData,
      dataType: "json",
      encode: true,
    }).done(function (data) {
      $("#div_transact").load("http://localhost:3000/transactions");
    });

    event.preventDefault();
  });

});