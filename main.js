let audio = new Audio();
let trackPlay = false;
fetch(`https://complex.in.ua/status-json.xsl?mount=/yantarne`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        $('.trackName').text(data.icestats.source.title);
        $('.listeners').text(data.icestats.source.listeners + ' live');
    })
    .catch(err => {
        console.log('Помилка при виконанні запиту:', err);
    });
$('.btn').click(function () {

    if (trackPlay == false) {
        fetch(`https://complex.in.ua/status-json.xsl?mount=/yantarne`)
            .then((response) => {
                return response.json()
            })
            .then(data => {
                $('#icon').removeClass('fa-play').addClass('fa-pause');
                audio.src = data.icestats.source.listenurl;
                audio.play();
            })
            .catch(err => {
                console.log('Помилка при виконанні запиту:', err);
            });
        trackPlay = true;
    } else {
        audio.pause();
        $('#icon').removeClass('fa-pause').addClass('fa-play');
        trackPlay = false;
    }

})

$('#volume').on("input", function () {
    audio.volume = $(this).val();
})
function animation() {
    $('.wave1').css('transform', 'scale(1)');
    setTimeout(function () {
        $('.wave1').css('transform', 'scale(1.2)');
    }, 250);
    setTimeout(function () {
        $('.wave1').css('transform', 'scale(1)');
        if (trackPlay) {
            animation();
        }
    }, 500);
}

function animation2() {
    $('.wave2').css('transform', 'scale(1)');
    setTimeout(function () {
        $('.wave2').css('transform', 'scale(1.2)');
    }, 350);
    setTimeout(function () {
        $('.wave2').css('transform', 'scale(1)');
        if (trackPlay) {
            animation2();
        }
    }, 700);
}

function animation3() {
    $('.wave3').css('transform', 'scale(1)');
    setTimeout(function () {
        $('.wave3').css('transform', 'scale(1.2)');
    }, 450);
    setTimeout(function () {
        $('.wave3').css('transform', 'scale(1)');
        if (trackPlay) {
            animation3();
        }
    }, 900);
}

$('.btn').click(function () {
    if (trackPlay) {
        animation();
        animation2();
        animation3();
    } else {
        $('.wave1').css('transform', 'scale(1)');
        $('.wave2').css('transform', 'scale(1)');
        $('.wave3').css('transform', 'scale(1)');
    }
});

$('#burger').click(function () {
    $('.blackScreen').css('display', 'flex');
})
$('.blackScreen a').click(function () {
    $('.blackScreen').css('display', 'none');
})



$(document).ready(function () {
    $('.infoDiv').css('opacity', '0');
    $(window).scroll(function () {
        $('.infoDiv').each(function (i) {
            let bottom_of_object = $(this).position().top + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height();
            if (bottom_of_window > bottom_of_object) {
                $(this).animate({ 'opacity': '1' }, 1000);
            }
        });
    })
})
$(document).ready(function () {
    let volume = localStorage.getItem('volume');
    if (volume != null) {
        $('#volume').val(volume);
        audio.volume = volume;
    }
})
$('#volume').on("input", function () {
    localStorage.setItem('volume', $(this).val());
})
