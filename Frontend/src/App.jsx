import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HeroSection from './pages/student/HeroSection';
import Courses from './pages/student/Courses';
import Login from './pages/login';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';
import NotFound from './components/NotFound'; // Create this component for 404
import Sidebar from './pages/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import CourseTable from './pages/admin/CourseTable';
import CreateCourse from './pages/admin/CreateCourse';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <>
            <HeroSection />
            <Courses />
          </>
        ),
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'my-learning',
        element: <MyLearning />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: '*', // Wildcard route for undefined paths
        element: <NotFound />, // 404 component
      },

      // Admin routes
      {
        path: 'admin',
        element: <Sidebar />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard />,
          },
          {
            path:'course',
            element: <CourseTable />
          },
          {
            path:'course/create',
            element:<CreateCourse />
          }
        ]
      }
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
