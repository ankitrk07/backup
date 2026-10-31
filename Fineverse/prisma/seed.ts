// Seed script. Ships a realistic catalog across all three verticals — every
// subcategory listed in the project brief has at least 2 products, each with
// full specs, variants, reviews, and Q&A.
import "dotenv/config"
import bcrypt from "bcryptjs"
import { db } from "../src/lib/db"
import { slugify } from "../src/lib/utils"

const categoryTree = {
  Electronics: ["Smartphones", "Laptops", "Gadgets", "Headphones", "Smart Watches", "Speakers", "Accessories"],
  Fashion: ["Boys", "Women", "Kids"],
  Toys: ["Remote Control", "Building Blocks", "Action Figures", "Educational", "Board Games", "Soft Toys"],
}

const brands = [
  "Sony", "Apple", "Samsung", "Bose", "JBL",
  "Levi's", "Zara", "H&M", "Nike", "Adidas",
  "LEGO", "Hot Wheels", "Fisher-Price", "Hasbro",
  "Google", "OnePlus", "ASUS", "Dell", "Lenovo",
  "DJI", "GoPro", "Valve", "Meta", "Garmin",
  "Anker", "Belkin", "Logitech", "Puma", "Mango",
]

const reviewers = [
  { name: "Ananya Rao", email: "ananya.rao@example.com" },
  { name: "Karan Mehta", email: "karan.mehta@example.com" },
  { name: "Priya Nair", email: "priya.nair@example.com" },
  { name: "Rohan Gupta", email: "rohan.gupta@example.com" },
  { name: "Sneha Iyer", email: "sneha.iyer@example.com" },
  { name: "Vikram Malhotra", email: "vikram.malhotra@example.com" },
  { name: "Divya Shah", email: "divya.shah@example.com" },
  { name: "Arjun Kapoor", email: "arjun.kapoor@example.com" },
  { name: "Meera Pillai", email: "meera.pillai@example.com" },
  { name: "Aditya Verma", email: "aditya.verma@example.com" },
]

const curatedProductImages: Record<string, [string, string]> = {
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
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=1000&auto=format&fit=crop",
  ],
  "Garmin Venu 3 Fitness Watch": [
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
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
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop",
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
}

function daysAgo(n: number) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000)
}

type SeedReview = {
  reviewer: string
  rating: number
  title: string
  comment: string
  verified?: boolean
  helpful?: number
  daysAgo: number
}

type SeedQuestion = {
  asker: string
  question: string
  answer?: string
  daysAgo: number
}

type SeedProduct = {
  name: string
  category: string
  brand: string
  price: number
  compareAt?: number
  description: string
  highlights: string[]
  isFeatured?: boolean
  isBestseller?: boolean
  isNew?: boolean
  rating: number
  reviewCount: number
  soldCount: number
  material?: string
  warrantyMonths?: number
  minAgeMonths?: number
  maxAgeMonths?: number
  safetyInfo?: string
  specs: { group: string; label: string; value: string }[]
  variants: { size?: string; color?: string; colorHex?: string; stock: number }[]
  reviews: SeedReview[]
  questions: SeedQuestion[]
}

