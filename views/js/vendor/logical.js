fbuilderjQuery = (typeof fbuilderjQuery != 'undefined' ) ? fbuilderjQuery : jQuery;
fbuilderjQuery(function(){
(function($) {
	// Namespace of fbuilder
	$.fbuilder = $.fbuilder || {};
	$.fbuilder[ 'objName' ] = 'fbuilderjQuery';	
	
/*
* logical.js v0.1
* By: CALCULATED FIELD PROGRAMMERS
* The script allows make logical operations like functions
* Copyright 2013 CODEPEOPLE
* You may use this project under MIT or GPL licenses.
*/

;(function(root){
	var lib = {};

	lib.cf_logical_version = '0.1';

	// IF( logical_test, value_if_true, value_if_false )
	lib.IF = function( _if, _then, _else ){
			if ( _if ) {
				return ( typeof _then === 'undefined' ) ? true : _then;
			} else {
				return ( typeof _else === 'undefined' ) ? false : _else;
			}
		};
	
	// AND( logical1, logical2, ... )
	lib.AND = function(){
			    for (var i = 0, h = arguments.length; i < h; i++) {
					if (!arguments[i]) {
						return false;
					}
				}
				return true;
		};
	
	// OR( logical1, logical2, ... )
	lib.OR = function(){
			    for (var i = 0, h = arguments.length; i < h; i++) {
					if ( arguments[i] ) {
						return true;
					}
				}
				return false;
		};
	
	// NOT( term )
	lib.NOT = function( _term ){
			    return ( typeof _term == 'undefined' ) ? true : !_term;
		};
	
	// IN( term, values ) values can be a string or an array
	lib.IN = function( _term, _values ){
				function _reduce( str ){
					return String(str).replace( /^\s+/, '').replace(/\s+$/, '').replace(/\s+/, ' ').toLowerCase();
				};

				_term = _reduce( _term );
				if( typeof _values == 'string' ) return _reduce( _values ).indexOf( _term ) != -1;
				else if( typeof _values == 'object' && _values.length ){
					for( var i = 0, h = _values.length; i < h; i++) if( _reduce( _values[ i ] ).indexOf( _term ) != -1 ) return true;
				}
				return false;
		};
	
	
	root.CF_LOGICAL = lib;
	
})(this);
fbuilderjQuery = ( typeof fbuilderjQuery != 'undefined' ) ? fbuilderjQuery : jQuery;
fbuilderjQuery[ 'fbuilder' ] = fbuilderjQuery[ 'fbuilder' ] || {};
fbuilderjQuery[ 'fbuilder' ][ 'modules' ] = fbuilderjQuery[ 'fbuilder' ][ 'modules' ] || {};

fbuilderjQuery[ 'fbuilder' ][ 'modules' ][ 'default' ] = {
	'prefix' : '',
	'callback'		: function()
	{
		if(window.PREC == undefined)
		{
			window.PREC = window.prec = function (num, pr)
				{
					if(/^\d+$/.test(pr) && /^[+-]?\d+(\.\d+)?$/.test(num))
					{
						result = num.toFixed( pr );
						return result;
					}
					return num;
				};
		} // End if window.PREC

		if(window.CDATE == undefined)
		{
			window.CDATE = window.cdate = function ( num, format )
				{
					format = ( typeof format != 'undefined' ) ? format : ( ( typeof window.DATETIMEFORMAT != 'undefined' ) ? window.DATETIMEFORMAT : 'dd/mm/yyyy' );

					if(isFinite(num*1))
					{
						num = Math.round(Math.abs(num)*86400000);
						
						var date = new Date(num),
							d = date.getDate(),
							m = date.getMonth()+1,
							y = date.getFullYear(),
							h = date.getHours(),
							i = date.getMinutes(),
							s = date.getSeconds(),
							a = '';
			
						m = (m < 10) ? '0'+m : m;
						d = (d < 10) ? '0'+d : d;
						
						if( /a/.test( format ) )
						{
							a = ( h >= 12 ) ? 'pm' : 'am';
							h = h % 12;
							h = ( h == 0 ) ? 12: h;
						}
						h = (h < 10) ? '0'+h : h;
						i = (i < 10) ? '0'+i : i;
						s = (s < 10) ? '0'+s : s;
													
						return format.replace( /y+/i, y)
									 .replace( /m+/i, m)
									 .replace( /d+/i, d)
									 .replace( /h+/i, h)
									 .replace( /i+/i, i)
									 .replace( /s+/i, s)
									 .replace( /a+/i, a);
					}
					return num;
				};
		} // End if window.CDATE
		
		var math_prop = ["LN10", "PI", "E", "LOG10E", "SQRT2", "LOG2E", "SQRT1_2", "LN2", "cos", "pow", "log", "tan", "sqrt", "ceil", "asin", "abs", "max", "exp", "atan2", "random", "round", "floor", "acos", "atan", "min", "sin"];

		for(var i = 0, h = math_prop.length; i < h; i++)
		{
			if( !window[ math_prop[ i ] ] )
			{
				window[ math_prop[ i ] ] = window[ math_prop[ i ].toUpperCase() ] = Math[ math_prop[ i ] ];
			}
		}
		
		fbuilderjQuery[ 'fbuilder' ][ 'extend_window' ]( fbuilderjQuery[ 'fbuilder' ][ 'modules' ][ 'default' ][ 'prefix' ], CF_LOGICAL );
	},
	
	'validator'	: function( v )
		{
			return ( typeof v == 'number' ) ? isFinite( v ) : ( typeof v != 'undefined' );
		}
};	$.fbuilder[ 'controls' ] = ( typeof $.fbuilder[ 'controls' ] != 'undefined' ) ? $.fbuilder[ 'controls' ]: {};
	$.fbuilder[ 'forms' ] = ( typeof $.fbuilder[ 'forms' ] != 'undefined' ) ? $.fbuilder[ 'forms' ]: {};
	
	$.fbuilder[ 'htmlEncode' ] = function(value)
	{
		value = $('<div/>').text(value).html()
		value = value.replace( /&/g, '&amp;').replace(/"/g, "&quot;");
		return value;
	};
	
	$.fbuilder[ 'escape_symbol' ] = function( value ) // Escape the symbols used in regulars expressions
	{
		return value.replace(/([\^\$\-\.\,\[\]\(\)\/\\\*\?\+\!\{\}])/g, "\\$1");
	};
	
	$.fbuilder[ 'parseValStr' ] = function( value )
	{
		return '"' + value.replace(/'/g, "\\'").replace( /\$/g, '') + '"';
	};
	
	$.fbuilder[ 'parseVal' ] = function( value, thousandSeparator, decimalSymbol )
	{
		if( value == '' ) return 0;
		value += '';
		
		thousandSeparator = new RegExp( $.fbuilder.escape_symbol( ( typeof thousandSeparator == 'undefined' ) ? ',' : thousandSeparator ), 'g' );
		decimalSymbol = new RegExp( $.fbuilder.escape_symbol( ( typeof decimalSymbol == 'undefined' || /^\s*$/.test( decimalSymbol ) ) ? '.' : decimalSymbol ), 'g' );
		
		var t = value.replace( thousandSeparator, '' ).replace( decimalSymbol, '.' ).replace( /\s/g, '' ),
			p = /[+\-]?((\d+(\.\d+)?)|(\.\d+))(?:[eE][+\-]?\d+)?/.exec( t );
			
		return ( p ) ? p[0]*1 : $.fbuilder[ 'parseValStr' ]( value );
	};
				
	
	$.fn.fbuilder = function(options){
		var opt = $.extend({},
					{
						pub:false,
						identifier:"",
						title:""
					},options, true);
				
		opt.messages = $.extend({
					previous: "Previous",
					next: "Next",
					pageof: "Page {0} of {0}",
					required: "This field is required.",
					email: "Please enter a valid email address.",
					datemmddyyyy: "Please enter a valid date with this format(mm/dd/yyyy)",
					dateddmmyyyy: "Please enter a valid date with this format(dd/mm/yyyy)",
					number: "Please enter a valid number.",
					digits: "Please enter only digits.",
					maxlength: $.validator.format("Please enter no more than {0} characters"),
                    minlength: $.validator.format("Please enter at least {0} characters."),
                    equalTo: "Please enter the same value again.",
					max: $.validator.format("Please enter a value less than or equal to {0}."),
					min: $.validator.format("Please enter a value greater than or equal to {0}.")
			},opt.messages);
			
		opt.messages.max = $.validator.format(opt.messages.max);
		opt.messages.min = $.validator.format(opt.messages.min);
		
		$.extend($.validator.messages, opt.messages);
		
		var items = [];
		var reloadItemsPublic = function() 
			{
				$("#fieldlist"+opt.identifier).closest( 'form' ).addClass( theForm.formtemplate );
                $("#fieldlist"+opt.identifier).html("").addClass(theForm.formlayout);
				$("#formheader"+opt.identifier).html(theForm.show());
				
				var page = 0;
				$("#fieldlist"+opt.identifier).append('<div class="pb'+page+' pbreak" page="'+page+'"></div>');
				for (var i=0;i<items.length;i++)
				{
					items[i].index = i;
					if (items[i].ftype=="fPageBreak")
					{
						page++;
						$("#fieldlist"+opt.identifier).append('<div class="pb'+page+' pbreak" page="'+page+'"></div>');
					}
					else
					{
						$("#fieldlist"+opt.identifier+" .pb"+page).append(items[i].show());
						if (items[i].predefinedClick)
						{
                            $("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).attr("placeholder",items[i].predefined);
                            $("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).attr("value","");
                        }
						if (items[i].userhelpTooltip)
						{
							var uh = $("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).closest(".dfield");
							if( uh.length == 0 )
							{
								uh = $("#fieldlist"+opt.identifier+" .pb"+page).find("#"+items[i].name).closest(".fields");
							}
							
							uh.find(".uh").css("display","none");
							if (uh.find(".uh").text()!="")
							{
								uh.attr("uh",uh.find(".uh").text());
							}	
						}
					}
				}
                
				if (page>0)
				{
                
					$("#fieldlist"+opt.identifier+" .pb"+page).addClass("pbEnd");
					$("#fieldlist"+opt.identifier+" .pbreak").each(function(index) {
						var code = $(this).html();
						var bSubmit = '';
						
						if (index == page)
						{

							if ( $( "#cpcaptchalayer"+opt.identifier ).length && !/^\s*$/.test( $( "#cpcaptchalayer"+opt.identifier ).html() ) )
							{
								code += '<div class="captcha">'+$("#cpcaptchalayer"+opt.identifier).html()+'</div><div class="clearer"></div>';
								$("#cpcaptchalayer"+opt.identifier).html("");
							}
							if ($("#cp_subbtn"+opt.identifier).html())
							{
								bSubmit = '<div class="pbSubmit">'+$("#cp_subbtn"+opt.identifier).html()+'</div>';
							}	
						}
						$(this).html('<fieldset><legend>'+opt.messages.pageof.replace( /\{\s*\d+\s*\}/, (index+1) ).replace( /\{\s*\d+\s*\}/, (page+1) )+'</legend>'+code+'<div class="pbPrevious">'+opt.messages.previous+'</div><div class="pbNext">'+opt.messages.next+'</div>'+bSubmit+'<div class="clearer"></div></fieldset>');
					});
					$( '#fieldlist'+opt.identifier).find(".pbPrevious,.pbNext").bind("click", { 'identifier' : opt.identifier }, function( evt ) {
					    var identifier = evt.data.identifier;
						if (  ($(this).hasClass("pbPrevious")) || (($(this).hasClass("pbNext")) && $(this).parents("form").valid())  )
						{
							var page = parseInt($(this).parents(".pbreak").attr("page"));
							
							(($(this).hasClass("pbPrevious"))?page--:page++);
							$("#fieldlist"+identifier+" .pbreak").css("display","none");
							$("#fieldlist"+identifier+" .pbreak").find(".field").addClass("ignorepb");

							$("#fieldlist"+identifier+" .pb"+page).css("display","block");
							$("#fieldlist"+identifier+" .pb"+page).find(".field").removeClass("ignorepb");
							if ($("#fieldlist"+identifier+" .pb"+page).find(".field").length>0)
							{
								try 
								{
									$("#fieldlist"+identifier+" .pb"+page).find(".field")[0].focus();
								} 
								catch(e){}
							}	
						}
						else
						{
							$(this).parents("form").validate().focusInvalid();
						}	
						return false;
					});
                }
				else
				{
					if ( $( "#cpcaptchalayer"+opt.identifier ).length && !/^\s*$/.test( $( "#cpcaptchalayer"+opt.identifier ).html() ) )
					{
						$("#fieldlist"+opt.identifier+" .pb"+page).append('<div class="captcha">'+$("#cpcaptchalayer"+opt.identifier).html()+'</div>');
						$("#cpcaptchalayer"+opt.identifier).html("");
					}
					if ($("#cp_subbtn"+opt.identifier).html())
					{
						$("#fieldlist"+opt.identifier+" .pb"+page).append('<div class="pbSubmit">'+$("#cp_subbtn"+opt.identifier).html()+'</div>');
					}	
				}
							
                // Set Captcha Event
				$( document ).on( 'click', '#fbuilder .captcha img', function(){ var e = $( this ); e.attr( 'src', e.attr( 'src' ).replace( /&\d+$/, '' ) + '&' + Math.floor( Math.random()*1000 ) ); } );
				
				$( '#fieldlist'+opt.identifier).find(".pbSubmit").bind("click", { 'identifier' : opt.identifier }, function( evt ) 
					{
                        $(this).closest("form").submit();
					});

				if (i>0)
				{
                    theForm.after_show( opt.identifier );
					for (var i=0;i<items.length;i++)
					{
						items[i].after_show();
					}	
					
					$.fbuilder.showHideDep(
						{
							'formIdentifier' : opt.identifier, 
							'throwEvent'	 : true
						}	
					);
					
					$( '#fieldlist'+opt.identifier).find(".depItemSel,.depItem").bind("change", { 'identifier' : opt.identifier }, function( evt ) 
						{
							$.fbuilder.showHideDep(
								{
									'formIdentifier' : evt.data.identifier, 
									'throwEvent'	 : true
								}	
							);
						});
					try 
					{
						$( "#fbuilder"+opt.identifier ).tooltip({show: false,hide:false,tooltipClass:"uh-tooltip",position: { my: "left top", at: "left bottom+5", collision: "none"  },items: "[uh]",content: function (){return $(this).attr("uh");} });
					} catch(e){}
                }
                $("#fieldlist"+opt.identifier+" .pbreak:not(.pb0)").find(".field").addClass("ignorepb");
            };
			
		var fform=function(){};
		$.extend(fform.prototype,
			{
				title:"Untitled Form",
				description:"This is my form. Please fill it out. It's awesome!",
				formlayout:"top_aligned",
				formtemplate:"",
                evalequations:1,
                autocomplete:1,
				show:function(){
                    return '<div class="fform" id="field"><h1>'+this.title+'</h1><span>'+this.description+'</span></div>';
				},
                after_show:function( id ){
                    $( '#cp_calculatedfieldsf_pform'+id ).attr( 'data-evalequations', this.evalequations ).attr( 'autocomplete', ( ( this.autocomplete ) ? 'on' : 'off' ) );
                }
			});
		
		//var theForm = new fform(),
		var theForm,
			ffunct = {
				getItem: function( name )
					{
						for( var i in items )
						{
							if( items[ i ].name == name )
							{
								return items[ i ];
							}
						}
						return false;
					},
				getItems: function() 
					{
					   return items;
					},
				loadData:function(f)
					{
						var d,
							e = $("#"+f);
						
						this.formId = e.parents( 'form' ).attr( 'id' );
						if ( d = $.parseJSON( e.val() ))
						{
						   if (d.length==2)
						   {
							   items = [];
							   for (var i=0;i<d[0].length;i++)
							   {
								   var obj = eval("new $.fbuilder.controls['"+d[0][i].ftype+"']();");
								   obj = $.extend(true, {}, obj,d[0][i]);
								   obj.name = obj.name+opt.identifier;
								   obj.form_identifier = opt.identifier;
								   obj.init();
								   items[items.length] = obj;
							   }
							   theForm = new fform();
							   theForm = $.extend(theForm,d[1][0]);
							   reloadItemsPublic();
						   }
						}

						if( typeof window[ 'cpcff_load_defaults' ] != 'undefined' )
                        {
                            window[ 'cpcff_load_defaults' ]();
                        }
					}
			};

		$.fbuilder[ 'forms' ][ opt.identifier ] = ffunct;
	    this.fBuild = ffunct;
	    return this;
	}; // End fbuilder plugin

	$.fbuilder[ 'showSettings' ] = {
		formlayoutList : [{id:"top_aligned",name:"Top Aligned"},{id:"left_aligned",name:"Left Aligned"},{id:"right_aligned",name:"Right Aligned"}]
	};
	
	$.fbuilder.controls[ 'ffields' ] = function(){};
	$.extend($.fbuilder.controls[ 'ffields' ].prototype, 
		{
				form_identifier:"",
				name:"",
				shortlabel:"",
				index:-1,
				ftype:"",
				userhelp:"",
				userhelpTooltip:false,
				csslayout:"",
				init:function(){},
				show:function()
					{
						return 'Not available yet';
					},
				after_show:function(){},
				val:function(){
					var e = $( "[id='" + this.name + "']:not(.ignore)" );
					if( e.length )
					{
                        return $.fbuilder.parseVal( $.trim( e.val() ) );
					}
					return 0;
				}
		});
	
	$.fbuilder[ 'showHideDep' ] = function( configObj )
		{
			if( typeof configObj[ 'formIdentifier' ] !== 'undefined' )
			{
				var identifier = configObj[ 'formIdentifier' ];
				
				if( typeof  $.fbuilder[ 'forms' ][ identifier ] != 'undefined' )
				{
					var toShow = [],
						toHide = [],
						items = $.fbuilder[ 'forms' ][ identifier ].getItems();
						
					for( var i = 0, h = items.length; i < h; i++ )
					{
						if( typeof items[ i ][ 'showHideDep' ] != 'undefined' )
						{
							items[ i ][ 'showHideDep' ]( toShow, toHide );
						}
					}
					
					if( typeof configObj[ 'throwEvent' ] == 'undefined' || configObj[ 'throwEvent' ] )
					{
						$( document ).trigger( 'showHideDepEvent', $.fbuilder[ 'forms' ][ identifier ][ 'formId' ] );
					}	
				}
			}	
		}; // End showHideDep	
			$.fbuilder.controls[ 'ftext' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'ftext' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ftext",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"medium",
			minlength:"",
			maxlength:"",
			equalTo:"",
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"" )+' class="field '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				}
		}	
	);	$.fbuilder.controls[ 'fcurrency' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'fcurrency' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Currency",
			ftype:"fcurrency",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"small",
			readonly:false,
			currencyText:"USD",
			thousandSeparator:",",
			centSeparator:".",
			min:"",
			max:"",
			formatDynamically:false,

			getFormattedValue:function( value )
				{
					this.centSeparator = $.trim(this.centSeparator);	
					if( /^\s*$/.test( this.centSeparator ) )
					{
						this.centSeparator = '.';
					}
					var v = $.trim( value );
					v = v.replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.currencySymbol), 'g' ), '' )
						 .replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.currencyText), 'g' ), '' );
					v = $.fbuilder.parseVal( v, this.thousandSeparator, this.centSeparator );	 
					if( !isNaN( v ) )
					{
						v = v.toString();
						var parts = v.toString().split("."),
							counter = 0,
							str = '';
								
						if( !/^\s*$/.test( this.thousandSeparator ) )
						{
							for( var i = parts[0].length-1; i >= 0; i--){
								counter++;
								str = parts[0][i] + str;
								if( counter%3 == 0 && i != 0 ) str = this.thousandSeparator + str;

							}
							parts[0] = str;
						}
						if( typeof parts[ 1 ] != 'undefined' && parts[ 1 ].length == 1 )
						{
							parts[ 1 ] += '0';
						}
						if( /^\s*$/.test( this.centSeparator ) )
						{
							this.centSeparator = '.';
						}
						return this.currencySymbol+parts.join( this.centSeparator )+this.currencyText;
					}
					else
					{
						return value;
					}
				},	
			show:function()
				{
					if( this.formatDynamically )
					{

						var me = this;
						$( document ).on( 'change', '[name="' + this.name + '"]', function(){
							this.value = me.getFormattedValue( this.value );
						} );
					}

					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input '+(( this.readonly )? 'READONLY' : '' )+' id="'+this.name+'" name="'+this.name+'" class="field '+this.dformat+' '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode( this.getFormattedValue( this.predefined ) )+'" '+( ( !/^\s*$/.test( this.min) ) ? 'min="'+$.fbuilder.parseVal( this.min, this.thousandSeparator, this.centSeparator )+'" ' : '' )+( ( !/^\s*$/.test( this.max) ) ? ' max="'+$.fbuilder.parseVal( this.max, this.thousandSeparator, this.centSeparator )+'" ' : '' )+' /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			after_show:function()
				{
					if( typeof $[ 'validator' ] != 'undefined' )
					{
						$.validator.addMethod( 'min', function( value, element, param ) 
                                        {
                                            var sf = element.id.match( /_\d+$/)[ 0 ],
                                                e = $.fbuilder[ 'forms' ][ element.id.match( /_\d+$/)[ 0 ] ].getItem( element.name ),
                                                thousandSeparator = ( typeof e.thousandSeparator != 'undefined' ) ? e.thousandSeparator : '',
                                                centSymbol = ( typeof e.centSeparator != 'undefined' && $.trim( e.centSeparator ) ) ? e.centSeparator : '.';
                                                
											return this.optional(element) || $.fbuilder.parseVal( value, thousandSeparator, centSymbol ) >= param;
                                        }
						);

						$.validator.addMethod( 'max', function( value, element, param ) 
                                        {
                                            var sf = element.id.match( /_\d+$/)[ 0 ],
                                                e = $.fbuilder[ 'forms' ][ element.id.match( /_\d+$/)[ 0 ] ].getItem( element.name ),
                                                thousandSeparator = ( typeof e.thousandSeparator != 'undefined' ) ? e.thousandSeparator : '',
                                                centSymbol = ( typeof e.centSeparator != 'undefined' && $.trim( e.centSeparator ) ) ? e.centSeparator : '.';
                                                
											return this.optional(element) || $.fbuilder.parseVal( value, thousandSeparator, centSymbol ) <= param;
                                        }
						);
						
					}
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length )
					{
						var v = $.trim( e.val() );
						
						v = v.replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.currencySymbol), 'g' ), '' )
						     .replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.currencyText), 'g' ), '' );
						
						return $.fbuilder.parseVal( v, this.thousandSeparator, this.centSeparator );	 
					}
					return 0;
				}	
		}
	);	$.fbuilder.controls[ 'fnumber' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'fnumber' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Number",
			ftype:"fnumber",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"small",
			thousandSeparator:"",
			decimalSymbol:".",
			min:"",
			max:"",
			dformat:"digits",
			formats:new Array("digits","number"),
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+( ( !/^\s*$/.test( this.min) ) ? 'min="'+$.fbuilder.parseVal( this.min, this.thousandSeparator, this.decimalSymbol )+'" ' : '' )+( ( !/^\s*$/.test( this.max) ) ? ' max="'+$.fbuilder.parseVal( this.max, this.thousandSeparator, this.decimalSymbol )+'" ' : '' )+' class="field '+this.dformat+' '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			after_show:function()
				{
					if( typeof $[ 'validator' ] != 'undefined' )
					{
						$.validator.addMethod( 'number', function( value, element )
										{
                                            var sf = element.id.match( /_\d+$/)[ 0 ],
                                                e = $.fbuilder[ 'forms' ][ element.id.match( /_\d+$/)[ 0 ] ].getItem( element.name ),
                                                thousandSeparator = ( typeof e.thousandSeparator != 'undefined' ) ? e.thousandSeparator : '',
                                                decimalSymbol = ( typeof e.decimalSymbol != 'undefined' && $.trim( e.decimalSymbol ) ) ? e.decimalSymbol : '.';
                                                
											var regExp = new RegExp( '^-?(?:\\d+|\\d{1,3}(?:' + $.fbuilder.escape_symbol( thousandSeparator ) + '\\d{3})+)?(?:' + $.fbuilder.escape_symbol( decimalSymbol ) + '\\d+)?$' );

											return this.optional(element) || regExp.test( value );
										}
						);
						
						$.validator.addMethod( 'min', function( value, element, param ) 
                                        {
                                            var sf = element.id.match( /_\d+$/)[ 0 ],
                                                e = $.fbuilder[ 'forms' ][ element.id.match( /_\d+$/)[ 0 ] ].getItem( element.name ),
                                                thousandSeparator = ( typeof e.thousandSeparator != 'undefined' ) ? e.thousandSeparator : '',
                                                decimalSymbol = ( typeof e.decimalSymbol != 'undefined' && $.trim( e.decimalSymbol ) ) ? e.decimalSymbol : '.';
                                                
											return this.optional(element) || $.fbuilder.parseVal( value, thousandSeparator, decimalSymbol ) >= param;
                                        }
						);

						$.validator.addMethod( 'max', function( value, element, param ) 
                                        {
                                            var sf = element.id.match( /_\d+$/)[ 0 ],
                                                e = $.fbuilder[ 'forms' ][ element.id.match( /_\d+$/)[ 0 ] ].getItem( element.name ),
                                                thousandSeparator = ( typeof e.thousandSeparator != 'undefined' ) ? e.thousandSeparator : '',
                                                decimalSymbol = ( typeof e.decimalSymbol != 'undefined' && $.trim( e.decimalSymbol ) ) ? e.decimalSymbol : '.';
                                                
											return this.optional(element) || $.fbuilder.parseVal( value, thousandSeparator, decimalSymbol ) <= param;
                                        }
						);
						
					}
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length )
					{
						var v = $.trim( e.val() );
						return $.fbuilder.parseVal( v, this.thousandSeparator, this.decimalSymbol );	 
					}
					return 0;
				}		
		}
	);		$.fbuilder.controls[ 'fslider' ] = function(){};
		$.extend(
			$.fbuilder.controls[ 'fslider' ].prototype, 
			$.fbuilder.controls[ 'ffields' ].prototype,
			{
				title:"Slider",
				ftype:"fslider",
				predefined:"",
				predefinedMin:"",
				predefinedMax:"",
				predefinedClick:false,
				size:"small",
				thousandSeparator:",",
				centSeparator:".",
				min:0,
				max:100,
				step:1,
				range:false,
				caption:"{0}",
				init:function()
					{
						this.min  = ( /^\s*$/.test( this.min ) ) ? 0   : parseFloat( $.trim( this.min  ) );
						this.max  = ( /^\s*$/.test( this.max ) ) ? 100 : parseFloat( $.trim( this.max  ) );
						this.step = ( /^\s*$/.test( this.step )) ? 1   : parseFloat( $.trim( this.step ) );
						this.centSeparator 	   = ( /^\s*$/.test( this.centSeparator )) ? '.' : $.trim( this.centSeparator );
						this.thousandSeparator = $.trim( this.thousandSeparator );
						
						this.predefinedMin = ( /^\s*$/.test( this.predefinedMin ) )? this.min : Math.min( Math.max( parseFloat( $.trim( this.predefinedMin ) ), this.min ), this.max );
						
						this.predefinedMax = ( /^\s*$/.test( this.predefinedMax ) )? this.max : Math.min( Math.max( parseFloat( $.trim( this.predefinedMax ) ), this.min ), this.max );
						
						this.predefined = ( /^\s*$/.test( this.predefined ) ) ? this.min : parseFloat( $.trim( this.predefined ) );
					},
				show:function()
					{
						return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+'</label><div class="dfield slider-container"><input id="'+this.name+'" name="'+this.name+'" class="field" type="hidden" value="'+$.fbuilder.htmlEncode( $.trim( this.predefined ) )+'"/><div id="'+this.name+'_slider" class="slider '+this.size+'"></div><div id="'+this.name+'_caption"></div><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
					},
				set_values:function()
					{
						var me = this;
						function setThousandsSeparator( v )
						{
							v = $.fbuilder.parseVal( v, me.thousandSeparator, me.centSeparator );	 
							if( !isNaN( v ) )
							{
								v = v.toString();
								var parts = v.toString().split("."),
									counter = 0,
									str = '';
								
								if( !/^\s*$/.test( me.thousandSeparator ) )
								{
									for( var i = parts[0].length-1; i >= 0; i--)
									{
										counter++;
										str = parts[0][i] + str;
										if( counter%3 == 0 && i != 0 ) str = me.thousandSeparator + str;

									}
									parts[0] = str;
								}
								if( typeof parts[ 1 ] != 'undefined' && parts[ 1 ].length == 1 )
								{
									parts[ 1 ] += '0';
								}
						
								return parts.join( me.centSeparator );
							}
							else 
							{
								return v;
							}
						};
						
						if( me.range )
						{
							var values = $( '#'+me.name+'_slider' ).slider( 'values' );
							$( '#'+me.name ).val( '[' + values[ 0 ] + ',' + values[ 1 ] + ']' );
							$( '#'+me.name+'_caption' ).html( 
								me.caption
								  .replace( /\{\s*0\s*\}/, setThousandsSeparator( values[ 0 ] ) )
								  .replace( /\{\s*0\s*\}/, setThousandsSeparator( values[ 1 ] ) )
							);
						}
						else
						{
							var value = $( '#'+me.name+'_slider' ).slider( 'value' );	
							$( '#'+me.name ).val( value );
							$( '#'+me.name+'_caption' ).html( 
								me.caption
								  .replace( /\{\s*0\s*\}/, setThousandsSeparator( value ) )
							);
						}
						$( '#'+me.name ).change();
					},
				after_show:function()
					{
						var me  = this,
							opt = {
								range: me.range,
								min  : me.min,
								max  : me.max,
								step : me.step
							};
							
						if( me.range ) opt[ 'values' ] = [ me.predefinedMin, me.predefinedMax ];
						else opt[ 'value' ] = me.predefined;
						opt[ 'slide' ] = opt[ 'stop' ] = ( function( e ){
															return function( event, ui ) 
																{
																	if( typeof ui.value != 'undefined' ) $(this).slider('value', ui.value);
																	if( typeof ui.values != 'undefined' ) $(this).slider('values', ui.values);
																	e.set_values();
																}
														} )( me );
						$( '#'+this.name+'_slider' ).slider( opt );
						me.set_values();
					},
				val:function()
					{
						var e = $( '[id="' + this.name + '"]:not(.ignore)' );
						return ( e.length ) ? e.val() : 0;
					}
		});	$.fbuilder.controls[ 'femail' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'femail' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Email",
			ftype:"femail",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"medium",
			equalTo:"",
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"" )+' class="field email '+this.size+((this.required)?" required":"")+'" type="text" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length ) return $.fbuilder.parseValStr( e.val() );
					return '';
				}	
		}
	);	$.fbuilder.controls[ 'fdate' ] = function(){};
	$.extend(
		$.fbuilder.controls[ 'fdate' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Date",
			ftype:"fdate",
			predefined:"",
			predefinedClick:false,
			size:"medium",
			required:false,
			dformat:"mm/dd/yyyy",
			tformat:"24",
			showDropdown:false,
			dropdownRange:"-10:+10",
			minDate:"",
			maxDate:"",
            invalidDates:"",
			minHour:0,
			maxHour:23,
			minMinute:0,
			maxMinute:59,
			
			stepHour: 1,
			stepMinute: 1,
			
			showTimepicker: false,
			
			defaultDate:"",
			defaultTime:"",
			working_dates:[true,true,true,true,true,true,true],
			formats:new Array("mm/dd/yyyy","dd/mm/yyyy"),
			init:function()
				{
					function checkValue( v, min, max )
						{
							v = parseInt( v );
							if( isNaN( v ) )   v = max;
							else if( v < min ) v = min;
							else if( v > max ) v = max;
							return v;
						}
						
					this.minHour 	= checkValue( this.minHour, 0, 23 );
					this.maxHour 	= checkValue( this.maxHour, 0, 23 );
					this.minMinute 	= checkValue( this.minMinute, 0, 59 );
					this.maxMinute 	= checkValue( this.maxMinute, 0, 59 );
					this.stepHour 	= checkValue( this.stepHour, 1, Math.max( 1, this.maxHour - this.minHour ) );
					this.stepMinute = checkValue( this.stepMinute, 1, Math.max( 1, this.maxMinute - this.minMinute ) );
                    
                    this.invalidDates = this.invalidDates.replace( /\s+/g, '').match( /\d{1,2}\/\d{1,2}\/\d{4}/g );
                    if( this.invalidDates !== null )
                    {
                        for( var i = 0, h = this.invalidDates.length; i < h; i++ )
                            this.invalidDates[ i ] = new Date( this.invalidDates[ i ] );
                    }
                },
			get_hours:function()
				{
					var str = '',
						i = 0,
						h,
						from = ( this.tformat == 12 ) ? 1  : this.minHour,
						to   = ( this.tformat == 12 ) ? 12 : this.maxHour;
					
					while( ( h = from + this.stepHour * i ) <= to )
					{

						if( h < 10 ) h = '0'+''+h;
						str += '<option value="' + h + '">' + h + '</option>';
						i++;
					}
					return '<select id="'+this.name+'_hours" name="'+this.name+'_hours">' + str + '</select>:';
				},
			get_minutes:function()
				{
					var str = '',
						i = 0,
						m;
					
					while( ( m = this.minMinute + this.stepMinute * i ) <= this.maxMinute )
					{
						if( m < 10 )
						{
							m = '0'+''+m;
						}
						str += '<option value="' + m + '">' + m + '</option>';
						i++;
					}
					return '<select id="'+this.name+'_minutes" name="'+this.name+'_minutes">' + str + '</select>';
				},
			get_ampm:function()
				{
					var str = '';	
					if( this.tformat == 12 )
					{
						return '<select id="'+this.name+'_ampm"><option value="am">am</option><option value="pm">pm</option></select>';
					}
					return str;
				},
			set_date_time:function()
				{
					var str = $( '#'+this.name+'_date' ).val();
					if( this.showTimepicker )
					{
						var h = $( '#'+this.name+'_hours' ).val();
						str += ' '+( ( this.tformat == 12 && $( '#'+this.name+'_ampm' ).val() == 'pm' ) ? ( h*1 + 12 ) % 24 : h )+':'+$( '#'+this.name+'_minutes' ).val();
					}
					$( '#'+this.name ).val( str ).change();
				},
			show:function()
				{
                    var attr = 'value';
                    if( this.predefinedClick )
                    {
                        attr = 'placeholder';
                    }
                    
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+' <span class="dformat">('+this.dformat+( ( this.showTimepicker ) ? ' HH:mm': '' )+')</span></label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" type="hidden" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><input id="'+this.name+'_date" name="'+this.name+'_date" class="field date'+this.dformat.replace(/\//g,"")+' '+this.size+((this.required)?" required":"")+'" type="text" '+attr+'="'+$.fbuilder.htmlEncode(this.predefined)+'"/>'+( ( this.showTimepicker ) ? ' '+this.get_hours()+this.get_minutes()+' '+this.get_ampm() : '' )+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			setEvents : function()
				{
					var me = this;
					$( document ).on( 'change', '#'+this.name+'_date', 	  function(){ me.set_date_time(); } );
					$( document ).on( 'change', '#'+this.name+'_hours',   function(){ me.set_date_time(); } );
					$( document ).on( 'change', '#'+this.name+'_minutes', function(){ me.set_date_time(); } );
					$( document ).on( 'change', '#'+this.name+'_ampm', 	  function(){ me.set_date_time(); } );
				},
			after_show:function()
				{
					function setValue( f, v, m )
					{
						v = Math.min( v*1, m*1 );
						v = ( v < 10 ) ? 0+''+v : v; 
						$( '#' + f + ' [value="' + v + '"]' ).attr( 'selected', true );
					};
					
                    function validateDate( d, w, i )
                    {
                        try{
                            if( d === null ) return [false,""];
                            if ( !w[ d.getDay()]) return [false,""];
                            if( i !== null )
                            {
                                for( var j = 0, h = i.length; j < h; j++ )
                                {
                                    if( d.getDate() == i[ j ].getDate() && d.getMonth() == i[ j ].getMonth() && d.getFullYear() == i[ j ].getFullYear() ) return [false,""];
                                }
                            }
                        }
                        catch( _err ){}
                        return [true,""]; 
                    };
                    
					function validateTime( e, i )
					{
						if( i.showTimepicker )
						{
							var base = e.name.replace( '_date', '' ),
								h = $('#'+base+'_hours').val(),
								m = $('#'+base+'_minutes').val();
								
							if( i.tformat == 12 && $('#'+base+'_ampm').val() == 'pm' ) h = h*1 + 12;
							if( h < i.minHour || h > i.maxHour ) return false;
						}
						return true;	
					};

                    function validator( v, e )
                    {
												
                        try
                        {
                            var p           = e.name.replace( '_date', '' ).split( '_' ),
                                item        = $.fbuilder[ 'forms' ][ '_'+p[ 1 ] ].getItem( p[ 0 ]+'_'+p[ 1 ] ),
                                inst        = $.datepicker._getInst( e ),
                                minDate     = $.datepicker._determineDate( inst, $.datepicker._get( inst, 'minDate'), null),
                                maxDate     = $.datepicker._determineDate(inst, $.datepicker._get(inst, 'maxDate'), null),
                                dateFormat  = $.datepicker._get(inst, 'dateFormat'),
                                date        = $.datepicker.parseDate(dateFormat, v, $.datepicker._getFormatConfig(inst));

                            return 	this.optional( e ) || 
									( 
										( minDate == null || date >= minDate  ) && 
										( maxDate == null || date <= maxDate ) && 
										validateDate( $( e ).datepicker( 'getDate' ), item.working_dates, item.invalidDates )[ 0 ] &&
										validateTime( e, item )
									);
                        }
                        catch( er )
                        {
                            return false;
                        }
                    };
                    
					this.setEvents();
					var p  = { 
							dateFormat: this.dformat.replace(/yyyy/g,"yy"),
							minDate: this.minDate,
							maxDate: this.maxDate
						},
						dp = $( "#"+this.name+"_date" ),
						dd = (this.defaultDate != "") ? this.defaultDate : ( ( this.predefined != "" ) ? this.predefined : new Date() );

					dp.click( function(){ $(document).click(); $(this).focus(); } );	
					if (this.showDropdown) p = $.extend(p,{changeMonth: true,changeYear: true,yearRange: this.dropdownRange});
					p = $.extend(p, { beforeShowDay: ( function ( w, i ) { return function( d ){ return validateDate( d, w, i ); }; } )( this.working_dates, this.invalidDates ) } );
					dp.datepicker(p);
                    if( !this.predefinedClick ) dp.datepicker( "setDate", dd);
                    if( !validateDate( dp.datepicker( "getDate"), this.working_dates, this.invalidDates)[ 0 ]  )
                    {    
                        dp.datepicker( "setDate", '');
                    }
					
					if( this.showTimepicker )
					{
						var parts, time = {}, tmp = 0;
						if(  ( parts = /(\d{1,2}):(\d{1,2})/g.exec( this.defaultTime ) ) != null )
						{
							time[ 'hour' ] = parts[ 1 ];
							time[ 'minute' ] = parts[ 2 ];
						}
						else
						{
							var d = new Date();
							time[ 'hour' ] = d.getHours();
							time[ 'minute' ] = d.getMinutes();
						}
 
						setValue( 
							this.name+'_hours', 
							( this.tformat == 12 ) ? ( ( time[ 'hour' ] > 12 ) ? time[ 'hour' ] - 12 : ( ( time[ 'hour' ] == 0 ) ? 12 : time[ 'hour' ] ) ) : time[ 'hour' ], 
							( this.tformat == 12 ) ? 12 : this.maxHour 
						);

						setValue( this.name+'_minutes', time[ 'minute' ], this.maxMinute );					  						
						$( '#'+this.name+'_ampm'+' [value="' + ( ( time[ 'hour' ] < 12 ) ? 'am' : 'pm' ) + '"]' ).attr( 'selected', true );
					}
					
					$( '#'+this.name+'_date' ).change();
                    
                    $.validator.addMethod("dateddmmyyyy", validator );
					$.validator.addMethod("datemmddyyyy", validator );
				},
			val:function()
				{

					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length )
					{
						var v = $.trim( e.val() ),
							d = /(\d{1,2})\/(\d{1,2})\/(\d{4})(\s(\d{1,2}):(\d{1,2}))?/.exec( v ),
							h = 0,
							m = 0;
												
						if( d )
						{
							if( typeof d[ 5 ] != 'undefined' ) h = d[ 5 ];
							if( typeof d[ 6 ] != 'undefined' ) m = d[ 6 ];
							
							var date = ( this.dformat == 'mm/dd/yyyy' ) ? new Date( d[ 3 ], ( d[ 1 ] * 1 - 1 ), d[ 2 ], h, m, 0, 0 ) : new Date( d[ 3 ], ( d[ 2 ] * 1 - 1 ), d[ 1 ], h, m, 0, 0 );

							if( this.showTimepicker )
							{
								return date.valueOf() / 86400000;
							}
							else
							{
								return Math.ceil( date.valueOf() / 86400000 );
							}
						}	
					}
					return 0;
				}
		}
	);	$.fbuilder.controls[ 'ftextarea' ] = function(){};
	$.extend(
		$.fbuilder.controls[ 'ftextarea' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ftextarea",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"medium",
			minlength:"",
			maxlength:"",
            rows:4,
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><textarea '+((!/^\s*$/.test(this.rows)) ? 'rows='+this.rows : '' )+' id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" class="field '+this.size+((this.required)?" required":"")+'">'+this.predefined+'</textarea><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' ),
						v = '';
						
					if( e.length )
					{
						v = e.val();
					}
					
					return v;	
				}	
		}
	);	$.fbuilder.controls[ 'fcheck' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fcheck' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Check All That Apply",
			ftype:"fcheck",
			layout:"one_column",
			required:false,
			showDep:false,
			show:function()
				{
					this.choicesVal = ((typeof(this.choicesVal) != "undefined" && this.choicesVal !== null)?this.choicesVal:this.choices.slice(0));
					var str = "";
					if (!(typeof(this.choicesDep) != "undefined" && this.choicesDep !== null))
					{
						this.choicesDep = new Array();
						for (var i=0;i<this.choices.length;i++)
						{
							this.choicesDep[i] = new Array();
						}	
					}
					for (var i=0;i<this.choices.length;i++)
					{
						var classDep = "",
							attrDep = "",
							separator = "",
							d = this.choicesDep[ i ];

						for (var j=0;j<d.length;j++)
						{
							if( !/^\s*$/.test( d[j] ) )
							{
								classDep = "depItem";
								attrDep += separator+d[j];
								separator = ",";
							}	
						}
						
						str += '<div class="'+this.layout+'"><label><input name="'+this.name+'[]" '+((classDep!="")?"dep=\""+attrDep+"\"":"")+' id="'+this.name+'" class="field '+classDep+' group '+((this.required)?" required":"")+'" value="'+$.fbuilder.htmlEncode(this.choicesVal[i])+'" vt="'+$.fbuilder.htmlEncode(this.choices[i])+'" type="checkbox" '+((this.choiceSelected[i])?"checked":"")+'/> '+this.choices[i]+'</label></div>';
					}
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label>'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield">'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			showHideDep:function( toShow, toHide )
				{
					var item = $( '#'+this.name+'.depItem' ),
						form_identifier = this.form_identifier;
						
					try
					{
						if( item.length )
						{
							var parent = item.closest( '.fields' );
							parent.find( '.field' ).each( function()
							{
								var item = $( this );

								if(  item.attr( 'dep' ) && item.attr( 'dep' ) != '' )
								{
									var d = item.attr( 'dep' ).split( ',' );
									for ( i=0; i<d.length; i++ )
									{
										if ( d[i] != "" )
										{
											d[i] = d[i] + form_identifier;
											if ( $.inArray( d[i], toShow ) == -1 )
											{
												try 
												{
													if ( item.is( ':checked' ) && $.inArray( item.attr( 'id' ), toHide ) == -1  )
													{
														$( '#'+d[i] ).closest( '.fields' ).css( 'display', '' );
														$( '#'+d[i] ).closest( '.fields' ).find( '.field' ).each( function(){
																$(this).removeClass( 'ignore' );
															});
															
														if( $.inArray( d[i], toShow ) == -1 )
														{
															toShow[toShow.length] = d[i];
														}
														
														var index = $.inArray( d[ i ], toHide );
														if( index != -1 )
														{
															toHide.splice( index, 1);
														}	
													}
													else
													{
														$( '#' + d[i] ).closest( '.fields' ).css( 'display', 'none' );
														$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each(function()
															{
																$(this).addClass('ignore');
															});
															
														if( $.inArray( d[i], toHide ) == -1 )
														{
															toHide[ toHide.length ] = d[ i ];
														}	
													}
												} catch(e){  }
											}
										}	
										
									}
								}
							});
						}
					}
					catch( e ){  }
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:checked:not(.ignore)' ),
						v = 0,
						me = this;
						
					if( e.length )
					{
						e.each( function(){
							v += $.fbuilder.parseVal( this.value );
						} );
					}
					return v;	
				}
		}
	);	$.fbuilder.controls[ 'fradio' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fradio' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Select a Choice",
			ftype:"fradio",
			layout:"one_column",
			required:false,
			choiceSelected:"",
			showDep:false,
			show:function()
				{
					this.choicesVal = ((typeof(this.choicesVal) != "undefined" && this.choicesVal !== null)?this.choicesVal:this.choices.slice(0));
					var str = "";

					if (!(typeof(this.choicesDep) != "undefined" && this.choicesDep !== null))
					{
						this.choicesDep = new Array();
						for (var i=0;i<this.choices.length;i++)
						{
							this.choicesDep[i] = new Array();
						}	
					}
					var classDep = "";
					for (var i=0, h = this.choicesDep.length;i<h;i++)
					{
						if( this.choicesDep[i].length )
						{
							classDep = "depItem";
							break;
						}
					}
					for (var i=0;i<this.choices.length;i++)
					{
						var attrDep = "",
							separator = "",
							d = this.choicesDep[ i ];
							
						for (var j=0;j<d.length;j++)
						{
							if( !/^\s*$/.test( d[j] ) )
							{
								attrDep += separator+d[j];
								separator = ",";
							}	
						}
						
						str += '<div class="'+this.layout+'"><label><input name="'+this.name+'" id="'+this.name+'" '+((attrDep!="")?"dep=\""+attrDep+"\"":"")+' class="field '+classDep+' group '+((this.required)?" required":"")+'" value="'+$.fbuilder.htmlEncode(this.choicesVal[i])+'" vt="'+$.fbuilder.htmlEncode(this.choices[i])+'" type="radio" i="'+i+'"  '+((this.choices[i]+' - '+this.choicesVal[i]==this.choiceSelected)?"checked":"")+'/> '+this.choices[i]+'</label></div>';
					}
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label>'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield">'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			showHideDep:function( toShow, toHide )
				{
					var item = $( '#'+this.name+'.depItem' ),
						form_identifier = this.form_identifier;
						
					try
					{

						if( item.length )
						{
							var parent = item.closest( '.fields' );
							parent.find( '.field' ).each( function()
							{

								var item = $( this );
	

								if(  item.attr( 'dep' ) && item.attr( 'dep' ) != '' )
								{
									var d = item.attr( 'dep' ).split( ',' );
									for ( i=0; i<d.length; i++ )
									{
										if ( d[i] != "" )
										{
											d[i] = d[i] + form_identifier;
											if ( $.inArray( d[i], toShow ) == -1 )
											{
												try 
												{
													if ( item.is( ':checked' ) && $.inArray( item.attr( 'id' ), toHide ) == -1 )
													{
														$( '#'+d[i] ).closest( '.fields' ).css( 'display', '' );
														$( '#'+d[i] ).closest( '.fields' ).find( '.field' ).each( function(){
																$(this).removeClass( 'ignore' );
															});
															
														if( $.inArray( d[i], toShow ) == -1 )
														{
															toShow[toShow.length] = d[i];
														}	
														
														var index = $.inArray( d[ i ], toHide );
														if( index != -1 )
														{
															toHide.splice( index, 1);
														}	
													}
													else
													{
														$( '#' + d[i] ).closest( '.fields' ).css( 'display', 'none' );
														$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each(function()
															{
																$(this).addClass("ignore");
															});
														
														if( $.inArray( d[i], toHide ) == -1 )
														{
															toHide[ toHide.length ] = d[ i ];
														}	
													}
												} catch(e){  }
											}
										}	
										
									}
								}
							});
						}
					}
					catch( e ){  }
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:checked:not(.ignore)' );
					if( e.length )
					{
						return $.fbuilder.parseVal( e.val() );
					}
					return 0;	
				}	
		}
	);	$.fbuilder.controls[ 'fdropdown' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fdropdown' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Select a Choice",
			ftype:"fdropdown",
			size:"medium",
			required:false,
			choiceSelected:"",
			showDep:false,
			show:function()
				{
					this.choicesVal = ((typeof(this.choicesVal) != "undefined" && this.choicesVal !== null)?this.choicesVal:this.choices.slice(0))
					
					var lv = this.choicesVal,
						l = this.choices,
						str = "";
						
					if (!(typeof(this.choicesDep) != "undefined" && this.choicesDep !== null))
					{
						this.choicesDep = new Array();
						for (var i=0;i<l.length;i++)
						{
							this.choicesDep[i] = new Array();
						}	
					}
					var classDep = "";
					for (var i=0, h = this.choicesDep.length;i<h;i++)
					{
						if( this.choicesDep[i].length )
						{
							classDep = "depItem";
							break;
						}
					}
					for (var i=0;i<l.length;i++)
					{
						var attrDep = "",
							separator = "",
							d = this.choicesDep[ i ];
							
						for (var j=0;j<d.length;j++)
						{
							if( !/^\s*$/.test( d[j] ) )
							{
								attrDep += separator+d[j];
								separator = ",";
							}	
						}
						
						str += '<option '+((attrDep!="")?"dep=\""+attrDep+"\"":"")+' '+((this.choiceSelected == l[i]+' - '+lv[i])?"selected":"")+' '+( ( classDep != '' ) ? 'class="'+classDep+'"' : '' )+' value="'+$.fbuilder.htmlEncode(lv[i])+'" vt="'+$.fbuilder.htmlEncode(l[i])+'" >'+l[i]+'</option>';
					}
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><select id="'+this.name+'" name="'+this.name+'" class="field '+( ( classDep != '' ) ? ' depItemSel ' : '' )+this.size+((this.required)?" required":"")+'" >'+str+'</select><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div><div class="clearer"></div></div>';
				},
			showHideDep:function( toShow, toHide )
				{
					var item = $( '#'+this.name ),
						form_identifier = this.form_identifier;
		
					try
					{
						if( item.find( '.depItem' ).length )
						{
							var id = item.attr( 'id' );
							item.find( '.depItem' ).each( function()
								{
									var item = $( this );
									if( item.attr( 'dep' ) && item.attr( 'dep' ) != '' )
									{
										var d = item.attr( 'dep' ).split( ',' );
										for ( i=0; i<d.length; i++ )
										{
											if ( d[i] != "" )
											{
												d[i] = d[i] + form_identifier;
												if ( $.inArray( d[i], toShow ) == -1 )
												{
													try 
													{
														if ( item.is( ':selected' ) && $.inArray( id, toHide ) == -1  )
														{
															$( '#'+d[i] ).closest( '.fields' ).css( 'display', '' );
															$( '#'+d[i] ).closest( '.fields' ).find( '.field' ).each( function(){
																	$(this).removeClass( 'ignore' );
																});
																
															if( $.inArray( d[i], toShow ) == -1 )
															{
																toShow[toShow.length] = d[i];
															}
															
															var index = $.inArray( d[ i ], toHide );
															if( index != -1 )
															{
																toHide.splice( index, 1);
															}	
														}
														else
														{
															$( '#' + d[i] ).closest( '.fields' ).css( 'display', 'none' );
															$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each(function()
																{
																	$(this).addClass("ignore");
																});
																
															if( $.inArray( d[i], toHide ) == -1 )
															{
																toHide[ toHide.length ] = d[ i ];
															}	
														}
													} catch(e){}
												}
											}	
										}
									}
								});
						}
					}
					catch( e ){}					
				}	
		}
	);	$.fbuilder.controls[ 'ffile' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'ffile' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ffile",
			required:false,
			size:"medium",
			accept:"",
			upload_size:"",
			multiple:false,
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input type="file" id="'+this.name+'" name="'+this.name+'[]" accept="'+this.accept+'" upload_size="'+this.upload_size+'" class="field '+this.size+((this.required)?" required":"")+'" '+( ( this.multiple ) ? 'multiple' : '' )+' /><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			after_show:function()
			{
                $.validator.addMethod("upload_size", function(value, element,params) 
			    {
			      return this.optional(element) || (element.files[0].size/1024 < params);
			    });
			}	  
		}         
	);            
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  
                  	$.fbuilder.controls[ 'fpassword' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'fpassword' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"fpassword",
			predefined:"",
			predefinedClick:false,
			required:false,
			size:"medium",
			minlength:"",
			maxlength:"",
			equalTo:"",
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" minlength="'+(this.minlength)+'" maxlength="'+$.fbuilder.htmlEncode(this.maxlength)+'" '+((this.equalTo!="")?"equalTo=\"#"+$.fbuilder.htmlEncode(this.equalTo+this.form_identifier)+"\"":"" )+' class="field '+this.size+((this.required)?" required":"")+'" type="password" value="'+$.fbuilder.htmlEncode(this.predefined)+'"/><span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length ) return $.fbuilder.parseValStr( e.val() );
					return '';
				}		
		}
	);	$.fbuilder.controls[ 'fPhone' ]=function(){};
	$.extend( 
		$.fbuilder.controls[ 'fPhone' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Phone",
			ftype:"fPhone",
			required:false,
			dformat:"### ### ####",
			predefined:"888 888 8888",
			show:function()
				{
					var me   = this,
						str  = "",
						tmp  = this.dformat.split(' '),
						tmpv = this.predefined.split(' '),
						attr = ( typeof this.predefinedClick != 'undefined' && this.predefinedClick ) ? 'placeholder' : 'value';
						
					for (var i=0;i<tmpv.length;i++)
					{
						if ($.trim(tmpv[i])=="")
						{
							tmpv.splice(i,1);
						}
					}	
					
					for (var i=0;i<tmp.length;i++)
					{
						if ($.trim(tmp[i])!="")
						{
							str += '<div class="uh_phone" ><input type="text" id="'+this.name+'_'+i+'" name="'+this.name+'_'+i+'" class="field digits '+((this.required)?" required":"")+'" style="width:'+(15*$.trim(tmp[i]).length)+'px" '+attr+'="'+((tmpv[i])?tmpv[i]:"")+'" maxlength="'+$.trim(tmp[i]).length+'" minlength="'+$.trim(tmp[i]).length+'"/><div class="l">'+$.trim(tmp[i])+'</div></div>';
						}
					}	
					
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><label for="'+this.name+'">'+this.title+''+((this.required)?"<span class='r'>*</span>":"")+'</label><div class="dfield"><input type="hidden" id="'+this.name+'" name="'+this.name+'" class="field " />'+str+'<span class="uh">'+this.userhelp+'</span></div><div class="clearer"></div></div>';
				},
            after_show: function()
				{
					var me   = this,
						tmp  = me.dformat.split(' ');
					
					for (var i = 0, h = tmp.length; i < h; i++ )
					{
						$( '#'+me.name+'_'+i ).bind( 'change', function(){ 
							var v = '';
							for( var i = 0; i < tmp.length; i++ )
							{
								v += $( '#'+me.name+'_'+i ).val();
							}
							$( '#'+me.name ).val( v ).change();
						} );
						if( i+1 < h )
						{
							$('#'+me.name+'_'+i).bind( 'keyup', { 'next': i+1 }, function( evt ){
								var e = $( this );
								if( e.val().length == e.attr( 'maxlength' ) )
								{
									e.change();
									$( '#'+me.name+'_'+evt.data.next ).focus();
								}
							} );
						}    
					}
				},
			val:function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length ) return $.fbuilder.parseValStr( e.val() );
					return '';
				}	
		}
	);	$.fbuilder.controls[ 'fCommentArea' ]=function(){};
	$.extend( 
		$.fbuilder.controls[ 'fCommentArea' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Comments here",
			ftype:"fCommentArea",
			userhelp:"A description of the section goes here.",
			show:function()
				{
						return '<div class="fields '+this.csslayout+' comment_area" id="field'+this.form_identifier+'-'+this.index+'"><label id="'+this.name+'">'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';
				}	
		}
	);	$.fbuilder.controls[ 'fhidden' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fhidden' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			ftype:"fhidden",
			title:"",
			predefined:"",
			show:function()
				{
					return '<div class="fields" id="field'+this.form_identifier+'-'+this.index+'" style="padding:0;margin:0;border:0;width:0;height:0;overflow:hidden;"><label for="'+this.name+'">'+this.title+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" type="hidden" value="'+$.fbuilder.htmlEncode(this.predefined)+'" class="field" /></div></div>';
				}
		}	
	);	$.fbuilder.controls[ 'fSectionBreak' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'fSectionBreak' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Section Break",
			ftype:"fSectionBreak",
			userhelp:"A description of the section goes here.",
			show:function()
				{
						return '<div class="fields '+this.csslayout+' section_breaks" id="field'+this.form_identifier+'-'+this.index+'"><div class="section_break" id="'+this.name+'" ></div><label>'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';
				}
		}
	);	$.fbuilder.controls[ 'fPageBreak' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fPageBreak' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Page Break",
			ftype:"fPageBreak",
			show:function()
				{
						return '<div class="fields '+this.csslayout+' section_breaks" id="field'+this.form_identifier+'-'+this.index+'"><div class="section_break" id="'+this.name+'" ></div><label>'+this.title+'</label><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';
				}
		}
	);	$.fbuilder.controls[ 'fsummary' ] = function(){};
	$.extend(
		$.fbuilder.controls[ 'fsummary' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Summary",
			ftype:"fsummary",
			fields:"",
			titleClassname:"summary-field-title",
			valueClassname:"summary-field-value",
			fieldsArray:[],
			show:function()
				{
					var me = this,
                        p = $.trim( me.fields.replace( /\,+/g, ',') ).split( ',' ),
					    l = p.length;
					if( l )
					{
						var str = '<div class="fields '+me.csslayout+'" id="field'+me.form_identifier+'-'+me.index+'">'+( ( !/^\s*$/.test( me.title ) ) ? '<h2>'+me.title+'</h2>': '' )+'<div id="'+me.name+'">';
						for( var i = 0; i < l; i++ )
						{
							if( !/^\s*$/.test( p[ i ] ) )
							{
								p[ i ] = $.trim( p[ i ] );
								str += '<div ref="'+p[i]+me.form_identifier+'" class="cff-summary-item"><span class="'+me.titleClassname+' cff-summary-title"></span><span class="'+me.valueClassname+' cff-summary-value"></span></div>';
							}	
						}
						str += '</div></div>';
						
						return str;
					}
				},
			after_show: function(){
                    var me = this,
                        p = $.trim(me.fields.replace( /\,+/g, ',') ).split( ',' ),
                        l = p.length;
                        
                    if( l )
                    {
                        for( var i = 0; i < l; i++ )
                        {
                            if( !/^\s*$/.test( p[ i ] ) )
                            {
                                p[ i ] = $.trim( p[ i ] );
                                me.fieldsArray.push( p[ i ] + me.form_identifier );    
                                $( document ).on( 'change', '#' + p[ i ] + me.form_identifier, function(){ me.update(); } );
                            }	
                        }
                        $( document ).on( 'showHideDepEvent', function( evt, form_identifier )
                        {
						    me.update();
                        });
                        
                        $( '#cp_calculatedfieldsf_pform'+me.form_identifier ).bind( 'reset', function(){ setTimeout( function(){ me.update(); }, 10 ); } );
                    }
                },    
			update:function()
				{
					for ( var j = 0, k = this.fieldsArray.length; j < k; j++ )
					{
						var i  = this.fieldsArray[ j ],
							e  = $( '[id="' + i + '"]'),
							tt = $( '[ref="' + i + '"]');

						if( e.length && tt.length )
						{	
							var t  = $( '#' + i ).closest( '.fields' ).find( 'label:first' ).text(), 
								v  = [];
								
							e.each( 
								function(){ 
									var e = $(this);
									if( /(checkbox|radio)/i.test( e.attr( 'type' ) ) && !e.is( ':checked' ) ) 
									{
										return;
									}
									else if( e[0].tagName == 'SELECT' )
									{
										v.push( $(e[0].options[ e[0].selectedIndex ]).attr( 'vt' ) );
									}
									else
									{
									
										if( e.attr( 'vt' ) )
										{
											v.push( e.attr( 'vt' ) );
										}
										else
										{
											v.push( e.val() );
										}
									}	
								}
							);
							
							tt.find( '.cff-summary-title' ).html( ( /^\s*$/.test( t ) ) ? '' : t );
							tt.find( '.cff-summary-value' ).html( v.join( ', ' ) );	
							if( e.hasClass( 'ignore' ) )
							{
								tt.hide();
							}
							else
							{
								tt.show();
							}
						}	
					}
				}
	});
		$.fbuilder.controls[ 'fcontainer' ] = function(){};
	$.fbuilder.controls[ 'fcontainer' ].prototype = {
		fields:[],
		columns:1,
		after_show: function()
			{
				var e  = $( '#'+this.name ), f;
                for( var i = 0, h = this.fields.length; i < h; i++ )
				{
					f = $( '#'+this.fields[ i ]+this.form_identifier ).closest( '.fields' ).detach();
					if( this.columns > 1 )
					{
						f.addClass( 'column'+this.columns );
						if( i%this.columns == 0 ) f.css( 'clear', 'left' );
					}	
					f.appendTo( e );
				}					
			},
		showHideDep:function( toShow, toHide )
			{
				var hide = ( $.inArray( this.name, toHide ) != -1 ),
					index;
				
				
				for( var i = 0, h = this.fields; i < h; i++ )
				{
					if( $.inArray( this.fields[ i ]+this.form_identifier, toHide ) == -1 )
					{
						toHide.push( this.fields[ i ]+this.form_identifier );
						index = $.inArray( d[ i ], toShow );
						if( index != -1 )
						{
							toShow.splice( index, 1);
						}
						
						$( '#' + this.fields[ i ]+this.form_identifier ).closest( '.fields' )
																		.find( '.field' )
																		.each(function()
																		{
																			$(this).addClass('ignore');
																		});
					}
				}
			}
	};	$.fbuilder.controls[ 'ffieldset' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'ffieldset' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"ffieldset",
			fields:[],
			columns:1,
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><FIELDSET id="'+this.name+'">'+( ( !/^\s*$/.test( this.title ) ) ? '<LEGEND>'+this.title+'</LEGEND>' : '' )+'</FIELDSET><div class="clearer"></div></div>';
				},
			after_show: function()
				{
					$.fbuilder.controls[ 'fcontainer' ].prototype.after_show.call(this);
				},
			showHideDep:function( toShow, toHide )
				{
					$.fbuilder.controls[ 'fcontainer' ].prototype.showHideDep.call( this, toShow, toHide );
				}
		}	
	);	$.fbuilder.controls[ 'fdiv' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'fdiv' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			ftype:"fdiv",
			fields:[],
			columns:1,
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><div id="'+this.name+'"></div><div class="clearer"></div></div>';
				},
			after_show: function()
				{
					$.fbuilder.controls[ 'fcontainer' ].prototype.after_show.call(this);
				},
			showHideDep:function( toShow, toHide )
				{
					$.fbuilder.controls[ 'fcontainer' ].prototype.showHideDep.call( this, toShow, toHide );
				}
		}	
	);	$.fbuilder.controls[ 'fMedia' ]=function(){};
	$.extend( 
		$.fbuilder.controls[ 'fMedia' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			ftype:"fMedia",
            sMediaType:"image", // image, audio, video
            data:{
                image:{
                    sWidth:"",
                    sHeight:"",
                    sSrc:"",
                    sAlt:"",
                    sLink:"",
                    sTarget:"",
                    sFigcaption: ""
                },
                audio:{
                    sWidth:"",
                    sSrc:"",
                    sSrcAlt:"",
                    sControls:1,
                    sLoop:0,
                    sAutoplay:0,
                    sMuted:0,
                    sPreload: "auto",
                    sFallback: "",
                    sFigcaption: ""
                },
                video:{
                    sWidth:"",
                    sHeight:"",
                    sSrc:"",
                    sSrcAlt:"",
                    sPoster:"",
                    sControls:1,
                    sLoop:0,
                    sAutoplay:0,
                    sMuted:0,
                    sPreload: "auto",
                    sFallback: "",
                    sFigcaption: ""
                }
            },
            _show_image: function()
                {
                    var d = this.data.image,
                        esc = $.fbuilder.htmlEncode,
                        a = [],
                        l = [],
                        r = '';
                        
                    if( $.trim( d.sWidth ) ) a.push( 'width="'+esc( d.sWidth )+'"' );
                    if( $.trim( d.sHeight ) ) a.push( 'height="'+esc( d.sHeight )+'"' );
                    if( $.trim( d.sSrc ) ) a.push( 'src="'+esc( d.sSrc )+'"' );
                    if( $.trim( d.sAlt ) ) a.push( 'alt="'+esc( d.sAlt )+'"' );
                    if( $.trim( d.sLink ) )
                    {
                        l.push( 'href="'+esc( d.sLink )+'"' );
                        if( $.trim( d.sTarget ) ) l.push( 'target="'+esc( d.sTarget )+'"' );
                        r = '<a '+l.join( ' ' )+' ><img '+a.join( ' ' )+' /></a>';
                    }
                    else
                    {
                        r = '<img '+a.join( ' ' )+' />';
                    }
                 
                    return r;
                },
			_show_audio_video: function( d, isV )
                {
                    var esc = $.fbuilder.htmlEncode,
                        a = [],
                        t = ( isV ) ? 'video' : 'audio' ;
                        
                    if( $.trim( d.sWidth ) ) a.push( 'width="'+esc( d.sWidth )+'"' );
                    if( isV && $.trim( d.sHeight ) ) a.push( 'height="'+esc( d.sHeight )+'"' );
                    if( isV && $.trim( d.sPoster ) ) a.push( 'poster="'+esc( d.sPoster )+'"' );
                    if( $.trim( d.sSrc ) ) a.push( 'src="'+esc( d.sSrc )+'"' );
                    if( d.sAutoplay ) a.push( 'autoplay' );
                    if( d.sControls ) a.push( 'controls' );
                    if( d.sLoop ) a.push( 'loop' );
                    if( d.sMuted ) a.push( 'muted' );
                    a.push( 'preload="'+esc( d.sPreload )+'"' );
                    
                    return '<'+t+' '+a.join( ' ' )+'>'+( ( $.trim( d.sSrcAlt ) ) ? '<source src="'+esc( d.sSrcAlt )+'" />' : '' )+'<p>'+d.sFallback+'</p></'+t+'>';
                },
            _show_audio: function()
                {
                    return this._show_audio_video( this.data.audio, false );
                },
            _show_video: function()
                {
                    return this._show_audio_video( this.data.video, true );
                },
            show:function()
				{
						return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><div class="clearer"><div class="field" id="'+this.name+'">'+this[ '_show_'+this.sMediaType]()+'</div></div><span class="uh">'+this.data[ this.sMediaType].sFigcaption+'</span><div class="clearer"></div></div>';
				}
		}
	);	$.fbuilder.controls[ 'fButton' ]=function(){};
	$.extend( 
		$.fbuilder.controls[ 'fButton' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			ftype:"fButton",
            sType:"button",
            sValue:"button",
            sOnclick:"",
			userhelp:"A description of the section goes here.",
			show:function()
				{
                    var esc  = $.fbuilder.htmlEncode,
                        type = this.sType,
                        clss = '';
                        
                    if( this.sType == 'calculate' )
                    {
                        type = 'button';
                        clss = 'calculate-button';
                    }
                    
                    return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'"><input id="'+this.name+'" type="'+type+'" value="'+esc( this.sValue )+'" class="field '+clss+'" onclick="'+esc( this.sOnclick )+'" /><span class="uh">'+this.userhelp+'</span><div class="clearer"></div></div>';
				},
            after_show:function()
                {
                    $( '#'+this.name ).click(
                        function()
                            {
                                var e = $( this );
                                if( e.hasClass( 'calculate-button' ) )
                                {
                                    var suffix = e.attr( 'id' ).match(/_\d+$/)[0],
                                        items = $.fbuilder[ 'forms' ][ suffix ].getItems();
                                    
                                    $.fbuilder[ 'calculator' ].defaultCalc( '#'+e.closest( 'form' ).attr( 'id' ) );
                                    for(var i = 0, h = items.length; i < h; i++ )
                                    {
                                        if(items[i].ftype == 'fsummary')
                                        { 
                                            items[i].update();
                                        }
                                    }    
                                }
                            }
                    );
                }
		}
	);	$.fbuilder.controls[ 'fCalculated' ] = function(){};
	$.extend( 
		$.fbuilder.controls[ 'fCalculated' ].prototype, 
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Untitled",
			ftype:"fCalculated",
			predefined:"",
			required:false,
			size:"medium",
			eq:"",
			eq_factored:"",
			suffix:"",
			prefix:"",
			decimalsymbol:".",
			groupingsymbol:"",
			dependencies:[ {'rule' : '', 'complex' : false, 'fields' : [ '' ] } ],
			readonly:true,
			hidefield:false,
			show:function()
				{
					return '<div class="fields '+this.csslayout+'" id="field'+this.form_identifier+'-'+this.index+'" style="'+((this.hidefield)? 'padding:0;margin:0;border:0;opacity:0;width:0;height:0;overflow:hidden;' : '' )+'"><label>'+this.title+''+( ( this.required ) ? '<span class="r">*</span>' : '' )+'</label><div class="dfield"><input id="'+this.name+'" name="'+this.name+'" '+((this.readonly) ? ' readonly ' : '')+' class="codepeoplecalculatedfield field '+this.size+((this.required)?" required":"")+'" type="'+( ( this.hidefield ) ? 'hidden' : 'text' )+'" value="'+this.predefined+'"/>'+( ( !this.hidefield ) ? '<span class="uh">'+this.userhelp+'</span>' : '' )+'</div><div class="clearer"></div></div>';
				},
            after_show:function()
				{
                    // Add equations
					var me = this,
						configuration = { "suffix" : me.suffix, "prefix" : me.prefix, "groupingsymbol" : me.groupingsymbol, "decimalsymbol" : me.decimalsymbol },
						dependencies = [];

					$.each( this.dependencies, function( i, d )
						{
							d.rule = d.rule.replace( /^\s+/, '').replace( /\s+$/, '');
							if( d.rule != '' && d.fields.length ){
							
								var fields = [];
								$.each( d.fields, function( j, f ){
									if( f != '' ) 
									{
										fields.push( f );
									}	
								});

								if( fields.length ){
									dependencies.push( { 'rule' : d.rule, 'fields' : fields } );
								}
							}
						});
					
					if( typeof this.optimizeEq == 'undefined' || !this.optimizeEq || /^\s*$/.test( this.eq_factored ) )
					{
						this.eq_factored = this.eq;
					}
					else
					{
						var tmp = this.eq_factored.replace( /fieldname\d+/g, 1 );
                        try{
                            eval( tmp );
                        }catch( er )
                        {
                            this.eq_factored = this.eq;
                        }
					}	
					var eq = this.eq_factored;
					eq = eq.replace(/\n/g, ' ').replace(/fieldname(\d+)/g, "fieldname$1"+this.form_identifier).replace( /;\s*\)/g, ')').replace(/;\s*$/, '');
                    
					if( !/^\s*$/.test(this.eq) )
                    {
                        $.fbuilder.calculator.addEquation( this.name, eq, configuration, dependencies, this.form_identifier );
                    }
                    
                    // Events
			        var e = $( '[id="'+this.name+'"]' );
                    e.bind( 
                        'calcualtedfield_change',
                        {obj: this},
                        function( evt ){
                            if( $.fbuilder[ 'calculator' ].getDepList( evt.data.obj.name, evt.data.obj.val(), evt.data.obj.dependencies ) )
                            {
                                $.fbuilder.showHideDep( 
                                                {
                                                    'formIdentifier' : evt.data.obj.form_identifier, 
                                                    'throwEvent' 	 : false 
                                                }
                                            );
                            }
                        } 
                    ).bind(
                        'change',
                        function( evt )
                        {
                            $( evt.target ).trigger( 'calcualtedfield_change' );
                        }
                    );
                },
			showHideDep: function( toShow, toHide )
				{
					var item = $( '#'+this.name ),
						identifier = this.form_identifier;
					try 
					{
						if ( ( item.closest( '#fieldlist' + identifier ).length==1 ) && ( ( item.attr( 'dep' ) && item.attr( 'dep' ) != '' ) || ( item.attr( 'notdep' ) && item.attr( 'notdep' ) != '' ) ) )
						{
							var d = item.attr( 'dep').split( ',' );
							for ( i=0; i<d.length; i++ )
							{
								if ( d[i] != '')
								{
									d[i] = d[i]+identifier;
									if ( $.inArray( d[i], toShow ) == -1 )
									{
										try 
										{
											if  ( $.inArray( item.attr( 'id' ), toHide ) == -1 )
											{
												$( '#' + d[i] ).closest( '.fields' ).css( 'display', '' );
												$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each( function()
													{
														$(this).removeClass( 'ignore' );
													});
													
												if( $.inArray( d[i], toShow ) == -1 )
												{
													toShow[ toShow.length ] = d[i];
												}	
												
												var index = $.inArray( d[ i ], toHide );
												if( index != -1 )
												{
													toHide.splice( index, 1 );
												}	
											}
											else
											{
												$( '#' + d[i] ).closest( '.fields' ).css( 'display', 'none' );
												$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each(function()
													{
														$(this).addClass( 'ignore');
													});
												
												if( $.inArray( d[i], toHide ) == -1 )
												{
													toHide[ toHide.length ] = d[i];
												}	
											}
										} 
										catch(e){}
									}
								}	
								
							}
							
							var d = item.attr( 'notdep' ).split( ',' );
							for ( i=0; i<d.length; i++ )
							{
								if ( d[i] != '' ) 
								{
									d[i] = d[i]+identifier;
									if ( d[i] != ''  && $.inArray( d[i], toShow ) == -1 )
									{
										try 
										{
												$( '#' + d[i] ).closest( '.fields' ).css( 'display', 'none' );
												$( '#' + d[i] ).closest( '.fields' ).find( '.field' ).each(function()
													{
														$(this).addClass( 'ignore');
													});
												toHide[ toHide.length ] = d[i];
										} 
										catch(e){}
									}
								}	
							}
						}
					} 
					catch(e){}
				},
			val : function()
				{
					var e = $( '[id="' + this.name + '"]:not(.ignore)' );
					if( e.length )
					{
						var v = $.trim( e.val() );
						
						v = v.replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.prefix), 'g' ), '' )
						     .replace( new RegExp( $.fbuilder[ 'escape_symbol' ](this.suffix), 'g' ), '' );
						
						return $.fbuilder.parseVal( v, this.groupingsymbol, this.decimalsymbol );	 
					}
					return 0;
				}
		}
	);
	
	/*
	* Extend the window object with the methods of obj, the prefix is used to avoid redefine window methods
	*/
	$.fbuilder[ 'extend_window' ]  = function( prefix, obj)
		{
			for( method in obj )
			{ 
				window[ prefix+method ] = (function( m )
					{ 
						return function()
							{
								return m.obj[ m.method_name ].apply( m.obj, arguments );
							};
					})({ "method_name" : method, 'obj' : obj });
			}
		};

	// Calculate Field code
	$.fbuilder[ 'calculator' ] = (function()
		{
				// Used to validate the equations results
				var validators = [];
				
                // Loading available modules
				if( typeof $.fbuilder[ 'modules' ] != 'undefined' )
				{
					var modules = $.fbuilder[ 'modules' ];
					for( var module in modules )
					{
						if( typeof modules[ module ][ 'callback' ] != 'undefined' )
						{
							modules[ module ][ 'callback' ]();
						}
						
						if( typeof modules[ module ][ 'validator' ] != 'undefined' )
						{
							validators.push( modules[ module ][ 'validator' ] );
						}
					}
				}
				
				// Private function to validate the equation results
				_validate_result = function( v )
					{
						if( validators.length )
						{
							var h = validators.length;
							while( h-- )
							{
								if( validators[ h ]( v ) )
								{
									return true;
								}	
							}
						}
						else
						{
							return true;
						}
						
						return false;
					};
				
				// Private function, the variable names in the equations are replaced by its values, return the equation result or false if error
				_calculate = function( form , eq, suffix )
					{

						var f = $(form),
							_match,
							field_regexp = new RegExp( '(fieldname\\d+'+suffix+')([\\D\\b])');
						
						eq = '(' + eq + ')';
						
						while ( _match = field_regexp.exec( eq ) )
						{
							var field = $.fbuilder[ 'forms' ][ suffix ].getItem( _match[1] ),
								v = '';
							if( field )
							{
								v = field.val();
								if( $.isNumeric( v ) ) v = '('+v+')';
							}
							eq = eq.replace( _match[0], v+''+_match[2] ); // Replace the variable name by value
						}
						try
						{
							var r = eval( eq.replace( /^\(/, '' ).replace( /\)$/, '' ) ); // Evaluate the final equation
							return ( typeof r != 'undefined' && _validate_result( r ) ) ? r : false;
						}
						catch(e)
						{
							return false;
						}
					};
					
				// The public object
                var CalcFieldClss = function(){};
				CalcFieldClss.prototype = {
					enqueue_fields : [], // Used to avoid overload the users browsers 
					addEquation : function( calculeated_field, equation, configuration, dependencies, form_identifier )
						{
							var equation_result = $('[id="'+calculeated_field+'"]');
							if(equation_result.length)
							{
								var form = equation_result[0].form;
								if( typeof form.equations == 'undefined' ) form['equations'] = [];

								var  i, h = form.equations.length;
								
								// Avoid insert the equation multiple times to the form	
								for( i = 0 ; i < h; i++ ){
									if( form.equations[ i ].result == calculeated_field ) break;
								}
								// The equation hasn't been inserted previously
								if( i == h ){
									form.equations.push( {'result':calculeated_field, 'equation':equation, 'conf':configuration, 'dep':dependencies, 'identifier' : form_identifier} );
								}
							}

						},
						
					getDepList : function( calculated_field, value, dependencies ) // Get the list of dependent fields
						{
							var list    = [], // Fields that comply the rules
								list_h  = []; // Fields that don't comply the rules

							// The value is correct and the field has dependencies
							if( value !== false && dependencies.length )
							{
								for( var i = 0, h = dependencies.length; i < h; i++ )
								{
									try
									{
										// Get the rule and evaluate
										var rule = dependencies[i].rule.replace( /value/gi, value );
																	
										if( eval( rule ) )
										{
											$.each( dependencies[i].fields, function( j, e )
												{
													// Set the field if doesn't fail in other rule
													if( $.inArray( e, list_h ) == -1 && $.inArray( e, list ) == -1 )
													{
														list.push( e );
													}	
												} );
										}
										else
										{
											list_h = list_h.concat( dependencies[i].fields );
											// Remove dependent field from valid list
											$.each( dependencies[i].fields, function( j, e)
												{
													var j = $.inArray(e, list);
													if( j != -1) list.splice( j, 1 );
												});
										}
									}
									catch(e)
									{
										continue;
									}
								}
							}

							$('[id="'+calculated_field+'"]').attr( 'dep', list.join(',') ).attr('notdep', list_h.join( ',' ) );
							return list.length || list_h.length;
						},

                    defaultCalc : function( form_identifier, recalculate ) // Evaluate all equations in form
						{ 
							var form = $( form_identifier ),
								dep  = false;
								
							// The form exists and has equations
							if( form.length && ( typeof form[0].equations != 'undefined' ) )
							{
								var equation_object = form[0].equations;

								for( var i in equation_object )
								{
									var calculated_field = $( '[id="' + equation_object[i].result+'"]' );
									if( calculated_field.length )
									{
										var result = _calculate( form[0], equation_object[i].equation,  equation_object[i].identifier );
										// Check the dependent fields after evaluate the equations
										dep = this.getDepList( equation_object[i].result, result, equation_object[i].dep ) || dep;
										calculated_field.val(( ( result !== false ) ? this.format( result, equation_object[i].conf) : '' ));
									}
								}
							}
							
                            var _match = /(_\d+)$/.exec( form_identifier );
							if( dep && _match != null )
							{
								$.fbuilder.showHideDep( 
									{
										'formIdentifier' : _match[ 0 ], 
										'throwEvent' 	 : false 
									}
								);
							}
							if( typeof recalculate == 'undefined' || recalculate ) this.defaultCalc( form_identifier, false );
                            $( form ).trigger( 'cpcff_default_calc' );
						},

                    Calculate : function ( field )
						{
							if( field.id == undefined ) return;
							var form = field.form, 
								me = this;
							
							// If the fields is a button or image, return
							if(/(button|img)/i.test(field.tagName) || (field.type && /(button|submit)/i.test(field.type)))
							{
								return;
							}

							if( form && typeof form.equations != 'undefined' )
							{
								var equations = form.equations,
									id = field.id,
									reg = new RegExp( id+'[\\D\\b]' );

								for (var i in equations )
								{
									if( reg.test( equations[i].equation + ' ' ) ) // If the field is in the equation
									{ 
										var calculated_field = $( '[id="'+equations[i].result+'"]' );
										if( calculated_field.length )
										{
											var result = _calculate( form, equations[i].equation, equations[i].identifier );
											calculated_field.val( ( ( result !== false ) ? this.format( result, equations[i].conf ) : '' ) );
											calculated_field.change(); // Throw the change event to evaluate other equations
										}
									}
								}
							}
						},

                    format : function( value,  config )
						{
                            if( !/^\s*$/.test( value ) )
                            {
                                if( $.isNumeric( value )  && !/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)/.test( value ) )
                                {
                                    
                                    var symbol = ( value < 0 ) ? '-' : '',
                                        parts = value.toString().replace( "-", "" ).split("."),
                                        counter = 0,
                                        str = '';

                                    if(config.groupingsymbol)
                                    {
                                        for( var i = parts[0].length-1; i >= 0; i--){
                                            counter++;
                                            str = parts[0][i] + str;
                                            if( counter%3 == 0 && i != 0 ) str = config.groupingsymbol + str;

                                        }
                                        parts[0] = str;
                                    }
                                    
                                    value = symbol+parts.join( config.decimalsymbol );
                                }
                                
                                if( config.prefix )
                                {
                                    value = config.prefix + value;
                                }	
                                if( config.suffix ) 
                                {
                                    value += config.suffix;
                                }	
                            }    
							return value;
						},

                    unformat : function( field )
						{

							var escape_symbol = $.fbuilder.escape_symbol;

							var eq = field[0].form.equations,
								v = field.val();

							for(var i = 0, h = eq.length; i < h; i++)
							{
								if(eq[i].result == field[0].id)
								{
									var c = eq[i].conf; // Configuration object

									if( c.prefix && !/^\s*$/.test( c.prefix ) ) 
									{
										v = v.replace( new RegExp( "^" + escape_symbol( c.prefix ) ), '' );
									}
									
									if( c.suffix && !/^\s*$/.test( c.suffix ) )
									{
										v = v.replace( new RegExp( escape_symbol( c.suffix ) + "$" ), '' );
									}
									
									if( !/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)/.test( v ) )
									{
										if( c.groupingsymbol && !/^\s*$/.test( c.groupingsymbol ) )
										{
											v = v.replace( new RegExp( escape_symbol( c.groupingsymbol ), 'g' ), '' );
										}
									
										if( c.decimalsymbol && !/^\s*$/.test( c.decimalsymbol ) )
										{
											v = v.replace( new RegExp( escape_symbol( c.decimalsymbol ), 'g' ), '.' );
										}	
									}
								}
							}
							return v;
						}
				};

				var obj = new CalcFieldClss();
				
				// Associate events to the document for throw the corresponding equations
                $( document ).bind('keyup change blur', function(evt)
					{
                        // If evalequations = 0 the equations shouldn't be evaluated dynamically
                        var evalequations = $( evt.target ).closest( 'form' ).attr( 'data-evalequations' );
                        if( typeof evalequations != 'undefined' && evalequations*1 == 0 )
                        {
                            return;
                        }
                        
                        if( evt.type == 'keyup' )
						{
							// The key out of range
							if(evt.keyCode && (evt.keyCode >= 33 && evt.keyCode <= 40))
							{
								return;
							}
							
							if( $.inArray( evt.target, $.fbuilder[ 'calculator' ][ 'enqueue_fields' ] ) == -1 )
							{
								setTimeout( (function( t )
											{
												return function()
													{
														$.fbuilder[ 'calculator' ][ 'enqueue_fields' ].splice( $.inArray( t, $.fbuilder[ 'calculator' ][ 'enqueue_fields' ] ), 1 );
                                                        $( t ).trigger( 'calcualtedfield_change' );
														obj.Calculate( t );
													};
											})( evt.target ), 500 );
							}
						}
						else
						{
							var t = $( evt.target );
							if( t.hasClass( 'depItem' ) || ( t.prop( 'tagName' ) == 'INPUT' && t.attr( 'type' ).toLowerCase() == 'text' && evt.type != 'change' ) )
							{
								return;
							}
							obj.Calculate(evt.target);
						}
					});
				
				//Associate an event to the document waiting for the showHideDepEvent and recalculate all equations
				$(document).bind( 'showHideDepEvent', function( evt, form_identifier )
					{
                        // If evalequations = 0 the equations shouldn't be evaluated dynamically
                        var evalequations = $( '#'+form_identifier ).attr( 'data-evalequations' );
                        if( typeof evalequations == 'undefined' || evalequations*1 == 1 )
                        {
                            obj.defaultCalc( '#'+form_identifier );
                        }    
					});
                return obj; // Return the public object
            }
        )();try{
!function(a){function f(a,b){if(!(a.originalEvent.touches.length>1)){a.preventDefault();var c=a.originalEvent.changedTouches[0],d=document.createEvent("MouseEvents");d.initMouseEvent(b,!0,!0,window,1,c.screenX,c.screenY,c.clientX,c.clientY,!1,!1,!1,!1,0,null),a.target.dispatchEvent(d)}}if(a.support.touch="ontouchend"in document,a.support.touch){var e,b=a.ui.mouse.prototype,c=b._mouseInit,d=b._mouseDestroy;b._touchStart=function(a){var b=this;!e&&b._mouseCapture(a.originalEvent.changedTouches[0])&&(e=!0,b._touchMoved=!1,f(a,"mouseover"),f(a,"mousemove"),f(a,"mousedown"))},b._touchMove=function(a){e&&(this._touchMoved=!0,f(a,"mousemove"))},b._touchEnd=function(a){e&&(f(a,"mouseup"),f(a,"mouseout"),this._touchMoved||f(a,"click"),e=!1)},b._mouseInit=function(){var b=this;b.element.bind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),c.call(b)},b._mouseDestroy=function(){var b=this;b.element.unbind({touchstart:a.proxy(b,"_touchStart"),touchmove:a.proxy(b,"_touchMove"),touchend:a.proxy(b,"_touchEnd")}),d.call(b)}}}(jQuery);
}catch( err ){}        var fcount = 1;
        var fnum = "_"+fcount;
		
        while (eval("typeof cp_calculatedfieldsf_fbuilder_config"+fnum+" != 'undefined'") || fcount < 10 )
        {
			try {
            var cp_calculatedfieldsf_fbuilder_config = eval("cp_calculatedfieldsf_fbuilder_config"+fnum);
            var f = $("#fbuilder"+fnum).fbuilder($.parseJSON(cp_calculatedfieldsf_fbuilder_config.obj));
			f.fBuild.loadData("form_structure"+fnum);
			$("#cp_calculatedfieldsf_pform"+fnum).validate({
                ignore:".ignore,.ignorepb",
			    errorElement: "div",
			    errorPlacement: function(e, element) 
					{
						if (element.hasClass('group'))
							element = element.parent();
						e.insertBefore(element);
						e.addClass('message'); // add a class to the wrapper
						e.css('position', 'absolute');
						e.css('left',0 );
						e.css('top',element.parent().outerHeight(true));
					}
     		});
     		} catch (e) {}
	    	fcount++;
	    	fnum = "_"+fcount;
	    }
})(fbuilderjQuery);
});