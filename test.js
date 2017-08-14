window.onload = function() {
	var oLastContentList = document.getElementById('last_content-list');
	var oaLastContentUl = oLastContentList.getElementsByTagName('ul')[0];
	var aLastContentLis = getElementsByClassName(oLastContentList,'content-item');
	var sALastContentLisLength = aLastContentLis.length;
	for (var i = 0; i < sALastContentLisLength; i++) {
		(function(i){
			var oXmPagersWrapper = getElementsByClassName(aLastContentLis[i],'xm-pagers-wrapper')[0];
			var aXMPagerLis = oXmPagersWrapper.getElementsByTagName('li');
			var sXMPagerLisLength = aXMPagerLis.length;
			for (var j = 0; j < sXMPagerLisLength; j++) {

				(function(i,j){

					var oLastUl = getElementsByClassName(aLastContentLis[i],'item-list')[0];
					var aLastLis = oLastUl.getElementsByTagName('li');
					/*var sLastLisLength = aLastLis.length;*/
					// 获取下方的小按钮
					var oXmPagersWrapper = getElementsByClassName(aLastContentLis[i],'xm-pagers-wrapper')[0];
					var aXMPagerLis = oXmPagersWrapper.getElementsByTagName('li');
					var sXMPagerLisLength = aXMPagerLis.length;

					console.log(i);
					EventUtil.addHandler(aXMPagerLis[j],'click',function() {
						for (var m = 0; m < sXMPagerLisLength; m++) {
							aXMPagerLis[m].className = "pager";
						}
						console.log(aLastLis[0].offsetWidth*j);
						console.log(oLastUl);
						startMove(oLastUl,'left',-aLastLis[0].offsetWidth*j);
						aXMPagerLis[j].className = 'pager pager-active';
					})	
				})(i,j);
			}
		})(i)
	}
}


function getElementsByClassName(oParent,sClassName) {
	var aArr = oParent.getElementsByTagName('*');
	var aResult = [];
	for(var i = 0,length = aArr.length;i<length; i++) {
		var isExist = (' ' + aArr[i].className + ' ').indexOf(' '+ sClassName +' ');
		if (isExist>-1) {
			aResult.push(aArr[i]);
		}
	}
	return aResult;
}

function getStyle(obj,attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	}else {
		return getComputedStyle(obj,false)[attr];
	}
}

function startMove(ele,attr,target) {
	clearInterval(ele.timer);
	
	ele.timer = setInterval(function(){
		var iCur = 0;
		if (attr == 'opacity') {
			iCur = parseInt(parseFloat(getStyle(ele,attr)*100));
		}else if (attr == 'left') {
			iCur = parseInt(ele.offsetLeft);
		}else {
			iCur = parseInt(getStyle(ele,attr));
		}

		var iSpeed = (target - iCur)/8;

		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

		if (attr == 'opacity') {
			ele.style.opacity = (iCur + iSpeed)/100;
			ele.style.filter = 'alpha(opacity='+iCur + iSpeed+')';
		}else if (attr == 'left') {
			ele.style.left = (iCur + iSpeed) + 'px';
		}else {
			ele.style[attr] = (iCur + iSpeed) + 'px';
		}

		if (iCur == target) {
			clearInterval(ele.timer);
		}

	},30);
	
}
