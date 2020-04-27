//const pool = require('../database/conn/Pool'); 
//import { Account } from 'model/account';
const ACC = require('./account');
//import { Result } from 'model/result';
const NS = require('./noticeservice');
//import { NoticeService as NS } from "./noticeservice";

class DataAccessLogic {
    constructor() {
    }
    
    async validateUser(userName, password) { 
        var res = await ACC.validateAccount(userName, password);
        // data validation
        return res;
    };

    async getallNotices(CondoCode){
        var res = await NS.getNoticesByCondoCode(CondoCode);
        // data validation
        return res;
    };

    async getallNoticesByUserName(UserName){
        var res = await NS.getNoticesByUserName(UserName);
        // data validation
        return res;
    };

    async getNoticeByID(id){
        var res = await NS.getNoticeByID(id);
        // data validation
        return res;
    };

    async getNoticeInFull(UserName){
        var res = await NS.getNoticesInFull(UserName);
        // data validation
        return res;
    };
    
    async getIconsList(){
        var res = await NS.getAllIcons();
        // data validation
        return res;
    };

    async insertNotice(userName, title, text, start, end, imgId){
        var res = await NS.insertNewNotice( userName, title, text, start, end, imgId);
        // data validation
        return res;
    };

    async insertNotices(records){
        var res = await NS.insertNotices( records);
        // data validation
        return res;
    };

    async updateNotice(noticeId, title, text, start, end, imgId){
        var res = await NS.updateNoticeById(noticeId, title, text, start, end, imgId);
        return res;
    };

    async deleteNoticeById(itemId){
        var res = await NS.deleteNoticeById(itemId);
        return res;
    };

    async deleteNoticesById(ids){
        var res = await NS.deleteNoticeById(ids);
        return res;
    };
}

module.exports = new DataAccessLogic(); 


