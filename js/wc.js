var teamMap  = {};

var ViewModel = {
	groups: ko.observableArray(),
    players: ko.observableArray(),
    allteams: ko.observableArray(),
    liveMatches: ko.observableArray(),
    completedMatches: ko.observableArray(),
    upcomingMatches: ko.observableArray()
};

function Player (name) {
	this.playerName = ko.observable(name);
	this.teams = ko.observableArray();

	this.matchesPlayed = ko.observable(0);
	this.won = ko.observable(0);
	this.lost = ko.observable(0);
	this.draw = ko.observable(0);
	this.goalsFor = ko.observable(0);
	this.goalsAgainst = ko.observable(0);
	this.goalDifference = ko.observable(0);
	this.points = ko.observable(0);

	this.addTeam = function(team) {
		this.teams.push(team);
	};

	this.updatePoints = function() {

		for (var i = 0; i < this.teams().length; i++) {
			var team = this.teams()[i];
			this.matchesPlayed( this.matchesPlayed() + team.matchesPlayed() );
			this.won( this.won() + team.won() );
			this.lost( this.lost() + team.lost() );
			this.draw ( this.draw() + team.draw() );
			this.goalsFor( this.goalsFor() + team.goalsFor() );
			this.goalsAgainst( this.goalsAgainst() + team.goalsAgainst() );
			this.points( this.points() + team.points() );
		};

		this.goalDifference( this.goalsFor() - this.goalsAgainst() );
	}

}

function Team (name, code, player) {
	this.teamName = ko.observable(name);
	this.teamCode = ko.observable(code)
	this.player = player;
	this.matchesPlayed = ko.observable(0);
	this.won = ko.observable(0);
	this.lost = ko.observable(0);
	this.draw = ko.observable(0);
	this.goalsFor = ko.observable(0);
	this.goalsAgainst = ko.observable(0);
	this.goalDifference = ko.observable(0);
	this.points = ko.observable(0);

	this.player.addTeam(this);
	teamMap[code] = this;
	ViewModel.allteams.push(this);
}

function Match (home, away, date, dateString, score) {
	this.home = ko.observable(teamMap[home]);
	this.away = ko.observable(teamMap[away]);
	this.dateString = ko.observable(dateString);
	this.date = ko.observable(date);
	this.score = ko.observable(score);
	this.events = ko.observableArray();
}


function comparePoints(a, b) {
	if (a.points() < b.points())
		return 1;
	if (a.points() > b.points())
		return -1;
	
	if (a.goalDifference() < b.goalDifference())
		return 1;
	if (a.goalDifference() > b.goalDifference())
		return -1;

	if (a.goalsFor() < b.goalsFor())
		return 1;
	if (a.goalsFor() > b.goalsFor())
		return -1;

	if (a.won() < b.won())
		return 1;
	if (a.won() > b.won())
		return -1;

	if (a.playerName() < b.playerName())
		return 1;
	if (a.playerName() > b.playerName())
		return -1;

	return 0;
}

function compareTeams(a, b) {
	if (a.points() < b.points())
		return 1;
	if (a.points() > b.points())
		return -1;
	
	if (a.goalDifference() < b.goalDifference())
		return 1;
	if (a.goalDifference() > b.goalDifference())
		return -1;

	if (a.goalsFor() < b.goalsFor())
		return 1;
	if (a.goalsFor() > b.goalsFor())
		return -1;

	if (a.won() < b.won())
		return 1;
	if (a.won() > b.won())
		return -1;

	return 0;
}

function compareMatches(a, b) {
	return a.date()<b.date() ? -1 : a.date()>b.date() ? 1 : 0;
}

