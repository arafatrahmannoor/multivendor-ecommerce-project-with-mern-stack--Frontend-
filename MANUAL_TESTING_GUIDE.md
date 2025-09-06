# Manual Testing Guide for E-Commerce System

## 🚀 Quick Start Testing

### Prerequisites:
1. ✅ Backend running on http://localhost:3000
2. ✅ Frontend running on http://localhost:5173
3. ✅ MongoDB connected
4. ✅ Test accounts available

### Test Accounts:
- **Admin**: admin@example.com / Admin123!
- **User**: test@example.com / test123
- **Vendor**: vendor@example.com / vendor123

## 🔵 ADMIN ROLE TESTING

### Step 1: Login as Admin
1. Go to http://localhost:5173
2. Click "Login" 
3. Use: admin@example.com / Admin123!
4. Verify redirect to admin dashboard

### Step 2: Test User Management
1. Navigate to "Users" section
2. ✅ Verify you can see all users in the system
3. ✅ Try editing a user's role (change user to vendor)
4. ✅ Test ban/unban functionality if available

### Step 3: Test Order Management
1. Navigate to "Pending Orders" or "Orders"
2. ✅ Check if pending orders are displayed
3. ✅ Try approving an order (if any exist)
4. ✅ Test rejection workflow with reason

### Step 4: Test Product Oversight
1. Navigate to "Products" section
2. ✅ Verify you can see all products from all vendors
3. ✅ Check if vendor notifications appear when products are created

## 🟡 VENDOR ROLE TESTING

### Step 1: Login as Vendor
1. Logout from admin account
2. Login with: vendor@example.com / vendor123
3. Verify redirect to vendor dashboard

### Step 2: Test Product Management
1. Navigate to "My Products"
2. ✅ Create a new product:
   - Name: "Test Product [timestamp]"
   - Description: "Test description"
   - Price: 99.99
   - Category: Electronics
   - Stock: 10
3. ✅ Verify admin gets notification
4. ✅ Edit the created product
5. ✅ Try to view only YOUR products (not others)

### Step 3: Test Order Management
1. Navigate to "Assigned Orders"
2. ✅ Check for orders assigned to you
3. ✅ If orders exist, try confirming one
4. ✅ Test rejection with reason

### Step 4: Test Access Control
1. ✅ Try accessing admin pages (should be blocked)
2. ✅ Try editing another vendor's products (should fail)

## 🟢 USER ROLE TESTING

### Step 1: Login as User
1. Logout from vendor account
2. Login with: test@example.com / test123
3. Verify redirect to homepage/dashboard

### Step 2: Test Product Browsing
1. ✅ Browse homepage for products
2. ✅ View product details
3. ✅ Check if vendor products are visible
4. ✅ Test search/filter functionality

### Step 3: Test Shopping Cart
1. ✅ Add products to cart
2. ✅ Modify quantities
3. ✅ Remove items
4. ✅ View cart summary

### Step 4: Test Order Placement
1. ✅ Proceed to checkout with cart items
2. ✅ Fill in delivery details
3. ✅ Place order
4. ✅ Verify order appears in "My Orders"

### Step 5: Test Order Tracking
1. Navigate to "My Orders"
2. ✅ View order status
3. ✅ Check workflow progress display
4. ✅ Verify status updates as workflow progresses

## 🔄 END-TO-END WORKFLOW TESTING

### Complete Order Workflow Test:
1. **User Action**: Login as user, add products to cart, place order
2. **Admin Action**: Login as admin, go to pending orders, approve the order
3. **Vendor Action**: Login as vendor, check assigned orders, confirm the order
4. **User Verification**: Login as user, check order status progression
5. **Payment Test**: If payment button appears, test payment flow

### Expected Status Progression:
1. `pending_admin_approval` → 2. `admin_approved` → 3. `vendor_assigned` → 4. `vendor_confirmed` → 5. `payment_pending` → 6. `paid`

## 🔍 VERIFICATION CHECKLIST

### ✅ Role-Based Access Control:
- [ ] Admin can access all admin pages
- [ ] Vendor can only access vendor pages
- [ ] User can only access user pages
- [ ] Cross-role access is properly blocked

### ✅ Data Isolation:
- [ ] Vendors see only their products in "My Products"
- [ ] Users see only their orders in "My Orders"
- [ ] Admin sees everything as expected

### ✅ Notification System:
- [ ] Admin gets notified when vendors create products
- [ ] Users get order status updates
- [ ] Vendors get assignment notifications

### ✅ Business Logic:
- [ ] Order workflow follows correct sequence
- [ ] Status updates happen automatically
- [ ] Payment integration works
- [ ] Stock management functions

## 🛠️ TROUBLESHOOTING

### If Frontend Doesn't Load:
1. Check if `npm run dev` is running in frontend folder
2. Verify http://localhost:5173 is accessible

### If API Calls Fail:
1. Check if backend is running on port 3000
2. Check browser console for CORS errors
3. Verify MongoDB connection

### If Login Fails:
1. Verify test accounts exist in database
2. Check password requirements
3. Look for authentication errors in browser console

### If Orders Don't Process:
1. Check if all required order steps are implemented
2. Verify vendor assignment logic
3. Check payment gateway configuration

## 📊 SUCCESS CRITERIA

### System is Working Correctly If:
- ✅ All three roles can login successfully
- ✅ Each role sees appropriate dashboard/navigation
- ✅ Admin can manage users and approve orders
- ✅ Vendors can CRUD products and manage assigned orders
- ✅ Users can shop, checkout, and track orders
- ✅ Order workflow progresses through all stages
- ✅ Notifications work across all roles
- ✅ Access control prevents unauthorized actions

## 📱 Browser Console Testing

You can also test API calls directly in the browser console:

```javascript
// Test login
fetch('http://localhost:3000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'admin@example.com', password: 'Admin123!' })
}).then(r => r.json()).then(console.log);

// Test getting products
fetch('http://localhost:3000/api/products')
  .then(r => r.json())
  .then(data => console.log('Products:', data.length || data));
```

This comprehensive testing approach will verify all functionality is working correctly!
