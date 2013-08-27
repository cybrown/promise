import Promise = module("promise");

function testPromise(): Promise.Promise<string> {
    var p = new Promise.Promise<string>();
    setTimeout(() => {
        p.resolve("ok");
    });
    return p;
}

testPromise()
    .done((a) => {
        console.log("done");
    })
    .fail((a) => {
        console.log("fail");
    });