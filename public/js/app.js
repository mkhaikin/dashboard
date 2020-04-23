/* Toggle full-screen*/
const elem = document.documentElement;

function openFullscreen() {
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

function closeFullscreen() {
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

$('div.notices-list').on('mouseenter', 'div.notice-item', function(){
    $(this).find('.actions').removeClass("hide");
});
$('div.notices-list').on('mouseleave', 'div.notice-item', function(){
    $(this).find('.actions').addClass("hide");
});

const noticeTemplate = (id, text, start, end, srcImg) => {
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
    
    //Create new .notice-content and append .notice-text
    const noticeContent = $('<div>').attr({
        class: 'notice-content'
    });
    const noticeText = $('<div>').attr({
        class: 'notice-text'
    });
    const title = $('<p>').html(text);
    noticeText.html(title);
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

    const actionBtns = $('<div>').attr({
        class: 'actions hide',
    });
    const buttonEdit = $('<button>').attr({
        type: 'button',
        'data-id': id,
        class: 'btn btn-success',
        name: 'edit',
    });
    const buttonDelete = $('<button>').attr({
        type: 'button',
        'data-id': id,
        class: 'btn btn-danger',
        name: 'delete',
        // style: 'visibility: hidden'
    }); 
    buttonEdit.html('Edit');
    buttonDelete.html('Del');
    actionBtns.append(buttonEdit);
    actionBtns.append(buttonDelete);
    noticeItem.append(actionBtns);
    return noticeItem;
};

const displayNewNotice = (notice)=> {
    //const name = notice.condoName;
    const id = notice.noticeId;
    const text = notice.text;
    const start = notice.start;
    const end = notice.end;
    const srcImg = notice.imgSrc;
    const newNotice = noticeTemplate(id, text, start, end, srcImg);
    $('.notices-list').prepend(newNotice);
    // alert('created new notice');
    $('input').val('');
    //disable the submit button
    $("#data_submit").attr("disabled", true);
};

const addCondoFail = (response) => {
    alert('Failed to Add Notice');
};

//add new notice
$('button[type=submit]').on('click', function(event){
    const name = $(this).attr('name'); //disabled="true"
    
    if(name == "addNotice"){
        event.preventDefault();// prevent the Browser from refreshing
        const userName = $('input[name ="userName"]').val().trim();
        const noticeText = $('input[name="text"]').val().trim();
        const noticeStart = $('input[name="start"]').val().trim();
        const noticeEnd = $('input[name="end"]').val().trim();

        if(isBlank(noticeText) || isBlank(noticeStart) || isBlank(noticeStart)){
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
        //     //   alert(pId);                
        //         break;
        //     }
        // }
        const noticeImgId = 4; //pId; db id value  
        // alert("img id is: ". noticeImgId);
        const noticeImgSrc = "Notice.png" ;//psrc; psrc img name
        // alert("img name is: ".noticeImgSrc);
        console.log('posting ' + noticeText);
        
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
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                imgId: noticeImgId,
                imgSrc: noticeImgSrc,
                noticeId: 0
            }
        })
        .then(displayNewNotice)
        .catch(addCondoFail);
    }
});

const showNoticeSuccess = (response) => {
    alert('Success to show active notices');
};
const showNoticeFail = (response) => {
    alert('Fail to show active notices');
};
// notice-item edit & del button
// $('.notice-item').mouseenter(function() {
//     $(this).find('.actions').removeClass("hide");
// }).mouseleave(function() {
//     $(this).find('.actions').addClass("hide");
// });

const cancelBtn = ()=>{
    $('.editbutton-group').css('display','none');
    $('.addbutton-group').css('display','inline');
    $('.form-group input[name="text"]').val("");
    $('.form-group input[name="start"]').val("");
    $('.form-group input[name="end"]').val("");
    $('.notice-item').removeClass('selected-item');
}

