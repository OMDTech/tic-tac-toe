class Game {
    start() {
        let row = new Row();
        row.setRow();
    }

    compareValues(arrays, value) {
        let final = [];
        arrays.forEach((array, index) => {
            array.forEach((element, index) => {
                if (value === index) {
                    final.push(element);
                }
            });
        });
        return this.checkSameArrayVlaues(final);
    }

    checkSameArrayVlaues(array) {
        // console.log("check same arrays " + array.every((val) => val === array[array.length - 1]) + "   " + array)
        return array.every((val) => val === array[array.length - 1]);
    }
    reset() {
        location.reload();
    }
}

class Row {
    constructor() {
        this.player = "X";
        this.winner = "clear";
        this.game = new Game();
        this.rows = [
            $(".row:eq(0) > div").toArray(),
            $(".row:eq(1) > div").toArray(),
            $(".row:eq(2) > div").toArray(),
        ];
        this.saved = [
            [],
            [],
            []
        ];
    }

    setRow() {
        $(".row > div").each((index, element) => {
            $(element).on("click", () => {
                let ceil = new Ceil(element, this.player);
                ceil.checkCeil();
                this.checkWinner();
                this.setPlayer(ceil.isChecked);
            });
        });
    }

    setPlayer(isChecked) {
        if (!isChecked) {
            this.player === "X" ? (this.player = "O") : (this.player = "X");
        } else {
            isChecked === "X" ? this.player === "O" : "";
        }
    }

    checkWinner() {
        this.saveRow();
        this.saved.forEach((array, index) => {
            if (this.game.checkSameArrayVlaues(array)) {
                array[index] === "clear" ? "" : (this.winner = array[array.length - 1]);
            }
            if (this.game.compareValues(this.saved, index)) {
                array[index] === "clear" ? "" : (this.winner = array[index]);
            }
            if (
                this.saved[0][0] === this.saved[1][1] &&
                this.saved[2][2] === this.saved[1][1]
            ) {
                this.saved[0][0] === "clear" ? "" : (this.winner = this.saved[0][0]);
            }
            if (
                this.saved[0][2] === this.saved[1][1] &&
                this.saved[2][0] === this.saved[1][1]
            ) {
                this.saved[0][0] === "clear" ? "" : (this.winner = this.saved[0][2]);
            }
        });
        console.log("winner " + this.winner);
        console.log(this.saved);
        if (this.winner !== "clear") {
            $("#winner").append(`Player ${this.winner} wins`);
            setTimeout(() => {
                alert(`Player ${this.winner} wins`);
                this.game.reset();
            }, 100);
        }
        if (this.checkDraw()) {
            setTimeout(() => {
                alert("Draw");
                this.game.reset();
            }, 100);


        }
    }

    checkDraw() {
        let array = $(".row > div").map((index, element) => {
            return $(element).attr("value") || "clear";
        });

        return Object.values(array).every((val) => val !== "clear");
    }

    saveRow() {
        this.rows.forEach((array, arrayIndex) => {
            array.forEach((element, index) => {
                this.saved[arrayIndex][index] = $(element).attr("value") || "clear";
            });
        });
    }
}

class Ceil {
    constructor(element, player) {
        this.element = element;
        this.player = player;
    }

    checkCeil() {
        this.isChecked = $(this.element).attr("value");
        if (this.isChecked) {
            alert("alrady checked");
        } else {
            this.setValue();
            $(this.element).attr("value", this.player);
        }
    }

    setValue() {
        $(this.element).append(`<h1>${this.player}</h1>`);
    }
}

const main = () => {
    let game = new Game();
    game.start();
    $("#reset").on("click", () => {
        game.reset();
    });
};

main();