const products: SeedProduct[] = [
  {
    name: "Sony WH-1000XM5 Wireless Headphones",
    category: "Headphones",
    brand: "Sony",
    price: 29990,
    compareAt: 34990,
    description:
      "Industry-leading noise cancellation meets exceptional sound quality. The WH-1000XM5 delivers up to 30 hours of battery life, crystal-clear calls, and all-day comfort for your daily commute or long flights.",
    highlights: [
      "Industry-leading noise cancellation",
      "30-hour battery life with quick charge",
      "Multipoint Bluetooth connection",
      "Crystal clear hands-free calling",
    ],
    isFeatured: true,
    isBestseller: true,
    rating: 4.7,
    reviewCount: 1284,
    soldCount: 4200,
    warrantyMonths: 12,
    specs: [
      { group: "Audio", label: "Driver Size", value: "30mm" },
      { group: "Audio", label: "Frequency Response", value: "4Hz–40kHz" },
      { group: "Battery", label: "Battery Life", value: "30 hours (ANC on)" },
      { group: "Connectivity", label: "Bluetooth", value: "5.2" },
    ],
    variants: [
      { color: "Midnight Black", colorHex: "#1a1a1a", stock: 42 },
      { color: "Platinum Silver", colorHex: "#c8c9cb", stock: 18 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "Best noise cancellation I've owned",
        comment:
          "Switched from the XM4 and the jump in ANC quality is real. Wore these on a 9-hour flight and barely noticed the engine hum. Call quality is also noticeably better.",
        verified: true,
        helpful: 42,
        daysAgo: 18,
      },
      {
        reviewer: "Karan Mehta",
        rating: 4,
        title: "Great sound, a bit pricey",
        comment:
          "Sound and comfort are excellent for long work-from-home days. Docking a star only because the price feels steep compared to last year's model.",
        verified: true,
        helpful: 11,
        daysAgo: 40,
      },
    ],
    questions: [
      {
        asker: "Rohan Gupta",
        question: "Do these support LDAC for high-res audio on Android?",
        answer: "Yes, LDAC is supported alongside standard SBC/AAC codecs.",
        daysAgo: 10,
      },
      {
        asker: "Sneha Iyer",
        question: "Can I use them wired if the battery dies?",
        answer: "Yes, a 3.5mm audio cable is included for wired listening.",
        daysAgo: 25,
      },
    ],
  },
  {
    name: "Apple MacBook Air M3",
    category: "Laptops",
    brand: "Apple",
    price: 114900,
    description:
      "The strikingly thin MacBook Air, supercharged by the M3 chip. Up to 18 hours of battery life and a stunning Liquid Retina display make it the ultimate everyday laptop.",
    highlights: [
      "Apple M3 chip with 8-core CPU",
      "Up to 18 hours battery life",
      "13.6-inch Liquid Retina display",
      "Fanless, silent design",
    ],
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 856,
    soldCount: 2100,
    warrantyMonths: 12,
    specs: [
      { group: "Performance", label: "Chip", value: "Apple M3" },
      { group: "Performance", label: "RAM", value: "8GB unified memory" },
      { group: "Storage", label: "Capacity", value: "256GB SSD" },
      { group: "Display", label: "Screen", value: "13.6-inch Liquid Retina" },
    ],
    variants: [
      { color: "Midnight", colorHex: "#1d2b3a", stock: 15 },
      { color: "Starlight", colorHex: "#f0e6d3", stock: 9 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Silent, fast, and the battery is unreal",
        comment:
          "A full day of video calls, editing, and browsing on one charge. No fan noise ever. This is the laptop I recommend to everyone now.",
        verified: true,
        helpful: 63,
        daysAgo: 12,
      },
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "8GB RAM is fine for most people",
        comment:
          "Was worried about the base RAM but for browser tabs, docs, and light editing it's smooth. Would upsize if you do heavy video work.",
        verified: true,
        helpful: 29,
        daysAgo: 33,
      },
    ],
    questions: [
      {
        asker: "Meera Pillai",
        question: "Is this the 13-inch or 15-inch Air?",
        answer: "This listing is the 13.6-inch MacBook Air with the M3 chip.",
        daysAgo: 6,
      },
      {
        asker: "Aditya Verma",
        question: "Does it come with a charger in the box?",
        answer: "Yes, a 30W USB-C power adapter and USB-C cable are included.",
        daysAgo: 20,
      },
    ],
  },
  {
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    brand: "Samsung",
    price: 79999,
    compareAt: 89999,
    description:
      "Meet Galaxy AI. The Galaxy S24 brings next-level intelligence to photography, translation, and everyday productivity — all wrapped in a sleek titanium-esque frame.",
    highlights: [
      "6.2-inch Dynamic AMOLED 2X display",
      "50MP pro-grade camera system",
      "Galaxy AI-powered features",
      "All-day intelligent battery",
    ],
    isNew: true,
    rating: 4.6,
    reviewCount: 642,
    soldCount: 3100,
    warrantyMonths: 12,
    specs: [
      { group: "Display", label: "Screen", value: "6.2-inch Dynamic AMOLED 2X" },
      { group: "Camera", label: "Main Camera", value: "50MP" },
      { group: "Battery", label: "Capacity", value: "4000mAh" },
      { group: "Storage", label: "Options", value: "128GB / 256GB" },
    ],
    variants: [
      { color: "Onyx Black", colorHex: "#1a1a1a", stock: 30 },
      { color: "Marble Gray", colorHex: "#8a8a8a", stock: 22 },
      { color: "Cobalt Violet", colorHex: "#6a5b8c", stock: 6 },
    ],
    reviews: [
      {
        reviewer: "Priya Nair",
        rating: 5,
        title: "Camera AI features are genuinely useful",
        comment:
          "The circle-to-search and live translate features aren't gimmicks — I use them weekly. Camera holds up well in low light too.",
        verified: true,
        helpful: 35,
        daysAgo: 15,
      },
      {
        reviewer: "Vikram Malhotra",
        rating: 4,
        title: "Solid upgrade from the S21",
        comment: "Noticeably faster and the battery easily gets me through a full day of moderate use.",
        verified: true,
        helpful: 8,
        daysAgo: 29,
      },
    ],
    questions: [
      {
        asker: "Ananya Rao",
        question: "Is the 128GB model expandable with a microSD card?",
        answer: "No, the Galaxy S24 does not support microSD expansion — storage is fixed at purchase.",
        daysAgo: 9,
      },
    ],
  },
  {
    name: "Apple Watch Series 9",
    category: "Smart Watches",
    brand: "Apple",
    price: 41900,
    description:
      "Smarter. Brighter. Mightier. The Apple Watch Series 9 features a brighter display, a powerful new chip, and the ability to control your device with just a double tap.",
    highlights: [
      "Brightest Apple Watch display yet",
      "Double Tap gesture control",
      "Advanced health & fitness tracking",
      "Always-On Retina display",
    ],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 511,
    soldCount: 1900,
    warrantyMonths: 12,
    specs: [
      { group: "Display", label: "Type", value: "Always-On Retina LTPO OLED" },
      { group: "Health", label: "Sensors", value: "Blood Oxygen, ECG, Heart Rate" },
      { group: "Battery", label: "Life", value: "18 hours" },
    ],
    variants: [
      { size: "41mm", color: "Midnight", colorHex: "#1d2b3a", stock: 20 },
      { size: "45mm", color: "Midnight", colorHex: "#1d2b3a", stock: 14 },
    ],
    reviews: [
      {
        reviewer: "Karan Mehta",
        rating: 5,
        title: "Double Tap actually works great",
        comment: "Skeptical at first but Double Tap for dismissing calls and controlling music is genuinely handy while cooking or on a run.",
        verified: true,
        helpful: 21,
        daysAgo: 22,
      },
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Comfortable for all-day wear",
        comment: "Barely notice it on my wrist. Sleep tracking has been surprisingly accurate compared to my old fitness band.",
        verified: true,
        helpful: 14,
        daysAgo: 48,
      },
    ],
    questions: [
      {
        asker: "Divya Shah",
        question: "Does the 41mm fit a smaller wrist comfortably?",
        answer: "Yes, the 41mm case is the better fit for smaller wrists; the included band is also adjustable.",
        daysAgo: 14,
      },
    ],
  },
  {
    name: "JBL Flip 6 Portable Speaker",
    category: "Speakers",
    brand: "JBL",
    price: 11999,
    compareAt: 13999,
    description:
      "Bold sound in a rugged, portable design. JBL Flip 6 delivers punchy bass and crystal-clear sound with an IP67 waterproof and dustproof build.",
    highlights: [
      "IP67 waterproof & dustproof",
      "12 hours of playtime",
      "PartyBoost for speaker pairing",
      "Bold JBL Original Pro Sound",
    ],
    rating: 4.5,
    reviewCount: 389,
    soldCount: 2600,
    warrantyMonths: 12,
    specs: [
      { group: "Audio", label: "Output Power", value: "30W RMS" },
      { group: "Battery", label: "Playtime", value: "12 hours" },
      { group: "Durability", label: "Rating", value: "IP67" },
    ],
    variants: [
      { color: "Black", colorHex: "#111111", stock: 55 },
      { color: "Blue", colorHex: "#2b5aa8", stock: 33 },
      { color: "Red", colorHex: "#b83232", stock: 4 },
    ],
    reviews: [
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "Survived a pool party, still going strong",
        comment: "Got splashed constantly and it just kept playing. Bass is punchy for its size. Great for the price.",
        verified: true,
        helpful: 19,
        daysAgo: 27,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Good value, wish it was louder",
        comment: "Sound quality is great indoors but gets a little thin outdoors at max volume. Still happy with the purchase.",
        verified: false,
        helpful: 6,
        daysAgo: 55,
      },
    ],
    questions: [
      {
        asker: "Aditya Verma",
        question: "Can two Flip 6 speakers be paired for stereo sound?",
        answer: "Yes, PartyBoost lets you pair two Flip 6 units for stereo or link multiple speakers for bigger sound.",
        daysAgo: 17,
      },
    ],
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    category: "Boys",
    brand: "Levi's",
    price: 3499,
    description:
      "The 511 Slim sits below the waist with a slim fit through the thigh and a slim leg for a modern, tailored silhouette that moves with you.",
    highlights: [
      "Slim fit through hip and thigh",
      "Stretch denim for all-day comfort",
      "Classic 5-pocket styling",
    ],
    isBestseller: true,
    rating: 4.4,
    reviewCount: 972,
    soldCount: 5100,
    material: "98% Cotton, 2% Elastane",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Slim" },
      { group: "Material", label: "Fabric", value: "98% Cotton, 2% Elastane" },
      { group: "Care", label: "Instructions", value: "Machine wash cold" },
    ],
    variants: [
      { size: "30", color: "Dark Indigo", colorHex: "#2a3a5c", stock: 25 },
      { size: "32", color: "Dark Indigo", colorHex: "#2a3a5c", stock: 40 },
      { size: "34", color: "Dark Indigo", colorHex: "#2a3a5c", stock: 12 },
      { size: "32", color: "Black", colorHex: "#1a1a1a", stock: 18 },
    ],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 4,
        title: "True to size, good stretch",
        comment: "Ordered my usual size and it fit perfectly. The stretch denim makes these way more comfortable than older 511s I've owned.",
        verified: true,
        helpful: 24,
        daysAgo: 20,
      },
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "My go-to jeans now",
        comment: "Third pair I've bought. Consistent sizing and the dark indigo wash looks great dressed up or down.",
        verified: true,
        helpful: 17,
        daysAgo: 60,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Do these run true to waist size or should I size down?",
        answer: "They run true to size for most fits, though some customers with a slimmer build prefer sizing down one.",
        daysAgo: 33,
      },
    ],
  },
  {
    name: "Nike Air Max 90",
    category: "Boys",
    brand: "Nike",
    price: 8995,
    compareAt: 10995,
    description:
      "Nothing as fly, nothing as comfortable, nothing as proven. The Air Max 90 stays true to its running roots with an iconic silhouette and visible Air cushioning.",
    highlights: [
      "Visible Max Air cushioning",
      "Durable rubber waffle outsole",
      "Foam midsole for lightweight comfort",
    ],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 1103,
    soldCount: 3800,
    material: "Leather & mesh upper",
    specs: [
      { group: "Fit", label: "Fit Type", value: "True to size" },
      { group: "Material", label: "Upper", value: "Leather & mesh" },
      { group: "Sole", label: "Outsole", value: "Rubber waffle" },
    ],
    variants: [
      { size: "UK 7", color: "White/Grey", colorHex: "#e8e8e8", stock: 20 },
      { size: "UK 8", color: "White/Grey", colorHex: "#e8e8e8", stock: 28 },
      { size: "UK 9", color: "White/Grey", colorHex: "#e8e8e8", stock: 15 },
      { size: "UK 8", color: "Triple Black", colorHex: "#1a1a1a", stock: 9 },
    ],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Comfortable straight out of the box",
        comment: "No break-in period needed. I walk a lot for work and these hold up all day without any rubbing.",
        verified: true,
        helpful: 38,
        daysAgo: 8,
      },
      {
        reviewer: "Vikram Malhotra",
        rating: 4,
        title: "Classic look, runs slightly narrow",
        comment: "Love the silhouette and colorway. If you have wide feet, consider sizing up half a size.",
        verified: true,
        helpful: 22,
        daysAgo: 45,
      },
    ],
    questions: [
      {
        asker: "Priya Nair",
        question: "Are these good for standing all day at work?",
        answer: "The visible Air cushioning provides solid all-day comfort, though they're designed as lifestyle/running shoes rather than work-specific footwear.",
        daysAgo: 19,
      },
    ],
  },
  {
    name: "Zara Oversized Denim Jacket",
    category: "Women",
    brand: "Zara",
    price: 4990,
    description:
      "An oversized denim jacket with a relaxed silhouette, button-front closure, and classic chest pockets — an effortless layer for every season.",
    highlights: ["Oversized relaxed fit", "Button-front closure", "Chest flap pockets"],
    isNew: true,
    rating: 4.2,
    reviewCount: 156,
    soldCount: 640,
    material: "100% Cotton denim",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Oversized" },
      { group: "Material", label: "Fabric", value: "100% Cotton" },
    ],
    variants: [
      { size: "S", color: "Light Blue", colorHex: "#a9c4de", stock: 14 },
      { size: "M", color: "Light Blue", colorHex: "#a9c4de", stock: 22 },
      { size: "L", color: "Light Blue", colorHex: "#a9c4de", stock: 11 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 4,
        title: "Great oversized fit",
        comment: "Sized down one from my usual for a less boxy look and it worked well. Denim feels sturdy, not flimsy.",
        verified: true,
        helpful: 9,
        daysAgo: 11,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Nice layering piece",
        comment: "Good weight for spring and autumn. Wish it came in a darker wash option too.",
        verified: false,
        helpful: 4,
        daysAgo: 26,
      },
    ],
    questions: [
      {
        asker: "Arjun Kapoor",
        question: "Should I size down for a more fitted look?",
        answer: "Yes — this jacket is designed oversized, so sizing down one size gives a more fitted, tailored look.",
        daysAgo: 7,
      },
    ],
  },
  {
    name: "H&M Essential Cotton T-Shirt",
    category: "Boys",
    brand: "H&M",
    price: 799,
    compareAt: 999,
    description:
      "A wardrobe essential. Soft, breathable cotton with a regular fit and crew neckline — pairs with everything.",
    highlights: ["100% organic cotton", "Regular fit", "Reinforced crew neckline"],
    rating: 4.1,
    reviewCount: 421,
    soldCount: 6200,
    material: "100% Organic Cotton",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Regular" },
      { group: "Material", label: "Fabric", value: "100% Organic Cotton" },
    ],
    variants: [
      { size: "S", color: "White", colorHex: "#f5f5f5", stock: 60 },
      { size: "M", color: "White", colorHex: "#f5f5f5", stock: 80 },
      { size: "L", color: "Black", colorHex: "#1a1a1a", stock: 45 },
      { size: "XL", color: "Black", colorHex: "#1a1a1a", stock: 5 },
    ],
    reviews: [
      {
        reviewer: "Aditya Verma",
        rating: 4,
        title: "Good basics, holds up after washes",
        comment: "Bought four of these. Fabric hasn't thinned out even after weekly washes for two months.",
        verified: true,
        helpful: 12,
        daysAgo: 30,
      },
      {
        reviewer: "Ananya Rao",
        rating: 4,
        title: "Soft and reliable everyday tee",
        comment: "Nothing fancy but exactly what I needed — soft cotton, true to size, doesn't shrink much.",
        verified: true,
        helpful: 7,
        daysAgo: 50,
      },
    ],
    questions: [
      {
        asker: "Rohan Gupta",
        question: "Is the white color see-through?",
        answer: "It's a mid-weight cotton, slightly sheer in bright light — an undershirt is recommended for the white colorway.",
        daysAgo: 21,
      },
    ],
  },
  {
    name: "Adidas Essentials Shirt",
    category: "Boys",
    brand: "Adidas",
    price: 2299,
    description:
      "A clean, versatile shirt built for movement. Lightweight woven fabric with a tailored fit for on-the-go comfort.",
    highlights: ["Lightweight woven fabric", "Tailored fit", "Breathable construction"],
    isBestseller: true,
    rating: 4.3,
    reviewCount: 288,
    soldCount: 1500,
    material: "100% Polyester",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Tailored" },
      { group: "Material", label: "Fabric", value: "100% Polyester" },
    ],
    variants: [
      { size: "M", color: "Navy", colorHex: "#1f2a44", stock: 33 },
      { size: "L", color: "Navy", colorHex: "#1f2a44", stock: 27 },
    ],
    reviews: [
      {
        reviewer: "Karan Mehta",
        rating: 4,
        title: "Breathable, good for travel",
        comment: "Wrinkle-resistant enough for a carry-on. Fit is athletic without being tight.",
        verified: true,
        helpful: 10,
        daysAgo: 24,
      },
      {
        reviewer: "Priya Nair",
        rating: 5,
        title: "Better than expected quality",
        comment: "Fabric feels premium for the price point. Navy color hasn't faded after several washes.",
        verified: true,
        helpful: 15,
        daysAgo: 41,
      },
    ],
    questions: [
      {
        asker: "Sneha Iyer",
        question: "Is this shirt suitable for formal occasions?",
        answer: "It's designed as smart-casual — great for travel or casual office settings, but not a formal dress shirt.",
        daysAgo: 13,
      },
    ],
  },
  {
    name: "LEGO Creator Expert Modular Building",
    category: "Building Blocks",
    brand: "LEGO",
    price: 8999,
    description:
      "An intricately detailed modular building set for advanced builders, featuring realistic architecture and a fully furnished interior.",
    highlights: ["2000+ pieces", "Advanced building experience", "Displayable modular design"],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 734,
    soldCount: 980,
    minAgeMonths: 216,
    safetyInfo: "Contains small parts. Not suitable for children under 18 years.",
    specs: [
      { group: "Set Details", label: "Piece Count", value: "2,048" },
      { group: "Set Details", label: "Recommended Age", value: "18+" },
    ],
    variants: [{ stock: 25 }],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Incredible detail, worth every rupee",
        comment: "Took me a relaxing weekend to build. The interior detailing is museum-quality. Display piece now in my living room.",
        verified: true,
        helpful: 31,
        daysAgo: 16,
      },
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Best LEGO set I've built",
        comment: "Instructions are clear, piece quality is excellent, and no missing pieces in my box. Highly recommend for adult builders.",
        verified: true,
        helpful: 18,
        daysAgo: 37,
      },
    ],
    questions: [
      {
        asker: "Meera Pillai",
        question: "How long does this typically take to build?",
        answer: "Most builders report 6–10 hours depending on experience level and how carefully you're sorting pieces.",
        daysAgo: 22,
      },
    ],
  },
  {
    name: "Hot Wheels RC Drift Rod",
    category: "Remote Control",
    brand: "Hot Wheels",
    price: 3499,
    compareAt: 4499,
    description:
      "Full-throttle drift action with responsive steering and a rechargeable battery pack for hours of hallway racing.",
    highlights: ["Realistic drift steering", "Rechargeable battery included", "Durable impact-resistant shell"],
    isNew: true,
    rating: 4.4,
    reviewCount: 219,
    soldCount: 1350,
    minAgeMonths: 96,
    safetyInfo: "Choking hazard — small parts. Not suitable for children under 3 years.",
    specs: [
      { group: "Set Details", label: "Recommended Age", value: "8+" },
      { group: "Power", label: "Battery", value: "Rechargeable Li-ion, included" },
    ],
    variants: [
      { color: "Flame Red", colorHex: "#c62828", stock: 40 },
      { color: "Electric Blue", colorHex: "#1e6fd9", stock: 16 },
    ],
    reviews: [
      {
        reviewer: "Aditya Verma",
        rating: 4,
        title: "My son loves the drift mode",
        comment: "Bought for my 9-year-old. Drift steering is genuinely fun even for me to try. Battery lasts about 40 minutes of active play.",
        verified: true,
        helpful: 13,
        daysAgo: 19,
      },
      {
        reviewer: "Ananya Rao",
        rating: 4,
        title: "Durable, survived several crashes",
        comment: "Shell held up fine after multiple wall collisions. Charging takes a while but battery life is decent.",
        verified: true,
        helpful: 6,
        daysAgo: 44,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "How long does a full charge take?",
        answer: "A full charge takes approximately 90 minutes and provides around 40 minutes of continuous play.",
        daysAgo: 12,
      },
    ],
  },
  {
    name: "Hasbro Monopoly Classic",
    category: "Board Games",
    brand: "Hasbro",
    price: 1299,
    description:
      "The classic family game of buying, selling, and building your way to fortune. Includes tokens, property cards, and iconic game board.",
    highlights: ["Classic family gameplay", "2–6 players", "Includes all original tokens"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 1567,
    soldCount: 8900,
    minAgeMonths: 96,
    safetyInfo: "Contains small parts. Not suitable for children under 3 years.",
    specs: [
      { group: "Set Details", label: "Players", value: "2–6" },
      { group: "Set Details", label: "Recommended Age", value: "8+" },
    ],
    variants: [{ stock: 120 }],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Family game night staple",
        comment: "Box quality is sturdy, pieces feel premium compared to cheaper versions we've owned before. A classic for a reason.",
        verified: true,
        helpful: 27,
        daysAgo: 28,
      },
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Great gift, arrived well packaged",
        comment: "Bought as a birthday gift and the box arrived in perfect condition. All pieces present and accounted for.",
        verified: true,
        helpful: 9,
        daysAgo: 52,
      },
    ],
    questions: [
      {
        asker: "Priya Nair",
        question: "Is this the standard edition or a themed edition?",
        answer: "This is the Classic standard edition with the original board, tokens, and property set.",
        daysAgo: 34,
      },
    ],
  },
  {
    name: "Fisher-Price Little Learners Activity Table",
    category: "Educational",
    brand: "Fisher-Price",
    price: 2799,
    description:
      "An interactive learning table with lights, music, and activities that grow with your child — from tummy time to toddling.",
    highlights: ["3 stages of play", "Lights, sounds & music", "Encourages fine motor skills"],
    isNew: true,
    rating: 4.6,
    reviewCount: 342,
    soldCount: 1100,
    minAgeMonths: 6,
    maxAgeMonths: 36,
    safetyInfo: "No small parts. Suitable from 6 months, adult supervision recommended.",
    specs: [
      { group: "Set Details", label: "Recommended Age", value: "6–36 months" },
      { group: "Power", label: "Battery", value: "3 x AA, included" },
    ],
    variants: [{ stock: 30 }],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Grows with my toddler",
        comment: "Started using the legs-off mode for tummy time at 6 months, now she stands and plays with it daily at 14 months.",
        verified: true,
        helpful: 16,
        daysAgo: 23,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Songs are catchy (maybe too catchy)",
        comment: "Great educational value, just be prepared to hear the alphabet song in your sleep. Sturdy build quality.",
        verified: true,
        helpful: 8,
        daysAgo: 39,
      },
    ],
    questions: [
      {
        asker: "Arjun Kapoor",
        question: "Can the legs be removed for floor play?",
        answer: "Yes, the legs detach easily to convert the table into a flat activity panel for tummy time.",
        daysAgo: 15,
      },
    ],
  },
  {
    name: "LEGO Star Wars Action Figure Set",
    category: "Action Figures",
    brand: "LEGO",
    price: 1999,
    compareAt: 2499,
    description:
      "Recreate epic galactic battles with this highly detailed action figure set featuring iconic characters and accessories.",
    highlights: ["Highly detailed figures", "Includes display stands", "Compatible with other sets"],
    rating: 4.5,
    reviewCount: 198,
    soldCount: 760,
    minAgeMonths: 72,
    safetyInfo: "Contains small parts. Not suitable for children under 6 years.",
    specs: [
      { group: "Set Details", label: "Figures Included", value: "4" },
      { group: "Set Details", label: "Recommended Age", value: "6+" },
    ],
    variants: [{ stock: 3 }],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Great detail on the minifigures",
        comment: "Bought for my nephew's birthday. The face printing and accessories on each figure are really well done.",
        verified: true,
        helpful: 7,
        daysAgo: 31,
      },
      {
        reviewer: "Aditya Verma",
        rating: 4,
        title: "Good value set",
        comment: "Compatible with our other LEGO Star Wars sets, which was the main selling point for us. Stock was low when we ordered.",
        verified: false,
        helpful: 3,
        daysAgo: 46,
      },
    ],
    questions: [
      {
        asker: "Ananya Rao",
        question: "Are the display stands included or sold separately?",
        answer: "Display stands for all four figures are included in the box at no extra cost.",
        daysAgo: 18,
      },
    ],
  },

  // ── Electronics: Accessories ──────────────────────────────────────────
  {
    name: "Anker 737 Power Bank 24000mAh",
    category: "Accessories",
    brand: "Anker",
    price: 6499,
    compareAt: 7999,
    description:
      "A high-capacity power bank with a built-in display showing real-time charging status. Fast enough to top up a laptop, phone, and earbuds all at once.",
    highlights: ["24000mAh capacity", "140W max output", "Smart digital display", "Charges 3 devices at once"],
    isBestseller: true,
    rating: 4.6,
    reviewCount: 512,
    soldCount: 1800,
    warrantyMonths: 18,
    specs: [
      { group: "Power", label: "Capacity", value: "24000mAh" },
      { group: "Power", label: "Max Output", value: "140W" },
      { group: "Ports", label: "USB-C", value: "2x" },
    ],
    variants: [{ color: "Black", colorHex: "#161616", stock: 60 }],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Charges my laptop from empty easily",
        comment: "The display is genuinely useful — shows exact wattage going to each port. Heavy but worth it for travel.",
        verified: true,
        helpful: 15,
        daysAgo: 22,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Great capacity, a bit bulky",
        comment: "Does exactly what it promises. Wouldn't call it pocket-friendly but it lives in my backpack anyway.",
        verified: true,
        helpful: 6,
        daysAgo: 55,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Is it allowed on flights?",
        answer: "Yes, at 24000mAh (about 86Wh) it's within the 100Wh airline carry-on limit.",
        daysAgo: 12,
      },
    ],
  },
  {
    name: "Belkin 3-in-1 Wireless Charging Stand",
    category: "Accessories",
    brand: "Belkin",
    price: 8999,
    description:
      "Charge your phone, watch, and earbuds simultaneously on one sleek stand. MagSafe-compatible with a soft-touch base that protects your desk.",
    highlights: ["Charges phone, watch & earbuds together", "MagSafe compatible", "Adjustable viewing angle"],
    isNew: true,
    rating: 4.4,
    reviewCount: 187,
    soldCount: 640,
    warrantyMonths: 12,
    specs: [
      { group: "Charging", label: "Phone Output", value: "15W" },
      { group: "Charging", label: "Watch Output", value: "5W" },
    ],
    variants: [{ color: "White", colorHex: "#f5f5f5", stock: 25 }],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 4,
        title: "Clean nightstand setup",
        comment: "Looks great and charges reliably. The watch puck can slip out of alignment if you bump the desk though.",
        verified: true,
        helpful: 9,
        daysAgo: 33,
      },
    ],
    questions: [],
  },
  {
    name: "Logitech MX Master 3S Wireless Mouse",
    category: "Accessories",
    brand: "Logitech",
    price: 8495,
    compareAt: 9995,
    description:
      "A precision wireless mouse built for all-day productivity, with an 8K DPI sensor, quiet clicks, and seamless multi-device switching.",
    highlights: ["8K DPI precision sensor", "Ultra-quiet clicks", "Switch between 3 devices", "70-day battery life"],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 940,
    soldCount: 3100,
    warrantyMonths: 24,
    specs: [
      { group: "Sensor", label: "DPI", value: "up to 8000" },
      { group: "Battery", label: "Life", value: "70 days" },
      { group: "Connectivity", label: "Bluetooth / USB Receiver", value: "Both supported" },
    ],
    variants: [
      { color: "Graphite", colorHex: "#3a3a3c", stock: 48 },
      { color: "Pale Grey", colorHex: "#d6d3cd", stock: 20 },
    ],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Best productivity mouse I've used",
        comment: "The scroll wheel alone is worth the price — flywheel mode makes scrolling long documents effortless.",
        verified: true,
        helpful: 28,
        daysAgo: 19,
      },
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "Switching between 3 computers is seamless",
        comment: "One click and it jumps to my other machine, cursor and clipboard included. Genuinely changed my workflow.",
        verified: true,
        helpful: 14,
        daysAgo: 60,
      },
    ],
    questions: [
      {
        asker: "Divya Shah",
        question: "Does it work on glass desks?",
        answer: "It uses Darkfield tracking, so yes — it tracks reliably on glass and other glossy surfaces.",
        daysAgo: 8,
      },
    ],
  },

  // ── Fashion: Women's Dresses ──────────────────────────────────────────
  {
    name: "Zara Floral Wrap Midi Dress",
    category: "Women",
    brand: "Zara",
    price: 3499,
    compareAt: 4299,
    description:
      "A flattering wrap-style midi dress in a soft floral print, cut from breathable viscose. Effortless for brunch, easily dressed up for evenings.",
    highlights: ["Wrap silhouette with tie waist", "Breathable viscose fabric", "Midi length", "Machine washable"],
    isFeatured: true,
    rating: 4.5,
    reviewCount: 264,
    soldCount: 980,
    material: "100% Viscose",
    specs: [
      { group: "Fabric", label: "Material", value: "Viscose" },
      { group: "Care", label: "Wash", value: "Machine wash cold" },
    ],
    variants: [
      { size: "XS", color: "Floral Print", stock: 12 },
      { size: "S", color: "Floral Print", stock: 22 },
      { size: "M", color: "Floral Print", stock: 25 },
      { size: "L", color: "Floral Print", stock: 14 },
    ],
    reviews: [
      {
        reviewer: "Priya Nair",
        rating: 5,
        title: "Flattering on every body type",
        comment: "The wrap tie means you can adjust the fit exactly how you like. Fabric doesn't crease easily either.",
        verified: true,
        helpful: 19,
        daysAgo: 14,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Runs slightly large",
        comment: "Beautiful print and true to the photos, but I'd size down if you're between sizes.",
        verified: true,
        helpful: 8,
        daysAgo: 29,
      },
    ],
    questions: [
      {
        asker: "Sneha Iyer",
        question: "Is it lined?",
        answer: "Yes, it has a lightweight full lining so it isn't sheer.",
        daysAgo: 20,
      },
    ],
  },
  {
    name: "H&M Satin Slip Party Dress",
    category: "Women",
    brand: "H&M",
    price: 2299,
    description:
      "A minimalist satin slip dress with adjustable straps and a bias cut that skims the body. A one-piece solution for any evening occasion.",
    highlights: ["Silky satin finish", "Adjustable straps", "Bias-cut drape", "Lightweight layering piece"],
    isNew: true,
    rating: 4.3,
    reviewCount: 156,
    soldCount: 720,
    material: "97% Polyester, 3% Elastane",
    specs: [{ group: "Fabric", label: "Material", value: "Satin polyester blend" }],
    variants: [
      { size: "XS", color: "Champagne", stock: 10 },
      { size: "S", color: "Champagne", stock: 18 },
      { size: "M", color: "Champagne", stock: 16 },
      { size: "S", color: "Black", stock: 20 },
      { size: "M", color: "Black", stock: 20 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 4,
        title: "Great for layering",
        comment: "Wore it under a blazer for a work event and alone for a dinner out. Versatile piece for the price.",
        verified: true,
        helpful: 6,
        daysAgo: 41,
      },
    ],
    questions: [],
  },
  {
    name: "Zara Puff-Sleeve Maxi Dress",
    category: "Women",
    brand: "Zara",
    price: 4999,
    compareAt: 5999,
    description:
      "A statement maxi dress with dramatic puff sleeves and a cinched waist. Structured enough for occasions, comfortable enough to dance in.",
    highlights: ["Dramatic puff sleeves", "Cinched, defined waist", "Full-length maxi cut", "Hidden back zip"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 203,
    soldCount: 540,
    material: "100% Cotton Poplin",
    specs: [
      { group: "Fabric", label: "Material", value: "Cotton poplin" },
      { group: "Fit", label: "Closure", value: "Back zip" },
    ],
    variants: [
      { size: "S", color: "Emerald", colorHex: "#1f6b4d", stock: 9 },
      { size: "M", color: "Emerald", colorHex: "#1f6b4d", stock: 11 },
      { size: "L", color: "Emerald", colorHex: "#1f6b4d", stock: 7 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "Show-stopping for weddings",
        comment: "Wore this to a friend's wedding and got compliments all night. The poplin holds its shape beautifully.",
        verified: true,
        helpful: 21,
        daysAgo: 25,
      },
      {
        reviewer: "Karan Mehta",
        rating: 4,
        title: "Gorgeous but needs the right occasion",
        comment: "Bought for my wife — it's stunning but definitely a statement piece, not everyday wear.",
        verified: false,
        helpful: 5,
        daysAgo: 50,
      },
    ],
    questions: [
      {
        asker: "Vikram Malhotra",
        question: "Does it have pockets?",
        answer: "No, this style doesn't have pockets — it's designed with a fitted waist seam.",
        daysAgo: 15,
      },
    ],
  },

  // ── Toys: Soft Toys ─────────────────────────────────────────────────────
  {
    name: "Fisher-Price Soothe & Glow Teddy Bear",
    category: "Soft Toys",
    brand: "Fisher-Price",
    price: 1499,
    compareAt: 1799,
    description:
      "A cuddly plush bear with a soft glowing belly and gentle lullabies to help little ones settle at bedtime. Machine washable for easy care.",
    highlights: ["Glowing belly with auto shut-off", "5 lullabies & soothing sounds", "Ultra-soft plush", "Machine washable"],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 612,
    soldCount: 2400,
    minAgeMonths: 0,
    maxAgeMonths: 36,
    safetyInfo: "No small parts. Suitable from birth. Battery compartment is screw-secured.",
    specs: [
      { group: "Details", label: "Height", value: "30 cm" },
      { group: "Power", label: "Batteries", value: "3x AAA (included)" },
    ],
    variants: [{ color: "Cream", stock: 55 }],
    reviews: [
      {
        reviewer: "Priya Nair",
        rating: 5,
        title: "Part of our bedtime routine now",
        comment: "The glow dims automatically after a few minutes which is perfect. Soft enough that my daughter sleeps holding it every night.",
        verified: true,
        helpful: 24,
        daysAgo: 12,
      },
      {
        reviewer: "Aditya Verma",
        rating: 5,
        title: "Great baby shower gift",
        comment: "Bought two — one for us, one as a gift. The lullabies aren't tinny sounding like a lot of cheap toys.",
        verified: true,
        helpful: 10,
        daysAgo: 38,
      },
    ],
    questions: [
      {
        asker: "Rohan Gupta",
        question: "Can the fur be washed after the electronics are removed?",
        answer: "Yes, there's a zip pocket to remove the sound module before machine washing the plush shell.",
        daysAgo: 9,
      },
    ],
  },
  {
    name: "Hasbro Plush Elephant Buddy",
    category: "Soft Toys",
    brand: "Hasbro",
    price: 899,
    description:
      "An oversized, huggable plush elephant made from hypoallergenic fabric. Floppy ears and soft stitching make it a durable companion for toddlers.",
    highlights: ["Hypoallergenic plush", "Oversized huggable size", "Reinforced stitching", "No loose parts"],
    rating: 4.6,
    reviewCount: 340,
    soldCount: 1500,
    minAgeMonths: 0,
    maxAgeMonths: 60,
    safetyInfo: "No small parts. Surface washable. Suitable from birth.",
    specs: [{ group: "Details", label: "Height", value: "45 cm" }],
    variants: [
      { color: "Grey", stock: 30 },
      { color: "Pink", stock: 22 },
    ],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Survived a lot of love",
        comment: "Two years of daily hugs, spills, and drags around the house and the stitching still holds strong.",
        verified: true,
        helpful: 13,
        daysAgo: 44,
      },
    ],
    questions: [],
  },
  {
    name: "LEGO Cuddly Plush Dragon",
    category: "Soft Toys",
    brand: "LEGO",
    price: 1299,
    compareAt: 1599,
    description:
      "A friendly plush dragon inspired by the LEGO Ninjago universe, with soft spikes and an embroidered face — no sharp bits, just cuddles.",
    highlights: ["Ninjago-inspired design", "Soft embroidered face", "Plush spikes, no sharp edges"],
    isNew: true,
    rating: 4.4,
    reviewCount: 98,
    soldCount: 410,
    minAgeMonths: 24,
    safetyInfo: "Recommended for ages 2+. No small parts.",
    specs: [{ group: "Details", label: "Length", value: "35 cm" }],
    variants: [{ color: "Green", colorHex: "#3f8f4f", stock: 26 }],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 4,
        title: "Hit with our LEGO-obsessed 4 year old",
        comment: "He carries it everywhere now that he's seen the show. Good quality plush, holds shape well.",
        verified: true,
        helpful: 5,
        daysAgo: 27,
      },
    ],
    questions: [],
  },

  // ── Electronics: additional depth ──────────────────────────────────────
  {
    name: "Samsung Galaxy A55",
    category: "Smartphones",
    brand: "Samsung",
    price: 34999,
    compareAt: 39999,
    description:
      "A capable mid-range phone with a bright AMOLED display, all-day battery, and a camera system that punches above its price.",
    highlights: ["6.6-inch Super AMOLED", "5000mAh battery", "50MP main camera", "IP67 water resistance"],
    isBestseller: true,
    rating: 4.4,
    reviewCount: 720,
    soldCount: 2900,
    warrantyMonths: 12,
    specs: [
      { group: "Display", label: "Screen", value: "6.6-inch Super AMOLED" },
      { group: "Battery", label: "Capacity", value: "5000mAh" },
      { group: "Camera", label: "Main", value: "50MP" },
    ],
    variants: [
      { color: "Awesome Navy", colorHex: "#26314d", stock: 34 },
      { color: "Awesome Lilac", colorHex: "#c9c0e0", stock: 20 },
    ],
    reviews: [
      {
        reviewer: "Karan Mehta",
        rating: 4,
        title: "Excellent value flagship-lite",
        comment: "Battery genuinely lasts a day and a half of moderate use. Camera is very good for the price bracket.",
        verified: true,
        helpful: 17,
        daysAgo: 21,
      },
      {
        reviewer: "Meera Pillai",
        rating: 5,
        title: "Impressive display for the price",
        comment: "Coming from a flagship, I didn't expect the screen to look this good. No regrets downgrading price-wise.",
        verified: true,
        helpful: 9,
        daysAgo: 35,
      },
    ],
    questions: [
      {
        asker: "Ananya Rao",
        question: "Does it support wireless charging?",
        answer: "No, this model supports fast wired charging only, not wireless.",
        daysAgo: 11,
      },
    ],
  },
  {
    name: "Apple MacBook Pro 14-inch M3 Pro",
    category: "Laptops",
    brand: "Apple",
    price: 199900,
    description:
      "Serious power for creative and technical work. The M3 Pro chip and mini-LED display make this the laptop for anyone who's outgrown the Air.",
    highlights: ["Apple M3 Pro chip, 12-core CPU", "Liquid Retina XDR display", "Up to 18 hours battery", "6-speaker sound system"],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 412,
    soldCount: 980,
    warrantyMonths: 12,
    specs: [
      { group: "Performance", label: "Chip", value: "Apple M3 Pro" },
      { group: "Performance", label: "RAM", value: "18GB unified memory" },
      { group: "Storage", label: "Capacity", value: "512GB SSD" },
      { group: "Display", label: "Screen", value: "14.2-inch Liquid Retina XDR" },
    ],
    variants: [{ color: "Space Black", colorHex: "#2b2b2b", stock: 8 }],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Handles 4K editing without breaking a sweat",
        comment: "Export times on Premiere are half what they were on my Intel Mac. The screen alone justifies the upgrade.",
        verified: true,
        helpful: 22,
        daysAgo: 30,
      },
    ],
    questions: [
      {
        asker: "Sneha Iyer",
        question: "Is 18GB RAM enough for video editing?",
        answer: "For most 4K workflows, yes — the unified memory architecture makes it feel more capable than the number suggests.",
        daysAgo: 17,
      },
    ],
  },
  {
    name: "Apple AirPods Pro (2nd Gen)",
    category: "Headphones",
    brand: "Apple",
    price: 24900,
    compareAt: 26900,
    description:
      "Adaptive Audio and improved noise cancellation make these AirPods disappear into your day — commute, calls, and workouts included.",
    highlights: ["Adaptive Active Noise Cancellation", "Transparency mode", "Up to 6 hours listening time", "MagSafe charging case"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 1560,
    soldCount: 5200,
    warrantyMonths: 12,
    specs: [
      { group: "Audio", label: "ANC", value: "Adaptive" },
      { group: "Battery", label: "Listening Time", value: "6 hours (ANC on)" },
    ],
    variants: [{ color: "White", colorHex: "#f5f5f5", stock: 70 }],
    reviews: [
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "The seamless Apple switching is unmatched",
        comment: "Auto-switches between my iPhone, iPad, and Mac without touching a setting. ANC is genuinely excellent for earbuds this small.",
        verified: true,
        helpful: 31,
        daysAgo: 16,
      },
      {
        reviewer: "Divya Shah",
        rating: 4,
        title: "Great sound, tips took some getting used to",
        comment: "Had to size up the ear tips for a proper seal. Once fitted right, isolation and sound are top-tier.",
        verified: true,
        helpful: 8,
        daysAgo: 48,
      },
    ],
    questions: [],
  },
  {
    name: "Garmin Venu 3 Fitness Watch",
    category: "Smart Watches",
    brand: "Garmin",
    price: 44990,
    description:
      "A serious fitness watch with up to 14 days of battery life, built-in sleep coaching, and precise GPS tracking for every workout.",
    highlights: ["Up to 14-day battery life", "Built-in GPS", "Sleep coaching & Body Battery", "AMOLED always-on display"],
    isNew: true,
    rating: 4.6,
    reviewCount: 289,
    soldCount: 810,
    warrantyMonths: 12,
    specs: [
      { group: "Battery", label: "Smartwatch Mode", value: "Up to 14 days" },
      { group: "Display", label: "Type", value: "AMOLED, always-on" },
    ],
    variants: [
      { color: "Slate", colorHex: "#4a4d52", stock: 19 },
      { color: "Ivory", colorHex: "#e8e2d5", stock: 15 },
    ],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Battery life is a game changer",
        comment: "Coming from a daily-charge smartwatch, going almost two weeks between charges has changed how I actually use it.",
        verified: true,
        helpful: 12,
        daysAgo: 24,
      },
    ],
    questions: [
      {
        asker: "Priya Nair",
        question: "Does it work with both iPhone and Android?",
        answer: "Yes, the Garmin Connect app supports both iOS and Android.",
        daysAgo: 13,
      },
    ],
  },
  {
    name: "Bose SoundLink Flex Bluetooth Speaker",
    category: "Speakers",
    brand: "Bose",
    price: 14900,
    compareAt: 16900,
    description:
      "A rugged, waterproof speaker that punches well above its size — deep bass and clear vocals whether you're poolside or on a hike.",
    highlights: ["IP67 waterproof & dustproof", "PositionIQ auto-adjusting sound", "12-hour battery life", "Floats in water"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 445,
    soldCount: 1650,
    warrantyMonths: 12,
    specs: [
      { group: "Durability", label: "Rating", value: "IP67" },
      { group: "Battery", label: "Life", value: "12 hours" },
    ],
    variants: [
      { color: "Black", colorHex: "#161616", stock: 40 },
      { color: "Stone Blue", colorHex: "#7c94a8", stock: 22 },
    ],
    reviews: [
      {
        reviewer: "Karan Mehta",
        rating: 5,
        title: "Unbelievable sound for the size",
        comment: "Took it camping and it filled the whole campsite. Survived being dropped in a lake, still works perfectly.",
        verified: true,
        helpful: 18,
        daysAgo: 20,
      },
      {
        reviewer: "Meera Pillai",
        rating: 4,
        title: "Great everyday speaker",
        comment: "Bass is surprisingly deep for something this compact. Only wish it paired with two units for stereo out of the box.",
        verified: true,
        helpful: 6,
        daysAgo: 42,
      },
    ],
    questions: [],
  },

  // ── Fashion: Boys Fashion ──────────────────────────────────────────────
  {
    name: "Nike Dri-FIT Running T-Shirt",
    category: "Boys",
    brand: "Nike",
    price: 1799,
    compareAt: 2199,
    description:
      "A lightweight running tee that wicks sweat and keeps you cool, with flatlock seams that won't chafe on long runs.",
    highlights: ["Dri-FIT sweat-wicking fabric", "Flatlock seams", "Reflective logo for visibility"],
    isBestseller: true,
    rating: 4.5,
    reviewCount: 380,
    soldCount: 2100,
    material: "100% Recycled Polyester",
    specs: [{ group: "Fabric", label: "Material", value: "Recycled polyester" }],
    variants: [
      { size: "S", color: "Black", colorHex: "#161616", stock: 30 },
      { size: "M", color: "Black", colorHex: "#161616", stock: 40 },
      { size: "L", color: "Black", colorHex: "#161616", stock: 35 },
      { size: "M", color: "Grey", colorHex: "#9c9c9c", stock: 28 },
    ],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "No chafing even on half marathons",
        comment: "Been wearing this brand for years and the flatlock seams genuinely make a difference on long distances.",
        verified: true,
        helpful: 14,
        daysAgo: 26,
      },
    ],
    questions: [],
  },
  {
    name: "Adidas Oxford Formal Shirt",
    category: "Boys",
    brand: "Adidas",
    price: 2799,
    description:
      "A crisp Oxford-weave formal shirt that transitions easily from office to evening. Wrinkle-resistant cotton keeps it looking sharp all day.",
    highlights: ["Oxford weave cotton", "Wrinkle-resistant finish", "Regular fit"],
    rating: 4.3,
    reviewCount: 145,
    soldCount: 590,
    material: "100% Cotton",
    specs: [{ group: "Fabric", label: "Weave", value: "Oxford" }],
    variants: [
      { size: "S", color: "White", stock: 18 },
      { size: "M", color: "White", stock: 24 },
      { size: "L", color: "White", stock: 20 },
      { size: "M", color: "Light Blue", colorHex: "#b7d0e8", stock: 16 },
    ],
    reviews: [
      {
        reviewer: "Aditya Verma",
        rating: 4,
        title: "Good office staple",
        comment: "Holds its shape through a full workday without needing to be tucked back in every hour.",
        verified: true,
        helpful: 5,
        daysAgo: 37,
      },
    ],
    questions: [],
  },
  {
    name: "Levi's 501 Original Straight Jeans",
    category: "Boys",
    brand: "Levi's",
    price: 4499,
    compareAt: 5499,
    description:
      "The original straight-fit jean since 1873. Timeless silhouette, durable button-fly construction, and a fit that only gets better with wear.",
    highlights: ["Iconic straight fit", "Button-fly closure", "100% cotton denim"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 890,
    soldCount: 3400,
    material: "100% Cotton Denim",
    specs: [{ group: "Fit", label: "Style", value: "Straight, button-fly" }],
    variants: [
      { size: "30", color: "Rigid Blue", stock: 15 },
      { size: "32", color: "Rigid Blue", stock: 22 },
      { size: "34", color: "Rigid Blue", stock: 18 },
      { size: "36", color: "Rigid Blue", stock: 10 },
    ],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "The classic for a reason",
        comment: "Bought my third pair. They break in perfectly and last years longer than fast-fashion denim.",
        verified: true,
        helpful: 20,
        daysAgo: 31,
      },
      {
        reviewer: "Vikram Malhotra",
        rating: 4,
        title: "Stiff at first, worth the break-in",
        comment: "Rigid denim needs a few wears to soften up but the fit afterward is unbeatable.",
        verified: true,
        helpful: 7,
        daysAgo: 52,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Do these shrink after washing?",
        answer: "Rigid denim can shrink slightly on first wash — sizing up by half a size before the first wash is common practice.",
        daysAgo: 19,
      },
    ],
  },
  {
    name: "Nike Windrunner Jacket",
    category: "Boys",
    brand: "Nike",
    price: 5999,
    compareAt: 6999,
    description:
      "The iconic Windrunner, updated for today. Lightweight, wind-resistant, and instantly recognizable with its signature color-blocking.",
    highlights: ["Wind-resistant woven fabric", "Iconic color-blocked design", "Elastic cuffs & hem"],
    isNew: true,
    rating: 4.6,
    reviewCount: 210,
    soldCount: 870,
    material: "100% Nylon",
    specs: [{ group: "Fabric", label: "Material", value: "Woven nylon" }],
    variants: [
      { size: "M", color: "Blue/White", colorHex: "#274b8f", stock: 16 },
      { size: "L", color: "Blue/White", colorHex: "#274b8f", stock: 12 },
      { size: "XL", color: "Blue/White", colorHex: "#274b8f", stock: 8 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "Packs down tiny for travel",
        comment: "Folds into its own pocket almost. Perfect throw-in-the-bag jacket for unpredictable weather.",
        verified: true,
        helpful: 11,
        daysAgo: 23,
      },
    ],
    questions: [],
  },
  {
    name: "Adidas Ultraboost Light Running Shoes",
    category: "Boys",
    brand: "Adidas",
    price: 15999,
    compareAt: 17999,
    description:
      "The lightest Ultraboost yet, with responsive Boost cushioning that returns energy with every stride. Built for daily miles.",
    highlights: ["Lightest Ultraboost to date", "Responsive Boost midsole", "Primeknit adaptive upper"],
    isBestseller: true,
    rating: 4.6,
    reviewCount: 670,
    soldCount: 2300,
    material: "Primeknit textile upper",
    specs: [
      { group: "Cushioning", label: "Midsole", value: "Boost" },
      { group: "Upper", label: "Material", value: "Primeknit" },
    ],
    variants: [
      { size: "8", color: "Core Black", colorHex: "#161616", stock: 14 },
      { size: "9", color: "Core Black", colorHex: "#161616", stock: 20 },
      { size: "10", color: "Core Black", colorHex: "#161616", stock: 18 },
      { size: "9", color: "Cloud White", colorHex: "#f2f2f2", stock: 12 },
    ],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Noticeably lighter than the previous version",
        comment: "I run 30+ km a week and the weight reduction is immediately noticeable without losing any of the Boost bounce.",
        verified: true,
        helpful: 16,
        daysAgo: 28,
      },
      {
        reviewer: "Priya Nair",
        rating: 4,
        title: "Comfortable but sizing runs small",
        comment: "Order half a size up from your usual — the knit upper is snug out of the box.",
        verified: true,
        helpful: 9,
        daysAgo: 44,
      },
    ],
    questions: [
      {
        asker: "Meera Pillai",
        question: "Are these good for wide feet?",
        answer: "The Primeknit upper has some stretch, but if you have notably wide feet, sizing up half a size is recommended.",
        daysAgo: 14,
      },
    ],
  },

  // ── Toys: additional depth ──────────────────────────────────────────────
  {
    name: "Hot Wheels Ultimate Garage Playset",
    category: "Remote Control",
    brand: "Hot Wheels",
    price: 5999,
    compareAt: 6999,
    description:
      "A multi-level garage playset with working elevator, spinning car wash, and room for 19 cars — endless imaginative play built in.",
    highlights: ["Working elevator & car wash", "Stores up to 19 cars", "Multi-level track layout"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 320,
    soldCount: 1100,
    minAgeMonths: 48,
    safetyInfo: "Recommended for ages 4+. Contains small parts.",
    specs: [{ group: "Set Details", label: "Car Capacity", value: "19 cars" }],
    variants: [{ stock: 17 }],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Kept our 6 year old busy for hours",
        comment: "Sturdy build for a plastic playset, the elevator mechanism hasn't jammed once after months of daily play.",
        verified: true,
        helpful: 12,
        daysAgo: 34,
      },
    ],
    questions: [],
  },
  {
    name: "LEGO Classic Creative Brick Box",
    category: "Building Blocks",
    brand: "LEGO",
    price: 3499,
    compareAt: 3999,
    description:
      "1500 pieces in a rainbow of colors and shapes — no instructions needed. Pure open-ended building for imaginative kids.",
    highlights: ["1500 pieces", "Wide variety of colors & shapes", "Compatible with all LEGO sets", "Storage box included"],
    rating: 4.8,
    reviewCount: 540,
    soldCount: 2200,
    minAgeMonths: 48,
    safetyInfo: "Recommended for ages 4+. Contains small parts.",
    specs: [{ group: "Set Details", label: "Piece Count", value: "1500" }],
    variants: [{ stock: 32 }],
    reviews: [
      {
        reviewer: "Aditya Verma",
        rating: 5,
        title: "Best open-ended toy we own",
        comment: "No set instructions means it grows with them — my 5 year old and 9 year old both build completely different things.",
        verified: true,
        helpful: 17,
        daysAgo: 22,
      },
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Great piece variety",
        comment: "More wheels and specialty pieces than I expected from a 'classic' box. The storage container is a nice touch too.",
        verified: true,
        helpful: 8,
        daysAgo: 47,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Does it include any wheels or minifigures?",
        answer: "Yes, the box includes a handful of wheels, eyes, and basic accessory pieces alongside standard bricks.",
        daysAgo: 16,
      },
    ],
  },
  {
    name: "Hasbro Marvel Legends Action Figure",
    category: "Action Figures",
    brand: "Hasbro",
    price: 2499,
    description:
      "A highly articulated, movie-accurate collectible figure with premium detailing and interchangeable accessories for dynamic posing.",
    highlights: ["Premium movie-accurate detailing", "Multiple points of articulation", "Interchangeable accessories"],
    isNew: true,
    rating: 4.6,
    reviewCount: 175,
    soldCount: 610,
    minAgeMonths: 48,
    safetyInfo: "Recommended for ages 4+. Contains small parts.",
    specs: [
      { group: "Details", label: "Height", value: "15 cm" },
      { group: "Details", label: "Articulation Points", value: "16+" },
    ],
    variants: [{ stock: 24 }],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Collector-grade quality",
        comment: "Paint detailing is sharp and the joints are tight without being stiff. Displays great on a shelf.",
        verified: true,
        helpful: 10,
        daysAgo: 18,
      },
    ],
    questions: [],
  },
  {
    name: "Fisher-Price Code-a-pillar Twist",
    category: "Educational",
    brand: "Fisher-Price",
    price: 2999,
    compareAt: 3499,
    description:
      "An early-coding toy that introduces sequencing and problem solving through hands-on play — twist segments to program different paths.",
    highlights: ["Introduces basic coding concepts", "Twist-and-connect segments", "Lights, sounds & movement"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 298,
    soldCount: 1050,
    minAgeMonths: 36,
    maxAgeMonths: 72,
    safetyInfo: "Recommended for ages 3-6. Contains small parts.",
    specs: [{ group: "Set Details", label: "Segments", value: "8" }],
    variants: [{ stock: 21 }],
    reviews: [
      {
        reviewer: "Meera Pillai",
        rating: 5,
        title: "Great STEM introduction",
        comment: "My daughter doesn't realize she's learning sequencing logic — she just thinks it's a fun wiggly toy.",
        verified: true,
        helpful: 14,
        daysAgo: 29,
      },
    ],
    questions: [
      {
        asker: "Priya Nair",
        question: "Does it need batteries?",
        answer: "Yes, it requires 3x AAA batteries which are included in the box.",
        daysAgo: 21,
      },
    ],
  },
  {
    name: "Hasbro Jenga Classic",
    category: "Board Games",
    brand: "Hasbro",
    price: 899,
    description:
      "The original wooden block-stacking game. Simple rules, tense gameplay — pull a block, stack it on top, don't be the one who topples the tower.",
    highlights: ["54 precision-crafted wooden blocks", "Includes stacking sleeve", "Classic party game"],
    rating: 4.6,
    reviewCount: 410,
    soldCount: 1900,
    minAgeMonths: 72,
    safetyInfo: "Recommended for ages 6+. Small wooden pieces.",
    specs: [{ group: "Set Details", label: "Blocks", value: "54" }],
    variants: [{ stock: 45 }],
    reviews: [
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "A party staple for a reason",
        comment: "Blocks are genuinely well-sanded and uniform, unlike some cheaper knockoffs we've tried.",
        verified: true,
        helpful: 9,
        daysAgo: 40,
      },
    ],
    questions: [],
  },

  // ── Fashion: Women's Additional Collection ─────────────────────────────
  {
    name: "Mango Double-Breasted Tailored Blazer",
    category: "Women",
    brand: "Mango",
    price: 6990,
    compareAt: 8490,
    description:
      "A sharp, structured double-breasted blazer cut from a refined wool-blend. Features peaked lapels, tortoise-effect buttons, and a silhouette that elevates both tailored trousers and vintage denim.",
    highlights: ["Structured shoulder silhouette", "Double-breasted front with horn-effect buttons", "Full satin interior lining", "Flap front pockets"],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 142,
    soldCount: 520,
    material: "65% Polyester, 33% Viscose, 2% Elastane",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Tailored Regular" },
      { group: "Fabric", label: "Material", value: "Wool-blend weave" },
      { group: "Care", label: "Care Instructions", value: "Dry clean only" },
    ],
    variants: [
      { size: "S", color: "Camel", colorHex: "#c19a6b", stock: 15 },
      { size: "M", color: "Camel", colorHex: "#c19a6b", stock: 24 },
      { size: "L", color: "Camel", colorHex: "#c19a6b", stock: 12 },
      { size: "M", color: "Midnight Black", colorHex: "#111111", stock: 18 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Worth every rupee — feels like luxury",
        comment: "The tailoring on this blazer is exceptional. Sits nicely on the shoulders without being boxy.",
        verified: true,
        helpful: 21,
        daysAgo: 14,
      },
    ],
    questions: [
      {
        asker: "Priya Nair",
        question: "Is this suitable for formal corporate wear?",
        answer: "Yes, it has a polished structure and matte finish perfect for professional corporate settings.",
        daysAgo: 8,
      },
    ],
  },
  {
    name: "Levi's 721 High-Rise Skinny Jeans",
    category: "Women",
    brand: "Levi's",
    price: 3299,
    compareAt: 3999,
    description:
      "Levi's classic high-rise silhouette designed to flatter and hold shape all day. Features Levi's Stellar Stretch denim that hugs curves without bagging out at the knees.",
    highlights: ["High-rise waist with tummy-slimming panel", "Stellar Stretch recovery denim", "Iconic leather patch & red tab", "Classic 5-pocket design"],
    isBestseller: true,
    rating: 4.6,
    reviewCount: 480,
    soldCount: 1890,
    material: "70% Cotton, 20% Polyester, 8% Viscose, 2% Elastane",
    specs: [
      { group: "Fit", label: "Rise", value: "High Rise (10.25 inch)" },
      { group: "Fit", label: "Leg", value: "Skinny" },
      { group: "Fabric", label: "Denim Weight", value: "11.5 oz Stretch" },
    ],
    variants: [
      { size: "26", color: "Dark Wash Blue", colorHex: "#1c2b42", stock: 14 },
      { size: "28", color: "Dark Wash Blue", colorHex: "#1c2b42", stock: 30 },
      { size: "30", color: "Dark Wash Blue", colorHex: "#1c2b42", stock: 22 },
      { size: "28", color: "Washed Black", colorHex: "#222222", stock: 19 },
    ],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Best high waist jeans I've bought",
        comment: "Stays up without needing a belt and doesn't lose elasticity after 3-4 wears between washes.",
        verified: true,
        helpful: 19,
        daysAgo: 22,
      },
    ],
    questions: [],
  },
  {
    name: "H&M Ribbed Knit Turtleneck Sweater",
    category: "Women",
    brand: "H&M",
    price: 2299,
    description:
      "Soft, fine-knit turtleneck sweater with subtle ribbed texture and ribbed trims at cuffs and hem. An essential cozy layer for cold evenings.",
    highlights: ["Ultra-soft yarn blend", "Cozy folded turtleneck collar", "Ribbed cuffs & hemline", "Gentle relaxed silhouette"],
    isNew: true,
    rating: 4.4,
    reviewCount: 110,
    soldCount: 460,
    material: "50% Viscose, 28% Polyester, 22% Polyamide",
    specs: [
      { group: "Fit", label: "Fit Type", value: "Relaxed Fit" },
      { group: "Neckline", label: "Style", value: "Folded Turtleneck" },
    ],
    variants: [
      { size: "S", color: "Oatmeal Melange", colorHex: "#e0d7c7", stock: 22 },
      { size: "M", color: "Oatmeal Melange", colorHex: "#e0d7c7", stock: 35 },
      { size: "L", color: "Oatmeal Melange", colorHex: "#e0d7c7", stock: 18 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 4,
        title: "Super soft, zero itchiness",
        comment: "Extremely comfortable on bare skin, great neutral color that pairs with jeans or a silk skirt.",
        verified: true,
        helpful: 11,
        daysAgo: 16,
      },
    ],
    questions: [],
  },
  {
    name: "Nike Air Force 1 '07 Women's Sneakers",
    category: "Women",
    brand: "Nike",
    price: 8195,
    compareAt: 9695,
    description:
      "The legend lives on in the Nike Air Force 1 '07, a modern take on the iconic low-top with crisp leather edges, clean lines, and soft Air cushioning.",
    highlights: ["Supple leather upper with stitched overlays", "Encapsulated Nike Air unit", "Perforations on toe for breathability", "Non-marking rubber cupsole"],
    isBestseller: true,
    rating: 4.9,
    reviewCount: 1240,
    soldCount: 4500,
    material: "Full-Grain Leather",
    specs: [
      { group: "Footwear", label: "Upper", value: "Genuine Leather" },
      { group: "Footwear", label: "Outsole", value: "Rubber with pivot circle" },
    ],
    variants: [
      { size: "UK 4", color: "Triple White", colorHex: "#ffffff", stock: 12 },
      { size: "UK 5", color: "Triple White", colorHex: "#ffffff", stock: 25 },
      { size: "UK 6", color: "Triple White", colorHex: "#ffffff", stock: 20 },
    ],
    reviews: [
      {
        reviewer: "Meera Pillai",
        rating: 5,
        title: "Timeless sneakers that go with everything",
        comment: "Classic look, clean silhouette, and surprisingly supportive for full days on your feet.",
        verified: true,
        helpful: 28,
        daysAgo: 10,
      },
    ],
    questions: [],
  },

  // ── Fashion: Kids' Collection ──────────────────────────────────────────
  {
    name: "Kids Dinosaur Graphic Cotton T-Shirt",
    category: "Kids",
    brand: "H&M",
    price: 699,
    compareAt: 899,
    description:
      "Fun and playful crew-neck t-shirt in super soft 100% organic cotton jersey, featuring an eye-catching embossed dinosaur print with glow-in-the-dark accents.",
    highlights: ["100% organic breathable cotton", "Glow-in-the-dark dinosaur graphic", "Tagless collar to prevent irritation", "Reinforced double-stitched seams"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 230,
    soldCount: 1200,
    minAgeMonths: 24,
    maxAgeMonths: 120,
    material: "100% Organic Cotton",
    specs: [
      { group: "Kids Details", label: "Age Group", value: "2–10 Years" },
      { group: "Fabric", label: "Material", value: "100% Organic Cotton Jersey" },
      { group: "Safety", label: "Dye Type", value: "Non-toxic eco-friendly dyes" },
    ],
    variants: [
      { size: "2-3Y", color: "Forest Green", colorHex: "#2d5a3f", stock: 20 },
      { size: "4-5Y", color: "Forest Green", colorHex: "#2d5a3f", stock: 35 },
      { size: "6-7Y", color: "Forest Green", colorHex: "#2d5a3f", stock: 25 },
      { size: "8-9Y", color: "Navy", colorHex: "#1b2a47", stock: 18 },
    ],
    reviews: [
      {
        reviewer: "Priya Nair",
        rating: 5,
        title: "My 5-year-old insists on wearing this every day",
        comment: "The glow-in-the-dark graphic is a huge hit. Has been washed at least 10 times without cracking.",
        verified: true,
        helpful: 15,
        daysAgo: 19,
      },
    ],
    questions: [
      {
        asker: "Vikram Malhotra",
        question: "Does the glow-in-the-dark print wash off easily?",
        answer: "No, it is heat-sealed into the cotton and holds up through standard gentle machine washes.",
        daysAgo: 12,
      },
    ],
  },
  {
    name: "Kids Colorblock Zip-Up Windbreaker Jacket",
    category: "Kids",
    brand: "Nike",
    price: 1899,
    compareAt: 2499,
    description:
      "Lightweight, water-resistant windbreaker jacket with vibrant color-blocking, elasticized hood, and breathable mesh lining to keep kids comfortable during outdoor adventures.",
    highlights: ["Water-repellent lightweight shell", "Breathable mesh interior lining", "Reflective safety zipper pull", "Side zip pockets for treasures"],
    isFeatured: true,
    rating: 4.6,
    reviewCount: 165,
    soldCount: 780,
    minAgeMonths: 36,
    maxAgeMonths: 144,
    material: "100% Recycled Polyester",
    specs: [
      { group: "Kids Details", label: "Age Group", value: "3–12 Years" },
      { group: "Protection", label: "Weather", value: "Windproof & water-resistant" },
    ],
    variants: [
      { size: "4-5Y", color: "Blue/Orange", colorHex: "#1f4a8b", stock: 16 },
      { size: "6-7Y", color: "Blue/Orange", colorHex: "#1f4a8b", stock: 22 },
      { size: "8-10Y", color: "Blue/Orange", colorHex: "#1f4a8b", stock: 14 },
    ],
    reviews: [
      {
        reviewer: "Aditya Verma",
        rating: 5,
        title: "Lightweight and perfect for monsoon/light chill",
        comment: "Packs into a school backpack easily and keeps my son dry during drizzle.",
        verified: true,
        helpful: 9,
        daysAgo: 25,
      },
    ],
    questions: [],
  },
  {
    name: "Kids Classic Stretch Denim Dungarees",
    category: "Kids",
    brand: "Levi's",
    price: 1599,
    compareAt: 1999,
    description:
      "Timeless denim dungarees with adjustable buckle shoulder straps, side button closures, and authentic utility pockets. Built with stretch cotton to let toddlers run and climb freely.",
    highlights: ["Adjustable metal buckle straps", "Comfort stretch denim", "Reinforced knees for durability", "Front chest bib pocket"],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 310,
    soldCount: 1420,
    minAgeMonths: 12,
    maxAgeMonths: 72,
    material: "98% Cotton, 2% Elastane",
    specs: [
      { group: "Kids Details", label: "Age Group", value: "1–6 Years" },
      { group: "Fit", label: "Straps", value: "Fully adjustable" },
    ],
    variants: [
      { size: "1-2Y", color: "Medium Indigo", colorHex: "#375271", stock: 18 },
      { size: "3-4Y", color: "Medium Indigo", colorHex: "#375271", stock: 25 },
      { size: "5-6Y", color: "Medium Indigo", colorHex: "#375271", stock: 16 },
    ],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Adorable and practically indestructible",
        comment: "Our toddler climbs everything and the knees on these dungarees haven't torn at all.",
        verified: true,
        helpful: 18,
        daysAgo: 15,
      },
    ],
    questions: [],
  },
  {
    name: "Kids Sparkle Tiered Party Tulle Dress",
    category: "Kids",
    brand: "Zara",
    price: 2199,
    compareAt: 2799,
    description:
      "Enchanting special-occasion dress with sparkling sequin bodice, flutter sleeves, and multi-tiered glitter tulle skirt with a silky cotton lining that stays gentle against delicate skin.",
    highlights: ["Glimmering sequin embellishments", "Soft multi-tiered tulle skirt", "100% pure cotton skin-contact lining", "Concealed back zip with safety cover"],
    isNew: true,
    rating: 4.9,
    reviewCount: 88,
    soldCount: 390,
    minAgeMonths: 24,
    maxAgeMonths: 96,
    material: "Polyester Tulle with 100% Cotton Lining",
    specs: [
      { group: "Kids Details", label: "Occasion", value: "Birthday & Party Wear" },
      { group: "Lining", label: "Inner", value: "100% Pure Soft Cotton" },
    ],
    variants: [
      { size: "2-3Y", color: "Rose Gold Blush", colorHex: "#e8b8b0", stock: 12 },
      { size: "4-5Y", color: "Rose Gold Blush", colorHex: "#e8b8b0", stock: 20 },
      { size: "6-7Y", color: "Rose Gold Blush", colorHex: "#e8b8b0", stock: 15 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "Daughter felt like a princess at her birthday",
        comment: "Often tulle dresses are scratchy, but this one has a full soft cotton lining so she danced comfortably all evening.",
        verified: true,
        helpful: 12,
        daysAgo: 8,
      },
    ],
    questions: [],
  },
  {
    name: "Kids Soft Sherpa Fleece Hooded Pullover",
    category: "Kids",
    brand: "H&M",
    price: 1499,
    description:
      "Cloud-soft sherpa fleece hooded jacket with contrast jersey piping and cozy kangaroo hand pockets. Keeps little ones toasty on chilly mornings.",
    highlights: ["Ultra-plush faux sherpa fleece", "Warm lined hood", "Front pouch kangaroo pocket", "Machine wash safe"],
    rating: 4.7,
    reviewCount: 140,
    soldCount: 650,
    minAgeMonths: 24,
    maxAgeMonths: 120,
    material: "100% Recycled Polyester Fleece",
    specs: [
      { group: "Kids Details", label: "Age Group", value: "2–10 Years" },
      { group: "Warmth", label: "Insulation", value: "High-pile Sherpa" },
    ],
    variants: [
      { size: "3-4Y", color: "Teddy Cream", colorHex: "#ede7dd", stock: 15 },
      { size: "5-6Y", color: "Teddy Cream", colorHex: "#ede7dd", stock: 22 },
      { size: "7-8Y", color: "Teddy Cream", colorHex: "#ede7dd", stock: 14 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Incredibly cozy",
        comment: "So soft you just want to hug them. High quality stitching and warm without being heavy.",
        verified: true,
        helpful: 7,
        daysAgo: 20,
      },
    ],
    questions: [],
  },
  {
    name: "Kids Light-Up Breathable Running Shoes",
    category: "Kids",
    brand: "Adidas",
    price: 1999,
    compareAt: 2499,
    description:
      "Sporty running sneakers equipped with shock-activated LED lights in the cushioned midsole, flexible mesh upper, and easy hook-and-loop velcro strap.",
    highlights: ["Motion-activated LED heel lights", "Breathable sandwich mesh upper", "No-tie velcro strap + elastic laces", "Non-marking grippy rubber sole"],
    isBestseller: true,
    rating: 4.8,
    reviewCount: 390,
    soldCount: 1650,
    material: "Breathable Mesh & EVA",
    specs: [
      { group: "Kids Details", label: "Closure", value: "Hook-and-loop velcro" },
      { group: "Midsole", label: "Special Feature", value: "Impact-activated LED lights" },
    ],
    variants: [
      { size: "UK 10 Kids", color: "Solar Red/Black", colorHex: "#e03b24", stock: 18 },
      { size: "UK 11 Kids", color: "Solar Red/Black", colorHex: "#e03b24", stock: 24 },
      { size: "UK 12 Kids", color: "Solar Red/Black", colorHex: "#e03b24", stock: 20 },
      { size: "UK 13 Kids", color: "Royal Blue/Lime", colorHex: "#1a468d", stock: 16 },
    ],
    reviews: [
      {
        reviewer: "Karan Mehta",
        rating: 5,
        title: "He refuses to take these off!",
        comment: "The lights flash brightly with every step, and the velcro strap makes it easy for him to put them on by himself.",
        verified: true,
        helpful: 24,
        daysAgo: 14,
      },
    ],
    questions: [
      {
        asker: "Rohan Gupta",
        question: "Do the lights need charging?",
        answer: "No, they have sealed long-life battery units that typically outlast the shoes through normal wear.",
        daysAgo: 9,
      },
    ],
  },
  {
    name: "Kids Organic Cotton Sleepwear Pajama Set",
    category: "Kids",
    brand: "H&M",
    price: 999,
    description:
      "Two-piece bedtime pajama set in 100% certified organic rib-knit cotton. Elasticated waistband with soft-cuffed wrists and ankles for sweet dreams without bunching.",
    highlights: ["GOTS certified organic cotton", "Stretchy ribbed cuffs & ankles", "Enclosed gentle waistband", "Playful bedtime star print"],
    rating: 4.6,
    reviewCount: 180,
    soldCount: 820,
    minAgeMonths: 12,
    maxAgeMonths: 96,
    material: "100% Organic Cotton",
    specs: [
      { group: "Kids Details", label: "Pieces", value: "Long-sleeve top + pants set" },
      { group: "Fabric", label: "Type", value: "Soft Organic Rib Knit" },
    ],
    variants: [
      { size: "2-3Y", color: "Midnight Star Print", colorHex: "#1f2a44", stock: 20 },
      { size: "4-5Y", color: "Midnight Star Print", colorHex: "#1f2a44", stock: 28 },
      { size: "6-7Y", color: "Midnight Star Print", colorHex: "#1f2a44", stock: 15 },
    ],
    reviews: [
      {
        reviewer: "Meera Pillai",
        rating: 5,
        title: "Softest pajamas we've found",
        comment: "Great quality cotton, stretchy enough to get on a wiggly toddler easily.",
        verified: true,
        helpful: 8,
        daysAgo: 30,
      },
    ],
    questions: [],
  },

  // ── Electronics: Gadgets ───────────────────────────────────────────────
  {
    name: "DJI Mini 4 Pro Fly More Combo Drone",
    category: "Gadgets",
    brand: "DJI",
    price: 98990,
    compareAt: 109990,
    description:
      "Ultra-compact under-249g folding drone with omnidirectional obstacle sensing, 4K/60fps HDR true vertical shooting, and up to 34 minutes flight time. The ultimate aerial creation gadget.",
    highlights: ["Under 249 g ultralight & foldable", "Omnidirectional active obstacle avoidance", "4K/60fps HDR vertical shooting", "20 km FHD video transmission (O4)", "Includes RC 2 controller with bright screen"],
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 310,
    soldCount: 750,
    warrantyMonths: 12,
    specs: [
      { group: "Flight", label: "Weight", value: "249 g" },
      { group: "Flight", label: "Max Flight Time", value: "34 minutes (standard battery)" },
      { group: "Camera", label: "Sensor", value: "1/1.3-inch CMOS, f/1.7" },
      { group: "Video", label: "Max Resolution", value: "4K at 60fps HDR" },
      { group: "Transmission", label: "Range", value: "Up to 20 km (DJI O4)" },
    ],
    variants: [{ color: "Space Grey", colorHex: "#707372", stock: 14 }],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Spectacular aerial footage, fits in a jacket pocket",
        comment: "The obstacle avoidance works like magic — flown between trees with zero collisions. The RC 2 screen is crystal clear under bright sunlight.",
        verified: true,
        helpful: 45,
        daysAgo: 11,
      },
    ],
    questions: [
      {
        asker: "Arjun Kapoor",
        question: "Do I need a commercial pilot license to fly this in India?",
        answer: "As an under-249g nano/micro drone, it falls into the recreational category, though registration on Digital Sky is recommended.",
        daysAgo: 6,
      },
    ],
  },
  {
    name: "Valve Steam Deck OLED Handheld Console",
    category: "Gadgets",
    brand: "Valve",
    price: 59999,
    compareAt: 64999,
    description:
      "The definitive PC gaming handheld. Features a breathtaking 7.4-inch 90Hz HDR OLED display, improved battery life, Wi-Fi 6E, and full Steam library portability.",
    highlights: ["7.4-inch 90Hz HDR OLED screen", "Up to 12 hours battery life", "Custom 6nm AMD APU", "Full console controls with dual trackpads", "512GB ultra-fast NVMe SSD"],
    isFeatured: true,
    isNew: true,
    rating: 4.9,
    reviewCount: 520,
    soldCount: 1400,
    warrantyMonths: 12,
    specs: [
      { group: "Display", label: "Screen", value: "7.4-inch HDR OLED, 90Hz, 1000 nits peak" },
      { group: "Processor", label: "APU", value: "6nm AMD Zen 2 (4c/8t) + RDNA 2 GPU" },
      { group: "Memory", label: "RAM", value: "16 GB LPDDR5" },
      { group: "Storage", label: "SSD", value: "512 GB High-Speed NVMe" },
      { group: "Wireless", label: "Wi-Fi", value: "Wi-Fi 6E Tri-Band" },
    ],
    variants: [{ color: "Matte Black", colorHex: "#1a1a1a", stock: 19 }],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Playing Cyberpunk on a flight is surreal",
        comment: "The OLED blacks and 90Hz refresh rate make this hands down the best portable gadget I have ever owned. Battery lasts double the original LCD model.",
        verified: true,
        helpful: 58,
        daysAgo: 15,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Can you install Windows or other launchers on it?",
        answer: "Yes, Steam Deck is an open PC platform running SteamOS, and supports sideloading Epic Games, GOG, or dual-booting Windows.",
        daysAgo: 10,
      },
    ],
  },
  {
    name: "GoPro HERO12 Black Action Camera",
    category: "Gadgets",
    brand: "GoPro",
    price: 37990,
    compareAt: 42990,
    description:
      "Rugged and waterproof to 33ft, the HERO12 Black captures jaw-dropping 5.3K60 video, Emmy-winning HyperSmooth 6.0 stabilization, and Bluetooth audio support for external mics.",
    highlights: ["Incredible 5.3K60 & 4K120 HDR video", "HyperSmooth 6.0 with 360-degree Horizon Lock", "Rugged + waterproof to 10m (33ft)", "Includes Enduro rechargeable battery", "Bluetooth audio support for AirPods"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 380,
    soldCount: 1100,
    warrantyMonths: 12,
    specs: [
      { group: "Video", label: "Resolution", value: "5.3K at 60fps, 4K at 120fps, 2.7K at 240fps" },
      { group: "Photo", label: "Still Resolution", value: "27 MP" },
      { group: "Stabilization", label: "System", value: "HyperSmooth 6.0" },
      { group: "Water Resistance", label: "Depth", value: "10 m (33 ft) without housing" },
    ],
    variants: [{ color: "Black", colorHex: "#161616", stock: 25 }],
    reviews: [
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "HyperSmooth stabilization is insane",
        comment: "Mounted on my bike handlebar on rugged trails — footage looks like it was shot on a motorized gimbal track.",
        verified: true,
        helpful: 33,
        daysAgo: 21,
      },
    ],
    questions: [],
  },
  {
    name: "Apple iPad Air 11-inch M2",
    category: "Gadgets",
    brand: "Apple",
    price: 59900,
    description:
      "Supercharged by the blazing-fast Apple M2 chip. Features a Liquid Retina display, landscape front camera with Center Stage, and support for Apple Pencil Pro.",
    highlights: ["Apple M2 chip with 8-core CPU & 10-core GPU", "11-inch Liquid Retina display with True Tone", "Landscape 12MP Ultra Wide front camera", "Superfast Wi-Fi 6E & Touch ID", "All-day 10-hour battery life"],
    isFeatured: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 460,
    soldCount: 1350,
    warrantyMonths: 12,
    specs: [
      { group: "Performance", label: "Chip", value: "Apple M2 (8-core CPU, 10-core GPU)" },
      { group: "Display", label: "Screen", value: "11-inch Liquid Retina, P3 Wide Color" },
      { group: "Storage", label: "Capacity", value: "128 GB" },
      { group: "Audio", label: "Speakers", value: "Landscape stereo speakers" },
    ],
    variants: [
      { color: "Space Grey", colorHex: "#3e4042", stock: 20 },
      { color: "Starlight", colorHex: "#f0e8dc", stock: 15 },
      { color: "Blue", colorHex: "#b8c9d9", stock: 12 },
    ],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "The M2 chip flies through illustration and notes",
        comment: "Paired with the Pencil Pro, drawing latency is nonexistent. Screen brightness and battery easily last through college lectures.",
        verified: true,
        helpful: 27,
        daysAgo: 14,
      },
    ],
    questions: [],
  },
  {
    name: "Meta Quest 3 All-in-One VR Headset",
    category: "Gadgets",
    brand: "Meta",
    price: 54999,
    compareAt: 59999,
    description:
      "Breakthrough mixed reality headset that transforms your living room into a virtual playground. Powered by Snapdragon XR2 Gen 2 with 4K+ Infinite Display and full-color passthrough.",
    highlights: ["High-resolution full-color mixed reality passthrough", "Snapdragon XR2 Gen 2 processor with 2x GPU speed", "4K+ Infinite Display (2064x2208 per eye)", "Touch Plus ring-free controllers with TruTouch haptics", "3D spatial audio with 40% louder volume"],
    isNew: true,
    rating: 4.7,
    reviewCount: 290,
    soldCount: 890,
    warrantyMonths: 12,
    specs: [
      { group: "Display", label: "Resolution", value: "2064 x 2208 per eye (4K+ Infinite Display)" },
      { group: "Performance", label: "Chip", value: "Qualcomm Snapdragon XR2 Gen 2" },
      { group: "Passthrough", label: "Sensors", value: "Dual RGB color cameras + depth projector" },
      { group: "Audio", label: "Sound", value: "Integrated 3D spatial audio" },
    ],
    variants: [{ color: "Arctic White", colorHex: "#eceef0", stock: 16 }],
    reviews: [
      {
        reviewer: "Sneha Iyer",
        rating: 5,
        title: "Mixed reality feels like the future",
        comment: "Having virtual floating screens in my real room while seeing everything clearly is mindblowing. Gaming is super sharp compared to Quest 2.",
        verified: true,
        helpful: 39,
        daysAgo: 18,
      },
    ],
    questions: [],
  },

  // ── Electronics: Smartphones & Laptops Expansion ───────────────────────
  {
    name: "Apple iPhone 15 Pro 128GB",
    category: "Smartphones",
    brand: "Apple",
    price: 134900,
    description:
      "Forged in titanium and featuring the groundbreaking A17 Pro chip, customizable Action button, USB-C with USB 3 speeds, and a 48MP main camera system.",
    highlights: ["Aerospace-grade titanium frame with textured matte glass back", "A17 Pro chip with pro-class 6-core GPU", "48MP main camera with multiple focal lengths", "Customizable Action button", "USB-C with USB 3 transfer speeds"],
    isFeatured: true,
    isBestseller: true,
    rating: 4.9,
    reviewCount: 980,
    soldCount: 3200,
    warrantyMonths: 12,
    specs: [
      { group: "Processor", label: "Chip", value: "A17 Pro chip (6-core CPU, 6-core GPU)" },
      { group: "Display", label: "Screen", value: "6.1-inch Super Retina XDR OLED, 120Hz ProMotion" },
      { group: "Camera", label: "Rear System", value: "48MP Main + 12MP Ultra Wide + 12MP 3x Telephoto" },
      { group: "Connector", label: "Port", value: "USB-C (USB 3 speeds up to 10Gbps)" },
    ],
    variants: [
      { color: "Natural Titanium", colorHex: "#9a9792", stock: 24 },
      { color: "Blue Titanium", colorHex: "#39434f", stock: 18 },
      { color: "Black Titanium", colorHex: "#2b2b2c", stock: 30 },
    ],
    reviews: [
      {
        reviewer: "Ananya Rao",
        rating: 5,
        title: "Titanium makes a huge weight difference",
        comment: "Noticeably lighter in hand than the 14 Pro. The Action button mapped to camera makes spontaneous shots instant.",
        verified: true,
        helpful: 52,
        daysAgo: 14,
      },
    ],
    questions: [
      {
        asker: "Karan Mehta",
        question: "Does it come with a charger in the box?",
        answer: "The box includes a woven USB-C charging cable; a 20W USB-C power adapter is sold separately.",
        daysAgo: 18,
      },
    ],
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    category: "Smartphones",
    brand: "Samsung",
    price: 129999,
    compareAt: 139999,
    description:
      "Meet Galaxy S24 Ultra with Galaxy AI, a built-in S Pen, titanium exterior, flat 6.8-inch Dynamic AMOLED 2X display, and a 200MP camera with Quad Telephoto system.",
    highlights: ["Galaxy AI live translation & Circle to Search", "Titanium shield frame with Corning Gorilla Armor glass", "Built-in S Pen stylus", "200MP main sensor + 50MP 5x optical zoom camera", "Snapdragon 8 Gen 3 for Galaxy"],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 760,
    soldCount: 2100,
    warrantyMonths: 12,
    specs: [
      { group: "Processor", label: "CPU", value: "Snapdragon 8 Gen 3 for Galaxy (4nm)" },
      { group: "Display", label: "Screen", value: "6.8-inch QHD+ Dynamic AMOLED 2X, 120Hz, 2600 nits" },
      { group: "Camera", label: "Resolution", value: "200MP Main + 50MP Telephoto + 12MP Ultra Wide" },
      { group: "Battery", label: "Capacity", value: "5000 mAh with 45W fast charging" },
    ],
    variants: [
      { color: "Titanium Gray", colorHex: "#686a6d", stock: 20 },
      { color: "Titanium Black", colorHex: "#242526", stock: 25 },
    ],
    reviews: [
      {
        reviewer: "Rohan Gupta",
        rating: 5,
        title: "Best zoom camera and anti-glare screen on any phone",
        comment: "Gorilla Armor cuts glare dramatically indoors and outdoors. Circle to Search has quickly become second nature.",
        verified: true,
        helpful: 41,
        daysAgo: 22,
      },
    ],
    questions: [],
  },
  {
    name: "Google Pixel 8 Pro",
    category: "Smartphones",
    brand: "Google",
    price: 106999,
    description:
      "Engineered by Google with the Tensor G3 chip and cutting-edge Google AI. Features a pro triple camera system, temperature sensor, and seven years of OS and security updates.",
    highlights: ["Google Tensor G3 processor with Titan M2 security", "Super Actua 6.7-inch OLED display (up to 2400 nits)", "Pro camera controls with Best Take & Magic Editor", "7 years of guaranteed OS & Feature Drop updates"],
    isNew: true,
    rating: 4.7,
    reviewCount: 410,
    soldCount: 1150,
    warrantyMonths: 12,
    specs: [
      { group: "Processor", label: "SoC", value: "Google Tensor G3" },
      { group: "Display", label: "Screen", value: "6.7-inch Super Actua LTPO OLED, 1-120Hz" },
      { group: "Camera", label: "Rear", value: "50MP Octa PD Main + 48MP Quad PD Ultra Wide + 48MP 5x Telephoto" },
    ],
    variants: [
      { color: "Bay Blue", colorHex: "#77a6db", stock: 15 },
      { color: "Obsidian", colorHex: "#1c1c1c", stock: 22 },
    ],
    reviews: [
      {
        reviewer: "Vikram Malhotra",
        rating: 5,
        title: "Still photos have unmatched dynamic range",
        comment: "Skin tones and night photos come out cleaner than any other flagship I've tried. Call screening is also top tier.",
        verified: true,
        helpful: 25,
        daysAgo: 16,
      },
    ],
    questions: [],
  },
  {
    name: "ASUS ROG Zephyrus G16 Gaming Laptop",
    category: "Laptops",
    brand: "ASUS",
    price: 179990,
    compareAt: 199990,
    description:
      "Sleek CNC aluminum chassis packing Intel Core Ultra 9 and NVIDIA GeForce RTX 4070 into a portable 1.85kg body, fronted by a 2.5K 240Hz OLED ROG Nebula display.",
    highlights: ["Intel Core Ultra 9 185H processor", "NVIDIA GeForce RTX 4070 8GB GDDR6 GPU", "16-inch 2.5K 240Hz ROG Nebula OLED display (0.2ms response)", "Premium thin CNC unibody aluminum chassis", "Slash Lighting LED array on lid"],
    isFeatured: true,
    rating: 4.8,
    reviewCount: 290,
    soldCount: 680,
    warrantyMonths: 12,
    specs: [
      { group: "Processor", label: "CPU", value: "Intel Core Ultra 9 185H (16 cores)" },
      { group: "Graphics", label: "GPU", value: "NVIDIA GeForce RTX 4070 Laptop GPU" },
      { group: "Display", label: "Screen", value: "16-inch 2.5K (2560x1600) OLED 240Hz, 500 nits, G-Sync" },
      { group: "Memory & Storage", label: "Specs", value: "32GB LPDDR5X RAM + 1TB PCIe 4.0 NVMe SSD" },
    ],
    variants: [{ color: "Eclipse Gray", colorHex: "#383a3d", stock: 11 }],
    reviews: [
      {
        reviewer: "Arjun Kapoor",
        rating: 5,
        title: "The MacBook of Windows gaming laptops",
        comment: "Build quality is unbelievable. Thin, lightweight, and the 240Hz OLED screen makes every game look vibrant and sharp.",
        verified: true,
        helpful: 36,
        daysAgo: 12,
      },
    ],
    questions: [],
  },
  {
    name: "Dell XPS 15 OLED Touch Laptop",
    category: "Laptops",
    brand: "Dell",
    price: 164990,
    description:
      "Crafted with machined aluminum and carbon fiber palm rest, this Dell XPS 15 features an immersive 3.5K OLED InfinityEdge touch display powered by 13th Gen Intel Core i7.",
    highlights: ["15.6-inch 3.5K (3456x2160) OLED touch display", "13th Gen Intel Core i7-13700H (14 cores)", "NVIDIA GeForce RTX 4050 6GB GDDR6", "Quad-speaker design with Waves Nx 3D audio", "Precision machined CNC aluminum body"],
    isBestseller: true,
    rating: 4.7,
    reviewCount: 340,
    soldCount: 890,
    warrantyMonths: 12,
    specs: [
      { group: "Processor", label: "CPU", value: "Intel Core i7-13700H (14 cores, up to 5.0 GHz)" },
      { group: "Display", label: "Screen", value: "15.6-inch 3.5K OLED 400-nit touchscreen" },
      { group: "Memory", label: "RAM", value: "16GB DDR5 4800MHz" },
      { group: "Storage", label: "SSD", value: "1TB M.2 PCIe NVMe SSD" },
    ],
    variants: [{ color: "Platinum Silver", colorHex: "#d1d5db", stock: 14 }],
    reviews: [
      {
        reviewer: "Divya Shah",
        rating: 5,
        title: "Dream machine for photographers and editors",
        comment: "100% DCI-P3 color coverage on the OLED panel makes photo editing so precise. Keyboard and trackpad are top notch.",
        verified: true,
        helpful: 24,
        daysAgo: 27,
      },
    ],
    questions: [],
  },
]

