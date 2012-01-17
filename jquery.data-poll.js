//  jQuery Data Poll v1.0
//  https://github.com/alexfarrill
//  Copyright 2012, Alex Farrill

// jQuery DataPoll: unobtrusively poll a url, provides similar functionality to Prototype "periodically_call_remote"
//
// Example markup:
// <div data-poll-url="/path/to/foo" data-poll-frequency="5" data-poll-update="#update_me" data-poll-name="uniqueString"></div>
 
(function($) {
  $(function() {
    $("[data-poll-url]").each(function() {
      var self = $(this),
          url       = self.attr("data-poll-url"),
          frequency = self.attr("data-poll-frequency"),
          update    = self.attr("data-poll-update"),
          poll_name = self.attr("data-poll-name");

      window[poll_name + "Function"] = function() {
        $.get(url, function(data, statusText, xhr) {
          if (xhr.status === 200){
            window.clearInterval(window[poll_name]);
            $(update).replaceWith(data);
          }
        });
      }

      window[poll_name] = setInterval(window[poll_name + "Function"], frequency*1000);
    });
  });
})( jQuery );