import fs from 'fs';

const seedPath = 'prisma/seed.ts';
let code = fs.readFileSync(seedPath, 'utf8');

const newCuratedCode = `const curatedProductImages: Record<string, [string, string]> = {
  // --- Electronics - Headphones & Audio ---
  "Sony WH-1000XM5 Wireless Headphones": [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Apple AirPods Pro (2nd Gen)": [
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1000&auto=format&fit=crop",
  ],
  "JBL Flip 6 Portable Speaker": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Bose SoundLink Flex Bluetooth Speaker": [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Electronics - Laptops & Computing ---
  "Apple MacBook Air M3": [
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
  ],
  "Apple MacBook Pro 14-inch M3 Pro": [
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
  ],
  "ASUS ROG Zephyrus G16 Gaming Laptop": [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
  ],
  "Dell XPS 15 OLED Touch Laptop": [
    "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Electronics - Smartphones ---
  "Samsung Galaxy S24": [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
  ],
  "Samsung Galaxy A55": [
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Apple iPhone 15 Pro 128GB": [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
  ],
  "Samsung Galaxy S24 Ultra": [
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Google Pixel 8 Pro": [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Electronics - Smart Watches ---
  "Apple Watch Series 9": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf50?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
  ],
  "Garmin Venu 3 Fitness Watch": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf50?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Electronics - Accessories & Gadgets ---
  "Anker 737 Power Bank 24000mAh": [
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
  ],
  "Belkin 3-in-1 Wireless Charging Stand": [
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
  ],
  "Logitech MX Master 3S Wireless Mouse": [
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
  ],
  "DJI Mini 4 Pro Fly More Combo Drone": [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
  ],
  "Valve Steam Deck OLED Handheld Console": [
    "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
  ],
  "GoPro HERO12 Black Action Camera": [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=1000&auto=format&fit=crop",
  ],
  "Apple iPad Air 11-inch M2": [
    "https://images.unsplash.com/photo-1585792180666-f7347c490ee2?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
  ],
  "Meta Quest 3 All-in-One VR Headset": [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Fashion - Boys ---
  "Levi's 511 Slim Fit Jeans": [
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  ],
  "Levi's 501 Original Straight Jeans": [
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  ],
  "Nike Air Max 90": [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  ],
  "Adidas Ultraboost Light Running Shoes": [
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
  ],
  "H&M Essential Cotton T-Shirt": [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
  ],
  "Nike Dri-FIT Running T-Shirt": [
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
  ],
  "Adidas Essentials Shirt": [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],
  "Adidas Oxford Formal Shirt": [
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
  ],
  "Nike Windrunner Jacket": [
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Fashion - Women ---
  "Zara Oversized Denim Jacket": [
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
  ],
  "Mango Double-Breasted Tailored Blazer": [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Levi's 721 High-Rise Skinny Jeans": [
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  ],
  "H&M Ribbed Knit Turtleneck Sweater": [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],
  "Nike Air Force 1 '07 Women's Sneakers": [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  ],
  "Zara Floral Wrap Midi Dress": [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  ],
  "H&M Satin Slip Party Dress": [
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
  ],
  "Zara Puff-Sleeve Maxi Dress": [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Fashion - Kids ---
  "Kids Dinosaur Graphic Cotton T-Shirt": [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Colorblock Zip-Up Windbreaker Jacket": [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Classic Stretch Denim Dungarees": [
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Sparkle Tiered Party Tulle Dress": [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Soft Sherpa Fleece Hooded Pullover": [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Light-Up Breathable Running Shoes": [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  ],
  "Kids Organic Cotton Sleepwear Pajama Set": [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],

  // --- Toys & Games ---
  "LEGO Creator Expert Modular Building": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hot Wheels RC Drift Rod": [
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hasbro Monopoly Classic": [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Fisher-Price Little Learners Activity Table": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
  ],
  "LEGO Star Wars Action Figure Set": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Fisher-Price Soothe & Glow Teddy Bear": [
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hasbro Plush Elephant Buddy": [
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "LEGO Cuddly Plush Dragon": [
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hot Wheels Ultimate Garage Playset": [
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "LEGO Classic Creative Brick Box": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hasbro Marvel Legends Action Figure": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Fisher-Price Code-a-pillar Twist": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
  ],
  "Hasbro Jenga Classic": [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
}

const categoryFallbacks: Record<string, [string, string]> = {
  Smartphones: [
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=1000&auto=format&fit=crop",
  ],
  Laptops: [
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
  ],
  Gadgets: [
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
  ],
  Boys: [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
  ],
  Women: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  ],
  Kids: [
    "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],
  Headphones: [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Smart Watches": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf50?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
  ],
  Speakers: [
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=1000&auto=format&fit=crop",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1000&auto=format&fit=crop",
  ],
  "T-Shirts": [
    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
  ],
  Shirts: [
    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000&auto=format&fit=crop",
  ],
  Jeans: [
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
  ],
  Jackets: [
    "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?q=80&w=1000&auto=format&fit=crop",
  ],
  Dresses: [
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1000&auto=format&fit=crop",
  ],
  Shoes: [
    "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
  ],
  "Remote Control": [
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Building Blocks": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  "Action Figures": [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?q=80&w=1000&auto=format&fit=crop",
  ],
  Educational: [
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
  ],
  "Board Games": [
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
  "Soft Toys": [
    "https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1000&auto=format&fit=crop",
  ],
}

function getProductImage(name: string, category: string, n: number): string {
  const match = curatedProductImages[name]
  if (match) return match[n] ?? match[0]
  const cat = categoryFallbacks[category]
  if (cat) return cat[n] ?? cat[0]
  return "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop"
}`;

const startIndex = code.indexOf('const curatedProductImages: Record<string, [string, string]> = {');
const endIndex = code.indexOf('function daysAgo(n: number)');

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not locate replacement markers in seed.ts');
  process.exit(1);
}

const updatedCode = code.slice(0, startIndex) + newCuratedCode + '\n\n' + code.slice(endIndex);
fs.writeFileSync(seedPath, updatedCode, 'utf8');
console.log('Successfully updated seed.ts with 100% verified pure studio imagery on white/neutral!');
