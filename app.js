var boardruns = ["DOT BAll", 1, 2, 3, 4, 5, 6, "OUT"];
var players_data = [[5, 30, 25, 10, 15, 1, 9, 5], [10, 40, 20, 5, 10, 1, 4, 10], [20, 30, 15, 5, 5, 1, 4, 20], [30, 25, 5, 0, 5, 1, 4, 30]];
var player_strike, finalresult, evaluation;
var scoring, overs, count, player = 0, outplayers = [];
var players_score = [0, 0, 0, 0], players = [0, 0, 0, 0], players_balls = [0, 0, 0, 0];
var finalscore = [], notoufinalscore = [];
var players_name = ["Kirat Boli", "N.S.Nodhi", "R Rumrah", "Shashi Henra"], names = ["Kirat Boli", "N.S.Nodhi", "R Rumrah", "Shashi Henra"];
var runs = 40, finaloutput = 0, traverse, ball_left = 24;
console.log("4 overs left. 40 runs to win.");
strike(0, 0, 0); //calling of strike to select player
function strike(overs, count, player) {
    if (finaloutput === -5) // to exit from the function-(For ending the Game)
        return; //exits from function
    player_strike = players_data[player];
    scoring = score(player, player_strike); // calling of score function to get score of player
    evaluate(overs, count, player, scoring);
}
function score(player, player_strike) {
    var greeting = player_strike[Math.floor(Math.random() * player_strike.length)];
    var index = player_strike.indexOf(greeting);
    var result = boardruns[index];
    var dot_out = ["DOT BAll", "OUT"];
    if (result === "DOT BAll") {
        result = dot_out[Math.floor(Math.random() * dot_out.length)];
        if (result === "DOT BAll")
            return -1;
        else
            return -2;
    }
    else {
        players[player] += Number(result);
        return Number(result);
    }
}
function evaluate(overs, count, player, scoring) {
    if (count != 6 && overs < 4) {
        count += 1;
        players_balls[player] += 1;
        ball_left -= 1;
        if (scoring != -1 && scoring != -2 && scoring != 0)
            runs = runs - scoring;
        if (runs <= 0) {
            console.log(overs + "." + count + players_name[player] + "scores" + scoring + "runs");
            console.log("Bangalore won by " + ((players_name.length) - 1) + " wickets " + ball_left + " balls remaining");
            scoreboard();
            finaloutput = -5;
            return;
        }
        else if (scoring == 1 || scoring == 3 || scoring == 5) {
            players_score[player] += scoring;
            if (scoring == 1)
                console.log(overs + "." + count + players_name[player] + "scores" + scoring + "run");
            else
                console.log(overs + "." + count + players_name[player] + "scores" + scoring + "runs");
            if (player == 0)
                player = 1;
            else
                player = 0;
            strike(overs, count, player);
        }
        else if (scoring == -2) {
            outplayers.splice(-1, 0, players_name[player]);
            finalscore.splice(-1, 0, [players_name[player], players_score[player], players_balls[player]]);
            console.log(overs + "." + count + players_name[player] + "is OUT");
            players_score.splice(player, 1);
            players_name.splice(player, 1);
            players_balls.splice(player, 1);
            if (players_name.length == 1) {
                if (runs > 1)
                    console.log("Bangalore lost by " + runs + "runs");
                else if (runs == 1)
                    console.log("Bangalore lost by " + runs + "run");
                else
                    console.log("It's a Tie");
                finaloutput = -5;
                scoreboard();
                strike(4, 0, 0);
            }
            else {
                if (player == 0 || player == 1)
                    strike(overs, count, 1);
            }
        }
        else {
            if (scoring != -1 && scoring != 0) {
                players_score[player] += scoring;
                if (scoring != 1)
                    console.log(overs + "." + count + players_name[player] + "scores" + scoring + "runs");
                else
                    console.log(overs + "." + count + players_name[player] + "scores" + scoring + "runs");
                strike(overs, count, player);
            }
            else
                console.log(overs + "." + count + players_name[player] + "scores" + 0 + "runs");
            strike(overs, count, player);
        }
    }
    else if (count == 6) {
        count = 0;
        overs = overs + 1;
        console.log(4 - overs + "overs left." + runs + "runs to win");
        if (overs == 4)
            return -1;
        else if (scoring == 2 || scoring || scoring == 6)
            if (player == 0)
                player = 1;
            else
                player = 0;
        strike(overs, count, player);
    }
    if (ball_left === 0 && runs > 0) {
        console.log("Bangalore lost by " + runs + "runs");
        finaloutput = -5;
        return;
    }
}
function scoreboard() {
    for (var i = 0; i < players_score.length; i++)
        notoufinalscore.splice(i, 0, [players_name[i], players_score[i], players_balls[i]]);
    for (var i = 0; i < names.length; i++) {
        traverse = players_name.indexOf(names[i]);
        if (traverse != -1) {
            if (notoufinalscore[traverse][2] != 0)
                console.log(names[i] + "  -  " + notoufinalscore[traverse][1] + "*(" + notoufinalscore[traverse][2] + "balls)");
        }
        else {
            traverse = outplayers.indexOf(names[i]);
            console.log(names[i] + "  -  " + finalscore[traverse][1] + "(" + finalscore[traverse][2] + "balls)");
        }
    }
}
