import { sql } from './api';
import { WordCallback } from './word-callback';
import { Logger } from '../utils/mlog';
import { format } from 'date-fns';
/**
 * get word count all.
 * @param callback 
 */
export function getWordCountALl(callback: WordCallback) {
    getSQLWordCountAll().then(res => {
        calculateWordCount(res,callback);
    })
}
/**
 * get word count today.
 * @param callback 
 */
export function getWordCountToday(callback: WordCallback) {
    getSQLWordCountToday().then(res => {
        calculateWordCount(res,callback);
    })
}

function calculateWordCount(res: any[],callback: WordCallback) {
    var count = 0;
    res.forEach(item => {
        count += item.length;
    });
    Logger.debug('calculateWordCount > count:' + count);
    if (callback) {
        callback.onGetWordsSuccess(count);
    }
}

async function getSQLWordCountAll() {
    var sqlStr = 'select * from blocks where type = "p" limit 999999999';
    const res = await sql(sqlStr);
    return res;
}

async function getSQLWordCountToday() {
    const today = new Date();
    const todayStr = format(today, 'yyyyMMdd');
    var sqlStr = 'select * from blocks b where b.type = "p" and b.updated like "' + todayStr + '%" limit 999999999';
    Logger.debug('getSQLWordCountToday > sql:' + sqlStr);
    const res = await sql(sqlStr);
    return res;
}

async function getSQLWordCountByBoxId(boxId: string) {
	var sqlStr = 'select * from blocks where type = "p" and box = "' + boxId + '" limit 999999999';
	const res = await sql(sqlStr);
	return res;
}