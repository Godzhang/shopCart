(function(){
	function $(str, parent){
		var elem = str.slice(1);

		if(str.indexOf("#") === 0){
			return document.getElementById(elem);
		}
		
		var all = null;
		
		if(parent == null){
			all = document.getElementsByTagName('*');
		}else{
			all = parent.getElementsByTagName('*');
		}
		
		var	reg = new RegExp("(^|\\s+)" + elem + "(\\s+|$)"),
			res = [];

		for(var i = 0, len = all.length; i < len; i++){
			if(reg.test(all[i].className)){
				res.push(all[i]);
			}
		}

		return res.length <= 1 ? res[0] : res;
	}

	var checkCount = 0,
		cp = $(".cp"),
		allPrize = $(".allPrize").getElementsByTagName("span")[0],
		checkBtn = $(".pro"),
		allBtn = $("#all"),
		list = $(".product-list"),
		delSel = $(".delSel");

	//计算总值
	function totalPrize(){
		var sum = 0;
		if(!cp) return;
		for(var i = 0, len = cp.length; i < len; i++){
			var check = $(".pro", cp[i].parentNode.parentNode);
			if(check.checked){
				sum += Number(cp[i].innerHTML);
			}			
		}

		allPrize.innerHTML = sum.toFixed(2);
	}

	for(var j = 0, len = checkBtn.length; j < len; j++){
		var btn = checkBtn[j];
		//先循环，将已经勾选的放入对象
		if(btn.checked){
			var prize = $(".cp", btn.parentNode.parentNode);
			checkCount ++;
		}
		totalPrize();
		//给勾选框绑定事件
		btn.index = j;
		btn.addEventListener("click", function(){
			checkchange(this);
		});
	}
	//给全选按钮添加点击事件
	allBtn.addEventListener("click", function(){
		if(this.checked){
			handleCheck(true);
		}else{
			handleCheck(false);
		}
	});

	function checkchange(elem){
		if(elem.checked){
			checkCount++;
		}else{
			checkCount--;
		}
		totalPrize();
		checkCheck();
	}

	function checkCheck(){
		if(checkCount !== checkBtn.length){
			allBtn.checked = false;
		}else{
			allBtn.checked = true;
		}
	}

	function handleCheck(bol){
		for(var i = 0, len = checkBtn.length; i < len; i++){
			if(checkBtn[i].checked === bol) continue;
			checkBtn[i].checked = bol;
			checkchange(checkBtn[i]);
		}
	}
//商品数量更改事件
	list.addEventListener("click", function(event){
		var target = event.target;

		if(target.parentNode.className.indexOf("count") > -1){
			var count = $(".proCount", target.parentNode),
				item = target.parentNode.parentNode,
				unit = Number($(".prize", item).innerHTML),
				total = $(".cp", item);

			if(target.className.indexOf("plus") > -1){
				count.value = Number(count.value) + 1;
				total.innerHTML = (count.value * unit).toFixed(2);
				totalPrize();
			}

			if(target.className.indexOf("reduce") > -1){
				if(count.value - 1 < 1){
					var con = confirm("确定要删除此商品吗？");
					if(con){
						//删除对应的商品信息
						var check = $(".pro", item);
						item.parentNode.removeChild(item);
						if(check.checked){
							cp = $(".cp");							
						}
					}
				}else{
					count.value = Number(count.value) - 1;
					total.innerHTML = (count.value * unit).toFixed(2);
				}
				totalPrize();
			}
		}

		if(target.className.indexOf("delItem") > -1){
			var item = target.parentNode.parentNode,
				ifClose = confirm("确定要删除此商品吗？");

			if(ifClose){
				item.parentNode.removeChild(item);
				cp = $(".cp");
				totalPrize();
			}
		}

	}, false);

	list.addEventListener("keyup", function(event){
		var target = event.target;

		if(target.className.indexOf("proCount") > -1){
			var item = target.parentNode.parentNode,
				unit = Number($(".prize", item).innerHTML),
				total = $(".cp", item);

			if(target.value < 1){
				target.value = 1;
			}

			total.innerHTML = (target.value * unit).toFixed(2);
		}
	}, false);
	//删除选中商品
	delSel.addEventListener("click", function(){
		if(checkCount <= 0) return;

		var ifDel = confirm("确定要删除选中商品吗？");

		if(!ifDel) return;
		checkBtn = $(".pro");
		for(var i = 0, len = checkBtn.length; i < len; i++){
			if(checkBtn[i].checked){
				var item = checkBtn[i].parentNode.parentNode;
				item.parentNode.removeChild(item);
			}
		}
		cp = $(".cp");
		totalPrize();
	}, false);
})();








