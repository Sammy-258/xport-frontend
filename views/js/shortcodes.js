"use strict";

/* Global variables manipulations
---------------------------------------------------------------- */

// Global variables storage
if (typeof THEMEREX_GLOBALS == 'undefined') var THEMEREX_GLOBALS = {};

// Get global variable
function themerex_get_global(var_name) {
    return themerex_isset(THEMEREX_GLOBALS[var_name]) ? THEMEREX_GLOBALS[var_name] : '';
}

// Set global variable
function themerex_set_global(var_name, value) {
    THEMEREX_GLOBALS[var_name] = value;
}

// Inc/Dec global variable with specified value
function themerex_inc_global(var_name) {
    var value = arguments[1]==undefined ? 1 : arguments[1];
    THEMEREX_GLOBALS[var_name] += value;
}

// Concatenate global variable with specified value
function themerex_concat_global(var_name, value) {
    THEMEREX_GLOBALS[var_name] += ''+value;
}

// Get global array element
function themerex_get_global_array(var_name, key) {
    return themerex_isset(THEMEREX_GLOBALS[var_name][key]) ? THEMEREX_GLOBALS[var_name][key] : '';
}

// Set global array element
function themerex_set_global_array(var_name, key, value) {
    if (!themerex_isset(THEMEREX_GLOBALS[var_name])) THEMEREX_GLOBALS[var_name] = {};
    THEMEREX_GLOBALS[var_name][key] = value;
}

// Inc/Dec global array element with specified value
function themerex_inc_global_array(var_name, key) {
    var value = arguments[2]==undefined ? 1 : arguments[2];
    THEMEREX_GLOBALS[var_name][key] += value;
}

// Concatenate global array element with specified value
function themerex_concat_global_array(var_name, key, value) {
    THEMEREX_GLOBALS[var_name][key] += ''+value;
}



/* PHP-style functions
---------------------------------------------------------------- */
function themerex_isset(obj) {
    return obj != undefined;
}

function themerex_empty(obj) {
    return obj == undefined || (typeof(obj)=='object' && obj == null) || (typeof(obj)=='array' && obj.length == 0) || (typeof(obj)=='string' && themerex_alltrim(obj)=='');
}

function themerex_is_array(obj)  {
    "use strict";
    return typeof(obj)=='array';
}

function themerex_is_object(obj)  {
    "use strict";
    return typeof(obj)=='object';
}

function themerex_in_array(val, thearray)  {
    "use strict";
    var rez = false;
    for (var i=0; i<thearray.length-1; i++)  {
        if (thearray[i] == val)  {
            rez = true;
            break;
        }
    }
    return rez;
}

function themerex_clone_object(obj) {
    if (obj == null || typeof(obj) != 'object') {
        return obj;
    }
    var temp = {};
    for (var key in obj) {
        temp[key] = themerex_clone_object(obj[key]);
    }
    return temp;
}



/* String functions
---------------------------------------------------------------- */

function themerex_in_list(str, list) {
    "use strict";
    var delim = arguments[2] ? arguments[2] : '|';
    var icase = arguments[3] ? arguments[3] : true;
    var retval = false;
    if (icase) {
        str = str.toLowerCase();
        list = list.toLowerCase();
    }
    var parts = list.split(delim);
    for (var i=0; i<parts.length; i++) {
        if (parts[i]==str) {
            retval=true;
            break;
        }
    }
    return retval;
}

function themerex_alltrim(str) {
    "use strict";
    var dir = arguments[1] ? arguments[1] : 'a';
    var rez = '';
    var i, start = 0, end = str.length-1;
    if (dir=='a' || dir=='l') {
        for (i=0; i<str.length; i++) {
            if (str.substr(i,1)!=' ') {
                start = i;
                break;
            }
        }
    }
    if (dir=='a' || dir=='r') {
        for (i=str.length-1; i>=0; i--) {
            if (str.substr(i,1)!=' ') {
                end = i;
                break;
            }
        }
    }
    return str.substring(start, end+1);
}

function themerex_ltrim(str) {
    "use strict";
    return themerex_alltrim(str, 'l');
}

function themerex_rtrim(str) {
    "use strict";
    return themerex_alltrim(str, 'r');
}

function themerex_padl(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0,len);
    if (rez.length < len) {
        for (var i=0; i<len-str.length; i++)
            rez += ch;
    }
    return rez;
}

function themerex_padr(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0,len);
    if (rez.length < len) {
        for (var i=0; i<len-str.length; i++)
            rez = ch + rez;
    }
    return rez;
}

function themerex_padc(str, len) {
    "use strict";
    var ch = arguments[2] ? arguments[2] : ' ';
    var rez = str.substr(0,len);
    if (rez.length < len) {
        for (var i=0; i<Math.floor((len-str.length)/2); i++)
            rez = ch + rez + ch;
    }
    return rez+(rez.length<len ? ch : '');
}

function themerex_replicate(str, num) {
    "use strict";
    var rez = '';
    for (var i=0; i<num; i++) {
        rez += str;
    }
    return rez;
}



/* Numbers functions
---------------------------------------------------------------- */

// Round number to specified precision. 
// For example: num=1.12345, prec=2,  rounded=1.12
//              num=12345,   prec=-2, rounded=12300
function themerex_round_number(num) {
    "use strict";
    var precision = arguments[1] ? arguments[1] : 0;
    var p = Math.pow(10, precision);
    return Math.round(num*p)/p;
}

// Clear number from any characters and append it with 0 to desired precision
// For example: num=test1.12dd, prec=3, cleared=1.120
function themerex_clear_number(num) {
    "use strict";
    var precision = arguments[1] ? arguments[1] : 0;
    var defa = arguments[2] ? arguments[2] : 0;
    var res = '';
    var decimals = -1;
    num = ""+num;
    if (num=="") num=""+defa;
    for (var i=0; i<num.length; i++) {
        if (decimals==0) break;
        else if (decimals>0) decimals--;
        var ch = num.substr(i,1);
        if (ch=='.') {
            if (precision>0) {
                res += ch;
            }
            decimals = precision;
        } else if ((ch>=0 && ch<=9) || (ch=='-' && i==0))
            res+=ch;
    }
    if (precision>0 && decimals!=0) {
        if (decimals==-1) {
            res += '.';
            decimals = precision;
        }
        for (i=decimals; i>0; i--)
            res +='0'; 
    }
    //if (isNaN(res)) res = clearNumber(defa, precision, defa);
    return res;
}

// Convert number from decimal to hex
function themerex_dec2hex(n) { 
    "use strict";
    return Number(n).toString(16);
}

// Convert number from hex to decimal
function themerex_hex2dec(hex) {
    "use strict";
    return parseInt(hex,16); 
}



/* Array manipulations
---------------------------------------------------------------- */

function themerex_sort_array(thearray)  {
    "use strict";
    var caseSensitive = arguments[1] ? arguments[1] : false;
    for (var x=0; x<thearray.length-1; x++)  {
        for (var y=(x+1); y<thearray.length; y++)  {
            if (caseSensitive) {
                if (thearray[x] > thearray[y])  {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }  
            } else {
                if (thearray[x].toLowerCase() > thearray[y].toLowerCase())  {
                    tmp = thearray[x];
                    thearray[x] = thearray[y];
                    thearray[y] = tmp;
                }  
            }
        }  
    }
    return thearray;
}



/* Date manipulations
---------------------------------------------------------------- */

