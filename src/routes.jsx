import Layout from './ui/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import RoofTypes from './pages/RoofTypes'
import RoofTypeDetail from './pages/RoofTypeDetail'
import Locations from './pages/Locations'
import LocationDetail from './pages/LocationDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Reviews from './pages/Reviews'
import ProcessPage from './pages/ProcessPage'
import Financing from './pages/Financing'
import FaqPage from './pages/FaqPage'
import GalleryPage from './pages/GalleryPage'
import NotFound from './pages/NotFound'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'

import { SERVICES } from './data/services'
import { ROOF_TYPES } from './data/roofTypes'
import { LOCATIONS } from './data/locations'
import { BLOG_POSTS } from './blog/posts'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      { path: 'services', element: <Services /> },
      { path: 'services/:slug', element: <ServiceDetail />,
        getStaticPaths: () => SERVICES.map(s => `/services/${s.slug}`) },

      { path: 'roof-types', element: <RoofTypes /> },
      { path: 'roof-types/:slug', element: <RoofTypeDetail />,
        getStaticPaths: () => ROOF_TYPES.map(r => `/roof-types/${r.slug}`) },

      { path: 'service-areas', element: <Locations /> },
      { path: 'service-areas/:slug', element: <LocationDetail />,
        getStaticPaths: () => LOCATIONS.map(l => `/service-areas/${l.slug}`) },

      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'reviews', element: <Reviews /> },
      { path: 'process', element: <ProcessPage /> },
      { path: 'financing', element: <Financing /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'gallery', element: <GalleryPage /> },

      { path: 'blog', element: <BlogList /> },
      { path: 'blog/:slug', element: <BlogPost />,
        getStaticPaths: () => BLOG_POSTS.map(p => `/blog/${p.slug}`) },

      { path: '*', element: <NotFound /> },
    ],
  },
]

// Flat list of every static path — used by the sitemap generator.
export const allStaticPaths = [
  '/', '/services', '/roof-types', '/service-areas', '/about', '/contact',
  '/reviews', '/process', '/financing', '/faq', '/gallery', '/blog',
  ...SERVICES.map(s => `/services/${s.slug}`),
  ...ROOF_TYPES.map(r => `/roof-types/${r.slug}`),
  ...LOCATIONS.map(l => `/service-areas/${l.slug}`),
  ...BLOG_POSTS.map(p => `/blog/${p.slug}`),
]
