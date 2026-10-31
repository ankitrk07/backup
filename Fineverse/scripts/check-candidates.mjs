import https from 'https';

const testUrls = [
  // Headphones & Audio
  "https://images.unsplash.com/photo-1546435770-a3e426bf472b",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944",
  "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434",
  "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
  "https://images.unsplash.com/photo-1545454675-3531b543be5d",
  "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  // Laptops
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
  "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2",
  "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
  // Phones
  "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
  "https://images.unsplash.com/photo-1567581935884-3349723552ca",
  // Watches
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1",
  "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
  // Tech & Gadgets
  "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46",
  "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7",
  "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5",
  "https://images.unsplash.com/photo-1628191010210-a59de33e5941",
  "https://images.unsplash.com/photo-1527977966376-1c8408f9f108",
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620",
  // Fashion
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a",
  "https://images.unsplash.com/photo-1562157873-818bc0726f68",
  "https://images.unsplash.com/photo-1596755094514-f87e34085b2c",
  "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf",
  "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  "https://images.unsplash.com/photo-1582552938357-32b906df40cb",
  "https://images.unsplash.com/photo-1544441893-675973e31985",
  "https://images.unsplash.com/photo-1551028719-00167b16eac5",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446",
  "https://images.unsplash.com/photo-1595777457583-95e059d581b8",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
  "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
  "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2",
  // Toys
  "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f",
  "https://images.unsplash.com/photo-1594787318286-3d835c1d207f",
  "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60",
  "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088",
  "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09",
  "https://images.unsplash.com/photo-1563941402622-4e7a488bcc57",
  "https://images.unsplash.com/photo-1587654780291-39c9404d746b",
  "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4",
  "https://images.unsplash.com/photo-1558060370-d644479cb6f7",
  "https://images.unsplash.com/photo-1563245372-f21724e3856d"
];

function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(`${url}?q=80&w=600&auto=format&fit=crop`, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ url, status: 500, error: err.message });
    });
  });
}

async function run() {
  console.log(`Checking ${testUrls.length} candidate URLs...`);
  const results = await Promise.all(testUrls.map(checkUrl));
  const failed = results.filter(r => r.status !== 200);
  if (failed.length > 0) {
    console.log('Failed URLs:', failed);
  } else {
    console.log('All candidates returned 200 OK!');
  }
}

run();
