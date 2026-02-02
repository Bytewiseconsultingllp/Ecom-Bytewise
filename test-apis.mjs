const API_BASE = 'http://localhost:3000/api/v1';

async function testAPIs() {
  console.log('🧪 Testing BYTEWISE E-Commerce APIs with MongoDB');
  console.log('================================================\n');

  try {
    // Test 1: User Login
    console.log('📝 Test 1: User Login');
    const userLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'user@bytewise.com', password: 'user123' })
    });
    const userLogin = await userLoginRes.json();
    console.log(JSON.stringify(userLogin, null, 2));
    const userToken = userLogin.token;
    console.log(`✅ User Token: ${userToken?.substring(0, 20)}...\n`);

    // Test 2: Admin Login
    console.log('📝 Test 2: Admin Login');
    const adminLoginRes = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@bytewise.com', password: 'admin123' })
    });
    const adminLogin = await adminLoginRes.json();
    console.log(JSON.stringify(adminLogin, null, 2));
    const adminToken = adminLogin.token;
    console.log(`✅ Admin Token: ${adminToken?.substring(0, 20)}...\n`);

    // Test 3: Get User Profile
    console.log('📝 Test 3: Get User Profile');
    const profileRes = await fetch(`${API_BASE}/user/profile`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const profile = await profileRes.json();
    console.log(JSON.stringify(profile, null, 2) + '\n');

    // Test 4: Update User Profile
    console.log('📝 Test 4: Update User Profile');
    const updateRes = await fetch(`${API_BASE}/user/profile`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'Updated Test User', phone: '+919999999999' })
    });
    const updated = await updateRes.json();
    console.log(JSON.stringify(updated, null, 2) + '\n');

    // Test 5: Get Products
    console.log('📝 Test 5: Get Products (first 2)');
    const productsRes = await fetch(`${API_BASE}/products?limit=2`);
    const products = await productsRes.json();
    console.log(JSON.stringify(products, null, 2) + '\n');

    // Test 6: Admin Dashboard
    console.log('📝 Test 6: Admin Dashboard');
    const dashboardRes = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const dashboard = await dashboardRes.json();
    console.log(JSON.stringify(dashboard, null, 2) + '\n');

    // Test 7: Admin Get Users
    console.log('📝 Test 7: Admin Get All Users');
    const usersRes = await fetch(`${API_BASE}/admin/users?limit=5`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const users = await usersRes.json();
    console.log(JSON.stringify(users, null, 2) + '\n');

    // Test 8: User trying admin endpoint (should fail)
    console.log('📝 Test 8: User accessing admin endpoint (should fail)');
    const failRes = await fetch(`${API_BASE}/admin/dashboard`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const fail = await failRes.json();
    console.log(JSON.stringify(fail, null, 2) + '\n');

    // Test 9: Register new user
    console.log('📝 Test 9: Register New User');
    const regRes = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'New Customer',
        email: `customer${Date.now()}@test.com`,
        phone: '+918888888888',
        password: 'test123'
      })
    });
    const registered = await regRes.json();
    console.log(JSON.stringify(registered, null, 2) + '\n');

    console.log('✅ All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testAPIs();
