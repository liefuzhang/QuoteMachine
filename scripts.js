$(document).ready(function () {
    getQuote();
    $('#btn-quote').on('click', getQuote);
    $('#btn-twitter').on('click', sendTweet);
    $('#btn-tumblr').on('click', sendTumblr);
});

function getQuote(e) {
    if (e)
        e.preventDefault();
    $.ajax({
        url: "http://quotes.stormconsultancy.co.uk/random.json",
        dataType: 'jsonp', // Notice! JSONP <-- P (lowercase)
        success: function (json) {
            $("#quote-content-section").animate({
                opacity: 0
            }, 500, function () {
                $("#quote-content").html(json.quote);
                $(this).animate({
                    opacity: 1
                }, 500);
            });
            $("#quote-source").animate({
                opacity: 0
            }, 500, function () {
                $("#quote-source").html('- ' + json.author);
                $(this).animate({
                    opacity: 1
                }, 500);
            });

            var color = getRandomColor();
            $("body").css("background-color", color);
            $("#box").css("color", color);
            $("button").css("background-color", color);
        },
        error: function () {
            alert("Error");
        }
    });

}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function sendTweet() {
    var url = "https://twitter.com/intent/tweet?hashtags=quote&text=\""
     + encodeURIComponent($("#quote-content").html() + "\" " + $("#quote-source").html());
    window.open(url, '_blank');
}

function sendTumblr () {
    var url = "http://tumblr.com/widgets/share/tool?posttype=quote&content=\""
     + encodeURIComponent($("#quote-content").html() + "\" " + $("#quote-source").html())
     + "&canonicalUrl=https://www.tumblr.com";
    window.open(url, '_blank');
}