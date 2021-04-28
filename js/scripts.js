$(document).ready(function () {
    function randomInt(min, max) {
        var rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }
    var num1, num2, elem1, elem2, datt;
    datt = +window.localStorage.getItem('dateafb');

    (!window.localStorage.getItem('numberafb1')||!datt||datt!==+(new Date().getDate()))?num1=randomInt(50,120):num1=+window.localStorage.getItem('numberafb1');
    (!window.localStorage.getItem('numberafb2')||!datt||datt!==+(new Date().getDate()))?num2=randomInt(20,15):num2=+window.localStorage.getItem('numberafb2');

    elem1 = document.getElementById("visitors_num");
    elem2 = document.getElementById("spots_num");

    function change() {
        window.localStorage.setItem('numberafb1', +num1);
        window.localStorage.setItem('numberafb2', +num2);
        window.localStorage.setItem('dateafb', +(new Date().getDate()));
        var delta1 = randomInt(-10,15);
        elem1.innerHTML = num1;
        elem2.innerHTML = num2;

        num1+=delta1;
        (num1<=0)?num1=57:'';
        (num1>800)?num1=764:'';
        (num2>0)?num2--:'';
        (num2>8)?time = randomInt(30,1)*1000:time = randomInt(120,1)*1000;
        (num2===0)?time = randomInt(7200,3600)*1000:'';

        setTimeout(change, time);
        return false;
    }

    change();

    var realHumans = [];

    let langFunnel = $('html').attr('lang');

    if (langFunnel == 'en-US')
        langFunnel = 'us-US'

    $.ajax({
        url: `https://randomuser.me/api/?nat=${langFunnel.slice(0, langFunnel.indexOf('-'))}&results=25&exc=location,id`,
        dataType: 'json',
        success: function(data) {
            realHumans = data.results.map(function(item){
                return {
                    name: item.name.first,
                    surname: item.name.last,
                    gender: item.gender,
                    region: item.nat,
                    age: item.dob.age,
                    title: item.name.title,
                    phone: item.cell,
                    birthday: { dmy: item.dob.date, mdy: item.dob.date},
                    email: item.email,
                    password: item.login.password,
                    photo: item.picture.thumbnail
                }
            })
            doWork(realHumans);
        },
    });

    function doWork (array) {
        let realHumans = array;

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomUser() {
            // get some demo data
            var number = getRandomInt(99, 999),
                wins = new Intl.NumberFormat('en-GB').format(number),
                date = new Date(),
                today = date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear(),
                randomIndex = getRandomInt(0, realHumans.length - 1),
                name = realHumans[randomIndex].name,
                photo = realHumans[randomIndex].photo,
                sum = '$' + getRandomInt(99, 999);

            // on success ajax request
            //        $('.pnum').text(wins);
            //        $('.pdate').text(today);
            $('.pname').text(name);
            $('.psum').text(sum);
            $('.pimg').attr('src', photo);

            //        var spots = getRandomInt(2, 20);
            //        $('.pspots').text(spots);
        }

        function dataStart() {
            setTimeout(function() {
                randomUser();
                $('.block-hidden.first').addClass('shown animated tada');

                setInterval(function() {
                    $('.block-hidden.first').removeClass('shown animated tada');

                    setTimeout(function() {
                        randomUser();
                        $('.block-hidden.first').addClass('shown animated tada');
                    }, 600);
                }, 4000 + getRandomInt(0, 4000)); // 15—25 sec random
            }, getRandomInt(3000, 7000));
        }

        dataStart();

        //countdown

        var today = new Date(),
            dd = today.getDate(),
            mm = today.getMonth() + 1,
            yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = dd + '/' + mm + '/' + yyyy

        $('#today').text(today);
        $('.countdown-amount').countdown({ until: 1200, compact: true, format: 'MS' });

    }

    $('.anchor-js').click(function(e){
        e.preventDefault();
        var id  = $(this).attr('data-target'),
            top = $('#'+id).offset().top;
        $('body,html').animate({scrollTop: top-100}, 500);
    });

    var pass_field = $('input[name="password"]');

    $('.generate-pw-btn').click(function (event) {
        event.preventDefault();
        pass_field.val(generetePass(12));
    })

    function generetePass(passLength) {
        var pass             = '';
        var characters1       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var characters2       = 'abcdefghijklmnopqrstuvwxyz';
        var characters3       = '0123456789';
        var charactersLength1 = characters1.length;
        var charactersLength2 = characters2.length;
        var charactersLength3 = characters3.length;
        for ( var i = 0; i < passLength; i++ ) {
            var coin = Math.random();
            if(coin < 0.33){
                pass += characters1.charAt(Math.floor(Math.random() * charactersLength1));
            } else if(coin < 0.66){
                pass += characters2.charAt(Math.floor(Math.random() * charactersLength2));
            } else {
                pass += characters3.charAt(Math.floor(Math.random() * charactersLength3));
            }
        }
        return pass;
    }
    pass_field.val(generetePass(12));


    $('.slider').slick({
        prevArrow : '.slider_controls .fa-angle-left',
        nextArrow : '.slider_controls .fa-angle-right',
        slidesToShow: 4,
        infinite: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ],
    })

    $(".unmute").click(function () {
        var video = document.querySelector('video');
        video.muted = !video.muted;
        $('.unmute-div').hide();
        $('.yt_over').hide();
    })

    $('.close_warning_section').click(function (event) {
        event.preventDefault();
        $('.warning_section').hide();
    })
})
