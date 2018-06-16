require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");

var Twitter = require("twitter");
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require("fs");

var nodeArgs = process.argv[2];
var input = process.argv[3];

switch(nodeArgs) {
	case "my-tweets":
	  myTweets(input);
	  break;
	
	case "spotify-this-song":
	  mySpotify(input);
	  break;
	
	case "movie-this":
	  myOMDB(input);
	  break;
	
	case "do-what-it-says":
	  myWhatever(input);
	  break;
	};
	

//Twitter

function myTweets(input){
	
	var params = {
		screen_name: 'Smaller In Texas',
		count: 20, 
	};

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
			for(i=0; i<tweets.length; i++) {
			console.log(tweets[i].text + " "+ "created at " + tweets[i].created_at);
			} 
  		} else {console.log(error);}
	});
}

//Spotify
function mySpotify(input){

	spotify.search({type: 'track', query: input}, function(err, data) {
		if (err) {
		  return console.log('Error occurred: ' + err);
		}

		console.log("Artist: "+data.tracks.items[0].artists[0].name);
		console.log("Song Name: "+data.tracks.items[0].name);
		console.log("Link: "+data.tracks.items[0].preview_url);
		console.log("Album: "+data.tracks.items[0].album.name);


	  }
	)}

//OMDB


function myOMDB(input){
	var movieName = nodeArgs + input
		for (var i = 2; i < input.length; i++) {
			if (i > 2 && i < input.length) {
				movieName = nodeArgs + "+" + input[i];
  }
		else {
			movieName += input[i];
  }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";


request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {

		console.log("Title of the Movie: " + JSON.parse(body).Title);
		console.log("Year the Movie Came Out: " + JSON.parse(body).Year);
		console.log("IMDB Rating of the Movie: " + JSON.parse(body).Rating);
		console.log("Plot of the Movie: " + JSON.parse(body).Plot);
		console.log("Actors in the Movie: " + JSON.parse(body).Actors);
  

	} else {
		console.log("if you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/ . It's on Netflix!");
		};	
	}
}


//my whatever
function myWhatever(input){
	fs.readFile("random.txt", "utf8", function(err, data){
		if (err) {
			return console.log(err);
		}
		var output=data.split(",");
		mySpotify(output[1]);
	})
}