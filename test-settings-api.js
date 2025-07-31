const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/admin';

// Test data
const testSettings = {
  allowCompanyChange: true,
  themeColor: "#FF5733",
  companyLogo: null
};

const testSettingsWithLogo = {
  allowCompanyChange: false,
  themeColor: "#094BAC",
  companyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
};

async function testSettingsAPI() {
  try {
    console.log('🧪 Testing Settings API...\n');

    // Test 1: Get current settings
    console.log('1. Testing GET /api/admin/settings');
    const getResponse = await axios.get(`${BASE_URL}/settings`);
    console.log('✅ GET Response:', getResponse.data);
    console.log('');

    // Test 2: Update settings
    console.log('2. Testing PUT /api/admin/settings');
    const updateResponse = await axios.put(`${BASE_URL}/settings`, testSettings);
    console.log('✅ PUT Response:', updateResponse.data);
    console.log('');

    // Test 3: Update settings with logo
    console.log('3. Testing PUT /api/admin/settings with logo');
    const updateWithLogoResponse = await axios.put(`${BASE_URL}/settings`, testSettingsWithLogo);
    console.log('✅ PUT with Logo Response:', updateWithLogoResponse.data);
    console.log('');

    // Test 4: Verify settings were updated
    console.log('4. Verifying updated settings');
    const verifyResponse = await axios.get(`${BASE_URL}/settings`);
    console.log('✅ Verification Response:', verifyResponse.data);
    console.log('');

    console.log('🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run the tests
testSettingsAPI(); 