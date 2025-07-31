# Settings API Documentation

## Overview
The Settings API provides endpoints to manage application settings including company change permissions, theme colors, and company logos.

## Endpoints

### GET /api/admin/settings
Fetches the current application settings.

**Response:**
```json
{
  "id": "1",
  "allowCompanyChange": false,
  "themeColor": "#094BAC",
  "companyLogo": null
}
```

### PUT /api/admin/settings
Updates the application settings.

**Request Body:**
```json
{
  "allowCompanyChange": boolean,     // true/false
  "themeColor": string,              // Hex color code (e.g., "#094BAC")
  "companyLogo": string | null       // Base64 encoded image or null
}
```

**Response:**
```json
{
  "id": "1",
  "allowCompanyChange": true,
  "themeColor": "#FF5733",
  "companyLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
}
```

## Company Logo Requirements

### Format
- **Type:** String | null
- **Format:** Base64 encoded image data URL
- **Example:** `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==`

### Size Limit
- **Maximum:** 5MB (enforced by backend)

### Accepted Formats
- PNG
- JPG/JPEG
- SVG

### Null Value
- When no logo is uploaded, send `null`

## Validation Rules

### Theme Color
- Must be a valid hex color code
- Format: `#RRGGBB` (e.g., "#094BAC")
- Case insensitive

### Company Logo
- Must be a valid base64 data URL starting with `data:image/`
- File size must be less than 5MB
- Must be PNG, JPG, JPEG, or SVG format
- Can be `null` if no logo is provided

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid theme color format. Use hex color (e.g., #094BAC)"
}
```

```json
{
  "error": "Company logo must be a valid base64 data URL"
}
```

```json
{
  "error": "Company logo size must be less than 5MB"
}
```

```json
{
  "error": "Company logo must be PNG, JPG, or SVG format"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch settings"
}
```

```json
{
  "error": "Failed to update settings"
}
```

## Testing

Run the test script to verify the API endpoints:

```bash
node test-settings-api.js
```

Make sure your server is running on `http://localhost:3000` before running the tests.

## Frontend Integration

### Example Usage with Fetch API

```javascript
// Get settings
const getSettings = async () => {
  const response = await fetch('/api/admin/settings');
  const settings = await response.json();
  return settings;
};

// Update settings
const updateSettings = async (settingsData) => {
  const response = await fetch('/api/admin/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settingsData),
  });
  const updatedSettings = await response.json();
  return updatedSettings;
};

// Example usage
const settings = {
  allowCompanyChange: true,
  themeColor: "#FF5733",
  companyLogo: null
};

updateSettings(settings)
  .then(result => console.log('Settings updated:', result))
  .catch(error => console.error('Error:', error));
``` 