async function main() {
  console.log("Seeding categories...")
  const categoryIds = new Map<string, string>()

  for (const [parentName, children] of Object.entries(categoryTree)) {
    const parent = await db.category.upsert({
      where: { slug: slugify(parentName) },
      update: {},
      create: { name: parentName, slug: slugify(parentName) },
    })
    categoryIds.set(parentName, parent.id)

    for (const childName of children) {
      const child = await db.category.upsert({
        where: { slug: slugify(childName) },
        update: {},
        create: { name: childName, slug: slugify(childName), parentId: parent.id },
      })
      categoryIds.set(childName, child.id)
    }
  }

  console.log("Seeding brands...")
  const brandIds = new Map<string, string>()
  for (const name of brands) {
    const brand = await db.brand.upsert({
      where: { slug: slugify(name) },
      update: {},
      create: { name, slug: slugify(name) },
    })
    brandIds.set(name, brand.id)
  }

  console.log("Seeding admin user...")
  const adminPasswordHash = await bcrypt.hash("Admin@12345", 10)
  await db.user.upsert({
    where: { email: "admin@fineverse.example" },
    update: {},
    create: {
      name: "Fineverse Admin",
      email: "admin@fineverse.example",
      passwordHash: adminPasswordHash,
      role: "ADMIN",
      emailVerified: new Date(),
    },
  })

  console.log("Seeding sample reviewers...")
  const reviewerIds = new Map<string, string>()
  for (const r of reviewers) {
    const user = await db.user.upsert({
      where: { email: r.email },
      update: {},
      create: { name: r.name, email: r.email, role: "CUSTOMER" },
    })
    reviewerIds.set(r.name, user.id)
  }

  console.log("Seeding products, reviews & questions...")
  for (const p of products) {
    const slug = slugify(p.name)
    const categoryId = categoryIds.get(p.category)
    const brandId = brandIds.get(p.brand)
    if (!categoryId || !brandId) throw new Error(`Missing category/brand for ${p.name}`)

    const product = await db.product.upsert({
      where: { slug },
      update: { categoryId, brandId },
      create: {
        name: p.name,
        slug,
        description: p.description,
        highlights: p.highlights,
        // A short slice can collide for products sharing a name prefix (e.g.
        // two "Fisher-Price ..." or "Apple MacBook ..." items) since the slug
        // itself — already globally unique — is truncated before comparison.
        // A longer slice inherits the slug's uniqueness in practice.
        sku: `FV-${slug.toUpperCase().slice(0, 30)}`,
        basePrice: p.price,
        compareAtPrice: p.compareAt ?? null,
        categoryId,
        brandId,
        material: p.material ?? null,
        warrantyMonths: p.warrantyMonths ?? null,
        minAgeMonths: p.minAgeMonths ?? null,
        maxAgeMonths: p.maxAgeMonths ?? null,
        safetyInfo: p.safetyInfo ?? null,
        isFeatured: p.isFeatured ?? false,
        isBestseller: p.isBestseller ?? false,
        isNew: p.isNew ?? false,
        avgRating: p.rating,
        reviewCount: p.reviewCount,
        soldCount: p.soldCount,
        images: {
          create: [0, 1].map((n) => ({ url: getProductImage(p.name, p.category, n), altText: p.name, position: n })),
        },
        specifications: {
          create: p.specs.map((s, i) => ({ group: s.group, label: s.label, value: s.value, position: i })),
        },
        variants: {
          create: p.variants.map((v, i) => ({
            sku: `FV-${slug.toUpperCase().slice(0, 24)}-${i}`,
            size: v.size ?? null,
            color: v.color ?? null,
            colorHex: v.colorHex ?? null,
            stock: v.stock,
            isDefault: i === 0,
          })),
        },
      },
    })

    // Refresh images to ensure matching curated photography is applied
    await db.productImage.deleteMany({ where: { productId: product.id } })
    await db.productImage.createMany({
      data: [0, 1].map((n) => ({
        productId: product.id,
        url: getProductImage(p.name, p.category, n),
        altText: p.name,
        position: n,
      })),
    })

    for (const r of p.reviews) {
      const userId = reviewerIds.get(r.reviewer)
      if (!userId) throw new Error(`Missing reviewer ${r.reviewer}`)
      await db.review.upsert({
        where: { productId_userId: { productId: product.id, userId } },
        update: {},
        create: {
          productId: product.id,
          userId,
          rating: r.rating,
          title: r.title,
          comment: r.comment,
          isVerifiedPurchase: r.verified ?? false,
          helpfulCount: r.helpful ?? 0,
          createdAt: daysAgo(r.daysAgo),
        },
      })
    }

    for (const q of p.questions) {
      const userId = reviewerIds.get(q.asker)
      if (!userId) throw new Error(`Missing asker ${q.asker}`)
      const existing = await db.productQuestion.findFirst({
        where: { productId: product.id, userId, question: q.question },
      })
      if (!existing) {
        await db.productQuestion.create({
          data: {
            productId: product.id,
            userId,
            question: q.question,
            answer: q.answer ?? null,
            answeredAt: q.answer ? daysAgo(Math.max(0, q.daysAgo - 1)) : null,
            createdAt: daysAgo(q.daysAgo),
          },
        })
      }
    }
  }

  console.log("Seeding coupons...")
  const coupons = [
    {
      code: "WELCOME10",
      description: "10% off your first order",
      type: "PERCENT" as const,
      value: 10,
      minOrderValue: 999,
      maxDiscount: 2000,
    },
    {
      code: "FLAT500",
      description: "Flat ₹500 off orders over ₹2,999",
      type: "FIXED" as const,
      value: 500,
      minOrderValue: 2999,
      maxDiscount: null,
    },
    {
      code: "MEGA20",
      description: "20% off orders over ₹5,000",
      type: "PERCENT" as const,
      value: 20,
      minOrderValue: 5000,
      maxDiscount: 5000,
    },
  ]
  for (const c of coupons) {
    await db.coupon.upsert({
      where: { code: c.code },
      update: {},
      create: {
        code: c.code,
        description: c.description,
        type: c.type,
        value: c.value,
        minOrderValue: c.minOrderValue,
        maxDiscount: c.maxDiscount,
        isActive: true,
      },
    })
  }

  console.log(
    `Seeded ${Object.keys(categoryTree).length} top-level categories, ${brands.length} brands, ${products.length} products, ${reviewers.length} reviewers, ${coupons.length} coupons.`
  )
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(async () => {
    await db.$disconnect()
  })
