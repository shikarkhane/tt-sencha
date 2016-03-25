Ext.define('ttapp.util.Analytics', {
    singleton: true,

    started: false,

    startTracker: function() {
      if (ttapp.util.Analytics.started) {
        return;
      }

      ttapp.util.Analytics.started = true;

      this._try(function() {
        window.analytics.startTrackerWithId('UA-69850370-1');
      }, 'Started Analytics');
    },

    trackView: function(view) {
      // if (!ttapp.util.Analytics.started) {
      //   return;
      // }

      this._try(function() {
        window.analytics.trackView(view);
      }, 'Tracked view: ' + view);
    },

    trackEvent: function(category, action, label, value) {
      // if (!ttapp.util.Analytics.started) {
      //   return;
      // }

      this._try(function() {
        window.analytics.trackEvent(category, action, label, value);
      }, 'Tracked event: ' + category + ', ' + action + ', ' + label + ', ' + value);
    },

    _try: function(fn, msg) {
      try {
        fn();

        if (msg) {
          console.log(msg);
        }
      }
      catch(e) {
        if (msg) {
          console.log('FAILURE: ' + msg);
        }
      }
    }
});
