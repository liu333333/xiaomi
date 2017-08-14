window.onload = function() {
	var topbar_cart = document.getElementById('topbar-cart');
	EventUtil.addHandler(topbar_cart,'mouseover',function() {
		var J_miniCartMenu = document.getElementById('J_miniCartMenu');
		J_miniCartMenu.style.display = 'block';
		topbar_cart.style.backgroundColor = '#fff';
		topbar_cart.style.color = 'orange';
		J_miniCartMenu.style.color = 'black';
	});
	EventUtil.addHandler(topbar_cart,'mouseout',function() {
		var J_miniCartMenu = document.getElementById('J_miniCartMenu');
		J_miniCartMenu.style.display = 'none';
		topbar_cart.style.color = '#b0b0b0';
		topbar_cart.style.backgroundColor = "#424242";
	});


	var nav_list = document.getElementById('nav_list');
	var nav_list_li = nav_list.getElementsByTagName('li');
	var J_navMenu = document.getElementById('J_navMenu');
	var aContainer = getElementsByClassName(J_navMenu,'navcontainer');

	for (var i = 0; i < 7; i++) {
		var timer = null;
		(function(i){
			EventUtil.addHandler(nav_list_li[i],'mouseover',function() {
			//if(aContainer[i].style.display == 'none') {
				for (var j = 0,length = aContainer.length; j < length; j++) {
					aContainer[j].style.display = 'none';
				}
				J_navMenu.style.display = 'block';
				//aContainer[i].style.display = 'block';
				aContainer[i].style.display = 'block';
				clearTimeout(timer);
				//clearTimeout(aContainer[i].timer2);
				//console.log(aContainer[i].timer2);
			//}
			});
		}(i));
		(function(i){
			EventUtil.addHandler(nav_list_li[i],'mouseout',function() {
				timer = setTimeout(function() {
					J_navMenu.style.display = 'none';
					aContainer[i].style.display = 'none';
				},100);
				var timer2 = null;
				EventUtil.addHandler(aContainer[i],'mouseover',function() {
					//alert('hello')
					clearTimeout(timer);
					for (var j = 0,length = aContainer.length; j < length; j++) {
						aContainer[j].style.display = 'none';
					}
					J_navMenu.style.display = 'block';
					aContainer[i].style.display = 'block';
					//clearTimeout(aContainer[i].timer2);
					clearTimeout(timer2);
				});
				EventUtil.addHandler(aContainer[i],'mouseout',function() {
						timer2 = setTimeout(function() {
							J_navMenu.style.display = 'none';
							aContainer[i].style.display = 'none';
						},500);
				});
			});
		}(i));
		
	}

	var mySearchForm_Search = document.getElementById('mySearchForm_Search');
	var mySearchForm = document.getElementById('mySearchForm');
	var J_keywordList = document.getElementById('J_keywordList');
	var hotSearch = getElementsByClassName(mySearchForm,'search-hot-words');
	EventUtil.addHandler(mySearchForm_Search,'focus',function() {
		//var mySearchForm = document.getElementById('mySearchForm');
		
		hotSearch[0].style.display = 'none';
		mySearchForm.style.border = '1px solid #ff6700'
		var button = getElementsByClassName(mySearchForm,'mySearchForm_Button');
		button[0].style.borderLeft = '1px solid #ff6700';
		
		J_keywordList.style.display = 'block';
	});
	EventUtil.addHandler(mySearchForm_Search,'blur',function() {
		
		if (!mySearchForm_Search.value) {
			hotSearch[0].style.display = 'block';
		}
		//J_keywordList.style.display = 'none';
		mySearchForm.style.border = '1px solid #e0e0e0'
		var button = getElementsByClassName(mySearchForm,'mySearchForm_Button');
		button[0].style.borderLeft = '1px solid #e0e0e0';
	});
	
	var aGoodTypes = J_keywordList.getElementsByTagName('li');
	var goodLength = aGoodTypes.length
	for (var i = 0; i < goodLength; i++) {
		(function(i){
			EventUtil.addHandler(aGoodTypes[i],'click',function() {
				var searchValue = getElementsByClassName(aGoodTypes[i],'keyword')[0].innerText;
				hotSearch[0].style.display = 'none';
				mySearchForm_Search.value = searchValue;
				
				mySearchForm_Search.focus();
				J_keywordList.style.display = 'none';
			})
		}(i));
	}
	var myPlayIndex = 0;
	var ul_button= document.getElementById('ul_button');
	var aUlButtonLis = getElementsByClassName(ul_button,'ul_button_li');
	var aUlButtonLisLength = aUlButtonLis.length;
	var oPlayBarUl = document.getElementById('play_bar_ul');
	var aPlayBarUlLis = getElementsByClassName(oPlayBarUl,'play_bar_ul_li');
	var timer3 = null;
	var inderection = true;	//运动方向

	var play_prev = document.getElementById('play_prev');
	var play_next = document.getElementById('play_next');

	EventUtil.addHandler(play_next,'click',function() {
		clearInterval(timer3);
		inderection = true;
		if (inderection) {
			myPlayIndex = (++myPlayIndex)%7;
		}else{
			myPlayIndex = (--myPlayIndex+7)%7;
		}
		for (var j = 0; j < aUlButtonLisLength; j++) {
			startMove(aPlayBarUlLis[j],'opacity',0);
			aUlButtonLis[j].style.background = '';
		}
		startMove(aPlayBarUlLis[myPlayIndex],'opacity',100);
		aUlButtonLis[myPlayIndex].style.background='gray';
		startMyMove();
	});
	EventUtil.addHandler(play_prev,'click',function() {
		clearInterval(timer3);
		inderection = false;
		if (inderection) {
			myPlayIndex = (++myPlayIndex)%7;
		}else{
			myPlayIndex = (--myPlayIndex+7)%7;
		}
		for (var j = 0; j < aUlButtonLisLength; j++) {
			startMove(aPlayBarUlLis[j],'opacity',0);
			aUlButtonLis[j].style.background = '';
		}
		startMove(aPlayBarUlLis[myPlayIndex],'opacity',100);
		aUlButtonLis[myPlayIndex].style.background='gray';
		startMyMove();
	})
	for (var i = 0; i < aUlButtonLisLength; i++) {
		aUlButtonLis[i].index = i;
		(function(i) {
			EventUtil.addHandler(aUlButtonLis[i],'click',function() {
				clearInterval(timer3);
				for (var j = 0; j < aUlButtonLisLength; j++) {
					startMove(aPlayBarUlLis[j],'opacity',0);
					aUlButtonLis[j].style.background = '';
				}
				myPlayIndex = this.index;
				startMove(aPlayBarUlLis[this.index],'opacity',100);
				this.style.background='gray';
				startMyMove();
			});
		})(i);
	}
	
	startMyMove();
	function startMyMove() {
		timer3 = setInterval(function(){
			if (inderection) {
				myPlayIndex = (++myPlayIndex)%7;
			}else{
				myPlayIndex = (--myPlayIndex+7)%7;
			}

			for (var j = 0; j < aUlButtonLisLength; j++) {
				startMove(aPlayBarUlLis[j],'opacity',0);
				aUlButtonLis[j].style.background = '';
			}
			
			startMove(aPlayBarUlLis[myPlayIndex],'opacity',100);
			aUlButtonLis[myPlayIndex].style.background='gray';
		},5000);
	}

	var oSideBarUl = document.getElementById('side_bar_ul');
	var aSideBarLis = getElementsByClassName(oSideBarUl,'side_bar_li');
	for (var i = 0; i < aSideBarLis.length; i++) {
		(function (i) {
			EventUtil.addHandler(aSideBarLis[i],'mouseover',function(){
				var oDisplay = getElementsByClassName(this,'extend_view')[0];
				oDisplay.style.display = 'block';
			});
			EventUtil.addHandler(aSideBarLis[i],'mouseout',function(){
				var oDisplay = getElementsByClassName(this,'extend_view')[0];
				oDisplay.style.display = 'none';
			});
		})(i);
	}

	var oUlWrapSingle = document.getElementById('ul_wrap_single');
	var oSingleUl = getElementsByClassName(oUlWrapSingle,'single_ul')[0];
	var aUlWrapSingleLis = oUlWrapSingle.getElementsByTagName('li');
	var singleWidth = aUlWrapSingleLis[0].offsetWidth;
	var oSingleButtonLeft = document.getElementById('single_button_left');
	var oSingleButtonRight = document.getElementById('single_button_right');
	EventUtil.addHandler(oSingleButtonLeft,'click',function() {
		clearInterval(singleTimer);
		if(oSingleUl.offsetLeft<-20) {
			/*oSingleUl.style.left = -(singleWidth + 15)*5 + 'px';*/
			oSingleUl.style.left = 0;
		}
		startSingleMove();
	});
	EventUtil.addHandler(oSingleButtonRight,'click',function() {
		clearInterval(singleTimer);
		if(oSingleUl.offsetLeft == 0) {
			oSingleUl.style.left = -(singleWidth + 15)*5 + 'px';
		}
		startSingleMove();
	});

	var singleTimer = null;
	startSingleMove();
	function startSingleMove() {
		singleTimer = setInterval(function(){
			if(oSingleUl.offsetLeft<-20) {
				oSingleButtonLeft.disabled = true;
				oSingleButtonRight.disabled = false;
				startMove(oSingleUl,'left',0);
				//oSingleUl.style.left = 0+'px';
			}else {
				oSingleButtonLeft.disabled = false;
				oSingleButtonRight.disabled = true;
				startMove(oSingleUl,'left',-(singleWidth + 15)*5);
				//oSingleUl.style.left = -(singleWidth + 15)*5 + 'px';
			}
		},5000);
	}

	var oHouseholdUl = document.getElementById('household_ul');
	var aHouseholdLi = oHouseholdUl.getElementsByTagName('li');
	var oBrickItem1 = document.getElementById('brick-item1');
	var aHouseholdMainBody = getElementsByClassName(oBrickItem1,'brick-item-right');
	var iHouseholdLength = aHouseholdLi.length;
	for (var i = 0; i < iHouseholdLength; i++) {
		(function (i) {
			EventUtil.addHandler(aHouseholdLi[i],'mouseover',function() {
				for (var j = 0;j<iHouseholdLength;j++) {
					aHouseholdLi[j].className = '';
					aHouseholdMainBody[j].style.display = 'none';
				}
				aHouseholdLi[i].className = 'tab-active';
				aHouseholdMainBody[i].style.display = 'block';
			})
		})(i)
	}

	var oElectricalUl = document.getElementById('electrical_ul');
	var aElectricalLis = oElectricalUl.getElementsByTagName('li');
	var oBrickItem2 = document.getElementById('brick-item2');
	var aHouseholdMainBody2 = getElementsByClassName(oBrickItem2,'brick-item-right');
	var iHouseholdLength2 = aElectricalLis.length;
	for (var i = 0; i < iHouseholdLength2; i++) {
		(function (i) {
			EventUtil.addHandler(aElectricalLis[i],'mouseover',function() {
				for (var j = 0;j<iHouseholdLength2;j++) {
					aElectricalLis[j].className = '';
					aHouseholdMainBody2[j].style.display = 'none';
				}
				aElectricalLis[i].className = 'tab-active';
				aHouseholdMainBody2[i].style.display = 'block';
			})
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
		}else {
			iCur = parseInt(getStyle(ele,attr));
		}

		var iSpeed = (target - iCur)/8;

		iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

		if (attr == 'opacity') {
			ele.style.opacity = (iCur + iSpeed)/100;
			ele.style.filter = 'alpha(opacity='+iCur + iSpeed+')';
		}else {
			ele.style[attr] = (iCur + iSpeed) + 'px';
		}

		if (iCur == target) {
			clearInterval(ele.timer);
		}

	},30);
	
}

