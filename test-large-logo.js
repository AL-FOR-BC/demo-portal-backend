const axios = require('axios');
const fs = require('fs');

const BASE_URL = 'http://localhost:3000/api/admin';

// Function to create a large base64 test image
function createLargeBase64Image() {
  // Create a simple but large base64 image (simulating a real image)
  const width = 800;
  const height = 600;
  const canvas = require('canvas');
  const c = canvas.createCanvas(width, height);
  const ctx = c.getContext('2d');

  // Fill with a gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#ff0000');
  gradient.addColorStop(0.5, '#00ff00');
  gradient.addColorStop(1, '#0000ff');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add some text
  ctx.fillStyle = '#ffffff';
  ctx.font = '48px Arial';
  ctx.fillText('Test Logo', 50, 100);
  ctx.fillText('Large Image', 50, 200);
  ctx.fillText('No Truncation', 50, 300);

  // Convert to base64
  const buffer = c.toBuffer('image/png');
  const base64 = buffer.toString('base64');
  const dataUrl = `data:image/png;base64,${base64}`;

  console.log(`📊 Generated test image: ${dataUrl.length} characters`);
  return dataUrl;
}

async function testLargeLogoUpload() {
  try {
    console.log('🧪 Testing Large Logo Upload...\n');

    // Generate a large base64 image
    const largeLogo = createLargeBase64Image();
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
      } else {
        console.log('❌ FAILURE: Logo data was truncated!');
        console.log(`Expected: ${largeLogo.length} characters`);
        console.log(`Actual: ${getResponse.data.companyLogo.length} characters`);
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