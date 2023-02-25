let choice;
let playerScore = $('#myScore');
let ordiScore = $('#ordiScore');
let result = $('.result');
let myScore = 0;
let hisScore = 0;
let bool = 'no';



$(document).ready(function () {


    $("#opener").on("click", function () {
        $("#dialog").dialog("open");
    });


    $("#dialog").dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });


    $('#game').hide(0);
    $('#btn').on('click', () => {
        if (bool == 'yes') {
            restart();
        } else {
            $('#h1').slideUp(1000).html('/SCORE').slideDown(2000);
            $('#game').show(2000);
            $('#btn').slideUp('slow', function () {
                $('#btn').html('RECOMMENCER');
                $('#btn').switchClass('btn-success', 'btn-warning text-dark', 1000);
            }).slideDown('slow');
            bool = 'yes';
            play();
        }

    });
});
function play() {
    let myButtons = $('.myBtn');

    $('#dialog2').dialog();

    myButtons.each(function (index, element) {
        // element == this
        $(myButtons[index]).on('click', (e) => {

            if (playerScore == 10) {
                let success = '<div id="dialog2"><p>Vous remporté la partie</p></div>'
                $('#container').append(success);
                setTimeout(() => {
                    restart();
                }, 2000);
            } else if (hisScore == 10) {
                let defeat = '<div id="dialog2"><p>L\'ordi remporte la partie</p></div > '
                $('#container').append(defeat);
                setTimeout(() => {
                    restart();
                }, 2000)
            } else {
                hisChoice = computerChoice();
                if (hisChoice.val() == $(this).val()) {
                    result.html('Match nul...');
                } else if ($(this).val() == 1 && hisChoice.val() == 2) {
                    hisScore++;
                    result.html('Le papier bat la pierre. <br>L\'ordinateur gagne la manche');
                } else if ($(this).val() == 1 && hisChoice.val() == 3) {
                    myScore++;
                    result.html('La pierre bat le ciseau. <br>Vous gagné la manche');
                } else if ($(this).val() == 2 && hisChoice.val() == 1) {
                    myScore++;
                    result.html('Le papier bat la pierre. <br>Vous gagné la manche');
                } else if ($(this).val() == 3 && hisChoice.val() == 1) {
                    hisScore++;
                    result.html('La pierre bat le ciseau. <br>L\'ordinateur gagne la manche');
                } else if ($(this).val() == 3 && hisChoice.val() == 2) {
                    myScore++;
                    result.html('Le ciseau bat le papier. <br>Vous gagné la manche');
                } else if ($(this).val() == 2 && hisChoice.val() == 3) {
                    hisScore++;
                    result.html('Le ciseau bat le papier. <br>L\'ordinateur gagne la manche');
                }
            }


            playerScore.html(myScore);
            ordiScore.html(hisScore);
            return false;
        });

    });

};

function computerChoice() {
    choice = ~~(Math.random() * (3 - 1 + 1)) + 1;
    let hisButton = $(`#O${choice}`);
    $(hisButton).switchClass('bg-dark', 'bg-warning', 1000);
    setTimeout(() => {
        $(hisButton).switchClass('bg-warning', 'bg-dark', 1000)
    }, 1000);
    return hisButton;

}

function restart() {
    myScore = 0;
    hisScore = 0;
    playerScore.html(myScore);
    ordiScore.html(hisScore);
    play();
}
// computerChoice();
