YahooWeatherGetter = new Object();
YahooWeatherGetter.showArea = undefined;

YahooWeatherGetter.showYahooWeather = function(lon, lat, div){
    YahooWeatherGetter.showArea = div;
    YahooWeatherGetter.callJsonp(YahooWeatherGetter.getUrlYahooPlaceFinder(lon, lat, YahooWeatherGetter.getYahooPlaceFinder));
}

YahooWeatherGetter.showError = function(){
    if(YahooWeatherGetter.showArea)
        YahooWeatherGetter.showArea.innerHTML = "無法取得天氣...";
}

YahooWeatherGetter.callJsonp = function(url){
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}
function getYahooPlaceFinder(data){
    if(data){
        // data.query.results.Result.woeid
        // 28752317
        YahooWeatherGetter.callJsonp(
                                     YahooWeatherGetter.getUrlYahooWeatherForecast(data.query.results.Result.woeid, YahooWeatherGetter.getYahooWeatherForecast));
    }
}
YahooWeatherGetter.getYahooPlaceFinder = getYahooPlaceFinder;

function getYahooWeatherForecast(data){
    if(data){
        // data.query.results.Result.woeid
        // 28752317
        var icon = "";
        var weather = "";
        if(YahooWeatherGetter.showArea){
            switch(data.query.results.channel.item.condition.code){
                case "0":
                    icon="shandian";
                    break;
                case "1":
                    icon="shandian";
                    break;
                case "2":
                    icon="shandian";
                    break;
                case "3":
                    icon="shandian";
                    break;
                case "4":
                    icon="shandian";
                    break;
                case "5":
                    icon="mixrainsnow";
                    break;
                case "6":
                    icon="mixrainsleet";
                    break;
                case "7":
                    icon="mixrainsleet";
                    break;
                case "8":
                    icon="freezingdrizzle";
                    break;
                case "9":
                    icon="drizzle";
                    break;
                case "10":
                    icon="freezingrain";
                    break;
                case "11":
                    icon="showers";
                    break;
                case "12":
                    icon="showers";
                    break;
                case "13":
                    icon="snowflurries";
                    break;
                case "14":
                    icon="mixsnowandrain";
                    break;
                case "15":
                    icon="mixsnowandrain";
                    break;
                case "16":
                    icon="mixsnowandrain";
                    break;
                case "17":
                    icon="shandian";
                    break;
                case "18":
                    icon="mixsnowandrain";
                    break;
                case "19":
                    icon="foggy";
                    break;
                case "20":
                    icon="foggy";
                    break;
                case "21":
                    icon="foggy";
                    break;
                case "22":
                    icon="foggy";
                    break;
                case "23":
                    icon="blustery";
                    break;
                case "24":
                    icon="blustery";
                    break;
                case "25":
                    icon="cold";
                    break;
                case "26":
                    icon="cloudy";
                    break;
                case "27":
                    icon="cloudy";
                    break;
                case "28":
                    icon="cloudy";
                    break;
                case "29":
                    icon="cloudy";
                    break;
                case "30":
                    icon="cloudy";
                    break;
                case "31":
                    icon="sunny";
                    break;
                case "32":
                    icon="sunny";
                    break;
                case "33":
                    icon="fair";
                    break;
                case "34":
                    icon="fair";
                    break;
                case "35":
                    icon="mixrainhail";
                    break;
                case "36":
                    icon="sunny";
                    break;
                case "37":
                    icon="hail";
                    break;
                case "38":
                    icon="hail";
                    break;
                case "39":
                    icon="hail";
                    break;
                case "40":
                    icon="showers";
                    break;
                case "41":
                    icon="mixsnowandrain";
                    break;
                case "42":
                    icon="mixsnowandrain";
                    break;
                case "43":
                    icon="mixsnowandrain";
                    break;
                case "44":
                    icon="cloudy";
                    break;
                case "45":
                    icon="hail";
                    break;
                case "46":
                    icon="snowflurries";
                    break;
                case "47":
                    icon="hail";
                    break;
                default:
                    weather="Not available";
                    
            }
            switch(data.query.results.channel.item.condition.text.toLowerCase()){
                case "tornado":
                    weather="龙卷风";
                    break;
                case "tropical storm":
                    weather="热带风暴";
                    break;
                case "hurricane":
                    weather="飓风";
                    break;
                case "severe thunderstorms":
                    weather="大雷暴";
                    break;
                case "thunderstorms":
                    weather="雷雨";
                    break;
                case "mixed rain and snow":
                    weather="雨夹雪";
                    break;
                case "mixed rain and sleet":
                    weather="雨淞";
                    break;
                case "freezing drizzle":
                    weather="冻雾雨";
                    break;
                case "drizzle":
                    weather="毛毛雨";
                    break;
                case "freezing rain":
                    weather="冻雨";
                    break;
                case "showers":
                    weather="阵雨";
                    break;
                case "snow flurries":
                    weather="阵雪";
                    break;
                case "light snow showers":
                    weather="小雪";
                    break;
                case "light rain shower":
                    weather="小雨";
                    break;
                case "thunderstorms early":
                    weather="雷雨";
                    break;
                case "light rain with thunder":
                    weather="小雷阵雨";
                    break;
                case "blowing snow":
                    weather="飞雪";
                    break;
                case "snow":
                    weather="雪";
                    break;
                case "hail":
                    weather="冰雹";
                    break;
                case "sleet":
                    weather="雨凇";
                    break;
                case "dust":
                    weather="灰尘";
                    break;
                case "foggy":
                    weather="雾";
                    break;
                case "fog":
                    weather="雾";
                    break;
                case "haze":
                    weather="薄雾";
                    break;
                case "smoky":
                    weather="烟雾";
                    break;
                case "blustery":
                    weather="大风";
                    break;
                case "windy":
                    weather="大风";
                    break;
                case "cold":
                    weather="寒冷";
                    break;
                case "cloudy":
                    weather="多云";
                    break;
                case "mostly cloudy":
                    weather="大部多云";
                    break;
                case "partly cloudy":
                    weather="局部多云";
                    break;
                case "snow showers":
                    weather="阵雪";
                    break;
                case "isolated thundershowers ":
                    weather="集中雷雨";
                    break;
                case "scattered thunderstorms":
                    weather="局部暴雨";
                    break;
                case "isolated thunderstorms":
                    weather="集中暴雨";
                    break;
                case "pm thunderstorms":
                    weather="下午暴雨";
                    break;
                case "am thunderstorms":
                    weather="上午暴雨";
                    break;
                default:
                    weather="不可识别的天气";
            }
            
            
            var strHtml = "";
            /* strHtml += "<div style='float:left;'><img src='img/" + icon + ".png' /></div>";
             strHtml += "<div style='margin-left:60px;'><label>" + data.query.results.channel.location.city + "</label><br/>";
             strHtml += " " + data.query.results.channel.item.condition.temp + "℃ " + weather + "</div>";*/
            strHtml += "<div class='left'>" +
            "<div class='time'>"+
            "<span id='weatherdetail' style='cursor:pointer;'>"+
            "&nbsp;&nbsp;<span id='w_city'>"+data.query.results.channel.location.city+"</span>&nbsp;|&nbsp;"+
            "<span id='w_temp'>"+ data.query.results.channel.item.condition.temp +"℃</span>&nbsp;|&nbsp;"+
            "<span id='w_cal'>"+data.query.results.channel.lastBuildDate+"</span>&nbsp;"
            "</span>"+
            "</div>"+
            "</div>";
            
            strHtml += "<div class='current'>"+
            "<img src='images/weather/" + icon + ".png' class='current-weather-img' id='w_img2'>"+
            "<p class='weather-temp'><span>"+ data.query.results.channel.item.condition.temp +"℃</span></p>"+
            "<p class='weather-condition'><span>"+weather+"</span></p>"+
            "<p class='weather-condition'><span>"+"风向:&nbsp;"+data.query.results.channel.wind.direction+"&nbsp;&nbsp;风速:&nbsp;"+data.query.results.channel.wind.speed+"km/h</span></p>"+
            "</div>"
            strHtml += "<div style='width:1000px;height:2px;margin:0px auto;padding:0px;background-color:#D5D5D5;overflow:hidden;margin-top:50px'></div>";
            YahooWeatherGetter.showArea.innerHTML = strHtml;
            
            var forecast = data.query.results.channel.item.forecast;
            
            
           /* strHtml += "<div class='model_weather' style='display: none;'>"+
            "<div class='pnl-main-detail' style='background-color: rgba(0,0,0,0.1);'>"+
            "<div class='weather-detail'>";*/
            
            for(var i = 0; i < 3; i++) {
                var icon1 = "";
                var weather1 = "";
                var detailHTML = "";
                if(YahooWeatherGetter.showArea){
                    switch(forecast[i].code){
                        case "0":
                            icon1="shandian";
                            break;
                        case "1":
                            icon1="shandian";
                            break;
                        case "2":
                            icon1="shandian";
                            break;
                        case "3":
                            icon1="shandian";
                            break;
                        case "4":
                            icon1="shandian";
                            break;
                        case "5":
                            icon1="mixrainsnow";
                            break;
                        case "6":
                            icon1="mixrainsleet";
                            break;
                        case "7":
                            icon1="mixrainsleet";
                            break;
                        case "8":
                            icon1="freezingdrizzle";
                            break;
                        case "9":
                            icon1="drizzle";
                            break;
                        case "10":
                            icon1="freezingrain";
                            break;
                        case "11":
                            icon1="showers";
                            break;
                        case "12":
                            icon1="showers";
                            break;
                        case "13":
                            icon1="snowflurries";
                            break;
                        case "14":
                            icon1="mixsnowandrain";
                            break;
                        case "15":
                            icon1="mixsnowandrain";
                            break;
                        case "16":
                            icon1="mixsnowandrain";
                            break;
                        case "17":
                            icon1="shandian";
                            break;
                        case "18":
                            icon1="mixsnowandrain";
                            break;
                        case "19":
                            icon1="foggy";
                            break;
                        case "20":
                            icon1="foggy";
                            break;
                        case "21":
                            icon1="foggy";
                            break;
                        case "22":
                            icon1="foggy";
                            break;
                        case "23":
                            icon1="blustery";
                            break;
                        case "24":
                            icon1="blustery";
                            break;
                        case "25":
                            icon1="cold";
                            break;
                        case "26":
                            icon1="cloudy";
                            break;
                        case "27":
                            icon1="cloudy";
                            break;
                        case "28":
                            icon1="cloudy";
                            break;
                        case "29":
                            icon1="cloudy";
                            break;
                        case "30":
                            icon1="cloudy";
                            break;
                        case "31":
                            icon1="sunny";
                            break;
                        case "32":
                            icon1="sunny";
                            break;
                        case "33":
                            icon1="fair";
                            break;
                        case "34":
                            icon1="fair";
                            break;
                        case "35":
                            icon1="mixrainhail";
                            break;
                        case "36":
                            icon1="sunny";
                            break;
                        case "37":
                            icon1="hail";
                            break;
                        case "38":
                            icon1="hail";
                            break;
                        case "39":
                            icon1="hail";
                            break;
                        case "40":
                            icon1="showers";
                            break;
                        case "41":
                            icon1="mixsnowandrain";
                            break;
                        case "42":
                            icon1="mixsnowandrain";
                            break;
                        case "43":
                            icon1="mixsnowandrain";
                            break;
                        case "44":
                            icon1="cloudy";
                            break;
                        case "45":
                            icon1="hail";
                            break;
                        case "46":
                            icon1="snowflurries";
                            break;
                        case "47":
                            icon1="hail";
                            break;
                        default:
                            icon1="Not available";
                            
                    }
                    switch(forecast[i].text.toLowerCase()){
                        case "tornado":
                            weather1="龙卷风";
                            break;
                        case "tropical storm":
                            weather1="热带风暴";
                            break;
                        case "hurricane":
                            weather1="飓风";
                            break;
                        case "severe thunderstorms":
                            weather1="大雷暴";
                            break;
                        case "thunderstorms":
                            weather1="雷雨";
                            break;
                        case "mixed rain and snow":
                            weather1="雨夹雪";
                            break;
                        case "mixed rain and sleet":
                            weather1="雨淞";
                            break;
                        case "freezing drizzle":
                            weather1="冻雾雨";
                            break;
                        case "drizzle":
                            weather1="毛毛雨";
                            break;
                        case "freezing rain":
                            weather1="冻雨";
                            break;
                        case "showers":
                            weather1="阵雨";
                            break;
                        case "snow flurries":
                            weather1="阵雪";
                            break;
                        case "light snow showers":
                            weather1="小雪";
                            break;
                        case "light rain shower":
                            weather1="小雨";
                            break;
                        case "thunderstorms early":
                            weather1="雷雨";
                            break;
                        case "light rain with thunder":
                            weather1="小雷阵雨";
                            break;
                        case "blowing snow":
                            weather1="飞雪";
                            break;
                        case "snow":
                            weather1="雪";
                            break;
                        case "hail":
                            weather1="冰雹";
                            break;
                        case "sleet":
                            weather1="雨凇";
                            break;
                        case "dust":
                            weather1="灰尘";
                            break;
                        case "foggy":
                            weather1="雾";
                            break;
                        case "fog":
                            weather1="雾";
                            break;
                        case "haze":
                            weather1="薄雾";
                            break;
                        case "smoky":
                            weather1="烟雾";
                            break;
                        case "blustery":
                            weather1="大风";
                            break;
                        case "windy":
                            weather1="大风";
                            break;
                        case "cold":
                            weather1="寒冷";
                            break;
                        case "cloudy":
                            weather1="多云";
                            break;
                        case "mostly cloudy":
                            weather1="大部多云";
                            break;
                        case "partly cloudy":
                            weather1="局部多云";
                            break;
                        case "snow showers":
                            weather1="阵雪";
                            break;
                        case "isolated thundershowers":
                            weather1="集中雷雨";
                            break;
                        case "scattered thunderstorms":
                            weather1="局部暴雨";
                            break;
                        case "isolated thunderstorms":
                            weather1="集中暴雨";
                            break;
                        case "pm thunderstorms":
                            weather1="下午暴雨";
                            break;
                        case "am thunderstorms":
                            weather1="上午暴雨";
                            break;
                        default:
                            weather1="不可识别的天气";
                    }
                    if(i == 0){
                        detailHTML += "<div class='weather-item weather-today'>"+
                        "<div class='weather-day'><span id='w_day1'>今天(" +forecast[i].day+ ")</span></div>"+
                        "<img src='images/weather/" + icon1 + ".png' class='weather-img' id='w_img1'>"+
                        "<p class='weather-temp'><span id='w_temp1'>"+ forecast[i].low+"℃~"+forecast[i].high +"℃</span></p>"+
                        "<p class='weather-condition'><span id='w_info1'>"+weather1+"</span></p>"+
                        "</a>"+
                        "</div>";
                    }
                    else if(i == 1){
                        detailHTML += "<div class='weather-item weather-tomorrow'>"+
                        "<div class='weather-day'><span id='w_day2'>明天(" +forecast[i].day+ ")</span></div>"+
                        "<img src='images/weather/" + icon1 + ".png' class='weather-img' id='w_img2'>"+
                        "<p class='weather-temp'><span id='w_temp2'>"+ forecast[i].low+"℃~"+forecast[i].high +"℃</span></p>"+
                        "<p class='weather-condition'><span id='w_info2'>"+weather1+"</span></p>"+
                        "</a>"+
                        "</div>";
                    }
                    else{
                        detailHTML += "<div class='weather-item'>"+
                        "<div class='weather-day'><span id='w_day3'>后天(" +forecast[i].day+ ")</span></div>"+
                        "<img src='images/weather/" + icon1 + ".png' class='weather-img' id='w_img3'>"+
                        "<p class='weather-temp'><span id='w_temp3'>"+ forecast[i].low+"℃~"+forecast[i].high +"℃</span></p>"+
                        "<p class='weather-condition'><span id='w_info3'>"+weather1+"</span></p>"+
                        "</a>"+
                        "</div>";
                    }

                   /* strHtml += "<div style='float:left;'><img src='img/" + icon1 + ".png' /></div>";
                    strHtml += "<div>";
                    strHtml += "High: " + forecast[i].high + "℃ " + " Low:" + forecast[i].low + " "+weather1 + " Date:" + forecast[i].date +"</div>";*/
                }
                
              /*  strHtml += "</div>"+
                "</div>"+
                "</div>";
                */
                // data.query.results.channel.location.city
                // data.query.results.channel.item.condition.code
                // http://l.yimg.com/a/i/us/we/52/28.gif
                YahooWeatherGetter.showArea.innerHTML += detailHTML;
            }
            
            
        }
    }
}
YahooWeatherGetter.getYahooWeatherForecast = getYahooWeatherForecast;

YahooWeatherGetter.getUrlYahooPlaceFinder = function(lon, lat, callback){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"
    + lat + "%2C" + lon + "%22%20and%20gflags%3D%22R%22%20and%20lang%3D%22zh%22&format=json&diagnostics=true&callback=" + callback.name;
    return url;
}

YahooWeatherGetter.getUrlYahooWeatherForecast = function(woeid, callback){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D"
    + woeid + "%20and%20u%3D%22c%22&format=json&diagnostics=true&callback=" + callback.name;
    return url;
}

YahooWeatherGetter.getCfromF = function(f){
    var c = (f - 32) * 5 / 9;
    return c;
}

YahooWeatherGetter.getFfromC = function(f){
    var f = c * 9 / 5 + 32;
    return f;
}