//edit notice in form
$('button[type= button]').on('click', function(event){ 
    const name = $(this).attr('name');
    // $('.content-notice button').prop('disabled', false);

    if(name == "cancelEdit"){   //if Cancel -> hide Save/Cancel buttons and show Add button, clear notise and date inputs
        cancelBtn();
    }
    else if(name == "updateNotice"){ //name == "edit ", read values from notice, start and end inputs 
        const noticeId = $('input[name ="noticeId"]').val().trim();
        const noticeText = $('.form-group input[name="text"]').val().trim();
        var noticeStart = $('.form-group input[name="start"]').val().trim();
        var noticeEnd = $('.form-group input[name="end"]').val().trim();
        //alert('Before: ' + noticeStart + '|' + noticeEnd + '|' + noticeId);

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
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                noticeId: noticeId,
                imgId: 4 // for now we use dummy notice
                // icon: iconId - for when we create img feature.
            }
        }).then(displayEditNotice)
          .catch(editNoticeFailed);
    // } else if(name == "ShowNotices"){
    //     var arr = $(".notice-item[style*='block' ] > * "); 
    //     var arID = [];
    //     arr.each(function() {
    //         var id = $( this).attr('id');
    //         arID.push(id);
    //     });
    //     //ajax send UPDATE status on 1 (active) with array of iDs and render to SHOW page
    //     if(arID.length == 0){
    //         alert('List of IDs is empty!');
    //         return;
    //     }    
    //     $.ajax({
    //         url: 'http://localhost:3000/dashboard/show',
    //         method: 'POST',
    //         data: { id: JSON.stringify(arID)
    //         }
    //     }).then(showNoticeSuccess)
    //     .catch(showNoticeFail);
    //    //.done(showNoticeSuccess)
    //    //.fail(showNoticeFail);
    //     /*
    //    $.ajax({
    //         url: 'http://localhost:3000/dashboard/preview',
    //         method: 'GET',
    //         data: { id: JSON.stringify(arID)
    //         }
    //     }).then(showNoticeSuccess)
    //     .catch(showNoticeFail);
    //     */
     }
    //   markActive();
});
const checkMinFormat = (noticeMin) => {
    //alert(noticeMin);
    var res = noticeMin.split(":");
    const n = res[1].length;
    if(n == 0){ return (noticeMin + ":00"); }
    else if(n == 1){ return (res[0] + ":" + res[1] + "0"); } 
    else if(n > 2){ return (res[0] + ":" + res[1].substr(0, 2)); }  
    return noticeMin;
}

const editNoticeFailed = () => {
    alert('Fail editing notice');
};

const displayEditNotice = (notice) => { 
    // alert('Success editing!'); 
    //alert('displayEditNotice func '+ JSON.stringify(notice));
    const id = notice.noticeId;
    const text = notice.text;
    var start = notice.start; //time from db in format YYYY-MM-DD hh:mm:ss, we need hh:mm only
    var arr = start.split(":");
    start = arr[0] + ":" + arr[1]; //just hh:mm
    var end = notice.end;
    arr = end.split(":");
    end = arr[0] + ":" + arr[1]; //just hh:mm
    const imgId = notice.imgId;
    // const newIconSrc = getIconSrcById(iconId);
    const newIconSrc = imgId;
    //alert(newIconSrc);
    $(`.notice-item[id=${id}] .image img`).attr("src", newIconSrc);
    //put data into proper place by id
    $(`.notice-item[id=${id}] .notice-content .notice-text p`).html(text);
    $(`.notice-item[id=${id}] .noticestart p`).text(start);
    $(`.notice-item[id=${id}] .noticeend p`).text(end);
    //alert('content changed id:'+ id+ ' '+ text + ' ' + start + ' ' + end );
    // $('.form-group input[name="text"]').val("");
    // $('.form-group input[name="start"]').val("");
    // $('.form-group input[name="end"]').val("");
    $('input').val('');
};

