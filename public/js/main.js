var rockIt = {
    init:function() {
        rockIt.mmenu();
        rockIt.headerScroll();
    },
    mmenu:function() {
        $('#menu').mmenu();
    },
    headerScroll:function() {
        var header = $('header');

        if($(window).scrollTop() >= 100) {
            header.toggleClass('active');  
        }

        $(window).scroll(function() {
            if($(window).scrollTop() >= 100) {
                header.addClass('active');
            } else {
                header.removeClass('active');
            }  
        })
    },
    slider:function() {
        var slickHome = $('.slick_home')
            slickHome.slick({
            prevArrow:$('.custom_prev'),
            nextArrow:$('.custom_next')
        });  
    },
    homeAlbums:function() {
        $.getJSON('js/json/albums.json', function(data) {
            var template = "";

            data.albums.forEach(element  => {
                template += '<li class="album_list_item">';
                template +=     '<div class= "item_cover" style="background: url(images/bin/albums/'+ element.cover +')"></div>';
                template +=     '<h4>'+ element.title +'</h4>';
                template +=     '<span>'+ element.year +'</span>';
                template +=     '<a href="'+ element.url +'" target="_blank">Get this record</a>';
                template += '</li>';
            })

            $('.home_albums_list').append(template);

            ScrollReveal().reveal('.album_list_item', {
                delay: 500,
                distance:'50px',
                easing:'ease-in'
            })


        })
    },
    homeLoadEvents:function() {
        $.ajax({
            url:  'http://localhost:3004/events',
            type: 'GET',
            dataType: 'json',
            success:function(res) {
                rockIt.homeEvents(res)
            }
        })
    },
    homeEvents:function(events) {
        var wrapper = $('.home_events_wrapper');
        var start = 0;
        var limit = 4;

        function createEvents() {
            var counter = 1;

            for(var i = start; i <= limit; i++) {
                var template = '';
                template += '<div class="event_item hidden element_'+ i +'">';
                template +=     '<div>'+ events[i].date +'</div>';
                template +=     '<div>'+ events[i].venue +'</div>';
                template +=     '<div>'+ events[i].location +'</div>';

                if(events[i].status) {
                    template += '<div class="available"><span>Available</span></div>';
                } else {
                    template += '<div class="available not"><span>Sold Out</span></div>';
                }


                template += '</div>';
                showEvents(template, counter, i);
                counter++;
            }
        }
            createEvents();
        function showEvents(template, counter, position) {
            wrapper.append(template);

            setTimeout(function(){
                $('.element_' + position).removeClass('hidden');
            },200 * counter)
        }   
    }
    
}


$(function() {
    rockIt.init();
    console.log('poo')
})
