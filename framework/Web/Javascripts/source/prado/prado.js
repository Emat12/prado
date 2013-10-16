/**
 * Prado base namespace
 * @namespace Prado
 */
var Prado =
{
	/**
	 * Version of Prado clientscripts
	 * @var Version
	 */
	Version: '3.2.3',
	
	/**
	 * Registry for Prado components
	 * @var Registry
	 */
	Registry: {},
};

/**
 * Performs a PostBack using javascript.
 * @function Prado.PostBack
 * @param options - Postback options
 * @param event - Event that triggered this postback
 * @... {string} FormID - Form that should be posted back
 * @... {optional boolean} CausesValidation - Validate before PostBack if true
 * @... {optional string} ValidationGroup - Group to Validate 
 * @... {optional string} ID - Validation ID 
 * @... {optional string} PostBackUrl - Postback URL
 * @... {optional boolean} TrackFocus - Keep track of focused element if true
 * @... {string} EventTarget - Id of element that triggered PostBack
 * @... {string} EventParameter - EventParameter for PostBack
 */
Prado.PostBack = function(options, event)
{
	var form = jQuery("#" + options['FormID']).get(0);
	var canSubmit = true;

	if(options['CausesValidation'] && typeof(Prado.Validation) != "undefined")
	{
		if(!Prado.Validation.validate(options['FormID'], options['ValidationGroup'], $(options['ID'])))
			return event.preventDefault();
	}

	if(options['PostBackUrl'] && options['PostBackUrl'].length > 0)
		form.action = options['PostBackUrl'];

	if(options['TrackFocus'])
	{
		var lastFocus = $('PRADO_LASTFOCUS');
		if(lastFocus)
		{
			var active = document.activeElement; //where did this come from
			if(active)
				lastFocus.value = active.id;
			else
				lastFocus.value = options['EventTarget'];
		}
	}

	$('PRADO_POSTBACK_TARGET').value = options['EventTarget'];
	$('PRADO_POSTBACK_PARAMETER').value = options['EventParameter'];
	/**
	 * Since google toolbar prevents browser default action,
	 * we will always disable default client-side browser action
	 */
	/*if(options['StopEvent']) */
		event.preventDefault();
	form.submit();

	$('PRADO_POSTBACK_TARGET').value = '';
	$('PRADO_POSTBACK_PARAMETER').value = '';
};

/**
 * Prado utilities to manipulate DOM elements.
 * @object Prado.Element
 */
