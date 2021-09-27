let boardruns:(string|number)[]=["DOT BAll",1,2,3,4,5,6,"OUT"],runs:number=40,finaloutput:number=0,traverse:number,ball_left:number=24;
let players_data:number[][]=[[ 5, 30, 25, 10, 15, 1, 9, 5],[10, 40, 20, 5 , 10, 1, 4, 10] ,[20, 30, 15,5 , 5, 1, 4, 20],[ 30, 25, 5, 0, 5, 1, 4, 30]]
let player_strike:number[],finalresult:number,scoring:number,overs:number,count:number,player:number=0,outplayers:string[]=[];
let players_score:number[]=[0,0,0,0], players:number[]=[0,0,0,0],players_balls:number[]=[0,0,0,0],finalscore:(string|number)[][]=[],notoufinalscore:(string|number)[][]=[];
let players_name=["Kirat Boli","N.S.Nodhi","R Rumrah","Shashi Henra"],names=["Kirat Boli","N.S.Nodhi","R Rumrah","Shashi Henra"]
console.log("4 overs left. 40 runs to win.")

//calling of strike to select player

 strike(0,0,0)

 //To select the player for strike(bat)

function strike(overs:number,count:number,player:number)
{
// To exit from the function-(For ending the Game)
    if(finaloutput===-5)
    return 
//Assigning the probabilities of the player 
player_strike=players_data[player] 
// calling of score function to get score of player
    scoring=score(player,player_strike)
//Evaluation of the game
    evaluate(overs,count,player,scoring) 
    
}
function score(player:number,player_strike:number[])
{
    //Random function -To select the probability randomly among DOT BAll,1,2,3,4,5,6,OUT
    const greeting = player_strike[  
        Math.floor(Math.random() * player_strike.length)]
        //getting the index of the probability selected (To know the probability belongs to which score)
      let index:number=player_strike.indexOf(greeting)
      //Getting the score based on the index
      let result=boardruns[index]
      const dot_out:string[]=["DOT BAll","OUT"]
      //As the probabilities of DOT BALL and OUT are same in all cases, we use Random function to randomly choose among the two cases
      if(result==="DOT BAll")
      {
       result = dot_out[Math.floor(Math.random() *dot_out.length)]
        if(result==="DOT BAll") return -1;
        else  return -2;
      }
      //If the score doesn't belongs to DOT BALL or OUT ,directly returning score 
      else 
      {
        players[player]+=Number(result);
          return Number(result);
      }
}
function evaluate(overs:number,count:number,player:number,scoring:number)
{ //To check whether the overs are completed or not
    if(count!=6 && overs<4) 
     {  count+=1
        players_balls[player]+=1
        ball_left-=1
    if(scoring!=-1 && scoring!=-2 && scoring!=0)  
    runs=runs-scoring
    //Checking the target is accomplished or not
    if(runs<=0)
    {
    console.log(overs+"."+count+players_name[player]+"scores" +scoring+"runs")
    console.log("Bangalore won by "+((players_name.length)-1)+" wickets "+ball_left+" balls remaining")
    //To display the results of the Match
    scoreboard()
    finaloutput=-5
    return 
    }  
    //Checking the score :if the score is 1 or 3 or 5 we need to swap the the strike to bat of the players    
    else  if(scoring==1 ||scoring==3 ||scoring==5)
        {
            players_score[player]+=scoring
           
            if(scoring==1 )
           
            console.log(overs+"."+count+players_name[player]+"scores" +scoring+"run")
            else
            console.log(overs+"."+count+players_name[player]+"scores" +scoring+"runs")
            if(player==0) player=1
            else player=0

            strike(overs,count,player)
            
        }
        //To check the palyer is OUT or not
        else if(scoring==-2)
        {
            outplayers.splice(-1,0,players_name[player])
            finalscore.splice(-1,0,[players_name[player],players_score[player],players_balls[player]])
            console.log(overs+"."+count+players_name[player]+"is OUT")
            players_score.splice(player,1)
            players_name.splice(player,1)
            players_balls.splice(player,1)
            if(players_name.length==1)
            {
                //If all the wickets are lost ,checkimg whether Bangalore lost the match or the match is tie
                if(runs>1)
                console.log("Bangalore lost by "+runs+"runs");
                else if(runs==1)
                console.log("Bangalore lost by "+runs+"run");
                else
                console.log("It's a Tie")
                finaloutput=-5
                scoreboard()
                strike(4,0,0)
           
            }
            else{
            if(player==0 ||player==1)
    
            strike(overs,count,1) 
            }   
        
        }
        else {
            if(scoring!=-1 && scoring!=0)
            {
            players_score[player]+=scoring
            
            if(scoring!=1 )
            console.log(overs+"."+count+players_name[player]+"scores" +scoring+"runs")
            else
            console.log(overs+"."+count+players_name[player]+"scores" +scoring+"runs")
            strike(overs,count,player)
        
        }
        else
        console.log(overs+"."+count+players_name[player]+"scores" +0+"runs")
        strike(overs,count,player)
        }
       
    }
    else if(count==6){ 
        count=0
        overs=overs+1
        //Displaying remaining overs left and the score needed to win the match
        console.log(4-overs+"overs left."+runs+"runs to win")
        if(overs==4)
        return -1;
        else
        if(scoring==2 || scoring==4 ||scoring==6)
        if(player==0) player=1
        else player=0
        strike(overs,count,player)
        }
        //If all the balls are completed ,checking the match is lostnor not
        if(ball_left===0 && runs>0)
        {
            console.log("Bangalore lost by "+runs+"runs")
            finaloutput=-5
            return
        }
    }      
    function scoreboard()
    {

        for(let i=0;i<players_score.length;i++)
        notoufinalscore.splice(i,0,[players_name[i],players_score[i],players_balls[i]])
        for (let i=0;i<names.length;i++)
        {
       traverse=players_name.indexOf(names[i])
       if(traverse!=-1)
       //Displaying the scores of players on the crease
       {if(notoufinalscore[traverse][2]!=0)
       console.log(names[i]+"  -  "+notoufinalscore[traverse][1]+"*("+notoufinalscore[traverse][2]+"balls)")
       }
       //Displaying the scores of the players who are OUT
       else
       {
       traverse=outplayers.indexOf(names[i])
       console.log(names[i]+"  -  "+finalscore[traverse][1]+"("+finalscore[traverse][2]+"balls)")
       }
    }
    }
        


