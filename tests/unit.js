describe('factory: security.session', function () {

	var parsed;

	beforeEach(function () {
		parsed = css('article#item-id.parent.element[data-some="attribute"] section.post a.link');
	});

	it('test html parser', function () {
		expect( parsed.toHTML() )
			.toBe('<article id="item-id" class="parent element" data-some="attribute"><section class="post"><a class="link"></a></section></article>');
	});
});