var scheduleCount = 0;
var schedules = {};

function genId() {
    return 'Schedule_' + (scheduleCount++);
}

function runSchedule(deltaTime) {
    var scheduleId, scheduleItem, schedules;
    schedules = schedules;
    for(scheduleId in schedules) {
        if(schedules.hasOwnProperty(scheduleId)) {
            scheduleItem = schedules[scheduleId];
            if(scheduleItem.paused) continue;
            if (scheduleItem.isFrame) {
                scheduleItem.frame--;
                if (scheduleItem.frame < 0) {
                    delete schedules[scheduleId];
                    scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                }
            }
            else if (scheduleItem.isTime) {
                scheduleItem.time -= deltaTime;
                if (scheduleItem.time < 0) {
                    delete schedules[scheduleId];
                    scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                }
            }
            else if (scheduleItem.isInterval) {
                scheduleItem.time -= deltaTime;
                if (scheduleItem.time < 0) {
                    scheduleItem.task.apply(scheduleItem, scheduleItem.args);
                    scheduleItem.time += scheduleItem.intervalTime;
                }
            }
            else if (scheduleItem.isLoop) {
                scheduleItem.task.apply(scheduleItem, scheduleItem.args);
            }
        }
    }
}

function removeSchedule(id) {
    delete schedules[id];
}

function pauseSchedule(id) {
    var scheduleItem = schedules[id];
    scheduleItem.paused = true;
}

function resumeSchedule(id) {
    var scheduleItem = schedules[id];
    scheduleItem.paused = false;
}

function hasSchedule(id) {
    return !!schedules[id];
}

function scheduleLoop(task, args) {
    var scheduleId = genId();
    schedules[scheduleId] = {
        task : task,
        args : args,
        isLoop : true
    };
    return scheduleId;
}

function scheduleTime(task, time, args) {
    var scheduleId = genId();
    time = time || 0;
    schedules[scheduleId] = {
        task : task,
        time : time,
        args : args,
        isTime : true
    };
    return scheduleId;
}

function scheduleInterval(task, time, args) {
    var scheduleId = genId();
    time = time || 0;
    schedules[scheduleId] = {
        task : task,
        time : time,
        args : args,
        isInterval : true
    };
    return scheduleId;
}

function scheduleFrame(task, frame, args) {
    var scheduleId = genId();
    frame = frame || 0;
    schedules[scheduleId] = {
        task : task,
        frame : frame,
        args : args,
        isFrame : true
    };
    return scheduleId
}

module.exports = {
    remove: removeSchedule,
    removeSchedule: removeSchedule,
    pauseSchedule: pauseSchedule,
    pause: pauseSchedule,
    resumeSchedule: resumeSchedule,
    resume: resumeSchedule,
    hasSchedule: hasSchedule,
    has: hasSchedule,
    scheduleFrame: scheduleFrame,
    frame: scheduleFrame,
    scheduleTime: scheduleTime,
    time: scheduleTime,
    scheduleInterval: scheduleInterval,
    interval: scheduleInterval,
    scheduleLoop: scheduleLoop,
    loop: scheduleLoop,
    runSchedule: runSchedule
}
