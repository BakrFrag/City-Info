function loadData() {
        //console.log("ok entered function ");
        //var $btn = $('#submit-btn');
        var $body = $('body');
        var $street=$("#street");
        var $city = $('#city');
        var $wikiheader = $('#wikipedia-header');
        var $wikilinks = $('#wikipedia-links');
        var $timesheader = $('#nytimes-header');
        var $timeslinks = $('#nytimes-articles');
        var $greeting = $('#greeting');
        // var ptn=$street.val();
        // var ptm=$city.val();
        // var address= ptn+', '+ptm;
        var address=$street.val() + ", " + $city.val();
        var streetview=
        'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'';
        $greeting.text("so you live at:"+address);
        console.log(address);
        console.log(streetview);
        //$('#theDiv').prepend($('<img>',{id:'theImg',src:'theImg.png'}))
      //  $body.append($('<img>',{id:'theimg',src:streetview}));
         $body.append('<img src="'+streetview+'" class="bgimg" >');
         console.log("end function ")
        // nytimes data handling
         var nytimesurl=
         "https://api.nytimes.com/svc/search/v2/articlesearch.json?q "+$city.val()+'&sort=newest&api-key=22dc83837b7e4dfba1d83dcce97ba96b';
         $.getJSON(nytimesurl,function(data){
              var articlies=data.response.docs;
              $timesheader.text("new yourk times article about:"+$city.val());
              for(var i=0;i<articlies.length;i++ )
              {
                var article=articlies[i];
                $timeslinks.append('<li class="article">'+'<a href="'+ article.web_url +'">'+article.headline.main+
                '<a/>'+'<p>'+article.snippet+'</p></li>');
              }
              console.log("for ended");
         }).fail(function(e){
           $timeslinks.text("new yourk times articles can't be loaded")
         });
         var wikirequesttime=setTimeout(function(){
         $wikiheader.text("Failed to fetch data from wikipedia")
       },10000);
         var wiki_url="https://en.wikipedia.org/w/api.php?action=opensearch&search="+$city.val()+"&format=json&callback=wikiCallback";
         $.ajax({
           url:wiki_url,
           dataType:'jsonp',
           //jsonp:"wikiCallback",
           success: function(response)
           {
              var linklist=response[1];
              for(var i=0;i<linklist.length;i++)
              {
                var wikilink=linklist[i];
                var url="http://en.wikipedia.org/wiki/"+wikilink;
                $wikilinks.append('<a href="'+url+'">'+ wikilink +'</a>')
              };
              clearTimeout(wikirequesttime);
           },
         });

     return false;
    };
  //  $("#submit-btn").submit('loaddata');
  //  $("#form-container").submit('ourData');
    //$('#form-container').submit('ourData');
$('#form-container').submit(loadData);
