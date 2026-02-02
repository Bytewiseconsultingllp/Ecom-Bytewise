#!/bin/bash

echo "🧪 Testing BYTEWISE E-Commerce APIs with MongoDB"
echo "================================================"
echo ""

BASE_URL="http://localhost:3000/api/v1"

# Test 1: User Login
echo "📝 Test 1: User Login"
echo "POST $BASE_URL/auth/login"
USER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@bytewise.com","password":"user123"}')
echo "$USER_RESPONSE" | python3 -m json.tool
USER_TOKEN=$(echo "$USER_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))")
echo "User Token: ${USER_TOKEN:0:20}..."
echo ""

# Test 2: Admin Login
echo "📝 Test 2: Admin Login"
echo "POST $BASE_URL/auth/login"
ADMIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bytewise.com","password":"admin123"}')
echo "$ADMIN_RESPONSE" | python3 -m json.tool
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('token', ''))")
echo "Admin Token: ${ADMIN_TOKEN:0:20}..."
echo ""

# Test 3: Get User Profile
echo "📝 Test 3: Get User Profile"
echo "GET $BASE_URL/user/profile"
curl -s -X GET "$BASE_URL/user/profile" \
  -H "Authorization: Bearer $USER_TOKEN" | python3 -m json.tool
echo ""

# Test 4: Update User Profile
echo "📝 Test 4: Update User Profile"
echo "PUT $BASE_URL/user/profile"
curl -s -X PUT "$BASE_URL/user/profile" \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Test User","phone":"+919999999999"}' | python3 -m json.tool
echo ""

# Test 5: Get Products (Public API)
echo "📝 Test 5: Get Products"
echo "GET $BASE_URL/products"
curl -s -X GET "$BASE_URL/products?limit=3" | python3 -m json.tool | head -50
echo "..."
echo ""

# Test 6: Admin Dashboard
echo "📝 Test 6: Admin Dashboard Stats"
echo "GET $BASE_URL/admin/dashboard"
curl -s -X GET "$BASE_URL/admin/dashboard" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | python3 -m json.tool
echo ""

# Test 7: Admin Get All Users
echo "📝 Test 7: Admin Get All Users"
echo "GET $BASE_URL/admin/users"
curl -s -X GET "$BASE_URL/admin/users?limit=5" \
  -H "Authorization: Bearer $ADMIN_TOKEN" | python3 -m json.tool
echo ""

# Test 8: User trying to access admin endpoint (should fail)
echo "📝 Test 8: User trying to access admin endpoint (should fail)"
echo "GET $BASE_URL/admin/dashboard"
curl -s -X GET "$BASE_URL/admin/dashboard" \
  -H "Authorization: Bearer $USER_TOKEN" | python3 -m json.tool
echo ""

# Test 9: Register new user
echo "📝 Test 9: Register New User"
echo "POST $BASE_URL/auth/register"
curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"name":"New Customer","email":"customer@test.com","phone":"+918888888888","password":"test123"}' | python3 -m json.tool
echo ""

echo "✅ All tests completed!"
