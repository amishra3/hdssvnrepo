var $marketLeader = $('.market-leader-container');
if ($marketLeader.length) {
	$marketLeader.find('.close-hero').click(function() {
		$marketLeader.find('.market-leader-image, .market-leader-content').show();
		$marketLeader.find('.video').hide();
	});

	$marketLeader.find('.btn-play-video').click(function() {
		$marketLeader.find('.video').show();
		$marketLeader.find('.market-leader-image, .market-leader-content').hide()
	});
}
