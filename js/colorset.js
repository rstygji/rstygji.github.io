// this is for color picker	
jQuery(document).ready(function() {


	$("#theme-settings").on("click", function() {
		$("#theme-settings-choose").fadeIn(500);
	});
	
	$('body').click(function(event) {
		if (!$(event.target).closest('#theme-settings-choose, #theme-settings').length) {
			$('#theme-settings-choose').fadeOut(500);
		};
	});
	
	var cookieColor1 = getCookie('FirstColor');
	var cookieColor2 = getCookie('SecondColor');
	var cookieColorText = getCookie('cookieColorText');
	var cookieColorTextHover = getCookie('cookieColorTextHover');
	
	var theFirstSettingsThemeColor = (typeof cookieColor1 !== "undefined") ? cookieColor1 : "#1577b8",
		theSecondSettingsThemeColor = (typeof cookieColor2 !== "undefined") ? cookieColor2 : "#6cb132",
		theTextColorSettings = (typeof cookieColorText !== "undefined") ? cookieColorText : "#1275ba",
		theTextColorSettingsHover = (typeof cookieColorTextHover !== "undefined") ? cookieColorTextHover : "#1275ba";
	
	// call function to set color
	setColor(theFirstSettingsThemeColor, theSecondSettingsThemeColor, theTextColorSettings, theTextColorSettingsHover);
		

	$('#colorSelectorPrimary').ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			setCookie('FirstColor', theFirstSettingsThemeColor, 1);
			setCookie('cookieColorText', theTextColorSettings, 1);
			setCookie('cookieColorTextHover', theTextColorSettingsHover, 1);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			// hex - the color
			$('#colorSelectorPrimary div').css('backgroundColor', '#' + hex);
			
			theFirstSettingsThemeColor = "#" + hex;
			theTextColorSettings = "#" + hex;
			theTextColorSettingsHover = "#" + hex;
			
			// set color for the non hover state
			setColor(theFirstSettingsThemeColor, theSecondSettingsThemeColor, theTextColorSettings, theTextColorSettingsHover)
		}
	});
	
	$('#colorSelectorSecondary').ColorPicker({
		color: '#0000ff',
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			setCookie('SecondColor', theSecondSettingsThemeColor, 1);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			// hex - the color
			$('#colorSelectorSecondary div').css('backgroundColor', '#' + hex);
			
			theSecondSettingsThemeColor = "#" + hex;
		}
	});
	
	
	$(".settings-clr:not(.no-second)").hover(function() {
		$(this).css("backgroundColor", theSecondSettingsThemeColor);
	}, function() {
		$(this).css("backgroundColor", theFirstSettingsThemeColor);
	});
	
	// change color on color set choose
	$("div.colorset img, p.restore-default").on("click", function() {
		var colors = $(this).attr('title');
		colors = colors.split("|");
		
		theFirstSettingsThemeColor = "#" + colors[0];
		theSecondSettingsThemeColor = "#" + colors[1];
		theTextColorSettings = "#" + colors[0];
		theTextColorSettingsHover = "#" + colors[0];
		
		setCookie('FirstColor', theFirstSettingsThemeColor, 1);
		setCookie('SecondColor', theSecondSettingsThemeColor, 1);
		setCookie('cookieColorText', theTextColorSettings, 1);
		setCookie('cookieColorTextHover', theTextColorSettingsHover, 1);
		
		setColor(theFirstSettingsThemeColor, theSecondSettingsThemeColor, theTextColorSettings, theTextColorSettingsHover)
	});
	
	
	/* 
	*
	*	Set Cookies and get Cookies 
	*/
	function setCookie(c_name,value,exdays)
	{
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
		document.cookie=c_name + "=" + c_value;
	}

	function getCookie(c_name)
	{
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
		  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		  x=x.replace(/^\s+|\s+$/g,"");
		  if (x==c_name)
			{
			return unescape(y);
			}
		  }
	}

	function delCookie(name)
	{
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
	
}); // end of dom




function setColor(theFirstSettingsThemeColor, theSecondSettingsThemeColor, theTextColorSettings, theTextColorSettingsHover)
{
	$(".settings-clr").each(function() {
			$(this).css("backgroundColor", theFirstSettingsThemeColor);
		});
		
		$(".settings-text").each(function() {
			$(this).css("color", theTextColorSettings);
		});	
		
		$(".settings-txt").hover(function() {
			$(this).css("color", theTextColorSettingsHover);
		}, function() {
			if(!$(this).hasClass('active-state'))
			{
				$(this).css("color", "#444444");
			}
	});	
	
	$(".active-state").css("color", theTextColorSettingsHover);
}