Prado.Element =
{
	/**
	 * Set the value of a particular element.
	 * @function ?
	 * @param {string} element - Element id
	 * @param {string} value - New element value
	 */
	setValue : function(element, value)
	{
		var el = jQuery("#" + element).get(0);
		if(el && typeof(el.value) != "undefined")
			el.value = value;
	},

	/**
	 * Select options from a selectable element.
	 * @function ?
	 * @param {string} element - Element id
	 * @param {string} method - Name of any {@link Prado.Element.Selection} method
	 * @param {array|boolean|string} value - Values that should be selected
	 * @param {int} total - Number of elements 
	 */
	select : function(element, method, value, total)
	{
		var el = jQuery("#" + element).get(0);
		if(!el) return;
		var selection = Prado.Element.Selection;
		if(typeof(selection[method]) == "function")
		{
			var control = selection.isSelectable(el) ? [el] : selection.getListElements(element,total);
			selection[method](control, value);
		}
	},

	/**
	 * Trigger a click event on a DOM element.
	 * @function ?
	 * @param {string} element - Element id
	 */
	click : function(element)
	{
		var el = jQuery("#" + element).get(0);
		if(el)
			el.click();
	},
	
	/**
	 * Check if an DOM element is disabled.
	 * @function {boolean} ?
	 * @param {string} element - Element id
	 * @returns true if element is disabled
	 */
	isDisabled : function(element)
	{
		if(!element.attributes['disabled']) //FF
			return false;
		var value = element.attributes['disabled'].nodeValue;
		if(typeof(value)=="string")
			return value.toLowerCase() == "disabled";
		else
			return value == true;
	},

	/**
	 * Sets an attribute of a DOM element.
	 * @function ?
	 * @param {string} element - Element id
	 * @param {string} attribute - Name of attribute
	 * @param {string} value - Value of attribute
	 */
	setAttribute : function(element, attribute, value)
	{
		var el = jQuery("#" + element).get(0);
		if(!el) return;
		if((attribute == "disabled" || attribute == "multiple" || attribute == "readonly" || attribute == "href") && value==false)
			el.removeAttribute(attribute);
		else if(attribute.match(/^on/i)) //event methods
		{
			try
			{
				eval("(func = function(event){"+value+"})");
				el[attribute] = func;
			}
			catch(e)
			{
				debugger;
				throw "Error in evaluating '"+value+"' for attribute "+attribute+" for element "+element.id;
			}
		}
		else
			el.setAttribute(attribute, value);
	},

	/**
	 * Sets the options for a select element. 
	 * @function ?
	 * @param {string} element - Element id
	 * @param {array[]} options - Array of options, each an array of structure 
	 *   [ "optionText" , "optionValue" , "optionGroup" ]
	 */
	setOptions : function(element, options)
	{
		var el = jQuery("#" + element).get(0);
		if(!el) return;
		var previousGroup = null;
		var optGroup=null;
		if(el && el.tagName.toLowerCase() == "select")
		{
			while(el.childNodes.length > 0)
				el.removeChild(el.lastChild);

			var optDom = Prado.Element.createOptions(options);
			for(var i = 0; i < optDom.length; i++)
				el.appendChild(optDom[i]);
		}
	},

	/**
	 * Create opt-group options from an array of options. 
	 * @function {array} ?
	 * @param {array[]} options - Array of options, each an array of structure 
	 *   [ "optionText" , "optionValue" , "optionGroup" ]
	 * @returns Array of option DOM elements
	 */
	createOptions : function(options)
	{
		var previousGroup = null;
		var optgroup=null;
		var result = [];
		for(var i = 0; i<options.length; i++)
		{
			var option = options[i];
			if(option.length > 2)
			{
				var group = option[2];
				if(group!=previousGroup)
				{
					if(previousGroup!=null && optgroup!=null)
					{
						result.push(optgroup);
						previousGroup=null;
						optgroup=null;
					}
					optgroup = document.createElement('optgroup');
					optgroup.label = group;
					previousGroup = group;
				}
			}
			var opt = document.createElement('option');
			opt.text = option[0];
			opt.innerHTML = option[0];
			opt.value = option[1];
			if(optgroup!=null)
				optgroup.appendChild(opt);
			else
				result.push(opt);
		}
		if(optgroup!=null)
			result.push(optgroup);
		return result;
	},

	/**
	 * Set focus (delayed) on a particular element.
	 * @function ?
	 * @param {string} element - Element id
	 */
	focus : function(element)
	{
		var obj = jQuery("#" + element).get(0);
		if(typeof(obj) != "undefined" && typeof(obj.focus) != "undefined")
			setTimeout(function(){ obj.focus(); }, 100);
		return false;
	},

	/**
	 * Replace a DOM element either with given content or
	 * with content from a CallBack response boundary
	 * using a replacement method.
	 * @function ?
	 * @param {string|element} element - DOM element or element id
	 * @param {string} method - Name of method to use for replacement
	 * @param {optional string} content - New content of element
	 * @param {optional string} boundary - Boundary of new content
	 */
	replace : function(element, method, content, boundary)
	{
		if(boundary)
		{
			var result = Prado.Element.extractContent(this.transport.responseText, boundary);
			if(result != null)
				content = result;
		}
		if(typeof(element) == "string")
		{
			if(jQuery("#" + element).get(0))
				method.toFunction().apply(this,[element,""+content]);
		}
		else
		{
			method.toFunction().apply(this,[""+content]);
		}
	},

	/**
	 * Appends a javascript block to the document.
	 * @function ?
	 * @param {string} boundary - Boundary containing the javascript code
	 */
	appendScriptBlock : function(boundary)
	{
		var content = Prado.Element.extractContent(this.transport.responseText, boundary);
		if(content == null)
			return;

		var el   = document.createElement("script");
		el.type  = "text/javascript";
		el.id    = 'inline_' + boundary;
		el.text  = content;

		(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(el);
		el.parentNode.removeChild(el);
	},

	/**
	 * Extract content from a text by its boundary id.
	 * Boundaries have this form:
	 * <pre>
	 * &lt;!--123456--&gt;Democontent&lt;!--//123456--&gt;
	 * </pre>
	 * @function {string} ?
	 * @param {string} text - Text that contains boundaries
	 * @param {string} boundary - Boundary id
	 * @returns Content from given boundaries
	 */
	extractContent : function(text, boundary)
	{
		var tagStart = '<!--'+boundary+'-->';
		var tagEnd = '<!--//'+boundary+'-->';
		var start = text.indexOf(tagStart);
		if(start > -1)
		{
			start += tagStart.length;
			var end = text.indexOf(tagEnd,start);
			if(end > -1)
				return text.substring(start,end);
		}
		return null;
		/*var f = RegExp('(?:<!--'+boundary+'-->)((?:.|\n|\r)+?)(?:<!--//'+boundary+'-->)',"m");
		var result = text.match(f);
		if(result && result.length >= 2)
			return result[1];
		else
			return null;*/
	},

	/**
	 * Evaluate a javascript snippet from a string.
	 * @function ?
	 * @param {string} content - String containing the script
	 */
	evaluateScript : function(content)
	{
		try
		{
			content.evalScripts();
		}
		catch(e)
		{
			if(typeof(Logger) != "undefined")
				Logger.error('Error during evaluation of script "'+content+'"');
			else
				debugger;
			throw e;
		}
	},
	
	/**
	 * Set CSS style with Camelized keys.
 	 * See <a href="http://www.prototypejs.org/api/element/setstyle" target="_blank">Prototype's 
 	 * Element.setStyle</a> for details.
	 * @function ?
	 * @param {string|element} element - DOM element or element id
	 * @param {object} styles - Object with style properties/values
	 */
	setStyle : function (element, styles)
	{
		var s = {}
		// Camelize all styles keys
		for (var property in styles)
		{
			s[property.camelize()]=styles[property].camelize();
		}
		Element.setStyle(element, s);
	}
};

jQuery.extend(String.prototype, {

	/**
	 * Add padding to string
	 * @function {string} ?
	 * @param {string} side - "left" to pad the string on the left, "right" to pad right.
	 * @param {int} len - Minimum string length.
	 * @param {string} chr - Character(s) to pad
	 * @returns Padded string
	 */
	pad : function(side, len, chr) {
		if (!chr) chr = ' ';
		var s = this;
		var left = side.toLowerCase()=='left';
		while (s.length<len) s = left? chr + s : s + chr;
		return s;
	},

	/**
	 * Add left padding to string
	 * @function {string} ?
	 * @param {int} len - Minimum string length.
	 * @param {string} chr - Character(s) to pad
	 * @returns Padded string
	 */
	padLeft : function(len, chr) {
		return this.pad('left',len,chr);
	},

	/**
	 * Add right padding to string
	 * @function {string} ?
	 * @param {int} len - Minimum string length.
	 * @param {string} chr - Character(s) to pad
	 * @returns Padded string
	 */
	padRight : function(len, chr) {
		return this.pad('right',len,chr);
	},

	/**
	 * Add zeros to the right of string
	 * @function {string} ?
	 * @param {int} len - Minimum string length.
	 * @returns Padded string
	 */
	zerofill : function(len) {
		return this.padLeft(len,'0');
	},

	/**
	 * Remove white spaces from both ends of string.
	 * @function {string} ?
	 * @returns Trimmed string
	 */
	trim : function() {
		return this.replace(/^\s+|\s+$/g,'');
	},

	/**
	 * Remove white spaces from the left side of string.
	 * @function {string} ?
	 * @returns Trimmed string
	 */
	trimLeft : function() {
		return this.replace(/^\s+/,'');
	},

	/**
	 * Remove white spaces from the right side of string.
	 * @function {string} ?
	 * @returns Trimmed string
	 */
	trimRight : function() {
		return this.replace(/\s+$/,'');
	},

	/**
	 * Convert period separated function names into a function reference.
	 * <br />Example:
	 * <pre> 
	 * "Prado.AJAX.Callback.Action.setValue".toFunction()
	 * </pre>
	 * @function {function} ?
	 * @returns Reference to the corresponding function
	 */
	toFunction : function()
	{
		var commands = this.split(/\./);
		var command = window;
		jQuery(commands).each(function(idx, action)
		{
			if(command[new String(action)])
				command=command[new String(action)];
		});
		if(typeof(command) == "function")
			return command;
		else
		{
			if(typeof Logger != "undefined")
				Logger.error("Missing function", this);

			throw new Error	("Missing function '"+this+"'");
		}
	},

	/**
	 * Convert string into integer, returns null if not integer.
	 * @function {int} ?
	 * @returns Integer, null if string does not represent an integer.
	 */
	toInteger : function()
	{
		var exp = /^\s*[-\+]?\d+\s*$/;
		if (this.match(exp) == null)
			return null;
		var num = parseInt(this, 10);
		return (isNaN(num) ? null : num);
	},

	/**
	 * Convert string into a double/float value. <b>Internationalization
	 * is not supported</b>
	 * @function {double} ?
	 * @param {string} decimalchar - Decimal character, defaults to "."
	 * @returns Double, null if string does not represent a float value
	 */
	toDouble : function(decimalchar)
	{
		if(this.length <= 0) return null;
		decimalchar = decimalchar || ".";
		var exp = new RegExp("^\\s*([-\\+])?(\\d+)?(\\" + decimalchar + "(\\d+))?\\s*$");
		var m = this.match(exp);

		if (m == null)
			return null;
		m[1] = m[1] || "";
		m[2] = m[2] || "0";
		m[4] = m[4] || "0";

		var cleanInput = m[1] + (m[2].length>0 ? m[2] : "0") + "." + m[4];
		var num = parseFloat(cleanInput);
		return (isNaN(num) ? null : num);
	},

	/**
	 * Convert strings that represent a currency value to float.
	 * E.g. "10,000.50" will become "10000.50". The number
	 * of dicimal digits, grouping and decimal characters can be specified.
	 * <i>The currency input format is <b>very</b> strict, null will be returned if
	 * the pattern does not match</i>.
	 * @function {double} ?
	 * @param {string} groupchar - Grouping character, defaults to ","
	 * @param {int} digits - Number of decimal digits
	 * @param {string} decimalchar - Decimal character, defaults to "."
	 * @returns Double, null if string does not represent a currency value
	 */
	toCurrency : function(groupchar, digits, decimalchar)
	{
		groupchar = groupchar || ",";
		decimalchar = decimalchar || ".";
		digits = typeof(digits) == "undefined" ? 2 : digits;

		var exp = new RegExp("^\\s*([-\\+])?(((\\d+)\\" + groupchar + ")*)(\\d+)"
			+ ((digits > 0) ? "(\\" + decimalchar + "(\\d{1," + digits + "}))?" : "")
			+ "\\s*$");
		var m = this.match(exp);
		if (m == null)
			return null;
		var intermed = m[2] + m[5] ;
		var cleanInput = m[1] + intermed.replace(
				new RegExp("(\\" + groupchar + ")", "g"), "")
								+ ((digits > 0) ? "." + m[7] : "");
		var num = parseFloat(cleanInput);
		return (isNaN(num) ? null : num);
	},

	/**
	 * Converts the string to a date by finding values that matches the
	 * date format pattern.
	 * @function {Date} ?
	 * @param {string} format - Date format pattern, e.g. MM-dd-yyyy
	 * @returns Date extracted from the string
	 */
	toDate : function(format)
	{
		return Date.SimpleParse(this, format);
	}
});

jQuery.extend(Date.prototype,
{
	/**
	 * SimpleFormat
	 * @function ?
	 * @param {string} format - TODO
	 * @param {string} data - TODO
	 * @returns TODO
	 */
	SimpleFormat: function(format, data)
	{
		data = data || {};
		var bits = new Array();
		bits['d'] = this.getDate();
		bits['dd'] = String(this.getDate()).zerofill(2);

		bits['M'] = this.getMonth()+1;
		bits['MM'] = String(this.getMonth()+1).zerofill(2);
		if(data.AbbreviatedMonthNames)
			bits['MMM'] = data.AbbreviatedMonthNames[this.getMonth()];
		if(data.MonthNames)
			bits['MMMM'] = data.MonthNames[this.getMonth()];
		var yearStr = "" + this.getFullYear();
		yearStr = (yearStr.length == 2) ? '19' + yearStr: yearStr;
		bits['yyyy'] = yearStr;
		bits['yy'] = bits['yyyy'].toString().substr(2,2);

		// do some funky regexs to replace the format string
		// with the real values
		var frm = new String(format);
		for (var sect in bits)
		{
			var reg = new RegExp("\\b"+sect+"\\b" ,"g");
			frm = frm.replace(reg, bits[sect]);
		}
		return frm;
	},

	/**
	 * toISODate
	 * @function {string} ?
	 * @returns TODO
	 */
	toISODate : function()
	{
		var y = this.getFullYear();
		var m = String(this.getMonth() + 1).zerofill(2);
		var d = String(this.getDate()).zerofill(2);
		return String(y) + String(m) + String(d);
	}
});

jQuery.extend(Date,
{
	/**
	 * SimpleParse
	 * @function ?
	 * @param {string} format - TODO
	 * @param {string} data - TODO
	 * @returns TODO
	 */
	SimpleParse: function(value, format)
	{
		var val=String(value);
		format=String(format);

		if(val.length <= 0) return null;

		if(format.length <= 0) return new Date(value);

		var isInteger = function (val)
		{
			var digits="1234567890";
			for (var i=0; i < val.length; i++)
			{
				if (digits.indexOf(val.charAt(i))==-1) { return false; }
			}
			return true;
		};

		var getInt = function(str,i,minlength,maxlength)
		{
			for (var x=maxlength; x>=minlength; x--)
			{
				var token=str.substring(i,i+x);
				if (token.length < minlength) { return null; }
				if (isInteger(token)) { return token; }
			}
			return null;
		};

		var i_val=0;
		var i_format=0;
		var c="";
		var token="";
		var token2="";
		var x,y;
		var now=new Date();
		var year=now.getFullYear();
		var month=now.getMonth()+1;
		var date=1;

		while (i_format < format.length)
		{
			// Get next token from format string
			c=format.charAt(i_format);
			token="";
			while ((format.charAt(i_format)==c) && (i_format < format.length))
			{
				token += format.charAt(i_format++);
			}

			// Extract contents of value based on format token
			if (token=="yyyy" || token=="yy" || token=="y")
			{
				if (token=="yyyy") { x=4;y=4; }
				if (token=="yy")   { x=2;y=2; }
				if (token=="y")    { x=2;y=4; }
				year=getInt(val,i_val,x,y);
				if (year==null) { return null; }
				i_val += year.length;
				if (year.length==2)
				{
					if (year > 70) { year=1900+(year-0); }
					else { year=2000+(year-0); }
				}
			}

			else if (token=="MM"||token=="M")
			{
				month=getInt(val,i_val,token.length,2);
				if(month==null||(month<1)||(month>12)){return null;}
				i_val+=month.length;
			}
			else if (token=="dd"||token=="d")
			{
				date=getInt(val,i_val,token.length,2);
				if(date==null||(date<1)||(date>31)){return null;}
				i_val+=date.length;
			}
			else
			{
				if (val.substring(i_val,i_val+token.length)!=token) {return null;}
				else {i_val+=token.length;}
			}
		}

		// If there are any trailing characters left in the value, it doesn't match
		if (i_val != val.length) { return null; }

		// Is date valid for month?
		if (month==2)
		{
			// Check for leap year
			if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
				if (date > 29){ return null; }
			}
			else { if (date > 28) { return null; } }
		}

		if ((month==4)||(month==6)||(month==9)||(month==11))
		{
			if (date > 30) { return null; }
		}

		var newdate=new Date(year,month-1,date, 0, 0, 0);
		return newdate;
	}
});
