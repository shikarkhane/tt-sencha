Ext.define('ttapp.view.TimerClock', {
    extend: 'Ext.Container',
    xtype: 'timerClock',
    duration: 0, 
    paused: false,
    clockIntervalHook: undefined,
    config: {
        left: 0,
        top: 0
    },
    start: function () {
        var me = this,
            duration = me.duration,
            updateClock = function () {
                if (me.isPaused()) {
                    return;
                }
                me.setHtml(me.formatTime(me.duration++));
                if (duration >= 300) {
                    me.stop();
                }
            };
        me.clockIntervalHook = setInterval(updateClock, 1000);
        return me;
    },
    getDuration: function(){
        // display seconds is 1 sec ahead than private variable on pause
        return (this.duration - 1);   
    },
    pause: function () {
        this.paused = true;
        return this;
    },

    isPaused: function () {
        return this.paused == true
    },

    resume: function () {
        this.paused = false;
    },

    restart: function () {
        this.stop();
        this.start();
    },

    stop: function () {
        clearInterval(this.clockIntervalHook);
        return this;
    },

    //format the given seconds into "HH:MM:SS" format
    //override this if you need custom behavior
    formatTime: function (seconds) {
        var hours = Math.floor(seconds / 3600);
        hours = hours <= 9 ? "0" + hours : hours;
        seconds %= 3600;
        var minutes = Math.floor(seconds / 60);
        minutes = minutes <= 9 ? "0" + minutes : minutes;
        seconds %= 60;
        seconds = seconds <= 9 ? "0" + seconds : seconds;
        return hours + ":" + minutes + ":" + seconds
    }
});
