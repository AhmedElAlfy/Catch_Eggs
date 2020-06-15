// setting up global variables
let startBtn = document.querySelector('.start-game .start-btn'), 
    playAgain = document.querySelector('.play-again .play-again-btn'), 
    score = document.querySelector('.score span'),
    life = document.querySelector('.life span'),
    game = document.querySelector('.game-body'),
    nests = document.querySelectorAll('.eggs .nest'), 
    angeryHens = document.querySelectorAll('.angery-hens .angery-hen'), 
    happyHens = document.querySelectorAll('.happy-hens .happy-hen'), 
    poos = document.querySelectorAll('.poo-nest .poo'),
    gEggs = document.querySelectorAll('.golden-nest .golden-egg'),
    brokenEggs = document.querySelectorAll('.game-body .broken-eggs .broken-egg'), 
    brokenGEggs = document.querySelectorAll('.game-body .broken-Geggs .broken-Gegg'), 
    basket = document.querySelector('.game-body .basket'),
    gainLife = document.querySelector('.basket .gain-life'), 
    loseLife = document.querySelector('.basket .lose-life'), 
    scoreCounter = document.querySelector('.basket .score-counter'), 
    bestScore = document.querySelector('.best-score span'), 
    bestPlayer = document.querySelector('.player span'), 
    fallenEggs, 
    currentScore, 
    currentPlayer;



// toggle best player message when click on button 
document.querySelector('.bestPlayer-btn').addEventListener('click', function() {
    
    document.querySelector('.bestPlayer').classList.toggle('active');
    
    // get best player name and score 
    if(localStorage.getItem('score') !== null) {
        
        document.querySelector('.stored-player .stored-score').innerHTML = localStorage.getItem('bestScore');
        
        document.querySelector('.stored-player .stored-name').innerHTML = localStorage.getItem('bestPlayer');
        
    } else {
        
        document.querySelector('.stored-player .stored-score').innerHTML = 0;
        
        document.querySelector('.stored-player .stored-name').innerHTML = 'No One';
        
    }
    
});

// close best player message when click on close sign 
document.querySelector('.bestPlayer .close').addEventListener('click', function() {
    
    document.querySelector('.bestPlayer').classList.remove('active');
    
});


// when click start button 
startBtn.onclick = function () {
    
    // start game
    document.querySelector('.start-game').remove();
    
    startGame();
    
    // get player name
    currentPlayer = prompt('What Is Your Name ? max 10 letters');
    
    // set best player name and score
    if(localStorage.getItem('bestScore') !== null) {
        
        bestScore.innerHTML = localStorage.getItem('bestScore');
        
        bestPlayer.innerHTML = localStorage.getItem('bestPlayer');
    
    } else {
        
        bestScore.innerHTML = 0;
        
        bestPlayer.innerHTML = 'No One';
        
    }
    
};

// when click on the play again button (restart game)
playAgain.addEventListener('click', function() {
    
    location.reload();
    
});


