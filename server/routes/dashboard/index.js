const express = require('express');
const router = express.Router();
const session = require('express-session');
const DAL = require('../../model/DataAccessLogic');

module.exports = () => {
    router.get('/', async (req, res, next) => {

	if (req.session.loggedin) {
        const userName = req.session.username
        
        var result = '';
            try{
                result = await DAL.getallNoticesByCondoName(userName);
    
                if(result.data != 0) {
                    console.log('Result is not empty. There are notices!--------------------'); 
                    console.log(result.data);
                    console.log("End result------------------");
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

        const userName = req.session.username
        if (!userName) return res.redirect('/login');  

        const condoName = req.body.condoName;
        const noticeText = req.body.text;
        const noticeStart = req.body.start + ":00"; //for full time format in db
        const noticeEnd = req.body.end + ":00";
        const noticeImgId = req.body.imgId;

        console.log("condoName = " + condoName);
        console.log("noticeText = " + noticeText);
        console.log("noticeStart = " + noticeStart);
        console.log("noticeEnd = " + noticeEnd);
        console.log("noticeImgId = " + noticeImgId);

        if (!(condoName && noticeText && noticeStart && noticeEnd && noticeImgId)) { //something was missed
            return res.status(501).json({
                message: 'Not able to add notice with missed data'
            });
        }
        
        var result = '';
        
        try{
            result = await DAL.insertNotice(condoName, noticeText, noticeStart, noticeEnd, noticeImgId);

            if(result.data > 0) {
                console.log('Result is not empty. Insert done! ' + result.data); 
                //result.data store a new index of the notice
                                
                return res.json(
                    {
                    condoName: condoName,
                    text: noticeText,
                    start: noticeStart,
                    end: noticeEnd,
                    id: result.data
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

        res.end();
    });

return router;
};
