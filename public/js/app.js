/**/
const noticeTemplate = (id, text, start, end, srcImg) => {

    const noticeBox = $('<div>').attr({
        class: 'notice-item',
        style: 'display:block',
        id: id
    });

    const noticeContainer = $('<div>').attr({
        class: 'content-notice__list',
        id: id
    });

    const noticeImg = $('<img>').attr({
        src: `${srcImg}`,
        onError:`this.onerror=null;this.src='/images/Notice.png';`

    });

    const noticeTextContainer = $('<div>').attr({
        class: 'noticetext',
    });
   const notice = $('<p>');
   notice.html(text);

   const noticeStart = $('<div>').attr({
        class: 'noticestart',
   });
   const startN  = $('<p>');
   startN.html('Start: ' + start);

   const noticeEnd = $('<div>').attr({
        class: 'noticeend',
   });
   const endN 	= $('<p>');
   endN.html('End: ' + end);

   const buttonEdit = $('<button>').attr({
    'data-id': id,
    class: 'btn btn-success',
    name: 'Edit'
    });

    const buttonDelete = $('<button>').attr({
    'data-id': id,
    class: 'btn btn-success',
    name: 'Delete'
    });
   buttonEdit.html('Edit');
   buttonDelete.html('Delete');
   const par = $('<p>');

   noticeContainer.append( noticeTextContainer);
   noticeContainer.append(noticeImg);
   noticeContainer.append( notice);
   noticeContainer.append( noticeStart);
   noticeContainer.append( startN);
   noticeContainer.append( noticeEnd);
   noticeContainer.append( endN);
   noticeContainer.append( buttonEdit);
   noticeContainer.append( buttonDelete);
   noticeContainer.append( par);

   noticeBox.append(noticeContainer);

    //return noticeContainer;
    return noticeBox;
};


const displayNewNotice = (notice) => {
    //const name = notice.condoName;
    const id = notice.id;
    const text = notice.text;
    const start = notice.start;
    const end = notice.end;
    const srcImg = notice.imgSrc;

    const newNotice = noticeTemplate(id, text, start, end, srcImg);

    $('.content-notice').prepend(newNotice);
    $('input').val('');

    //disable the submit button
    $("#data_submit").attr("disabled", true);
};