// edit/delete notice logic
$('.notices-list').on('click', 'button', function() {
    $('.notice-item').removeClass('selected-item');
    $(this).closest('.notice-item').addClass('selected-item');
    const id = $(this).closest('button').attr('data-id');
    const name = $(this).closest('button').attr('name');
    //in every notice record there are two buttons 
    if(name == "edit"){// edit button pressed
        //find add class .selected to selected item
        //hide add buttons and show edit, save id value
        $('.addbutton-group').css('display','none');        
        $('.editbutton-group').css('display','inline');
        $('.form-group input[name ="noticeId"]').val(id); // save notice id in hidden field
        $('.content-notice button').prop('disabled', true); //disable all Delete/Edit buttons until Save/Cancel pressed
       //read values from editing notice ///FIX LATER///
        // var iconsrc = $(this).closest('.content-notice .content-notice__list').find('img').attr('src');
        // showEditIcon(iconsrc);
        var textcontent = $(this).closest('.notice-item').find('.notice-content .notice-text').text().trim();
        var start = $(this).closest('.notice-item').find('.notice-content .notice-dates .noticestart').text().replace("Start:", "").trim();
        var end = $(this).closest('.notice-item').find('.notice-content .notice-dates .noticeend').text().replace("End:", "").trim();
        //put editing data into edit fields
        $('.form-group input[name="text"]').val(textcontent);
        $('.form-group input[name="start"]').val(start);
        $('.form-group input[name="end"]').val(end);
    }
    else if(name == "delete"){// Delete button pressed, send delete to midleware by id of record
        var textcontent = $(this).closest('.notice-item').find('.notice-content .notice-text').text().trim();
        $('.form-group input[name="text"]').val(textcontent);
        $('.form-group input[name="start"]').val(start);
        $('.form-group input[name="end"]').val(end);
        var answer = confirm('Are you sure you want to DELETE '+ id);
        if (answer == true) {
            $.ajax({
                url: 'http://localhost:3000/dashboard/delete',
                method: 'DELETE',
                data: {
                    noticeId: id
                    }
                })
                .then(removeNoticeOnDelete)
                .catch(removeNoticeFailed);
        } else {
            cancelBtn();
            return;
        }
    } else alert('Not identified button!');
});

const removeNoticeOnDelete = (notice) => {
    const id = notice.noticeId;
    $(`.notice-item[id=${id}]`).remove();
    cancelBtn();
};

const removeNoticeFailed = () => {
    alert('Fail deleting notice');
};

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
};

//datapicker
$('input[type= text]').on('click', function(event){
   
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

const showEditIcon = (srcStr) => {
    var arr = $('.form-group .iconlist > *');
   
    for (var i = 0; i < arr.length; i++) {
        var atr = arr.eq(i).find('img').attr('src');
        if(arr.eq(i).attr('style').includes("inline") && srcStr != atr)
            arr.eq(i).css('display','none'); 

        if(srcStr == atr) arr.eq(i).css('display','inline');
    }
};

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
            $('#data_preview').prop('disabled', true);
        } else {
            let noticeStart = $('input[name="start"]').val().trim();
            let noticeEnd = $('input[name="end"]').val().trim();
            
            if(noticeEnd != "" &&  noticeStart != ""){
                $("#data_submit").attr("disabled", false);
                $('#data_preview').prop('disabled', false);
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
            let noticeText = $('input[name="text"]').val().trim();
            //let noticeStart = $('input[name="start"]').val().trim();
            let noticeEnd = $('input[name="end"]').val().trim();
            
            if(noticeEnd != "" &&  noticeText != "")
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
            let noticeText = $('input[name="text"]').val().trim();
            let noticeStart = $('input[name="start"]').val().trim();
            //let noticeEnd = $('input[name="end"]').val().trim();
            
            if(noticeStart != "" &&  noticeText != "")
            {
                $("#data_submit").attr("disabled", false);
                $('#data_preview').prop('disabled', false);
            }
        }
    });
});

function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}

$(document).ready(function() {

    //$('#editor').val('Text');
    var toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
      
        [{ 'header': 1 }, { 'header': 2 }, { 'header': 3 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['image'],
        ['link'],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];
      
      var quill = new Quill('#editor', {
        modules: {
          toolbar: toolbarOptions
        },
        theme: 'snow'
      });
});



