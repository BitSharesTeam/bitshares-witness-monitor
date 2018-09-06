const moment = require('moment');

class FeedStat {
    constructor(name, my_publication_time, my_price, average_price) {
        this.name = name;
        this.publication_time = my_publication_time;
        this._price = my_price;
        this._average_price = average_price;
    }

    since() {
        return moment.duration(moment.utc().diff(moment.utc(this.publication_time)));
    }

    spread() {
        return ((this._price / this._average_price) - 1) * 100;
    }

    toString() {
        if (this.publication_time == null || moment.utc(this.publication_time).isBefore('2013-01-01')) {
            return `${this.name} not published yet.`
        }

        return `${this.name} published at ${this.publication_time} UTC (${this.since().humanize()} ago) with spread ${this.spread().toFixed(2)}%`
    }
}

module.exports = FeedStat;