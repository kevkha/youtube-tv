/**
 * This is the core of our Remote Control
 */

var requestHandle = null;
var searchYoutube = function(query, callback) {

  // This searches the Youtube API v3 endpoint and loads a list of results
  // Required API Key, replace <YOUR-API-KEY> with your key

  if( requestHandle !== null ){ requestHandle.abort(); }

  requestHandle = $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/youtube/v3/search',
    data: {
          key: '<YOUR-API-KEY>',
          type: 'video',
          maxResults: '25',
          part: 'id,snippet',
          fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle',
          q: query
    },
    dataType: "jsonp",
    success: function(response) {
      renderSearchResults( response.items );

      if( typeof callback === 'function' ) {
        callback();
      }
    }
  });

};


var renderSearchResults = function( videos ) {

  $('#results').html('');
  var $template = $(".__templates .video");

  if( typeof videos === 'undefined' || videos.length <= 0 ){ return; }

  videos.forEach(function(video){
    // You should really use something like handlebars here
    var $video = $template.clone();

    $video.data('id', video.id.videoId);
    $video.data('title', video.snippet.title);
    $video.data('thumbnail', video.snippet.thumbnails.default.url);

    $video.find('img').attr('src', video.snippet.thumbnails.default.url);
    $video.find('h2').text( video.snippet.title );

    $('#results').append($video);
  });

};
