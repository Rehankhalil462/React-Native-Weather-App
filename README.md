# Weather Forecast App

A beautiful, premium weather forecast application built with React Native and Expo. Get real-time weather information, forecasts, and detailed weather data for any location worldwide.

![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)
![Expo](https://img.shields.io/badge/Expo-54.0.22-black.svg)
![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB.svg)

## ✨ Features

### 🌤️ Weather Information
- **Current Weather**: Real-time temperature, conditions, and feels-like temperature
- **Hourly Forecast**: 24-hour weather forecast with detailed hourly data
- **Daily Forecast**: 7-day weather forecast with high/low temperatures
- **Weather Details**: Comprehensive weather information including:
  - Humidity
  - Wind speed and direction
  - Precipitation
  - UV Index
  - Visibility
  - Pressure
- **Air Quality Index**: Real-time air quality data

### 🔍 Search & Location Features
- **Autocomplete Search**: Real-time location suggestions as you type
- **Search History**: Quick access to recently searched locations (last 10)
- **Saved Locations**: Save favorite locations for quick access
- **Location Management**: Add, view, and delete saved locations

### 🎨 Premium UI/UX
- **Modern Design**: Beautiful glassmorphism effects and gradient backgrounds
- **Dark Theme**: Elegant dark theme with premium styling
- **Smooth Animations**: Fluid transitions and animations throughout
- **Responsive Layout**: Optimized for all screen sizes
- **Platform-Specific Styling**: Tailored experience for iOS and Android

### 📱 User Experience
- **Pull to Refresh**: Refresh weather data with a simple pull gesture
- **Fixed Search Bar**: Search bar stays accessible while scrolling
- **Back Button Navigation**: Smart back button handling
- **Persistent Storage**: Weather history and preferences saved locally
- **Offline Support**: Last viewed weather data available offline

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React-Native-Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` and add your WeatherAPI.com API key:
   ```env
   EXPO_PUBLIC_WEATHER_API_KEY=your_api_key_here
   ```

4. **Start the Expo development server**
   ```bash
   npm start
   # or
   expo start
   ```

5. **Run on your device**
   - Scan the QR code with Expo Go app (iOS/Android)
   - Or press `i` for iOS simulator / `a` for Android emulator

## 📦 Technologies Used

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (54.0.22) - Development platform and tooling
- **React** (19.1.0) - UI library
- **React Native Paper** - Material Design components
- **Expo Linear Gradient** - Beautiful gradient effects
- **AsyncStorage** - Local data persistence
- **React Native Safe Area Context** - Safe area handling
- **WeatherAPI.com** - Weather data provider

## 🏗️ Project Structure

```
React-Native-Weather-App/
├── App.js                          # Main application component
├── app.json                        # Expo configuration
├── package.json                    # Dependencies and scripts
├── assets/                         # Images and static assets
│   └── Weathers/                   # Weather condition images
├── src/
│   └── components/                 # React components
│       ├── AirQuality.component.js
│       ├── Autocomplete.component.js
│       ├── DailyData.component.js
│       ├── DailyDataDetails.component.js
│       ├── FullHomeScreenBeforeWeather.js
│       ├── HourlyData.component.js
│       ├── LastUpdated.component.js
│       ├── PrecipitationandUV.component.js
│       ├── SavedLocations.component.js
│       ├── SearchHistory.component.js
│       └── TemparatureDetail.component.js
└── utilities/                      # Utility functions
    ├── timeConvert.js
    └── weatherConditions.js
```

## 🔑 API Configuration

This app uses [WeatherAPI.com](https://www.weatherapi.com/) for weather data.

### Setting Up Environment Variables

1. **Get your API key**
   - Sign up at [WeatherAPI.com](https://www.weatherapi.com/)
   - Get your free API key from the dashboard

2. **Create environment file**
   ```bash
   cp .env.example .env
   ```

3. **Add your API key**
   - Open `.env` file
   - Replace `your_api_key_here` with your actual API key:
   ```env
   EXPO_PUBLIC_WEATHER_API_KEY=your_actual_api_key_here
   ```

4. **Restart the development server**
   ```bash
   npm start
   ```

**Note**: The `.env` file is already in `.gitignore` to keep your API key secure. Never commit your `.env` file to version control.

### API Endpoints Used
- **Forecast API**: `/v1/forecast.json` - Current weather and forecasts
- **Search/Autocomplete API**: `/v1/search.json` - Location search suggestions

## 📱 Usage

### Searching for Weather
1. Tap the search bar at the top
2. Start typing a location name
3. Select from autocomplete suggestions or search history
4. View detailed weather information

### Saving Locations
1. Search for a location and view its weather
2. Tap the bookmark icon (📚) next to the search bar
3. Tap the "+" button to save the current location
4. Access saved locations anytime from the bookmark menu

### Viewing Search History
1. Tap the history icon (🕐) next to the search bar
2. View your recent searches
3. Tap any location to view its weather
4. Delete individual items or clear all history

### Refreshing Weather Data
- Pull down on the weather details screen to refresh
- Or tap the refresh button in the "Last Updated" section




### Environment Variables
The app uses environment variables for API keys. See the [API Configuration](#-api-configuration) section for setup instructions.

**Files using environment variables:**
- `App.js` - Forecast API
- `src/components/Autocomplete.component.js` - Search API

Both files use `process.env.EXPO_PUBLIC_WEATHER_API_KEY` to read the API key from your `.env` file.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [WeatherAPI.com](https://www.weatherapi.com/) for providing weather data
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native Paper](https://callstack.github.io/react-native-paper/) for UI components

## 📝 Version History

- **v0.0.2** - Current version
  - Added search history feature
  - Added autocomplete search
  - Added saved locations management
  - Premium UI redesign
  - Fixed search bar positioning
  - Full page scroll with fixed search bar

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with ❤️ using React Native and Expo

