enum PromiseState {
    Pending,
    Resolved,
    Failed
}

export class Promise<T> {

    private state = PromiseState.Pending;
    private onFullfilled: {(T): any}[] = [];
    private onRejected: {(T): any}[] = [];
    private result: T;
    
    then (resolve: (T) => any, reject: (T) => any): Promise {
        if (resolve) {
            this.onFullfilled.push(resolve);
        }
        if (reject) {
            this.onRejected.push(reject);
        }
        return this;
    }
    
    done (cb: (T) => any): Promise {
        switch (this.state) {
            case PromiseState.Resolved:
                cb(this.result);
                break;
            case PromiseState.Pending:
                this.then(cb, null);
                break;
            default:
                break;
        }
        return this;
    }
    
    fail (cb: (T) => any): Promise {
        switch (this.state) {
            case PromiseState.Failed:
                cb(this.result);
                break;
            case PromiseState.Pending:
                this.then(null, cb);
                break;
            default:
                break;
        }
        return this;
    }
    
    resolve (result: T) {
        this.result = result;
        this.onFullfilled.forEach(cb => {
            cb(this.result);
        });
    }
    
    reject (result: T) {
        this.onRejected.forEach(cb => {
            cb(this.result);
        });
    }
}
