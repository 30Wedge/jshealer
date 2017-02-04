/* eslint no-unused-vars: 0 */
/*

Strategies for the hero are contained within the "moves" object as
name-value pairs, like so:

    //...
    ambusher : function(gamedData, helpers){
      // implementation of strategy.
    },
    heWhoLivesToFightAnotherDay: function(gamedData, helpers){
      // implementation of strategy.
    },
    //...other strategy definitions.

The "moves" object only contains the data, but in order for a specific
strategy to be implemented we MUST set the "move" variable to a
definite property.  This is done like so:

move = moves.heWhoLivesToFightAnotherDay;

You MUST also export the move function, in order for your code to run
So, at the bottom of this code, keep the line that says:

module.exports = move;

The "move" function must return "North", "South", "East", "West", or "Stay"
(Anything else will be interpreted by the game as "Stay")

The "move" function should accept two arguments that the website will be passing in:
- a "gameData" object which holds all information about the current state
  of the battle
- a "helpers" object, which contains useful helper functions
- check out the helpers.js file to see what is available to you

*/

// Strategy definitions
var moves = {
 
    // Balanced
    balanced: function (gameData, helpers){
        // Here we determine if it's an even or odd turn for your hero;
        if ((gameData.turn / 2) % 2) {
            // If it is even, act like an an Aggressor
            return moves.aggressor(gameData, helpers);
        } else {
            // If it is odd, act like a Priest
            return moves.priest(gameData, helpers);
        }
    },

    // The "Priest"
    // This hero will heal nearby friendly champions.
    priest: function (gameData, helpers) {
        var myHero = gameData.activeHero;
        if (myHero.health < 60) {
            return helpers.findNearestHealthWell(gameData);
        } else {
            return helpers.findNearestTeamMember(gameData);
        }
    },
	
    // The "Careful Assassin"
    // This hero will attempt to kill the closest weaker enemy hero.
    carefulAssassin: function (gameData, helpers) {
        var myHero = gameData.activeHero;
        if (myHero.health < 50) {
            return helpers.findNearestHealthWell(gameData);
        } else {
            return helpers.findNearestWeakerEnemy(gameData);
        }
    }
};

// Set our hero's strategy
var move =  moves.priest;

// Export the move function here
module.exports = move;
