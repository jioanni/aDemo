const loadDynamicScript = (scriptSrc, scriptId, callback, errorCallback) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptSrc;
    script.id = scriptId;
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
    script.onerror = () => {
      if (errorCallback) errorCallback();
    };
  };
  
  const statuses = {
    EXECUTED: 'executed',
    NOTEXECUTED: 'not_executed',
    FAILED: 'failed',
  };
  
  const iovationName = 'iovation';
  
  class Alloy {
    constructor(options) {
      this.serviceStatus = {};
      this.data = {};
      this.readyCallback = options.readyCallback;
  
      if (options.services[iovationName]) {
        this.loadIovation();
      }
    }
  
    loadIovation() {
      this.serviceStatus[iovationName] = statuses.NOTEXECUTED;
      // iovation looks for this fn when blackbox is complete
      window.io_bb_callback = (bb, complete) => {
        if (complete) {
          this.data.iovation_blackbox = bb;
          this.markServiceExecuted(iovationName);
        }
      };
      const iovationProdUrl = 'https://mpsnare.iesnare.com/snare.js';
      loadDynamicScript(
        iovationProdUrl,
        iovationName,
        null,
        () => { this.markServiceFailure(iovationName); },
      );
    }
  
    markServiceExecuted(serviceName) {
      this.serviceStatus[serviceName] = statuses.EXECUTED;
  
      if (this.areAllServicesDone()) {
        if (this.readyCallback) {
          this.readyCallback(this.data, this.serviceStatus);
        }
      }
    }
  
    markServiceFailure(serviceName) {
      this.serviceStatus[serviceName] = statuses.FAILED;
      if (this.areAllServicesDone()) {
        if (this.readyCallback) {
          this.readyCallback(this.data, this.serviceStatus);
        }
      }
    }
  
    areAllServicesDone() {
      return Object.keys(this.serviceStatus).every(serviceKey =>
        this.serviceStatus[serviceKey] !== statuses.NOTEXECUTED);
    }
  }

  export default Alloy