let users=[{sel: [2,5,8]},{sel:[0,4,6]}] 

let winningCombinations=  [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function findWinner (){
    let currentIndex=0
    for(let i= 0; i< winningCombinations.length; i++){
      if(users[currentIndex].sel.includes(winningCombinations[i])){
        console.log(winningCombinations[i])
      }
    }
  
  }

  findWinner()