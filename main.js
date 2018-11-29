// Polyfill for Array.find
// https://stackoverflow.com/questions/35135127/adding-a-function-to-array-prototype-in-ie-results-in-it-being-pushed-in-to-ever

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function(predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    }
  });
}

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
