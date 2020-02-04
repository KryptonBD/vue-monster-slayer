new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function () {
            let damage =this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            
            if(this.checkResult()){
                return;
            }
            
            this.monsterAttack();
            
         },
        specialAttack: function () { 
            let damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;

            if(this.checkResult()){
                return;
            }
            this.monsterAttack();
            
        },
        heal: function () { },
        giveUp: function () { },
        monsterAttack: function() {
            let damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.checkResult();
        },
        calculateDamage: function(max, min) {
            let maxDamage =  Math.floor(Math.random() * max);
            return Math.max(maxDamage + 1, min);
        },
        checkResult: function() {
            if(this.monsterHealth <= 0) {
                if(confirm("You Won! New Game")){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if(this.playerHealth <= 0) {
                if(confirm("You Lost! New Game?")){
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else {
                return false;
            }
        }
    }
})