const txvContext = requirePlugin("tencentvideo");

Page({
	data: {
		videos: []
	},
	onLoad (query) {
		// // video元素的context
		// this.videoContext = wx.createVideoContext('tvp');
		//
		// // 监听播放器上报事件，塞到一个image里面
		// Txv.on('report', url=> {
		// 	console.log('onreport', url.reportUrl);
		// 	this.setData({
		// 		tvpReportUrl: url.reportUrl
		// 	});
		// });
		//
		// this.createVideo('e0354z3cqjp');
		// this.createVideo('p0382yhi66i');
		// this.createVideo('k0379ogcfrh');
		// this.createVideo('p0127cmrg1m');
	// },
	// createVideo(vid) {
    const txvContext = requirePlugin("tencentvideo");
    var player1 = txvContext.getTxvContext('txv1');
    var player2 = txvContext.getTxvContext('txv2');
    var player3 = txvContext.getTxvContext('txv3');
    var player4 = txvContext.getTxvContext('txv4');
    var player5 = txvContext.getTxvContext('txv5');
		console.log(player1);
		console.log(player2);
		console.log(player3);
		console.log(player4);
	}

	// onPageScroll: function (e) {
	//     console.log('scrollTop', e.scrollTop);
	//
	// 	var query = wx.createSelectorQuery();
	// 	query.selectAll('._expose').boundingClientRect();
	// 	query.selectViewport().scrollOffset();
	//
	// 	query.exec(function(res) {
			// console.log(res);
			// console.log(res[0].top);       // #the-id节点的上边界坐标
			// console.log(res[1].scrollTop); // 显示区域的竖直滚动位置
		// });
	// }
});