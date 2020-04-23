const express = require('express');
const router = express.Router();
const session = require('express-session');
const DAL = require('../../model/DataAccessLogic');

module.exports = () => {
    router.get('/', async (req, res, next) => {
    
	if (req.session.loggedIn) {
        const userName = req.session.userName;
        console.log(userName+' in dashboard');
        var result = '';
            try{
                result = await DAL.getallNoticesByCondoName(userName);
    
                if(result.data != 0) {
                    console.log(':)\n------- Populating Results - Notices!-------'); 
                    console.log(result.data);
                    console.log("----------- End result ------------");
                } else { 
                        console.log(result.message); 
                }
            }catch(e){
                console.log(e + 'Not able to query the database');
            }
		return res.render('dashboard', {
            title: 'Welcome to dashboard',
            msg:'Welcome back, ' + userName + '!' ,
            data: result.data
            });
	} else {
		return res.redirect('/login');  
	}
	res.end();
    });

    router.post('/add', async (req, res, next) => {

        const userName = req.session.userName
        if (!userName) return res.redirect('/login');  

        // const userName = req.body.userName;
        const noticeText = req.body.text;
        const noticeStart = req.body.start + ":00"; //for full time format in db
        const noticeEnd = req.body.end + ":00";
        const noticeImgId = req.body.imgId;
        // const noticeImgSrc = req.body.imgSrc;
        console.log('----- Inserting notice into DB -----');
        console.log("User = " + userName);
        console.log("noticeText = " + noticeText);
        console.log("noticeStart = " + noticeStart);
        console.log("noticeEnd = " + noticeEnd);
        console.log("noticeImgId = " + noticeImgId);
        // console.log(" noticeImgSrc = "+ noticeImgSrc);
        console.log('------------ Adding Notice -------------');

        if (!(userName && noticeText && noticeStart && noticeEnd && noticeImgId)) { //something was missed
            return res.status(501).json({
                message: 'Not able to add notice with missed data'
            });
        }
        
        var result = '';
        
        try{
            result = await DAL.insertNotice(userName, noticeText, noticeStart, noticeEnd, noticeImgId);

            if(result.data > 0) {
                console.log('Result is not empty. Insert done! id:' + result.data + '\n----------------------------------------'); 
                //result.data store a new index of the notice
                                
                return res.json(
                    {
                    userName: userName,
                    text: noticeText,
                    start: noticeStart,
                    end: noticeEnd,
                    noticeId: result.data
                });
            } else {  
                console.log(result.message); 
                return res.status(501).json({
                    message: 'Could not add new notice'
                });
            }
        }catch(e){
            console.log(e + 'Not able to query the database');
            return res.status(501).json({
                message: 'Could not add new notice'
            });
        }

        // res.end();
    });

    router.post('/edit', async (req, res, next) => {

        if (req.session.loggedIn) {
            const noticeId = req.body.noticeId;
            const noticeText = req.body.text;
            const noticeStart = req.body.start + ":00"; //for full time format in db
            const noticeEnd = req.body.end + ":00";
            const noticeImgId = req.body.imgId;
            if (noticeId && noticeText && noticeStart && noticeEnd && noticeImgId) {
                console.log('------------ Editing Notice ----------\nuser '+ req.session.userName +' is updating notice id:'+ noticeId);
                try{
                    var result = await DAL.updateNotice(noticeId, noticeText, noticeStart, noticeEnd, noticeImgId);
        
                    if(result.data > 0) {
                        console.log('Result is not empty. Update done! ' + result.data+'\n----------------------------------------'); 
                        return res.json(
                            {
                                text: req.body.text,
                                start: req.body.start,
                                end: req.body.end,
                                noticeId: req.body.noticeId,
                                ImgId: noticeImgId
                        });
                        //res.send(result);
                    } else {  
                            console.log(result.message); 
                    }
                }catch(e){
                    console.log(e + 'Not able to query the database');
                }
            }	
            else{ // condo code == null
                console.log('Input data are missed!');
            }
            
        } else {
            return res.redirect('/login');  
        }
        res.end();
    });

    router.delete('/delete', async (req, res, next) => {
        // console.log(req.session.loggedIn);
        if (req.session.loggedIn) {
            const noticeId = req.body.noticeId;  
            console.log('----- Deleting notice from DB -----');
            console.log('Id: ' + noticeId);       
            try{
                var result = await DAL.deleteNoticeById(noticeId);
    
                if(result.data > 0) {
                    console.log('Result is not empty. Deleted ' + result.data + ' row! '+ noticeId+'\n----------------------------------------'); 
                    return res.json(
                        {
                            noticeId: noticeId
                        });    
                } else {  
                        console.log(result.message); 
                }
            }catch(e){
                console.log(e + 'Not able to query the database');
            }

        } else {
            return res.redirect('/login');  
        }
        res.end();
    });

return router;
};
