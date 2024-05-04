import { sql } from './api';
import { format,subMonths } from 'date-fns';
/**
 * get all doc count
 * @returns 
 */
export async function getDocCountAll() {
	var sqlStr = 'select * from blocks where type = "d"';
	const res = await sql(sqlStr);
	return res;
}
/**
 * get doc count by box id.
 * @param boxId 笔记本ID
 * @returns 
 */
export async function getDocCountByBoxId(boxId: string) {
	var sqlStr = 'select * from blocks where type = "d" and box = "'+boxId+'" limit 999999999';
	const res = await sql(sqlStr);
	return res;
}

/**
 * get last month created doc count
 * @returns 
 */
export async function getDocCountLastMonthCreated(){
	const now = new Date();
	const lastMonth = subMonths(now, 1);
	const lastMonthStart = format(lastMonth, 'yyyyMM');
	const currentMonthStart = format(now, 'yyyyMM');
	console.log("docCountLastMonth > lastMonthStart: "+lastMonthStart+", currentMonthStart: "+currentMonthStart);
	var sqlStr = 'select * from blocks b where b.type = "d" and b.created >= "'+lastMonthStart+'" and b.created < "'+currentMonthStart+'" limit 999999999';
	const res = await sql(sqlStr);
	return res;
}

/**
 * get last month created doc count
 * @returns 
 */
export async function getDocCountLastMonthUpdated(){
	const now = new Date();
	const lastMonth = subMonths(now, 1);
	const lastMonthStart = format(lastMonth, 'yyyyMM');
	const currentMonthStart = format(now, 'yyyyMM');
	console.log("docCountLastMonth > lastMonthStart: "+lastMonthStart+", currentMonthStart: "+currentMonthStart);
	var sqlStr = 'select * from blocks b where b.type = "d" and b.updated >= "'+lastMonthStart+'" and b.updated < "'+currentMonthStart+'" limit 999999999';
	const res = await sql(sqlStr);
	return res;
}