// Return array[Year, Month, Day, Hours, Minutes, Seconds]
// from string: Year[-/.]Month[-/.]Day[T ]Hours:Minutes:Seconds
function themerex_parse_date(dt) {
    "use strict";
    dt = dt.replace(/\//g, '-').replace(/\./g, '-').replace(/T/g, ' ').split('+')[0];
    var dt2 = dt.split(' ');
    var d = dt2[0].split('-');
    var t = dt2[1].split(':');
    d.push(t[0], t[1], t[2]);
    return d;
}

// Return difference string between two dates
function themerex_get_date_difference(dt1) {
    "use strict";
    var dt2 = arguments[1]!==undefined ? arguments[1] : '';
    var short_date = arguments[2]!==undefined ? arguments[2] : true;
    var sec = arguments[3]!==undefined ? arguments[3] : false;
    var a1 = themerex_parse_date(dt1);
    dt1 = Date.UTC(a1[0], a1[1], a1[2], a1[3], a1[4], a1[5]);
    if (dt2 == '') {
        dt2 = new Date();
        var a2 = [dt2.getFullYear(), dt2.getMonth()+1, dt2.getDate(), dt2.getHours(), dt2.getMinutes(), dt2.getSeconds()];
    } else
        var a2 = themerex_parse_date(dt2);
    dt2 = Date.UTC(a2[0], a2[1], a2[2], a2[3], a2[4], a2[5]);
    var diff = Math.round((dt2 - dt1)/1000);
    var days = Math.floor(diff / (24*3600));
    diff -= days * 24 * 3600;
    var hours = Math.floor(diff / 3600);
    diff -= hours * 3600;
    var minutes = Math.floor(diff / 60);
    diff -= minutes * 60;
    rez = '';
    if (days > 0)
        rez += (rez!='' ? ' ' : '') + days + ' day' + (days > 1 ? 's' : '');
    if ((!short_date || rez=='') && hours > 0)
        rez += (rez!='' ? ' ' : '') + hours + ' hour' + (hours > 1 ? 's' : '');
    if ((!short_date || rez=='') && minutes > 0)
        rez +=  (rez!='' ? ' ' : '') + minutes + ' minute' + (minutes > 1 ? 's' : '');
    if (sec || rez=='')
        rez +=  rez!='' || sec ? (' ' + diff + ' second' + (diff > 1 ? 's' : '')) : 'less then minute';
    return rez;
}



/* Colors functions
---------------------------------------------------------------- */

function themerex_hex2rgb(hex) {
    hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
    return {r: hex >> 16, g: (hex & 0x00FF00) >> 8, b: (hex & 0x0000FF)};
}

function themerex_rgb2hex(color) {
    "use strict";
    var aRGB;
    color = color.replace(/\s/g,"").toLowerCase();
    if (color=='rgba(0,0,0,0)' || color=='rgba(0%,0%,0%,0%)')
        color = 'transparent';
    if (color.indexOf('rgba(')==0)
        aRGB = color.match(/^rgba\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    else    
        aRGB = color.match(/^rgb\((\d{1,3}[%]?),(\d{1,3}[%]?),(\d{1,3}[%]?)\)$/i);
    
    if(aRGB) {
        color = '';
        for (var i=1; i<=3; i++) 
            color += Math.round((aRGB[i][aRGB[i].length-1]=="%"?2.55:1)*parseInt(aRGB[i]), 10).toString(16).replace(/^(.)$/,'0$1');
    } else 
        color = color.replace(/^#?([\da-f])([\da-f])([\da-f])$/i, '$1$1$2$2$3$3');
    return (color.substr(0,1)!='#' ? '#' : '') + color;
}

function themerex_components2hex(r,g,b) {
    "use strict";
    return '#'+
        Number(r).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
        Number(g).toString(16).toUpperCase().replace(/^(.)$/,'0$1') +
        Number(b).toString(16).toUpperCase().replace(/^(.)$/,'0$1');
}

function themerex_rgb2components(color) {
    "use strict";
    color = themerex_rgb2hex(color);
    var matches = color.match(/^#?([\dabcdef]{2})([\dabcdef]{2})([\dabcdef]{2})$/i);
    if (!matches) return false;
    for (var i=1, rgb = new Array(3); i<=3; i++)
        rgb[i-1] = parseInt(matches[i],16);
    return rgb;
}

function themerex_hex2hsb(hex) {
    "use strict";
    return themerex_rgb2hsb(themerex_hex2rgb(hex));
}

function themerex_hsb2hex(hsb) {
    var rgb = themerex_hsb2rgb(hsb);
    return themerex_components2hex(rgb.r, rgb.g, rgb.b);
}

function themerex_rgb2hsb(rgb) {
    "use strict";
    var hsb = {};
    hsb.b = Math.max(Math.max(rgb.r,rgb.g),rgb.b);
    hsb.s = (hsb.b <= 0) ? 0 : Math.round(100*(hsb.b - Math.min(Math.min(rgb.r,rgb.g),rgb.b))/hsb.b);
    hsb.b = Math.round((hsb.b /255)*100);
    if ((rgb.r==rgb.g) && (rgb.g==rgb.b))  hsb.h = 0;
    else if (rgb.r>=rgb.g && rgb.g>=rgb.b) hsb.h = 60*(rgb.g-rgb.b)/(rgb.r-rgb.b);
    else if (rgb.g>=rgb.r && rgb.r>=rgb.b) hsb.h = 60  + 60*(rgb.g-rgb.r)/(rgb.g-rgb.b);
    else if (rgb.g>=rgb.b && rgb.b>=rgb.r) hsb.h = 120 + 60*(rgb.b-rgb.r)/(rgb.g-rgb.r);
    else if (rgb.b>=rgb.g && rgb.g>=rgb.r) hsb.h = 180 + 60*(rgb.b-rgb.g)/(rgb.b-rgb.r);
    else if (rgb.b>=rgb.r && rgb.r>=rgb.g) hsb.h = 240 + 60*(rgb.r-rgb.g)/(rgb.b-rgb.g);
    else if (rgb.r>=rgb.b && rgb.b>=rgb.g) hsb.h = 300 + 60*(rgb.r-rgb.b)/(rgb.r-rgb.g);
    else                                   hsb.h = 0;
    hsb.h = Math.round(hsb.h);
    return hsb;
}

function themerex_hsb2rgb(hsb) {
    var rgb = {};
    var h = Math.round(hsb.h);
    var s = Math.round(hsb.s*255/100);
    var v = Math.round(hsb.b*255/100);
    if (s == 0) {
        rgb.r = rgb.g = rgb.b = v;
    } else {
        var t1 = v;
        var t2 = (255-s)*v/255;
        var t3 = (t1-t2)*(h%60)/60;
        if (h==360) h = 0;
        if (h<60)       { rgb.r=t1; rgb.b=t2;   rgb.g=t2+t3; }
        else if (h<120) { rgb.g=t1; rgb.b=t2;   rgb.r=t1-t3; }
        else if (h<180) { rgb.g=t1; rgb.r=t2;   rgb.b=t2+t3; }
        else if (h<240) { rgb.b=t1; rgb.r=t2;   rgb.g=t1-t3; }
        else if (h<300) { rgb.b=t1; rgb.g=t2;   rgb.r=t2+t3; }
        else if (h<360) { rgb.r=t1; rgb.g=t2;   rgb.b=t1-t3; }
        else            { rgb.r=0;  rgb.g=0;    rgb.b=0;     }
    }
    return { r:Math.round(rgb.r), g:Math.round(rgb.g), b:Math.round(rgb.b) };
}

function themerex_color_picker(){
    "use strict";
    var id = arguments[0] ? arguments[0] : "iColorPicker"+Math.round(Math.random()*1000);
    var colors = arguments[1] ? arguments[1] : 
    '#f00,#ff0,#0f0,#0ff,#00f,#f0f,#fff,#ebebeb,#e1e1e1,#d7d7d7,#cccccc,#c2c2c2,#b7b7b7,#acacac,#a0a0a0,#959595,'
    +'#ee1d24,#fff100,#00a650,#00aeef,#2f3192,#ed008c,#898989,#7d7d7d,#707070,#626262,#555,#464646,#363636,#262626,#111,#000,'
    +'#f7977a,#fbad82,#fdc68c,#fff799,#c6df9c,#a4d49d,#81ca9d,#7bcdc9,#6ccff7,#7ca6d8,#8293ca,#8881be,#a286bd,#bc8cbf,#f49bc1,#f5999d,'
    +'#f16c4d,#f68e54,#fbaf5a,#fff467,#acd372,#7dc473,#39b778,#16bcb4,#00bff3,#438ccb,#5573b7,#5e5ca7,#855fa8,#a763a9,#ef6ea8,#f16d7e,'
    +'#ee1d24,#f16522,#f7941d,#fff100,#8fc63d,#37b44a,#00a650,#00a99e,#00aeef,#0072bc,#0054a5,#2f3192,#652c91,#91278f,#ed008c,#ee105a,'
    +'#9d0a0f,#a1410d,#a36209,#aba000,#588528,#197b30,#007236,#00736a,#0076a4,#004a80,#003370,#1d1363,#450e61,#62055f,#9e005c,#9d0039,'
    +'#790000,#7b3000,#7c4900,#827a00,#3e6617,#045f20,#005824,#005951,#005b7e,#003562,#002056,#0c004b,#30004a,#4b0048,#7a0045,#7a0026';
    var colorsList = colors.split(',');
    var tbl = '<table class="colorPickerTable"><thead>';
    for (var i=0; i<colorsList.length; i++) {
        if (i%16==0) tbl += (i>0 ? '</tr>' : '') + '<tr>';
        tbl += '<td style="background-color:'+colorsList[i]+'">&nbsp;</td>';
    }
    tbl += '</tr></thead><tbody>'
        + '<tr style="height:60px;">'
        + '<td colspan="8" id="'+id+'_colorPreview" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">'
        + '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" maxlength="7" />'
        + '<a href="#" id="'+id+'_moreColors" class="iColorPicker_moreColors"></a>'
        + '</td>'
        + '<td colspan="8" id="'+id+'_colorOriginal" style="vertical-align:middle;text-align:center;border:1px solid #000;background:#fff;">'
        + '<input style="width:55px;color:#000;border:1px solid rgb(0, 0, 0);padding:5px;background-color:#fff;font:11px Arial, Helvetica, sans-serif;" readonly="readonly" />'
        + '</td>'
        + '</tr></tbody></table>';
    //tbl += '<style>#iColorPicker input{margin:2px}</style>';

    jQuery(document.createElement("div"))
        .attr("id", id)
        .css('display','none')
        .html(tbl)
        .appendTo("body")
        .addClass("iColorPickerTable")
        .on('mouseover', 'thead td', function(){
            "use strict";
            var aaa = themerex_rgb2hex(jQuery(this).css('background-color'));
            jQuery('#'+id+'_colorPreview').css('background',aaa);
            jQuery('#'+id+'_colorPreview input').val(aaa);
        })
        .on('keypress', '#'+id+'_colorPreview input', function(key){
            "use strict";
            var aaa = jQuery(this).val()
            if (aaa.length<7 && ((key.which>=48 && key.which<=57) || (key.which>=97 && key.which<=102) || (key.which===35 || aaa.length===0))) {
                aaa += String.fromCharCode(key.which);
            } else if (key.which == 8 && aaa.length>0) {
                aaa = aaa.substring(0, aaa.length-1);
            } else if (key.which===13 && (aaa.length===4 || aaa.length===7)) {
                var fld  = jQuery('#'+id).data('field');
                var func = jQuery('#'+id).data('func');
                if (func!=null && func!='undefined') {
                    func(fld, aaa);
                } else {
                    fld.val(aaa).css('backgroundColor', aaa).trigger('change');
                }
                jQuery('#'+id+'_Bg').fadeOut(500);
                jQuery('#'+id).fadeOut(500);
                
            } else {
                key.preventDefault();
                return false;
            }
            if (aaa.substr(0,1)==='#' && (aaa.length===4 || aaa.length===7)) {
                jQuery('#'+id+'_colorPreview').css('background',aaa);
            }
        })
        .on('click', 'thead td', function(e){
            "use strict";
            var fld  = jQuery('#'+id).data('field');
            var func = jQuery('#'+id).data('func');
            var aaa  = themerex_rgb2hex(jQuery(this).css('background-color'));
            if (func!=null && func!='undefined') {
                func(fld, aaa);
            } else {
                fld.val(aaa).css('backgroundColor', aaa).trigger('change');
            }
            jQuery('#'+id+'_Bg').fadeOut(500);
            jQuery('#'+id).fadeOut(500);
            e.preventDefault();
            return false;
        })
        .on('click', 'tbody .iColorPicker_moreColors', function(e){
            "use strict";
            var thead  = jQuery(this).parents('table').find('thead');
            var out = '';
            if (thead.hasClass('more_colors')) {
                for (var i=0; i<colorsList.length; i++) {
                    if (i%16==0) out += (i>0 ? '</tr>' : '') + '<tr>';
                    out += '<td style="background-color:'+colorsList[i]+'">&nbsp;</td>';
                }
                thead.removeClass('more_colors').empty().html(out+'</tr>');
                jQuery('#'+id+'_colorPreview').attr('colspan', 8);
                jQuery('#'+id+'_colorOriginal').attr('colspan', 8);
            } else {
                var rgb=[0,0,0], i=0, j=-1; // Set j=-1 or j=0 - show 2 different colors layouts
                while (rgb[0]<0xF || rgb[1]<0xF || rgb[2]<0xF) {
                    if (i%18==0) out += (i>0 ? '</tr>' : '') + '<tr>';
                    i++;
                    out += '<td style="background-color:'+themerex_components2hex(rgb[0]*16+rgb[0],rgb[1]*16+rgb[1],rgb[2]*16+rgb[2])+'">&nbsp;</td>';
                    rgb[2]+=3;
                    if (rgb[2]>0xF) {
                        rgb[1]+=3;
                        if (rgb[1]>(j===0 ? 6 : 0xF)) {
                            rgb[0]+=3;
                            if (rgb[0]>0xF) {
                                if (j===0) {
                                    j=1;
                                    rgb[0]=0;
                                    rgb[1]=9;
                                    rgb[2]=0;
                                } else {
                                    break;
                                }
                            } else {
                                rgb[1]=(j < 1 ? 0 : 9);
                                rgb[2]=0;
                            }
                        } else {
                            rgb[2]=0;
                        }
                    }
                }
                thead.addClass('more_colors').empty().html(out+'<td  style="background-color:#ffffff" colspan="8">&nbsp;</td></tr>');
                jQuery('#'+id+'_colorPreview').attr('colspan', 9);
                jQuery('#'+id+'_colorOriginal').attr('colspan', 9);
            }
            jQuery('#'+id+' table.colorPickerTable thead td')
                .css({
                    'width':'12px',
                    'height':'14px',
                    'border':'1px solid #000',
                    'cursor':'pointer'
                });
            e.preventDefault();
            return false;
        });
    jQuery(document.createElement("div"))
        .attr("id", id+"_Bg")
        .on("click", function(e) {
            "use strict";
            jQuery("#"+id+"_Bg").fadeOut(500);
            jQuery("#"+id).fadeOut(500);
            e.preventDefault();
            return false;
        })
        .appendTo("body");
    jQuery('#'+id+' table.colorPickerTable thead td')
        .css({
            'width':'12px',
            'height':'14px',
            'border':'1px solid #000',
            'cursor':'pointer'
        });
    jQuery('#'+id+' table.colorPickerTable')
        .css({'border-collapse':'collapse'});
    jQuery('#'+id)
        .css({
            'border':'1px solid #ccc',
            'background':'#333',
            'padding':'5px',
            'color':'#fff',
            'z-index':999999
        });
    jQuery('#'+id+'_colorPreview')
        .css({'height':'50px'});
    return id;
}

function themerex_color_picker_show(id, fld, func) { 
    "use strict";
    if (id===null || id==='') {
        id = jQuery('.iColorPickerTable').attr('id');
    }
    var eICP = fld.offset();
    var w = jQuery('#'+id).width();
    var h = jQuery('#'+id).height();
    var l = eICP.left + w < jQuery(window).width()-10 ? eICP.left : jQuery(window).width()-10 - w;
    var t = eICP.top + fld.outerHeight() + h < jQuery(document).scrollTop() + jQuery(window).height()-10 ? eICP.top + fld.outerHeight() : eICP.top - h - 13;
    jQuery("#"+id)
        .data({field: fld, func: func})
        .css({
            'top':t+"px",
            'left':l+"px",
            'position':'absolute',
            'z-index':100001
        })
        .fadeIn(500);
    jQuery("#"+id+"_Bg")
        .css({
            'position':'fixed',
            'z-index':100000,
            'top':0,
            'left':0,
            'width':'100%',
            'height':'100%'
        })
        .fadeIn(500);
    var def = fld.val().substr(0, 1)=='#' ? fld.val() : themerex_rgb2hex(fld.css('backgroundColor'));
    jQuery('#'+id+'_colorPreview input,#'+id+'_colorOriginal input').val(def);
    jQuery('#'+id+'_colorPreview,#'+id+'_colorOriginal').css('background',def);
}



/* Cookies manipulations
---------------------------------------------------------------- */

function themerex_get_cookie(name) {
    "use strict";
    var defa = arguments[1]!=undefined ? arguments[1] : null;
    var start = document.cookie.indexOf(name + '=');
    var len = start + name.length + 1;
    if ((!start) && (name != document.cookie.substring(0, name.length))) {
        return defa;
    }
    if (start == -1)
        return defa;
    var end = document.cookie.indexOf(';', len);
    if (end == -1)
        end = document.cookie.length;
    return unescape(document.cookie.substring(len, end));
}


function themerex_set_cookie(name, value, expires, path, domain, secure) {
    "use strict";
    var expires = arguments[2]!=undefined ? arguments[2] : 0;
    var path    = arguments[3]!=undefined ? arguments[3] : '/';
    var domain  = arguments[4]!=undefined ? arguments[4] : '';
    var secure  = arguments[5]!=undefined ? arguments[5] : '';
    var today = new Date();
    today.setTime(today.getTime());
    if (expires) {
        expires = expires * 1000 * 60 * 60 * 24;
    }
    var expires_date = new Date(today.getTime() + (expires));
    document.cookie = name + '='
            + escape(value)
            + ((expires) ? ';expires=' + expires_date.toGMTString() : '')
            + ((path)    ? ';path=' + path : '')
            + ((domain)  ? ';domain=' + domain : '')
            + ((secure)  ? ';secure' : '');
}


function themerex_del_cookie(name, path, domain) {
    "use strict";
    var path   = arguments[1]!=undefined ? arguments[1] : '/';
    var domain = arguments[2]!=undefined ? arguments[2] : '';
    if (themerex_get_cookie(name))
        document.cookie = name + '=' + ((path) ? ';path=' + path : '')
                + ((domain) ? ';domain=' + domain : '')
                + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
}



/* ListBox and ComboBox manipulations
---------------------------------------------------------------- */

function themerex_clear_listbox(box) {
    "use strict";
    for (var i=box.options.length-1; i>=0; i--)
        box.options[i] = null;
}

function themerex_add_listbox_item(box, val, text) {
    "use strict";
    var item = new Option();
    item.value = val;
    item.text = text;
    box.options.add(item);
}

function themerex_del_listbox_item_by_value(box, val) {
    "use strict";
    for (var i=0; i<box.options.length; i++) {
        if (box.options[i].value == val) {
            box.options[i] = null;
            break;
        }
    }
}

function themerex_del_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i=0; i<box.options.length; i++) {
        if (box.options[i].text == txt) {
            box.options[i] = null;
            break;
        }
    }
}

function themerex_find_listbox_item_by_value(box, val) {
    "use strict";
    var idx = -1;
    for (var i=0; i<box.options.length; i++) {
        if (box.options[i].value == val) {
            idx = i;
            break;
        }
    }
    return idx;
}

function themerex_find_listbox_item_by_text(box, txt) {
    "use strict";
    var idx = -1;
    for (var i=0; i<box.options.length; i++) {
        if (box.options[i].text == txt) {
            idx = i;
            break;
        }
    }
    return idx;
}

function themerex_select_listbox_item_by_value(box, val) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (val == box.options[i].value);
    }
}

function themerex_select_listbox_item_by_text(box, txt) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        box.options[i].selected = (txt == box.options[i].text);
    }
}

function themerex_get_listbox_values(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i=0; i<box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].value;
    }
    return str;
}

function themerex_get_listbox_texts(box) {
    "use strict";
    var delim = arguments[1] ? arguments[1] : ',';
    var str = '';
    for (var i=0; i<box.options.length; i++) {
        str += (str ? delim : '') + box.options[i].text;
    }
    return str;
}

function themerex_sort_listbox(box)  {
    "use strict";
    var temp_opts = new Array();
    var temp = new Option();
    for(var i=0; i<box.options.length; i++)  {
        temp_opts[i] = box.options[i].clone();
    }
    for(var x=0; x<temp_opts.length-1; x++)  {
        for(var y=(x+1); y<temp_opts.length; y++)  {
            if(temp_opts[x].text > temp_opts[y].text)  {
                temp = temp_opts[x];
                temp_opts[x] = temp_opts[y];
                temp_opts[y] = temp;
            }  
        }  
    }
    for(var i=0; i<box.options.length; i++)  {
        box.options[i] = temp_opts[i].clone();
    }
}

function themerex_get_listbox_selected_index(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected)
            return i;
    }
    return -1;
}

function themerex_get_listbox_selected_value(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].value;
        }
    }
    return null;
}

function themerex_get_listbox_selected_text(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i].text;
        }
    }
    return null;
}

function themerex_get_listbox_selected_option(box) {
    "use strict";
    for (var i = 0; i < box.options.length; i++) {
        if (box.options[i].selected) {
            return box.options[i];
        }
    }
    return null;
}



/* Radio buttons manipulations
---------------------------------------------------------------- */

function themerex_get_radio_value(radioGroupObj) {
    "use strict";
    for (var i=0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked) return radioGroupObj[i].value;
    return null;
}

function themerex_set_radio_checked_by_num(radioGroupObj, num) {
    "use strict";
    for (var i=0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && i!=num) radioGroupObj[i].checked=false;
        else if (i==num) radioGroupObj[i].checked=true;
}

