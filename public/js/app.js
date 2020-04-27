/* Toggle full-screen*/
const elem = document.documentElement;
const openFullscreen = () => {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}
const closeFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
const noticeTemplate = (id, title, text, start, end, srcImg) => {
    //Create new .notice-item div
    // alert('constructing new noticeItem');
    const noticeItem = $('<div>').attr({
        class: 'notice-item',
        id: id
    });
    //Create new .image div
    const image = $('<div>').attr({
        class: 'image'
    });
    const noticeImg = $('<img>').attr({
        src: `${srcImg}`,
        onError:`this.onerror=null;this.src='/images/Notice.png';`
    });
    //Append the the <img> to the .image div
    image.html(noticeImg);
    noticeItem.append(image);
    // Create new .notice-content
    // create notice-title and notice-text
    const noticeContent = $('<div>').attr({
        class: 'notice-content'
    });
    const noticeTitle = $('<div>').attr({
        class: 'notice-title'
    });
    const innerTitle = $('<p>').html(title);
    noticeTitle.html(innerTitle);
    const noticeText = $('<div>').attr({
        class: 'notice-text'
    });
    const innerText = $('<p>').html(text);
    noticeText.html(innerText);
    // and append both to notice-content
    noticeContent.append(noticeTitle);
    noticeContent.append(noticeText);
    
    // Create .notice-dates div
    const noticeDates = $('<div>').attr({
        class: 'notice-dates'
    });
    // //Start date
    const noticeStart = $('<p>').attr({
        class: 'noticestart'
    });
    const startDate  = $('<span>').html(start);
    noticeStart.html(startDate);
    noticeDates.append(noticeStart);

    // end date
    const noticeEnd = $('<p>').attr({
        class: 'noticeend'
    });
    const endDate = $('<span>').html(end);
    noticeEnd.html(endDate);
    noticeDates.append(noticeEnd);
    noticeContent.append(noticeDates);
    noticeItem.append(noticeContent);
    return noticeItem;
}
const displayNewNotice = (notice) => {
    //const name = notice.condoName;
    const id = notice.noticeId;
    const title = notice.title;
    const text = notice.text;
    const start = notice.start;
    const end = notice.end;
    const srcImg = notice.imgSrc;
    const newNotice = noticeTemplate(id, title, text, start, end, srcImg);
    $('.notices-list').prepend(newNotice);
    // alert('created new notice');
    emptyValues();
    //disable the submit button
    $('#data_submit').attr('disabled', true);
    return;
}
const displayEditNotice = (notice) => { 
    //alert('displayEditNotice func '+ JSON.stringify(notice));
    const id = notice.noticeId;
    const title = notice.title;
    const text = notice.text;
    var start = notice.start; //time from db in format YYYY-MM-DD hh:mm:ss, we need hh:mm only
    var arr = start.split(":");
    start = arr[0] + ":" + arr[1]; //just hh:mm
    var end = notice.end;
    arr = end.split(":");
    end = arr[0] + ":" + arr[1]; //just hh:mm
    const imgId = notice.imgId;
    //put data into notice-item by id
    $(`.notice-item[id=${id}] .image img`).attr("src", imgId);
    $(`.notice-item[id=${id}] .notice-content .notice-title p`).html(title);
    $(`.notice-item[id=${id}] .notice-content .notice-text p`).html(text);
    $(`.notice-item[id=${id}] .noticestart span`).text(start);
    $(`.notice-item[id=${id}] .noticeend span`).text(end);
    emptyValues();
    cancelBtn();
    return;
}
const addCondoFail = (response) => {
    alert('Failed to Add Notice');
    return;
}
const cancelBtn = () => {
    emptyValues();
    $('#editBtn').addClass('hide');
    $('#delBtn').addClass('hide');
    $('#data_submit').removeClass('hide');
    $('.notice-item').removeClass('selected-item');
}
const emptyValues = () => {
    $('input').val('');
    $('textarea').val('');
}
const checkMinFormat = (noticeMin) => {
    var res = noticeMin.split(":");
    const n = res[1].length;
    if(n == 0){ return (noticeMin + ":00"); }
    else if(n == 1){ return (res[0] + ":" + res[1] + "0"); } 
    else if(n > 2){ return (res[0] + ":" + res[1].substr(0, 2)); }  
    return noticeMin;
}
const editNoticeFailed = () => {
    alert('Fail editing notice');
    return;
}
const removeNoticeOnDelete = (notice) => {
    const id = notice.noticeId;
    $(`.notice-item[id=${id}]`).remove();
    cancelBtn();
    return;
}
const removeNoticeFailed = () => {
    alert('Fail deleting notice');
    return;
}
const markActive = () => {
    /*
    $('.content-notice__list .noticestart p').each((index, value) => {
        //alert( $(this).closest('.content .content-notice__list').find('.noticestart').text().replace("Start:", "").trim());
        alert( $(value).text().replace("Start:", "").trim() );
    });
     */
    $('.content-notice__list ').each((index, value) => {
        //alert( $(this).closest('.content .content-notice__list').find('.noticestart').text().replace("Start:", "").trim());
        alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
    });   
}
const isBlank = (str) => {
    return (!str || /^\s*$/.test(str));
}
const fillValues = (noticeId,noticeTitle,noticeText,start,end) => {
    $('.form-group input[name ="noticeId"]').val(noticeId);
    $('.form-group input[name="title"]').val(noticeTitle);
    $('.form-group textarea[name="text"]').val(noticeText);
    $('.form-group input[name="start"]').val(start);
    $('.form-group input[name="end"]').val(end);
}
//add new notice
$('button[type=submit]').on('click', function(event){
    const name = $(this).attr('name'); //disabled="true"
    if(name == "addNotice"){
        event.preventDefault();// prevent the Browser from refreshing
        const userName = $('input[name ="userName"]').val().trim();
        const noticeTitle = $('input[name="title"]').val().trim();
        const noticeText = $('textarea[name="text"]').val().trim();
        const noticeStart = $('input[name="start"]').val().trim();
        const noticeEnd = $('input[name="end"]').val().trim();
        if(isBlank(noticeTitle) || isBlank(noticeText) || isBlank(noticeStart) || isBlank(noticeEnd)){
            alert( 'Error! Empty field/s !');
            return;
        }
        if(Date.parse(noticeStart) > Date.parse(noticeEnd) || Date.parse(noticeStart) == Date.parse(noticeEnd)) {
            alert( 'Error: Start Date Greater End Date or equal!!');
            return;
        }
        // alert("dates ok");
        // var arr = $('.iconlist > *');
        // var pId = 1;
        // var psrc = null;
        // for (var i = 0; i < arr.length; i++) {
        //     if(arr.eq(i).attr('style').includes("inline")){
        //         psrc = arr.eq(i).find('img').attr('src');
        //         var atr = arr.eq(i).find('img').attr('id');
        //         pId = atr.replace(/[^0-9\.]+/g, ""); //regex would replace everything except numerics               
        //         break;
        //     }
        // }
        const noticeImgId = 4; //pId; db id value  
        const noticeImgSrc = "Notice.png" ;//psrc; psrc img name
        // console.log('posting ' + noticeTitle);
        // disable pressing the enter key !!!works only once
        // $(document).keypress(
        //     function(event){
        //       if (event.which == '13') {
        //         event.preventDefault();
        //       }
        //   });
        $.ajax({
            url: 'http://localhost:3000/dashboard/add',
            //url: '/add',
            method: 'POST',
            data: {
                user: userName,
                title:noticeTitle,
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                imgId: noticeImgId,
                imgSrc: noticeImgSrc,
                noticeId: 0
            }
        })
        .then(displayNewNotice)
        .fail(addCondoFail);
    }
});
// When a user selects on one of the notice items
$('.notices-list').on('click', '.notice-item', function() {
    // removes .selected-item and adds it to newly selected item
    $('.notice-item').removeClass('selected-item');
    $(this).closest('.notice-item').addClass('selected-item');
    //switch form btns
    $('#data_submit').addClass('hide');
    $('#editBtn').removeClass('hide');
    $('#delBtn').removeClass('hide');
    //Populate form
    const noticeId = $(this).closest('.notice-item').attr('id');
    const noticeTitle = $(this).closest('.notice-item').find('.notice-content .notice-title').text().trim();
    const noticeText = $(this).closest('.notice-item').find('.notice-content .notice-text').text().trim();
    const start = $(this).closest('.notice-item').find('.notice-content .notice-dates .noticestart').text().trim();
    const end = $(this).closest('.notice-item').find('.notice-content .notice-dates .noticeend').text().trim();
     // save notice id in hidden field
    fillValues(noticeId,noticeTitle,noticeText,start,end);
        //To edit a notice, you must click on one of the notice items
});
// Action buttons Save / Cancel / Delete
$('button[type=button]').on('click', function(event){ 
    const name = $(this).attr('name');
    // $('.content-notice button').prop('disabled', false);
    if(name == "cancelEdit"){   //if Cancel -> hide Save/Cancel buttons and show Add button, clear notise and date inputs
        cancelBtn();
        return;
    }
    else if(name == "updateNotice"){ //name == "edit ", read values from notice, start and end inputs 
        // alert('edit btn');
        const noticeId = $('input[name ="noticeId"]').val().trim();
        const noticeTitle = $('.form-group input[name="title"]').val().trim();
        const noticeText = $('.form-group textarea[name="text"]').val().trim();
        var noticeStart = $('.form-group input[name="start"]').val().trim();
        var noticeEnd = $('.form-group input[name="end"]').val().trim();
        // alert('Before: ' + noticeStart + '|' + noticeEnd + '|' + noticeId);
        noticeStart = checkMinFormat(noticeStart); //formate time: minutes may be not in mm format
        noticeEnd = checkMinFormat(noticeEnd);
        if (Date.parse(noticeStart) > Date.parse(noticeEnd) || Date.parse(noticeStart) == Date.parse(noticeEnd)) {
            alert( 'Error: Start Date Greater End Date!!');
            return;
        }
        //var iconId = getDisplayedIconId();
        //alert(iconId);
        // alert('Updating Item with === After: ' + noticeStart + ' | ' + noticeEnd + ' | ' + noticeId);
        $.ajax({
            url: 'http://localhost:3000/dashboard/edit',
            method: 'POST',
            data: {
                title:noticeTitle,
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                noticeId: noticeId,
                imgId: 4 // for now we use dummy notice
                // icon: iconId - for when we create img feature.
            }
        }).then(displayEditNotice)
        // .fail(err=>{console.log(err)});
        .fail(editNoticeFailed);
    } else if(name == 'delete'){// Delete button pressed, send delete to midleware by id of record
        const noticeId = $('input[name="noticeId"]').val().trim();
        const answer = confirm('Are you sure you want to DELETE '+ noticeId);
        if (answer == true) {
            $.ajax({
                url: 'http://localhost:3000/dashboard/delete',
                method: 'DELETE',
                data: {
                    noticeId: noticeId
                    }
                })
                .then(removeNoticeOnDelete)
                .fail(removeNoticeFailed);

        } else {
            cancelBtn();
            return;
        }
    } else {
        return;
    } 
});
//datapicker
$('input[type=text]').on('click', function(event){
    const name = $(this).attr('name');
    const id = $(this).attr('id');
    if(name == "start" || name == "end"){
        //$('#date_pickerStart').datetimepicker({
        $(this).datetimepicker({
            ownerDocument: document,
            contentWindow: window,
            value: '',
            rtl: false,
            //format: 'Y/m/d H:i',
            format: 'Y-m-d H:i',
            formatTime: 'H:i',
            //formatDate: 'Y/m/d',
            formatDate: 'Y-m-d',
            startDate: false,
            step: 15,
            monthChangeSpinner: true,
            closeOnDateSelect: false,
            closeOnTimeSelect: true,
            closeOnWithoutClick: true,
            closeOnInputClick: true,
            openOnFocus: true,
            timepicker: true,
            datepicker: true,
            weeks: false,
            defaultTime: false,
            defaultDate: false,
            minDate: false,
            maxDate: false,
            minTime: false,
            maxTime: false,
            minDateTime: false,
            maxDateTime: false,
            allowTimes: [],
            opened: false,
            initTime: true,
            inline: false,
            theme: '',
            touchMovedThreshold: 5,
            //autoclose: true,
            onSelectDate: function () { },
            onSelectTime: function () { },
            onChangeMonth: function () { },
            onGetWeekOfYear: function () { },
            onChangeYear: function () { },
            onChangeDateTime: function (dp,$input) { },
            onShow: function () { },
            onClose: function () {  },
            onGenerate: function () {},
            withoutCopyright: true,
            inverseButton: false,
            hours12: false,
            next: 'xdsoft_next',
            prev: 'xdsoft_prev',
            dayOfWeekStart: 0,
            parentID: 'body',
            timeHeightInTimePicker: 25
        });   
    }
});
//change icon image on click
$('.iconlist ').on('click', function() {
    //var arr = $(this).closest('.addform-group .form-group .iconlist').siblings('.pic');
    var arr = $('.iconlist > *');
       
    for (var i = 0; i < arr.length; i++) {
        //alert('Display of #' + i + ': ' + arr.eq(i).attr('style'));
        if(arr.eq(i).attr('style').includes("inline")){
            arr.eq(i).css('display','none'); 

            i = (i == arr.length - 1) ? 0 : i+1;
            arr.eq(i).css('display','inline');
            //var atr = arr.eq(i).find('img').attr('id');
            //var pId = atr.replace(/[^0-9\.]+/g, ""); //regex would replace everything except numerics
            //alert(pId);                
            break;
        }
    }
    
});
// const showEditIcon = (srcStr) => {
//     var arr = $('.form-group .iconlist > *');
   
