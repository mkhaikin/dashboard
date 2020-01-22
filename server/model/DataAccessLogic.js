//const pool = require('../database/conn/Pool'); 
//import { Account } from 'model/account';
const ACC = require('./account');
//import { Result } from 'model/result';
const NS = require('./noticeservice');

class DataAccessLogic {
    constructor() {
    }
    
    async validateUser(username, password) {
            
            var res = await ACC.validateAccount(username, password);
        // data validation
            return res;
    };

    async getallNotices(CondoCode){
        var res = await NS.getNoticesByCondoCode(CondoCode);
        // data validation
        return res;
    };

    async getallNoticesByCondoName(CondoName){
        var res = await NS.getNoticesByCondoName(CondoName);
        // data validation
        return res;
    };

    async getNoticeByID(id){
        var res = await NS.getNoticeByID(id);
        // data validation
        return res;
    };
    
    async getIconsList(){
        var res = await NS.getAllIcons();
        // data validation
        return res;
    };

    async insertNotice(condo, text, start, end, imgId){
        var res = await NS.insertNewNotice( condo, text, start, end, imgId);
        // data validation
        return res;
    };

    async insertNotices(records){
        var res = await NS.insertNotices( records);
        // data validation
        return res;
    };

    async updateNotice(idNote, text, start, end, idIcon){
        var res = await NS.updateNoticeById(idNote, text, start, end, idIcon);
        return res;
    };

    async deleteNoticeById(idNote){
        var res = await NS.deleteNoticeById(idNote);
        return res;
    };

    async deleteNoticesById(ids){
        var res = await NS.deleteNoticeById(ids);
        return res;
    };
}

module.exports = new DataAccessLogic(); 


