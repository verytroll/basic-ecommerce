
// {name: "", func: [null, ...]}
let events = [null];

function getEvent(eventName) {
    let result = null;
    for(let i = 1; i < events.length; ++i) {
        if(events[i].name === eventName) {
            result = events[i];
            break;
        }
    }
    return(result);
}

export default {
    $on(eventName, func) {
        let event = getEvent(eventName);
        if(event) {event.func.push(func);}
        else {events.push({name: eventName, func: [null, func]})}
    },
    $off(eventName, func) {
        let event = getEvent(eventName);
        if(event) {
            let funcIndex = 0;
            for(let i = 1; i < event.func.length; ++i) {
                if(event.func[i] === func) {
                    funcIndex = i;
                    break;
                }
            }
            if(funcIndex) {event.func.splice(funcIndex, 1);}
        }
    },
    $emit(eventName, data) {
        let event = getEvent(eventName);
        if(event) {
            for(let i = 1; i < event.func.length; ++i) {
                event.func[i](data);
            }
        }
    }
}