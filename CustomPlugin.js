var headingText = '';
var bodyText = '';
var cell = "";
var filterData;

function createTable(inputFile) {
  // Getting Data from Json file (data.json)
  $.getJSON("data.json", function(json) {
    filterData = json;
    $('<div class="Table"></div>').appendTo('body');
    var heading = json.result[0].heading;
    headingText += '<div class="Heading">';

    // Creating Header using json file header key
    $.each(heading, function(key, value) {
      headingText += '<div class="Container">';
      headingText += '<div class="flexContainer">';
      headingText += '<div class="flexible">';
      headingText += '<p>' + value + '</p>';
      headingText += '</div>';
      headingText += '<div class="sort' + value + '">' +
        '<i class="fa fa-sort-desc" aria-hidden="true"></i>' +
        '</div>';
      headingText += '<div class="filter' + value + '">' +
        '<i class="fa fa-filter" aria-hidden="true"></i>' +
        '</div>';
      headingText += '</div>';
      headingText += '</div>';
    });
    headingText += '</div>';

    // Creating Table body using json file body key
    $('.Table').append(headingText);
    var body = json.result[1].body;
    bodyText += '<div class="TableBody">';
    $.each(body, function(key, value) {
      bodyText += '<div class="Row">';
      $.each(value, function(key, value) {
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
}

// function for all functionality (sort, search and filter)
function callAfterLoad() {
  var sorting = 1;
  $(".Heading").children().children().children().each(function() {
    $(this).click(function() {
      cell = $(this).attr("class");
      var filterCell = cell;
      var searchCell = filterCell.substr(6);
      if (cell !== undefined) {
        cell = cell.substr(4);
        sorting = sorting == 1 ? -1 : 1;
        // Sorting
        $(".Row").detach().sort(function(a, b) {
          var StringCompare1 = $(a).find('.' + cell).text();
          var StringCompare2 = $(b).find('.' + cell).text();
          var Comparator1 = StringCompare1.match(/\w+/);
          var Comparator2 = StringCompare2.match(/\w+/);

          if (Comparator1 != '') {
            return sorting == 1 ? StringCompare1 > StringCompare2 : StringCompare1 < StringCompare2;
          }
        }).appendTo($(".TableBody"));

        // Creates the popup
        if (filterCell.substring(0, 6) === "filter") {
          var tag = tagGenerate(filterCell.substr(6));
          var confirm = $.confirm({
            title: "Filter",
            content: tag,
            buttons: {
              Ok: function() {},
              reset: function() {
                $(".Row").show();
              }
            },
            onContentReady: function() {
              $(".Row").show();
              var jc = this;
              jc = this.$content[0];

              // Search Operation
              $(jc.children[0].children[0].children[0]).on('keyup', function() {
                  var value = $(this).val().toLowerCase();

                  $(".Row").each(function(index) {
                          $row = $(this);
                          var id = $row.find("." + searchCell).text().toLowerCase();
                          if (id.indexOf(value) < 0) {
                            $(this).hide();
                          } else {
                            $(this).show();
                          }
                  });
                });

              // filter functionality
                $(jc.children[0].children[0].children[3].children).change(function() {
                    var _this = this;
                    var value = $(this).children().val().toLowerCase();
                    $(".Row").each(function(index) {
                      $row = $(this);
                      var id = $row.find("." + searchCell).text().toLowerCase();
                      if (id === value) {
                        if ($(_this).children().is(':checked')) {
                          $(this).show();
                        } else {
                          $(this).hide();
                        }
                      }
                    });
                });
              }
            });
          }
        }
      })
    });
}

// Retreives unique values from the checklist
function tagGenerate(dataValue) {
  var lookup = {};
  var result = [];
  var tag = '';
  tag += '<div class="list">';
  var items = filterData.result[1].body;
  tag += '<input type="text" class="search" id="search' + dataValue + '" placeholder="Search"">';
  tag += '<br>';
  tag += '<br>';
  tag += '<div class="checkList">';
  items.forEach(function(item) {
    var name = item[dataValue];
    if (!(name in lookup)) {
      lookup[name] = 1;
      result.push(name);
      tag += '<div>';
      tag += '<input type="checkbox" value="' + name + '" checked>';
      tag += '&nbsp&nbsp&nbsp&nbsp' + name;
      tag += '</div>';
    }
  });
  tag += '</div>';
  tag += '</div>';
  return tag;
}

//  jQuery plugin
(function($)
 {
	$.fn.table = function (inputFile){
		createTable(inputFile) ;
	}
}(jQuery));
