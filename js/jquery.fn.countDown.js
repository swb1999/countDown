;(function(window,$){
	$.fn.backTime=function(option){
		var config = {
			callBack :null,
			startTime: new Date(),
			endTime: "",
			format:"d-h-m-s"
		},
		set = $.extend({},config,option);
		return $(this).each(function(){
			if(!checking()) return false;
			var time = parseInt((new Date(set.endTime)-new Date(set.startTime))*1/1000),
				that = $(this);
			calculate(that,time);
			var	timer =	setInterval(function(){
						time--;
						if(time<0){
							set.callBack();
							clearInterval(timer);
							return;
						}else{
							calculate(that,time)
						}
					},1000)
		})
		function checking(){
			var reg = /^(\d{4})(-|\/)(\d{1,2})\2(\d{1,2})(\s(\d{1,2}):(\d{1,2}):(\d{1,2}))?$/,
				newStr = reg.exec(set.endTime);
			if(!newStr) return false;
			var newDate = new Date(newStr[1],newStr[3],newStr[4]),
				year = newDate.getFullYear(),
				month =newDate.getMonth(),
				day =newDate.getDate();
			if(newStr[1] != year || newStr[3] != month || day != newStr[4]) return false;
			return true;
		}
		function calculate(dom,time){
			var arr = set.format.split("-"),
				obj = {
					d : parseInt(time/86400)+"天",
					h : parseInt((time%86400)/3600)+"时",
					m : ((time%86400)%3600/60).toFixed(0)+"分",
					s : ((time%86400)%3600)%60+"秒"
				},
				newStr="";
			for(var i=0,len=arr.length;i<len;i++){
				newStr += obj[arr[i]];
			}
			dom.find("h2").html(newStr);
		}
	}
})(window,jQuery);