const  transactions = require('../../database/trans/transactions'); 

export default class NoticeService {
    constructor() {
        this.condo_name = '';	
    }

    // one notice operation
    //INSERT 
    insertNewNotice( condo, text, start, end, imgId){
        var params = [condo, text, start, end, imgId];

    }
    //UPDATE
    updateNoticeById(){

    }
    //DELETE
    deleteNoticeById(){

    }

    //group notices operation
    //GET 
    getNoticesByCondoCode(){
        
    }
    getNoticesByCondoName(){
        
    }
    getNoticesByStartDate(){
        
    }
    getNoticesByActiveStatus(){
        
    }
    //INSERT
    insertNewNotices(){
        
    }
    //UPDATE
    updateNoticeByIds(){

    }
    //DELETE
    deleteNoticeByIds(){

    }
}