class Queue {
    constructor(period) {
        this.period = period;
        this.queue = [];
        this.poller = null;
        this.blocked = false;
        document.addEventListener("Clear", () => {this.blocked = false});
    }

    enqueue(fn, context, args) {
        let event = () => {
            fn.apply(context, args);
        }
        this.queue.push(event);

        /* if not polling, start poller */
        if(this.poller === null) {
            this.dequeue(); // immediately attempt to execute function instead of first waiting this.period ms
            this.poller = setInterval(() => {
                this.dequeue();
            }, this.period);
        }
    }

    dequeue() {
        /* don't execute next command if something still running/executing */
        if(this.blocked === false) {
            /* if queue empty, stop polling */
            if(this.queue.length === 0 && this.poller) {
                clearInterval(this.poller);
                this.poller = null;
            }
            else if(this.queue.length > 0) {
                this.blocked = true; // let poller know command is executing
                const event = this.queue.shift();
                event();
            }
        }
    }
}

export default Queue;