//     for (var i = 0; i < arr.length; i++) {
//         var atr = arr.eq(i).find('img').attr('src');
//         if(arr.eq(i).attr('style').includes("inline") && srcStr != atr)
//             arr.eq(i).css('display','none'); 

//         if(srcStr == atr) arr.eq(i).css('display','inline');
//     }
// };
const getDisplayedIconId = ()=>{
    var arr = $('.form-group .iconlist > *');
    var pId = 1;
    for (let i = 0; i < arr.length; i++) {
        if(arr.eq(i).attr('style').includes("inline") ){
            let atr = arr.eq(i).find('img').attr('id');
            pId = atr.replace(/[^0-9\.]+/g, ""); //regex would replace everything except numerics
            break;
        }
    }
    return pId;
};
const getIconSrcById = (iconId)=>{
    var src = "/images/Notice.png";
    var arr = $('.form-group .iconlist > *');
    for (let i = 0; i < arr.length; i++) {
        let atr = arr.eq(i).find('img').attr('id');
        let pId = atr.replace(/[^0-9\.]+/g, "");
        if(iconId == pId){
            src = arr.eq(i).find('img').attr('src');
            break;
        }
    }
    return src;
};
$('select.noticetypeselect').on('change', function() {
    var selectedValue = $(this).children("option:selected").val();
    var now = new Date().getTime();
    //alert(selectedValue);
    if(selectedValue == 1){
         $('.notice-item').each((index, value) => {
            $('.notice-item').css('display','block');
        }); 
    }         
    else if(selectedValue == 2){ 
        
        $('.notice-item').each((index, value) => {
            //alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
            var noticeStart = Date.parse($(value).find('.noticestart p').text().replace("Start:", "").trim());
            var noticeEnd = Date.parse($(value).find('.noticeend p').text().replace("End:", "").trim());
            
            if ( noticeStart < now && noticeEnd > now) {
                //alert("Active! " + "Start: " + noticeStart + " End: " + noticeEnd + " now: " + now);
                $(value).attr('style','display: block');
            } else {
                //alert("NOT Active! " + "Start: " + noticeStart + " End: " + noticeEnd + " now: " + now);
                $(value).attr('style','display: none');
            }
        }); 
    //event.preventDefault();
    } else if(selectedValue == 3){ 
            //alert("Future!");
            $('.notice-item').each((index, value) => {
                //alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
                var noticeStart = Date.parse($(value).find('.noticestart p').text().replace("Start:", "").trim());
                if ( noticeStart > now) {
                    $(value).attr('style','display: block');
                } else {
                    $(value).attr('style','display: none');
                }                    
            });
        } else if(selectedValue == 4){ 
            //alert("Both!");
            $('.notice-item').each((index, value) => {
                //alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
                var noticeEnd = Date.parse($(value).find('.noticeend p').text().replace("End:", "").trim());
                if ( noticeEnd > now) {
                    $(value).attr('style','display: block');
                } else {
                    $(value).attr('style','display: none');
                }   
            });
        }
});
$(document).ready(function() {
    $('input[name="text"]').on("propertychange change keyup paste input", function () {
        if ($(this).val() == '') {
            //Check to see if there is any text entered
            // If there is no text within the input then disable the button
            $('#data_submit').prop('disabled', true);
            // $('#data_preview').prop('disabled', true);
        } else {
            let noticeStart = $('input[name="start"]').val().trim();
            let noticeEnd = $('input[name="end"]').val().trim();
            
            if(noticeEnd != "" &&  noticeStart != ""){
                $("#data_submit").attr("disabled", false);
                // $('#data_preview').prop('disabled', false); DOES NOT EXIST YET
            }
        }
    });
    $("#date_pickerStart").on("propertychange change keyup paste input", function(){
        if ($(this).val() == '') {
            //Check to see if there is any text entered
            // If there is no text within the input then disable the button
            $('#data_submit').prop('disabled', true);
            $('#data_preview').prop('disabled', true);
        } else {
            let noticeTitle = $('input[name="title"]').val().trim();
            //let noticeStart = $('input[name="start"]').val().trim();
            let noticeEnd = $('input[name="end"]').val().trim();
            if(noticeEnd != "" &&  noticeTitle != "")
            {
                $("#data_submit").attr("disabled", false);
                $('#data_preview').prop('disabled', false);
            }
        }
    });
    $("#date_pickerEnd").on("propertychange change keyup paste input", function(){
        if ($(this).val() == '') {
            //Check to see if there is any text entered
            // If there is no text within the input then disable the button
            $('#data_submit').prop('disabled', true);
            $('#data_preview').prop('disabled', true);
        } else {
            let noticeTitle = $('input[name="title"]').val().trim();
            let noticeStart = $('input[name="start"]').val().trim();
            //let noticeEnd = $('input[name="end"]').val().trim();
            
            if(noticeStart != "" &&  noticeTitle != "")
            {
                $("#data_submit").attr("disabled", false);
                $('#data_preview').prop('disabled', false);
            }
        }
    });
});
// $(document).ready(function() {
//     //$('#editor').val('Text');
//     var toolbarOptions = [
//         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//         ['blockquote', 'code-block'],
      
//         [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//         [{ 'direction': 'rtl' }],                         // text direction
      
//         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         ['image'],
//         ['link'],
      
//         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//         [{ 'font': [] }],
//         [{ 'align': [] }],
      
//         ['clean']                                         // remove formatting button
//       ];
      
//       var quill = new Quill('#editor', {
//         modules: {
//           toolbar: toolbarOptions
//         },
//         theme: 'snow'
//       });
// });


