// STOPWATCH CLASS
class StopWatch extends React.Component {
    constructor(props){
        super (props);
        this.state = {
            running: false,
            times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
            },
        }
    }
    
    // RESET METHOD
    reset() {
        this.setState ({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }
 
    // FORMAT METHOD
    format(times) {
        return `${pad0(this.state.times.minutes)}:${pad0(this.state.times.seconds)}:${pad0(Math.floor(this.state.times.miliseconds))}`;
    }
    
    // START METHOD
    start() {
        if (!this.state.running) {
            this.setState({
                running: true
            });
            this.watch = setInterval(() => this.step(), 10);
        }
    }
    
    // STEP METHOD
    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    // CALCULATE METHOD
    calculate() {
        this.state.times.miliseconds += 1;
        if (this.state.times.miliseconds >= 100) {
            this.state.times.seconds += 1;
            this.state.times.miliseconds = 0;
        }
        if (this.state.times.seconds >= 60) {
            this.state.times.minutes += 1;
            this.state.times.seconds = 0;
        }
        this.setSate({
            times: this.state.times
        });
    }
    
    // STOP METHOD
    stop() {
    this.state.running = false;
    clearInterval(this.watch);
    }
    
    // RENDERING 
    render() {
        return (
            <div className={'App'}>
                <nav className={'controls'}>
                    <a href={'#'} className={'button'} id={'start'} onClick={() => this.start()}>Start</a>
                    <a href={'#'} className={'button'} id={'stop'} onClick={() => this.stop()}>Stop</a>
                </nav>
                <div className={'watch'}>
                    <p className={'stopwatch'}>
                        {this.format(this.state.times)}
                    </p>
                </div>
                <ul className={'results'}></ul>
            </div>
        );
    }
}

// FUNCTION WHICH ADDS "0" TO RESULT 
function pad0(value){
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var element = React.createElement(StopWatch);
ReactDOM.render(element, document.getElementById('App'));