function generateTeams() {

	var alan, cian, shane, eoin, ming, niall, dave, dan;

	var germany, greece, england, southkorea;
	alan = new Player("Alan");
	germany    = new Team("Germany", "GER", alan);
	greece     = new Team("Greece", "GRE", alan); 
	england    = new Team("England", "ENG", alan); 
	southkorea = new Team("South Korea", "KOR", alan);

	var swtizerland, costarica, russia, australia;
	cian = new Player("Cian");
	swtizerland    = new Team("Switzerland", "SUI", cian);
	costarica     = new Team("Costa Rica", "CRC", cian); 
	russia    = new Team("Russia", "RUS", cian); 
	australia = new Team("Australia", "AUS", cian);

	var belgium, croatia, ivorycoast, italy;
	shane = new Player("Shane");
	belgium    = new Team("Belgium", "BEL", shane);
	croatia    = new Team("Croatia", "CRO", shane); 
	ivorycoast = new Team("Ivory Coast", "CIV", shane); 
	italy      = new Team("Italy", "ITA", shane);

	var colombia, netherlands, ghana, cameroon;
	eoin = new Player("Eoin");
	colombia    = new Team("Colombia", "COL", eoin);
	netherlands = new Team("Netherlands", "NED", eoin); 
	ghana       = new Team("Ghana", "GHA", eoin); 
	cameroon    = new Team("Cameroon", "CMR", eoin);

	var uruguay, bosnia, france, japan;
	ming = new Player("Ming");
	uruguay    = new Team("Uruguay", "URU", ming);
	bosnia     = new Team("Bosnia-Herzegovina", "BIH", ming); 
	france     = new Team("France", "FRA", ming); 
	japan      = new Team("Japan", "JPN", ming);

	var spain, portugal, mexico, nigeria;
	niall = new Player("Niall");
	spain    = new Team("Spain", "ESP", niall);
	portugal = new Team("Portugal", "POR", niall); 
	mexico   = new Team("Mexico", "MEX", niall); 
	nigeria  = new Team("Nigeria", "NGA", niall);

	var brazil, ecuador, iran, usa;
	dave = new Player("Dave");
	brazil  = new Team("Brazil", "BRA", dave);
	ecuador = new Team("Ecuador", "ECU", dave); 
	iran    = new Team("Iran", "IRN", dave); 
	usa     = new Team("United States", "USA", dave);

	var argentina, algeria, chile, honduras;
	dan = new Player("Dan & Joel");
	argentina = new Team("Argentina", "ARG", dan);
	algeria   = new Team("Algeria", "ALG", dan); 
	chile     = new Team("Chile", "CHI", dan); 
	honduras  = new Team("Honduras", "HON", dan);

	ViewModel.players = ko.observableArray([alan, cian, shane, eoin, ming, niall, dave, dan]);
	ViewModel.groups = ko.observableArray([
		ko.observableArray([brazil, croatia, mexico, cameroon]), 
		ko.observableArray([spain, netherlands, chile, australia]), 
		ko.observableArray([colombia, greece, ivorycoast, japan]), 
		ko.observableArray([uruguay, costarica, england, italy]),
		ko.observableArray([swtizerland, ecuador, france, honduras]),
		ko.observableArray([argentina, bosnia, iran, nigeria]),
		ko.observableArray([germany, portugal, ghana, usa]),
		ko.observableArray([belgium, algeria, russia, southkorea])
	]);

}

function getTeamPoints() {

	$.ajax({
		url: "http://worldcup.sfg.io/group_results",
		type: "GET",
		success: function(data) {
			$.each( data, function( key, val ) {
				var team = teamMap[val["fifa_code"]];
				if (team !== undefined) {
					team.won = ko.observable(val["wins"]);
					team.lost = ko.observable(val["losses"]);
					team.draw = ko.observable(val["draws"]);
					team.goalsFor = ko.observable(val["goals_for"]);
					team.goalsAgainst = ko.observable(val["goals_against"]);
					team.goalDifference = ko.observable(team.goalsFor() - team.goalsAgainst());
					team.matchesPlayed = ko.observable(team.won() + team.draw() + team.lost());
					team.points = ko.observable(team.won() * 3 + team.draw());
				}
			});

			for (var i = 0; i < ViewModel.players().length; ++i) {
				ViewModel.groups()[i].sort(compareTeams);
			};

			for (var i = 0; i < ViewModel.players().length; ++i) {
				ViewModel.players()[i].updatePoints();
			};

			ViewModel.players.sort(comparePoints);
			for (var i = 0; i < ViewModel.players().length; ++i) {
				console.log(ViewModel.players()[i].playerName() + " PTS: " + ViewModel.players()[i].points());
			};
		}
	});

}