// start the game function
function startGame() {
    
    // start music
    document.querySelector('.music').play();
    
    // setting up initial values
    score.innerHTML = 0;
    life.innerHTML = 10;
    scoreCounter.innerHTML = 0;
    
    // create 3 eggs at first 
    setTimeout(function() {
        
        nests.forEach(nest => {
                
            // create img element
            let egg = document.createElement('img');
                
            // add class egg to img
            egg.classList.add('egg');
                
            // add src attribute 
            egg.setAttribute('src', 'imgs/egg.png');
                
            // add alt attribute 
            egg.setAttribute('alt', 'egg');
                
            // apend img element to nest 
            nest.appendChild(egg);
                
            // add class fall
            egg.classList.add('fall');
                
        });
        
    }, 1000);
    
    // creating eggs factory function
    function eggsFactory() {
        
        // create eggs every duration 
        setInterval(function() {
            
            nests.forEach(nest => {
                
                  // create img element
                  let egg = document.createElement('img');
                
                  // add class egg to img
                  egg.classList.add('egg');
                
                  // add src attribute 
                  egg.setAttribute('src', 'imgs/egg.png');
                
                  // add alt attribute 
                  egg.setAttribute('alt', 'egg');
                
                  // apend img element to nest 
                  nest.appendChild(egg);
                
                  // add class fall
                  egg.classList.add('fall');
                
            });
            
        }, 5000);
    }    
   
    // initiate eggs factory function
    eggsFactory();
    
    // show angery hens every duration
    setTimeout(function() {
        
        setInterval(function() {
            
            angeryHens.forEach(angeryHen => {
                
                angeryHen.classList.toggle('show');
                
            });
            
        }, 5000);
        
    }, 80000); 
    
    // show happy hens every duration 
    setTimeout(function() {
        
        setInterval(function() {
            
            happyHens.forEach(happyHen => {
                
                happyHen.classList.toggle('show-now');
                
            });
            
        }, 10000);
    
    }, 40000);
    
    // check every second 
    setInterval(function () {
        
        // get fallen eggs
        fallenEggs = document.querySelectorAll('.nest .fall');
        
        fallenEggs.forEach(fallenEgg => {
            
            // when basket take the egg
            if (collision(fallenEgg, basket)) {
                
                scoreCounter.innerHTML = parseInt(scoreCounter.innerHTML) + 1;
                
                fallenEgg.remove();
                
                score.innerHTML = parseInt(score.innerHTML) + 1;
                
            }
            
            // when egg fall on floor 
            brokenEggs.forEach(brokenEgg => {
                
                if(collision(fallenEgg, brokenEgg)) {
                    
                    brokenEgg.style.opacity = 1;
                    
                    fallenEgg.remove();
                    
                    life.innerHTML = parseInt(life.innerHTML) - 1;
                    
                    setTimeout(function () {
                        
                        brokenEgg.style.opacity = 0;
                        
                    }, 500);
                    
                }
                
            });
            
        });
        
        // angery hens poos
        if(document.querySelector('.angery-hen').classList.contains('show')) {
            
            setTimeout(function() {
            
                poos[0].classList.add('fall-poo');
                
                poos[1].classList.add('fall-poo');
                
                if(poos[0].offsetTop > 410) {
                    
                    poos[0].classList.remove('fall-poo');
                    
                }
                
                if(poos[1].offsetTop > 410) {
                    
                    poos[1].classList.remove('fall-poo');
                    
                }
                
            }, 3000);
            
        }
        
        // when poo fall in basket 
        poos.forEach(poo => {
            
            if(collision(poo, basket)) {
                
                if (score.innerHTML != 0 ) {
                    
                    score.innerHTML = parseInt(score.innerHTML) - 1;
                    
                    scoreCounter.innerHTML = parseInt(scoreCounter.innerHTML) - 1;
                    
                    loseLife.style.opacity = 1;
                
                    setTimeout(function () {
                    
                        loseLife.style.opacity = 0;
                    
                    }, 500);
                    
                }
                
                poo.style.opacity = 0;
                
                setTimeout(function() {
                    
                    poo.style.opacity = 1;
                    
                }, 4000);
                
            }
            
        });
        
        // happy hens golden eggs
        if(document.querySelector('.happy-hen').classList.contains('show-now')) {
            
            setTimeout(function() {
            
                gEggs[0].classList.add('fall-golden');
                
                gEggs[1].classList.add('fall-golden');
                
                if(gEggs[0].offsetTop > 410) {
                    
                    gEggs[0].classList.remove('fall-golden');
                    
                }
                
                if(gEggs[1].offsetTop > 410) {
                    
                    gEggs[1].classList.remove('fall-golden');
                    
                }
                
            }, 3000);
            
        }
        
        // when golden eggs fall
        gEggs.forEach(gEgg => {
            
            // when fall in basket
            if(collision(gEgg, basket)) {
                
                life.innerHTML = parseInt(life.innerHTML) + 1;
             
                gEgg.style.opacity = 0;
                
                gainLife.style.opacity = 1;
                
                setTimeout(function () {
                    
                    gainLife.style.opacity = 0;
                    
                }, 500);
                
                setTimeout(function() {
                    
                    gEgg.style.opacity = 1;
                    
                }, 2000);
                
            }
            
            // when golden eggs fall on floor 
            brokenGEggs.forEach(brokenGEgg => {
                
                if(collision(gEgg, brokenGEgg)) {
                    
                    if(gEgg.style.opacity != 0 ) {
                        
                        brokenGEgg.style.opacity = 1;
                        
                        gEgg.style.opacity = 0;
                        
                        setTimeout(function () {
                            
                            brokenGEgg.style.opacity = 0;
                            
                        }, 500);
                        
                        setTimeout(function() {
                        
                            gEgg.style.opacity = 1;
                        
                        }, 2000);
                    
                    } 
                }
                
            });
            
        });
        
    },1000);
    
    // moving basket by mouse movement
    game.addEventListener('mousemove', function(e) {
        
        basket.style.transform = 'none';
        
        basket.style.left = `${e.clientX - 50}px`;
        
    });
    
    
    // when lose all life
    setInterval (function() {
        
        if(life.innerHTML < 1) {
            
            // show score and play again button
            document.querySelector('.play-again').style.display = 'block';
            
            // end game
            game.remove();
            
            // set score in local storage
            localStorage.setItem('score', score.innerHTML);
            
            currentScore = parseInt(localStorage.getItem('score'));
            
           
            // set the best player name and score
            if(localStorage.getItem('bestScore') !== null) {
                
                if(parseInt(localStorage.getItem('bestScore')) < currentScore) {
                    
                    localStorage.setItem('bestScore', currentScore);
                    
                    if(currentPlayer != '') {
                        
                        if(currentPlayer.length > 10) {
                            
                            localStorage.setItem('bestPlayer', currentPlayer.substring(0,10));
                            
                        } else {
                            
                            localStorage.setItem('bestPlayer', currentPlayer);
                            
                        }
                        
                    } else {
                        
                        localStorage.setItem('bestPlayer', 'Unknown');
                        
                    }
                    
                }
                
            } else {
                
                localStorage.setItem('bestScore', currentScore);
                
                if(currentPlayer != '') {
                    
                    if(currentPlayer.length > 10) {
                        
                        localStorage.setItem('bestPlayer', currentPlayer.substring(0,10));
                        
                    } else {
                        
                        localStorage.setItem('bestPlayer', currentPlayer);
                        
                    }
                    
                } else {
                    
                    localStorage.setItem('bestPlayer', 'Unknown');
                    
                }
                
            }
            
        }
        
        // show your result
        document.querySelector('.your-result span').innerHTML = score.innerHTML;
    
    }, 1000);

}

// collision function 
function collision($div1, $div2) {
    var x1 = $div1.offsetLeft;
    var y1 = $div1.offsetTop;
    var h1 = $div1.offsetHeight;
    var w1 = $div1.offsetWidth;
    var b1 = y1 + h1;
    var r1 = x1 + w1;
    var x2 = $div2.offsetLeft;
    var y2 = $div2.offsetTop;
    var h2 = $div2.offsetHeight;
    var w2 = $div2.offsetWidth;
    var b2 = y2 + h2;
    var r2 = x2 + w2;

    if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
    return true;
}