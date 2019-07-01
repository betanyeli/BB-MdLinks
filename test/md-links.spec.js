const mdLinks = require('md-links')



describe('mdLinks', () => {

  it('debería retornar un links en el test/testFolder/test.md', () => {
   expect(mdLinks.readLinks('test/testFolder/test.md')).toEqual([ { Url: 'https://www.facebook.com/',
   Text: 'http.get',
   Status: 200,
   InfoStatus: 'OK' } ]
);
  });

});


