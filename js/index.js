const makePageFunction = function(day, apiObject) {
  'use strict';

  $('.button-collapse').sideNav();

  const buildPage = function(activity) {
    const option = activity;
    const $body = $('body');
    const $h1 = $('h1');
    const $buttoncollapse = $('.button-collapse');

    if (option === 'surf') {
      $body.prop('style', 'background-image: url(https://www.outsideonline.com/sites/default/files/styles/img_850x480/public/final-shot-pnw-surfing_h.jpg?itok=9iCsvMv5)');
      $h1.text('Go Surfing at La Push!');
      $h1.addClass('grey-text text-darken-2');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
    else if (option === 'ski') {
      $body.prop('style', 'background-image: url(https://images.pexels.com/photos/47356/freerider-skiing-ski-sports-47356.jpeg?w=1260&h=750&auto=compress&cs=tinysrgb)');
      $h1.text('Grab the sticks and head to Crystal!');
      $h1.addClass('grey-text text-darken-2');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
    else if (option === 'sickSkiing') {
      $body.prop('style', 'background-image: url(https://www.skis.com/on/demandware.static/-/Sites-Skis-Library/default/dw83fb8f05/images/images%20for%20content/Skiing-deep-powder.gif)');
      $h1.text('Call In Siiiick! Grab The Snorkel! Go Skiing At Crystal!');
      $h1.addClass('grey-text text-darken-2');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
    else if (option === 'sickSurf') {
      $body.prop('style', 'background-image: url(http://i.cdn-surfline.com/surfnews/images/2015/03_march/spotcheck_noosa/full/Tyack_Andrew.Warhurst_TeaTree_Noosa.jpg)');
      $h1.text('Call In Siiiick! Grab The Board! Go Surfing At La Push!');
      $h1.addClass('grey-text text-darken-2');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
    else if (option === 'work') {
      $body.prop('style', 'background-image: url(http://2.design-milk.com/images/2014/01/OXYMORON-Desk-Anna-Lotova-1.jpg)');
      $h1.text('Go To Work. It\'s not that good out there.');
      $h1.addClass('grey-text text-darken-2');
      $h1.prop('style=margin-top: 0.5rem');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
    else {
      $body.prop('style', 'background-image: url(http://i4.mirror.co.uk/incoming/article7745698.ece/ALTERNATES/s1200/Man-watching-football-on-television.jpg)');
      $h1.text('Stay Home. It\'s not that good out there.');
      $h1.addClass('grey-text text-darken-2');
      $h1.prop('style=margin-top: 0.5rem');
      $buttoncollapse.addClass('grey-text text-darken-2');
    }
  };

  const normalizeScore = function(lowScore, highScore, score) {
    const step = (highScore + Math.abs(lowScore)) / 11;

    for (let i = 0; i < 11; i++) {
      if (score >= (highScore - (step * (i + 1)))) {
        return 10 - i;
      }
    }
  };

  const snowBaseScore = function(base) {
    if (base >= 80) {
      return 4;
    }
    else if (base < 80 && base >= 70) {
      return 3;
    }
    else if (base < 70 && base >= 60) {
      return 2;
    }
    else if (base < 60 && base >= 50) {
      return 1;
    }
    else if (base < 50 && base >= 40) {
      return 0;
    }
    else if (base < 40 && base >= 30) {
      return -1;
    }
    else if (base < 30 && base >= 20) {
      return -2;
    }
    else if (base < 20 && base >= 10) {
      return -3;
    }
    else {
      return -4;
    }
  };

  const directionScore = function(sub, dir) {
    let score;

    if (dir >= 33.75 && dir <= 56.25) {
      score = -4;
    }
    else if ((dir >= 22.5 && dir < 33.75) || (dir > 56.25 && dir <= 67.5)) {
      score = -3;
    }
    else if ((dir >= 0 && dir < 22.5) || (dir > 67.5 && dir <= 90)) {
      score = -2;
    }
    else if ((dir >= 337.5 && dir <= 365) || (dir > 90 && dir <= 112.5)) {
      score = -1;
    }
    else if ((dir >= 292.5 && dir < 337.5) || (dir > 112.5 && dir <= 157.5)) {
      score = 0;
    }
    else if ((dir >= 270 && dir < 292.5) || (dir > 157.5 && dir <= 180)) {
      score = 1;
    }
    else if ((dir >= 247.5 && dir < 270) || (dir > 180 && dir <= 202.5)) {
      score = 2;
    }
    else if ((dir >= 236.25 && dir < 247.5) || (dir > 202.5 && dir <= 213.75)) {
      score = 3;
    }
    else {
      score = 4;
    }
    if (sub === 'swell') {
      return score;
    }
    else {
      return score * -1;
    }
  };

  const direction = function(substance, directions) {
    let counter = 0;
    const tempScores = directions.map((element) => {
      return directionScore(substance, element);
    });
    const tempAvg = tempScores.reduce((result, element) => {
      counter += 1;

      return result + element;
    }, 0) / counter;

    return tempAvg;
  };

  const windSpeedScores = function(element) {
    if (element >= 3 && element <= 5) {
      return 4;
    }
    else if (element < 3 || (element > 5 && element <= 7)) {
      return 3;
    }
    else if (element > 7 && element <= 11) {
      return 2;
    }
    else if (element > 11 && element <= 15) {
      return 1;
    }
    else if (element > 15 && element <= 18) {
      return 0;
    }
    else if (element > 18 && element <= 21) {
      return -1;
    }
    else if (element > 21 && element <= 24) {
      return -2;
    }
    else if (element > 24 && element <= 27) {
      return -3;
    }
    else {
      return -4;
    }
  };

  const windSpeed = function(speeds) {
    let counter = 0;
    const tempScores = speeds.map(windSpeedScores);
    const tempAvg = tempScores.reduce((result, element) => {
      counter += 1;

      return result + element;
    }, 0) / counter;

    return tempAvg;
  };

  const swellHeightScore = function(element) {
    if (element >= 4 && element <= 6) {
      return 4;
    }
    else if ((element > 6 && element <= 8) || (element < 4 && element >= 3)) {
      return 3;
    }
    else if ((element > 8 && element <= 10) || (element < 3 && element >= 2)) {
      return 2;
    }
    else if ((element > 10 && element <= 12) || (element < 2 && element >= 1)) {
      return 1;
    }
    else {
      return 0;
    }
  };

  const swellHeight = function(heights) {
    let counter = 0;
    const tempScores = heights.map(swellHeightScore);
    const tempAvg = tempScores.reduce((result, element) => {
      counter += 1;

      return result + element;
    }, 0) / counter;

    return tempAvg;
  };

  const swellPeriodScore = function(element) {
    if (element >= 16) {
      return 4;
    }
    else if (element < 16 && element >= 12) {
      return 3;
    }
    else if (element < 12 && element >= 8) {
      return 2;
    }
    else {
      return 1;
    }
  };

  const swellPeriod = function(periods) {
    let counter = 0;
    const tempScores = periods.map(swellPeriodScore);
    const tempAvg = tempScores.reduce((result, element) => {
      counter += 1;

      return result + element;
    }, 0) / counter;

    return tempAvg;
  };

  const skiFunction = function(surfScoreN) {
    let airTempScore = 0;
    let newSnowScore = 0;

    const $xhr = $.ajax({
      method: 'GET',
      url: apiObject.snow,
      dataType: 'json'
    });

    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i]['Air Temperature Observed (degF) Start of Day Values'] > 32) {
          if (i === 0) {
            airTempScore -= 1;
          }
          else if (i === 1) {
            airTempScore -= 2;
          }
          else if (i === 2) {
            airTempScore -= 3;
          }
          else {
            airTempScore -= 4;
          }
        }
      }

      const baseScore = snowBaseScore(data.data[3]['Snow Depth (in) Start of Day Values']);

      for (let i = 0; i < data.data.length; i++) {
        const newSnow = data.data[i]['Change In Snow Depth (in)'];

        if (newSnow >= 15) {
          newSnowScore += 16;
        }
        else if (newSnow < 15 && newSnow > 0) {
          newSnowScore += (Math.ceil(newSnow) + (i - 3));
        }
      }

      const totalSnowScore = airTempScore + newSnowScore + baseScore;
      const normalSkiScore = normalizeScore(-14, 62, totalSnowScore);
      const today = day;

      if (normalSkiScore >= surfScoreN) {
        if (today >= 1 && today <= 5 && normalSkiScore >= 9) {
          buildPage('sickSkiing');
        }
        else if (today >= 1 && today <= 5) {
          buildPage('work');
        }
        else if (normalSkiScore <= 3) {
          buildPage('home');
        }
        else {
          buildPage('ski');
        }
      }
      else {
        if (today >= 1 && today <= 5 && surfScoreN >= 9) {
          buildPage('sickSurf');
        }
        else if (today >= 1 && today <= 5) {
          buildPage('work');
        }
        else if (surfScoreN <= 3) {
          buildPage('home');
        }
        else {
          buildPage('surf');
        }
      }
    });

    $xhr.fail((err) => {
      console.log(err);
    });
  };

  const windFunction = function(scoresList) {
    const windDirections = [];
    const windVelocities = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: apiObject.wind,
      dataType: 'json'
    });

    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }
      windDirections.push(data.Wind.wind_direction[0][2]);
      windDirections.push(data.Wind.wind_direction[0][3]);
      windDirections.push(data.Wind.wind_direction[0][4]);

      windVelocities.push(data.Wind.wind_speed[0][2]);
      windVelocities.push(data.Wind.wind_speed[0][3]);
      windVelocities.push(data.Wind.wind_speed[0][4]);

      scoresList.push(direction('wind', windDirections));
      scoresList.push(windSpeed(windVelocities));

      const totalSurfScore = scoresList.reduce((result, element) => {
        return result + element;
      }, 0).toFixed(2);

      const normalSurfScore = normalizeScore(-11, 20, totalSurfScore);

      skiFunction(normalSurfScore);
    });

    $xhr.fail((err) => {
      console.log(err);
    });
  };

  const surfFunction = function() {
    const surfTotalScores = [];
    const surfDirections = [];
    const surfPeriods = [];
    const surfHeights = [];

    const $xhr = $.ajax({
      method: 'GET',
      url: apiObject.swell,
      dataType: 'json'
    });

    $xhr.done((data) => {
      if ($xhr.status !== 200) {
        return;
      }

      let tempHeightAvg = (data.Surf.surf_max[0][2] + data.Surf.surf_min[0][2]) / 2;

      surfHeights.push(tempHeightAvg);
      tempHeightAvg = (data.Surf.surf_max[0][3] + data.Surf.surf_min[0][3]) / 2;
      surfHeights.push(tempHeightAvg);
      tempHeightAvg = (data.Surf.surf_max[0][4] + data.Surf.surf_min[0][4]) / 2;
      surfHeights.push(tempHeightAvg);

      surfDirections.push(data.Surf.swell_direction1[0][2]);
      surfDirections.push(data.Surf.swell_direction1[0][3]);
      surfDirections.push(data.Surf.swell_direction1[0][4]);

      surfPeriods.push(data.Surf.swell_period1[0][2]);
      surfPeriods.push(data.Surf.swell_period1[0][3]);
      surfPeriods.push(data.Surf.swell_period1[0][4]);

      surfTotalScores.push(direction('swell', surfDirections));
      surfTotalScores.push(swellHeight(surfHeights));
      surfTotalScores.push(swellPeriod(surfPeriods));

      windFunction(surfTotalScores);
    });

    $xhr.fail((err) => {
      console.log(err);
    });
  };

  surfFunction();
};

