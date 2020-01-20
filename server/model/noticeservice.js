const transactions = require('../database/trans/transactions'); 

class NoticeService {
    constructor() {
        this.condo_name = '';	
    }

    // one notice operation
    //INSERT 
    async insertNewNotice( condo, text, start, end, imgId){
       
        try{
            const result = await transactions.insertNotice(condo, text, start, end, imgId);
            //console.log(result);
            
            if(result > 0) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: result, message: "Success" };
            } else { 
                //console.log('No id found!');
                return { data: 0, message: 'No id found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }

    }
    //UPDATE
    updateNoticeById(){

    }
    //DELETE
    deleteNoticeById(){

    }
    //////////////////////////////////////////////////
    //group notices operation
    //////////////////////////////////////////////////
    //GET 
    async getNoticesByCondoCode(CondoCode){
        try{
            const results = await transactions.getAllNoticesByCondo(CondoCode);
            console.log(results);
            if(JSON.stringify(results).length > 2) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: results, message: "Success" };
            } else { 
                //console.log('No notices found!');
                return { data: 0, message: 'No notices found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
    }

    async getNoticesByCondoName(CondoName){
        try{
            const results = await transactions.getAllNoticesByCondoName(CondoName);
            console.log(results);
            if(JSON.stringify(results).length > 2) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: results, message: "Success" };
            } else { 
                //console.log('No notices found!');
                return { data: 0, message: 'No notices found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
    }

    getNoticesByStartDate(CondoName){
        
    }

    getNoticesByEndDate(CondoName){
        
    }

    getCurrentNotices(CondoName){
        
    }

    getFutureNotice(CondoName){

    }

    getNoticesByActiveStatus(CondoName){
        
    }

    async getAllIcons(){
        try{
            const results = await transactions.getAllNoticesIcons();
            console.log(results);
            if(JSON.stringify(results).length > 2) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: results, message: "Success" };
            } else { 
                //console.log('No notices found!');
                return { data: 0, message: 'No notices found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
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

module.exports = new NoticeService(); 