function themerex_set_radio_checked_by_value(radioGroupObj, val) {
    "use strict";
    for (var i=0; i < radioGroupObj.length; i++)
        if (radioGroupObj[i].checked && radioGroupObj[i].value!=val) radioGroupObj[i].checked=false;
        else if (radioGroupObj[i].value==val) radioGroupObj[i].checked=true;
}



/* Form manipulations
---------------------------------------------------------------- */

/*
// Usage example:
var error = themerex_form_validate(jQuery(form_selector), {             // -------- Options ---------
    error_message_show: true,                                   // Display or not error message
    error_message_time: 5000,                                   // Time to display error message
    error_message_class: 'sc_infobox sc_infobox_style_error',   // Class, appended to error message block
    error_message_text: 'Global error text',                    // Global error message text (if don't write message in checked field)
    error_fields_class: 'error_fields_class',                   // Class, appended to error fields
    exit_after_first_error: false,                              // Cancel validation and exit after first error
    rules: [
        {
            field: 'author',                                                                // Checking field name
            min_length: { value: 1,  message: 'The author name can\'t be empty' },          // Min character count (0 - don't check), message - if error occurs
            max_length: { value: 60, message: 'Too long author name'}                       // Max character count (0 - don't check), message - if error occurs
        },
        {
            field: 'email',
            min_length: { value: 7,  message: 'Too short (or empty) email address' },
            max_length: { value: 60, message: 'Too long email address'},
            mask: { value: '^([a-z0-9_\\-]+\\.)*[a-z0-9_\\-]+@[a-z0-9_\\-]+(\\.[a-z0-9_\\-]+)*\\.[a-z]{2,6}$', message: 'Invalid email address'}
        },
        {
            field: 'comment',
            min_length: { value: 1,  message: 'The comment text can\'t be empty' },
            max_length: { value: 200, message: 'Too long comment'}
        },
        {
            field: 'pwd1',
            min_length: { value: 5,  message: 'The password can\'t be less then 5 characters' },
            max_length: { value: 20, message: 'Too long password'}
        },
        {
            field: 'pwd2',
            equal_to: { value: 'pwd1',   message: 'The passwords in both fields must be equals' }
        }
    ]
});
*/

function themerex_form_validate(form, opt) {
    "use strict";
    var error_msg = '';
    form.find(":input").each(function() {
        "use strict";
        if (error_msg!='' && opt.exit_after_first_error) return;
        for (var i = 0; i < opt.rules.length; i++) {
            if (jQuery(this).attr("name") == opt.rules[i].field) {
                var val = jQuery(this).val();
                var error = false;
                if (typeof(opt.rules[i].min_length) == 'object') {
                    if (opt.rules[i].min_length.value > 0 && val.length < opt.rules[i].min_length.value) {
                        if (error_msg=='') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].min_length.message)!='undefined' ? opt.rules[i].min_length.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].max_length) == 'object') {
                    if (opt.rules[i].max_length.value > 0 && val.length > opt.rules[i].max_length.value) {
                        if (error_msg=='') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].max_length.message)!='undefined' ? opt.rules[i].max_length.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].mask) == 'object') {
                    if (opt.rules[i].mask.value != '') {
                        var regexp = new RegExp(opt.rules[i].mask.value);
                        if (!regexp.test(val)) {
                            if (error_msg=='') jQuery(this).get(0).focus();
                            error_msg += '<p class="error_item">' + (typeof(opt.rules[i].mask.message)!='undefined' ? opt.rules[i].mask.message : opt.error_message_text ) + '</p>'
                            error = true;
                        }
                    }
                }
                if ((!error || !opt.exit_after_first_error) && typeof(opt.rules[i].equal_to) == 'object') {
                    if (opt.rules[i].equal_to.value != '' && val!=jQuery(jQuery(this).get(0).form[opt.rules[i].equal_to.value]).val()) {
                        if (error_msg=='') jQuery(this).get(0).focus();
                        error_msg += '<p class="error_item">' + (typeof(opt.rules[i].equal_to.message)!='undefined' ? opt.rules[i].equal_to.message : opt.error_message_text ) + '</p>'
                        error = true;
                    }
                }
                if (opt.error_fields_class != '') jQuery(this).toggleClass(opt.error_fields_class, error);
            }
        }
    });
    if (error_msg!='' && opt.error_message_show) {
        var error_message_box = form.find(".result");
        if (error_message_box.length == 0) error_message_box = form.parent().find(".result");
        if (error_message_box.length == 0) {
            form.append('<div class="result"></div>');
            error_message_box = form.find(".result");
        }
        if (opt.error_message_class) error_message_box.toggleClass(opt.error_message_class, true);
        error_message_box.html(error_msg).fadeIn();
        setTimeout(function() { error_message_box.fadeOut(); }, opt.error_message_time);
    }
    return error_msg!='';
}



/* Document manipulations
---------------------------------------------------------------- */

// Animated scroll to selected id
function themerex_document_animate_to(id) {
    if (id.indexOf('#')==-1) id = '#' + id;
    var obj = jQuery(id).eq(0);
    if (obj.length == 0) return;
    var oft = jQuery(id).offset().top;
    var st  = jQuery(window).scrollTop();
    var speed = Math.min(1600, Math.max(400, Math.round(Math.abs(oft-st) / jQuery(window).height() * 100)));
    jQuery('body,html').animate( {scrollTop: oft - jQuery('#wpadminbar').height() - jQuery('header.fixedTopMenu .topWrap').height()}, speed, 'swing');
}

// Change browser address without reload page
function themerex_document_set_location(curLoc){
    try {
        history.pushState(null, null, curLoc);
        return;
    } catch(e) {}
    location.href = curLoc;
}

// Add hidden elements init functions after tab, accordion, toggles activate
function themerex_add_hidden_elements_handler(key, handler) {
    themerex_set_global_array('init_hidden_elements', key, handler);
}

// Init hidden elements after tab, accordion, toggles activate
function themerex_init_hidden_elements(cont) {
    if (THEMEREX_GLOBALS['init_hidden_elements']) {
        /*for (key in THEMEREX_GLOBALS['init_hidden_elements']) {
            THEMEREX_GLOBALS['init_hidden_elements'][key](cont);
        }*/
    }
}



/* Browsers detection
---------------------------------------------------------------- */

function themerex_browser_is_mobile() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}
function themerex_browser_is_ios() {
    return navigator.userAgent.match(/iPad|iPhone|iPod/i) != null;
}



/* File functions
---------------------------------------------------------------- */

function themerex_get_file_name(path) {
    path = path.replace(/\\/g, '/');
    var pos = path.lastIndexOf('/');
    if (pos >= 0)
        path = path.substr(pos+1);
    return path;
}

function themerex_get_file_ext(path) {
    var pos = path.lastIndexOf('.');
    path = pos >= 0 ? path.substr(pos+1) : '';
    return path;
}



/* Image functions
---------------------------------------------------------------- */

// Return true, if all images in the specified container are loaded
function themerex_check_images_complete(cont) {
    var complete = true;
    cont.find('img').each(function() {
        if (!complete) return;
        if (!jQuery(this).get(0).complete) complete = false;
    });
    return complete;
}


jQuery(document).ready(function() {
    "use strict";
    THEMEREX_GLOBALS['theme_init_counter'] = 0;
    themerex_init_actions();
});



// Theme init actions
function themerex_init_actions() {
    "use strict";

    themerex_ready_actions();
    themerex_resize_actions();
    themerex_scroll_actions();

    // Resize handlers
    jQuery(window).resize(function() {
        "use strict";
        themerex_resize_actions();
    });

    // Scroll handlers
    jQuery(window).scroll(function() {
        "use strict";
        themerex_scroll_actions();
    });
}



// Theme first load actions
//==============================================
function themerex_ready_actions() {
    "use strict";

    // Form styler
    (function ($) {
        $(function () {
            if(!!$.prototype.styler) {
                $('#fbuilder input, .sc_contact_form input, .variations_form .variations select, .topic, #fbuilder select.field').styler();
            }
        });
    })(jQuery);


    // block -> stylization (width = height)
    if(jQuery(window).width() >= 959) {
        jQuery('.sc_section.stylization > .sc_section_wrap').each(function () {
            var width = jQuery(this).width();
            jQuery(this).height(width);
        });
    }
    // Call skin specific action (if exists)
    //----------------------------------------------
    if (window.themerex_skin_ready_actions) themerex_skin_ready_actions();


    // Widgets decoration
    //----------------------------------------------

    // Decorate nested lists in widgets and side panels
    jQuery('.widget_area ul > li').each(function() {
        if (jQuery(this).find('ul').length > 0) {
            jQuery(this).addClass('has_children');
        }
    });


    // Archive widget decoration
    jQuery('.widget_archive a').each(function() {
        var val = jQuery(this).html().split(' ');
        if (val.length > 1) {
            val[val.length-1] = '<span>' + val[val.length-1] + '</span>';
            jQuery(this).html(val.join(' '))
        }
    });

    
    // Calendar handlers - change months
    jQuery('.widget_calendar').on('click', '.month_prev a, .month_next a', function(e) {
        "use strict";
        e.preventDefault();
        return false;
    });



    // Media setup
    //----------------------------------------------

    // Video background init
    jQuery('.video_background').each(function() {
        var youtube = jQuery(this).data('youtube-code');
        if (youtube) {
            jQuery(this).tubular({videoId: youtube});
        }
    });



    // Menu
    //----------------------------------------------

    // Clone main menu for responsive
    jQuery('.menu_main_wrap ul#menu_main').clone().removeAttr('id').removeClass('menu_main_nav').addClass('menu_main_responsive').insertAfter('.menu_main_wrap ul#menu_main');

    // Responsive menu button
    jQuery('.menu_main_responsive_button').on("click", function(e){
        "use strict";
        jQuery('.menu_main_responsive').slideToggle();
        e.preventDefault();
        return false;
    });

    // Submenu click handler for the responsive menu
    jQuery('.menu_main_wrap .menu_main_responsive li a').on("click", function(e) {
        "use strict";
        if (jQuery('body').hasClass('responsive_menu') && jQuery(this).parent().hasClass('menu-item-has-children')) {
            if (jQuery(this).siblings('ul:visible').length > 0)
                jQuery(this).siblings('ul').slideUp().parent().removeClass('opened');
            else
                jQuery(this).siblings('ul').slideDown().parent().addClass('opened');
        }
        if (jQuery(this).attr('href')=='#' || (jQuery('body').hasClass('responsive_menu') && jQuery(this).parent().hasClass('menu-item-has-children'))) {
            e.preventDefault();
            return false;
        }
    });
    
    // Init superfish menus
    themerex_init_sfmenu('.menu_main_wrap ul#menu_main, .menu_user_wrap ul#menu_user');

    // Slide effect for main menu
    if (THEMEREX_GLOBALS['menu_slider']) {
        jQuery('#menu_main').spasticNav({
            //color: THEMEREX_GLOBALS['menu_color']
        });
    }

    // Show table of contents for the current page
    if (THEMEREX_GLOBALS['toc_menu'] != 'no') {
        themerex_build_page_toc();
    }

    // One page mode for menu links (scroll to anchor)
    jQuery('#toc, .menu_main_wrap ul li, .menu_user_wrap ul#menu_user li').on('click', 'a', function(e) {
        "use strict";
        var href = jQuery(this).attr('href');
        if (href===undefined) return;
        var pos = href.indexOf('#');
        if (pos < 0 || href.length == 1) return;
        if (jQuery(href.substr(pos)).length > 0) {
            var loc = window.location.href;
            var pos2 = loc.indexOf('#');
            if (pos2 > 0) loc = loc.substring(0, pos2);
            var now = pos==0;
            if (!now) now = loc == href.substring(0, pos);
            if (now) {
                themerex_document_animate_to(href.substr(pos));
                themerex_document_set_location(pos==0 ? loc + href : href);
                e.preventDefault();
                return false;
            }
        }
    });
    
    
    // Store height of the top panel
    THEMEREX_GLOBALS['top_panel_height'] = 0;   //Math.max(0, jQuery('.top_panel_wrap').height());

    // Forms validation
    //----------------------------------------------

    // Login form
    jQuery('.popup_form.login_form').submit(function(e){
        "use strict";
        var rez = themerex_login_validate(jQuery(this));
        if (!rez)
            e.preventDefault();
        return rez;
    });
    
    // Registration form
    jQuery('.popup_form.registration_form').submit(function(e){
        "use strict";
        var rez = themerex_registration_validate(jQuery(this));
        if (!rez)
            e.preventDefault();
        return rez;
    });

    // Comment form
    jQuery("form#commentform").submit(function(e) {
        "use strict";
        var rez = themerex_comments_validate(jQuery(this));
        if (!rez)
            e.preventDefault();
        return rez;
    });


    // Other settings
    //------------------------------------

    // Scroll to top button
    var scroll_to_top  ='<a href="#" class="scroll_to_top" title="Scroll to top">';
    scroll_to_top  +='    <span class="icon-up-open hover"></span>';
    scroll_to_top  +='    <span class="icon-up-open"></span>';
    scroll_to_top  +='</a>';
    jQuery('body').append(scroll_to_top);    
    jQuery('.scroll_to_top').on("click", function(e) {
        "use strict";
        jQuery('html,body').animate({
            scrollTop: 0
        }, 'slow');
        e.preventDefault();
        return false;
    });

    // Show system message
    themerex_show_system_message();

    // Init post format specific scripts
    themerex_init_post_formats();

    // Init shortcodes scripts
    themerex_init_shortcodes(jQuery('body').eq(0));

    // Init hidden elements (if exists)
    if (window.themerex_init_hidden_elements) themerex_init_hidden_elements(jQuery('body').eq(0));

    fitLargerHeight();
    
} //end ready




// Scroll actions
//==============================================

