(function() {
  'use strict';

  $('.button-collapse').sideNav();

  const $carouselItems = $('.carousel-item');

  const createOptionStyle = function(option, $page) {
    const $h1 = $page.children();

    if (option === 'surf') {
      $page.prop('style', 'background-image: url(https://www.outsideonline.com/sites/default/files/styles/img_850x480/public/final-shot-pnw-surfing_h.jpg?itok=9iCsvMv5)');
      $h1.text('Go Surfing at Twin Rivers Dude!');
    }
    else if (option === 'ski') {
      $page.prop('style', 'background-image: url(https://images.pexels.com/photos/47356/freerider-skiing-ski-sports-47356.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)');
      $h1.text('Grab the sticks and head to Crystal!');
    }
    else if (option === 'sickSkiing') {
      $page.prop('style', 'background-image: url(https://www.skis.com/on/demandware.static/-/Sites-Skis-Library/default/dw83fb8f05/images/images%20for%20content/Skiing-deep-powder.gif)');
      $h1.text('Call In Siiiick! Grab The Snorkel! Go Skiing At Crystal!');
    }
    else if (option === 'sickSurf') {
      $page.prop('style', 'background-image: url(http://i.cdn-surfline.com/surfnews/images/2015/03_march/spotcheck_noosa/full/Tyack_Andrew.Warhurst_TeaTree_Noosa.jpg)');
      $h1.text('Call In Siiiick! Grab The Board! Go Surfing At La Push!');
    }
    else if (option === 'work') {
      $page.prop('style', 'background-image: url(http://2.design-milk.com/images/2014/01/OXYMORON-Desk-Anna-Lotova-1.jpg)');
      $h1.text('Go To Work. It\'s not that good out there.');
    }
    else {
      $page.prop('style', 'background-image: url(http://i4.mirror.co.uk/incoming/article7745698.ece/ALTERNATES/s1200/Man-watching-football-on-television.jpg)');
      $h1.text('Stay Home. It\'s not that good out there.');
    }
  };

  createOptionStyle('surf', $carouselItems.first());
  createOptionStyle('work', $carouselItems.eq(1));
  createOptionStyle('home', $carouselItems.last());

  $('.carousel.carousel-slider').carousel({ full_width: true, indicators: true, no_wrap: true });
})();
