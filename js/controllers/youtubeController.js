'use strict';

masterMapApp.controller('YouTubeCtrl', 
	function YouTubeCtrl($scope, $stateParams){
      	console.log('YouTubeCtrl=' + $stateParams.youtubeId);  
	}
)
	.directive( "youTubeViewer", [function( youtubeId ) {
    return {
		restrict: "A",
		apiKey:'AIzaSyCCJT34-TosKqbU9C_ij-vHWGxud2JJgzk',
		playlistId:"PL51DF3E41144EE869",
		requestVideoPlaylist:function(playlistId, pageToken) {
			var nextPageToken, prevPageToken;
			$('#list-container').html('');
			$('#video-container').html('');
			var requestOptions = {
				playlistId: playlistId,
				part: 'snippet',
				maxResults: 10
			};
			var request = gapi.client.youtube.playlistItems.list(requestOptions);
			request.execute(function(response) {
				var playlistItems = response.result.items;
				if (playlistItems) {
				  $.each(playlistItems, function(index, item) {
					displayResult(item.snippet);
				  });
				} else {
				  $('#list-container').html('Sorry you have no uploaded videos');
				}
			});
		},
		handleClientLoad:function() {
			gapi.client.setApiKey(apiKey);
			gapi.client.load('youtube', 'v3', loadPlaylist);
		},

		loadPlaylist:function() {
			requestVideoPlaylist("UU2SIfmttUkqIHbn_DBLSygw");
			// PL51DF3E41144EE869 PL5080DB2DA76A9CFE
		},
		videoWrapper:function(id){
			var _width=480, _height=270;
			return('<iframe title="YouTube video player" width="'+_width+'" height="'+_height+'" src="http://www.youtube.com/embed/'+id + '?hd=1&html5=1&autoplay=1" autoplay frameborder="0" allowfullscreen></iframe>');
		},
		displayResult:function(videoSnippet) {
		  var title = videoSnippet.title;
		  var videoId = videoSnippet.resourceId.videoId;
		  $('#list-container').append('<li><a href="' + "javascript:selectVideo('" + videoId +"')" + '">' + title + '</a></li>');
		},
		nextPage:function() {
		  requestVideoPlaylist(playlistId, nextPageToken);
		},

		previousPage:function() {
		  requestVideoPlaylist(playlistId, prevPageToken);
		},
		selectVideo:function(id){
			$('#video-container').html(videoWrapper(id));
		},
	  
			  link: function( scope, element, attrs, gapi ) {
				element.bind( "click", function() {
				 Book.addBook( { title: "Star Wars", author: "George Lucas" } );
			   });
			 }
		   }
		}]);

/* /	.directive()
	
		
		<button add-book-button>Add book</button>

		var apiKey = 'AIzaSyCCJT34-TosKqbU9C_ij-vHWGxud2JJgzk';
		var playlistId="PL51DF3E41144EE869"

 

		<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>



*/	