// Do actions when page scrolled
function themerex_scroll_actions() {
    "use strict";

    var scroll_offset = jQuery(window).scrollTop();
    var scroll_to_top_button = jQuery('.scroll_to_top');
    var adminbar_height = Math.max(0, jQuery('#wpadminbar').height());

    if (THEMEREX_GLOBALS['top_panel_height'] == 0)  THEMEREX_GLOBALS['top_panel_height'] = jQuery('.top_panel_wrap').height();

    // Call skin specific action (if exists)
    //----------------------------------------------
    if (window.themerex_skin_scroll_actions) themerex_skin_scroll_actions();


    // Scroll to top button show/hide
    if (scroll_offset > THEMEREX_GLOBALS['top_panel_height'])
        scroll_to_top_button.addClass('show');
    else
        scroll_to_top_button.removeClass('show');
    
    // Fix/unfix top panel
    if (!jQuery('body').hasClass('responsive_menu') && THEMEREX_GLOBALS['menu_fixed']) {
        var slider_height = 0;
        if (jQuery('.top_panel_below .slider_wrap').length > 0) {
            slider_height = jQuery('.top_panel_below .slider_wrap').height();
            if (slider_height < 10) {
                slider_height = jQuery('.slider_wrap').hasClass('.slider_fullscreen') ? jQuery(window).height() : THEMEREX_GLOBALS['slider_height'];
            }
        }
        if (scroll_offset <= slider_height + THEMEREX_GLOBALS['top_panel_height']) {
            if (jQuery('body').hasClass('top_panel_fixed')) {
                jQuery('body').removeClass('top_panel_fixed');
            }
        } else if (scroll_offset > slider_height + THEMEREX_GLOBALS['top_panel_height']) {
            if (!jQuery('body').hasClass('top_panel_fixed')) {
                jQuery('.top_panel_fixed_wrap').height(THEMEREX_GLOBALS['top_panel_height']);
                jQuery('.top_panel_wrap').css('marginTop', '-150px').animate({'marginTop': 0}, 500);
                jQuery('body').addClass('top_panel_fixed');
            }
        }
    }

    // TOC current items
    jQuery('#toc .toc_item').each(function() {
        "use strict";
        var id = jQuery(this).find('a').attr('href');
        var pos = id.indexOf('#');
        if (pos < 0 || id.length == 1) return;
        var loc = window.location.href;
        var pos2 = loc.indexOf('#');
        if (pos2 > 0) loc = loc.substring(0, pos2);
        var now = pos==0;
        if (!now) now = loc == href.substring(0, pos);
        if (!now) return;
        var off = jQuery(id).offset().top;
        var id_next  = jQuery(this).next().find('a').attr('href');
        var off_next = id_next ? jQuery(id_next).offset().top : 1000000;
        if (off < scroll_offset + jQuery(window).height()*0.8 && scroll_offset + THEMEREX_GLOBALS['top_panel_height'] < off_next)
            jQuery(this).addClass('current');
        else
            jQuery(this).removeClass('current');
    });
    
    // Parallax scroll
    themerex_parallax_scroll();
    
    // Scroll actions for shortcodes
    themerex_animation_shortcodes();
}


// Parallax scroll
function themerex_parallax_scroll(){
    jQuery('.sc_parallax').each(function(){
        var windowHeight = jQuery(window).height();
        var scrollTops = jQuery(window).scrollTop();
        var offsetPrx = Math.max(jQuery(this).offset().top, windowHeight);
        if ( offsetPrx <= scrollTops + windowHeight ) {
            var speed  = Number(jQuery(this).data('parallax-speed'));
            var xpos   = jQuery(this).data('parallax-x-pos');  
            var ypos   = Math.round((offsetPrx - scrollTops - windowHeight) * speed + (speed < 0 ? windowHeight*speed : 0));
            jQuery(this).find('.sc_parallax_content').css('backgroundPosition', xpos+' '+ypos+'px');
            // Uncomment next line if you want parallax video (else - video position is static)
            jQuery(this).find('div.sc_video_bg').css('top', ypos+'px');
        } 
    });
}





// Resize actions
//==============================================

// Do actions when page scrolled
function themerex_resize_actions() {
    "use strict";

    // block -> stylization (width = height)
    if(jQuery(window).width() >= 959) {
        jQuery('.sc_section.stylization > .sc_section_wrap').each(function () {
            var width = jQuery(this).width();
            jQuery(this).height(width);
        });
    }
    // Call skin specific action (if exists)
    //----------------------------------------------
    if (window.themerex_skin_resize_actions) themerex_skin_resize_actions();
    themerex_responsive_menu();
    themerex_resize_fullscreen_slider();
    fitLargerHeight();
}


// Check window size and do responsive menu
function themerex_responsive_menu() {
    if (themerex_is_responsive_need(THEMEREX_GLOBALS['menu_responsive'])) {
        if (!jQuery('body').hasClass('responsive_menu')) {
            jQuery('body').removeClass('top_panel_fixed').addClass('responsive_menu');
            jQuery('.menu_main_wrap .content_wrap').append(jQuery('.menu_main_wrap .menu_main_nav_area'));
            if (jQuery('body').hasClass('menu_relayout'))
                jQuery('body').removeClass('menu_relayout menu_left').addClass('menu_right');
            if (jQuery('ul.menu_main_nav').hasClass('inited')) {
                jQuery('ul.menu_main_nav').removeClass('inited').superfish('destroy');
            }
        }
    } else {
        if (jQuery('body').hasClass('responsive_menu')) {
            jQuery('body').removeClass('responsive_menu');
            jQuery('.menu_main_responsive').hide();
            themerex_init_sfmenu('ul.menu_main_nav');

            jQuery('.menu_main_wrap .menu_main').prepend(jQuery('.menu_main_wrap .menu_main_nav_area'));

            jQuery('.menu_main_nav_area').show();
        }
        if (themerex_is_responsive_need(THEMEREX_GLOBALS['menu_relayout'])) {
            if (jQuery('body').hasClass('menu_right')) {
                jQuery('body').removeClass('menu_right').addClass('menu_relayout menu_left');
                //THEMEREX_GLOBALS['top_panel_height'] = Math.max(0, jQuery('.top_panel_wrap').height());
            }
        } else {
            if (jQuery('body').hasClass('menu_relayout')) {
                jQuery('body').removeClass('menu_relayout menu_left').addClass('menu_right');
                //THEMEREX_GLOBALS['top_panel_height'] = Math.max(0, jQuery('.top_panel_wrap').height());
            }
        }
    }
    if (!jQuery('.menu_main_wrap').hasClass('menu_show')) jQuery('.menu_main_wrap').addClass('menu_show');
}


// Check if responsive menu need
function themerex_is_responsive_need(max_width) {
    "use strict";
    var rez = false;
    if (max_width > 0) {
        var w = window.innerWidth;
        if (w == undefined) {
            w = jQuery(window).width()+(jQuery(window).height() < jQuery(document).height() || jQuery(window).scrollTop() > 0 ? 16 : 0);
        }
        rez = max_width > w;
    }
    return rez;
}


// Resize Fullscreen Slider
function themerex_resize_fullscreen_slider() {
    var slider_wrap = jQuery('.slider_wrap.slider_fullscreen');
    if (slider_wrap.length < 1) 
        return;
    var slider = slider_wrap.find('.sc_slider_swiper');
    if (slider.length < 1) 
        return;
    var h = jQuery(window).height() - jQuery('#wpadminbar').height() - (jQuery('body').hasClass('top_panel_above') && !jQuery('body').hasClass('.top_panel_fixed') ? jQuery('.top_panel_wrap').height() : 0);
    slider.height(h);
}





// Navigation
//==============================================

// Init Superfish menu
function themerex_init_sfmenu(selector) {
    jQuery(selector).show().each(function() {
        if (themerex_is_responsive_need() && jQuery(this).attr('id')=='menu_main') return;
        jQuery(this).addClass('inited').superfish({
            delay: 200,
            animation: {
                opacity: 'show'
            },
            animationOut: {
                opacity: 'hide'
            },
            speed:      THEMEREX_GLOBALS['css_animation'] ? 300 : (THEMEREX_GLOBALS['menu_slider'] ? 300 : 200),
            speedOut:   THEMEREX_GLOBALS['css_animation'] ? 300 : (THEMEREX_GLOBALS['menu_slider'] ? 300 : 200),
            autoArrows: false,
            dropShadows: false,
            onBeforeShow: function(ul) {
                if (jQuery(this).parents("ul").length > 1){
                    var w = jQuery(window).width();  
                    var par_offset = jQuery(this).parents("ul").offset().left;
                    var par_width  = jQuery(this).parents("ul").outerWidth();
                    var ul_width   = jQuery(this).outerWidth();
                    if (par_offset+par_width+ul_width > w-20 && par_offset-ul_width > 0)
                        jQuery(this).addClass('submenu_left');
                    else
                        jQuery(this).removeClass('submenu_left');
                }
                if (THEMEREX_GLOBALS['css_animation']) {
                    jQuery(this).removeClass('animated fast '+THEMEREX_GLOBALS['menu_animation_out']);
                    jQuery(this).addClass('animated fast '+THEMEREX_GLOBALS['menu_animation_in']);
                }
            },
            onBeforeHide: function(ul) {
                if (THEMEREX_GLOBALS['css_animation']) {
                    jQuery(this).removeClass('animated fast '+THEMEREX_GLOBALS['menu_animation_in']);
                    jQuery(this).addClass('animated fast '+THEMEREX_GLOBALS['menu_animation_out']);
                }
            }
        });
    });
}


// Build page TOC from the tag's id
function themerex_build_page_toc() {
    "use strict";
    var toc = '', toc_count = 0;
    jQuery('[id^="toc_"],.sc_anchor').each(function(idx) {
        "use strict";
        var obj = jQuery(this);
        var id = obj.attr('id');
        var url = obj.data('url');
        var icon = obj.data('icon');
        if (!icon) icon = 'icon-record';
        var title = obj.attr('title');
        var description = obj.data('description');
        var separator = obj.data('separator');
        toc_count++;
        toc += '<div class="toc_item'+(separator=='yes' ? ' toc_separator' : '')+'">'
            +(description ? '<div class="toc_description">'+description+'</div>' : '')
            +'<a href="'+(url ? url : '#'+id)+'" class="toc_icon'+(title ? ' with_title' : '')+' '+icon+'">'+(title ? '<span class="toc_title">'+title+'</span>' : '')+'</a>'
            +'</div>';
    });
    if (toc_count > (THEMEREX_GLOBALS['toc_menu_home'] ? 1 : 0) + (THEMEREX_GLOBALS['toc_menu_top'] ? 1 : 0)) {
        if (jQuery('#toc').length > 0)
            jQuery('#toc .toc_inner').html(toc);
        else
            jQuery('body').append('<div id="toc" class="toc_'+THEMEREX_GLOBALS['toc_menu']+'"><div class="toc_inner">'+toc+'</div></div>');
    }
}




// Isotope
//=====================================================

// First init isotope containers
function themerex_init_isotope() {
    "use strict";

    // for alternative isotope
    jQuery(window).resize(resizeIsotopeAlternative);

    var all_images_complete = true;

    // Check if all images in isotope wrapper are loaded
    jQuery('.isotope_wrap:not(.inited)').each(function () {
        "use strict";
        all_images_complete = all_images_complete && themerex_check_images_complete(jQuery(this));
    });
    // Wait for images loading
    if (!all_images_complete && THEMEREX_GLOBALS['isotope_init_counter']++ < 30) {
        setTimeout(themerex_init_isotope, 200);
        return;
    }

    // Isotope filters handler
    jQuery('.isotope_filters:not(.inited)').addClass('inited').on('click', 'a', function(e) {
        "use strict";
        jQuery(this).parents('.isotope_filters').find('a').removeClass('active');
        jQuery(this).addClass('active');
    
        var selector = jQuery(this).data('filter');
        jQuery(this).parents('.isotope_filters').siblings('.isotope_wrap').eq(0).isotope({
            filter: selector
        });

        if (selector == '*')
            jQuery('#viewmore_link').fadeIn();
        else
            jQuery('#viewmore_link').fadeOut();

        e.preventDefault();
        return false;
    });

    // Init isotope script
    jQuery('.isotope_wrap:not(.inited)').each(function() {
        "use strict";

        var isotope_container = jQuery(this);

        // Init shortcodes
        themerex_init_shortcodes(isotope_container);

        // If in scroll container - no init isotope
        if (isotope_container.parents('.sc_scroll').length > 0) {
            isotope_container.addClass('inited').find('.isotope_item').animate({opacity: 1}, 200, function () { jQuery(this).addClass('isotope_item_show'); });
            return;
        }

        // for isotope alternative
        if (isotope_container.hasClass('alternative')) {
            setTimeout(function () {
                isotope_container.addClass('inited').isotope({
                    itemSelector: '.isotope_item',
                    masonry: {
                        columnWidth: 1
                    },
                    animationOptions: {
                        duration: 2000,
                        easing: 'linear',
                        queue: false
                    }
                });
                isotopeResizeGrid(isotope_container, isotope_container.find('.isotope_item'));
                // Show elements
                isotope_container.find('.isotope_item').animate({opacity: 1}, 200, function () {
                    jQuery(this).addClass('isotope_item_show');
                });

            }, 500);
        }

        // for all isotope
        else {
            setTimeout(function () {
                isotope_container.addClass('inited').isotope({
                    itemSelector: '.isotope_item',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false
                    }
                });

                // Show elements
                isotope_container.find('.isotope_item').animate({opacity: 1}, 200, function () {
                    jQuery(this).addClass('isotope_item_show');
                });

            }, 500);
        }

    });     
}

function themerex_init_appended_isotope(posts_container, filters) {
    "use strict";
    
    if (posts_container.parents('.sc_scroll_horizontal').length > 0) return;
    
    if (!themerex_check_images_complete(posts_container) && THEMEREX_GLOBALS['isotope_init_counter']++ < 30) {
        setTimeout(function() { themerex_init_appended_isotope(posts_container, filters); }, 200);
        return;
    }
    // Add filters
    var flt = posts_container.siblings('.isotope_filter');
    for (var i in filters) {
        if (flt.find('a[data-filter=".flt_'+i+'"]').length == 0) {
            flt.append('<a href="#" class="isotope_filters_button" data-filter=".flt_'+i+'">'+filters[i]+'</a>');
        }
    }
    // Init shortcodes in added elements
    themerex_init_shortcodes(posts_container);
    // Get added elements
    var elems = posts_container.find('.isotope_item:not(.isotope_item_show)');
    // Notify isotope about added elements with timeout
        // for alternative
        if(posts_container.hasClass('alternative')){
            resizeIsotopeAlternative();
        }
    setTimeout(function() {
        posts_container.isotope('appended', elems);
        // Show appended elements
        elems.animate({opacity: 1}, 200, function () { jQuery(this).addClass('isotope_item_show'); });
    }, 500);
}



// Post formats init
//=====================================================

