var headingText = '';
var bodyText = '';

$.getJSON("data.json", function(json) {
    $('<div class="Table"></div>').appendTo('body');
    var heading = json.result[0].heading;
    headingText += '<div class="Heading">';
    $.each( heading, function( key, value ) {
        headingText += '<div class=' + value + '>';
        headingText += '<p>' + value + '</p>';
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
    $(".Heading").children().each(function(){
        $(this).click(function(){
            var cell = $(this).attr("class");
            sorting = sorting == 1 ? -1 : 1 ;
            $(".Row").sort(function(a,b){
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