const addCondoFail = (response) => {
    alert('Failed to Add Notice');
};
/**/
//add new notice
$('button[type= submit]').on('click', function(event){
    const name = $(this).attr('name');
    //alert('button: ' + name) ;
    if(name == "addNotice"){
        event.preventDefault();// prevent the Browser from refreshing
    
        const condoName = $('input[name ="condoName"]').val().trim();
        const noticeText = $('input[name="text"]').val().trim();
        const noticeStart = $('input[name="start"]').val().trim();
        const noticeEnd = $('input[name="end"]').val().trim();

        if(isBlank(noticeText) || isBlank(noticeStart) || isBlank(noticeStart)){
            alert( 'Error! Empty field/s !!');
            return;
        }
        
        if (Date.parse(noticeStart) > Date.parse(noticeEnd) || Date.parse(noticeStart) == Date.parse(noticeEnd)) {
            alert( 'Error: Start Date Greater End Date or equal!!');
            return;
        }
        
        var arr = $('.iconlist > *');
        var pId = 1;
        var psrc = null;
        for (var i = 0; i < arr.length; i++) {
            if(arr.eq(i).attr('style').includes("inline")){
                psrc = arr.eq(i).find('img').attr('src');
                var atr = arr.eq(i).find('img').attr('id');
                pId = atr.replace(/[^0-9\.]+/g, ""); //regex would replace everything except numerics
            //   alert(pId);                
                break;
            }
        }
        const noticeImgId = pId;
        const noticeImgSrc = psrc;
        
        //alert('Submit! ' + noticeText);

        $.ajax({
            url: 'http://localhost:3000/dashboard/add',
            //url: '/add',
            method: 'POST',
            data: {
                condoName: condoName,
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                imgId: noticeImgId,
                imgSrc: noticeImgSrc,
                id: 0
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

//edit notice
$('button[type= button]').on('click', function(event){ 
    const name = $(this).attr('name');

    $('.content-notice button').prop('disabled', false);

    if(name == "cancelEdit"){   //if Cancel -> hide Save/Cancel buttons and show Add button, clear notise and date inputs
        $('.addbutton-group').css('display','inline');
        $('.editbutton-group').css('display','none');
        $('.form-group input[name="text"]').val("");
        $('.form-group input[name="start"]').val("");
        $('.form-group input[name="end"]').val("");
    }
    else if(name == "editNotice"){ //name == "editNotice ", read values from notice, start and end inputs 
        const noticeID = $('input[name ="noticeID"]').val().trim();
        const noticeText = $('.form-group input[name="text"]').val().trim();
        
        var noticeStart = $('.form-group input[name="start"]').val().trim();
        var noticeEnd = $('.form-group input[name="end"]').val().trim();
        //alert('Before: ' + noticeStart + '|' + noticeEnd + '|' + noticeID);

        noticeStart = checkMinFormat(noticeStart); //formate time: minutes may be not in mm format
        noticeEnd = checkMinFormat(noticeEnd);

        if (Date.parse(noticeStart) > Date.parse(noticeEnd) || Date.parse(noticeStart) == Date.parse(noticeEnd)) {
            alert( 'Error: Start Date Greater End Date!!');
            return;
        }

        var iconId = getDisplayedIconId();
     //alert(iconId);
        //Post data to midleware, key value is id
       //alert('After: ' + noticeStart + '|' + noticeEnd + '|' + noticeID);

        $.ajax({
            url: 'http://localhost:3000/dashboard/edit',
            method: 'POST',
            data: {
                text: noticeText,
                start: noticeStart,
                end: noticeEnd,
                id: noticeID,
                icon: iconId
            }
        })
        .then(displayEditNotice)
        .catch(editNoticeFailed);
    } else if(name == "ShowNotices"){
        var arr = $(".notice-item[style*='block' ] > * "); 
        var arID = [];
        arr.each(function() {
            var id = $( this).attr('id');
            arID.push(id);
        });
        //ajax send UPDATE status on 1 (active) with array of iDs and render to SHOW page
        if(arID.length == 0){
            alert('List of IDs is empty!');
            return;
        }
        /**/
        $.ajax({
            url: 'http://localhost:3000/dashboard/show',
            method: 'POST',
            data: { id: JSON.stringify(arID)
            }
        }).then(showNoticeSuccess)
        .catch(showNoticeFail);
        /**/
       //.done(showNoticeSuccess)
       //.fail(showNoticeFail);
        /*
       $.ajax({
            url: 'http://localhost:3000/dashboard/preview',
            method: 'GET',
            data: { id: JSON.stringify(arID)
            }
        }).then(showNoticeSuccess)
        .catch(showNoticeFail);
        */
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
    alert('Success editing!');
      
    const id = notice.id;
    const text = notice.text;
    var start = notice.start; //time from db in format YYYY-MM-DD hh:mm:ss, we need hh:mm only
    var arr = start.split(":");
    start = arr[0] + ":" + arr[1]; //just hh:mm
    var end = notice.end;
    arr = end.split(":");
    end = arr[0] + ":" + arr[1]; //just hh:mm
    const iconId = notice.icon;

    const srcNew = getIconSrcById(iconId);
    //alert(srcNew);
    $(`.content-notice__list[id=${id}] .pic img`).attr("src", srcNew);

    //put data into proper place by id
    $(`.content-notice__list[id=${id}] .noticetext p`).text(text);
    $(`.content-notice__list[id=${id}] .noticestart p`).text("Start: " + start);
    $(`.content-notice__list[id=${id}] .noticeend p`).text("End: " + end);

    $('.form-group input[name="text"]').val("");
    $('.form-group input[name="start"]').val("");
    $('.form-group input[name="end"]').val("");
};

// edit/delete notice
$('.content .content-notice__list button').on('click', function() {
    const id = $(this).attr('data-id');
    const name = $(this).attr('name');
    //in every notice record there are two buttons 
    if(name == "Edit"){// edit button pressed
       //hide add buttons and show edit, save id value
        $('.addbutton-group').css('display','none');        
        $('.editbutton-group').css('display','inline');

        $('.form-group input[name ="noticeID"]').val(id); // save notice id in hidden field
       
        $('.content-notice button').prop('disabled', true); //disable all Delete/Edit buttons until Save/Cancel pressed

       //read values from editing notice
        var iconsrc =$(this).closest('.content-notice .content-notice__list').find('img').attr('src');
        showEditIcon(iconsrc);

        var textcontent =$(this).closest('.content-notice .content-notice__list').find('.noticetext').text().trim();
        var start =$(this).closest('.content-notice .content-notice__list').find('.noticestart').text().replace("Start:", "").trim();
        var end =$(this).closest('.content-notice .content-notice__list').find('.noticeend').text().replace("End:", "").trim();
        //put editing data into edit fields
        $('.form-group input[name="text"]').val(textcontent);
        $('.form-group input[name="start"]').val(start);
        $('.form-group input[name="end"]').val(end);
    }
    else if(name == "Delete"){// Delete button pressed, send delete to midleware by id of record

        $.ajax({
            url: 'http://localhost:3000/dashboard/delete',
            method: 'DELETE',
            data: {
                id: id
              }
        })
        .then(removeNoticeOnDelete)
        .catch(removeNoticeFailed);
    }
    else
     alert('Not identified button!');
});

const removeNoticeOnDelete = (notice) => {
    const id = notice.id;
    $(`.content-notice__list[id=${id}]`).remove();
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
     //  $('#date_pickerStart').datetimepicker({
        $(this).datetimepicker({
        ownerDocument: document,
        contentWindow: window,
        value: '',
        rtl: false,
    //    format: 'Y/m/d H:i',
        format: 'Y-m-d H:i',
        formatTime: 'H:i',
    //    formatDate: 'Y/m/d',
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

         //   var atr = arr.eq(i).find('img').attr('id');
         //    var pId = atr.replace(/[^0-9\.]+/g, ""); //regex would replace everything except numerics
         //   alert(pId);                
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
            }
            else{
                //alert("NOT Active! " + "Start: " + noticeStart + " End: " + noticeEnd + " now: " + now);
                $(value).attr('style','display: none');
            }
        }); 
        //event.preventDefault();
    }
        else if(selectedValue == 3){ 
            //alert("Future!");
            $('.notice-item').each((index, value) => {
                //alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
                var noticeStart = Date.parse($(value).find('.noticestart p').text().replace("Start:", "").trim());
                if ( noticeStart > now) {
                    $(value).attr('style','display: block');
                }
                else                
                    $(value).attr('style','display: none');
            });
        }
        else if(selectedValue == 4){ 
            //alert("Both!");
            $('.notice-item').each((index, value) => {
                //alert( $(value).find('.noticestart p').text().replace("Start:", "").trim() + ' | ' + $(value).find('.noticeend p').text().replace("End:", "").trim());
                var noticeEnd = Date.parse($(value).find('.noticeend p').text().replace("End:", "").trim());
                if ( noticeEnd > now) {
                    $(value).attr('style','display: block');
                }
                else                
                    $(value).attr('style','display: none');
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
            
            if(noticeEnd != "" &&  noticeStart != "")
            {
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



