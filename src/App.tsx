import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { ProjectPage } from './pages/ProjectPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  return <SiteProvider><BrowserRouter><SiteHeader /><Routes><Route path="/" element={<HomePage />} /><Route path="/projects/madastore" element={<ProjectPage />} /><Route path="/admin" element={<AdminPage />} /><Route path="*" element={<HomePage />} /></Routes><SiteFooter /></BrowserRouter></SiteProvider>;
}
