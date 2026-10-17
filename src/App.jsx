import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import MobileDrawer from './components/MobileDrawer';
import Footer from './components/Footer';
import PropertyModal from './components/PropertyModal';
import FloatingActions from './components/FloatingActions';
import FavoritesDrawer from './components/FavoritesDrawer';
import CompareDock from './components/CompareDock';
import CompareModal from './components/CompareModal';

// Page Views for Each Navbar Item
import HomePage from './pages/HomePage';
import ResidentialPage from './pages/ResidentialPage';
import OffPlanPage from './pages/OffPlanPage';
import CommunitiesPage from './pages/CommunitiesPage';
import MortgageCalcPage from './pages/MortgageCalcPage';
import AboutPage from './pages/AboutPage';
import AdvisorsPage from './pages/AdvisorsPage';
import ContactPage from './pages/ContactPage';
import { NOVA_DATA } from './data/propertiesData';

export default function App() {
  const [currency, setCurrency] = useState('AED');
  const [unit, setUnit] = useState('sqft');
  const [activeTab, setActiveTab] = useState('buy');
  const [searchParams, setSearchParams] = useState({
    community: '',
    type: '',
    beds: '',
    budget: ''
  });
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Favorites / Shortlist State (Persisted in localStorage)
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('nova_favorites');
      return saved ? JSON.parse(saved) : ['NP-1001', 'NP-1002'];
    } catch {
      return ['NP-1001', 'NP-1002'];
    }
  });

  // Comparison State
  const [comparedIds, setComparedIds] = useState(['NP-1001', 'NP-1003']);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nova_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.warn('Could not persist favorites to localStorage', err);
    }
  }, [favorites]);

  const handleShowNotice = (noticeText) => {
    setToastMessage(noticeText);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleToggleFavorite = (propId) => {
    const prop = NOVA_DATA.properties.find(p => p.id === propId);
    const title = prop ? prop.title : propId;

    setFavorites((prev) => {
      if (prev.includes(propId)) {
        handleShowNotice(`Removed "${title}" from private shortlist`);
        return prev.filter(id => id !== propId);
      } else {
        handleShowNotice(`Added "${title}" to private shortlist`);
        return [...prev, propId];
      }
    });
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    handleShowNotice('All residences cleared from shortlist');
  };

  const handleToggleCompare = (propId) => {
    const prop = NOVA_DATA.properties.find(p => p.id === propId);
    const title = prop ? prop.title : propId;

    setComparedIds((prev) => {
      if (prev.includes(propId)) {
        handleShowNotice(`Removed "${title}" from comparison tray`);
        return prev.filter(id => id !== propId);
      } else {
        if (prev.length >= 4) {
          handleShowNotice('Maximum 4 residences can be compared simultaneously');
          return prev;
        }
        handleShowNotice(`Added "${title}" to comparison tray`);
        return [...prev, propId];
      }
    });
  };

  const handleRemoveCompare = (propId) => {
    setComparedIds(prev => prev.filter(id => id !== propId));
  };

  const handleClearCompare = () => {
    setComparedIds([]);
    handleShowNotice('Comparison tray reset');
  };

  const handleSearchSubmit = (params) => {
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setSearchParams({
      community: '',
      type: '',
      beds: '',
      budget: ''
    });
  };

  const handleSelectCommunity = (communityName) => {
    setSearchParams(prev => ({ ...prev, community: communityName }));
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="nova-luxury-app">
        {/* Sticky Glassmorphism Header with Route Navigation, Currency & Unit Tools */}
        <Header
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          comparedCount={comparedIds.length}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          currency={currency}
          onCurrencyChange={setCurrency}
          unit={unit}
          onUnitChange={setUnit}
        />

        {/* 3. Mobile Navigation Drawer */}
        <MobileDrawer
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          favoritesCount={favorites.length}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          comparedCount={comparedIds.length}
          onOpenCompare={() => setIsCompareModalOpen(true)}
        />

        {/* 4. Main Multi-Page Routed Views */}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  currency={currency}
                  unit={unit}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  searchParams={searchParams}
                  onSearchSubmit={handleSearchSubmit}
                  onResetFilters={handleResetFilters}
                  onOpenModal={setSelectedProperty}
                  onShowNotice={handleShowNotice}
                  onSelectCommunity={handleSelectCommunity}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  comparedIds={comparedIds}
                  onToggleCompare={handleToggleCompare}
                />
              }
            />

            <Route
              path="/residential"
              element={
                <ResidentialPage
                  currency={currency}
                  unit={unit}
                  onOpenModal={setSelectedProperty}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  comparedIds={comparedIds}
                  onToggleCompare={handleToggleCompare}
                />
              }
            />

            <Route
              path="/off-plan"
              element={
                <OffPlanPage
                  currency={currency}
                  onShowNotice={handleShowNotice}
                />
              }
            />

            <Route
              path="/communities"
              element={
                <CommunitiesPage
                  onSelectCommunity={handleSelectCommunity}
                />
              }
            />

            <Route
              path="/mortgage-calculator"
              element={
                <MortgageCalcPage
                  currency={currency}
                />
              }
            />

            <Route
              path="/about"
              element={
                <AboutPage />
              }
            />

            <Route
              path="/advisors"
              element={
                <AdvisorsPage />
              }
            />

            <Route
              path="/contact"
              element={
                <ContactPage />
              }
            />

            {/* Catch-all redirect to Home */}
            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </main>

        {/* 5. Luxury Architectural Footer */}
        <Footer />

        {/* 6. Modal for In-Depth Property View */}
        {selectedProperty && (
          <PropertyModal
            property={selectedProperty}
            currency={currency}
            unit={unit}
            onClose={() => setSelectedProperty(null)}
            onShowNotice={handleShowNotice}
            isFavorite={favorites.includes(selectedProperty.id)}
            onToggleFavorite={handleToggleFavorite}
            isCompared={comparedIds.includes(selectedProperty.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {/* 7. Shortlist / Favorites Drawer Panel */}
        <FavoritesDrawer
          isOpen={isFavoritesOpen}
          onClose={() => setIsFavoritesOpen(false)}
          favorites={favorites}
          onRemoveFavorite={handleToggleFavorite}
          onClearFavorites={handleClearFavorites}
          onSelectProperty={setSelectedProperty}
          currency={currency}
        />

        {/* 8. Floating Comparison Dock */}
        <CompareDock
          comparedIds={comparedIds}
          onRemoveCompare={handleRemoveCompare}
          onClearCompare={handleClearCompare}
          onOpenModal={() => setIsCompareModalOpen(true)}
        />

        {/* 9. Full Side-by-Side Comparison Modal */}
        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
          comparedIds={comparedIds}
          onRemoveCompare={handleRemoveCompare}
          onSelectProperty={setSelectedProperty}
          currency={currency}
          unit={unit}
        />

        {/* 10. Floating WhatsApp Widget, Scroll-to-Top & Toast Alerts */}
        <FloatingActions
          toastMessage={toastMessage}
          onCloseToast={() => setToastMessage(null)}
        />
      </div>
    </Router>
  );
}