function themerex_init_post_formats() {
    "use strict";

    // MediaElement init
    themerex_init_media_elements(jQuery('body'));
    
    // Isotope first init
    if (jQuery('.isotope_wrap:not(.inited)').length > 0) {
        THEMEREX_GLOBALS['isotope_init_counter'] = 0;
        themerex_init_isotope();
    }



    // Popup init
    if (THEMEREX_GLOBALS['popup_engine'] == 'pretty') {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'prettyPhoto'+(THEMEREX_GLOBALS['popup_gallery'] ? '[slideshow]' : ''));
        var images = jQuery("a[rel*='prettyPhoto']:not(.inited):not([data-rel*='pretty']):not([rel*='magnific']):not([data-rel*='magnific'])").addClass('inited');
        try {
            images.prettyPhoto({
                social_tools: '',
                theme: 'facebook',
                deeplinking: false
            });
        } catch (e) {};
    } else if (THEMEREX_GLOBALS['popup_engine']=='magnific') {
        jQuery("a[href$='jpg'],a[href$='jpeg'],a[href$='png'],a[href$='gif']").attr('rel', 'magnific');
        var images = jQuery("a[rel*='magnific']:not(.inited):not(.prettyphoto):not([rel*='pretty']):not([data-rel*='pretty'])").addClass('inited');
        try {
            images.magnificPopup({
                type: 'image',
                mainClass: 'mfp-img-mobile',
                closeOnContentClick: true,
                closeBtnInside: true,
                fixedContentPos: true,
                midClick: true,
                //removalDelay: 500, 
                preloader: true,
                tLoading: THEMEREX_GLOBALS['strings']['magnific_loading'],
                gallery:{
                    enabled: THEMEREX_GLOBALS['popup_gallery']
                },
                image: {
                    tError: THEMEREX_GLOBALS['strings']['magnific_error'],
                    verticalFit: true
                }
            });
        } catch (e) {};
    }


    // Add hover icon to products thumbnails
    jQuery(".post_item_product .product .images a.woocommerce-main-image:not(.hover_icon)").addClass('hover_icon hover_icon_view');


    // Likes counter
    if (jQuery('.post_counters_likes:not(.inited)').length > 0) {
        jQuery('.post_counters_likes:not(.inited)')
            .addClass('inited')
            .on("click", function(e) {
                var button = jQuery(this);
                var inc = button.hasClass('enabled') ? 1 : -1;
                var post_id = button.data('postid');
                var likes = Number(button.data('likes'))+inc;
                var cookie_likes = themerex_get_cookie('themerex_likes');
                if (cookie_likes === undefined || cookie_likes===null) cookie_likes = '';
                jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
                    action: 'post_counter',
                    nonce: THEMEREX_GLOBALS['ajax_nonce'],
                    post_id: post_id,
                    likes: likes
                }).done(function(response) {
                    var rez = JSON.parse(response);
                    if (rez.error === '') {
                        if (inc == 1) {
                            var title = button.data('title-dislike');
                            button.removeClass('enabled').addClass('disabled');
                            cookie_likes += (cookie_likes.substr(-1)!=',' ? ',' : '') + post_id + ',';
                        } else {
                            var title = button.data('title-like');
                            button.removeClass('disabled').addClass('enabled');
                            cookie_likes = cookie_likes.replace(','+post_id+',', ',');
                        }
                        button.data('likes', likes).attr('title', title).find('.post_counters_number').html(likes);
                        themerex_set_cookie('themerex_likes', cookie_likes, 365);
                    } else {
                        themerex_message_warning(THEMEREX_GLOBALS['strings']['error_like']);
                    }
                });
                e.preventDefault();
                return false;
            });
    }

    // Add video on thumb click
    if (jQuery('.sc_video_play_button:not(.inited)').length > 0) {
        jQuery('.sc_video_play_button:not(.inited)').each(function() {
            "use strict";
            jQuery(this)
                .addClass('inited')
                .animate({opacity: 1}, 1000)
                .on("click", function (e) {
                    "use strict";
                    if (!jQuery(this).hasClass('sc_video_play_button')) return;
                    var video = jQuery(this).removeClass('sc_video_play_button hover_icon_play').data('video');
                    if (video!=='') {
                        jQuery(this).empty().html(video);
                        var video_tag = jQuery(this).find('video');
                        var w = video_tag.width();
                        var h = video_tag.height();
                        themerex_init_media_elements(jQuery(this));
                        // Restore WxH attributes, because Chrome broke it!
                        jQuery(this).find('video').css({'width':w, 'height': h}).attr({'width':w, 'height': h});
                    }
                    e.preventDefault();
                    return false;
                });
        });
    }

    // Tribe Events buttons
    jQuery('a.tribe-events-read-more,.tribe-events-button,.tribe-events-nav-previous a,.tribe-events-nav-next a,.tribe-events-widget-link a,.tribe-events-viewmore a').addClass('sc_button sc_button_style_filled');
}


function themerex_init_media_elements(cont) {
    if (THEMEREX_GLOBALS['media_elements_enabled'] && cont.find('audio,video').length > 0) {
        if (window.mejs) {
            window.mejs.MepDefaults.enableAutosize = false;
            window.mejs.MediaElementDefaults.enableAutosize = false;
            cont.find('audio:not(.wp-audio-shortcode),video:not(.wp-video-shortcode)').each(function() {
                if (jQuery(this).parents('.mejs-mediaelement').length == 0) {
                    var media_tag = jQuery(this);
                    var settings = {
                        enableAutosize: true,
                        videoWidth: -1,     // if set, overrides <video width>
                        videoHeight: -1,    // if set, overrides <video height>
                        audioWidth: '100%', // width of audio player
                        audioHeight: 30,    // height of audio player
                        success: function(mejs) {
                            var autoplay, loop;
                            if ( 'flash' === mejs.pluginType ) {
                                autoplay = mejs.attributes.autoplay && 'false' !== mejs.attributes.autoplay;
                                loop = mejs.attributes.loop && 'false' !== mejs.attributes.loop;
                                autoplay && mejs.addEventListener( 'canplay', function () {
                                    mejs.play();
                                }, false );
                                loop && mejs.addEventListener( 'ended', function () {
                                    mejs.play();
                                }, false );
                            }
                            media_tag.parents('.sc_audio,.sc_video').addClass('inited sc_show');
                        }
                    };
                    jQuery(this).mediaelementplayer(settings);
                }
            });
        } else
            setTimeout(function() { themerex_init_media_elements(cont); }, 400);
    }
}

// Popups and system messages
//==============================================

// Show system message (bubble from previous page)
function themerex_show_system_message() {
/*  if (THEMEREX_GLOBALS['system_message']['message']) {
        if (THEMEREX_GLOBALS['system_message']['status'] == 'success')
            themerex_message_success(THEMEREX_GLOBALS['system_message']['message'], THEMEREX_GLOBALS['system_message']['header']);
        else if (THEMEREX_GLOBALS['system_message']['status'] == 'info')
            themerex_message_info(THEMEREX_GLOBALS['system_message']['message'], THEMEREX_GLOBALS['system_message']['header']);
        else if (THEMEREX_GLOBALS['system_message']['status'] == 'error' || THEMEREX_GLOBALS['system_message']['status'] == 'warning')
            themerex_message_warning(THEMEREX_GLOBALS['system_message']['message'], THEMEREX_GLOBALS['system_message']['header']);
    }*/
}

// Toggle popups
function themerex_toggle_popup(popup) {
    if (popup.css('display')!='none')
        themerex_hide_popup(popup);
    else
        themerex_show_popup(popup);
}

// Show popups
function themerex_show_popup(popup) {
    if (popup.css('display')=='none') {
        if (THEMEREX_GLOBALS['css_animation'])
            popup.show().removeClass('animated fast '+THEMEREX_GLOBALS['menu_animation_out']).addClass('animated fast '+THEMEREX_GLOBALS['menu_animation_in']);
        else
            popup.slideDown();
    }
}

// Hide popups
function themerex_hide_popup(popup) {
    if (popup.css('display')!='none') {
        if (THEMEREX_GLOBALS['css_animation'])
            popup.removeClass('animated fast '+THEMEREX_GLOBALS['menu_animation_in']).addClass('animated fast '+THEMEREX_GLOBALS['menu_animation_out']).delay(500).hide();
        else
            popup.fadeOut();
    }
}

// Popup messages
//-----------------------------------------------------------------
jQuery(document).ready(function(){
    "use strict";

    THEMEREX_GLOBALS['message_callback'] = null;
    THEMEREX_GLOBALS['message_timeout'] = 5000;

    jQuery('body').on('click', '#themerex_modal_bg,.themerex_message .themerex_message_close', function (e) {
        "use strict";
        themerex_message_destroy();
        if (THEMEREX_GLOBALS['message_callback']) {
            THEMEREX_GLOBALS['message_callback'](0);
            THEMEREX_GLOBALS['message_callback'] = null;
        }
        e.preventDefault();
        return false;
    });
});


// Warning
function themerex_message_warning(msg) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var icon = arguments[2] ? arguments[2] : 'cancel-1';
    var delay = arguments[3] ? arguments[3] : THEMEREX_GLOBALS['message_timeout'];
    return themerex_message({
        msg: msg,
        hdr: hdr,
        icon: icon,
        type: 'warning',
        delay: delay,
        buttons: [],
        callback: null
    });
}

// Success
function themerex_message_success(msg) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var icon = arguments[2] ? arguments[2] : 'check-1';
    var delay = arguments[3] ? arguments[3] : THEMEREX_GLOBALS['message_timeout'];
    return themerex_message({
        msg: msg,
        hdr: hdr,
        icon: icon,
        type: 'success',
        delay: delay,
        buttons: [],
        callback: null
    });
}

// Info
function themerex_message_info(msg) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var icon = arguments[2] ? arguments[2] : 'info-1';
    var delay = arguments[3] ? arguments[3] : THEMEREX_GLOBALS['message_timeout'];
    return themerex_message({
        msg: msg,
        hdr: hdr,
        icon: icon,
        type: 'info',
        delay: delay,
        buttons: [],
        callback: null
    });
}

// Regular
function themerex_message_regular(msg) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var icon = arguments[2] ? arguments[2] : 'quote-1';
    var delay = arguments[3] ? arguments[3] : THEMEREX_GLOBALS['message_timeout'];
    return themerex_message({
        msg: msg,
        hdr: hdr,
        icon: icon,
        type: 'regular',
        delay: delay,
        buttons: [],
        callback: null
    });
}

// Confirm dialog
function themerex_message_confirm(msg) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var callback = arguments[2] ? arguments[2] : null;
    return themerex_message({
        msg: msg,
        hdr: hdr,
        icon: 'help',
        type: 'regular',
        delay: 0,
        buttons: ['Yes', 'No'],
        callback: callback
    });
}

// Modal dialog
function themerex_message_dialog(content) {
    "use strict";
    var hdr  = arguments[1] ? arguments[1] : '';
    var init = arguments[2] ? arguments[2] : null;
    var callback = arguments[3] ? arguments[3] : null;
    return themerex_message({
        msg: content,
        hdr: hdr,
        icon: '',
        type: 'regular',
        delay: 0,
        buttons: ['Apply', 'Cancel'],
        init: init,
        callback: callback
    });
}

// General message window
function themerex_message(opt) {
    "use strict";
    var msg = opt.msg != undefined ? opt.msg : '';
    var hdr  = opt.hdr != undefined ? opt.hdr : '';
    var icon = opt.icon != undefined ? opt.icon : '';
    var type = opt.type != undefined ? opt.type : 'regular';
    var delay = opt.delay != undefined ? opt.delay : THEMEREX_GLOBALS['message_timeout'];
    var buttons = opt.buttons != undefined ? opt.buttons : [];
    var init = opt.init != undefined ? opt.init : null;
    var callback = opt.callback != undefined ? opt.callback : null;
    // Modal bg
    jQuery('#themerex_modal_bg').remove();
    jQuery('body').append('<div id="themerex_modal_bg"></div>');
    jQuery('#themerex_modal_bg').fadeIn();
    // Popup window
    jQuery('.themerex_message').remove();
    var html = '<div class="themerex_message themerex_message_' + type + (buttons.length > 0 ? ' themerex_message_dialog' : '') + '">'
        + '<span class="themerex_message_close iconadmin-cancel icon-cancel-1"></span>'
        + (icon ? '<span class="themerex_message_icon iconadmin-'+icon+' icon-'+icon+'"></span>' : '')
        + (hdr ? '<h2 class="themerex_message_header">'+hdr+'</h2>' : '');
    html += '<div class="themerex_message_body">' + msg + '</div>';
    if (buttons.length > 0) {
        html += '<div class="themerex_message_buttons">';
        for (var i=0; i<buttons.length; i++) {
            html += '<span class="themerex_message_button">'+buttons[i]+'</span>';
        }
        html += '</div>';
    }
    html += '</div>';
    // Add popup to body
    jQuery('body').append(html);
    var popup = jQuery('body .themerex_message').eq(0);
    // Prepare callback on buttons click
    if (callback != null) {
        THEMEREX_GLOBALS['message_callback'] = callback;
        jQuery('.themerex_message_button').on("click", function(e) {
            "use strict";
            var btn = jQuery(this).index();
            callback(btn+1, popup);
            THEMEREX_GLOBALS['message_callback'] = null;
            themerex_message_destroy();
        });
    }
    // Call init function
    if (init != null) init(popup);
    // Show (animate) popup
    var top = jQuery(window).scrollTop();
    jQuery('body .themerex_message').animate({top: top+Math.round((jQuery(window).height()-jQuery('.themerex_message').height())/2), opacity: 1}, {complete: function () {
        // Call init function
        //if (init != null) init(popup);
    }});
    // Delayed destroy (if need)
    if (delay > 0) {
        setTimeout(function() { themerex_message_destroy(); }, delay);
    }
    return popup;
}

// Destroy message window
function themerex_message_destroy() {
    "use strict";
    var top = jQuery(window).scrollTop();
    jQuery('#themerex_modal_bg').fadeOut();
    jQuery('.themerex_message').animate({top: top-jQuery('.themerex_message').height(), opacity: 0});
    setTimeout(function() { jQuery('#themerex_modal_bg').remove(); jQuery('.themerex_message').remove(); }, 500);
}

// Forms validation
//-------------------------------------------------------


// Comments form
function themerex_comments_validate(form) {
    "use strict";
    form.find('input').removeClass('error_fields_class');
    var error = themerex_form_validate(form, {
        error_message_text: THEMEREX_GLOBALS['strings']['error_global'],    // Global error message text (if don't write in checked field)
        error_message_show: true,                                   // Display or not error message
        error_message_time: 4000,                                   // Error message display time
        error_message_class: 'sc_infobox sc_infobox_style_error',   // Class appended to error message block
        error_fields_class: 'error_fields_class',                   // Class appended to error fields
        exit_after_first_error: false,                              // Cancel validation and exit after first error
        rules: [
            {
                field: 'author',
                min_length: { value: 1, message: THEMEREX_GLOBALS['strings']['name_empty']},
                max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['name_long']}
            },
            {
                field: 'email',
                min_length: { value: 7, message: THEMEREX_GLOBALS['strings']['email_empty']},
                max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['email_long']},
                mask: { value: THEMEREX_GLOBALS['email_mask'], message: THEMEREX_GLOBALS['strings']['email_not_valid']}
            },
            {
                field: 'comment',
                min_length: { value: 1, message: THEMEREX_GLOBALS['strings']['text_empty'] },
                max_length: { value: THEMEREX_GLOBALS['comments_maxlength'], message: THEMEREX_GLOBALS['strings']['text_long']}
            }
        ]
    });
    return !error;
}


// Login form
function themerex_login_validate(form) {
    "use strict";
    form.find('input').removeClass('error_fields_class');
    var error = themerex_form_validate(form, {
        error_message_show: true,
        error_message_time: 4000,
        error_message_class: 'sc_infobox sc_infobox_style_error',
        error_fields_class: 'error_fields_class',
        exit_after_first_error: true,
        rules: [
            {
                field: "log",
                min_length: { value: 1, message: THEMEREX_GLOBALS['strings']['login_empty'] },
                max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['login_long'] }
            },
            {
                field: "pwd",
                min_length: { value: 4, message: THEMEREX_GLOBALS['strings']['password_empty'] },
                max_length: { value: 30, message: THEMEREX_GLOBALS['strings']['password_long'] }
            }
        ]
    });
    return !error;
}