function getMatches() {

	$.ajax({
		url: "http://worldcup.sfg.io/matches",
		type: "GET",
		success: function(data) {
			$.each( data, function( key, val ) {

				if ( teamMap[val["home_team"]["code"]] !== undefined && 
					 teamMap[val["away_team"]["code"]] !== undefined ) {

					var completed = (val["status"] === "completed");
					var score = "v";
					if (completed) {
						score = val["home_team"]["goals"] + " - " + val["away_team"]["goals"];
					};
					var date = new Date(val["datetime"]);
					var day, month, hour, minute;

					day = date.getDate();
					month = date.getMonth() + 1;
					hour = date.getHours();
					hour = hour > 9 ? hour : '0' + hour;
					minutes = date.getMinutes();
					minutes = minutes > 9 ? minutes : '0' + minutes;

					var dateString = day + "/" + month + " " + hour + ":" + minutes;

					var match = new Match(val["home_team"]["code"], val["away_team"]["code"], date, dateString, score);

					if (completed) {
						ViewModel.completedMatches().push(match);
					} else {
						ViewModel.upcomingMatches().push(match);
					}

				}

			});

			ViewModel.completedMatches.sort(compareMatches);
			ViewModel.upcomingMatches.sort(compareMatches);
		}
	});

}

function Event(matchEvent, playerName, timeAt, team) {
	this.matchEvent = matchEvent;
	this.playerName = playerName;
	this.timeAt =  timeAt;
	this.team = team;
}

function sortEvents(a,b) {
	return a.timeAt < b.timeAt;
}

function getLiveMatches() {
	$.ajax({
		url: "http://worldcup.sfg.io/matches/current",
		type: "GET",
		success: function(data) {

			if (data.length == 0) {
				console.log("There are no live matches right now :" + new Date().toString());
				ViewModel.liveMatches.removeAll();
				return;
			};
			ViewModel.liveMatches.removeAll();
			$.each( data, function( key, val ) {

				console.log("Live : " + val["home_team"]["code"] + " v " + val["away_team"]["code"]);
				var score = val["home_team"]["goals"] + " - " + val["away_team"]["goals"];

				var date = new Date();
				var hour, minutes, seconds;
				hour = date.getHours();
				hour = hour > 9 ? hour : '0' + hour;
				minutes = date.getMinutes();
				minutes = minutes > 9 ? minutes : '0' + minutes;
				seconds = date.getSeconds();
				seconds = seconds > 9 ? seconds : '0' + seconds;

				var dateString = "Updated : " + hour + ":" + minutes + ":" + seconds;

				var match = new Match(val["home_team"]["code"], val["away_team"]["code"], date, dateString, score);


				var homeevents = val["home_team_events"] ;
				$.each(homeevents, function( key, val ) {
					if (val["type_of_event"] == "goal")
						match.events().push(new Event("Goal", val["player"], val["time"], "home"));
					else if (val["type_of_event"] == "goal-own")
						match.events().push(new Event("Goal (Own)", val["player"], val["time"], "away"));
					else if (val["type_of_event"] == "goal-penalty")
						match.events().push(new Event("Penalty", val["player"], val["time"], "home"));
					else if (val["type_of_event"] == "yellow-card")
						match.events().push(new Event("Yellow Card", val["player"], val["time"], "home"));
					else if (val["type_of_event"] == "red-card")
						match.events().push(new Event("Red Card", val["player"], val["time"], "home"));
				});

				var awayevents = val["away_team_events"] ;
				$.each(awayevents, function( key, val ) {
					if (val["type_of_event"] == "goal")
						match.events().push(new Event("Goal", val["player"], val["time"], "away"));
					else if (val["type_of_event"] == "goal-own")
						match.events().push(new Event("Own Goal", val["player"], val["time"], "home"));
					else if (val["type_of_event"] == "goal-penalty")
						match.events().push(new Event("Penalty", val["player"], val["time"], "away"));
					else if (val["type_of_event"] == "yellow-card")
						match.events().push(new Event("Yellow Card", val["player"], val["time"], "away"));
					else if (val["type_of_event"] == "red-card")
						match.events().push(new Event("Red Card", val["player"], val["time"], "away"));
				});

				match.events.sort(sortEvents);

				ViewModel.liveMatches().push(match);
				ViewModel.liveMatches.sort(compareMatches);
	
			});
		}
	});

}