const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/admin';

// Function to create a large base64 test string (simulating a large image)
function createLargeBase64String() {
  // Create a large base64 string (simulating a 10,000+ character image)
  const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let largeBase64 = '';
  
  // Generate a 15,000 character base64 string
  for (let i = 0; i < 15000; i++) {
    largeBase64 += base64Chars.charAt(Math.floor(Math.random() * base64Chars.length));
  }
  
  const dataUrl = `data:image/png;base64,${largeBase64}`;
  console.log(`📊 Generated test string: ${dataUrl.length} characters`);
  return dataUrl;
}

async function testLargeLogoUpload() {
  try {
    console.log('🧪 Testing Large Logo Upload (Simple Test)...\n');

    // Generate a large base64 string
    const largeLogo = createLargeBase64String();
    console.log(`📊 Test logo size: ${largeLogo.length} characters`);

    // Test data with large logo
    const testSettings = {
      allowCompanyChange: true,
      themeColor: "#FF5733",
      companyLogo: largeLogo
    };

    // Test 1: Upload large logo
    console.log('1. Testing PUT /api/admin/settings with large logo');
    const uploadResponse = await axios.put(`${BASE_URL}/settings`, testSettings);
    console.log('✅ Upload Response Status:', uploadResponse.status);
    
    if (uploadResponse.data.companyLogo) {
      console.log(`✅ Uploaded logo length: ${uploadResponse.data.companyLogo.length} characters`);
      console.log(`✅ Uploaded logo preview: ${uploadResponse.data.companyLogo.substring(0, 100)}...`);
    }

    // Test 2: Retrieve and verify no truncation
    console.log('\n2. Testing GET /api/admin/settings to verify no truncation');
    const getResponse = await axios.get(`${BASE_URL}/settings`);
    console.log('✅ GET Response Status:', getResponse.status);
    
    if (getResponse.data.companyLogo) {
      console.log(`✅ Retrieved logo length: ${getResponse.data.companyLogo.length} characters`);
      console.log(`✅ Retrieved logo preview: ${getResponse.data.companyLogo.substring(0, 100)}...`);
      
      // Check if data was truncated
      if (getResponse.data.companyLogo.length === largeLogo.length) {
        console.log('✅ SUCCESS: No truncation detected!');
        console.log(`✅ Full data preserved: ${largeLogo.length} characters`);
      } else {
        console.log('❌ FAILURE: Logo data was truncated!');
        console.log(`Expected: ${largeLogo.length} characters`);
        console.log(`Actual: ${getResponse.data.companyLogo.length} characters`);
        console.log(`Truncated by: ${largeLogo.length - getResponse.data.companyLogo.length} characters`);
      }
    }

    console.log('\n🎉 Large logo test completed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    if (error.response?.data?.error) {
      console.error('Error details:', error.response.data.error);
    }
  }
}

// Run the test
testLargeLogoUpload(); 