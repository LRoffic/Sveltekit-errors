import { Logger } from "tslog";

let log = new Logger({ type: "pretty",name: "Store" });

let l = (data) => log.info(data);

let silly   = (data) => log.silly(data);
let trace   = (data) => log.trace(data);
let debug   = (data) => log.debug(data);
let info    = (data) => log.info(data);
let warn    = (data) => log.warn(data);
let error   = (data) => log.error(data);
let fatal   = (data) => log.fatal(data);

export {
	log,
	l,
    silly,
    trace,
    debug,
    info,
	warn,
    error,
    fatal,
}