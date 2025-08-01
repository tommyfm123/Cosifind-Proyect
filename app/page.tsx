"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HomeScreen from "@/app/Home/page"
import MapScreen from "@/app/map/page"
import MessagesScreen from "@/app/messages/page"
import ProfileScreen from "@/app/profile/page"
import FavoritesScreen from "@/app/favorites/page"
import LoginScreen from "@/app/Login/page"
import BottomNavigationBar from "@/components/navigation/BottomNavigationBar"

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home")
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginSuccess = () => {
    setIsLoggedIn(true)
    setActiveScreen("home")
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setActiveScreen("home")
  }

  const handleNavigateHome = () => {
    setActiveScreen("home")
    setSelectedCategory(undefined)
    setSearchQuery("")
  }

  const handleNavigateToMap = (category?: string) => {
    setSelectedCategory(category)
    setActiveScreen("map")
  }

  const handleShowAllProducts = () => {
    setSelectedCategory(undefined)
    setActiveScreen("map")
  }

  const handleScreenChange = (screen: string) => {
    if (!isLoggedIn && (screen === "favorites" || screen === "messages" || screen === "profile")) {
      setActiveScreen("login")
    } else {
      setActiveScreen(screen)
    }
  }

  const getHeaderVariant = () => {
    if (!isLoggedIn) return "logo-only"
    if (activeScreen === "home" || activeScreen === "map") return "search"
    return "logo-only"
  }

  const showHeaderBackButton = activeScreen === "map"

  const renderScreenContent = () => {
    if (activeScreen === "login") {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onNavigateHome={handleNavigateHome} />
    }
    switch (activeScreen) {
      case "home":
        return (
          <HomeScreen
            onNavigateToMap={handleNavigateToMap}
            onShowAllProducts={handleShowAllProducts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isLoggedIn={isLoggedIn}
          />
        )
      case "map":
        return (
          <MapScreen
            onNavigateHome={handleNavigateHome}
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )
      case "messages":
        return <MessagesScreen />
      case "profile":
        return <ProfileScreen onLogout={handleLogout} />
      case "favorites":
        return <FavoritesScreen />
      default:
        return (
          <HomeScreen
            onNavigateToMap={handleNavigateToMap}
            onShowAllProducts={handleShowAllProducts}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            isLoggedIn={isLoggedIn}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="flex-1 pb-16"
        >
          {renderScreenContent()}
        </motion.div>
      </AnimatePresence>
      <BottomNavigationBar
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
      />
    </div>
  )
}