const fakeApiJSON = {
  ski: {
    swell: 'https://api.myjson.com/bins/32t19',
    wind: 'https://api.myjson.com/bins/4gj5p',
    snow: 'https://api.myjson.com/bins/2dopp'
  },
  surf: {
    swell: 'https://api.myjson.com/bins/24319',
    wind: 'https://api.myjson.com/bins/ncvx',
    snow: 'https://api.myjson.com/bins/4cv7p'
  },
  home: {
    swell: 'https://api.myjson.com/bins/32t19',
    wind: 'https://api.myjson.com/bins/4gj5p',
    snow: 'https://api.myjson.com/bins/4cv7p'
  }
};

$('.demo-buttons').on('click', 'button', (event) => {
  'use strict';
  if (event.target.id === 'ssski') {
    makePageFunction(6, fakeApiJSON.ski);
  }
  else if (event.target.id === 'sssurf') {
    makePageFunction(6, fakeApiJSON.surf);
  }
  else if (event.target.id === 'sshome') {
    makePageFunction(6, fakeApiJSON.home);
  }
  else if (event.target.id === 'mfski') {
    makePageFunction(2, fakeApiJSON.ski);
  }
  else if (event.target.id === 'mfsurf') {
    makePageFunction(2, fakeApiJSON.surf);
  }
  else {
    makePageFunction(2, fakeApiJSON.home);
  }
});
