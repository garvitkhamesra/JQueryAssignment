var headingText = '';
var bodyText = '';
var cell = "";
var filterData;
$.getJSON("data.json", function(json) {
    filterData = json;
    $('<div class="Table"></div>').appendTo('body');
    var heading = json.result[0].heading;
    headingText += '<div class="Heading">';
    $.each( heading, function( key, value ) {
        headingText += '<div class="Container">';
        headingText += '<div class="flexContainer">';
        headingText += '<div >';
        // headingText += '<input id= "search'+ value +'">';
        headingText += '<p>' + value + '</p>';
        headingText += '</div>';
        headingText += '<div class="sort'+ value +'">' +
                       '<i class="fa fa-sort-desc" aria-hidden="true"></i>' +
                       '</div>';

        headingText += '<div class="filter'+ value +'">' +
                       '<i class="fa fa-filter" aria-hidden="true"></i>' +
                       '</div>';
        headingText += '</div>';
        headingText += '</div>';
    });

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
    $(".Heading").children().children().children().each(function(){
        $(this).click(function(){
            cell = $(this).attr("class");
            var filterCell = cell;
            if (cell !== undefined) {
                cell = cell.substr(4);

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

              if (filterCell.substring(0,6) === "filter") {
                  var tag = tagGenerate(filterCell.substr(6));
                  $.confirm({
                    title: "Filter",
                    content: tag
                  });
              }

            }
        })

    });
}

function tagGenerate(dataValue) {
    var lookup = {};
    var result = [];
    var tag = '';
    tag += '<div class="list">';
    var items = filterData.result[1].body;
    tag += '<input type="text" class="search" id="search' + dataValue + '" placeholder="Search"">';
    tag += '<br>';
    tag += '<br>';

    items.forEach(function(item) {
        var name = item[dataValue];
        if (!(name in lookup)) {
          lookup[name] = 1;
          result.push(name);
          tag += '<input type="checkbox" value="'+ name +'">';
          tag += '&nbsp&nbsp&nbsp&nbsp' + name;
          tag += '<br>';
        }
    });
    tag += '</div>';
    return tag;
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

    // $(".Heading").children().children().children().each(function(){
    //     $(this).click(function(){
    //         cell = $(this).attr("class");
    //         console.log(cell.substring(0,6));
    //         if (cell !== undefined) {
    //             cell = cell.substr(6);
    //         }
    //
    //
    //     })
    //
    // });

    //
    // function checkList() {
    //
    // }

});