// Registration form 
function themerex_registration_validate(form) {
    "use strict";
    form.find('input').removeClass('error_fields_class');
    var error = themerex_form_validate(form, {
        error_message_show: true,
        error_message_time: 4000,
        error_message_class: "sc_infobox sc_infobox_style_error",
        error_fields_class: "error_fields_class",
        exit_after_first_error: true,
        rules: [
            {
                field: "registration_username",
                min_length: { value: 1, message: THEMEREX_GLOBALS['strings']['login_empty'] },
                max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['login_long'] }
            },
            {
                field: "registration_email",
                min_length: { value: 7, message: THEMEREX_GLOBALS['strings']['email_empty'] },
                max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['email_long'] },
                mask: { value: THEMEREX_GLOBALS['email_mask'], message: THEMEREX_GLOBALS['strings']['email_not_valid'] }
            },
            {
                field: "registration_pwd",
                min_length: { value: 4, message: THEMEREX_GLOBALS['strings']['password_empty'] },
                max_length: { value: 30, message: THEMEREX_GLOBALS['strings']['password_long'] }
            },
            {
                field: "registration_pwd2",
                equal_to: { value: 'registration_pwd', message: THEMEREX_GLOBALS['strings']['password_not_equal'] }
            }
        ]
    });
    if (!error) {
        jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
            action: 'registration_user',
            nonce: THEMEREX_GLOBALS['ajax_nonce'],
            user_name:  form.find('#registration_username').val(),
            user_email: form.find('#registration_email').val(),
            user_pwd:   form.find('#registration_pwd').val()
        }).done(function(response) {
            var rez = JSON.parse(response);
            var result_box = form.find('.result');
            if (result_box.length==0) result_box = form.siblings('.result');
            result_box.toggleClass('sc_infobox_style_error', false).toggleClass('sc_infobox_style_success', false);
            if (rez.error === '') {
                result_box.addClass('sc_infobox sc_infobox_style_success').html(THEMEREX_GLOBALS['strings']['registration_success']);
                setTimeout(function() { 
                    jQuery('.popup_login_link').trigger('click'); 
                    }, 3000);
            } else {
                result_box.addClass('sc_infobox sc_infobox_style_error').html(THEMEREX_GLOBALS['strings']['registration_failed'] + ' ' + rez.error);
            }
            result_box.fadeIn().delay(3000).fadeOut();
        });
    }
    return false;
}


// Contact form handlers
function themerex_contact_form_validate(form){
    "use strict";
    var url = form.attr('action');
    if (url == '') return false;
    form.find('input').removeClass('error_fields_class');
    var error = false;
    var form_custom = form.data('formtype')=='custom';
    var form_type = form.data('formtype');

    if(form_type == 'order'){
        error = themerex_form_validate(form, {
            error_message_show: true,
            error_message_time: 8000,
            error_message_class: "sc_infobox sc_infobox_style_error",
            error_fields_class: "error_fields_class",
            exit_after_first_error: false,
            rules: [
                {
                    field: "email",
                    min_length: { value: 7,  message: THEMEREX_GLOBALS['strings']['email_empty'] },
                    max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['email_long'] },
                    mask: { value: THEMEREX_GLOBALS['email_mask'], message: THEMEREX_GLOBALS['strings']['email_not_valid'] }
                },
                {
                    field: "username",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['username_empty'] }
                },
                {
                    field: "username2",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['username2_empty'] }
                },
                {
                    field: "company",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['company_empty'] }
                },
                {
                    field: "address",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['address_empty'] }
                },
                {
                    field: "city",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['city_empty'] }
                },
                {
                    field: "zip",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['zip_empty'] }
                },
                {
                    field: "phone",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['phone_empty'] }
                },
                {
                    field: "pieces",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['pieces_empty'] }
                },
                {
                    field: "weight",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['weight_empty'] }
                },
                {
                    field: "height",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['height_empty'] }
                },
                {
                    field: "width",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['width_empty'] }
                },
                {
                    field: "depth",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['height_empty'] }
                },
                {
                    field: "commodity",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['commodity_empty'] }
                }
            ]
        });
    }

    else if (!form_custom) {
        error = themerex_form_validate(form, {
            error_message_show: true,
            error_message_time: 4000,
            error_message_class: "sc_infobox sc_infobox_style_error",
            error_fields_class: "error_fields_class",
            exit_after_first_error: false,
            rules: [
                {
                    field: "username",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['name_empty'] },
                    max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['name_long'] }
                },
                {
                    field: "email",
                    min_length: { value: 7,  message: THEMEREX_GLOBALS['strings']['email_empty'] },
                    max_length: { value: 60, message: THEMEREX_GLOBALS['strings']['email_long'] },
                    mask: { value: THEMEREX_GLOBALS['email_mask'], message: THEMEREX_GLOBALS['strings']['email_not_valid'] }
                },
                {
                    field: "subject",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['subject_empty'] },
                    max_length: { value: 100, message: THEMEREX_GLOBALS['strings']['subject_long'] }
                },
                {
                    field: "message",
                    min_length: { value: 1,  message: THEMEREX_GLOBALS['strings']['text_empty'] },
                    max_length: { value: THEMEREX_GLOBALS['contacts_maxlength'], message: THEMEREX_GLOBALS['strings']['text_long'] }
                }
            ]
        });
    }
    if (!error && url!='#') {
        form.find(".result").toggleClass("sc_infobox_style_error", false).toggleClass("sc_infobox_style_success", false);
        /*jQuery.post(url, {
            action: "send_contact_form",
            nonce: THEMEREX_GLOBALS['ajax_nonce'],
            //type: form_custom ? 'custom' : 'contact',
            type: form_type,
            data: form.serialize()
        }).done(function(response) {
            "use strict";
            console.log(response);
            var rez = JSON.parse(response);
            var result = form.find(".result").toggleClass("sc_infobox_style_error", false).toggleClass("sc_infobox_style_success", false);
            if (rez.error === '') {
                form.get(0).reset();
                if(form_type=='order')
                    result.addClass("sc_infobox_style_success").html(THEMEREX_GLOBALS['strings']['send_order_complete']);
                else
                    result.addClass("sc_infobox_style_success").html(THEMEREX_GLOBALS['strings']['send_complete']);
            } else {
                result.addClass("sc_infobox_style_error").html(THEMEREX_GLOBALS['strings']['send_error'] + ' ' + rez.error);
            }
            result.fadeIn().delay(3000).fadeOut();
        });*/

    }
    /*return !error;*/
}

function themerex_contact_form_send(){
    jQuery('form.contact-form').on('submit', function( e ){
        e.preventDefault();
        var $form = jQuery(this);
        /*jQuery($form).find('span.contact-form-respond').remove();*/
        //checking on empty values
        /*var formFields = $form.serializeArray();
        for (var i = formFields.length - 1; i >= 0; i--) {
            if (!formFields[i].value.length) {
                $form.find('[name="' + formFields[i].name + '"]').addClass('invalid').on('focus', function(){jQuery(this).removeClass('invalid')});
            };
        };*/
        //if one of form fields is empty - exit
        if ($form.find('.result').hasClass('sc_infobox_style_error')) {
            $form.find('.result').removeClass('sc_infobox_style_success');
            return;
        };
        //sending form data to PHP server if fields are not empty
        $form.find('.result').removeClass('sc_infobox_style_error');
        $form.find('.result').css('display', "block");
        var request = $form.serialize();
        var ajax = jQuery.post( "include/sendmail.php", request )
            .done(function( data ) {
                //jQuery($form).find('[type="submit"]').attr('disabled', false).parent().addClass("sc_infobox_style_success").html(THEMEREX_GLOBALS['strings']['send_complete']);
                jQuery($form).find('.result').addClass("sc_infobox_style_success").html(THEMEREX_GLOBALS['strings']['send_complete']);
        })
            .fail(function( data ) {
                jQuery($form).find('.result').addClass("sc_infobox_style_error").html(THEMEREX_GLOBALS['strings']['send_error']);
        })
        jQuery('.result').fadeIn().delay(3000).fadeOut();
    });
}




//isotope grid resize
function isotopeResizeGrid(itemWrap,item){
    "use strict";

    var isotopeWrap = itemWrap;
    var isotopeItem = item;
    var isotopeItemWidth = 300;
    var isotopeItemHeight = 300;

    if(jQuery(window).width() < 800){
        var isotopeItemWidth = 120;
        var isotopeItemHeight = 120;
    }
    else if(jQuery(window).width() < 1023){
        var isotopeItemWidth = 200;
        var isotopeItemHeight = 200;
    }

    if(jQuery(window).width() > 480) {
        isotopeItem.each(function () {
            var w = jQuery(this).data('width');
            var h = jQuery(this).data('height');
            jQuery(this).css('width', Math.floor(isotopeWrap.width() / Math.floor(isotopeWrap.width() / isotopeItemWidth)) * w);
            jQuery(this).css('height', Math.floor(isotopeWrap.width() / Math.floor(isotopeWrap.width() / isotopeItemHeight)) * h);
        });
    }
    itemWrap.isotope('layout');
}





// Resize new Isotope elements
function resizeIsotopeAlternative() {
    jQuery('.isotope_wrap').each(function () {
        "use strict";
        if(jQuery(this).hasClass('alternative')){
            var isotopeEll = jQuery(this).find('.isotope_item');
            isotopeResizeGrid(jQuery(this),isotopeEll);
        }
    });
}



// Fit height to the larger value of child elements
function fitLargerHeight() {
    if (jQuery('.autoHeight.columns_wrap').length > 0) {
        jQuery('.autoHeight.columns_wrap').each(function () {
            "use strict";
            var tallestcolumn = 0;
            var columns = jQuery(this).children("div");
            columns.css({"height":"auto"});
            columns.each(
                function () {
                    var currentHeight = jQuery(this).height();
                    if (currentHeight > tallestcolumn) {
                        tallestcolumn = currentHeight;
                    }
                }
            );
            if(jQuery(this).find('.sc_accordion').length > 0 ){
                columns.css({"min-height":tallestcolumn});
            }
            else{ columns.height(tallestcolumn); }
        });
    }
}

// Document ready actions for shortcodes
jQuery(document).ready(function(){
    "use strict";
    setTimeout(themerex_animation_shortcodes, 600);
});


// Animation
function themerex_animation_shortcodes() {
    jQuery('[data-animation^="animated"]:not(.animated)').each(function() {
        "use strict";
        if (jQuery(this).offset().top < jQuery(window).scrollTop() + jQuery(window).height())
            jQuery(this).addClass(jQuery(this).data('animation'));
    });
}


