import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';

export default function App() {
  return <SiteProvider><BrowserRouter><SiteHeader /><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/madastore" element={<ProjectPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes><SiteFooter /></BrowserRouter></SiteProvider>;
}
