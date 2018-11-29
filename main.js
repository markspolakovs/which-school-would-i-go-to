$(function() {
  $.getJSON(
    // prettier-ignore
    window.location.pathname + "I AM INVINCIBLE.json"
  ).then(function(data) {
    $(".loading-message").remove();
    $("#lookup").click(function() {
      const val = $("#postcode").val();
      const entry = data.find(function(x) { return x.code_postal === val;});
      if (entry) {
        $("#result").text(
          "You would go to " + (entry.kirchberg ? "Kirchberg" : "Mamer")
        );
      } else {
        $("#result").text("Postcode not found.");
      }
    });
  });
});