// Shortcodes init
function themerex_init_shortcodes(container) {

    // Accordion
    if (container.find('.sc_accordion:not(.inited)').length > 0) {
        container.find(".sc_accordion:not(.inited)").each(function () {
            "use strict";
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);
            jQuery(this)
                .addClass('inited')
                .accordion({
                    active: init,
                    heightStyle: "content",
                    header: "> .sc_accordion_item > .sc_accordion_title",
                    create: function (event, ui) {
                        themerex_init_shortcodes(ui.panel);
                        if (window.themerex_init_hidden_elements) themerex_init_hidden_elements(ui.panel);
                        ui.header.each(function () {
                            jQuery(this).parent().addClass('sc_active');
                        });
                    },
                    activate: function (event, ui) {
                        themerex_init_shortcodes(ui.newPanel);
                        if (window.themerex_init_hidden_elements) themerex_init_hidden_elements(ui.newPanel);
                        ui.newHeader.each(function () {
                            jQuery(this).parent().addClass('sc_active');
                        });
                        ui.oldHeader.each(function () {
                            jQuery(this).parent().removeClass('sc_active');
                        });
                    }
                });
        });
    }

    // Contact form
    if (container.find('.sc_contact_form:not(.inited) form').length > 0) {
        container.find(".sc_contact_form:not(.inited) form")
            .addClass('inited')
            .submit(function(e) {
                "use strict";
                themerex_contact_form_validate(jQuery(this));
                e.preventDefault();
                return false;
            });
    }

    // Emailer form
    if (container.find('.sc_emailer:not(.inited)').length > 0) {
        container.find(".sc_emailer:not(.inited)")
            .addClass('inited')
            .find('.sc_emailer_button')
            .on("click", function(e) {
                "use strict";
                var form = jQuery(this).parents('form');
                var parent = jQuery(this).parents('.sc_emailer');
                if (parent.hasClass('sc_emailer_opened')) {
                    if (form.length>0 && form.find('input').val()!='') {
                        var group = jQuery(this).data('group');
                        var email = form.find('input').val();
                        var regexp = new RegExp(THEMEREX_GLOBALS['email_mask']);
                        if (!regexp.test(email)) {
                            form.find('input').get(0).focus();
                            themerex_message_warning(THEMEREX_GLOBALS['strings']['email_not_valid']);
                        } else {
                            jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
                                action: 'emailer_submit',
                                nonce: THEMEREX_GLOBALS['ajax_nonce'],
                                group: group,
                                email: email
                            }).done(function(response) {
                                var rez = JSON.parse(response);
                                if (rez.error === '') {
                                    themerex_message_info(THEMEREX_GLOBALS['strings']['email_confirm'].replace('%s', email));
                                    form.find('input').val('');
                                } else {
                                    themerex_message_warning(rez.error);
                                }
                            });
                        }
                    } else
                        form.get(0).submit();
                } else {
                    parent.addClass('sc_emailer_opened');
                }
                e.preventDefault();
                return false;
            });
    }

    // Googlemap init
    if (container.find('.sc_googlemap:not(.inited)').length > 0) {
        container.find('.sc_googlemap:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                var map = jQuery(this).addClass('inited');
                var map_id      = map.attr('id');
                var map_zoom    = map.data('zoom');
                var map_style   = map.data('style');
                var map_markers = [];
                map.find('.sc_googlemap_marker').each(function() {
                    "use strict";
                    var marker = jQuery(this);
                    map_markers.push({
                        point:          marker.data('point'),
                        address:        marker.data('address'),
                        latlng:         marker.data('latlng'),
                        description:    marker.data('description'),
                        title:          marker.data('title')
                    });
                });
                themerex_googlemap_init( jQuery('#'+map_id).get(0), {style: map_style, zoom: map_zoom, markers: map_markers});
            });
    }

    
    // Infoboxes
    if (container.find('.sc_infobox.sc_infobox_closeable:not(.inited)').length > 0) {
        container.find('.sc_infobox.sc_infobox_closeable:not(.inited)')
            .addClass('inited')
            .on("click", function () {
                jQuery(this).slideUp();
            });
    }

    // Popup links
    if (container.find('.popup_link:not(.inited)').length > 0) {
        container.find('.popup_link:not(.inited)')
            .addClass('inited')
            .magnificPopup({
                type: 'inline',
                removalDelay: 500,
                midClick: true,
                callbacks: {
                    beforeOpen: function () {
                        this.st.mainClass = 'mfp-zoom-in';
                    },
                    open: function() {},
                    close: function() {}
                }
            });
    }


    // Search form
    if (container.find('.search_wrap:not(.inited)').length > 0) {
        container.find('.search_wrap:not(.inited)').each(function() {
            jQuery(this).addClass('inited');
            jQuery(this).find('.search_submit').on("click", function(e) {
                "use strict";
                var search_wrap = jQuery(this).parents('.search_wrap');
                if (!search_wrap.hasClass('search_fixed')) {
                    if (search_wrap.hasClass('search_opened')) {
                        if (search_wrap.find('.search_field').val() != '')
                            search_wrap.find('form').get(0).submit();
                        else {
                            search_wrap.animate({'width': '30px'}, 200, function() {
                                if (search_wrap.parents('.top_panel_wrap').length > 0)
                                    search_wrap.parents('.top_panel_wrap').removeClass('search_opened');
                            });
                            search_wrap.find('.search_results').fadeOut();
                            search_wrap.removeClass('search_opened');
                        }
                    } else {
                        search_wrap.animate({'width': '140px'}, 300, function() {
                            search_wrap.addClass('search_opened');
                            jQuery(this).find('.search_field').get(0).focus();
                        });
                        if (search_wrap.parents('.top_panel_wrap').length > 0)
                            search_wrap.parents('.top_panel_wrap').addClass('search_opened');
                    }
                } else {
                    if (search_wrap.find('.search_field').val() != '')
                        search_wrap.find('form').get(0).submit();
                    else {
                        search_wrap.find('.search_field').val('');
                        search_wrap.find('.search_results').fadeOut();
                    }
                }
                e.preventDefault();
                return false;
            });
            jQuery(this).find('.search_results_close').on("click", function(e) {
                "use strict";
                jQuery(this).parent().fadeOut();
                e.preventDefault();
                return false;
            });
            jQuery(this).on('click', '.post_more', function(e) {
                "use strict";
                if (jQuery(this).parents('.search_wrap').find('.search_field').val() != '')
                    jQuery(this).parents('.search_wrap').find('form').get(0).submit();
                e.preventDefault();
                return false;
            });
            if (jQuery(this).hasClass('search_ajax')) {
                var ajax_timer = null;
                jQuery(this).find('.search_field').keyup(function(e) {
                    "use strict";
                    var search_field = jQuery(this);
                    var s = search_field.val();
                    if (ajax_timer) {
                        clearTimeout(ajax_timer);
                        ajax_timer = null;
                    }
                    if (s.length >= THEMEREX_GLOBALS['ajax_search_min_length']) {
                        ajax_timer = setTimeout(function() {
                            jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
                                action: 'ajax_search',
                                nonce: THEMEREX_GLOBALS['ajax_nonce'],
                                text: s
                            }).done(function(response) {
                                clearTimeout(ajax_timer);
                                ajax_timer = null;
                                var rez = JSON.parse(response);
                                if (rez.error === '') {
                                    search_field.parents('.search_ajax').find('.search_results_content').empty().append(rez.data);
                                    search_field.parents('.search_ajax').find('.search_results').fadeIn();
                                } else {
                                    themerex_message_warning(THEMEREX_GLOBALS['strings']['search_error']);
                                }
                            });
                        }, THEMEREX_GLOBALS['ajax_search_delay']);
                    }
                });
            }
        });
    }

    
    //Scroll
    if (container.find('.sc_scroll:not(.inited)').length > 0) {
        container.find('.sc_scroll:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                THEMEREX_GLOBALS['scroll_init_counter'] = 0;
                themerex_init_scroll_area(jQuery(this));
            });
    }


    // Swiper Slider
    if (container.find('.sc_slider_swiper:not(.inited)').length > 0) {
        container.find('.sc_slider_swiper:not(.inited)')
            .each(function () {
                "use strict";
                if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
                //if (jQuery(this).parents('.isotope_wrap:not(.inited)').length > 0) return;
                jQuery(this).addClass('inited');
                themerex_slider_autoheight(jQuery(this));
                if (jQuery(this).parents('.sc_slider_pagination_area').length > 0) {
                    jQuery(this).parents('.sc_slider_pagination_area').find('.sc_slider_pagination .post_item').eq(0).addClass('active');
                }
                var id = jQuery(this).attr('id');
                if (id == undefined) {
                    id = 'swiper_'+Math.random();
                    id = id.replace('.', '');
                    jQuery(this).attr('id', id);
                }
                jQuery(this).addClass(id);
                jQuery(this).find('.slides .swiper-slide').css('position', 'relative');
                if (THEMEREX_GLOBALS['swipers'] === undefined) THEMEREX_GLOBALS['swipers'] = {};
                THEMEREX_GLOBALS['swipers'][id] = new Swiper('.'+id, {
                    calculateHeight: !jQuery(this).hasClass('sc_slider_height_fixed'),
                    resizeReInit: true,
                    autoResize: true,
                    loop: true,
                    grabCursor: true,
                    pagination: jQuery(this).hasClass('sc_slider_pagination') ? '#'+id+' .sc_slider_pagination_wrap' : false,
                    paginationClickable: true,
                    autoplay: jQuery(this).hasClass('sc_slider_noautoplay') ? false : (isNaN(jQuery(this).data('interval')) ? 7000 : jQuery(this).data('interval')),
                    autoplayDisableOnInteraction: false,
                    initialSlide: 0,
                    speed: 600,
                    // Autoheight on start
                    onFirstInit: function (slider){
                        var cont = jQuery(slider.container);
                        if (!cont.hasClass('sc_slider_height_auto')) return;
                        var li = cont.find('.swiper-slide').eq(1);
                        var h = li.data('height_auto');
                        if (h > 0) {
                            var pt = parseInt(li.css('paddingTop'), 10), pb = parseInt(li.css('paddingBottom'), 10);
                            li.height(h);
                            cont.height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                            cont.find('.swiper-wrapper').height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                        }
                    },
                    // Autoheight on slide change
                    onSlideChangeStart: function (slider){
                        var cont = jQuery(slider.container);
                        if (!cont.hasClass('sc_slider_height_auto')) return;
                        var idx = slider.activeIndex;
                        var li = cont.find('.swiper-slide').eq(idx);
                        var h = li.data('height_auto');
                        if (h > 0) {
                            var pt = parseInt(li.css('paddingTop'), 10), pb = parseInt(li.css('paddingBottom'), 10);
                            li.height(h);
                            cont.height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                            cont.find('.swiper-wrapper').height(h + (isNaN(pt) ? 0 : pt) + (isNaN(pb) ? 0 : pb));
                        }
                    },
                    // Change current item in 'full' or 'over' pagination wrap
                    onSlideChangeEnd: function (slider, dir) {
                        var cont = jQuery(slider.container);
                        if (cont.parents('.sc_slider_pagination_area').length > 0) {
                            var li = cont.parents('.sc_slider_pagination_area').find('.sc_slider_pagination .post_item');
                            var idx = slider.activeIndex > li.length ? 0 : slider.activeIndex-1;
                            themerex_change_active_pagination_in_slider(cont, idx);
                        }
                    }
                });
                
                jQuery(this).data('settings', {mode: 'horizontal'});        // VC hook
                
                var curSlide = jQuery(this).find('.slides').data('current-slide');
                if (curSlide > 0)
                    THEMEREX_GLOBALS['swipers'][id].swipeTo(curSlide-1);
                themerex_prepare_slider_navi(jQuery(this));
            });
    }

    //Skills init
    if (container.find('.sc_skills_item:not(.inited)').length > 0) {
        themerex_init_skills(container);
        jQuery(window).scroll(function () { themerex_init_skills(container); });
    }

    // Tabs
    if (container.find('.sc_tabs:not(.inited),.tabs_area:not(.inited)').length > 0) {
        container.find('.sc_tabs:not(.inited),.tabs_area:not(.inited)').each(function () {
            var init = jQuery(this).data('active');
            if (isNaN(init)) init = 0;
            else init = Math.max(0, init);
            jQuery(this)
                .addClass('inited')
                .tabs({
                    active: init,
                    show: {
                        effect: 'fadeIn',
                        duration: 300
                    },
                    hide: {
                        effect: 'fadeOut',
                        duration: 300
                    },
                    create: function (event, ui) {
                        themerex_init_shortcodes(ui.panel);
                        if (window.themerex_init_hidden_elements) themerex_init_hidden_elements(ui.panel);
                    },
                    activate: function (event, ui) {
                        themerex_init_shortcodes(ui.newPanel);
                        if (window.themerex_init_hidden_elements) themerex_init_hidden_elements(ui.newPanel);
                    }
                });
        });
    }

}



// Scrolled areas
function themerex_init_scroll_area(obj) {

    // Wait for images loading
    if (!themerex_check_images_complete(obj) && THEMEREX_GLOBALS['scroll_init_counter']++ < 30) {
        setTimeout(function() { themerex_init_scroll_area(obj); }, 200);
        return;
    }

    // Start init scroll area
    obj.addClass('inited');
    var id = obj.attr('id');
    if (id == undefined) {
        id = 'scroll_'+Math.random();
        id = id.replace('.', '');
        obj.attr('id', id);
    }
    obj.addClass(id);
    var bar = obj.find('#'+id+'_bar');
    if (bar.length > 0 && !bar.hasClass(id+'_bar')) {
        bar.addClass(id+'_bar');
    }

    // Init Swiper with scroll plugin
    if (THEMEREX_GLOBALS['swipers'] === undefined) THEMEREX_GLOBALS['swipers'] = {};
    THEMEREX_GLOBALS['swipers'][id] = new Swiper('.'+id, {
        calculateHeight: false,
        resizeReInit: true,
        autoResize: true,
        
        freeMode: true,
        freeModeFluid: true,
        grabCursor: true,
        noSwiping: obj.hasClass('scroll-no-swiping'),
        mode: obj.hasClass('sc_scroll_vertical') ? 'vertical' : 'horizontal',
        slidesPerView: obj.hasClass('sc_scroll') ? 'auto' : 1,
        mousewheelControl: true,
        mousewheelAccelerator: 4,   // Accelerate mouse wheel in Firefox 4+
        scrollContainer: obj.hasClass('sc_scroll_vertical'),
        scrollbar: {
            container: '.'+id+'_bar',
            hide: true,
            draggable: true  
        }
    })
    
    obj.data('settings', {mode: 'horizontal'});     // VC hook
    
    themerex_prepare_slider_navi(obj);
}


// Slider navigation
function themerex_prepare_slider_navi(slider) {
    // Prev / Next
    var navi = slider.find('> .sc_slider_controls_wrap, > .sc_scroll_controls_wrap');
    if (navi.length == 0) navi = slider.siblings('.sc_slider_controls_wrap,.sc_scroll_controls_wrap');
    if (navi.length > 0) {
        navi.find('.sc_slider_prev,.sc_scroll_prev').on("click", function(e){
            var swiper = jQuery(this).parents('.swiper-slider-container');
            if (swiper.length == 0) swiper = jQuery(this).parents('.sc_slider_controls_wrap,.sc_scroll_controls_wrap').siblings('.swiper-slider-container');
            var id = swiper.attr('id');
            THEMEREX_GLOBALS['swipers'][id].swipePrev();
            e.preventDefault();
            return false;
        });
        navi.find('.sc_slider_next,.sc_scroll_next').on("click", function(e){
            var swiper = jQuery(this).parents('.swiper-slider-container');
            if (swiper.length == 0) swiper = jQuery(this).parents('.sc_slider_controls_wrap,.sc_scroll_controls_wrap').siblings('.swiper-slider-container');
            var id = swiper.attr('id');
            THEMEREX_GLOBALS['swipers'][id].swipeNext();
            e.preventDefault();
            return false;
        });
    }

    // Pagination
    navi = slider.siblings('.sc_slider_pagination');
    if (navi.length > 0) {
        navi.find('.post_item').on("click", function(e){
            var swiper = jQuery(this).parents('.sc_slider_pagination_area').find('.swiper-slider-container');
            var id = swiper.attr('id');
            THEMEREX_GLOBALS['swipers'][id].swipeTo(jQuery(this).index());
            e.preventDefault();
            return false;
        });
    }
}

function themerex_change_active_pagination_in_slider(slider, idx) {
    var pg = slider.parents('.sc_slider_pagination_area').find('.sc_slider_pagination');
    if (pg.length==0) return;
    pg.find('.post_item').removeClass('active').eq(idx).addClass('active');
    var h = pg.height();
    var off = pg.find('.active').offset().top - pg.offset().top;
    var off2 = pg.find('.sc_scroll_wrapper').offset().top - pg.offset().top;
    var h2  = pg.find('.active').height();
    if (off < 0) {
        pg.find('.sc_scroll_wrapper').css({'transform': 'translate3d(0px, 0px, 0px)', 'transition-duration': '0.3s'});
    } else if (h <= off+h2) {
        pg.find('.sc_scroll_wrapper').css({'transform': 'translate3d(0px, -'+(Math.abs(off2)+off-h/4)+'px, 0px)', 'transition-duration': '0.3s'});
    }
}

// Sliders: Autoheight
function themerex_slider_autoheight(slider) {
    if (slider.hasClass('.sc_slider_height_auto')) {
        slider.find('.swiper-slide').each(function() {
            if (jQuery(this).data('height_auto') == undefined) {
                jQuery(this).attr('data-height_auto', jQuery(this).height());
            }
        });
    }
}


