new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function () {
            let damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player Hits Monster ' + damage
            })
            if (this.checkResult()) {
                return;
            }
            this.monsterAttack();
        },

        specialAttack: function () {
            let damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player Hits Monster hard for ' + damage
            })
            if (this.checkResult()) {
                return;
            }
            this.monsterAttack();

        },

        heal: function () {
            this.playerHealth = this.playerHealth <= 90 ? this.playerHealth + 10 : this.playerHealth = 100;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            })
            this.monsterAttack();
        },

        giveUp: function () {
            this.gameIsRunning = false;
        },

        monsterAttack: function () {
            let damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster Hits Player ' + damage
            })
            this.checkResult();
        },

        calculateDamage: function (max, min) {
            let maxDamage = Math.floor(Math.random() * max);
            return Math.max(maxDamage + 1, min);
        },

        checkResult: function () {
            if (this.monsterHealth <= 0) {
                if (confirm("You Won! New Game")) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm("You Lost! New Game?")) {
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