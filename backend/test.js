// test.js - Quick test to verify API endpoints work
const API_URL = "http://localhost:3000";

async function runTests() {
  console.log("🧪 Starting API tests...\n");

  try {
    // Test 1: Health Check
    console.log("1️⃣  Testing health endpoint...");
    let res = await fetch(`${API_URL}/health`);
    let data = await res.json();
    console.log("✅ Health:", data);
    console.log("");

    // Test 2: Add item to buy
    console.log("2️⃣  Adding item to buy (Laptop)...");
    res = await fetch(`${API_URL}/api/tobuy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Laptop", price: 1299.99 }),
    });
    data = await res.json();
    console.log("✅ Added:", data.data);
    const laptopId = data.data._id;
    console.log("");

    // Test 3: Add another item
    console.log("3️⃣  Adding item to buy (Mouse)...");
    res = await fetch(`${API_URL}/api/tobuy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Mouse", price: 29.99 }),
    });
    data = await res.json();
    console.log("✅ Added:", data.data);
    console.log("");

    // Test 4: Get all items to buy
    console.log("4️⃣  Getting all items to buy...");
    res = await fetch(`${API_URL}/api/tobuy`);
    data = await res.json();
    console.log(`✅ Found ${data.count} items:`, data.data);
    console.log("");

    // Test 5: Add bought item (by Alaa)
    console.log("5️⃣  Adding bought item (Coffee by Alaa)...");
    res = await fetch(`${API_URL}/api/bought`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Coffee", price: 5.99, boughtBy: "alaa" }),
    });
    data = await res.json();
    console.log("✅ Added:", data.data);
    console.log("");

    // Test 6: Add bought item (by Mohamed)
    console.log("6️⃣  Adding bought item (Tea by Mohamed)...");
    res = await fetch(`${API_URL}/api/bought`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Tea", price: 3.99, boughtBy: "mohamed" }),
    });
    data = await res.json();
    console.log("✅ Added:", data.data);
    console.log("");

    // Test 7: Get items bought by Alaa
    console.log("7️⃣  Getting items bought by Alaa...");
    res = await fetch(`${API_URL}/api/bought/by/alaa`);
    data = await res.json();
    console.log(`✅ Found ${data.count} items:`, data.data);
    console.log("");

    // Test 8: Get items bought by Mohamed
    console.log("8️⃣  Getting items bought by Mohamed...");
    res = await fetch(`${API_URL}/api/bought/by/mohamed`);
    data = await res.json();
    console.log(`✅ Found ${data.count} items:`, data.data);
    console.log("");

    // Test 9: Get single item
    console.log("9️⃣  Getting single item (Laptop)...");
    res = await fetch(`${API_URL}/api/tobuy/${laptopId}`);
    data = await res.json();
    console.log("✅ Item:", data.data);
    console.log("");

    // Test 10: Update item
    console.log("🔟 Updating item (Laptop price to 999)...");
    res = await fetch(`${API_URL}/api/tobuy/${laptopId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: 999.99 }),
    });
    data = await res.json();
    console.log("✅ Updated:", data.data);
    console.log("");

    console.log("✨ All tests passed! ✨");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

runTests();
