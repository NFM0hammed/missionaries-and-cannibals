let boat = document.querySelector(".boat");
let go = document.querySelector(".go");
let missionariesLeftSide = document.querySelector(".left-side .missionaries");
let cannibalsLeftSide = document.querySelector(".left-side .cannibals");
let missionariesRightSide = document.querySelector(".right-side .missionaries");
let cannibalsRightSide= document.querySelector(".right-side .cannibals");
let missionaries = document.querySelectorAll(".missionaries img");
let cannibals = document.querySelectorAll(".cannibals img");
let all_missionaries_cannibals = document.querySelectorAll("img");
let win = document.querySelector(".win");
let lose = document.querySelector(".lose");
let playAgainWin = document.querySelector(".win button.play-again");
let playAgainLose = document.querySelector(".lose button.play-again");

// Variables to count missionaries and cannibals on the boat
let count_missionaries_on_boat = 0;
let count_cannibals_on_boat = 0;

// Function to go the boat [Left side or right side]
go.addEventListener("click", () => {

    // If there're chars on the boat
    if(boat.children.length != 0) {

        check();

        // Menas the boat on the left side then, go to the right side
        if(!boat.classList.contains("right")) {

            boat.classList.add("right");

        // Means the boat on the right side then, go to the left side
        } else {

            boat.classList.remove("right");

        }

        // Disabled button after go
        go.disabled = true;

        // Stop click on chars after go
        all_missionaries_cannibals.forEach((ele) => {

            ele.classList.add("stop-click");

        });

        // Undisabled button and click from chars after 2 seconds
        setTimeout(() => {
            go.disabled = false;

            all_missionaries_cannibals.forEach((ele) => {

                ele.classList.remove("stop-click");

            });

        }, 2000);

    }

});

// Function to add chars on the boat or on the left, right side
function addToBoatToLeftRightSide(chars, leftSide, rightSide, theClass) {

    chars.forEach((ele) => {

        ele.addEventListener("click", () => {
    
            // If chars not in the boat
            if(ele.parentElement.classList.contains(theClass)) {
    
                // Maximum 2 chars in the boat
                if(boat.children.length < 2) {

                    // Add char from left side to the boat
                    if(ele.parentElement.parentElement.classList.value == "left-side" && !boat.classList.contains("right")) {

                        boat.appendChild(ele);

                    // Add char from right side to the boat
                    } else if(ele.parentElement.parentElement.classList.value == "right-side" && boat.classList.contains("right")) {

                        boat.appendChild(ele);

                    }
    
                }
    
            // If chars in the boat
            } else {

                // Put the chars in right side
                if(boat.classList.contains("right")) {
                    
                    rightSide.appendChild(ele);

                    winGame();

                // Put the chars in the left side
                } else {

                    leftSide.appendChild(ele);

                }
                
            }
    
        });
        
    });

}

// Add missionaries to the boat
addToBoatToLeftRightSide(missionaries, missionariesLeftSide, missionariesRightSide, "missionaries");
// Add cannibals to the boat
addToBoatToLeftRightSide(cannibals, cannibalsLeftSide, cannibalsRightSide, "cannibals");

function check() {

    /**
     * Check the left side
     * Check the right side and the boat
     */
    if(!boat.classList.contains("right")) {

        checkOnTheBoat();

        let totalMissionaries = count_missionaries_on_boat + missionariesRightSide.children.length;
        let totalCannibals = count_cannibals_on_boat + cannibalsRightSide.children.length;

        // Check the left side after go to the right side
        // Check the right side with the boat
        if(missionariesLeftSide.children.length > 0 && cannibalsLeftSide.children.length > missionariesLeftSide.children.length || totalMissionaries > 0  && totalCannibals > totalMissionaries) {

            loseGame();

        }

    // Check the right side
    // Check the left side and the boat
    } else {

        checkOnTheBoat();

        let totalMissionaries = count_missionaries_on_boat + missionariesLeftSide.children.length;
        let totalCannibals = count_cannibals_on_boat + cannibalsLeftSide.children.length;

        // Check the right side after go to the left side
        // Check the left side with the boat
        if(missionariesRightSide.children.length > 0 && cannibalsRightSide.children.length > missionariesRightSide.children.length || totalMissionaries > 0  && totalCannibals > totalMissionaries) {

            loseGame();

        }
        
    }

    count_missionaries_on_boat = 0;
    count_cannibals_on_boat = 0;

}

// Function to check if in the boat is missionary or cannibal
function checkOnTheBoat() {
    
    let charsOnBoat = document.querySelector(".boat").children;
    let charsOnBoatLength = charsOnBoat.length;

    for(let i = 0; i < charsOnBoatLength; ++i) {

        // Means missionaries
        if((charsOnBoat[i].src).slice(-3) == "jpg") {

            count_missionaries_on_boat++;

        // Means cannibals
        } else {

            count_cannibals_on_boat++;
        }

    }

}

// Function if lose the game
function loseGame() {
    setTimeout(() => {
        lose.classList.add("active");
    }, 2000);
}

// Function if win the game
function winGame() {
    if(missionariesRightSide.children.length === 3 && cannibalsRightSide.children.length === 3) {
        win.classList.add("active");
    }
}

// Function to play again after win or lose
function playAgain(btn) {
    btn.addEventListener("click", () => {
        location.reload();
    });
}

playAgain(playAgainWin);
playAgain(playAgainLose);