// Skills init
function themerex_init_skills(container) {
    if (arguments.length==0) var container = jQuery('body');
    var scrollPosition = jQuery(window).scrollTop() + jQuery(window).height();

    container.find('.sc_skills_item:not(.inited)').each(function () {
        var skillsItem = jQuery(this);
        var scrollSkills = skillsItem.offset().top;
        if (scrollPosition > scrollSkills) {
            skillsItem.addClass('inited');
            var skills = skillsItem.parents('.sc_skills').eq(0);
            var type = skills.data('type');
            var total = (type=='pie' && skills.hasClass('sc_skills_compact_on')) ? skillsItem.find('.sc_skills_data .pie') : skillsItem.find('.sc_skills_total').eq(0);
            var start = parseInt(total.data('start'), 10);
            var stop = parseInt(total.data('stop'), 10);
            var maximum = parseInt(total.data('max'), 10);
            var startPercent = Math.round(start/maximum*100);
            var stopPercent = Math.round(stop/maximum*100);
            var ed = total.data('ed');
            var duration = parseInt(total.data('duration'), 10);
            var speed = parseInt(total.data('speed'), 10);
            var step = parseInt(total.data('step'), 10);
            if (type == 'bar' || type == 'bar2' || type == 'bar3') {
                var dir = skills.data('dir');
                var count = skillsItem.find('.sc_skills_count').eq(0);
                if (dir=='horizontal')
                    count.css('width', startPercent + '%').animate({ width: stopPercent + '%' }, duration);
                else if (dir=='vertical')
                    count.css('height', startPercent + '%').animate({ height: stopPercent + '%' }, duration);
                themerex_animate_skills_counter(start, stop, speed-(dir!='unknown' ? 5 : 0), step, ed, total);
            } else if (type == 'counter') {
                themerex_animate_skills_counter(start, stop, speed - 5, step, ed, total);
            } else if (type == 'pie') {
                var steps = parseInt(total.data('steps'), 10);
                var bg_color = total.data('bg_color');
                var border_color = total.data('border_color');
                var cutout = parseInt(total.data('cutout'), 10);
                var easing = total.data('easing');
                var options = {
                    segmentShowStroke: true,
                    segmentStrokeColor: border_color,
                    segmentStrokeWidth: 1,
                    percentageInnerCutout : cutout,
                    animationSteps: steps,
                    animationEasing: easing,
                    animateRotate: true,
                    animateScale: false
                };
                var pieData = [];
                total.each(function() {
                    var color = jQuery(this).data('color');
                    var stop = parseInt(jQuery(this).data('stop'), 10);
                    var stopPercent = Math.round(stop/maximum*100);
                    pieData.push({
                        value: stopPercent,
                        color: color
                    });
                });
                if (total.length == 1) {
                    themerex_animate_skills_counter(start, stop, Math.round(1500/steps), step, ed, total);
                    pieData.push({
                        value: 100-stopPercent,
                        color: bg_color
                    });
                }
                var canvas = skillsItem.find('canvas');
                canvas.attr({width: skillsItem.width(), height: skillsItem.width()}).css({width: skillsItem.width(), height: skillsItem.height()});
                new Chart(canvas.get(0).getContext("2d")).Doughnut(pieData, options);
            }



            else if (type == 'pie_2') {
                var count = skillsItem.find('.sc_skills_count').eq(0);
                count.css('width', startPercent + '%').animate({ width: stopPercent + '%' }, duration);
                var steps = parseInt(total.data('steps'), 10);
                var bg_color = total.data('bg_color');
                var cutout = parseInt(total.data('cutout'), 10);
                var easing = total.data('easing');
                var color = total.data('color');
                var stopPercent = Math.round(stop/maximum*100);
                var options = {
                    segmentShowStroke: true,
                    segmentStrokeColor: "#fff",
                    segmentStrokeWidth: 0,
                    percentageInnerCutout : 90,
                    animationSteps: steps,
                    animationEasing: easing,
                    animateRotate: true,
                    animateScale: false
                };

                themerex_animate_skills_counter(start, stop, Math.round(1500/steps), step, ed, total);
                var pieData = [{
                    value: stopPercent,
                    color: color
                }, {
                    value: 100 - stopPercent,
                    color: "#f5f7f9"
                }];

                var canvas = skillsItem.find('canvas');
                canvas.attr({width: skillsItem.width(), height: skillsItem.width()}).css({width: skillsItem.width(), height: skillsItem.height()});
                new Chart(canvas.get(0).getContext("2d")).Doughnut(pieData, options);
            }

        }
    });
}

// Skills counter animation
function themerex_animate_skills_counter(start, stop, speed, step, ed, total) {
    start = Math.min(stop, start + step);
    total.text(start+ed);
    if (start < stop) {
        setTimeout(function () {
            themerex_animate_skills_counter(start, stop, speed, step, ed, total);
        }, speed);
    }
}

/* Reviews */

function themerex_reviews() {
    THEMEREX_GLOBALS['reviews_user_accepted'] = false;
    themerex_add_hidden_elements_handler('init_reviews', themerex_init_reviews);
    themerex_init_reviews(jQuery('body'));
}

// Init reviews elements
function themerex_init_reviews(cont) {
 
    // Drag slider - set new rating
    cont.find('.reviews_editable .reviews_slider:not(.inited)').each(function() {
        "use strict";
        if (typeof(THEMEREX_GLOBALS['reviews_allow_user_marks'])=='undefined' || !THEMEREX_GLOBALS['reviews_allow_user_marks']) return;
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        jQuery(this).addClass('inited');
        var row  = jQuery(this).parents('.reviews_item');
        var wrap = jQuery(this).parents('.reviews_stars_wrap');
        var rangeMin = 0;
        var rangeMax = parseInt(row.data('max-level'), 10);
        var step  = parseFloat(row.data('step'));
        var prec  = Math.pow(10, step.toString().indexOf('.') < 0 ? 0 : step.toString().length - step.toString().indexOf('.') - 1);
        var grid  = Math.max(1, (wrap.width()-jQuery(this).width()) / (rangeMax - rangeMin) / prec);
        // Move slider to init position
        var val = parseFloat(row.find('input[type="hidden"]').val());
        var x = Math.round((val - rangeMin) * (wrap.width()-jQuery(this).width()) / (rangeMax - rangeMin));
        themerex_reviews_set_current_mark(row, val, x, false);
        jQuery(this).draggable({
            axis: 'x',
            grid: [grid, grid],
            containment: '.reviews_stars_wrap',
            scroll: false,
            drag: function (e, ui) {
                "use strict";
                var pos = ui.position.left >= 0 ? ui.position.left : ui.originalPosition.left + ui.offset.left;
                var val = Math.min(rangeMax, Math.max(rangeMin, Math.round(pos * prec * (rangeMax - rangeMin) / (wrap.width()-jQuery(this).width())) / prec + rangeMin));
                themerex_reviews_set_current_mark(row, val);
            }
        });
    });


    // Click on stars - set new rating
    cont.find('.reviews_editor .reviews_editable .reviews_stars_wrap:not(.inited),.reviews_editor .reviews_max_level_100 .reviews_criteria:not(.inited)').each(function() {
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        jQuery(this).addClass('inited');
        jQuery(this).on("click", function (e) {
            "use strict";
            if (typeof(THEMEREX_GLOBALS['reviews_allow_user_marks'])=='undefined' || !THEMEREX_GLOBALS['reviews_allow_user_marks']) return;
            if (jQuery(this).hasClass('reviews_criteria') && !jQuery(this).next().hasClass('reviews_editable')) return;
            var wrap = jQuery(this).hasClass('reviews_criteria') ? jQuery(this).next() : jQuery(this);
            var row  = wrap.parents('.reviews_item');
            var wrapWidth = wrap.width()-wrap.find('.reviews_slider').width();
            var rangeMin = 0;
            var rangeMax = parseInt(row.data('max-level'), 10);
            var step  = parseFloat(row.data('step'));
            var prec  = Math.pow(10, step.toString().indexOf('.') < 0 ? 0 : step.toString().length - step.toString().indexOf('.') - 1);
            var grid  = wrapWidth / (rangeMax - rangeMin + 1) / step;
            var wrapX = e.pageX - wrap.offset().left;
            if (wrapX <= 1) wrapX = 0;
            if (wrapX > wrapWidth) wrapX = wrapWidth;
            var val = Math.min(rangeMax, Math.max(rangeMin, Math.round(wrapX * prec * (rangeMax - rangeMin) / wrapWidth) / prec + rangeMin));
            themerex_reviews_set_current_mark(row, val, wrapX);
        });
    });


    // Save user's marks
    cont.find('.reviews_accept:not(.inited)').each(function() {
        if (jQuery(this).parents('div:hidden,article:hidden').length > 0) return;
        jQuery(this).addClass('inited');
        jQuery(this).find('a').on("click", function(e) {
            "use strict";
            if (typeof(THEMEREX_GLOBALS['reviews_allow_user_marks'])=='undefined' || !THEMEREX_GLOBALS['reviews_allow_user_marks']) return;
            var marks_cnt = 0;
            var marks_sum = 0;
            var marks_accept = jQuery(this).parents('.reviews_accept');
            var marks_panel = marks_accept.siblings('.reviews_editor');
            marks_panel.find('input[type="hidden"]').each(function (idx) {
                "use strict";
                var row  = jQuery(this).parents('.reviews_item');
                var step  = parseFloat(row.data('step'));
                var prec  = Math.pow(10, step.toString().indexOf('.') < 0 ? 0 : step.toString().length - step.toString().indexOf('.') - 1);
                var mark = parseFloat(jQuery(this).val());
                if (isNaN(mark)) mark = 0;
                THEMEREX_GLOBALS['reviews_marks'][idx] = Math.round(((THEMEREX_GLOBALS['reviews_marks'].length>idx && THEMEREX_GLOBALS['reviews_marks'][idx]!='' 
                    ? parseFloat(THEMEREX_GLOBALS['reviews_marks'][idx])*THEMEREX_GLOBALS['reviews_users'] 
                    : 0) + mark) / (THEMEREX_GLOBALS['reviews_users']+1)*prec)/prec;
                jQuery(this).val(THEMEREX_GLOBALS['reviews_marks'][idx]);
                marks_cnt++;
                marks_sum += mark;
            });
            if (marks_sum > 0) {
                if (THEMEREX_GLOBALS['reviews_marks'].length.length > marks_cnt)
                    THEMEREX_GLOBALS['reviews_marks'] = THEMEREX_GLOBALS['reviews_marks'].splice(marks_cnt, THEMEREX_GLOBALS['reviews_marks'].length-marks_cnt)
                THEMEREX_GLOBALS['reviews_users']++;
                marks_accept.fadeOut();
                jQuery.post(THEMEREX_GLOBALS['ajax_url'], {
                    action: 'reviews_users_accept',
                    nonce: THEMEREX_GLOBALS['ajax_nonce'],
                    post_id: THEMEREX_GLOBALS['post_id'],
                    marks: THEMEREX_GLOBALS['reviews_marks'].join(','),
                    users: THEMEREX_GLOBALS['reviews_users']
                }).done(function(response) {
                    var rez = JSON.parse(response);
                    if (rez.error === '') {
                        THEMEREX_GLOBALS['reviews_allow_user_marks'] = false;
                        themerex_set_cookie('themerex_votes', THEMEREX_GLOBALS['reviews_vote'] + (THEMEREX_GLOBALS['reviews_vote'].substr(-1)!=',' ? ',' : '') + THEMEREX_GLOBALS['post_id'] + ',', 365);
                        marks_panel.find('.reviews_item').each(function (idx) {
                            jQuery(this).data('mark', THEMEREX_GLOBALS['reviews_marks'][idx])
                                .find('input[type="hidden"]').val(THEMEREX_GLOBALS['reviews_marks'][idx]).end()
                                .find('.reviews_stars_hover').css('width', Math.round(THEMEREX_GLOBALS['reviews_marks'][idx]/THEMEREX_GLOBALS['reviews_max_level']*100) + '%');
                        });
                        themerex_reviews_set_average_mark(marks_panel);
                        marks_panel.find('.reviews_stars').removeClass('reviews_editable');
                        marks_panel.siblings('.reviews_summary').find('.reviews_criteria').html(THEMEREX_GLOBALS['strings']['reviews_vote']);
                    } else {
                        marks_panel.siblings('.reviews_summary').find('.reviews_criteria').html(THEMEREX_GLOBALS['strings']['reviews_error']);
                    }
                });
            }
            e.preventDefault();
            return false;
        });
    });
}


// Set current mark value
function themerex_reviews_set_current_mark(row, val) {
    "use strict";
    var x = arguments[2]!=undefined ? arguments[2] : -1;
    var clear = arguments[3]!=undefined ? arguments[3] : true;
    var rangeMin = 0;
    var rangeMax = parseInt(row.data('max-level'), 10);
    row.find('.reviews_value').html(val);
    row.find('input[type="hidden"]').val(val).trigger('change');
    row.find('.reviews_stars_hover').css('width', Math.round(row.find('.reviews_stars_bg').width()*val/(rangeMax-rangeMin))+'px');
    if (x >=0) row.find('.reviews_slider').css('left', x+'px');
    // Clear user marks and show Accept Button
    if (!THEMEREX_GLOBALS['admin_mode'] && !THEMEREX_GLOBALS['reviews_user_accepted'] && clear) {
        THEMEREX_GLOBALS['reviews_user_accepted'] = true;
        row.siblings('.reviews_item').each(function () {
            "use strict";
            jQuery(this).find('.reviews_stars_hover').css('width', 0);
            jQuery(this).find('.reviews_value').html('0');
            jQuery(this).find('.reviews_slider').css('left', 0);
            jQuery(this).find('input[type="hidden"]').val('0');
        });
        // Show Accept button
        row.parent().next().fadeIn();
    }
    themerex_reviews_set_average_mark(row.parents('.reviews_editor'));
}

// Show average mark
function themerex_reviews_set_average_mark(obj) {
    "use strict";
    var avg = 0;
    var cnt = 0;
    var rangeMin = 0;
    var rangeMax = parseInt(obj.find('.reviews_item').eq(0).data('max-level'), 10);
    var step = parseFloat(obj.find('.reviews_item').eq(0).data('step'));
    var prec = Math.pow(10, step.toString().indexOf('.') < 0 ? 0 : step.toString().length - step.toString().indexOf('.') - 1);
    obj.find('input[type="hidden"]').each(function() {
        avg += parseFloat(jQuery(this).val());
        cnt++;
    });
    avg = cnt > 0 ? avg/cnt : 0;
    avg = Math.min(rangeMax, Math.max(rangeMin, Math.round(avg * prec) / prec + rangeMin));
    var summary = obj.siblings('.reviews_summary');
    summary.find('.reviews_value').html(avg);
    summary.find('input[type="hidden"]').val(avg).trigger('change');
    summary.find('.reviews_stars_hover').css('width', Math.round(summary.find('.reviews_stars_bg').width()*avg/(rangeMax-rangeMin))+'px');
}

// Convert percent to rating marks level
function themerex_reviews_marks_to_display(mark) {
    "use strict";
    if (THEMEREX_GLOBALS['reviews_max_level'] < 100) {
        mark = Math.round(mark / 100 * THEMEREX_GLOBALS['reviews_max_level'] * 10) / 10;
        if (String(mark).indexOf('.') < 0) {
            mark += '.0';
        }
    }
    return mark;
}

// Get word-value review rating
function themerex_reviews_get_word_value(r) {
    "use strict";
    var words = THEMEREX_GLOBALS['reviews_levels'].split(',');
    var k = THEMEREX_GLOBALS['reviews_max_level'] / words.length;
    r = Math.max(0, Math.min(words.length-1, Math.floor(r/k)));
    return words[r];
}

/*reviews stars*/
function themerex_reviews_stars() {
    if (jQuery(".reviews_stars").length > 0) {
        jQuery(".reviews_stars").each(function() {
            var percent = jQuery(this).attr("data-mark");
            jQuery(this).find('.reviews_stars_hover').css({'width': percent + '%'});
        });
    }
}
