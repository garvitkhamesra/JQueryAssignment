var headingText = '';
var bodyText = '';
var cell = "";

$.getJSON("data.json", function(json) {
    $('<div class="Table"></div>').appendTo('body');
    var heading = json.result[0].heading;
    headingText += '<div class="Heading">';
    $.each( heading, function( key, value ) {
        headingText += '<div class=' + value + '>';
        headingText += '<input id= "search'+ value +'">';
        headingText += '<p>' + value + '</p>';
        headingText += '</div>';
    });

    headingText += '<div class="filter">' +
                   '<i class="fa fa-sort-desc" aria-hidden="true"></i>' +
                   '</div>';

    headingText += '<div class="sort"' +
                   '<i class="fa fa-filter" aria-hidden="true"></i>' +
                   '</div>';
                   
    headingText += '</div>';

    $('.Table').append(headingText);

    var body = json.result[1].body;
    bodyText += '<div class="TableBody">';
    $.each( body, function( key, value ) {
        bodyText += '<div class="Row">';
        $.each(value, function(key, value){
            bodyText += '<div class=' + key + '>';
            bodyText += '<p>' + value + '</p>';
            bodyText += '</div>';
        });
        bodyText += '</div>';
    });
    bodyText += '</div>';
    $('.Table').append(bodyText);
    callAfterLoad();
});

function callAfterLoad() {
    var sorting=1;
    $(".Heading").children().each(function(){
        $(this).click(function(){
            cell = $(this).attr("class");
            sorting = sorting == 1 ? -1 : 1 ;
            $(".Row").detach().sort(function(a,b){
                var StringCompare1=$(a).find('.'+cell).text();
                var StringCompare2=$(b).find('.'+cell).text();
                var Comparator1 = StringCompare1.match(/\w+/);
                var Comparator2 = StringCompare2.match(/\w+/);

                if(Comparator1 != '' ){
                    return sorting == 1 ? StringCompare1 > StringCompare2 : StringCompare1 < StringCompare2;
                }
            }).appendTo($(".TableBody"));
        })
    });
}

$( document ).ready(function() {

    $(".Heading").children().each(function(){
        $(this).dblclick(function(){
          var cell = $(this).attr("class");
          $("#search"+cell+"").on("keyup", function() {
              var value = $(this).val().toLowerCase();
              $(".Row").each(function(index) {
                  $row = $(this);
                  var id = $row.find("."+cell).text().toLowerCase();
                  if (id.indexOf(value) < 0) {
                      $(this).hide();
                  }
                  else {
                      $(this).show();
                  }
              });
          })

        });
    });
});
