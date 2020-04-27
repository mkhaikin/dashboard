const transactions = require('../database/trans/transactions'); 

class NoticeService {
    constructor() {
        this.condo_name = '';	
    }

    // one notice operation
    //INSERT 
    async insertNewNotice( userName, title, text, start, end, imgId){
       
        try{
            const result = await transactions.insertNotice(userName, title, text, start, end, imgId);
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
    async updateNoticeById(id, text, start, end, imgId){
        try{
            const result = await transactions.updateNotice(id, text, start, end, imgId);
            if(result > 0) {
            //console.log('Success');
                return { data: result, message: "Updated" };
            } else { 
                //console.log('No id found!');
                return { data: 0, message: 'No one record to update found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }

    }
    //DELETE
    async deleteNoticeById(itemId){
        try{
            const result = await transactions.deleteNoticeByID(itemId);
            if(result > 0) {
                console.log('------------ Deleting Notice -----------');
                return { data: result, message: "Deleted" };
            } else { 
                //console.log('No id found!');
                return { data: 0, message: 'No one record to delete found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
    }
    //////////////////////////////////////////////////
    //group notices operation
    //////////////////////////////////////////////////
    //GET 
    async getNoticesByCondoCode(CondoCode){
        try{
            const results = await transactions.getAllNoticesByUser(CondoCode);
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

    async getNoticesByUserName(UserName){
        try{
            const results = await transactions.getAllNoticesByUserName(UserName);
            //console.log(results);
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

    async getNoticeByID(id){
        try{
            const result = await transactions.getNoticeByID(id);
            //console.log(result);
            if(JSON.stringify(result).length > 2) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: result, message: "Success" };
            } else { 
                //console.log('No notices found!');
                return { data: 0, message: 'No notices found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
    }

    getNoticesByStartDate(userName){
        
    }

    getNoticesByEndDate(userName){
        
    }

    getCurrentNotices(userName){
        
    }

    getFutureNotice(userName){

    }

    getNoticesByActiveStatus(userName){
        
    }

    async getNoticesInFull(userName){ //active status and current time
        try{
            const result = await transactions.getNoticesInFull(userName);
            //console.log(result);
            if(JSON.stringify(result).length > 2) { // '[]' means empty result, length == 2
                //console.log('Success');
                return { data: result, message: "Success" };
            } else { 
                //console.log('No notices found!');
                return { data: 0, message: 'No notices found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
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
    async insertNotices( records){
       
        try{
            const result = await transactions.insertNotices(records);
            console.log(result);

            if(result == records.length) { // '[]' means empty result, length == 2
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
    updateNoticesById(){

    }
    //DELETE
    async deleteNoticesById(ids){
        try{
            const result = await transactions.deleteNoticesByID(ids);
            if(result > 0) {
            //console.log('Success');
                return { data: result, message: "Deleted" };
            } else { 
                //console.log('No id found!');
                return { data: 0, message: 'No one record to delete found!' };                 
            }	
        }catch(err){
            console.log(err);
            return { data: 0, message: 'Status (501). Not able to query the database' };  
        }
    }
}

module.exports = new NoticeService(); 
//export class NoticeService {}