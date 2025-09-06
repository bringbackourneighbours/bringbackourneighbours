console.log('CHECKING THE LINKS!!!!!');

const allLinks: NodeList = document.querySelectorAll('a');

console.log(allLinks);

Array.from(allLinks)
  .forEach(async (link): Promise<void> => {
    try {
      // minimal example: but we cannot evaluate the responses status
      // const resp = await fetch(link.dataset.url, {
      //   method: 'HEAD',
      //   mode: 'no-cors',
      // });

      // to avoid cors we could use cors-anywhere
      // run node scripts/cors-anywhere.js
      const resp = await fetch(`http://localhost:8080/${link.dataset.url}`, {
        method: 'HEAD',
        mode: 'cors',
      });
      console.log(link.dataset.url, link.dataset.type, resp.status, resp.headers.get('content-type'));
      // this actually works...
    } catch (error) {
      console.error('ERROR', error);
    }
  });
